/* =====================================================
   HABITX 5.0 PREMIUM POLISH

   storage.js
   Sistema avanzado de almacenamiento
===================================================== */


const STORAGE_KEYS = {

    HABITOS: "habitx_habitos",

    CATEGORIAS: "habitx_categorias",

    ACTIVIDAD: "habitx_actividad",

    CONFIG: "habitx_config",

    LOGROS: "habitx_logros",

    METAS: "habitx_metas",

    PERFIL: "habitx_perfil",

    FINANZAS: "habitx_finanzas",

    RECORDATORIOS:"habitx_recordatorios",

};




// =====================================
// SISTEMA GENERAL
// =====================================


function guardarDatos(clave, datos){

    localStorage.setItem(

        clave,

        JSON.stringify(datos)

    );

}





function obtenerDatos(clave){


    const datos = localStorage.getItem(clave);



    if(!datos){

        return [];

    }



    return JSON.parse(datos);


}





function eliminarDatos(clave){

    localStorage.removeItem(clave);

}





// =====================================
// HABITOS
// =====================================


function guardarHabitos(habitos){

    guardarDatos(

        STORAGE_KEYS.HABITOS,

        habitos

    );

}





function obtenerHabitos(){


    return obtenerDatos(

        STORAGE_KEYS.HABITOS

    );


}





function crearNuevoHabito(datos){


    const habitos = obtenerHabitos();



    const nuevoHabito = {


        id: crearID(),


        nombre: datos.nombre,


        categoria: datos.categoria || "Personal",


        hora: datos.hora || "",

        frecuencia: datos.frecuencia || "diario",

        objetivoSemanal:
datos.frecuencia === "diario"
? 7
: Number(datos.frecuencia),

        favorito:false,


        completado:false,


        racha:0,

progresoSemanal:0,

ultimaSemana:obtenerSemanaActual(),

ultimaSemanaCumplida:null,

historial:[],


        fechaCreacion:Date.now()


    };



    habitos.push(nuevoHabito);



    guardarHabitos(habitos);



    return nuevoHabito;


}







// =====================================
// CATEGORIAS
// =====================================


function guardarCategorias(categorias){


    guardarDatos(

        STORAGE_KEYS.CATEGORIAS,

        categorias

    );


}





function obtenerCategorias(){


    return obtenerDatos(

        STORAGE_KEYS.CATEGORIAS

    );


}





// =====================================
// ACTIVIDAD
// =====================================


function guardarActividad(actividad){


    guardarDatos(

        STORAGE_KEYS.ACTIVIDAD,

        actividad

    );


}





function obtenerActividad(){


    return obtenerDatos(

        STORAGE_KEYS.ACTIVIDAD

    );


}





function agregarActividad(texto){


    const actividad = obtenerActividad();



    actividad.unshift({


        texto:texto,


        fecha:Date.now()


    });



    guardarActividad(

        actividad.slice(0,20)

    );


}





// =====================================
// CONFIGURACION
// =====================================


function guardarConfiguracion(config){


    guardarDatos(

        STORAGE_KEYS.CONFIG,

        config

    );


}





function obtenerConfiguracion(){


    const config = localStorage.getItem(

        STORAGE_KEYS.CONFIG

    );



    if(!config){


        return {

    nombre:"",

    tema:"dark",

    xp:0,

    nivel:1,

    racha:0,

    notificaciones:false

};


    }



    return JSON.parse(config);


}






// =====================================
// PERFIL Y EXPERIENCIA
// =====================================


function obtenerPerfil(){

    return obtenerConfiguracion();

}




function guardarPerfil(perfil){

    guardarConfiguracion(perfil);

}




function agregarXP(cantidad){


    const perfil = obtenerPerfil();


    perfil.xp += cantidad;



    while(perfil.xp >= perfil.nivel * 100){


        perfil.xp -= perfil.nivel * 100;


        perfil.nivel++;


    }



    guardarPerfil(perfil);



    return perfil;


}


// =====================================
// LIMPIAR APP
// =====================================


function limpiarHabitX(){


    Object.values(STORAGE_KEYS)

    .forEach(clave=>{


        localStorage.removeItem(clave);


    });


}

function obtenerLogros(){

    return obtenerDatos(STORAGE_KEYS.LOGROS);

}

function guardarLogros(logros){

    guardarDatos(STORAGE_KEYS.LOGROS,logros);

}

function agregarLogro(logro){

    const logros = obtenerLogros();

    logros.unshift(logro);

    guardarLogros(logros);

}
// =====================================
// FINANZAS
// =====================================


STORAGE_KEYS.FINANZAS = "habitx_finanzas";



function obtenerFinanzas(){

    return obtenerDatos(
        STORAGE_KEYS.FINANZAS
    );

}



function guardarFinanzas(finanzas){

    guardarDatos(
        STORAGE_KEYS.FINANZAS,
        finanzas
    );

}




function agregarMovimientoFinanzas(movimiento){


    const finanzas =
    obtenerFinanzas();



    finanzas.unshift({

        id: crearID(),

        tipo: movimiento.tipo,

        cantidad: Number(movimiento.cantidad),

        concepto: movimiento.concepto,

        fecha: Date.now()

    });



    guardarFinanzas(finanzas);


}

// =====================================
// PROXIMOS GASTOS
// =====================================


function obtenerProximosGastos(){


    return JSON.parse(

        localStorage.getItem(
            "PROXIMOS_GASTOS"
        )

    ) || [];


}



function guardarProximosGastos(gastos){


    localStorage.setItem(

        "PROXIMOS_GASTOS",

        JSON.stringify(gastos)

    );


}

function obtenerRecordatorios(){


    return obtenerDatos(

        STORAGE_KEYS.RECORDATORIOS

    );


}



function guardarRecordatorios(recordatorios){


    guardarDatos(

        STORAGE_KEYS.RECORDATORIOS,

        recordatorios

    );


}