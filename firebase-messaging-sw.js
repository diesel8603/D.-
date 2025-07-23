// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBXXXCLGe70id54wlMhUtHQHOJe8l4a6wA",
  authDomain: "live-chat-9d81c.firebaseapp.com",
  projectId: "live-chat-9d81c",
  messagingSenderId: "253242248304",
  appId: "1:253242248304:web:3e440995fe27bc8e2fb8b5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
