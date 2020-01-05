var urlsToCache = [
  "/",
  "js/main.js",
  "css/main.css",
  "imgs/icon.png",
  "https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff",
  "https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff"
];
var cacheName = "wittr-static-v1";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(cacheKeys => {
      return Promise.all(
        cacheKeys.map(c => {
          if (c !== cacheName) {
            return caches.delete(c);
          }
          return null;
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", function(event) {
    console.log(event.data);
  if (event.data.skipWaiting === true) {
    self.skipWaiting();
  }
});
