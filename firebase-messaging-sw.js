importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBFDzKRSLKOqirvZAUCqccTNE_5Y8ZXib4",
  authDomain: "pwaa-c392e.firebaseapp.com",
  projectId: "pwaa-c392e",
  storageBucket: "pwaa-c392e.firebasestorage.app",
  messagingSenderId: "520233317947",
  appId: "1:520233317947:web:55b387f893111b9aaa4e1e",
  measurementId: "G-HFN5T637QC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png"
  });
});
