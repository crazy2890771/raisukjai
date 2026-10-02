const C='raisukjai-8509af5c';const A=["./", "index.html", "game-8509af5c.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "bgx_beach_de06a2f5.webp", "bgx_falls_8436c446.webp", "atlas_0_28042edd.webp", "atlas_1_97bfd162.webp", "atlas_2_28e27ef5.webp", "atlas_3_140e1c91.webp", "atlas_4_51cc08d8.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const nav=r.mode==='navigate'||r.url.endsWith('/')||r.url.endsWith('.html');
  if(nav){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;})));});
