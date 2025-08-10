import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFDzKRSLKOqirvZAUCqccTNE_5Y8ZXib4",
  authDomain: "pwaa-c392e.firebaseapp.com",
  projectId: "pwaa-c392e",
  storageBucket: "pwaa-c392e.firebasestorage.app",
  messagingSenderId: "520233317947",
  appId: "1:520233317947:web:55b387f893111b9aaa4e1e",
  measurementId: "G-HFN5T637QC"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Service worker kaydı
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
  navigator.serviceWorker.register("/firebase-messaging-sw.js");
}

// Bildirim izni al
async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, { vapidKey: "BGLcs27oqoz_XthD4-LQL-cWhGe9S3N3r1u9R04PzaGx0LBErzn5kg_564D2840-w3n8pPP76-OX2Qa2ruyXLgY" });
    console.log("FCM Token:", token);
    // Token’ı backend’e kaydet
    await fetch("/register-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
  }
}

requestPermission();

// Uygulama açıkken gelen bildirim
onMessage(messaging, payload => {
  console.log("Bildirim alındı:", payload);
});
