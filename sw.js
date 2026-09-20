/* Dieta keto — service worker
   Podbij WERSJA przy każdej zmianie index.html, żeby telefon pobrał nową wersję. */
const WERSJA = "dieta-keto-v7";
const SHELL  = WERSJA + "-shell";
const RUNTIME = WERSJA + "-runtime";

const PLIKI = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => Promise.allSettled(PLIKI.map(p => c.add(p))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => !n.startsWith(WERSJA)).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data === "skip") self.skipWaiting();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Nawigacja: najpierw sieć, offline — zapisana kopia.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => {
          const kopia = res.clone();
          caches.open(SHELL).then(c => c.put("./index.html", kopia));
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  // Fonty Google: najpierw cache, potem sieć — działa offline po pierwszym wejściu.
  const font = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res && (res.ok || (font && res.type === "opaque"))) {
          const kopia = res.clone();
          caches.open(font ? RUNTIME : SHELL).then(c => c.put(req, kopia));
        }
        return res;
      }).catch(() => hit);
    })
  );
});
