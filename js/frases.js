/* =====================================================
   HABITX 5.0
   UPDATE 1

   Sistema de frases premium
===================================================== */


document.addEventListener("DOMContentLoaded",()=>{


    iniciarFrases();


});





function iniciarFrases(){


    mostrarFecha();


    cargarFraseDelDia();



    const boton = document.getElementById(

        "otraFrase"

    );



    if(boton){


        boton.addEventListener("click",()=>{


            mostrarOtraFrase();


        });


    }


}







function cargarFraseDelDia(){



    const frase = obtenerFraseDelDia();


    mostrarFrase(frase);


}







function mostrarOtraFrase(){


    const indice = Math.floor(

        Math.random()*FRASES.length

    );



    mostrarFrase(

        FRASES[indice]

    );


}








function mostrarFrase(frase){


    const mensaje = document.getElementById(

        "mensajeDia"

    );


    const autor = document.getElementById(

        "autorFrase"

    );


    const categoria = document.getElementById(

        "categoriaFrase"

    );



    if(!mensaje)return;



    mensaje.classList.remove(

        "fade"

    );


    void mensaje.offsetWidth;


    mensaje.classList.add(

        "fade"

    );





    mensaje.textContent =

    `"${frase.texto}"`;





    if(autor){


        autor.textContent =

        "— " + frase.autor;


    }





    if(categoria){


        categoria.textContent =

        obtenerCategoriaBonita(

            frase.categoria

        );


    }


}








function obtenerCategoriaBonita(categoria){


    const categorias={


        disciplina:"📖 Disciplina",


        motivacion:"🔥 Motivación",


        gym:"🏋 Gimnasio",


        productividad:"📈 Productividad"


    };



    return categorias[categoria] ||

    "💚 HabitX";


}








function mostrarFecha(){


    const fecha = document.getElementById(

        "fechaActual"

    );



    if(!fecha)return;



    const opciones={


        weekday:"long",

        day:"numeric",

        month:"long"


    };



    const texto = new Date()

    .toLocaleDateString(

        "es-MX",

        opciones

    );



    fecha.textContent = texto;


}