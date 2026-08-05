/* =====================================
   HABITX
   SISTEMA DE RECORDATORIOS
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{

    iniciarRecordatorios();

});





function iniciarRecordatorios(){


    const config =
    obtenerConfiguracion();


    if(!config.notificaciones){

        return;

    }



    console.log(
        "🔔 Recordatorios HabitX activos"
    );


    revisarRecordatorios();



    setInterval(()=>{


        revisarRecordatorios();


    },60000);



}





function revisarRecordatorios(){


    const habitos =
    obtenerHabitos();


    const ahora =
    new Date();


    const horaActual =

    ahora.getHours()
    .toString()
    .padStart(2,"0")
    +
    ":"
    +
    ahora.getMinutes()
    .toString()
    .padStart(2,"0");



    habitos.forEach(habito=>{


    if(!habito.hora){

        return;

    }

   if(
    habito.completado &&
    habito.ultimaFecha === obtenerFechaActual()
){
    return;

}



    console.log(
        "Revisando:",
        habito.nombre,
        habito.hora,
        horaActual
    );



    const tiempoActual = new Date();

const hora = tiempoActual.getHours();

const minutos = tiempoActual.getMinutes();



const [horaHabitoNumero, minutoHabito] =
habito.hora.split(":").map(Number);



const minutosActuales =
(hora * 60) + minutos;



const minutosHabito =
(horaHabitoNumero * 60) + minutoHabito;



const diferencia =
minutosHabito - minutosActuales;

console.log(
    "Diferencia:",
    diferencia
);

if(diferencia <= 60 && diferencia > 59){


    if(!yaSeEnvio(habito.nombre,"60")){


        enviarNotificacion(

            "HabitX 🌱",

            obtenerMensajeHabito(habito,"60")

        );


        registrarEnvio(
            habito.nombre,
            "60"
        );


    }


}



if(diferencia <= 30 && diferencia >= 29){

    if(!yaSeEnvio(habito.nombre,"30")){


        enviarNotificacion(

            "HabitX 🔥",

            obtenerMensajeHabito(habito,"30")

        );


        registrarEnvio(
            habito.nombre,
            "30"
        );


    }

}



if(diferencia === 0){


    if(!yaSeEnvio(habito.nombre,"0")){


        enviarNotificacion(

            "HabitX 🚀",

            obtenerMensajeHabito(habito,"0")

        );


        registrarEnvio(
            habito.nombre,
            "0"
        );


    }


}

});
}
function yaSeEnvio(habito,tipo){


    const registros =
    obtenerRecordatorios();



    const fecha =
    new Date().toLocaleDateString();



    return registros.some(r=>


        r.habito === habito &&

        r.tipo === tipo &&

        r.fecha === fecha


    );


}
function registrarEnvio(habito,tipo){


    const registros =
    obtenerRecordatorios();



    registros.push({

        habito:habito,

        tipo:tipo,

        fecha:new Date().toLocaleDateString()

    });



    guardarRecordatorios(registros);


}

function obtenerMensajeHabito(habito,tipo){


    let icono="🌱";
    let mensaje="";



    switch(habito.categoria){


        case "Gimnasio":

            icono="💪";

            mensaje =
            "Tu entrenamiento está por comenzar";

        break;



        case "Estudio":

            icono="📚";

            mensaje =
            "Es momento de concentrarte y avanzar";

        break;



        case "Salud":

            icono="🌱";

            mensaje =
            "Tiempo de cuidar tu bienestar";

        break;



        default:

            icono="🔥";

            mensaje =
            "Tu hábito está por comenzar";

    }



    if(tipo==="60"){

        mensaje =
        "En 1 hora: " + mensaje;

    }



    if(tipo==="30"){

        mensaje =
        "En 30 minutos: " + mensaje;

    }



    if(tipo==="0"){

        mensaje =
        "Ahora: " + mensaje;

    }



    return icono + " " + mensaje;


}