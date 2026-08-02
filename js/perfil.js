/* =====================================================
   HABITX 5.0
   PERFIL DINÁMICO
===================================================== */


document.addEventListener("DOMContentLoaded",()=>{

    actualizarPerfil();

});





function actualizarPerfil(){


    const perfil = obtenerPerfil();



    const nombre = document.getElementById(
        "perfilNombre"
    );


    const nivel = document.getElementById(
        "perfilNivel"
    );


    const xp = document.getElementById(
        "perfilXP"
    );


    const racha = document.getElementById(
        "perfilRacha"
    );


    const textoXP = document.getElementById(
        "xpTexto"
    );


    const barra = document.getElementById(
        "xpBar"
    );



    if(nombre)
        nombre.textContent = perfil.nombre;



    if(nivel)
        nivel.textContent = perfil.nivel;



    if(xp)
        xp.textContent = perfil.xp;



    if(racha)
        racha.textContent = perfil.racha;



    const objetivo = perfil.nivel * 100;



    const porcentaje = 
    (perfil.xp / objetivo) * 100;



    if(barra)
        barra.style.width = porcentaje+"%";



    if(textoXP)

        textoXP.textContent =
        `${perfil.xp} / ${objetivo} XP`;


}