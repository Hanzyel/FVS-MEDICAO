(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const installBtn=$('pwaInstallBtn'), sheet=$('pwaInstallSheet'), status=$('pwaInstallStatus');
  const installNative=$('pwaInstallNative'), installHelp=$('pwaInstallHelp'), installClose=$('pwaInstallClose');
  const banner=$('pwaUpdateBanner'), updateNow=$('pwaUpdateNow'), updateLater=$('pwaUpdateLater');
  let installPrompt=null, waitingWorker=null, reloading=false, swReady=false, manifestReady=false, assetsReady=false;
  const sessionStarted=Date.now();
  let interacted=false;

  const standalone=()=>matchMedia('(display-mode: standalone)').matches || navigator.standalone===true;
  const isAndroid=()=>/Android/i.test(navigator.userAgent);
  const isChrome=()=>/Chrome\//i.test(navigator.userAgent) && !/EdgA|OPR|SamsungBrowser/i.test(navigator.userAgent);
  const secure=()=>window.isSecureContext && location.protocol==='https:';
  const elapsed=()=>Math.floor((Date.now()-sessionStarted)/1000);
  const remaining=()=>Math.max(0,30-elapsed());

  function showInstall(){ if(installBtn&&!standalone()) installBtn.classList.add('show'); }
  function hideInstall(){ installBtn?.classList.remove('show'); }
  function openSheet(){ if(sheet){sheet.classList.add('show');sheet.setAttribute('aria-hidden','false');refreshStatus();} }
  function closeSheet(){ if(sheet){sheet.classList.remove('show');sheet.setAttribute('aria-hidden','true');} }
  function showUpdate(worker){ waitingWorker=worker||waitingWorker; banner?.classList.add('show'); }
  function hideUpdate(){ banner?.classList.remove('show'); }

  function setNative(enabled,label){
    if(!installNative)return;
    installNative.disabled=!enabled;
    installNative.textContent=label || (enabled?'Instalar agora':'Preparando instalação…');
    installNative.style.opacity=enabled?'1':'.58';
  }

  async function validateManifest(){
    try{
      const r=await fetch('/manifest.webmanifest',{cache:'no-store'});
      if(!r.ok)throw new Error('manifest '+r.status);
      const m=await r.json();
      const sizes=(m.icons||[]).map(i=>i.sizes);
      manifestReady=!!((m.name||m.short_name)&&m.start_url&&['standalone','fullscreen','minimal-ui','window-controls-overlay'].includes(m.display)&&sizes.includes('192x192')&&sizes.includes('512x512')&&m.prefer_related_applications!==true);
      if(!manifestReady)return false;
      const iconUrls=['/icons/icon-192.png','/icons/icon-512.png'];
      const rs=await Promise.all(iconUrls.map(u=>fetch(u,{cache:'no-store'})));
      assetsReady=rs.every(x=>x.ok);
      return assetsReady;
    }catch(e){ console.warn('[PWA] Manifest/ícones:',e); manifestReady=false;assetsReady=false;return false; }
  }

  function refreshStatus(){
    if(!status)return;
    if(standalone()){
      status.innerHTML='<b>Aplicativo instalado.</b> O Elevatta está rodando em modo aplicativo.';
      setNative(false,'Instalado');
      return;
    }
    if(!secure()){
      status.innerHTML='<b>HTTPS obrigatório.</b> Abra o endereço <code>https://…onrender.com</code> diretamente no Chrome. Arquivos <code>content://</code> e HTML aberto pelo WhatsApp não podem ser instalados como PWA.';
      setNative(false,'HTTPS necessário');
      return;
    }
    if(isAndroid()&&!isChrome()){
      status.innerHTML='<b>Abra no Google Chrome.</b> No Android, esta versão foi otimizada e testada para o Chrome.';
      setNative(false,'Abra no Chrome');
      return;
    }
    if(installPrompt){
      status.innerHTML='<b>Pronto para instalar.</b> O Chrome reconheceu o Elevatta FVS como aplicativo. Toque em “Instalar agora”.';
      setNative(true,'Instalar agora');
      return;
    }
    const checks=[];
    checks.push('HTTPS ✓');
    checks.push('Manifesto '+(manifestReady&&assetsReady?'✓':'…'));
    checks.push('Service Worker '+(swReady?'✓':'…'));
    checks.push('Toque '+(interacted?'✓':'necessário'));
    const wait=remaining();
    const waitMsg=wait>0?`O Chrome pode liberar o botão nativo após cerca de <b>${wait}s</b> nesta primeira visita.`:'Os requisitos locais já foram preparados; aguardando o Chrome liberar o prompt nativo.';
    status.innerHTML='<b>Preparando instalação no Android.</b><br>'+checks.join(' · ')+'<br><span style="display:block;margin-top:6px">'+waitMsg+'</span>';
    setNative(false,'Preparando instalação…');
  }

  function markInteraction(){ interacted=true; refreshStatus(); }
  addEventListener('pointerdown',markInteraction,{once:true,passive:true});
  addEventListener('keydown',markInteraction,{once:true});

  if(!standalone())showInstall();else hideInstall();

  addEventListener('beforeinstallprompt',e=>{
    // Mantém o evento para o botão próprio do app. O Chrome só dispara quando os critérios estão satisfeitos.
    e.preventDefault();
    installPrompt=e;
    showInstall();
    refreshStatus();
  });

  addEventListener('appinstalled',()=>{
    installPrompt=null;hideInstall();closeSheet();
  });

  async function promptInstall(){
    if(!installPrompt){openSheet();refreshStatus();return;}
    const evt=installPrompt;
    installPrompt=null;
    try{
      await evt.prompt();
      const choice=await evt.userChoice;
      if(choice?.outcome!=='accepted')showInstall();
    }catch(e){console.warn('[PWA] Prompt:',e);showInstall();}
    refreshStatus();
  }

  installBtn?.addEventListener('click',promptInstall);
  installNative?.addEventListener('click',promptInstall);
  installHelp?.addEventListener('click',()=>{
    alert(isAndroid()? 'No Android: 1) abra este endereço HTTPS no Google Chrome; 2) toque na página e aguarde cerca de 30 segundos na primeira visita; 3) use o botão “Instalar app”. Como alternativa, use Chrome ⋮ → “Instalar app” ou “Adicionar à tela inicial”.' : 'Use o menu do navegador para instalar ou adicionar este site à tela inicial.');
  });
  installClose?.addEventListener('click',closeSheet);
  sheet?.addEventListener('click',e=>{if(e.target===sheet)closeSheet();});

  async function registerSW(){
    if(!('serviceWorker'in navigator)){refreshStatus();return;}
    try{
      const reg=await navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'});
      await navigator.serviceWorker.ready;
      swReady=true;
      await validateManifest();
      refreshStatus();
      if(reg.waiting)showUpdate(reg.waiting);
      reg.addEventListener('updatefound',()=>{
        const worker=reg.installing;if(!worker)return;
        worker.addEventListener('statechange',()=>{
          if(worker.state==='installed'&&navigator.serviceWorker.controller)showUpdate(worker);
        });
      });
      reg.update().catch(()=>{});
      setInterval(()=>reg.update().catch(()=>{}),15*60*1000);
      document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{});});
    }catch(err){
      console.warn('[PWA] Falha ao registrar Service Worker:',err);
      swReady=false;refreshStatus();
    }
  }

  navigator.serviceWorker?.addEventListener('controllerchange',()=>{
    // Recarrega somente quando já havia um controlador, evitando loop na primeira ativação.
    if(reloading)return;
    if(sessionStorage.getItem('elevatta-sw-controlled')==='1'){
      reloading=true;location.reload();
    }else sessionStorage.setItem('elevatta-sw-controlled','1');
  });

  updateNow?.addEventListener('click',()=>{
    if(!waitingWorker)return;
    updateNow.disabled=true;updateNow.textContent='Atualizando…';
    waitingWorker.postMessage({type:'SKIP_WAITING'});
  });
  updateLater?.addEventListener('click',hideUpdate);

  validateManifest().finally(refreshStatus);
  registerSW();
  setInterval(()=>{if(sheet?.classList.contains('show')&&!installPrompt)refreshStatus();},1000);
  setTimeout(refreshStatus,31000);
})();
