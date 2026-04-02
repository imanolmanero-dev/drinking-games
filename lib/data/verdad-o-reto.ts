import type { Intensidad } from "./yo-nunca";

export interface VerdadOReto {
  texto: string;
  tipo: "verdad" | "reto";
  nivel: Intensidad;
}

export const VERDADES: VerdadOReto[] = [
  // ═══════════════════════════════════
  // 🟢 SOFT (27)
  // ═══════════════════════════════════
  { texto: "¿Cuál es la cosa más vergonzosa que has hecho en público?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Alguna vez has llorado viendo una peli o serie? ¿Cuál?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es el apodo más vergonzoso que te han puesto?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Alguna vez has roto algo y culpado a otro?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es tu mayor inseguridad?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Qué es lo más raro que has buscado en Google?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es la comida más asquerosa que has probado?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Has fingido que te gustaba algo solo por encajar?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es tu mayor fobia?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Alguna vez te has reído en un momento totalmente inapropiado?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es el peor regalo que has recibido?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Has hablado solo/a alguna vez?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es tu canción guilty pleasure?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Qué serie o peli has visto más veces?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es tu peor hábito que intentas esconder?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Alguna vez has fingido estar enfermo para faltar a algo?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Has hecho trampas jugando a algo?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es la mentira más tonta que has dicho?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es tu talento más inútil?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Has tenido un amigo imaginario?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuánto tiempo máximo has pasado sin ducharte?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es la cosa más tacaña que has hecho?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Has inventado una excusa absurda para no quedar con alguien?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Cuál es tu mayor manía?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Qué harías si tuvieras un día invisible?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Te llevas bien con todos los de este grupo o hay alguien que no?", tipo: "verdad", nivel: "soft" },
  { texto: "¿Has espiado a algún vecino?", tipo: "verdad", nivel: "soft" },

  // ═══════════════════════════════════
  // 🟡 NORMAL (27)
  // ═══════════════════════════════════
  { texto: "¿Cuál es la mentira más grande que has dicho a tus padres?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Alguna vez has fingido estar borracho/a? ¿Por qué?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Quién es la persona más atractiva de este grupo?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es tu mayor secreto que nadie aquí sabe?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es la cosa más vergonzosa que has hecho estando borracho/a?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has enviado un mensaje de texto del que te arrepientas?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Qué es lo peor que has hecho en el trabajo o en clase?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has stalkeado a alguien en redes sociales? ¿A quién?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es la cosa más ilegal que has hecho?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Alguna vez has mentido en una cita?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has copiado en un examen importante?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Quién fue tu primer amor y qué pasó?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Alguna vez has dicho 'te quiero' sin sentirlo?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es la peor cita que has tenido?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has hecho algo solo para impresionar a alguien?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has vuelto con un/una ex? ¿cuántas veces?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es tu mayor arrepentimiento en la vida?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Qué es lo más loco que has hecho por un reto?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has dejado de hablar a alguien sin explicar por qué?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Te han pillado en una mentira gorda? ¿Cuál?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es la mayor tontería que has hecho borracho/a?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has cotilleado algo que prometiste no contar?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál ha sido la lección de vida más dura que aprendiste?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Has fingido que no veías a alguien para no saludarle?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es la persona de la que más te ha costado despedirte?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Alguna vez has deseado ser otra persona? ¿Quién?", tipo: "verdad", nivel: "normal" },
  { texto: "¿Cuál es la cosa más cara que has roto?", tipo: "verdad", nivel: "normal" },

  // ═══════════════════════════════════
  // 🔴 PICANTE (26)
  // ═══════════════════════════════════
  { texto: "¿Has besado a alguien de este grupo?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Alguna vez te has enamorado de alguien prohibido?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál es tu fantasía más loca?", tipo: "verdad", nivel: "picante" },
  { texto: "Si pudieras besar a alguien de este grupo, ¿a quién?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Has tenido un crush con algún profesor/a?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál es la mayor tontería que has hecho por amor?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuántas personas has besado en tu vida?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál ha sido tu peor experiencia romántica?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Te gusta alguien de este grupo? ¿Quién?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Has tonteado con alguien mientras tenías pareja?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál es la parte del cuerpo que más te atrae de alguien?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuánto es lo máximo que has tardado en tener algo íntimo con alguien?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Has enviado o recibido contenido subido de tono?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál es tu tipo ideal de persona y quién del grupo se parece más?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Has hecho algo sexual de lo que te arrepientas?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Con cuántas personas te has liado en una misma noche?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál ha sido la situación más incómoda durante algo íntimo?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Has tenido un rollo de una noche? ¿Cuántos?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál es el lugar más raro donde te has besado con alguien?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Has elogiado a alguien en secreto sin que lo sepa?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Qué es lo más atrevido que has hecho en una fiesta?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Te atreverías a besar a alguien de este grupo ahora?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Alguna vez has hecho algo íntimo en un lugar público?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál es tu opinión más impopular sobre relaciones?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Cuál es la cosa más loca que alguien te ha pedido en la cama?", tipo: "verdad", nivel: "picante" },
  { texto: "¿Has tenido un sueño erótico con alguien presente?", tipo: "verdad", nivel: "picante" },
];

