const VERSION = '1.7.12';
const CACHE_NAME = `elevatta-fvs-med-${VERSION}`;
const OWN_CACHE_PREFIXES = ['elevatta-fvs-med-', 'elevatta-fvs-shell-'];
const INDEX_URL = '/index.html';
const APP_SHELL = [
  '/',
  INDEX_URL,
  '/config.js',
  '/pwa.js',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png'
];

function isApiRequest(url) {
  return (
    url.pathname === '/api' ||
    url.pathname.startsWith('/api/') ||
    url.pathname === '/healthz'
  );
}

function isVersionControlRequest(url) {
  return url.pathname === '/version.json' || url.pathname === '/sw.js';
}

function isNetworkFirstAppAsset(url) {
  return (
    url.pathname === '/config.js' ||
    url.pathname === '/pwa.js' ||
    url.pathname === '/manifest.webmanifest'
  );
}

function isIconRequest(url) {
  return url.pathname.startsWith('/icons/');
}

async function networkFirst(request, fallbackKey) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      const key = fallbackKey || request;
      cache.put(key, response.clone()).catch(() => {});
    }
    return response;
  } catch (error) {
    const cached = await caches.match(fallbackKey || request);
    return cached || Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (error) {
    return Response.error();
  }
}

self.addEventListener('install', event => {
  // Não ativa automaticamente. A nova versão fica waiting até o usuário confirmar.
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(
      APP_SHELL.map(url => cache.add(new Request(url, { cache: 'reload' })))
    );
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => OWN_CACHE_PREFIXES.some(prefix => key.startsWith(prefix)) && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // API e healthcheck: somente rede, nunca cache e nunca fallback antigo.
  if (isApiRequest(url)) {
    event.respondWith(fetch(request, { cache: 'no-store' }));
    return;
  }

  // O SW só gerencia recursos da própria origem.
  if (url.origin !== self.location.origin) return;

  // Arquivos que controlam versão devem sempre vir da rede.
  if (isVersionControlRequest(url)) {
    event.respondWith(fetch(request, { cache: 'no-store' }));
    return;
  }

  // Navegação/HTML: Network First, com shell offline como fallback.
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname === INDEX_URL) {
    event.respondWith(networkFirst(request, INDEX_URL));
    return;
  }

  // Configuração e arquivos de aplicação: Network First.
  if (isNetworkFirstAppAsset(url)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Ícones são estáticos: Cache First.
  if (isIconRequest(url)) {
    event.respondWith(cacheFirst(request));
  }
});
