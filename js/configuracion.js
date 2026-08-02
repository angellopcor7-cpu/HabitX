/* =====================================================
   HABITX 5.0
   CONFIGURACIÓN
===================================================== */


document.addEventListener("DOMContentLoaded",()=>{


    cargarConfiguracion();


    eventosConfiguracion();


});





function cargarConfiguracion(){


    const config = obtenerConfiguracion();


    const nombre =
    document.getElementById("nuevoNombre");


    const tema =
    document.getElementById("selectorTema");



    if(nombre)

        nombre.value=config.nombre;



    if(tema)

        tema.value=config.tema;

        document.body.className =
        config.tema;


}





function eventosConfiguracion(){



    const guardar =
    document.getElementById("guardarNombre");



    const selector =
    document.getElementById("selectorTema");



    const reset =
    document.getElementById("reiniciarApp");





    if(guardar){

        guardar.onclick=()=>{


            const config =
            obtenerConfiguracion();


            config.nombre =
            document.getElementById(
                "nuevoNombre"
            ).value;



            guardarConfiguracion(config);



            actualizarPerfil();


        };

    }






    if(selector){


        selector.onchange=()=>{


            const config =
            obtenerConfiguracion();


            config.tema =
            selector.value;


            guardarConfiguracion(config);

            document.body.className =
            selector.value;

        };


    }





    if(reset){

    reset.onclick=()=>{

        mostrarConfirmacionPremium(

            "Reiniciar HabitX",

            "Se eliminarán todos tus hábitos, metas, logros, estadísticas y configuración. Esta acción no se puede deshacer.",

            ()=>{

                limpiarHabitX();

                location.reload();

            }

        );

    };

}


}