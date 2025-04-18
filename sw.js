const CACHE_NAME = 'bb-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './about.html',
    './blogs.html',
    './main.js',
    './styles/main.css',
    './styles/layout.css',
    './styles/components.css',
    './styles/animations.css',
    './styles/modal.css',
    './styles/footer.css',
    './images/network.svg',
    './images/cloud-security.svg',
    './images/automation.svg',
    './images/devops.svg',
    './images/contact-illustration.svg',
    './images/social-connect.svg',
    '.profile.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', (event) => {
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

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request, {
                    redirect: 'follow'
                }).then(response => {
                    if (!response || response.status !== 200) {
                        return response;
                    }
                    
                    // Clone the response for caching
                    const responseToCache = response.clone();
                    const url = new URL(event.request.url);
                    
                    // Handle MIME types for CSS and JS files
                    if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
                        return response.blob().then(blob => {
                            const contentType = url.pathname.endsWith('.css') ? 'text/css' : 'application/javascript';
                            const newResponse = new Response(blob, {
                                status: 200,
                                headers: new Headers({
                                    'Content-Type': contentType
                                })
                            });
                            
                            // Cache the response with correct MIME type
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, newResponse.clone());
                            });
                            
                            return newResponse;
                        });
                    }
                    
                    // Cache other responses
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    
                    return response;
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                return new Response('Network error occurred', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            })
    );
});
