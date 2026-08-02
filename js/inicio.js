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



    const total=habitos.length;





    if(total===0){


        mensaje.textContent=

        "🌱 Empieza creando tu primer hábito";


    }

    else if(completados===total){


        mensaje.textContent=

        "🔥 Día completado. Excelente trabajo";


    }

    else if(completados>0){


        mensaje.textContent=

        "💪 Vas avanzando. Sigue así";


    }

    else{


        mensaje.textContent=

        "🚀 Hoy es una nueva oportunidad";


    }


}

function cargarInicio(){

    cargarInicioPremium();

}