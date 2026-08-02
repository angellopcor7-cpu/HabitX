/* =====================================================
   HABITX 5.0
   modal.js
===================================================== */


document.addEventListener("DOMContentLoaded", ()=>{

    iniciarModalHabito();

});





function iniciarModalHabito(){


    const botonAbrir = document.getElementById("nuevoHabito");

    const modal = document.getElementById("modalHabito");

    const botonCerrar = document.getElementById("cerrarModalBtn");

    const botonCrear = document.getElementById("crearHabitoBtn");



    if(!botonAbrir || !modal){

        return;

    }





    botonAbrir.addEventListener("click", ()=>{


        modal.classList.add("show");


    });





    botonCerrar.addEventListener("click", ()=>{


        modal.classList.remove("show");


    });





    botonCrear.addEventListener("click", ()=>{


        crearHabitoDesdeModal();


    });



}








function crearHabitoDesdeModal(){



    const nombre = document.getElementById("nombreHabito").value;


    const categoria = document.getElementById("categoriaHabito").value;


    const hora = document.getElementById("horaHabito").value;




    if(nombre.trim()===""){


        alert("Escribe un nombre");


        return;


    }






    crearNuevoHabito({

        nombre:nombre,

        categoria:categoria,

        hora:hora

    });





    limpiarFormulario();



    document.getElementById("modalHabito")

    .classList.remove("show");





    if(typeof cargarHabitos === "function"){

        cargarHabitos();

    }



    if(typeof cargarInicioPremium === "function"){

        cargarInicioPremium();

    }



}







function limpiarFormulario(){


    document.getElementById("nombreHabito").value="";


    document.getElementById("horaHabito").value="";


}