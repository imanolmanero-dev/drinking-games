export type Intensidad = "soft" | "normal" | "picante";

export interface PreguntaYoPrefiero {
  id: number;
  opcionA: string;
  opcionB: string;
  intensidad: Intensidad;
}

export const preguntas: PreguntaYoPrefiero[] = [
  // ── SOFT ──
  { id: 1, opcionA: "Poder volar", opcionB: "Ser invisible", intensidad: "soft" },
  { id: 2, opcionA: "Vivir en la playa", opcionB: "Vivir en la montaña", intensidad: "soft" },
  { id: 3, opcionA: "Tener un perro", opcionB: "Tener un gato", intensidad: "soft" },
  { id: 4, opcionA: "Verano eterno", opcionB: "Invierno eterno", intensidad: "soft" },
  { id: 5, opcionA: "Madrugar siempre", opcionB: "Trasnochar siempre", intensidad: "soft" },
  { id: 6, opcionA: "Pizza para siempre", opcionB: "Hamburguesas para siempre", intensidad: "soft" },
  { id: 7, opcionA: "Ser muy famoso/a", opcionB: "Ser muy rico/a", intensidad: "soft" },
  { id: 8, opcionA: "Vivir en una gran ciudad", opcionB: "Vivir en el campo", intensidad: "soft" },
  { id: 9, opcionA: "Quedarte sin música para siempre", opcionB: "Quedarte sin series para siempre", intensidad: "soft" },
  { id: 10, opcionA: "Saber hablar todos los idiomas", opcionB: "Dominar todos los instrumentos musicales", intensidad: "soft" },
  { id: 11, opcionA: "Tener mucha suerte siempre", opcionB: "Ser increíblemente inteligente", intensidad: "soft" },
  { id: 12, opcionA: "Poder detener el tiempo", opcionB: "Poder retroceder en el tiempo", intensidad: "soft" },
  { id: 13, opcionA: "Conocer tu futuro", opcionB: "Poder cambiar tu pasado", intensidad: "soft" },
  { id: 14, opcionA: "Vivir 100 años con salud normal", opcionB: "Vivir 60 años al máximo", intensidad: "soft" },
  { id: 15, opcionA: "Que siempre haga sol", opcionB: "Que siempre llueva", intensidad: "soft" },
  { id: 16, opcionA: "Un trabajo que amas pero cobra poco", opcionB: "Un trabajo que odias pero te hace millonario/a", intensidad: "soft" },
  { id: 17, opcionA: "Viajar por el mundo solo/a", opcionB: "Viajar con tu mejor amigo/a sin salir del país", intensidad: "soft" },
  { id: 18, opcionA: "Teleportarte a cualquier lugar", opcionB: "Leer la mente de cualquier persona un segundo", intensidad: "soft" },
  { id: 19, opcionA: "Ser el/la más gracioso/a de tu grupo", opcionB: "Ser el/la más atractivo/a de tu grupo", intensidad: "soft" },
  { id: 20, opcionA: "Tener 10 amigos íntimos", opcionB: "Tener 1.000 conocidos superficiales", intensidad: "soft" },
  // ── NORMAL ──
  { id: 21, opcionA: "Olvidar toda tu vida pasada", opcionB: "No poder crear nuevos recuerdos", intensidad: "normal" },
  { id: 22, opcionA: "Perder todos tus amigos", opcionB: "Perder toda tu familia", intensidad: "normal" },
  { id: 23, opcionA: "Quedarte sin móvil un año", opcionB: "Quedarte sin internet un año", intensidad: "normal" },
  { id: 24, opcionA: "Nunca poder mentir", opcionB: "Nunca poder decir la verdad", intensidad: "normal" },
  { id: 25, opcionA: "Saber la fecha exacta de tu muerte", opcionB: "Saber la causa de tu muerte", intensidad: "normal" },
  { id: 26, opcionA: "Repetir la peor semana de tu vida", opcionB: "No poder recordar jamás la mejor noche de tu vida", intensidad: "normal" },
  { id: 27, opcionA: "Que todos vean tu historial de búsqueda", opcionB: "Que todos lean tus mensajes privados", intensidad: "normal" },
  { id: 28, opcionA: "Llorar en el trabajo delante de todos", opcionB: "Reírte a carcajadas en un funeral", intensidad: "normal" },
  { id: 29, opcionA: "Tener siempre razón pero que nadie te crea", opcionB: "Equivocarte siempre pero que todos confíen en ti", intensidad: "normal" },
  { id: 30, opcionA: "Que tu ex lea tus pensamientos una semana", opcionB: "Tú leer los de tu ex una semana", intensidad: "normal" },
  { id: 31, opcionA: "No poder usar redes sociales nunca más", opcionB: "No poder salir de tu país nunca más", intensidad: "normal" },
  { id: 32, opcionA: "Que te quiten 5 años de vida", opcionB: "Que te quiten el 50% de tu dinero", intensidad: "normal" },
  { id: 33, opcionA: "Vivir sin amor romántico", opcionB: "Vivir sin amistades", intensidad: "normal" },
  { id: 34, opcionA: "Saber lo que dicen de ti tus amigos", opcionB: "Que tus amigos sepan lo que piensas de ellos", intensidad: "normal" },
  { id: 35, opcionA: "Descubrir que eres adoptado/a", opcionB: "Descubrir que tu mejor amigo/a te mintió durante años", intensidad: "normal" },
  { id: 36, opcionA: "Que tu mayor vergüenza sea pública", opcionB: "Que tu mayor secreto lo sepa solo tu familia", intensidad: "normal" },
  { id: 37, opcionA: "Tener siempre hambre aunque comas", opcionB: "Tener siempre sueño aunque duermas", intensidad: "normal" },
  { id: 38, opcionA: "Ser siempre el segundo en todo", opcionB: "Ser el primero en algo completamente irrelevante", intensidad: "normal" },
  { id: 39, opcionA: "Perder 10 años de recuerdos pasados", opcionB: "Perder 10 años de futuro", intensidad: "normal" },
  { id: 40, opcionA: "Que tu ex sea más feliz sin ti", opcionB: "Que tu ex te odie profundamente", intensidad: "normal" },
  { id: 41, opcionA: "Que todos en tu trabajo te vean sin ropa", opcionB: "Que tu jefe lea todos tus mensajes del último año", intensidad: "normal" },
  { id: 42, opcionA: "Que tu pareja sepa todo tu historial romántico", opcionB: "Saber todo el historial romántico de tu pareja", intensidad: "normal" },
  { id: 43, opcionA: "Poder sentir las emociones de todos", opcionB: "Que todos puedan sentir tus emociones", intensidad: "normal" },
  // ── PICANTE ──
  { id: 44, opcionA: "Sexo increíble con alguien que no te atrae", opcionB: "Sexo mediocre con la persona más guapa que conoces", intensidad: "picante" },
  { id: 45, opcionA: "Una noche con tu crush actual", opcionB: "Tres noches con alguien desconocido/a increíble en la cama", intensidad: "picante" },
  { id: 46, opcionA: "Que tu familia vea tus fotos más comprometedoras", opcionB: "Que tu jefe las vea", intensidad: "picante" },
  { id: 47, opcionA: "Acostarte con el/la mejor amigo/a de tu ex", opcionB: "Con un/a famoso/a que no te gusta nada", intensidad: "picante" },
  { id: 48, opcionA: "Nunca más tener sexo", opcionB: "Tenerlo solo con desconocidos/as", intensidad: "picante" },
  { id: 49, opcionA: "Confesar tu mayor fetiche a toda tu familia", opcionB: "Publicarlo de forma anónima en redes sociales", intensidad: "picante" },
  { id: 50, opcionA: "Besarte con tu peor enemigo/a", opcionB: "No poder besar a nadie en un año", intensidad: "picante" },
  { id: 51, opcionA: "Tener sexo en un lugar público", opcionB: "En casa de tus padres mientras están en casa", intensidad: "picante" },
  { id: 52, opcionA: "Que todas tus exparejas se reúnan a hablar de ti", opcionB: "Que lo hagan tus amigos/as más íntimos/as", intensidad: "picante" },
  { id: 53, opcionA: "Liarte con alguien 15 años mayor que tú", opcionB: "Con alguien 15 años menor que tú", intensidad: "picante" },
  { id: 54, opcionA: "Mandar un mensaje íntimo a alguien equivocado", opcionB: "Que alguien te lo mande a ti sin querer", intensidad: "picante" },
  { id: 55, opcionA: "Ver las fantasías íntimas de cualquier persona", opcionB: "Que cualquier persona pueda ver las tuyas", intensidad: "picante" },
  { id: 56, opcionA: "Hacer un striptease para 10 extraños", opcionB: "Confesar a tu familia lo más atrevido que hayas hecho", intensidad: "picante" },
  { id: 57, opcionA: "Que tu ex vea con quién estás ahora", opcionB: "Que tu crush vea todas tus exparejas", intensidad: "picante" },
  { id: 58, opcionA: "Tener una aventura de una noche con tu jefe/a", opcionB: "Con el/la mejor amigo/a de tu pareja", intensidad: "picante" },
  { id: 59, opcionA: "Que graben tus sueños y los vea tu familia", opcionB: "Que tu pareja vea tus búsquedas nocturnas", intensidad: "picante" },
  { id: 60, opcionA: "Que tu ex sepa lo que piensas de su relación actual", opcionB: "Que tu pareja sepa lo que piensas de tu ex", intensidad: "picante" },
];

export function filtrarPorIntensidad(intensidades: Intensidad[]): PreguntaYoPrefiero[] {
  return preguntas.filter((p) => intensidades.includes(p.intensidad));
}
