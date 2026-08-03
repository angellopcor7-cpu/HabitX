let mesCalendario = new Date().getMonth();

let añoCalendario = new Date().getFullYear();

/* =====================================================
   HABITX 7.0
   FINANZAS
===================================================== */
let fechaGastoSeleccionada = null;

document.addEventListener("DOMContentLoaded",()=>{


    iniciarFinanzas();

    cargarCartera();

    cargarIngresos();


});






function iniciarFinanzas(){



    const botonesAbrir =
document.querySelectorAll(
    "#agregarDinero"
);



    const modal =
    document.getElementById(
        "modalDinero"
    );



    const botonCerrar =
    document.getElementById(
        "cancelarDinero"
    );



    const botonGuardar =
    document.getElementById(
        "guardarDinero"
    );

const btnIngresos =
document.getElementById(
    "btnIngresos"
);


const btnEgresos =
document.getElementById(
    "btnEgresos"
);


const btnProximos =
document.getElementById(
    "btnProximos"
);

const modalProximo =
document.getElementById(
    "modalProximo"
);


const cancelarProximo =
document.getElementById(
    "cancelarProximo"
);


const guardarProximo =
document.getElementById(
    "guardarProximo"
);

const modalEgreso =
document.getElementById(
    "modalEgreso"
);


const cancelarEgreso =
document.getElementById(
    "cancelarEgreso"
);


const guardarEgreso =
document.getElementById(
    "guardarEgreso"
);

// =========================
// CERRAR PROXIMO GASTO
// =========================

if(cancelarProximo){

    cancelarProximo.addEventListener(
        "click",
        ()=>{


            modalProximo.classList.remove(
                "show"
            );


        }
    );

}



// =========================
// GUARDAR PROXIMO GASTO
// =========================

if(guardarProximo){

    guardarProximo.addEventListener(
        "click",
        ()=>{


            const nombre =
            document.getElementById(
                "nombreProximo"
            ).value;



            const cantidad =
            document.getElementById(
                "cantidadProximo"
            ).value;



            const fecha = fechaGastoSeleccionada;



            if(nombre==="" || cantidad===""){


                alert(
                    "Completa los datos"
                );


                return;

            }



            const gastos =
obtenerProximosGastos();



gastos.push({

    id:Date.now(),

    nombre:nombre,

    cantidad:Number(cantidad),

    fecha:fecha


});



guardarProximosGastos(
    gastos
);



            modalProximo.classList.remove(
                "show"
            );

        }
    );

}

if(btnIngresos){

    btnIngresos.addEventListener("click",()=>{

        activarFiltroFinanzas(btnIngresos);

        if(modal){

            modal.classList.add("show");

        }

    });

}



if(btnEgresos){

    btnEgresos.addEventListener("click",()=>{


        activarFiltroFinanzas(btnEgresos);


        modalEgreso.classList.add("show");


    });

}



if(btnProximos){

    btnProximos.addEventListener("click",()=>{


        activarFiltroFinanzas(btnProximos);


        mostrarCalendario();


    });

}

if(cancelarEgreso){

    cancelarEgreso.addEventListener(
        "click",
        ()=>{

            modalEgreso.classList.remove(
                "show"
            );

        }
    );

}

if(guardarEgreso){

    guardarEgreso.addEventListener(
        "click",
        ()=>{


            const cantidad =
            document.getElementById(
                "cantidadEgreso"
            ).value;



            const concepto =
            document.getElementById(
                "conceptoEgreso"
            ).value;




            if(cantidad===""){


                alert(
                    "Agrega una cantidad"
                );

                return;

            }




            agregarMovimientoFinanzas({

                tipo:"egreso",

                cantidad:Number(cantidad),

                concepto:
                concepto || "Sin concepto"

            });



            cargarCartera();



            console.log(
                "Egreso guardado correctamente"
            );



            modalEgreso.classList.remove(
                "show"
            );



            document.getElementById(
                "cantidadEgreso"
            ).value="";



            document.getElementById(
                "conceptoEgreso"
            ).value="";


        }
    );

}

if(guardarEgreso){

    guardarEgreso.addEventListener(
        "click",
        ()=>{

            console.log(
                "Guardar egreso"
            );

        }
    );

}


    console.log(
        "Botones dinero:",
        botonesAbrir
    );






    // =========================
    // ABRIR MODAL
    // =========================


    botonesAbrir.forEach(boton=>{


        boton.addEventListener("click",()=>{


            console.log(
                "Abriendo dinero"
            );


            modal.classList.add(
                "show"
            );


        });


    });








    // =========================
    // CERRAR MODAL
    // =========================


    if(botonCerrar){


        botonCerrar.addEventListener(
            "click",
            ()=>{


                modal.classList.remove(
                    "show"
                );


            }
        );


    }









    // =========================
    // GUARDAR DINERO
    // =========================


    if(botonGuardar){


        botonGuardar.addEventListener(
            "click",
            ()=>{


                const cantidad =
                document.getElementById(
                    "cantidadDinero"
                ).value;



                const concepto =
                document.getElementById(
                    "conceptoDinero"
                ).value;






                if(cantidad===""){


                    alert(
                        "Agrega una cantidad"
                    );


                    return;


                }








                agregarMovimientoFinanzas({

    tipo:"ingreso",

    cantidad:Number(cantidad),

    concepto:
    concepto || "Sin concepto"

});

                cargarCartera();

cargarIngresos();

console.log(
    "Dinero guardado correctamente"
);

                modal.classList.remove(
                    "show"
                );

                document.getElementById(
                    "cantidadDinero"
                ).value="";



                document.getElementById(
                    "conceptoDinero"
                ).value="";



            }
        );


    }



}











