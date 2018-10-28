var cacheName = 'trip-to-portugal-v1'
var dataCacheName = 'portugalData-v1';
var filesToCache = [
  '/static/img/icons/favicon.ico',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
]

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }).catch(function (e) {
      console.log(e);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      console.log(caches)
      console.log(keyList)
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request).then(function (response) {
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  }
});

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(
    // Check in cache for the request being made
    caches.match(e.request).then(function (response) {
      // If the request is in the cache
      if (response) {
        console.log("[ServiceWorker] Found in Cache", e.request.url, response);
        // Return the cached version
        return response;
      }
      // If the request is NOT in the cache, fetch and cache
      var requestClone = e.request.clone();
      return fetch(requestClone).then(function (response) {
        if (!response) {
          console.log("[ServiceWorker] No response from fetch ")
          return response;
        }
        var responseClone = response.clone();
        //  Open the cache
        caches.open(cacheName).then(function (cache) {
          // Put the fetched response in the cache
          cache.put(e.request, responseClone);
          console.log('[ServiceWorker] New Data Cached', e.request.url);
          // Return the response
          return response;
        }); // end caches.open

      })
      .catch(function (err) {
        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
      });


    }) // end caches.match(e.request)
  ); // end e.respondWith
});
