const CACHE_NAME = 'roan-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/jobs.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(networkResp => {
        // cache fetched GET responses for offline use
        return caches.open(CACHE_NAME).then(cache => {
          try { cache.put(event.request, networkResp.clone()); } catch (e) { /* ignore non-cacheable responses */ }
          return networkResp;
        });
      }).catch(() => caches.match('/index.html'));
    })
  );
});
