/* =====================================================
   HABITX 5.0
   SISTEMA DE METAS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarMetas();

});


/* =====================================================
   DATOS
===================================================== */

let metas = [];

try {

    const datos = localStorage.getItem("HABITX_METAS");

    metas = datos ? JSON.parse(datos) : [];

    if (!Array.isArray(metas)) {
        metas = [];
    }

} catch (error) {

    console.error("Error cargando metas:", error);

    metas = [];

}


/* =====================================================
   INICIAR
===================================================== */

function iniciarMetas() {

    cargarMetas();

    configurarBotonNuevaMeta();

    configurarBotonCerrarMeta();

    configurarBotonGuardarMeta();

}


/* =====================================================
   NUEVA META
===================================================== */

function configurarBotonNuevaMeta() {

    const boton = document.getElementById("nuevaMeta");
    const modal = document.getElementById("modalMeta");


    if (!boton) {

        console.error("❌ No encuentro el botón nuevaMeta");

        return;

    }


    if (!modal) {

        console.error("❌ No encuentro el modalMeta");

        return;

    }


    console.log("✅ Botón Nueva Meta conectado");


    boton.onclick = function () {

        modal.classList.add("mostrar");

    };

}


/* =====================================================
   CERRAR MODAL
===================================================== */

function configurarBotonCerrarMeta() {

    const boton =
        document.getElementById("cerrarModalMeta");

    const modal =
        document.getElementById("modalMeta");


    if (!boton || !modal) return;


    boton.addEventListener("click", () => {

        modal.classList.remove("mostrar");

    });

}


/* =====================================================
   GUARDAR META
===================================================== */

function configurarBotonGuardarMeta() {

    const boton =
        document.getElementById("guardarMeta");


    if (!boton) {

        console.error("❌ No existe #guardarMeta");

        return;

    }


    boton.addEventListener("click", () => {

        crearMeta();

    });

}


/* =====================================================
   CREAR META
===================================================== */

function crearMeta() {

    const nombre =
        document.getElementById("nombreMeta")
        .value.trim();


    const objetivo =
        document.getElementById("objetivoMeta")
        .value.trim();


    const cantidad =
        Number(
            document.getElementById("cantidadMeta").value
        );


    const aporte =
        Number(
            document.getElementById("aporteMeta").value
        );


    const frecuencia =
        document.getElementById("frecuenciaMeta").value;


    const fechaInicio =
        document.getElementById("fechaInicioMeta").value;


    if (!nombre) {

        alert("Escribe un nombre para tu meta.");

        return;

    }


    if (cantidad <= 0) {

        alert("Escribe una meta total válida.");

        return;

    }


    if (aporte <= 0) {

        alert("Escribe una cantidad de aporte válida.");

        return;

    }


    if (!fechaInicio) {

        alert("Selecciona una fecha de inicio.");

        return;

    }


    const nuevaMeta = {

        id: Date.now().toString(),

        nombre: nombre,

        objetivo:
            objetivo || "Cumplir mi objetivo",

        cantidad: cantidad,

        aporte: aporte,

        frecuencia: frecuencia,

        fechaInicio: fechaInicio,

        acumulado: 0,

        historial: []

    };


    metas.push(nuevaMeta);


    guardarMetas();

cargarMetas();

if(typeof cargarInicioPremium === "function"){
    cargarInicioPremium();
}

cerrarModalMeta();

limpiarFormularioMeta();


    console.log("✅ Meta creada:", nuevaMeta);

}


/* =====================================================
   GUARDAR
===================================================== */

function guardarMetas() {

    localStorage.setItem(
        "HABITX_METAS",
        JSON.stringify(metas)
    );

}


/* =====================================================
   MOSTRAR METAS
===================================================== */