export const RETOS: VerdadOReto[] = [
  // ═══════════════════════════════════
  // 🟢 SOFT (27)
  // ═══════════════════════════════════
  { texto: "Imita a alguien del grupo hasta que adivinen quién es", tipo: "reto", nivel: "soft" },
  { texto: "Haz 10 flexiones ahora mismo", tipo: "reto", nivel: "soft" },
  { texto: "Canta el estribillo de tu canción favorita", tipo: "reto", nivel: "soft" },
  { texto: "Baila sin música durante 30 segundos", tipo: "reto", nivel: "soft" },
  { texto: "Imita el sonido de 3 animales diferentes", tipo: "reto", nivel: "soft" },
  { texto: "Cuenta un chiste malo y no puedes reírte", tipo: "reto", nivel: "soft" },
  { texto: "Ponte la camiseta del revés el resto de la partida", tipo: "reto", nivel: "soft" },
  { texto: "Intenta hacer el pino o la rueda", tipo: "reto", nivel: "soft" },
  { texto: "Haz 20 sentadillas sin parar", tipo: "reto", nivel: "soft" },
  { texto: "Canta una canción a capella con sentimiento", tipo: "reto", nivel: "soft" },
  { texto: "Habla susurrando durante las próximas 2 rondas", tipo: "reto", nivel: "soft" },
  { texto: "Habla con acento francés durante las próximas 3 rondas", tipo: "reto", nivel: "soft" },
  { texto: "Haz tu mejor imitación de un famoso", tipo: "reto", nivel: "soft" },
  { texto: "Di un piropo al de tu derecha", tipo: "reto", nivel: "soft" },
  { texto: "Mantén contacto visual con alguien del grupo 30 segundos sin reírte", tipo: "reto", nivel: "soft" },
  { texto: "Habla como robot durante los próximos 2 minutos", tipo: "reto", nivel: "soft" },
  { texto: "Haz un rap improvisado de 30 segundos", tipo: "reto", nivel: "soft" },
  { texto: "Camina como si estuvieras en una pasarela de moda", tipo: "reto", nivel: "soft" },
  { texto: "Haz de presentador de noticias y da una noticia inventada", tipo: "reto", nivel: "soft" },
  { texto: "Actúa como tu personaje favorito de peli/serie", tipo: "reto", nivel: "soft" },
  { texto: "Di 5 cosas bonitas de la persona a tu izquierda", tipo: "reto", nivel: "soft" },
  { texto: "Lee tu último mensaje de WhatsApp en voz alta", tipo: "reto", nivel: "soft" },
  { texto: "Haz de mimo durante 1 minuto", tipo: "reto", nivel: "soft" },
  { texto: "Describe a alguien del grupo sin decir su nombre hasta que lo adivinen", tipo: "reto", nivel: "soft" },
  { texto: "Haz una cara rara y mantenerla 15 segundos", tipo: "reto", nivel: "soft" },
  { texto: "Di un trabalenguas sin equivocarte", tipo: "reto", nivel: "soft" },
  { texto: "Cuenta tu peor chiste y hazlo parecer gracioso", tipo: "reto", nivel: "soft" },

  // ═══════════════════════════════════
  // 🟡 NORMAL (27)
  // ═══════════════════════════════════
  { texto: "Deja que el grupo revise tus últimos 5 chats de WhatsApp", tipo: "reto", nivel: "normal" },
  { texto: "Llama a tu último contacto y dile algo bonito", tipo: "reto", nivel: "normal" },
  { texto: "Deja que alguien del grupo publique una story en tu Instagram", tipo: "reto", nivel: "normal" },
  { texto: "Envía un audio vergonzoso al grupo de tu familia", tipo: "reto", nivel: "normal" },
  { texto: "Déjate poner un peinado ridículo", tipo: "reto", nivel: "normal" },
  { texto: "Haz una declaración de amor dramática a alguien del grupo", tipo: "reto", nivel: "normal" },
  { texto: "Deja que el grupo vea tu historial de búsqueda", tipo: "reto", nivel: "normal" },
  { texto: "Bebe un shot de lo que elija el grupo", tipo: "reto", nivel: "normal" },
  { texto: "Deja que alguien te maquille (o te pinte la cara)", tipo: "reto", nivel: "normal" },
  { texto: "Haz un TikTok / Reel ahora mismo", tipo: "reto", nivel: "normal" },
  { texto: "Deja que el grupo elija tu foto de perfil durante 24 horas", tipo: "reto", nivel: "normal" },
  { texto: "Intercambia una prenda con alguien del grupo", tipo: "reto", nivel: "normal" },
  { texto: "Haz un rap improvisado sobre la persona de tu derecha", tipo: "reto", nivel: "normal" },
  { texto: "Come algo que elija el grupo (de lo que haya disponible)", tipo: "reto", nivel: "normal" },
  { texto: "Déjate dibujar algo en la cara con un boli", tipo: "reto", nivel: "normal" },
  { texto: "Haz tu mejor cara seductora y mantenla 10 segundos", tipo: "reto", nivel: "normal" },
  { texto: "Publica algo absurdo en tus estados de WhatsApp", tipo: "reto", nivel: "normal" },
  { texto: "Llama a alguien y dile 'te echo de menos' sin explicar por qué", tipo: "reto", nivel: "normal" },
  { texto: "Deja que alguien responda tu próximo mensaje de WhatsApp", tipo: "reto", nivel: "normal" },
  { texto: "Corre al punto más lejano del lugar y vuelve", tipo: "reto", nivel: "normal" },
  { texto: "Haz una videollamada a alguien y que el grupo le hable", tipo: "reto", nivel: "normal" },
  { texto: "Deja que alguien te haga el peinado más loco posible", tipo: "reto", nivel: "normal" },
  { texto: "Muéstrale al grupo la última foto de tu galería", tipo: "reto", nivel: "normal" },
  { texto: "Imita una escena romántica con alguien del grupo", tipo: "reto", nivel: "normal" },
  { texto: "Envía un emoji de corazón al último contacto con el que hablaste", tipo: "reto", nivel: "normal" },
  { texto: "Haz que alguien del grupo se ría en 15 segundos", tipo: "reto", nivel: "normal" },
  { texto: "Comparte una captura de pantalla de tu app de recientes", tipo: "reto", nivel: "normal" },

  // ═══════════════════════════════════
  // 🔴 PICANTE (26)
  // ═══════════════════════════════════
  { texto: "Manda un mensaje a tu ex diciendo 'te echo de menos'", tipo: "reto", nivel: "picante" },
  { texto: "Besa la mejilla de alguien del grupo que elija el resto", tipo: "reto", nivel: "picante" },
  { texto: "Haz un baile sexy durante 20 segundos", tipo: "reto", nivel: "picante" },
  { texto: "Deja que alguien del grupo mande un DM desde tu Instagram", tipo: "reto", nivel: "picante" },
  { texto: "Quítate una prenda (calcetines no cuentan)", tipo: "reto", nivel: "picante" },
  { texto: "Susurra algo al oído de la persona a tu izquierda", tipo: "reto", nivel: "picante" },
  { texto: "Siéntate a alguien del grupo en las rodillas 30 segundos", tipo: "reto", nivel: "picante" },
  { texto: "Deja que alguien escriba lo que quiera en tu espalda", tipo: "reto", nivel: "picante" },
  { texto: "Actúa tu escena favorita de romance de película", tipo: "reto", nivel: "picante" },
  { texto: "Di tu mejor piropo en voz alta a alguien del grupo", tipo: "reto", nivel: "picante" },
  { texto: "Deja que alguien del grupo te ponga un apodo atrevido el resto del juego", tipo: "reto", nivel: "picante" },
  { texto: "Lame la mano de la persona a tu derecha", tipo: "reto", nivel: "picante" },
  { texto: "Haz un baile lento con la persona que el grupo elija", tipo: "reto", nivel: "picante" },
  { texto: "Envía un 'estoy pensando en ti' a la persona con la que más tonteas", tipo: "reto", nivel: "picante" },
  { texto: "Enseña tu chat más picante a una persona del grupo", tipo: "reto", nivel: "picante" },
  { texto: "Describe al grupo tu tipo ideal con todo detalle", tipo: "reto", nivel: "picante" },
  { texto: "Manda un emoji de fuego a la tercera persona de tus DMs", tipo: "reto", nivel: "picante" },
  { texto: "Deja que alguien del grupo te ponga body lotion en los brazos", tipo: "reto", nivel: "picante" },
  { texto: "Abraza a alguien del grupo durante 30 segundos diciendo bonito", tipo: "reto", nivel: "picante" },
  { texto: "Llama a alguien y dile que le invitas a salir (sin explicar)", tipo: "reto", nivel: "picante" },
  { texto: "Haz body shots con la persona a tu derecha", tipo: "reto", nivel: "picante" },
  { texto: "Deja que el grupo elija una persona y hazle un masaje en los hombros", tipo: "reto", nivel: "picante" },
  { texto: "Dale un abrazo de oso a cada persona del grupo", tipo: "reto", nivel: "picante" },
  { texto: "Cuenta tu fantasía más suave con todo detalle", tipo: "reto", nivel: "picante" },
  { texto: "Haz tu poses más seductoras mientras el grupo te filma", tipo: "reto", nivel: "picante" },
  { texto: "Escribe un mensaje coqueto a alguien que el grupo elija", tipo: "reto", nivel: "picante" },
];

export function filtrarVerdades(niveles: Intensidad[]): VerdadOReto[] {
  const verdades = VERDADES;
  if (niveles.length === 0) return verdades;
  return verdades.filter((v) => niveles.includes(v.nivel));
}

export function filtrarRetos(niveles: Intensidad[]): VerdadOReto[] {
  const retos = RETOS;
  if (niveles.length === 0) return retos;
  return retos.filter((r) => niveles.includes(r.nivel));
}
