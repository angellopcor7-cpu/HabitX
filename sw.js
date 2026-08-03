/* =====================================================
   HABITX 5.0 GENESIS
   sw.js

   Service Worker PWA
===================================================== */


const CACHE_NAME = "habitx-v6";



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
    "./js/utils.js"

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