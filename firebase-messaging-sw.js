importScripts("https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js");

firebase.initializeApp({

  apiKey: "AIzaSyDHTuzKPXgNYy80-3fQN8rAYeXOCYsfNrU",

  authDomain: "habitx-7dba4.firebaseapp.com",

  projectId: "habitx-7dba4",

  storageBucket: "habitx-7dba4.firebasestorage.app",

  messagingSenderId: "249020595270",

  appId: "1:249020595270:web:8b6c66ed8d4224e448de47"

});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){

    console.log("🔔 Mensaje recibido", payload);

    self.registration.showNotification(

        payload.notification.title,

        {

            body: payload.notification.body,

            icon: "./assets/icons/icon-192.png"

        }

    );

});