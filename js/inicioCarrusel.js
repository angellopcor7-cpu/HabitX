/* =====================================================
   HABITX 5.5
   inicioCarrusel.js
   Carrusel Premium de Metas
===================================================== */

let indiceMetaActual = 0;

function obtenerMetasInicio(){

    const datos = localStorage.getItem("HABITX_METAS");

    if(!datos){
        return [];
    }

    try{
        return JSON.parse(datos);
    }catch{
        return [];
    }

}

function cargarCarruselMetas(){

    const contenedor = document.getElementById("carruselMetas");

    if(!contenedor) return;

    const metas = obtenerMetasInicio();

    if(metas.length===0){

        contenedor.innerHTML=`

            <div class="meta-vacia">

                🎯 No tienes metas todavía.

            </div>

        `;

        return;

    }

    if(indiceMetaActual>=metas.length){

        indiceMetaActual=0;

    }

    mostrarMetaActual();

}

function mostrarMetaActual(){

    const contenedor=document.getElementById("carruselMetas");

    const metas=obtenerMetasInicio();

    if(metas.length===0) return;

    const meta=metas[indiceMetaActual];

    const porcentaje=Math.min(
        (meta.acumulado/meta.cantidad)*100,
        100
    );

    const restante=meta.cantidad-meta.acumulado;

    contenedor.innerHTML=`

<div class="inicio-carrusel">

    <button
        class="inicio-flecha"
        onclick="metaAnterior()">

        ❮

    </button>

    <div class="inicio-meta-card">

        <h2>🎯 ${meta.nombre}</h2>

        <div class="inicio-meta-barra">

            <span style="width:${porcentaje}%"></span>

        </div>

        <p>

            <strong>$${meta.acumulado.toLocaleString("es-MX")}</strong>

            de

            <strong>$${meta.cantidad.toLocaleString("es-MX")}</strong>

        </p>

        <small>

            Faltan
            $${restante.toLocaleString("es-MX")}

        </small>

        <button
            class="inicio-btn-aportar"
            onclick="aportarMeta('${meta.id}')">

            💰 Aportar

        </button>

    </div>

    <button
        class="inicio-flecha"
        onclick="metaSiguiente()">

        ❯

    </button>

</div>

<div class="inicio-indicadores">

    ${crearIndicadores(metas.length)}

</div>

`;

}

function metaSiguiente(){

    const metas = obtenerMetasInicio();

    indiceMetaActual++;

    if(indiceMetaActual >= metas.length){

        indiceMetaActual = 0;

    }

    mostrarMetaActual();

}

function metaAnterior(){

    const metas = obtenerMetasInicio();

    indiceMetaActual--;

    if(indiceMetaActual < 0){

        indiceMetaActual = metas.length - 1;

    }

    mostrarMetaActual();

}

function crearIndicadores(total){

    let html = "";

    for(let i=0;i<total;i++){

        html += `
            <span class="${i===indiceMetaActual ? "activo" : ""}"></span>
        `;

    }

    return html;

}

function abrirPaginaMetas(){

    document.querySelectorAll(".page").forEach(p=>{

        p.classList.remove("active");

    });

    document.getElementById("metas").classList.add("active");

    document.querySelectorAll(".bottom-item").forEach(b=>{

        b.classList.remove("active");

        if(b.dataset.page==="metas"){

            b.classList.add("active");

        }

    });

}