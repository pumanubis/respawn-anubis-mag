const CACHE='anubis-v7-2-local-1';
const FILES=['./','./index.html','./qrgen.js','./v6admin.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('anubis-v')&&k!==CACHE&&k!=='anubis-v5-qr').map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
e.respondWith((async()=>{const cache=await caches.open(CACHE);try{const res=await fetch(e.request,{cache:'no-cache'});if(res.ok)await cache.put(e.request,res.clone());return res}catch(err){return await cache.match(e.request)||await cache.match('./index.html')||Response.error()}})());});
