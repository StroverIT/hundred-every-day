// import moment from "moment";
// import { checkIsBigger } from "./timeUtils";

// export const notifyUser = async (message: string) => {
//   const timeToNotify = moment().set({ hour: 8, minute: 0, second: 0 });

//   const sendNotification = async () => {
//     if ('serviceWorker' in navigator) {
//       const registration = await navigator.serviceWorker.register('/scripts/training-worker-notification.js');
//       const subscription = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: '<Your Public VAPID Key>'
//       });
  
//       // Send subscription to your server to save it
//       await fetch('/api/subscribe', {
//         method: 'POST',
//         body: JSON.stringify(subscription),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//     }
//   }

//   if (!("Notification" in window)) {
//   } else if (Notification.permission === "granted") {
//     sendNotification()
//   } else if (Notification.permission !== "denied") {
//     await Notification.requestPermission().then((permission) => {
//       if (permission === "granted") {
//         sendNotification()
//       }
//     });
//   }
// };
