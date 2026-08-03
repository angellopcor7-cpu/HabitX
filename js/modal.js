/* =====================================================
   HABITX 5.0
   modal.js

   Sistema de modal de hábitos
===================================================== */


document.addEventListener("DOMContentLoaded",()=>{


    iniciarModalHabito();


});







function iniciarModalHabito(){



    const botonAbrir =
    document.getElementById("nuevoHabito");


    const modal =
    document.getElementById("modalHabito");


    const botonCerrar =
    document.getElementById("cerrarModalBtn");


    const botonCrear =
    document.getElementById("crearHabitoBtn");





    // Protección

    if(!botonAbrir || !modal){

        console.log(
            "Modal hábitos no encontrado"
        );

        return;

    }





    // ABRIR MODAL

    botonAbrir.addEventListener("click",()=>{


        modal.classList.add("show");


    });







    // CERRAR MODAL

    if(botonCerrar){


        botonCerrar.addEventListener("click",()=>{


            modal.classList.remove("show");


        });


    }







    // CREAR HÁBITO

    if(botonCrear){


        botonCrear.addEventListener("click",()=>{


            crearHabitoDesdeModal();


        });


    }



}









function crearHabitoDesdeModal(){



    const nombre =
document.getElementById("nombreHabito").value;


const categoria =
document.getElementById("categoriaHabito").value;


const hora =
document.getElementById("horaHabito").value;


const frecuencia =
document.getElementById("frecuenciaHabito").value;


   if(!nombre){

    return;

}






   if(nombre.trim()===""){


        alert(
            "Escribe un nombre"
        );


        return;


    }







    crearNuevoHabito({

    nombre: nombre,

    categoria: categoria,

    hora: hora,

    frecuencia: frecuencia

});






    limpiarFormulario();





    const modal =
    document.getElementById("modalHabito");



    if(modal){


        modal.classList.remove("show");


    }






    if(typeof cargarHabitos === "function"){


        cargarHabitos();


    }






    if(typeof cargarInicioPremium === "function"){


        cargarInicioPremium();


    }



}









function limpiarFormulario(){



    const nombre =
    document.getElementById("nombreHabito");


    const hora =
    document.getElementById("horaHabito");





    if(nombre){

        nombre.value="";

    }





    if(hora){

        hora.value="";

    }



}