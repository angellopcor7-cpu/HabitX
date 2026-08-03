/* =====================================================
   HABITX 5.0 PREMIUM POLISH

   menu.js

   Menú lateral avanzado
===================================================== */


document.addEventListener("DOMContentLoaded", ()=>{


    iniciarMenu();


});





function iniciarMenu(){


    const boton=document.getElementById(

        "menuButton"

    );


    const menu=document.getElementById(

        "menu"

    );


    const overlay=document.getElementById(

        "overlay"

    );



    if(!boton || !menu)return;





    boton.addEventListener("click",()=>{


        abrirMenu();


    });





    overlay.addEventListener("click",()=>{


        cerrarMenu();


    });





    document.addEventListener("keydown",(e)=>{


        if(e.key==="Escape"){


            cerrarMenu();


        }


    });





    configurarNavegacion();


}





// =====================================
// ABRIR
// =====================================


function abrirMenu(){


    const menu=document.getElementById(

        "menu"

    );


    const overlay=document.getElementById(

        "overlay"

    );



    menu.classList.add("open");


    overlay.classList.add("show");



}






// =====================================
// CERRAR
// =====================================


function cerrarMenu(){


    const menu=document.getElementById(

        "menu"

    );


    const overlay=document.getElementById(

        "overlay"

    );



    menu.classList.remove("open");


    overlay.classList.remove("show");


}






// =====================================
// NAVEGACION
// =====================================


function configurarNavegacion(){


    const botones=document.querySelectorAll(

        "[data-page]"

    );



    botones.forEach(boton=>{


        boton.addEventListener("click",()=>{


            const pagina=

            boton.dataset.page;



            cambiarPagina(pagina);



            activarBotonMenu(boton);



            cerrarMenu();


        });


    });


}

function cambiarPagina(pagina){

    const paginas = document.querySelectorAll(".page");

    paginas.forEach(p=>{

        p.classList.remove("active");

    });

    const nueva = document.getElementById(pagina);

    if(!nueva) return;

    nueva.style.opacity = "0";
    nueva.style.transform = "translateY(20px)";

    nueva.classList.add("active");

    requestAnimationFrame(()=>{

        nueva.style.transition = ".35s ease";

        nueva.style.opacity = "1";

        nueva.style.transform = "translateY(0)";

    });

    
// Cargar finanzas al entrar a la página

if(pagina === "finanzas"){


    if(typeof cargarCartera === "function"){


        cargarCartera();


    }


}

}

function activarBotonMenu(boton){

    const pagina = boton.dataset.page;

    // Quitar activo de TODOS los botones
    document.querySelectorAll("[data-page]").forEach(b=>{

        b.classList.remove("selected");
        b.classList.remove("active");

    });

    // Activar todos los botones que apuntan a la misma página
    document.querySelectorAll(`[data-page="${pagina}"]`).forEach(b=>{

        b.classList.add("selected");
        b.classList.add("active");

    });

}