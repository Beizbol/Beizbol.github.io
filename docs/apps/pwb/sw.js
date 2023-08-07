
const cacheName = "v0";

const addResourcesToCache = async (resources) => {
    console.log('Cache resources');
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
  };
  
self.addEventListener("install", (event) => {
    
    // get all the resources to cache from the current directory
    // const resources = 

    event.waitUntil(
      addResourcesToCache([
        "/lab/pwb/",
        "/lab/pwb/index.html",
        "/lab/pwb/app.js",
        "/lab/pwa/sw.js",
        "/lab/pwb/pwb-192x192.png",
        "/lab/pwb/pwb-512x512.png",
      ])
    );
  });
  
self.addEventListener("fetch", (e) => {
    e.respondWith(
      (async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      })()
    );
});
  
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
