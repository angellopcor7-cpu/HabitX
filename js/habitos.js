

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

    let cambios = false;

    habitos.forEach(habito=>{

        if(
            habito.completado &&
            habito.ultimaFecha !== hoy
        ){

            habito.completado = false;

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
${habito.completado ? "completado":""}`;


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






        <div class="habito-progreso">


            <span style="width:${progreso}%"></span>


        </div>







        <div class="habito-actions">



            <button

            class="btn-completar"

            onclick="completarHabito('${habito.id}')">


            ${habito.completado ? "✅ Completado":"⭕ Completar"}


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

    habito.completado = !habito.completado;


    /* =====================================
       COMPLETAR
    ===================================== */

    if(habito.completado){

        habito.racha++;

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
