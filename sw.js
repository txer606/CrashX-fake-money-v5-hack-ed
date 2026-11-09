/* Crash X service worker: caches the app so it opens and plays solo with no internet */
const CACHE = 'crashx-v6';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icons/crashx.svg', './icons/crashx-192.png', './icons/crashx-512.png',
  './icons/crashx-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return; /* Firebase goes straight to the network */
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)).catch(() => {}); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then(r => r || (req.mode === 'navigate' ? caches.match('./index.html') : null) || Response.error()))
  );
});
