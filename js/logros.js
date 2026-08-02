

document.addEventListener("DOMContentLoaded", function () {

    cargarRecuerdos();

});



/* =====================================================
   CARGAR RECUERDOS
===================================================== */

function cargarRecuerdos(){

    const contenedor = document.getElementById("listaLogros");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    const recuerdos = obtenerLogros();

    if(recuerdos.length === 0){

        mostrarRecuerdo({

            icono:"🏆",

            nombre:"Todavía no completas ninguna meta",

            descripcion:"Cuando completes una aparecerá aquí.",

            fecha:""

        }, contenedor);

        return;

    }

    recuerdos.forEach(recuerdo=>{

        mostrarRecuerdo(recuerdo, contenedor);

    });

}



/* =====================================================
   MOSTRAR RECUERDO
===================================================== */

function mostrarRecuerdo(recuerdo, contenedor) {

    const tarjeta = document.createElement("div");


    tarjeta.className = "logro-card desbloqueado";


    tarjeta.innerHTML =
        '<div class="recuerdo-icono">' +
            recuerdo.icono +
        '</div>' +

        '<div class="recuerdo-contenido">' +

            '<span class="recuerdo-tipo">' +
                'META COMPLETADA' +
            '</span>' +

            '<h3>' +
                recuerdo.nombre +
            '</h3>' +

            '<p>' +
                recuerdo.descripcion +
            '</p>' +

            '<small>' +
                '📅 ' + recuerdo.fecha +
            '</small>' +

        '</div>';


    contenedor.appendChild(tarjeta);

}
