const CACHE_VERSION='1.7.0';
const CACHE_NAME='elevatta-fvs-shell-'+CACHE_VERSION;
const SCOPE=new URL(self.registration.scope);
const INDEX_URL=new URL('./index.html',SCOPE).href;
const SHELL=[
  './','./index.html','./manifest.webmanifest','./config.js','./pwa.js','./version.json',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png','./icons/favicon-32.png'
];
const SHELL_URLS=new Set(SHELL.map(x=>new URL(x,SCOPE).href));

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('elevatta-fvs-shell-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==SCOPE.origin) return; // não interfere com API externa

  if(req.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:'no-store'});
        if(fresh.ok){
          const cache=await caches.open(CACHE_NAME);
          cache.put(INDEX_URL,fresh.clone()).catch(()=>{});
        }
        return fresh;
      }catch(_){
        return (await caches.match(INDEX_URL)) || Response.error();
      }
    })());
    return;
  }

  if(!SHELL_URLS.has(req.url)) return; // APIs e outros recursos seguem o navegador normalmente
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    const network=fetch(req,{cache:'no-store'}).then(async fresh=>{
      if(fresh.ok){const cache=await caches.open(CACHE_NAME);cache.put(req,fresh.clone()).catch(()=>{});}
      return fresh;
    }).catch(()=>null);
    return cached || (await network) || Response.error();
  })());
});
