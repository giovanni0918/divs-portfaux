const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
    'index.html',
    '/divs-portfaux/',
    '/divs-portfaux/style.css',
    '/divs-portfaux/script.js',
    '/divs-portfaux/manifest.json',
    '/divs-portfaux/images/icons/icon-72x72.png',
    '/divs-portfaux/images/icons/icon-96x96.png',
    '/divs-portfaux/images/icons/icon-128x128.png',
    '/divs-portfaux/images/icons/icon-144x144.png',
    '/divs-portfaux/images/icons/icon-152x152.png',
    '/divs-portfaux/images/icons/icon-192x192.png',
    '/divs-portfaux/images/icons/icon-256x256.png',
    '/divs-portfaux/images/icons/icon-384x384.png',
    '/divs-portfaux/images/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
            // .catch(err => console.warn(err))
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];

    event.waitUntil(caches.keys()
        .then(cacheNames => cacheNames.filter(cacheName => !currentCaches.includes(cacheName)))
        .then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {

                    if (cachedResponse) return cachedResponse;

                    return caches.open(RUNTIME).then(cache => {

                        return fetch(event.request).then(response => {
                            return cache.put(event.request, response.clone()).then(() => response);
                        });

                    });

                })
        );
    }
});