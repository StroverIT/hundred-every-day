import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm5XexwRJahX7ahgVaUvEIQJ3zQR2KHjc",
  authDomain: "push-notification-4b5bd.firebaseapp.com",
  projectId: "push-notification-4b5bd",
  storageBucket: "push-notification-4b5bd.appspot.com",
  messagingSenderId: "127521566989",
  appId: "1:127521566989:web:e74cc4b0532e62c6018044",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();

    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_FIREBASE_V2,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
