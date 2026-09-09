const CACHE_VERSION='1.7.1';
const CACHE_NAME='elevatta-fvs-shell-'+CACHE_VERSION;
const SCOPE=new URL(self.registration.scope);
const INDEX_URL=new URL('./index.html',SCOPE).href;
const SHELL=[
  './','./index.html','./manifest.webmanifest','./config.js','./pwa.js','./version.json',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png','./icons/favicon-32.png'
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
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  // Nunca intercepta a API: evita devolver HTML/cache em endpoints de banco.
  if(url.pathname.startsWith('/api/'))return;
  if(url.origin!==SCOPE.origin)return;
  if(req.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:'no-store'});
        if(fresh.ok){const cache=await caches.open(CACHE_NAME);cache.put(INDEX_URL,fresh.clone()).catch(()=>{});}
        return fresh;
      }catch(_){return (await caches.match(INDEX_URL)) || Response.error();}
    })());
    return;
  }
  if(!SHELL.some(x=>new URL(x,SCOPE).href===req.url))return;
  event.respondWith((async()=>{
    try{
      const fresh=await fetch(req,{cache:'no-store'});
      if(fresh.ok){const cache=await caches.open(CACHE_NAME);cache.put(req,fresh.clone()).catch(()=>{});}
      return fresh;
    }catch(_){return (await caches.match(req)) || Response.error();}
  })());
});
