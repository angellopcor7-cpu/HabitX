/* =====================================================
   HABITX 6.0
   modalUI.js
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    crearModalPremium();

});

function crearModalPremium(){

    if(document.getElementById("habitxModal")) return;

    document.body.insertAdjacentHTML("beforeend",`

<div id="habitxModal" class="habitx-modal">

    <div class="habitx-modal-box">

        <div id="habitxIcono" class="habitx-icono">
            🏆
        </div>

        <h2 id="habitxTitulo">

            Título

        </h2>

        <p id="habitxMensaje">

            Mensaje

        </p>

        <div class="habitx-botones">

            <button
                id="habitxCancelar"
                class="habitx-btn-cancelar">

                Cancelar

            </button>

            <button
                id="habitxAceptar"
                class="habitx-btn">

                Continuar

            </button>

        </div>

    </div>

</div>

`);

    document
    .getElementById("habitxAceptar")
    .onclick=cerrarModalPremium;

    document
    .getElementById("habitxCancelar")
    .onclick=cerrarModalPremium;

}

function mostrarModalPremium(
    icono,
    titulo,
    mensaje,
    textoBoton="Continuar"
){

    document.getElementById("habitxIcono").textContent=icono;

    document.getElementById("habitxTitulo").textContent=titulo;

    document.getElementById("habitxMensaje").textContent=mensaje;

    document.getElementById("habitxAceptar").textContent=textoBoton;

    document
    .getElementById("habitxModal")
    .classList.add("mostrar");

}

function cerrarModalPremium(){

    document
    .getElementById("habitxModal")
    .classList.remove("mostrar");

}

function mostrarConfirmacionPremium(
    titulo,
    mensaje,
    callback
){

    document.getElementById("habitxIcono").textContent="⚠️";

    document.getElementById("habitxTitulo").textContent=titulo;

    document.getElementById("habitxMensaje").textContent=mensaje;

    const boton=document.getElementById("habitxAceptar");

    boton.textContent="🗑 Reiniciar";

    boton.onclick=()=>{

        cerrarModalPremium();

        callback();

        boton.onclick=cerrarModalPremium;

    };

    document
    .getElementById("habitxModal")
    .classList.add("mostrar");

}