

document.addEventListener("DOMContentLoaded", ()=>{


    cargarHabitos();


    configurarNuevoHabito();


});



/* =====================================
   REINICIAR HÁBITOS DIARIOS
===================================== */

function reiniciarHabitosDiarios(){

    const habitos = obtenerHabitos();

    const hoy = obtenerFechaActual();

    const semanaActual = obtenerSemanaActual();

    let cambios = false;

    habitos.forEach(habito=>{

        /* ==========================
           NUEVO DÍA
        ========================== */

        if(
            habito.completado &&
            habito.ultimaFecha !== hoy
        ){

            habito.completado = false;

            cambios = true;

        }


        /* ==========================
           NUEVA SEMANA
        ========================== */

        if(
            habito.ultimaSemana !== semanaActual
        ){

            habito.progresoSemanal = 0;

            habito.ultimaSemana = semanaActual;

            cambios = true;

        }

    });

    if(cambios){

        guardarHabitos(habitos);

    }

}

// =====================================
// MOSTRAR HABITOS
// =====================================


function cargarHabitos(){

    reiniciarHabitosDiarios();

    const lista = document.getElementById(
        "listaHabitos"
    );


    if(!lista) return;



    const habitos = obtenerHabitos();



    lista.innerHTML="";



    if(habitos.length===0){


        lista.innerHTML=`

        <div class="card">

            🌱 No tienes hábitos todavía.

            <br><br>

            Crea tu primer hábito.

        </div>

        `;


        return;

    }






    habitos.forEach(habito=>{


        const tarjeta=document.createElement(
            "div"
        );



       tarjeta.className = 

`habito-card habit-enter
${obtenerClaseCategoria(habito.categoria)}

${habito.favorito ? "es-favorito":""}
${habito.completado ? "completado":""}
${semanaCompletada(habito) ? "semana-lista":""}`;

        const progreso = habito.completado ? 100 : 0;





        tarjeta.innerHTML=`

<div class="habito-header">


    <div class="habito-titulo">

        ${habito.nombre}

    </div>



    <button

    class="estrella-fav"

    onclick="favoritoHabito('${habito.id}')">


    ${habito.favorito ? "⭐":"☆"}


    </button>


</div>





        <div class="habito-info">


            <span class="etiqueta">

            📂 ${habito.categoria}

            </span>



            <span class="etiqueta">

            ⏰ ${habito.hora || "Sin horario"}

            </span>


        </div>






        <div class="habito-racha">


    🔥 Racha: ${habito.racha || 0} días


</div>



<div class="habito-semana">


    📅 Esta semana:

    ${habito.progresoSemanal || 0}

    /

    ${habito.objetivoSemanal || 7}

    días


</div>






        <div class="habito-progreso">


            <span style="width:${progreso}%"></span>


        </div>







        <div class="habito-actions">



           <button

class="btn-completar"

${habito.completado ? "disabled" : ""}

onclick="completarHabito('${habito.id}')">


${habito.completado
? "✔ Completado hoy"
: "⭕ Completar"}

</button>






 <button

class="btn-eliminar"

onclick="eliminarHabito('${habito.id}')">

🗑️

</button>

        </div>


        `;



        lista.appendChild(tarjeta);



    });


}





// =====================================
// CREAR HABITO
// =====================================


function configurarNuevoHabito(){

    document.addEventListener("DOMContentLoaded", ()=>{


    cargarHabitos();


});

    // Ahora el modal controla la creación
    // Este espacio queda reservado para futuras funciones

}





// =====================================
// COMPLETAR HABITO
// =====================================

