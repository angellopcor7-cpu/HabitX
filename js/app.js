/* =====================================================
   HABITX 5.0
   UPDATE 3
   APP CORE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarHabitX();

});



function iniciarHabitX(){

    iniciarSplash();

    iniciarDashboard();

    iniciarAnimaciones();

    iniciarRipple();

}





/* =====================================
   SPLASH
===================================== */

function iniciarSplash(){

    const splash = document.getElementById("splash");
    const app = document.getElementById("app");

    if(!splash || !app) return;

    app.classList.add("hidden");

    setTimeout(()=>{

        splash.classList.add("splash-hide");

        setTimeout(()=>{

            splash.remove();

            app.classList.remove("hidden");

            app.classList.add("app-show");

        },700);

    },1500);

}





/* =====================================
   DASHBOARD
===================================== */

function iniciarDashboard(){

    animarContador("totalHabitos");

    animarContador("completados");

    animarContador("racha");

}





function animarContador(id){

    const elemento = document.getElementById(id);

    if(!elemento) return;

    const objetivo = Number(elemento.textContent) || 0;

    let numero = 0;

    elemento.textContent = "0";

    const velocidad = Math.max(10, 500 / (objetivo || 1));

    const intervalo = setInterval(()=>{

        numero++;

        elemento.textContent = numero;

        if(numero >= objetivo){

            clearInterval(intervalo);

        }

    }, velocidad);

}





/* =====================================
   ANIMACIONES
===================================== */

function iniciarAnimaciones(){

    animarTarjetas();

}





function animarTarjetas(){

    const tarjetas = document.querySelectorAll(".card, .habito-card");

    tarjetas.forEach((tarjeta, indice)=>{

        tarjeta.style.opacity = "0";

        tarjeta.style.transform = "translateY(20px)";

        setTimeout(()=>{

            tarjeta.style.transition = ".45s ease";

            tarjeta.style.opacity = "1";

            tarjeta.style.transform = "translateY(0)";

        }, indice * 80);

    });

}

/* =====================================
   RIPPLE EFFECT
===================================== */

function iniciarRipple(){

    const botones = document.querySelectorAll("button");


    botones.forEach(boton=>{


        boton.addEventListener("click",function(e){


            const circulo = document.createElement("span");


            const rect = this.getBoundingClientRect();


            const tamaño = Math.max(
                rect.width,
                rect.height
            );


            circulo.style.width = tamaño+"px";

            circulo.style.height = tamaño+"px";


            circulo.style.left =
            e.clientX - rect.left - tamaño/2 + "px";


            circulo.style.top =
            e.clientY - rect.top - tamaño/2 + "px";


            circulo.className="ripple";


            this.appendChild(circulo);


            setTimeout(()=>{

                circulo.remove();

            },600);


        });


    });


}

// =====================================
// REGISTRO PWA
// =====================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", ()=>{

        navigator.serviceWorker.register("./sw.js")

        .then(()=>{

            console.log("HabitX PWA activa");

        })

        .catch(error=>{

            console.log(
                "Error Service Worker:",
                error
            );

        });

    });

}