// =====================================================
// ACTUALIZAR CARTERA
// =====================================================


function cargarCartera(){



    const movimientos =
    obtenerFinanzas();




    let total = 0;






    movimientos.forEach(movimiento=>{


    if(
        movimiento.tipo === "ingreso"
    ){


        total += Number(
            movimiento.cantidad
        );


    }



    if(
        movimiento.tipo === "egreso"
    ){


        total -= Number(
            movimiento.cantidad
        );


    }


});






    const dinero =
    "$" + total.toLocaleString();









    // =========================
    // INICIO
    // =========================


    const saldoInicio =
    document.getElementById(
        "saldoCartera"
    );



    if(saldoInicio){


        saldoInicio.textContent =
        dinero;


    }






    const listaInicio =
    document.getElementById(
        "listaMovimientos"
    );



    pintarMovimientos(
    listaInicio,
    movimientos,
    3
);











    // =========================
    // FINANZAS
    // =========================


    const saldoFinanzas =
    document.getElementById(
        "saldoFinanzas"
    );



    if(saldoFinanzas){


        saldoFinanzas.textContent =
        dinero;


    }







    const contenidoFinanzas =
document.getElementById(
    "contenidoFinanzas"
);


pintarMovimientos(
    contenidoFinanzas,
    movimientos,
    20
);



}











// =====================================================
// PINTAR MOVIMIENTOS
// =====================================================


function pintarMovimientos(
    lista,
    movimientos,
    limite = 3
){



    if(!lista){

        return;

    }






    lista.innerHTML="";







    if(
        movimientos.length===0
    ){


        lista.innerHTML =
        "<p>Sin movimientos</p>";


        return;


    }







    movimientos
    .slice(0,limite)
    .forEach(movimiento=>{


        lista.innerHTML += `


<div class="movimiento">


    ${
        movimiento.tipo === "ingreso"
        ? "💵"
        : "💸"
    }

    ${movimiento.concepto}



    <strong>

        ${
            movimiento.tipo === "ingreso"
            ? "+"
            : "-"
        }

        $${movimiento.cantidad}

    </strong>


</div>


`;


    });



}

// =====================================================
// MOSTRAR INGRESOS EN FINANZAS
// =====================================================

function cargarIngresos(){


    const lista =
    document.getElementById(
        "listaIngresos"
    );


    if(!lista){

        return;

    }



    const movimientos =
    obtenerFinanzas();



    const ingresos =
    movimientos.filter(
        movimiento =>
        movimiento.tipo === "ingreso"
    );



    lista.innerHTML="";



    if(ingresos.length===0){


        lista.innerHTML =
        "<p>No tienes ingresos registrados.</p>";


        return;

    }




    ingresos.slice(0,20).forEach(movimiento=>{


        lista.innerHTML += `

        <div class="movimiento">

            💵 ${movimiento.concepto}

            <strong>
                +$${movimiento.cantidad}
            </strong>

        </div>

        `;


    });


}

function activarFiltroFinanzas(boton){


    document
    .querySelectorAll(".filtro-finanzas")
    .forEach(b=>{


        b.classList.remove("active");


    });



    boton.classList.add("active");


}

// =====================================================
// MOSTRAR PROXIMOS GASTOS
// =====================================================


function cargarProximosGastos(){


    const contenido =
    document.getElementById(
        "contenidoFinanzas"
    );


    if(!contenido){

        return;

    }



    const gastos =
    obtenerProximosGastos();



    contenido.innerHTML = `

        <h3>
            📅 Próximos gastos
        </h3>

    `;



    if(gastos.length===0){


        contenido.innerHTML += `

            <p>
                No tienes gastos programados.
            </p>

        `;


        return;

    }



    gastos.forEach(gasto=>{


        contenido.innerHTML += `


        <div class="movimiento-finanzas">


            📅 ${gasto.nombre}


            <strong>
                $${gasto.cantidad}
            </strong>


            <small>
                ${gasto.fecha}
            </small>


        </div>


        `;


    });


}

// =====================================================
// CALENDARIO FINANZAS
// =====================================================


