/* =====================================================
   HABITX 5.0 GENESIS
   utils.js

   Funciones generales
===================================================== */



// ===============================
// CREAR ID ÚNICO
// ===============================

function crearID(){

    return Date.now().toString(36) +

    Math.random().toString(36).substring(2);

}





// ===============================
// FORMATO DE FECHA
// ===============================

function obtenerFechaActual(){


    const fecha = new Date();


    return fecha.toISOString().split("T")[0];


}





// ===============================
// FECHA BONITA
// ===============================

function fechaBonita(fecha){


    const nuevaFecha = new Date(fecha);


    return nuevaFecha.toLocaleDateString(
        "es-MX",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );


}





// ===============================
// HORA ACTUAL
// ===============================

function obtenerHora(){


    const fecha = new Date();


    return fecha.toLocaleTimeString(
        "es-MX",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );


}





// ===============================
// ANIMAR NUMEROS
// ===============================

function animarNumero(elemento, inicio, final, tiempo=800){


    let actual=inicio;


    const incremento = final / (tiempo / 16);


    const animacion=setInterval(()=>{


        actual += incremento;


        if(actual>=final){


            actual=final;


            clearInterval(animacion);


        }


        elemento.textContent=Math.floor(actual);


    },16);


}





// ===============================
// ESPERAR
// ===============================

function esperar(ms){

    return new Promise(

        resolver=>setTimeout(resolver,ms)

    );

}





// ===============================
// TEXTO MAYUSCULA
// ===============================

function capitalizar(texto){


    if(!texto) return "";


    return texto.charAt(0).toUpperCase()

    + texto.slice(1);


}





// ===============================
// GENERAR COLOR
// ===============================

function colorAleatorio(){


    const colores=[

        "#10B981",

        "#34D399",

        "#059669",

        "#22C55E"

    ];


    return colores[

        Math.floor(Math.random()*colores.length)

    ];


}





// ===============================
// ORDENAR POR FECHA
// ===============================

function ordenarRecientes(lista){


    return lista.sort(

        (a,b)=>b.fecha-a.fecha

    );


}

// ===============================
// CALENDARIO HABITX 5.1
// ===============================


function obtenerMesActual(){


    const fecha = new Date();


    return {

        mes: fecha.getMonth(),

        año: fecha.getFullYear()

    };


}




function diasDelMes(mes,año){


    return new Date(

        año,

        mes + 1,

        0

    ).getDate();


}





function nombreMes(mes){


    const meses=[

        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"

    ];


    return meses[mes];


}





function obtenerDiaSemana(fecha){


    return new Date(

        fecha

    ).getDay();


}

/* =====================================
   OBTENER SEMANA DEL AÑO
===================================== */

function obtenerSemanaActual(){

    const fecha = new Date();

    const inicioAño = new Date(
        fecha.getFullYear(),
        0,
        1
    );

    const dias = Math.floor(
        (fecha - inicioAño) / 86400000
    );

    return Math.ceil(
        (dias + inicioAño.getDay() + 1) / 7
    );

}