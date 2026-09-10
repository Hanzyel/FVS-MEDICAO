const CACHE_VERSION='1.7.10';
const CACHE_NAME='elevatta-fvs-shell-'+CACHE_VERSION;
const SHELL=[
  '/','/index.html','/manifest.webmanifest','/config.js','/pwa.js','/version.json',
  '/icons/icon-192.png','/icons/icon-512.png','/icons/icon-maskable-512.png','/icons/apple-touch-icon.png','/icons/favicon-32.png'
];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    await Promise.allSettled(SHELL.map(url=>cache.add(new Request(url,{cache:'reload'}))));
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('elevatta-fvs-shell-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.pathname.startsWith('/api/'))return;
  if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:'no-store'});
        if(fresh.ok){const cache=await caches.open(CACHE_NAME);cache.put('/index.html',fresh.clone()).catch(()=>{});}
        return fresh;
      }catch(_){return(await caches.match('/index.html'))||(await caches.match('/'))||Response.error();}
    })());
    return;
  }
  if(!SHELL.includes(url.pathname)&&url.pathname!=='/')return;
  event.respondWith((async()=>{
    try{
      const fresh=await fetch(req,{cache:'no-store'});
      if(fresh.ok){const cache=await caches.open(CACHE_NAME);cache.put(req,fresh.clone()).catch(()=>{});}
      return fresh;
    }catch(_){return(await caches.match(req))||Response.error();}
  })());
});
