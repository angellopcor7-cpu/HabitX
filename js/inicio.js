/* =====================================================
   HABITX 5.0 PREMIUM POLISH

   inicio.js

   Dashboard principal
===================================================== */


document.addEventListener("DOMContentLoaded", ()=>{


    cargarInicioPremium();


});

function cargarInicioPremium(){

    actualizarResumenPremium();

mostrarFavoritos();

actualizarSaludo();

actualizarMensaje();

    if(typeof cargarCarruselMetas==="function"){

        cargarCarruselMetas();

    }

}






// =====================================
// RESUMEN
// =====================================


function actualizarResumenPremium(){


    const habitos = obtenerHabitos();



    const total = habitos.length;



    const completados = habitos.filter(

        h=>h.completado

    ).length;



    let porcentaje=0;



    if(total>0){

        porcentaje=Math.round(

            (completados/total)*100

        );

    }






    const totalElemento=document.getElementById(

        "totalHabitos"

    );



    const completadosElemento=document.getElementById(

        "completados"

    );



    const barra=document.getElementById(

        "progressBar"

    );



    const texto=document.getElementById(

        "progressText"

    );





    if(totalElemento)

        totalElemento.textContent=total;





    if(completadosElemento)

        completadosElemento.textContent=completados;





    if(barra){

        setTimeout(()=>{

            barra.style.width=

            porcentaje+"%";


        },300);

    }




    if(texto)

        texto.textContent=

        porcentaje+"%";





    calcularRachaTotal();



}







// =====================================
// RACHA GENERAL
// =====================================


function calcularRachaTotal(){



    const elemento=document.getElementById(

        "racha"

    );



    if(!elemento)return;





    const habitos=obtenerHabitos();




    let mayor=0;



    habitos.forEach(h=>{


        if(h.racha>mayor){

            mayor=h.racha;

        }


    });





    elemento.textContent=mayor;

}





// =====================================
// FAVORITOS
// =====================================


function mostrarFavoritos(){



    const contenedor=document.getElementById(

        "favoritos"

    );



    if(!contenedor)return;





    const habitos=obtenerHabitos();



    const favoritos=habitos.filter(

        h=>h.favorito

    );





    contenedor.innerHTML="";





    if(favoritos.length===0){


        contenedor.innerHTML=

        "⭐ Marca hábitos importantes";

        return;


    }






    favoritos.forEach(h=>{


        const elemento=document.createElement(

            "div"

        );


        elemento.className="mini-card";



        elemento.innerHTML=`

        ⭐ ${h.nombre}

        `;



        contenedor.appendChild(elemento);


    });


}





function obtenerSaludoHora(){

    const hora = new Date().getHours();


    if(hora >= 5 && hora < 12){

        return "☀️ Buenos días";

    }


    if(hora >= 12 && hora < 19){

        return "🌤️ Buenas tardes";

    }


    return "🌙 Buenas noches";

}

function obtenerMensajeFestivo(){

    const fecha = new Date();

    const dia = fecha.getDate();

    const mes = fecha.getMonth()+1;


    const festividades = {


        "5-2":
        "🇲🇽 Feliz Día de la Constitución",


        "24-2":
        "🇲🇽 Feliz Día de la Bandera",


        "21-3":
        "🌱 Feliz Natalicio de Benito Juárez",


        "1-5":
        "👷 Feliz Día del Trabajo",


        "15-5":
        "📚 Feliz Día del Maestro",


        "16-9":
        "🇲🇽 ¡Viva México! Feliz Día de la Independencia",


        "2-11":
        "🕯️ Feliz Día de Muertos",


        "12-12":
        "🙏 Día de la Virgen de Guadalupe"


    };


    const clave = `${dia}-${mes}`;


    return festividades[clave] || null;

}

function actualizarSaludo(){

    const saludo = document.getElementById("saludo");

    if(!saludo)return;

    const festividad = obtenerFestividad();


if(festividad){

    saludo.textContent = festividad;

    return;

}

    const hora = new Date().getHours();


    if(hora >= 5 && hora < 12){

        saludo.textContent = "☀️ Buenos días";

    }

    else if(hora >= 12 && hora < 19){

        saludo.textContent = "🌤️ Buenas tardes";

    }

    else{

        saludo.textContent = "🌙 Buenas noches";

    }

}

function obtenerFestividad(){

    const fecha = new Date();

    const dia = fecha.getDate();

    const mes = fecha.getMonth()+1;


    const eventos = {

        // 🇲🇽 MÉXICO

        "5-2":
        "🇲🇽 Feliz Día de la Constitución",


        "24-2":
        "🇲🇽 Feliz Día de la Bandera",


        "21-3":
        "🌱 Feliz Natalicio de Benito Juárez",


        "30-4":
        "🎉 Feliz Día del Niño",


        "1-5":
        "👷 Feliz Día del Trabajo",


        "5-5":
        "🇲🇽 Conmemoración de la Batalla de Puebla",


        "10-5":
        "💐 Feliz Día de las Madres",


        "15-5":
        "📚 Feliz Día del Maestro",


        "16-9":
        "🇲🇽 ¡Viva México! Feliz Independencia",


        "2-11":
        "🕯️ Feliz Día de Muertos",


        "20-11":
        "🇲🇽 Revolución Mexicana",


        "12-12":
        "🙏 Día de la Virgen de Guadalupe",


        // 🌎 OTRAS FECHAS

        "14-2":
        "❤️ Feliz Día del Amor y la Amistad",


        "8-3":
        "🌸 Día Internacional de la Mujer",


        "22-4":
        "🌎 Día de la Tierra",


        "5-6":
        "🌱 Día Mundial del Medio Ambiente",


        "21-6":
        "☀️ Inicio del verano",


        "31-10":
        "🎃 Feliz Halloween",


        "24-12":
        "🎄 Nochebuena",


        "25-12":
        "🎄 Feliz Navidad",


        "31-12":
        "🎆 Feliz Año Nuevo"

    };


    const clave = `${dia}-${mes}`;


    return eventos[clave] || null;

}
// =====================================
// MENSAJE DEL DIA
// =====================================


function actualizarMensaje(){


    const mensaje=document.getElementById(

        "mensajeDia"

    );



    if(!mensaje)return;




    const habitos=obtenerHabitos();



    const completados=habitos.filter(

        h=>h.completado

    ).length;

    const total = habitos.length;



    const saludo = obtenerSaludoHora();

    const festivo = obtenerMensajeFestivo();

let mensajeDia="";


if(total===0){


    mensajeDia=

    "🌱 Empieza creando tu primer hábito";


}

else if(completados===total){


    mensajeDia=

    "🔥 Día completado. Excelente trabajo";


}

else if(completados>0){


    mensajeDia=

    "💪 Vas avanzando. Sigue así";


}

else{


    mensajeDia=

    "🚀 Hoy es una nueva oportunidad";


}



if(festivo){


    mensaje.textContent =

    festivo

    + "\n\n"

    + "✨ Disfruta este día y sigue creciendo.";


}
else{


    mensaje.textContent =

    saludo

    + "\n\n"

    + mensajeDia;


}
}

function cargarInicio(){

    cargarInicioPremium();

}