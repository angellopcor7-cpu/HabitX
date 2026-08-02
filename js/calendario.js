/* =====================================================
   HABITX 5.1
   CALENDARIO
===================================================== */


let fechaCalendario = new Date();



document.addEventListener("DOMContentLoaded",()=>{


    cargarCalendario();


});





function cargarCalendario(){


    const contenedor =
    document.getElementById(
        "calendarioDias"
    );


    const titulo =
    document.getElementById(
        "nombreMes"
    );


    if(!contenedor)return;



    contenedor.innerHTML="";



    const mes =
    fechaCalendario.getMonth();


    const año =
    fechaCalendario.getFullYear();



    titulo.textContent =
    nombreMes(mes)+" "+año;



    const total =
    diasDelMes(
        mes,
        año
    );



    const primerDia =
    new Date(
        año,
        mes,
        1
    ).getDay();



    for(let i=1;i<primerDia;i++){


        const espacio =
        document.createElement("div");


        contenedor.appendChild(
            espacio
        );


    }



    for(let dia=1;dia<=total;dia++){


        const boton =
        document.createElement("div");


        boton.className =
        "dia-calendario";


        boton.textContent =
        dia;

        const fechaDia =
`${año}-${String(mes+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;



if(diaCompletado(fechaDia)){


    boton.classList.add(
        "dia-completo"
    );


}


        contenedor.appendChild(
            boton
        );


    }

}


function diaCompletado(fecha){


    const habitos =
    obtenerHabitos();



    return habitos.some(habito=>{


        return habito.historial.some(d=>{


            return d.fecha===fecha
            &&
            d.completado;


        });


    });


}