self.addEventListener('install', (event) => {
  console.log('Service Worker instalado correctamente.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado.');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});