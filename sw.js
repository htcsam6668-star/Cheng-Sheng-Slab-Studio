const SHELL_CACHE = 'chengsheng-stone-shell-v2-13';
const RUNTIME_CACHE = 'chengsheng-stone-runtime-v2-13';
const APP_SHELL = [
  './', './index.html', './pc.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'
];
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(APP_SHELL);
    try {
      const response = await Promise.race([
        fetch(THREE_URL, { mode: 'no-cors', cache: 'reload' }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('CDN timeout')), 5000))
      ]);
      if (response && (response.ok || response.type === 'opaque')) {
        const runtime = await caches.open(RUNTIME_CACHE);
        await runtime.put(THREE_URL, response.clone());
      }
    } catch (_) {}
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('chengsheng-stone-') && ![SHELL_CACHE, RUNTIME_CACHE].includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.href === THREE_URL) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(THREE_URL);
      if (cached) {
        event.waitUntil(fetch(request).then(response => {
          if (response && (response.ok || response.type === 'opaque')) return cache.put(THREE_URL, response.clone());
        }).catch(() => {}));
        return cached;
      }
      const response = await fetch(request);
      if (response && (response.ok || response.type === 'opaque')) {
        try { await cache.put(THREE_URL, response.clone()); } catch (_) {}
      }
      return response;
    })());
    return;
  }

  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) {
      if (request.mode === 'navigate') {
        event.waitUntil(fetch(request).then(async response => {
          if (response && response.ok) {
            const shell = await caches.open(SHELL_CACHE);
            await shell.put(request, response.clone());
            if (url.pathname.endsWith('/')) await shell.put(new URL('index.html', url).href, response.clone());
          }
        }).catch(() => {}));
      }
      return cached;
    }
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const shell = await caches.open(SHELL_CACHE);
        shell.put(request, response.clone()).catch(() => {});
        if (request.mode === 'navigate' && url.pathname.endsWith('/')) shell.put(new URL('index.html', url).href, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        const shell = await caches.open(SHELL_CACHE);
        const fallback = await shell.match(request) || await shell.match('./index.html') || await shell.match('./');
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});
