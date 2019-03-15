let cacheVersion = 'cache-v1';

self.addEventListener('install', (event) =>{
    event.waitUntil(
        caches.open(cacheVersion)
        .then( (cache) => {
            return cache.addAll([
                '/',
                'index.html',
                'restaurant.html',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg', 
                '/img/4.jpg', 
                '/img/5.jpg', 
                '/img/6.jpg', 
                '/img/7.jpg', 
                '/img/8.jpg', 
                '/img/9.jpg', 
                '/img/10.jpg'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter( (cacheName) =>{
                        return cacheName.startsWith('cache-v') &&
                            cacheName != cacheVersion;
                    }).map((cacheName) =>{
                        return caches.delete(cacheName);
                    })
                );
            })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheVersion).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});