self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) { return; }
  e.respondWith(
    fetch(r).then(function (res) {
      var c = res.clone();
      caches.open("dukyo-shell").then(function (ca) { ca.put(r, c); });
      return res;
    }).catch(function () {
      return caches.match(r).then(function (m) { return m || caches.match(new URL("./", location).href); });
    })
  );
});