function mostrarCalendario(){

    console.log("ENTRO AL CALENDARIO");


    const contenido =
    document.getElementById(
        "contenidoFinanzas"
    );


    const fecha =
new Date(
    añoCalendario,
    mesCalendario,
    1
);


    const mes =
    fecha.toLocaleString(
        "es-MX",
        {
            month:"long",
            year:"numeric"
        }
    );



    contenido.innerHTML = `


    <div class="calendario-header">


<button id="mesAnterior">
    ◀
</button>


<h3>
    📅 ${mes}
</h3>


<button id="mesSiguiente">
    ▶
</button>


</div>


    <div class="calendario-gastos">

        ${generarDiasCalendario()}

    </div>


    `;
    document
.getElementById("mesAnterior")
.addEventListener(
"click",
()=>{


    mesCalendario--;


    if(mesCalendario < 0){

        mesCalendario = 11;
        añoCalendario--;

    }


    mostrarCalendario();


});




document
.getElementById("mesSiguiente")
.addEventListener(
"click",
()=>{


    mesCalendario++;


    if(mesCalendario > 11){

        mesCalendario = 0;
        añoCalendario++;

    }


    mostrarCalendario();


});



    document
    .querySelectorAll(".dia-calendario")
    .forEach(dia=>{


        dia.addEventListener(
    "click",
    ()=>{


        const numeroDia =
        Number(
            dia.dataset.dia
        );


        mostrarGastosDelDia(
            numeroDia
        );


    }
);


    });


}

// =====================================================
// GENERAR DIAS CALENDARIO
// =====================================================


function generarDiasCalendario(){


    const fecha = new Date();


    const año = añoCalendario;
const mes = mesCalendario;



    const primerDia =
    new Date(
        año,
        mes,
        1
    ).getDay();



    const diasMes =
    new Date(
        año,
        mes + 1,
        0
    ).getDate();



    let html="";



    // espacios antes del día 1

    let inicio =
    primerDia === 0
    ? 6
    : primerDia - 1;



    for(let i=0;i<inicio;i++){


        html += `

        <div class="dia-vacio"></div>

        `;


    }



    // días del mes

    for(let dia=1; dia<=diasMes; dia++){


    html += `

    <button 
    class="dia-calendario"
    data-dia="${dia}">

        ${dia}

        ${
            tieneGastoEseDia(dia)
            ? "💸"
            : ""
        }

    </button>

    `;


}



    return html;


}

function abrirModalGastoFecha(fecha){


    fechaGastoSeleccionada = fecha;


    const texto =
    document.getElementById(
        "fechaSeleccionadaGasto"
    );


    if(texto){

        texto.textContent =
        "📅 Fecha: " + fecha;

    }


    const modal =
    document.getElementById(
        "modalProximo"
    );


    if(modal){

        modal.classList.add(
            "show"
        );

    }


}

function tieneGastoEseDia(dia){


    const gastos =
    obtenerProximosGastos();



    return gastos.some(gasto=>{


        const partes =
gasto.fecha.split("-");


const año =
Number(partes[0]);


const mes =
Number(partes[1])-1;


const diaGasto =
Number(partes[2]);



        return (

            diaGasto === dia &&

            mes === mesCalendario &&

año === añoCalendario

        );


    });


}

function mostrarGastosDelDia(dia){


    const gastos =
    obtenerProximosGastos();



    const gastosDia =
    gastos.filter(gasto=>{


        const partes =
        gasto.fecha.split("-");


        const año =
        Number(partes[0]);


        const mes =
        Number(partes[1])-1;


        const diaGasto =
        Number(partes[2]);



        return (

            diaGasto === dia &&

            mes === mesCalendario &&

            año === añoCalendario

        );


    });



    if(gastosDia.length === 0){


        abrirModalGastoFecha(
            `${añoCalendario}-${String(mesCalendario+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`
        );


        return;

    }



    mostrarDetalleGastos(
        gastosDia,
        dia
    );


}

function mostrarDetalleGastos(
    gastos,
    dia
){


    const contenido =
    document.getElementById(
        "contenidoFinanzas"
    );



    contenido.innerHTML = `


    <h3>
        📅 Gastos del día ${dia}
    </h3>


    `;



    gastos.forEach(gasto=>{


        contenido.innerHTML += `


        <div class="movimiento">


            💸 ${gasto.nombre}


            <strong>
                $${gasto.cantidad}
            </strong>


            <button
class="btn-eliminar-gasto"
onclick="eliminarGasto(${gasto.id})">

    🗑️

</button>


        </div>


        `;


    });



    contenido.innerHTML += `


    <button
class="btn-agregar-gasto"
id="agregarOtroGasto">

    ➕ Agregar otro

</button>


    `;



    document
.getElementById(
    "agregarOtroGasto"
)
.addEventListener(
    "click",
    ()=>{


        const fechaCorrecta =
        `${añoCalendario}-${String(mesCalendario+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;


        abrirModalGastoFecha(
            fechaCorrecta
        );


    }
);


}

function eliminarGasto(id){


    let gastos =
    obtenerProximosGastos();



    gastos =
    gastos.filter(
        gasto =>
        gasto.id !== id
    );



    guardarProximosGastos(
        gastos
    );



    mostrarCalendario();


}