self.addEventListener("push", (event) => {
    console .log("Push received: ", event);
    const data = event.data.json();
    const title = data.title;
    const body = data.body;
    const icon = data.icon;
  
    const notificationOptions = {
      body: body,
      tag: "training", // Use a unique tag to prevent duplicate notifications
      icon: icon,
      data: {
        url: "/account", // Replace with the desired URL for redirecting user to the desired page
      },
    };
  
    self.registration.showNotification(title, notificationOptions);
});
  