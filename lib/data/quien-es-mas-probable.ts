import type { Intensidad } from "./yo-nunca";

export interface PreguntaQEMP {
  texto: string;
  nivel: Intensidad;
}

export const PREGUNTAS_QEMP: PreguntaQEMP[] = [
  // 🟢 SOFT
  { texto: "¿Quién es más probable que llegue tarde a su propia boda?", nivel: "soft" },
  { texto: "¿Quién es más probable que sobreviva en una isla desierta?", nivel: "soft" },
  { texto: "¿Quién es más probable que se quede dormido/a en una fiesta?", nivel: "soft" },
  { texto: "¿Quién es más probable que llore viendo una película?", nivel: "soft" },
  { texto: "¿Quién es más probable que se haga viral en TikTok?", nivel: "soft" },
  { texto: "¿Quién es más probable que gaste todo su dinero en comida?", nivel: "soft" },
  { texto: "¿Quién es más probable que se haga famoso/a?", nivel: "soft" },
  { texto: "¿Quién es más probable que adopte 10 gatos?", nivel: "soft" },
  { texto: "¿Quién es más probable que se pierda en su propia ciudad?", nivel: "soft" },
  { texto: "¿Quién es más probable que gane un concurso de comer?", nivel: "soft" },
  { texto: "¿Quién es más probable que sea el/la DJ de la noche?", nivel: "soft" },
  { texto: "¿Quién es más probable que sea el/la primero/a en irse de la fiesta?", nivel: "soft" },
  { texto: "¿Quién es más probable que se olvide de su cartera/móvil?", nivel: "soft" },
  { texto: "¿Quién es más probable que duerma hasta las 3 de la tarde?", nivel: "soft" },
  { texto: "¿Quién es más probable que haga una locura por un reto?", nivel: "soft" },
  { texto: "¿Quién es más probable que cancele planes a última hora?", nivel: "soft" },
  { texto: "¿Quién es más probable que sea el/la mejor cocinero/a?", nivel: "soft" },
  { texto: "¿Quién es más probable que se ría en el peor momento?", nivel: "soft" },
  { texto: "¿Quién es más probable que haga un viaje espontáneo?", nivel: "soft" },
  { texto: "¿Quién es más probable que gane un reality show?", nivel: "soft" },
  // 🟡 NORMAL
  { texto: "¿Quién es más probable que acabe borracho/a primero esta noche?", nivel: "normal" },
  { texto: "¿Quién es más probable que termine en urgencias?", nivel: "normal" },
  { texto: "¿Quién es más probable que vomite esta noche?", nivel: "normal" },
  { texto: "¿Quién es más probable que pierda el móvil en una fiesta?", nivel: "normal" },
  { texto: "¿Quién es más probable que mande un mensaje borracho/a a su ex?", nivel: "normal" },
  { texto: "¿Quién es más probable que haga algo de lo que se arrepienta mañana?", nivel: "normal" },
  { texto: "¿Quién es más probable que sea el/la último/a en dejar la fiesta?", nivel: "normal" },
  { texto: "¿Quién es más probable que mienta sobre lo que hizo en la noche?", nivel: "normal" },
  { texto: "¿Quién es más probable que se suba a una mesa a bailar?", nivel: "normal" },
  { texto: "¿Quién es más probable que no se acuerde de nada mañana?", nivel: "normal" },
  { texto: "¿Quién es más probable que haga ghosting a alguien?", nivel: "normal" },
  { texto: "¿Quién es más probable que se meta en una pelea?", nivel: "normal" },
  { texto: "¿Quién es más probable que pida un Uber a las 5 de la mañana?", nivel: "normal" },
  { texto: "¿Quién es más probable que confiese un secreto estando borracho/a?", nivel: "normal" },
  { texto: "¿Quién es más probable que le echen de un bar?", nivel: "normal" },
  { texto: "¿Quién es más probable que cotillee de esta noche al día siguiente?", nivel: "normal" },
  { texto: "¿Quién es más probable que se quede dormido/a en el taxi?", nivel: "normal" },
  { texto: "¿Quién es más probable que haga una apuesta estúpida?", nivel: "normal" },
  { texto: "¿Quién es más probable que llame a sus padres borracho/a?", nivel: "normal" },
  { texto: "¿Quién es más probable que termine la noche comiendo kebab?", nivel: "normal" },
  // 🔴 PICANTE
  { texto: "¿Quién es más probable que se líe con alguien esta noche?", nivel: "picante" },
  { texto: "¿Quién es más probable que mande un nude borracho/a?", nivel: "picante" },
  { texto: "¿Quién es más probable que bese a alguien de este grupo?", nivel: "picante" },
  { texto: "¿Quién es más probable que haga un striptease?", nivel: "picante" },
  { texto: "¿Quién es más probable que sea el/la mejor besando?", nivel: "picante" },
  { texto: "¿Quién es más probable que tenga un fetiche raro?", nivel: "picante" },
  { texto: "¿Quién es más probable que acabe en la cama con alguien?", nivel: "picante" },
  { texto: "¿Quién es más probable que sea el/la más salvaje en la intimidad?", nivel: "picante" },
  { texto: "¿Quién es más probable que use apps de citas?", nivel: "picante" },
  { texto: "¿Quién es más probable que tenga fantasías con alguien del grupo?", nivel: "picante" },
  { texto: "¿Quién es más probable que sea infiel?", nivel: "picante" },
  { texto: "¿Quién es más probable que se desnude por un reto?", nivel: "picante" },
  { texto: "¿Quién es más probable que haga body shots?", nivel: "picante" },
  { texto: "¿Quién es más probable que bese a alguien del mismo sexo?", nivel: "picante" },
  { texto: "¿Quién es más probable que haya hecho sexting?", nivel: "picante" },
  { texto: "¿Quién es más probable que flirtee con alguien que tiene pareja?", nivel: "picante" },
  { texto: "¿Quién es más probable que haga la caminata de la vergüenza?", nivel: "picante" },
  { texto: "¿Quién es más probable que tenga un amante secreto?", nivel: "picante" },
  { texto: "¿Quién es más probable que grabe un momento íntimo?", nivel: "picante" },
  { texto: "¿Quién es más probable que haga algo loco en un viaje?", nivel: "picante" },
];

export function filtrarQEMP(niveles: Intensidad[]): PreguntaQEMP[] {
  if (niveles.length === 0) return PREGUNTAS_QEMP;
  return PREGUNTAS_QEMP.filter((p) => niveles.includes(p.nivel));
}
