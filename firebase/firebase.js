/* =====================================
   HABITX 6.0
   FIREBASE
===================================== */

const firebaseConfig = {

  apiKey: "AIzaSyDHTuzKPXgNYy80-3fQN8rAYeXOCYsfNrU",

  authDomain: "habitx-7dba4.firebaseapp.com",

  projectId: "habitx-7dba4",

  storageBucket: "habitx-7dba4.firebasestorage.app",

  messagingSenderId: "249020595270",

  appId: "1:249020595270:web:8b6c66ed8d4224e448de47",

  measurementId: "G-5TWRXLZ6YK"

};



firebase.initializeApp(firebaseConfig);



const auth = firebase.auth();

const db = firebase.firestore();

const messaging = firebase.messaging();



console.log("🔥 Firebase conectado correctamente");