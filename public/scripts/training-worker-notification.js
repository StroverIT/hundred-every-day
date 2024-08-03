self.addEventListener("install", () => {
  console.log("Service worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service worker activated");
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title, body } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      data: {
        url: "/account", // Replace with the desired URL for redirecting user to the desired page
      },
      // Add more properties as needed
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification
  // Open the desired URL
  event.waitUntil(clients.openWindow(process.env.NEXT_PUBLIC_HOSTNAME));
});

const cacheName = "v1";

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

self.addEventListener("fetch", (e) => {
  e.respondWith(
    cacheClone(e)
      .catch(() => caches.match(e.request))
      .then((res) => res)
  );
});
