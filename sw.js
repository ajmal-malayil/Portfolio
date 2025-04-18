const CACHE_NAME = 'bb-cache-v1';
const ASSETS_TO_CACHE = [
    'index.html',
    'about.html',
    'blogs.html',
    'main.js',
    'main.css',
    'layout.css',
    'components.css',
    'animations.css',
    'modal.css',
    'footer.css',
    'dark-mode.css',
    'network.svg',
    'cloud-security.svg',
    'automation.svg',
    'devops.svg',
    'contact-illustration.svg',
    'social-connect.svg',
    'profile.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest, {
          credentials: 'same-origin',
          redirect: 'follow'
        }).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
