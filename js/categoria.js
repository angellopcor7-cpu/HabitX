/* =====================================================
   HABITX 5.0 GENESIS
   categorias.js

   Sistema de categorías
===================================================== */



document.addEventListener("DOMContentLoaded", ()=>{


    iniciarCategorias();


});





function iniciarCategorias(){


    crearCategoriasBase();


}





// ===============================
// CATEGORIAS INICIALES
// ===============================


function crearCategoriasBase(){


    const categorias=obtenerCategorias();



    if(categorias.length===0){


        const categoriasIniciales=[

            {
                id:crearID(),
                nombre:"Salud",
                color:"#10B981"
            },

            {
                id:crearID(),
                nombre:"Gimnasio",
                color:"#10B981"
            },

            {
                id:crearID(),
                nombre:"Estudio",
                color:"#10B981"
            },

            {
                id:crearID(),
                nombre:"Personal",
                color:"#10B981"
            }

        ];



        guardarCategorias(

            categoriasIniciales

        );


    }


}





// ===============================
// CREAR CATEGORIA
// ===============================


function crearCategoria(nombre){


    const categorias=obtenerCategorias();



    categorias.push({

        id:crearID(),

        nombre:nombre,

        color:colorAleatorio()

    });



    guardarCategorias(categorias);


}





// ===============================
// ELIMINAR CATEGORIA
// ===============================


function eliminarCategoria(id){


    let categorias=obtenerCategorias();



    categorias=categorias.filter(

        categoria=>

        categoria.id!==id

    );



    guardarCategorias(categorias);


}





// ===============================
// BUSCAR CATEGORIA
// ===============================


function obtenerCategoriaPorID(id){


    const categorias=obtenerCategorias();



    return categorias.find(

        categoria=>

        categoria.id===id

    );


}





// ===============================
// RENOMBRAR CATEGORIA
// ===============================


function editarCategoria(id,nuevoNombre){



    const categorias=obtenerCategorias();



    const categoria=categorias.find(

        c=>c.id===id

    );



    if(categoria){


        categoria.nombre=nuevoNombre;


    }



    guardarCategorias(categorias);


}