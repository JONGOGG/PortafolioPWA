const CACHE_NAME = 'portafolio-cache-v1';
const ASSETS_TO_CACHE = [
  '/', 
  '/index.html',
  '/style.css', 
  '/app.js',
  '/fontawesome-free-6.7.1-web/css/all.css', 
  '/bootstrap-5.3.3-dist/css/bootstrap-grid.min.css', 
  '/bootstrap-5.3.3-dist/css/bootstrap.min.css', 
  '/img/Madronos.png', 
  '/img/gymreact.jpg', 
  '/img/¡Tickets.jpg', 
  '/Documentos/8_2036000531@utna.edu.mx.pdf', 
  '/Documentos/ICP Motoko Qualified Developer.pdf', 
  '/Documentos/ICP Azle Developer.pdf', 
  '/Documentos/Microsft.pdf', 
  '/manifest.json', 
  'bootstrap-5.3.3-dist/js/bootstrap.bundle.js'
];

// Evento de instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cacheando recursos');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch((error) => {
      console.error('Fallo al cachear recursos:', error);
    })
  );
});

// Evento de búsqueda
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch((error) => {
        console.error('Fallo en la solicitud en red:', error);
      });
    })
  );
});

// Evento de activación
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => 
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      )
    ).catch((error) => {
      console.error('Fallo al eliminar caché antigua:', error);
    })
  );
});
