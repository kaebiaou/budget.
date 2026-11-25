// Cache hors ligne de l'application (les appels OneDrive passent toujours par le réseau)
const CACHE = "budgetperso-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "xlsx.full.min.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || /microsoftonline|graph\.microsoft/.test(u.host)) return;
  if (u.origin === location.origin) {
    // réseau d'abord (mises à jour), cache en secours
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
  } else if (u.host === "cdn.jsdelivr.net") {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(n => { const c = n.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return n; })));
  }
});
