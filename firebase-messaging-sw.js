importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBXXXCLGe70id54wlMhUtHQHOJe8l4a6wA",
  authDomain: "live-chat-9d81c.firebaseapp.com",
  projectId: "live-chat-9d81c",
  messagingSenderId: "253242248304",
  appId: "1:253242248304:web:3e440995fe27bc8e2fb8b5",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon.png' // varsa ikon
  });
});
