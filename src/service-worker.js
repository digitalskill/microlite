workbox.core.setCacheNameDetails({prefix: "vueshop"});

workbox.core.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("index.html"), {
    blacklist: [/^\/static/]
});

//Web Push Notifications//
let click_open_url;
self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }
    let push_message = {};
    if (event.data) {
        try {
            // Get the json object
            push_message = event.data.json();
        } catch(e){
            try {
                // See if message is a json string
                push_message = JSON.parse(event.data.text());
            } catch(e){
                push_message = {};
                push_message.title = event.data.text();
            }
        }
    }
    push_message.title = push_message.title || "MICROLITE CMS";
    push_message.body = push_message.body || "Microlite";
    push_message.icon =  push_message.icon || "/img/icons/apple-touch-icon.png";
    push_message.tag =  push_message.tag || "Microlite";
    click_open_url = push_message.url || click_open_url
    event.waitUntil(self.registration.showNotification(push_message.title, push_message));
});

self.addEventListener('notificationclick', function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
    if ( click_open_url ){
        const promiseChain = clients.openWindow(click_open_url);
        event.waitUntil(promiseChain);
    }
});