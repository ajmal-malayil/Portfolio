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
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  // 🔥 Handle navigation requests (e.g., index.html) separately
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          return caches.match('index.html'); // fallback
        })
    );
    return;
  }

  // 💡 For all other requests (CSS, JS, images, etc.)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request, {
        redirect: 'follow',
        credentials: 'same-origin'
      }).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      }).catch(error => {
        console.error('Fetch failed:', error);
        throw error;
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
