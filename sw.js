/* ============ IELTS 7.5 训练基地 Service Worker（批次5 T-5.4）
   策略：预缓存全部静态资源（版本化缓存名），cache-first 命中即用；
   未命中先走网络并写入缓存；完全离线时回落到 index.html 外壳。
   更新：发布新版本时 bump CACHE 版本号，activate 删除旧缓存。 */
const CACHE = 'ielts75-v6';
const PRECACHE = [
  './',
  'index.html',
  'css/style.css',
  'js/practice-full.js',
  'js/data.js',
  'js/mock-bank.js',
  'js/training.js',
  'js/course.js',
  'js/app.js',
  'manifest.json',
  'icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && req.url.startsWith(self.location.origin)) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, clone));
        }
        return res;
      }).catch(() => caches.match('index.html'));
    })
  );
});
