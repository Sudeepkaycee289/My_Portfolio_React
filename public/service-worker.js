const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',                       // Main page
  '/index.html',             // HTML file
  '/assets/main-BEPDGT-e.css',  // Correct CSS file path
  '/assets/main-DuH4v69u.js',   // Correct JS file path
  '/Images/Logo.png',        // Correct image path
  '/Images/ME.jpg',          // New image file
  '/Images/Container right.jpg' // New image file
];

// Install Event: Cache Files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url => {
          return cache.add(url).catch(error => {
            return fetch(url).then(response => {
              if (!response.ok) {
                throw new Error(`Request for ${url} failed with status ${response.status}`);
              }
              return cache.put(url, response);
            }).catch(fetchError => {
              console.error(`Failed to fetch and cache ${url}:`, fetchError);
            });
          });
        })
      );
    }).catch(error => {
      console.error('Failed to open cache:', error);
    })
  );
});

// Fetch Event: Serve Cached Files
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate Event: Clean Up Old Caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
