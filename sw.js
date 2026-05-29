/* Service Worker — Baby Growth Tracker */
var CACHE = 'grow-tracker-v1';
var STATIC = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './i18n.js',
  './db.js',
  './report.js',
  './data/who.js',
  './images/desktop-bg.png',
  './images/mobile-bg.png',
  './images/header-bg.jpg',
  './images/content-bg.jpg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(STATIC); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  /* Always go network-first for Supabase API calls */
  if (url.hostname.includes('supabase.co')) return;
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      var network = fetch(e.request).then(function(res) {
        if (res && res.status === 200 && url.origin === self.location.origin) {
          caches.open(CACHE).then(function(c) { c.put(e.request, res.clone()); });
        }
        return res;
      });
      return cached || network;
    })
  );
});
