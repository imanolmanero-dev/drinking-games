// Centralized FAQ data for blog posts
// Each key = blog slug, value = array of FAQ questions+answers
// These are injected as FAQPage JSON-LD in the blog post page for Google rich snippets

export interface FAQ {
  q: string;
  a: string;
}

export const blogFAQs: Record<string, FAQ[]> = {
  "los-20-mejores-juegos": [
    {
      q: "¿Cuáles son los mejores juegos para beber en grupo?",
      a: "Los mejores juegos para beber en grupo son Yo Nunca, Verdad o Reto, Ring of Fire, La Ruleta, Quién Es Más Probable, Medusa, Yo Prefiero, La Bomba, Tabú Borracho y Beer Pong. Todos están disponibles gratis en BeberGames sin necesidad de descargar ninguna app.",
    },
    {
      q: "¿Qué juegos para beber no necesitan materiales?",
      a: "Los juegos para beber sin materiales son Medusa, Yo Nunca, Yo Prefiero, Quién Es Más Probable y La Bomba. Solo necesitáis un móvil con BeberGames abierto y bebidas para todos.",
    },
    {
      q: "¿Cuántas personas se necesitan para jugar a juegos de beber?",
      a: "La mayoría de juegos para beber funcionan desde 2 personas. Para grupos de 4 a 10 personas van perfectos juegos como Ring of Fire, Verdad o Reto, Yo Nunca y Medusa. Para grupos más grandes, Medusa y Quién Es Más Probable son especialmente divertidos.",
    },
    {
      q: "¿Dónde puedo jugar a juegos para beber online gratis?",
      a: "En BeberGames.com tienes 12 juegos para beber completamente gratis, sin registro y sin descargar nada. Solo abre la web en el móvil y empieza a jugar. Incluye Yo Nunca, Verdad o Reto, Medusa, La Bomba, Ring of Fire y más.",
    },
  ],

  "juegos-para-beber-sin-cartas": [
    {
      q: "¿Qué juegos para beber no necesitan cartas ni dados?",
      a: "Los mejores juegos para beber sin cartas son Medusa (contacto visual), La Bomba (temporizador secreto), Yo Prefiero (dilemas en grupo), Yo Nunca (confesiones), Verdad o Reto y Quién Es Más Probable. Todos funcionan solo con un móvil.",
    },
    {
      q: "¿Cómo se juega a Medusa?",
      a: "En Medusa todos los jugadores miran hacia abajo. A la cuenta de 3 (con el móvil haciendo la cuenta atrás), todos miran fijamente a otro jugador. Si dos personas se cruzan la mirada, ambas gritan '¡MEDUSA!' y beben. El último en gritar bebe el doble.",
    },
    {
      q: "¿Cuál es el juego para beber más rápido?",
      a: "Medusa es el juego para beber más rápido: cada ronda dura solo 3 segundos. La Bomba también es muy rápido ya que el temporizador dura entre 12 y 40 segundos. Ambos están disponibles gratis en BeberGames.",
    },
    {
      q: "¿Se puede jugar a juegos de beber sin alcohol?",
      a: "Sí, todos los juegos de BeberGames se pueden jugar con cualquier bebida: agua, refrescos, zumos o bebidas sin alcohol. La dinámia del juego es la misma independientemente de lo que se beba. BeberGames promueve el juego responsable.",
    },
  ],

  "juegos-para-previas": [
    {
      q: "¿Cuáles son los mejores juegos para una previa?",
      a: "Los mejores juegos para previas son los que no requieren mucho espacio ni materiales: Yo Nunca, Yo Prefiero, Medusa, La Bomba y Verdad o Reto. Para previas con más espacio, Ring of Fire y Beer Pong son perfectos. Todos disponibles en BeberGames.",
    },
    {
      q: "¿Cuánto dura una previa normal?",
      a: "Una previa suele durar entre 1 y 2 horas. Te recomendamos tener preparados al menos 3 juegos diferentes para rotar cada 30-40 minutos y mantener la energía alta. Empieza con juegos suaves como Yo Prefiero y escala hacia juegos más intensos como Verdad o Reto.",
    },
    {
      q: "¿Qué juego es mejor para romper el hielo en una previa?",
      a: "Para romper el hielo en una previa, Yo Prefiero y Yo Nunca son los mejores: generan conversación de forma natural, sin la presión de los retos. Medusa también funciona muy bien porque no requiere hablar y crea momentos cómicos inmediatos.",
    },
    {
      q: "¿Cuántas personas son ideales para una previa con juegos de beber?",
      a: "Lo ideal son grupos de 5 a 12 personas. Con menos de 4 algunos juegos pierden gracia. Con más de 15 es difícil gestionar los turnos. Para grupos grandes, Medusa, Quién Es Más Probable y La Bomba funcionan mejor porque todos participan a la vez.",
    },
  ],

  "juegos-para-beber-rapidos": [
    {
      q: "¿Cuáles son los juegos para beber más rápidos?",
      a: "Los juegos para beber más rápidos son Medusa (3 segundos por ronda), La Bomba (12-40 segundos), Verdad o Reto y Yo Prefiero. Son perfectos para cuando no queréis explicar reglas complicadas y queréis empezar ya.",
    },
    {
      q: "¿Qué juego para beber es mejor para pocas personas?",
      a: "Para 2-3 personas, Yo Nunca, Yo Prefiero y Verdad o Reto son los mejores. Para 4+ personas ya funcionan mejor juegos como Medusa, Ring of Fire y Quién Es Más Probable donde el grupo numeroso añade más diversión.",
    },
    {
      q: "¿Cómo se juega a La Bomba?",
      a: "En La Bomba, el móvil actúa como una bomba con un temporizador secreto. Los jugadores se pasan el móvil de mano en mano. Cuando el temporizador llega a cero, el jugador que tenga el móvil en ese momento bebe. Cada ronda tiene un tiempo diferente entre 12 y 40 segundos.",
    },
  ],

  "ring-of-fire-reglas-cartas": [
    {
      q: "¿Qué es el Ring of Fire?",
      a: "El Ring of Fire (también llamado Kings o Rey de la Copa) es un juego de cartas para beber donde se colocan las cartas boca abajo en círculo alrededor de un vaso central. Cada jugador roba una carta y ejecuta la regla de esa carta. El cuarto rey que aparece obliga a beber el vaso central.",
    },
    {
      q: "¿Cuáles son las reglas del Ring of Fire?",
      a: "En el Ring of Fire cada carta tiene una regla distinta: As (waterfall), 2 (tú), 3 (yo), 4 (suelo), 5 (chicos), 6 (chicas), 7 (cielo), 8 (amigo), 9 (rima), 10 (categoría), J (regla), Q (preguntas), K (añade al vaso central y el 4º bebe todo).",
    },
    {
      q: "¿Cuántas personas necesito para jugar al Ring of Fire?",
      a: "El Ring of Fire funciona con 3 o más personas, pero es más divertido con 4-8 jugadores. Se puede jugar con más personas aunque las rondas se alargan más. Disponible como juego digital en BeberGames sin necesidad de una baraja física.",
    },
    {
      q: "¿Cuál es la diferencia entre Ring of Fire y El Rey de la Copa?",
      a: "El Rey de la Copa es la variación española del Ring of Fire. Comparten la mecánica general (cartas en círculo, vaso central) pero tienen reglas por carta diferentes adaptadas al contexto español. Ambos están disponibles en BeberGames.",
    },
  ],

  "juegos-para-beber-con-cartas": [
    {
      q: "¿Qué juegos de beber se pueden jugar con una baraja de cartas?",
      a: "Los principales juegos de beber con cartas son Ring of Fire, El Rey de la Copa, Asno (President), Escoba Borracha y Guerra de Cartas. Ring of Fire y El Rey de la Copa son los más populares y tienen versión digital gratuita en BeberGames.",
    },
    {
      q: "¿Puedo jugar al Ring of Fire sin una baraja física?",
      a: "Sí. En BeberGames tienes una versión digital completa del Ring of Fire y El Rey de la Copa que funciona desde el móvil. No necesitas una baraja de cartas física: la app baraja y muestra las cartas automáticamente.",
    },
    {
      q: "¿Cuánto dura una partida de Ring of Fire?",
      a: "Una partida de Ring of Fire suele durar entre 20 y 45 minutos dependiendo del número de jugadores y la velocidad de las rondas. Con 4-6 jugadores suele durar unos 30 minutos. La versión digital de BeberGames gestiona el tiempo automáticamente.",
    },
  ],

  "juegos-para-botellon": [
    {
      q: "¿Qué juegos son mejores para un botellón?",
      a: "Para un botellón los mejores juegos son los que no necesitan mesa: Medusa, Yo Nunca, La Bomba, Yo Prefiero y Verdad o Reto. Si tenéis una superficie disponible, Beer Pong y Ring of Fire son también perfectos. Todos gratis en BeberGames.",
    },
    {
      q: "¿Cómo organizar un botellón con juegos de beber?",
      a: "Para organizarlo bien: empieza con Medusa o Yo Prefiero para calentar, pasa a Yo Nunca o Verdad o Reto cuando el grupo esté más suelto, y reserva Beer Pong o Ring of Fire para la parte central. Rota juegos cada 30-40 minutos para mantener la energía.",
    },
    {
      q: "¿Qué juegos de beber funcionan para grupos muy grandes?",
      a: "Para grupos de más de 10 personas funcionan mejor Medusa (todos juegan a la vez), La Bomba (se pasa el móvil entre todos), Yo Prefiero (el grupo vota) y Beer Pong (por parejas con espectadores). Todos disponibles en BeberGames.",
    },
  ],

  "retos-para-fiestas": [
    {
      q: "¿Cuáles son los mejores retos para fiestas?",
      a: "Los mejores retos para fiestas son los de Verdad o Reto (con niveles de intensidad), La Bomba (tensión del temporizador) y Yo Prefiero (dilemas del grupo). También funcionan muy bien los retos improvisados en Ring of Fire cuando sale la J (la carta de reglas).",
    },
    {
      q: "¿Cómo se juega al Verdad o Reto?",
      a: "En Verdad o Reto, cada jugador elige entre responder una pregunta comprometida (Verdad) o cumplir un reto. Si no quiere hacer ninguna de las dos, bebe. La app de BeberGames genera automáticamente preguntas y retos en 3 niveles de intensidad.",
    },
    {
      q: "¿Hay juegos de retos para grupos mixtos?",
      a: "Sí. Yo Prefiero y Verdad o Reto tienen contenido adaptable a cualquier grupo. Ambos tienen niveles de intensidad (normal, picante) para que el grupo elija cuán atrevidos quieren ser. En BeberGames puedes filtrar por nivel antes de empezar.",
    },
  ],

  "tabu-juego-beber": [
    {
      q: "¿Cómo se juega al Tabú Borracho?",
      a: "En el Tabú Borracho se forman 2 equipos. Un jugador por turno debe describir una palabra sin decir las 4 palabras prohibidas que aparecen en pantalla. Si las dice, su equipo bebe. El equipo con más palabras acertadas en 60 segundos suma un punto. Gana el equipo con más puntos tras 3 turnos por equipo.",
    },
    {
      q: "¿Cuántas personas se necesitan para jugar al Tabú Borracho?",
      a: "Se necesitan mínimo 4 personas para hacer 2 equipos de 2. Lo ideal son grupos de 6 a 10 personas (3-5 por equipo). Con más personas la diversión aumenta porque hay más espectadores presionando al descriptor.",
    },
    {
      q: "¿Qué pasa si dices una palabra tabú?",
      a: "Si el descriptor dice una de las palabras prohibidas, el equipo contrario pulsa el botón de '¡Tabú!' y todo el equipo del descriptor bebe un trago. Además, se pierde esa carta y se pasa a la siguiente sin sumar punto.",
    },
    {
      q: "¿Cuántas tarjetas tiene el Tabú Borracho de BeberGames?",
      a: "El Tabú Borracho de BeberGames incluye más de 65 tarjetas organizadas en categorías: comida y bebida, cultura pop, famosos, lugares, objetos cotidianos, deportes y situaciones divertidas. Las tarjetas se mezclan aleatoriamente en cada partida.",
    },
  ],

  "beer-pong-reglas-completas": [
    {
      q: "¿Cuáles son las reglas básicas del Beer Pong?",
      a: "En el Beer Pong, dos equipos se colocan en extremos opuestos de una mesa con 10 vasos en triángulo en cada lado. Por turnos, cada equipo lanza una pelota de ping-pong intentando meterla en los vasos del rival. El rival bebe y retira el vaso. Gana el equipo que hunde todos los vasos del rival.",
    },
    {
      q: "¿Qué materiales necesito para jugar al Beer Pong?",
      a: "Necesitas 20 vasos de plástico (10 por equipo), 2 pelotas de ping-pong, una mesa de al menos 2 metros y bebida. También puedes usar el árbitro virtual de BeberGames en el móvil para gestionar el marcador, los re-racks y las reglas especiales.",
    },
    {
      q: "¿Qué es el Re-rack en el Beer Pong?",
      a: "El Re-rack es una regla que permite a cada equipo reorganizar sus vasos restantes en una formación diferente una vez por partida. Se suele pedir cuando quedan 6, 4, 3 o 2 vasos para mejorar la disposición defensiva o crear una formación más difícil de encestar.",
    },
    {
      q: "¿Qué significa 'Heating Up' o 'On Fire' en el Beer Pong?",
      a: "Si un jugador encesta 2 tiros consecutivos, puede declarar 'Heating Up'. Si encesta un tercero seguido, está 'On Fire' y puede seguir lanzando hasta que falle. El árbitro virtual de BeberGames detecta esto automáticamente.",
    },
  ],
};