function cargarMetas() {

    const contenedor =
        document.getElementById("listaMetas");


    if (!contenedor) return;


    contenedor.innerHTML = "";


    if (metas.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-metas">

                <div style="font-size:45px;">
                    🎯
                </div>

                <h3>
                    Todavía no tienes metas
                </h3>

                <p>
                    Crea tu primera meta
                    y empieza a construirla.
                </p>

            </div>

        `;

        return;

    }


    metas.forEach(meta => {

        const porcentaje = Math.min(

            (meta.acumulado / meta.cantidad) * 100,

            100

        );


        const tarjeta =
            document.createElement("div");


        tarjeta.className = "meta-card";


        tarjeta.innerHTML = `

            <div class="meta-card-header">

                <div>

                    <h3>
                        🎯 ${meta.nombre}
                    </h3>

                    <p>
                        ${meta.objetivo}
                    </p>

                </div>


                <span class="meta-frecuencia">

                    ${textoFrecuencia(meta.frecuencia)}

                </span>

            </div>


            <div class="meta-cantidades">

                <strong>

                    $${formatearNumero(meta.acumulado)}

                </strong>

                <span>

                    de
                    $${formatearNumero(meta.cantidad)}

                </span>

            </div>


            <div class="meta-barra">

                <span
                    style="width:${porcentaje}%">
                </span>

            </div>


            <div class="meta-footer">

                <span>

                    ${Math.floor(porcentaje)}%

                </span>


                <span>

                    Aporte sugerido:
                    $${formatearNumero(meta.aporte)}

                </span>

            </div>


            <div class="meta-acciones">

                <button
                    class="btn-aportar"
                    data-id="${meta.id}">

                    💰 Aportar

                </button>


                <button
                    class="btn-eliminar-meta"
                    data-id="${meta.id}">

                    🗑️ Eliminar

                </button>

            </div>

        `;


        /* =====================================
           BOTÓN APORTAR
        ===================================== */

        const botonAportar =
            tarjeta.querySelector(".btn-aportar");


        botonAportar.addEventListener("click", (evento) => {

            evento.stopPropagation();

            aportarMeta(meta.id);

        });


        /* =====================================
           BOTÓN ELIMINAR
        ===================================== */

        const botonEliminar =
            tarjeta.querySelector(".btn-eliminar-meta");


        botonEliminar.addEventListener("click", (evento) => {

            evento.stopPropagation();

            eliminarMeta(meta.id);

        });


        contenedor.appendChild(tarjeta);

    });

}


/* =====================================================
   APORTAR A META
===================================================== */

function aportarMeta(id) {

    const meta = metas.find(m => m.id === id);

    if (!meta) return;


    if (meta.acumulado >= meta.cantidad) {

        alert("🏆 Esta meta ya está completada.");

        return;

    }


    const restante = meta.cantidad - meta.acumulado;

    const esOscuro = document.body.classList.contains("dark");

const colorModal = esOscuro ? "#1F2937" : "#FFFFFF";
const colorTexto = esOscuro ? "#F9FAFB" : "#111827";
const colorSecundario = esOscuro ? "#D1D5DB" : "#6B7280";
const colorCaja = esOscuro ? "#374151" : "#F3F4F6";
const colorBorde = esOscuro ? "#4B5563" : "#E5E7EB";
const colorCancelar = esOscuro ? "#374151" : "#F1F5F9";


    /* CREAR FONDO DEL MODAL */

    const fondo = document.createElement("div");

    fondo.style.position = "fixed";
    fondo.style.inset = "0";
    fondo.style.background = "rgba(0, 0, 0, 0.55)";
    fondo.style.backdropFilter = "blur(5px)";
    fondo.style.display = "flex";
    fondo.style.alignItems = "center";
    fondo.style.justifyContent = "center";
    fondo.style.padding = "20px";
    fondo.style.zIndex = "9999";


    /* CREAR VENTANA */

    const modal = document.createElement("div");

    modal.style.width = "100%";
    modal.style.maxWidth = "400px";
    modal.style.background = colorModal;
modal.style.color = colorTexto;
    modal.style.borderRadius = "24px";
    modal.style.padding = "28px";
    modal.style.boxSizing = "border-box";
    modal.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";
    modal.style.textAlign = "center";


    modal.innerHTML = `

        <div style="
            width:60px;
            height:60px;
            margin:0 auto 15px;
            border-radius:18px;
            background:#ecfdf5;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:30px;
        ">
            💰
        </div>


        <h2 style="
            margin:0 0 6px;
            color:${colorTexto};
            font-size:22px;
        ">
            Hacer un aporte
        </h2>


        <p style="
            margin:0 0 20px;
            color:${colorSecundario};
            font-size:14px;
        ">
            ${meta.nombre}
        </p>


        <div style="
            display:flex;
            gap:10px;
            margin-bottom:20px;
        ">

            <div style="
                flex:1;
                padding:12px;
                background:${colorCaja};
                border-radius:14px;
            ">

                <small style="color:${esOscuro ? "#FFFFFF" : colorSecundario};">
                    Llevas
                </small>

                <strong style="
                    display:block;
                    margin-top:4px;
                    color:#10B981;
                    font-size:17px;
                ">
                    $${formatearNumero(meta.acumulado)}
                </strong>

            </div>


            <div style="
                flex:1;
                padding:12px;
                background:${colorCaja};
                border-radius:14px;
            ">

                <small style="color:${esOscuro ? '#FFFFFF' : '#888'};">
                    Faltan
                </small>

                <strong style="
                    display:block;
                    margin-top:4px;
                    color:${colorTexto};
                    font-size:17px;
                ">
                    $${formatearNumero(restante)}
                </strong>

            </div>

        </div>


        <label style="
            display:block;
            text-align:left;
            margin-bottom:7px;
            color:#444;
            font-size:13px;
            font-weight:bold;
        ">
            ¿Cuánto quieres aportar?
        </label>


        <div style="
            display:flex;
            align-items:center;
            border:2px solid #e5e7eb;
            border-radius:14px;
            padding:0 14px;
            margin-bottom:8px;
        ">

            <span style="
                color:#10B981;
                font-size:20px;
                font-weight:bold;
            ">
                $
            </span>


            <input
                id="inputAporteMeta"
                type="number"
                min="1"
                max="${restante}"
                placeholder="0"
                style="
                    width:100%;
                    border:none;
                    outline:none;
                    padding:14px 8px;
                    font-size:18px;
                    background:transparent;
                    color:${colorTexto};
                    box-sizing:border-box;
                "
            >

        </div>


        <p
            id="errorAporteMeta"
            style="
                min-height:18px;
                margin:0 0 10px;
                color:#e05252;
                font-size:12px;
            "
        ></p>


        <div style="
            display:flex;
            gap:10px;
            margin-top:5px;
        ">

          <button

    id="cancelarAporteMeta"
    style="
        flex:1;
        border:none;
        border-radius:13px;
        padding:13px;
background:${colorCancelar};
color:${colorTexto};
        font-weight:bold;
        cursor:pointer;
    "
>
    Cancelar
</button>


            <button
                id="confirmarAporteMeta"
                style="
                    flex:1;
                    border:none;
                    border-radius:13px;
                    padding:13px;
                    background:#10B981;
                    color:white;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                💰 Aportar
            </button>

        </div>

    `;


    fondo.appendChild(modal);

    document.body.appendChild(fondo);

    
    const input =
        document.getElementById("inputAporteMeta");

    const error =
        document.getElementById("errorAporteMeta");

    input.style.color = colorTexto;

input.style.setProperty(
    "caret-color",
    "#10B981"
);

    input.focus();


    /* CERRAR */

    function cerrarModal() {

        fondo.remove();

    }


    document
        .getElementById("cancelarAporteMeta")
        .addEventListener("click", cerrarModal);


    /* CONFIRMAR */

    document
        .getElementById("confirmarAporteMeta")
        .addEventListener("click", () => {

            const cantidad = Number(input.value);


            if (!cantidad || cantidad <= 0) {

                error.textContent =
                    "Escribe una cantidad válida.";

                return;

            }


            if (cantidad > restante) {

                error.textContent =
                    "No puedes aportar más de lo que falta.";

                return;

            }


            meta.acumulado += cantidad;


            if (!Array.isArray(meta.historial)) {

                meta.historial = [];

            }


            meta.historial.push({

                cantidad: cantidad,

                fecha: new Date().toISOString()

            });


            guardarMetas();

            cerrarModal();

            cargarMetas();


            if (meta.acumulado >= meta.cantidad) {

                setTimeout(() => {
                    
                    const fechaInicio = new Date(meta.fechaInicio || meta.fechaCreacion || Date.now());

const fechaFinal = new Date();

const dias = Math.max(
    1,
    Math.ceil(
        (fechaFinal - fechaInicio) /
        (1000 * 60 * 60 * 24)
    )
);

agregarLogro({

    icono:"🏆",

    nombre:meta.nombre,

    descripcion:
        `Completaste esta meta en ${dias} días y alcanzaste $${meta.cantidad.toLocaleString("es-MX")}.`,

    fecha:fechaBonita(fechaFinal)

});

                    mostrarModalPremium(
    "🏆",
    "Meta completada",
    "¡Felicidades! Has conseguido completar tu meta."
);

                }, 150);

            }

        });


    /* ENTER */

    input.addEventListener("keydown", (evento) => {

        if (evento.key === "Enter") {

            document
                .getElementById("confirmarAporteMeta")
                .click();

        }

        if (evento.key === "Escape") {

            cerrarModal();

        }

    });


    /* CERRAR TOCANDO AFUERA */

    fondo.addEventListener("click", (evento) => {

        if (evento.target === fondo) {

            cerrarModal();

        }

    });

}


/* =====================================================
   ELIMINAR META
===================================================== */

function eliminarMeta(id) {

    const meta = metas.find(m => m.id === id);

    const esOscuro = document.body.classList.contains("dark");

const colorModal = esOscuro ? "#1F2937" : "#FFFFFF";
const colorTexto = esOscuro ? "#F9FAFB" : "#111827";
const colorSecundario = esOscuro ? "#D1D5DB" : "#6B7280";
const colorCaja = esOscuro ? "#374151" : "#F3F4F6";
const colorBorde = esOscuro ? "#4B5563" : "#E5E7EB";
const colorCancelar = esOscuro ? "#374151" : "#F1F5F9";

    if (!meta) return;


    /* CREAR FONDO */

    const fondo = document.createElement("div");

    fondo.style.position = "fixed";
    fondo.style.inset = "0";
    fondo.style.background = "rgba(0, 0, 0, 0.55)";
    fondo.style.backdropFilter = "blur(5px)";
    fondo.style.display = "flex";
    fondo.style.alignItems = "center";
    fondo.style.justifyContent = "center";
    fondo.style.padding = "20px";
    fondo.style.zIndex = "9999";


    /* CREAR VENTANA */

    const modal = document.createElement("div");

    modal.style.width = "100%";
    modal.style.maxWidth = "400px";
    modal.style.background = colorModal;
modal.style.color = colorTexto;
    modal.style.borderRadius = "24px";
    modal.style.padding = "28px";
    modal.style.boxSizing = "border-box";
    modal.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";
    modal.style.textAlign = "center";


    modal.innerHTML = `

        <div style="
            width:60px;
            height:60px;
            margin:0 auto 15px;
            border-radius:18px;
            background:#fff1f1;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:30px;
        ">
            🗑️
        </div>


        <h2 style="
            margin:0 0 8px;
            color:${colorTexto};
            font-size:22px;
        ">
            ¿Eliminar esta meta?
        </h2>


        <p style="
            margin:0 0 18px;
            color:${colorTexto};
            font-size:15px;
            font-weight:bold;
        ">
            "${meta.nombre}"
        </p>


        <div style="
            padding:13px;
            margin-bottom:20px;
            border-radius:14px;
            background:${colorCaja};
border:1px solid ${colorBorde};
color:${colorSecundario};
            font-size:13px;
            line-height:1.5;
        ">

            ⚠️ Esta acción no se puede deshacer.
            <br>
            Se perderá el progreso de esta meta.

        </div>


        <div style="
            display:flex;
            gap:10px;
        ">

            <button
                id="cancelarEliminarMeta"
                style="
                    flex:1;
                    border:none;
                    border-radius:13px;
                    padding:13px;
                    background:${colorCancelar};
color:${colorTexto};
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                Cancelar
            </button>


            <button
                id="confirmarEliminarMeta"
                style="
                    flex:1;
                    border:none;
                    border-radius:13px;
                    padding:13px;
                    background:#ef4444;
                    color:white;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                🗑️ Eliminar
            </button>

        </div>

    `;


    fondo.appendChild(modal);

    document.body.appendChild(fondo);

    


    /* CERRAR */

    function cerrarModal() {

        fondo.remove();

    }


    document
        .getElementById("cancelarEliminarMeta")
        .addEventListener("click", cerrarModal);


    /* CONFIRMAR ELIMINACIÓN */

    document
        .getElementById("confirmarEliminarMeta")
        .addEventListener("click", () => {

            metas =
                metas.filter(m => m.id !== id);


            guardarMetas();

            cerrarModal();

            cargarMetas();

        });


    /* CERRAR TOCANDO AFUERA */

    fondo.addEventListener("click", (evento) => {

        if (evento.target === fondo) {

            cerrarModal();

        }

    });


    /* ESC */

    document.addEventListener("keydown", function cerrarConEscape(evento) {

        if (evento.key === "Escape") {

            cerrarModal();

            document.removeEventListener(
                "keydown",
                cerrarConEscape
            );

        }

    });

}


/* =====================================================
   CERRAR MODAL
===================================================== */

function cerrarModalMeta() {

    const modal =
        document.getElementById("modalMeta");


    if (!modal) return;


    modal.classList.remove("mostrar");

}


/* =====================================================
   LIMPIAR FORMULARIO
===================================================== */

function limpiarFormularioMeta() {

    document.getElementById("nombreMeta").value = "";

    document.getElementById("objetivoMeta").value = "";

    document.getElementById("cantidadMeta").value = "";

    document.getElementById("aporteMeta").value = "";

    document.getElementById("fechaInicioMeta").value = "";

}


/* =====================================================
   FRECUENCIA
===================================================== */

function textoFrecuencia(frecuencia) {

    const nombres = {

        diario: "Cada día",

        semanal: "Cada semana",

        quincenal: "Cada 2 semanas",

        mensual: "Cada mes"

    };


    return nombres[frecuencia] || frecuencia;

}


/* =====================================================
   FORMATO
===================================================== */

function formatearNumero(numero) {

    return Number(numero)
        .toLocaleString("es-MX");

}