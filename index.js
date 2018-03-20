var staticcache = "wittr-static-v2"

self.addEventListener('install', function(event) {
  var urlsToCache = [
		'/',
		'css/main.css',
    'js/main.js',		
    'imgs/icon.png',
    'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
    'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
  ];

  event.waitUntil(
    // TODO: open a cache named 'wittr-static-v1'
		// Add cache the urls from urlsToCache
		caches.open("wittr-static-v2").then( function(cache){
			cache.addAll(urlsToCache);
		 })
		// caches.open("wittr-static-v11").then( function(cache){
		// 	//cache.addAll(urlsToCache);
		// 	return cache.add('/imgs/dr-evil.gif');
		// })
  );
});

self.addEventListener('activate', function(event) {
	
	// event.waitUntil(caches.delete("wittr-static-v1")) -- easy way

	//  considering all the other versions

	event.waitUntil(
		caches.keys().then( function (cachenames) {

			return Promise.all( cachenames.filter(function (cachename) {
				return cachename.startsWith("wittr-") && cachename!=  staticcache;
			}).map(function (cachename) {
				 return cache.delete(cachename)
			}))
			
		})
	)
});

self.addEventListener('fetch', function(event) {
	console.log(event.request);
	//if(cache.match(event.request.ur1))
	//return cache.match(event.request.ur1);
	
			//cache.addAll(urlsToCache);
			event.respondWith(
				
					caches.match(event.request).then(function(response) {
						if ( response)
						return response;
						else
						{

						 return fetch(event.request).then(function (response2){
							if( response2.status == 404)
							return caches.match('/imgs/dr-evil.gif')
							else
							return response2
						 }).catch(function() {
							 if( event.request.url.endsWith('.jpg'))
							 return caches.match('imgs/icon.png')
							 else
							return caches.match('/imgs/dr-evil.gif')
						 })
						
						}}))
						//return fetch(event.request);
});
					