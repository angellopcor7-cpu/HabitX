/* =====================================================
   HABITX 6.0
   ESTADÍSTICAS
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    cargarEstadisticas();

});

function cargarEstadisticas(){

    cargarResumenGeneral();

    cargarActividadSemanal();

    cargarRecords();

    cargarDineroAhorrado();

    cargarTiempoUso();

}

function cargarResumenGeneral(){

    const contenedor =
    document.getElementById("statsResumen");

    if(!contenedor) return;

    const habitos = obtenerHabitos();

    const metas =
    JSON.parse(localStorage.getItem("HABITX_METAS")) || [];

    const perfil = obtenerPerfil();

    const habitosCompletados =
    habitos.filter(h=>h.completado).length;

    const metasCompletadas =
    metas.filter(m=>m.acumulado>=m.cantidad).length;

    contenedor.innerHTML = `

<div class="stats-card">

    <h3>

        📈 Resumen General

    </h3>

    <div class="stats-grid">

        <div class="stat-item">

            <strong>${habitos.length}</strong>

            <span>Hábitos</span>

        </div>

        <div class="stat-item">

            <strong>${habitosCompletados}</strong>

            <span>Completados</span>

        </div>

        <div class="stat-item">

            <strong>${metas.length}</strong>

            <span>Metas</span>

        </div>

        <div class="stat-item">

            <strong>${metasCompletadas}</strong>

            <span>Terminadas</span>

        </div>

        <div class="stat-item">

            <strong>${perfil.xp}</strong>

            <span>XP</span>

        </div>

        <div class="stat-item">

            <strong>${perfil.nivel}</strong>

            <span>Nivel</span>

        </div>

    </div>

</div>

`;

}

/* =====================================================
   ACTIVIDAD SEMANAL REAL
===================================================== */

function cargarActividadSemanal(){

    const contenedor =
    document.getElementById("statsResumen");

    if(!contenedor) return;

    const habitos = obtenerHabitos();

    const dias = [];

    // Últimos 7 días
    for(let i=6;i>=0;i--){

        const fecha = new Date();

        fecha.setDate(fecha.getDate()-i);

        dias.push({

            fecha: fecha.toISOString().split("T")[0],

            nombre: fecha.toLocaleDateString("es-MX",{
                weekday:"long"
            }),

            total:0

        });

    }

    // Contar hábitos completados por día
    habitos.forEach(habito=>{

        if(!Array.isArray(habito.historial)) return;

        habito.historial.forEach(registro=>{

            const dia = dias.find(
                d=>d.fecha===registro.fecha
            );

            if(dia){

                dia.total++;

            }

        });

    });

    // Saber cuál fue el día con más actividad
    let mayor = 1;

    dias.forEach(d=>{

        if(d.total>mayor){

            mayor=d.total;

        }

    });

    let html=`

<div class="stats-card">

<h3>📅 Actividad de los últimos 7 días</h3>

`;

    dias.forEach(dia=>{

        const porcentaje =
        (dia.total/mayor)*100;

        html+=`

<div class="actividad-item">

    <span class="actividad-dia">

        ${
            dia.nombre.charAt(0).toUpperCase() +
            dia.nombre.slice(1)
        }

    </span>

    <div class="actividad-bar">

        <div
        class="actividad-fill"

        style="width:${porcentaje}%">

        </div>

    </div>

    <strong>

        ${dia.total}

    </strong>

</div>

`;

    });

    html+=`

</div>

`;

    contenedor.innerHTML+=html;

}

/* =====================================================
   RECORDS
===================================================== */

function cargarRecords(){

    const contenedor =
    document.getElementById("statsResumen");

    const habitos =
    obtenerHabitos();

    const metas =
    JSON.parse(
    localStorage.getItem("HABITX_METAS")
    ) || [];

    let mejorRacha=0;

    habitos.forEach(h=>{

        if(h.racha>mejorRacha){

            mejorRacha=h.racha;

        }

    });

    let metaGrande="Sin metas";

    let dinero=0;

    metas.forEach(meta=>{

        if(meta.cantidad>dinero){

            dinero=meta.cantidad;

            metaGrande=meta.nombre;

        }

    });

    contenedor.innerHTML+=`

<div class="stats-card">

<h3>🔥 Récords</h3>

<div class="record-item">

🔥 Mejor racha

<strong>${mejorRacha} días</strong>

</div>

<div class="record-item">

🎯 Meta más grande

<strong>${metaGrande}</strong>

</div>

<div class="record-item">

💰 Valor

<strong>$${dinero.toLocaleString("es-MX")}</strong>

</div>

</div>

`;

}

/* =====================================================
   DINERO
===================================================== */

function cargarDineroAhorrado(){

    const contenedor =
    document.getElementById("statsResumen");

    const metas =
    JSON.parse(
    localStorage.getItem("HABITX_METAS")
    ) || [];

    let total=0;

    metas.forEach(meta=>{

        total+=meta.acumulado;

    });

    contenedor.innerHTML+=`

<div class="stats-card">

<h3>💰 Dinero ahorrado</h3>

<div class="money-big">

$${total.toLocaleString("es-MX")}

</div>

</div>

`;

}

/* =====================================================
   TIEMPO
===================================================== */

function cargarTiempoUso(){

    const contenedor =
    document.getElementById("statsResumen");

    const perfil=
    obtenerPerfil();

    const fecha=
    perfil.fechaInicio || Date.now();

    const dias=Math.floor(

        (Date.now()-fecha)

        /(1000*60*60*24)

    );

    contenedor.innerHTML+=`

<div class="stats-card">

<h3>⏳ Tiempo usando HabitX</h3>

<div class="money-big">

${dias}

</div>

<p>

días utilizando HabitX

</p>

</div>

`;

}