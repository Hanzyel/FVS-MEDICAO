(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const installBtn=$('pwaInstallBtn'), sheet=$('pwaInstallSheet'), status=$('pwaInstallStatus');
  const installNative=$('pwaInstallNative'), installHelp=$('pwaInstallHelp'), installClose=$('pwaInstallClose');
  const banner=$('pwaUpdateBanner'), updateNow=$('pwaUpdateNow'), updateLater=$('pwaUpdateLater');
  let installPrompt=null, waitingWorker=null, reloading=false, swReady=false;
  const standalone=()=>matchMedia('(display-mode: standalone)').matches || navigator.standalone===true;
  const isAndroid=()=>/Android/i.test(navigator.userAgent);
  const isChrome=()=>/Chrome\//i.test(navigator.userAgent) && !/EdgA|OPR|SamsungBrowser/i.test(navigator.userAgent);
  const secure=()=>window.isSecureContext && location.protocol==='https:';
  const openSheet=()=>{if(sheet){sheet.classList.add('show');sheet.setAttribute('aria-hidden','false');refreshStatus();}};
  const closeSheet=()=>{if(sheet){sheet.classList.remove('show');sheet.setAttribute('aria-hidden','true');}};
  const showInstall=()=>{if(installBtn&&!standalone())installBtn.classList.add('show');};
  const hideInstall=()=>installBtn?.classList.remove('show');
  const showUpdate=worker=>{waitingWorker=worker||waitingWorker;banner?.classList.add('show');};
  const hideUpdate=()=>banner?.classList.remove('show');

  function refreshStatus(){
    if(!status)return;
    if(standalone()){
      status.innerHTML='<b>Aplicativo já instalado.</b> Você está usando o Elevatta em modo aplicativo.';
      if(installNative) installNative.style.display='none';
      return;
    }
    if(!secure()){
      status.innerHTML='<b>HTTPS necessário.</b> Abra o endereço <code>https://…onrender.com</code> diretamente no Chrome. Arquivos do WhatsApp e <code>content://</code> não podem ser instalados como PWA.';
      return;
    }
    if(isAndroid()&&!isChrome()){
      status.innerHTML='<b>Para melhor compatibilidade no Android:</b> abra este mesmo endereço no Google Chrome e toque novamente em “Instalar app”.';
      return;
    }
    if(installPrompt){
      status.innerHTML='<b>Pronto para instalar.</b> O Chrome reconheceu o Elevatta FVS como aplicativo.';
      return;
    }
    status.innerHTML='<b>Site seguro e PWA ativo.</b> Se o botão nativo ainda não estiver disponível, aguarde alguns segundos e use Chrome ⋮ → “Adicionar à tela inicial” / “Instalar app”. Service Worker: '+(swReady?'ativo':'carregando')+'.';
  }

  // O botão fica visível no Android até o app estar realmente instalado.
  if(!standalone()) showInstall(); else hideInstall();

  addEventListener('beforeinstallprompt',e=>{
    e.preventDefault(); installPrompt=e; showInstall(); refreshStatus();
  });
  addEventListener('appinstalled',()=>{installPrompt=null;hideInstall();closeSheet();});

  installBtn?.addEventListener('click',async()=>{
    if(standalone()){hideInstall();return;}
    if(installPrompt){
      installPrompt.prompt();
      try{await installPrompt.userChoice;}catch(_){ }
      installPrompt=null; refreshStatus();
    }else openSheet();
  });
  installNative?.addEventListener('click',async()=>{
    if(installPrompt){
      installPrompt.prompt();
      try{await installPrompt.userChoice;}catch(_){ }
      installPrompt=null; refreshStatus();
    }else refreshStatus();
  });
  installHelp?.addEventListener('click',()=>{
    alert(isAndroid()? 'No Android: abra este endereço HTTPS no Google Chrome. Depois toque no menu ⋮ e escolha “Adicionar à tela inicial” ou “Instalar app”. Se a opção não aparecer, recarregue a página uma vez e tente novamente.' : 'Use o menu do navegador para adicionar este site à tela inicial.');
  });
  installClose?.addEventListener('click',closeSheet);
  sheet?.addEventListener('click',e=>{if(e.target===sheet)closeSheet();});

  if('serviceWorker' in navigator){
    addEventListener('load',async()=>{
      try{
        const reg=await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});
        await navigator.serviceWorker.ready;
        swReady=true; refreshStatus();
        if(reg.waiting) showUpdate(reg.waiting);
        reg.addEventListener('updatefound',()=>{
          const worker=reg.installing;if(!worker)return;
          worker.addEventListener('statechange',()=>{
            if(worker.state==='installed' && navigator.serviceWorker.controller) showUpdate(worker);
          });
        });
        reg.update().catch(()=>{});
        setInterval(()=>reg.update().catch(()=>{}),15*60*1000);
        document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{});});
      }catch(err){
        console.warn('[PWA] Falha ao registrar Service Worker:',err);
        swReady=false; refreshStatus();
      }
    });
    navigator.serviceWorker.addEventListener('controllerchange',()=>{
      if(reloading)return;reloading=true;location.reload();
    });
  }else refreshStatus();

  updateNow?.addEventListener('click',()=>{
    if(!waitingWorker)return;
    updateNow.disabled=true;updateNow.textContent='Atualizando…';
    waitingWorker.postMessage({type:'SKIP_WAITING'});
  });
  updateLater?.addEventListener('click',hideUpdate);
})();
