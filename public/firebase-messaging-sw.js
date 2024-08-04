
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Replace these with your own Firebase config keys...
const firebaseConfig = {
  apiKey: "AIzaSyCm5XexwRJahX7ahgVaUvEIQJ3zQR2KHjc",
  authDomain: "push-notification-4b5bd.firebaseapp.com",
  projectId: "push-notification-4b5bd",
  storageBucket: "push-notification-4b5bd.appspot.com",
  messagingSenderId: "127521566989",
  appId: "1:127521566989:web:e74cc4b0532e62c6018044",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // payload.fcmOptions?.link comes from our backend API route handle
  // payload.data.link comes from the Firebase Console where link is the 'key'
  const link = payload.fcmOptions?.link || payload.data?.link;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
    data: { url: link },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  event.waitUntil(
    clients

    .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT");
          return clients.openWindow(url);
        }
      })
  );
});

self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || 'Default title';
  const options = {
    body: data.body || 'Default body',
    data: {
    link: data.url || 'https://localhost:3000',
    },
    // Add the following line to ensure the notification is displayed even when the device is in background
    // This is achieved by setting the 'priority' property to 'high'
    priority: 'high'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
