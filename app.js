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

function logToPage(msg) {
  const logDiv = document.getElementById("log");
  if (logDiv) {
    logDiv.textContent += msg + "\n";
  }
}

// Service worker kaydı
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => logToPage("Service worker kaydedildi."))
    .catch(err => logToPage("Service worker kaydı hatası: " + err));

  navigator.serviceWorker.register("/firebase-messaging-sw.js")
    .then(() => logToPage("Firebase messaging sw kaydedildi."))
    .catch(err => logToPage("Firebase messaging sw kaydı hatası: " + err));
}

async function requestPermission() {
  const permission = await Notification.requestPermission();
  logToPage("İzin durumu: " + permission);
  if (permission === "granted") {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BGLcs27oqoz_XthD4-LQL-cWhGe9S3N3r1u9R04PzaGx0LBErzn5kg_564D2840-w3n8pPP76-OX2Qa2ruyXLgY"
      });
      logToPage("FCM Token: " + token);
      // Token'ı backend'e gönderme burada olacak
    } catch (e) {
      logToPage("Token alma hatası: " + e);
    }
  } else {
    logToPage("Bildirim izni verilmedi.");
  }
}

// Sayfadaki butona tıklanınca izin iste
document.getElementById("notify-btn").addEventListener("click", () => {
  requestPermission();
});

// Uygulama açıkken gelen bildirimleri dinle
onMessage(messaging, payload => {
  logToPage("Bildirim alındı: " + JSON.stringify(payload));
});
    