function completarHabito(id){

    const habitos = obtenerHabitos();

    const habito = habitos.find(
        h => h.id === id
    );

    if(!habito) return;


    /* =====================================
       ASEGURAR DATOS
    ===================================== */

    if(typeof habito.racha !== "number"){
        habito.racha = 0;
    }

    if(!Array.isArray(habito.historial)){
        habito.historial = [];
    }


    /* =====================================
       CAMBIAR ESTADO
    ===================================== */

    if(habito.completado){

    return;

}

habito.completado = true;


    /* =====================================
       COMPLETAR
    ===================================== */

    if(habito.completado){

        // ==============================
// PROGRESO SEMANAL
// ==============================

if(typeof habito.progresoSemanal !== "number"){

    habito.progresoSemanal = 0;

}

if(habito.progresoSemanal < habito.objetivoSemanal){

    habito.progresoSemanal++;

}

        actualizarRachaSemanal(habito);

        

            // =====================================
    // NOTIFICACION DE RACHA
    // =====================================

    if(typeof enviarNotificacion === "function"){


        if(habito.racha === 7){


            enviarNotificacion(

                "HabitX 🔥",

                "¡7 días seguidos cumpliendo "
                + habito.nombre
                + "! Sigue así 💪"

            );


        }



        if(habito.racha === 30){


            enviarNotificacion(

                "HabitX 🏆",

                "¡30 días de disciplina con "
                + habito.nombre
                + "! Eres constante 🔥"

            );


        }


    }


        habito.ultimaFecha = obtenerFechaActual();

        habito.historial.push({

            fecha: obtenerFechaActual(),

            completado: true

        });


        /* =====================================
           ACTIVIDAD
        ===================================== */

        if(typeof agregarActividad === "function"){

            agregarActividad(
                "Completaste el hábito: " +
                habito.nombre
            );

        }


        /* =====================================
           XP
        ===================================== */

        if(typeof agregarXP === "function"){

            agregarXP(10);

        }


        /* =====================================
           PERFIL
        ===================================== */

        if(typeof actualizarPerfil === "function"){

            actualizarPerfil();

        }

    }


    /* =====================================
       GUARDAR HABITOS
       
       IMPORTANTE:
       Primero guardamos los cambios.
    ===================================== */

    guardarHabitos(habitos);


    /* =====================================
       REVISAR LOGROS
       
       Ahora los logros pueden detectar
       el hábito recién completado.
    ===================================== */

    if(typeof revisarDesbloqueos === "function"){

        revisarDesbloqueos();

    }


    if(typeof verificarLogros === "function"){

        verificarLogros();

    }


    /* =====================================
       ACTUALIZAR HABITOS
    ===================================== */

    cargarHabitos();


    /* =====================================
       ACTUALIZAR INICIO
    ===================================== */

    if(typeof cargarInicio === "function"){

        cargarInicio();

    }


    /* =====================================
       ACTUALIZAR CALENDARIO
    ===================================== */

    if(typeof cargarCalendario === "function"){

        cargarCalendario();

    }

}





// =====================================
// FAVORITO
// =====================================


function favoritoHabito(id){


    const habitos=obtenerHabitos();



    const habito=habitos.find(

        h=>h.id===id

    );



    if(!habito)return;



    habito.favorito=

    !habito.favorito;



    guardarHabitos(habitos);



    cargarHabitos();


}





// =====================================
// ELIMINAR
// =====================================


function eliminarHabito(id){


    const tarjeta = event.target.closest(".habito-card");


    if(tarjeta){


        tarjeta.classList.add("habit-delete");


        setTimeout(()=>{


            ejecutarEliminar(id);


        },400);


    }else{


        ejecutarEliminar(id);


    }


}

function ejecutarEliminar(id){


    let habitos = obtenerHabitos();



    habitos = habitos.filter(

        h=>h.id!==id

    );



    guardarHabitos(habitos);



    cargarHabitos();



    cargarInicio();


}

function obtenerClaseCategoria(categoria){


    if(!categoria) return "personal";



    const texto = categoria
    .toLowerCase();



    if(texto.includes("gym") ||
       texto.includes("gimnasio")){


        return "gym";


    }



    if(texto.includes("estudio") ||
       texto.includes("escuela")){


        return "estudio";


    }



    if(texto.includes("salud") ||
       texto.includes("ejercicio")){


        return "salud";


    }



    if(texto.includes("dinero") ||
       texto.includes("finanza")){


        return "finanzas";


    }



    return "personal";


}

// =====================================
// PROGRESO SEMANAL DEL HABITO
// =====================================

function obtenerProgresoSemanal(habito){


    if(!Array.isArray(habito.historial)){

        return 0;

    }



    const hoy = new Date();


    const diaSemana = hoy.getDay();


    const inicioSemana = new Date(hoy);


    inicioSemana.setDate(
        hoy.getDate() - diaSemana
    );


    inicioSemana.setHours(
        0,0,0,0
    );



    const completados = habito.historial.filter(item=>{


        const fecha =
        new Date(item.fecha);



        return (
            item.completado &&
            fecha >= inicioSemana
        );


    });



    return completados.length;


}

function actualizarRachaSemanal(habito){

    const objetivo =
    habito.objetivoSemanal || 7;

    const semana =
    obtenerSemanaActual();


    if(typeof habito.progresoSemanal !== "number"){

        habito.progresoSemanal = 0;

    }


    if(

        habito.progresoSemanal >= objetivo &&

        habito.ultimaSemanaCumplida !== semana

    ){

        habito.racha++;

        habito.ultimaSemanaCumplida = semana;

    }

}

// =====================================
// SEMANA ACTUAL
// =====================================

function obtenerSemanaActual(){

    const fecha = new Date();

    const inicioAño =
    new Date(fecha.getFullYear(),0,1);


    const dias =
    Math.floor(
        (fecha - inicioAño) /
        (1000 * 60 * 60 * 24)
    );


    const semana =
    Math.ceil(
        (dias + inicioAño.getDay() + 1) / 7
    );


    return fecha.getFullYear() + "-" + semana;

}

// =====================================
// HABITO COMPLETADO SEMANALMENTE
// =====================================

function semanaCompletada(habito){


    const progreso =
    obtenerProgresoSemanal(habito);



    const objetivo =
    habito.objetivoSemanal || 7;



    return progreso >= objetivo;


}