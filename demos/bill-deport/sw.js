/**
 * Bill Deport service worker — install/offline shell for the PWA.
 *
 * Strategy (deliberately conservative so deploys are never stale):
 *   - /api/*            never touched — always network (money data must be live)
 *   - /assets/*         cache-first   (Vite content-hashed, immutable by design)
 *   - navigations       network-first (fresh HTML each load; cache is the
 *                        OFFLINE fallback only, newest copy per URL)
 *   - other same-origin stale-while-revalidate (icons, fonts, wasm, manifest)
 *
 * Bump VERSION to force-drop every old cache on the next activate.
 */
const VERSION = 'bd-v1';
const ASSET_CACHE = `${VERSION}-assets`;
const PAGE_CACHE = `${VERSION}-pages`;
const MISC_CACHE = `${VERSION}-misc`;
const KNOWN = [ASSET_CACHE, PAGE_CACHE, MISC_CACHE];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !KNOWN.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    // Offline: this exact page, else the app shell served at '/'.
    return (await cache.match(request)) || (await cache.match('/')) || Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(MISC_CACHE);
  const hit = await cache.match(request);
  const refresh = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => hit);
  return hit || refresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // fonts/analytics: browser handles
  if (url.pathname.startsWith('/api/')) return; // live data only — never cached

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
  } else if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});
