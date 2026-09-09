(()=>{
  'use strict';
  const installBtn=document.getElementById('pwaInstallBtn');
  const banner=document.getElementById('pwaUpdateBanner');
  const updateNow=document.getElementById('pwaUpdateNow');
  const updateLater=document.getElementById('pwaUpdateLater');
  let installPrompt=null, waitingWorker=null, reloading=false;
  const standalone=()=>window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true;
  const showInstall=()=>{if(installBtn&&!standalone())installBtn.classList.add('show')};
  const hideInstall=()=>installBtn?.classList.remove('show');
  const showUpdate=worker=>{waitingWorker=worker||waitingWorker;if(banner)banner.classList.add('show')};
  const hideUpdate=()=>banner?.classList.remove('show');

  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault(); installPrompt=e; showInstall();
  });
  window.addEventListener('appinstalled',()=>{installPrompt=null;hideInstall();});

  installBtn?.addEventListener('click',async()=>{
    if(standalone()){hideInstall();return;}
    if(installPrompt){
      installPrompt.prompt();
      try{await installPrompt.userChoice;}catch(_){}
      installPrompt=null;hideInstall();return;
    }
    const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
    if(isiOS) alert('No Safari, toque em Compartilhar e depois em “Adicionar à Tela de Início”.');
    else alert('Abra este endereço no Chrome e use o menu ⋮ → “Instalar app” ou “Adicionar à tela inicial”.');
  });

  if(!('serviceWorker' in navigator)) return;
  window.addEventListener('load',async()=>{
    try{
      const reg=await navigator.serviceWorker.register('./sw.js',{scope:'./'});
      if(reg.waiting) showUpdate(reg.waiting);
      reg.addEventListener('updatefound',()=>{
        const worker=reg.installing;
        if(!worker)return;
        worker.addEventListener('statechange',()=>{
          if(worker.state==='installed' && navigator.serviceWorker.controller) showUpdate(worker);
        });
      });
      // Render faz auto-deploy a cada push; estas verificações aceleram a descoberta do novo SW.
      reg.update().catch(()=>{});
      setInterval(()=>reg.update().catch(()=>{}),30*60*1000);
      document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{});});
    }catch(err){console.warn('[PWA] Service Worker não registrado:',err);}
  });

  updateNow?.addEventListener('click',()=>{
    const worker=waitingWorker;
    if(!worker)return;
    updateNow.disabled=true; updateNow.textContent='Atualizando…';
    worker.postMessage({type:'SKIP_WAITING'});
  });
  updateLater?.addEventListener('click',hideUpdate);
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(reloading)return; reloading=true; location.reload();
  });

  if(!standalone()){
    const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
    if(isiOS) showInstall();
  }
})();
