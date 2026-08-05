/* =====================================================
   HABITX 5.0 GENESIS
   sw.js

   Service Worker PWA
===================================================== */

const CACHE_NAME = "habitx-v7";



const ARCHIVOS = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",
    "./css/responsive.css",
    "./css/modal.css",
    "./css/cards.css",

    "./js/app.js",
    "./js/storage.js",
    "./js/menu.js",
    "./js/inicio.js",
    "./js/habitos.js",
    "./js/categoria.js",
    "./js/modal.js",
    "./js/finanzas.js",
    "./js/utils.js",
    "./js/metas.js",
"./js/logros.js",
"./js/estadisticas.js",
"./js/perfil.js",
    
];





// INSTALACION

self.addEventListener(

"install",

evento=>{


    evento.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>{


            return cache.addAll(ARCHIVOS);


        })

        .catch(error=>{


            console.log(
                "ERROR EN CACHE:",
                error
            );


        })


    );


}

);







// ACTIVACION

self.addEventListener(

"activate",

evento=>{


    evento.waitUntil(

        caches.keys()

        .then(cachesNames=>{


            return Promise.all(

                cachesNames.map(nombre=>{


                    if(nombre!==CACHE_NAME){


                        return caches.delete(nombre);


                    }


                })

            );


        })

    );


}





);







// PETICIONES

self.addEventListener(

"fetch",

evento=>{


    evento.respondWith(


        caches.match(evento.request)

        .then(respuesta=>{


            return respuesta ||

            fetch(evento.request);


        })


    );


});

// =====================================
// NOTIFICACIONES
// =====================================

self.addEventListener(
"push",
evento=>{

    const datos = evento.data ?
    evento.data.json()
    :
    {
        titulo:"HabitX",
        mensaje:"Hora de completar tus hábitos 🌱"
    };


    evento.waitUntil(

        self.registration.showNotification(

            datos.titulo,

            {

                body:datos.mensaje,

                icon:"./assets/icons/icon-192.png",

badge:"./assets/icons/icon-192.png"

            }

        )

    );

});

// =====================================
// CLICK EN NOTIFICACION
// =====================================

self.addEventListener(
"notificationclick",
evento=>{


    evento.notification.close();



    evento.waitUntil(

        clients.matchAll({

            type:"window",

            includeUncontrolled:true

        })

        .then(clientes=>{


            for(const cliente of clientes){


                if("focus" in cliente){

                    return cliente.focus();

                }


            }



            if(clients.openWindow){

                return clients.openWindow(
                    "/HabitX/"
                );

            }


        })

    );


});

/* =====================================
   FIREBASE CLOUD MESSAGING
===================================== */

importScripts(
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({

    apiKey:"AIzaSyDHTuzKPXgNYy80-3fQN8rAYeXOCYsfNrU",

    authDomain:"habitx-7dba4.firebaseapp.com",

    projectId:"habitx-7dba4",

    storageBucket:"habitx-7dba4.firebasestorage.app",

    messagingSenderId:"249020595270",

    appId:"1:249020595270:web:8b6c66ed8d4224e448de47"

});

const messaging = firebase.messaging();



messaging.onBackgroundMessage(payload=>{

    console.log(
        "🔔 Push recibido",
        payload
    );



    self.registration.showNotification(

        payload.notification.title,

        {

            body:payload.notification.body,

            icon:"./assets/icons/icon-192.png",

            badge:"./assets/icons/icon-192.png"

        }

    );

});