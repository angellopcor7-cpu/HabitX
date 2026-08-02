/* =====================================================
   HABITX 5.0
   UPDATE 1

   Biblioteca de frases
===================================================== */


const FRASES = [

/* =========================
   DISCIPLINA
========================= */

{
texto:"La disciplina pesa gramos. El arrepentimiento pesa toneladas.",
categoria:"disciplina",
autor:"HabitX"
},

{
texto:"No necesitas motivación todos los días, necesitas compromiso.",
categoria:"disciplina",
autor:"HabitX"
},

{
texto:"Los pequeños hábitos crean grandes cambios.",
categoria:"disciplina",
autor:"HabitX"
},

{
texto:"La constancia es el puente entre tus sueños y tus resultados.",
categoria:"disciplina",
autor:"HabitX"
},

{
texto:"Hazlo incluso cuando nadie esté mirando.",
categoria:"disciplina",
autor:"HabitX"
},

{
texto:"Un día difícil no borra todo tu progreso.",
categoria:"disciplina",
autor:"HabitX"
},



/* =========================
   MOTIVACIÓN
========================= */

{
texto:"Hoy tienes una nueva oportunidad para mejorar.",
categoria:"motivacion",
autor:"HabitX"
},

{
texto:"No esperes el momento perfecto, crea el momento.",
categoria:"motivacion",
autor:"HabitX"
},

{
texto:"Tu futuro se construye con las decisiones de hoy.",
categoria:"motivacion",
autor:"HabitX"
},

{
texto:"Cada avance, por pequeño que sea, cuenta.",
categoria:"motivacion",
autor:"HabitX"
},

{
texto:"Sigue adelante, incluso si avanzas lento.",
categoria:"motivacion",
autor:"HabitX"
},



/* =========================
   GIMNASIO
========================= */

{
texto:"Cada entrenamiento es una inversión en ti.",
categoria:"gym",
autor:"HabitX"
},

{
texto:"La fuerza nace de la repetición.",
categoria:"gym",
autor:"HabitX"
},

{
texto:"No busques resultados rápidos, busca progreso constante.",
categoria:"gym",
autor:"HabitX"
},

{
texto:"La última repetición es donde creces.",
categoria:"gym",
autor:"HabitX"
},



/* =========================
   PRODUCTIVIDAD
========================= */

{
texto:"Organizar tu día es organizar tu futuro.",
categoria:"productividad",
autor:"HabitX"
},

{
texto:"Termina una cosa antes de empezar otra.",
categoria:"productividad",
autor:"HabitX"
},

{
texto:"Cinco minutos de acción son mejores que una hora de excusas.",
categoria:"productividad",
autor:"HabitX"
},

{
texto:"La productividad comienza con una decisión.",
categoria:"productividad",
autor:"HabitX"
},



/* =========================
   BIENESTAR
========================= */

{
texto:"Cuida tu mente igual que cuidas tus metas.",
categoria:"bienestar",
autor:"HabitX"
},

{
texto:"Descansar también forma parte del progreso.",
categoria:"bienestar",
autor:"HabitX"
},

{
texto:"Tu bienestar siempre debe ser una prioridad.",
categoria:"bienestar",
autor:"HabitX"
}

];





function obtenerFraseDelDia(){


    const hoy = new Date();


    const numeroDia = Math.floor(

        hoy.getTime()/86400000

    );


    return FRASES[

        numeroDia % FRASES.length

    ];


}