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

  "100-preguntas-yo-nunca": [
    {
      q: "¿Cuántas preguntas tiene el juego Yo Nunca de BeberGames?",
      a: "BeberGames tiene más de 100 preguntas de Yo Nunca organizadas por niveles de intensidad: suave, normal y picante. Puedes elegir el nivel antes de empezar para adaptarlo a tu grupo.",
    },
    {
      q: "¿Cómo se juega al Yo Nunca?",
      a: "En el Yo Nunca un jugador dice 'Yo nunca he...' seguido de algo que nunca haya hecho. Todos los que sí lo hayan hecho beben. Si nadie bebe, el que dijo la frase bebe por haberla elegido. El turno pasa hasta completar las rondas acordadas.",
    },
    {
      q: "¿Cuál es la mejor pregunta para empezar el Yo Nunca?",
      a: "Las mejores preguntas para empezar son las suaves y divertidas, como 'Yo nunca he dormido en clase' o 'Yo nunca me he caído en público'. Guardar las preguntas comprometidas para cuando el grupo esté más cómodo hace la noche mucho más divertida.",
    },
    {
      q: "¿Se puede jugar al Yo Nunca en pareja?",
      a: "Sí, el Yo Nunca funciona muy bien en pareja. Adapta las reglas: si ambos lo habéis hecho, brindáis los dos; si ninguno, el que propuso la frase bebe. Es una forma divertida de conocerse mejor y descubrir experiencias pasadas.",
    },
  ],

  "como-organizar-fiesta-juegos-beber": [
    {
      q: "¿Qué juegos de beber son mejores para organizar una fiesta en casa?",
      a: "Para una fiesta en casa los mejores son Yo Nunca (para romper el hielo), Verdad o Reto (cuando el grupo ya tiene confianza) y Beer Pong o Ring of Fire si tenéis espacio y mesa disponible. Con BeberGames los tienes todos desde el móvil sin descargar nada.",
    },
    {
      q: "¿En qué orden debo poner los juegos en una fiesta?",
      a: "El orden ideal es: empezar con Yo Prefiero o Medusa (fáciles y sin presión), pasar a Yo Nunca cuando el grupo esté suelto, y cerrar con Verdad o Reto o Ring of Fire en la parte más animada. Cambiar de juego cada 30-40 minutos mantiene la energía alta.",
    },
    {
      q: "¿Cuántos juegos necesito preparar para una fiesta con juegos de beber?",
      a: "Con 3 juegos bien escogidos tienes suficiente para una fiesta de 2-3 horas. Tener 5-6 de reserva está bien por si alguno no engancha. En BeberGames tienes 12 juegos disponibles para rotar sin necesidad de preparar nada con antelación.",
    },
  ],

  "drinking-games-reglas": [
    {
      q: "¿Cuáles son las reglas generales de los drinking games?",
      a: "Las reglas comunes a casi todos los drinking games son: el que pierde o no cumple una condición bebe, se puede decir 'paso' pero entonces bebes doble, y todo lo que ocurre en el juego se queda en el juego. BeberGames explica las reglas concretas de cada juego en pantalla antes de empezar.",
    },
    {
      q: "¿Cuáles son los drinking games más populares en España?",
      a: "Los drinking games más populares en España son Yo Nunca, Verdad o Reto, El Rey de la Copa, Medusa, La Bomba y Quién Es Más Probable. Todos tienen versión digital gratuita en BeberGames, perfecta para tenerlos siempre a mano desde el móvil.",
    },
    {
      q: "¿Cómo se dice 'Never Have I Ever' en español?",
      a: "'Never Have I Ever' se llama 'Yo Nunca' en español. La mecánica es idéntica: dices algo que nunca hayas hecho y los que sí lo hayan hecho beben. Es uno de los juegos de presentación más populares del mundo y funciona en cualquier idioma.",
    },
    {
      q: "¿Qué drinking game es más fácil de aprender?",
      a: "Medusa es el drinking game más fácil de aprender: solo hay que mirar a otro jugador cuando se da la señal. La Bomba también es muy sencillo: te pasas el móvil y rezas para que no explote en tus manos. Ambos están en BeberGames con instrucciones en pantalla.",
    },
  ],

  "juegos-beber-baraja-espanola": [
    {
      q: "¿Qué juegos de beber se pueden hacer con una baraja española?",
      a: "Con una baraja española puedes jugar a la variante española de Ring of Fire, al Escoba Borracha, a la Guerra (el que saca carta más baja bebe) y a múltiples variantes de reparto de tragos según el palo o el número. Son clásicos perfectos para cuando no tienes el móvil a mano.",
    },
    {
      q: "¿Se puede jugar al Ring of Fire con baraja española?",
      a: "Sí, el Ring of Fire se puede jugar con baraja española adaptando las reglas a los 4 palos: oros, copas, espadas y bastos. Cada palo puede tener una regla diferente. En BeberGames tienes la versión digital que no require baraja física.",
    },
    {
      q: "¿Cuántas cartas tiene una baraja española?",
      a: "La baraja española completa tiene 48 cartas: 12 numéricas (del 1 al 12) en 4 palos (oros, copas, espadas, bastos). La baraja corta que se usa habitualmente tiene 40 cartas (del 1 al 7 y del 10 al 12). Ambas sirven para jugar a juegos de beber.",
    },
  ],

  "juegos-de-mesa-para-beber": [
    {
      q: "¿Cuáles son los mejores juegos de mesa para convertir en juegos de beber?",
      a: "Los juegos de mesa que mejor se adaptan para beber son el Jenga (el que hace caer la torre bebe), el UNO (por cada carta que coges bebes un trago), el Parchís (al comer una ficha, el comido bebe) y cualquier juego de trivia donde el equipo perdedor bebe.",
    },
    {
      q: "¿Se puede añadir una regla de beber a cualquier juego de mesa?",
      a: "Sí. La regla más universal es: el jugador que pierde la ronda o comete un error bebe. También puedes añadir reglas a eventos específicos del juego (sacar un 6 en los dados, robar una carta negra en UNO, etc.). Lo importante es que todos acuerden las reglas antes de empezar.",
    },
    {
      q: "¿Necesito comprar juegos especiales para jugar a juegos de mesa de beber?",
      a: "No. Cualquier juego de mesa que ya tengas en casa se puede convertir en juego de beber añadiendo reglas simples. Para juegos completamente digitales sin necesidad de material físico, BeberGames ofrece 12 juegos gratuitos que funcionan desde cualquier móvil.",
    },
  ],

  "juegos-para-beber-con-dados": [
    {
      q: "¿Qué juegos de beber usan dados?",
      a: "El juego de dados para beber más popular es Triman (el Señor del 3), donde el jugador que saca un 3 se convierte en esclavo y bebe en cada ronda hasta que otro saque un 3. También existe el 7-11-doubles, donde sacar ciertos números obliga a beber al dueño del vaso central.",
    },
    {
      q: "¿Cómo se juega al Triman?",
      a: "En Triman cada jugador lanza el dado por turnos. El primero en sacar un 3 se convierte en el Señor del 3: beberá un trago cada vez que salga un 3 durante el resto de la partida. Se libera cuando otro jugador saca un 3 y hereda la maldición. Disponible digitalmente en BeberGames.",
    },
    {
      q: "¿Cuántos dados necesito para jugar a juegos de beber?",
      a: "Con un solo dado ya puedes jugar a Triman y a la mayoría de juegos de dados para beber. Algunos juegos usan 2 dados para generar más combinaciones. En BeberGames el dado es digital: la app lo lanza automáticamente y gestiona todas las reglas.",
    },
  ],

  "juegos-para-beber-en-pareja": [
    {
      q: "¿Cuáles son los mejores juegos para beber en pareja?",
      a: "Los mejores juegos para beber en pareja son Yo Nunca (para conocerse mejor), Verdad o Reto (para subir la tensión) y Yo Prefiero (para descubrir los límites del otro). BeberGames los tiene todos disponibles con versión para 2 jugadores.",
    },
    {
      q: "¿Es el Yo Nunca un buen juego para una primera cita?",
      a: "Sí, el Yo Nunca en su versión suave es perfecto para una primera cita: genera conversación de forma natural, añade un punto de complicidad y permite conocerse sin presión. Empieza siempre por preguntas inocentes antes de subir el nivel.",
    },
    {
      q: "¿Cómo se adaptan las reglas del Verdad o Reto para dos personas?",
      a: "En pareja, el Verdad o Reto funciona igual pero la dinámica cambia: cada pregunta se vuelve más personal y directa. Si el otro no quiere responder o cumplir el reto, bebe. Recomendamos turnarse para proponer preguntas en lugar de usar solo la app para mayor personalización.",
    },
  ],

  "la-bomba-juego-beber": [
    {
      q: "¿Cómo se juega a La Bomba?",
      a: "En La Bomba el móvil actúa como una bomba con un temporizador secreto. Los jugadores se pasan el móvil de mano en mano lo más rápido posible. Cuando el temporizador llega a cero, el jugador que tenga el móvil en ese momento bebe. Cada ronda tiene un tiempo aleatorio entre 12 y 40 segundos.",
    },
    {
      q: "¿Cuántas personas se necesitan para jugar a La Bomba?",
      a: "La Bomba funciona desde 3 personas, pero es más divertido con 5 o más. Cuantos más jugadores haya, más tensión genera el paso del móvil. Para grupos muy grandes de más de 12, se puede jugar en dos círculos simultáneos.",
    },
    {
      q: "¿Cuánto dura el temporizador de La Bomba?",
      a: "El temporizador de La Bomba en BeberGames es completamente aleatorio: puede durar entre 12 y 40 segundos por ronda. Nadie sabe cuándo va a explotar, lo que genera una tensión constante desde el primer momento.",
    },
    {
      q: "¿Se puede jugar a La Bomba sin alcohol?",
      a: "Sí. La Bomba funciona perfectamente con cualquier penalización: el que pierde puede beber agua, hacer sentadillas, contar un secreto o asumir cualquier castigo que el grupo decida. BeberGames promueve el juego responsable y la diversión sin presión.",
    },
  ],

  "medusa-juego-beber": [
    {
      q: "¿Cómo se juega al Medusa?",
      a: "En Medusa todos los jugadores miran hacia abajo con los ojos cerrados. El móvil hace la cuenta atrás. A la señal, todos levantan la cabeza y miran fijamente a otro jugador. Si dos personas se cruzan la mirada, ambas gritan '¡MEDUSA!' y beben. El último en gritar bebe el doble.",
    },
    {
      q: "¿Por qué se llama Medusa este juego?",
      a: "El nombre viene del mito griego de Medusa, el monstruo cuya mirada convertía a las personas en piedra. En el juego, cruzar la mirada con otro jugador tiene consecuencias: ambos quedan 'petrificados' y tienen que beber.",
    },
    {
      q: "¿Cuántas personas se necesitan para jugar al Medusa?",
      a: "Medusa funciona mejor con 4 o más jugadores. Con 3 personas hay pocas combinaciones de miradas. Lo ideal son grupos de 5 a 12 personas donde la tensión de a quién mirar sea máxima y los cruces de mirada más inesperados.",
    },
    {
      q: "¿Cuánto dura una partida de Medusa?",
      a: "Cada ronda de Medusa dura solo 3 segundos: la cuenta atrás y el momento del cruce de miradas. Una partida completa de 10 rondas no llega a los 5 minutos. Es el juego perfecto para romper el hielo al principio de la noche o entre partidas más largas.",
    },
  ],

  "preguntas-picantes-verdad-o-reto": [
    {
      q: "¿Cuáles son las preguntas más picantes del Verdad o Reto?",
      a: "Las preguntas picantes más populares del Verdad o Reto son del tipo: '¿Cuál ha sido tu experiencia más bochornosa en la cama?', '¿Has tenido un sueño subido de tono con alguien del grupo?', o '¿Cuál es tu fantasía que nunca te has atrevido a realizar?'. En BeberGames están organizadas por nivel de intensidad.",
    },
    {
      q: "¿Se puede jugar al Verdad o Reto picante en pareja?",
      a: "Sí, el Verdad o Reto picante es ideal para parejas con confianza. En pareja las preguntas se vuelven más personales y directas, lo que puede generar conversaciones muy reveladoras. Recomendamos empezar siempre por preguntas más suaves antes de pasar al nivel +18.",
    },
    {
      q: "¿Cómo saber qué nivel de preguntas elegir en el Verdad o Reto?",
      a: "La regla es leer al grupo: si es la primera vez que jugáis juntos o hay gente que no se conoce bien, empieza con el nivel verde (suave). Si todos se conocen de hace tiempo y están cómodos, podéis saltar directamente al nivel amarillo. El nivel rojo (+18) es solo para grupos de máxima confianza.",
    },
  ],

  "preguntas-yo-nunca-parejas": [
    {
      q: "¿Cuáles son las mejores preguntas de Yo Nunca para parejas?",
      a: "Las mejores preguntas de Yo Nunca para parejas combinan romanticismo y complicidad: desde 'Yo nunca he pensado en ti nada más despertarme' hasta confesiones más íntimas como 'Yo nunca he fingido placer para no herir tus sentimientos'. La clave es ir escalando gradualmente de suave a picante.",
    },
    {
      q: "¿Cómo se juega al Yo Nunca solo dos personas?",
      a: "En pareja las reglas cambian ligeramente: si ambos lo habéis hecho, brindáis y bebéis los dos; si ninguno lo ha hecho, quien propuso la frase bebe como castigo. El bonus más divertido es obligar al otro a contar la historia completa detrás de cada trago.",
    },
    {
      q: "¿El Yo Nunca ayuda a conocerse mejor en pareja?",
      a: "Sí, es una de las herramientas más efectivas para conocerse mejor de forma divertida. Las confesiones surgen de forma natural sin la presión de una conversación directa. Especialmente valioso para parejas nuevas que quieren hablar de su pasado sin que resulte forzado.",
    },
  ],

  "reglas-del-yo-nunca": [
    {
      q: "¿Cuáles son las reglas del Yo Nunca?",
      a: "Las reglas del Yo Nunca son: por turnos, cada jugador dice 'Yo nunca he...' seguido de algo que no haya hecho. Todos los que sí lo hayan hecho beben. Si nadie bebe, el que propuso la frase bebe como penalización. Opcional: el que bebe puede contar la historia si quiere.",
    },
    {
      q: "¿Cuántos jugadores se necesitan para el Yo Nunca?",
      a: "El Yo Nunca funciona desde 2 jugadores, aunque es más divertido con 4 o más. Con más jugadores hay más posibilidades de que alguien beba y las revelaciones son más variadas. BeberGames tiene una versión digital con preguntas automáticas adaptada a cualquier tamaño de grupo.",
    },
    {
      q: "¿Qué pasa si nadie bebe en el Yo Nunca?",
      a: "Si nadie bebe cuando alguien dice su frase, esa persona bebe como penalización por haber elegido algo demasiado específico o raro. Esto incentiva a elegir frases donde al menos algún jugador haya vivido esa experiencia.",
    },
    {
      q: "¿Se puede jugar al Yo Nunca sin alcohol?",
      a: "Sí. El Yo Nunca funciona igual con cualquier bebida: agua, refrescos o zumos. La mecánica y la diversión son exactamente iguales. BeberGames promueve el juego responsable y ninguno de sus juegos requiere consumir alcohol para disfrutarse.",
    },
  ],

  "rey-de-la-copa-reglas": [
    {
      q: "¿Cuáles son las reglas de El Rey de la Copa?",
      a: "En El Rey de la Copa las cartas se colocan boca abajo en círculo alrededor de un vaso central. Por turnos, cada jugador roba una carta y ejecuta su regla (As = waterfall, 2 = elige quién bebe, 7 = todos señalan al cielo y el último bebe, Rey = añade al vaso central). El que saca el 4º Rey bebe el vaso entero.",
    },
    {
      q: "¿En qué se diferencia El Rey de la Copa del Ring of Fire?",
      a: "El Rey de la Copa es la variante española del Ring of Fire. Comparten la mecánica general (cartas en círculo, vaso central) pero tienen reglas distintas para algunas cartas, adaptadas al contexto español. Ambos están disponibles en BeberGames.",
    },
    {
      q: "¿Cuántos jugadores se necesitan para El Rey de la Copa?",
      a: "El Rey de la Copa funciona con 3 o más jugadores. Lo ideal son de 4 a 8 personas. Con menos de 3 hay pocas cartas robadas antes de llegar a los Reyes. Con más de 10 las rondas se alargan mucho.",
    },
    {
      q: "¿Qué se pone en el vaso central de El Rey de la Copa?",
      a: "En el vaso central cada jugador que roba un Rey vierte parte de su bebida. La mezcla puede ser cualquier cosa: cerveza, vino, refrescos o lo que haya en la mesa. El desgraciado que saca el cuarto Rey tiene que beberse toda esa mezcla de golpe.",
    },
  ],

  "verdad-o-reto-preguntas-buenas": [
    {
      q: "¿Cuántas preguntas tiene el Verdad o Reto de BeberGames?",
      a: "El Verdad o Reto de BeberGames incluye más de 80 preguntas y retos organizados en 3 niveles de intensidad: verde (suave), amarillo (normal) y rojo (picante +18). La app las genera automáticamente según el nivel que elijas.",
    },
    {
      q: "¿Es mejor elegir Verdad o Reto?",
      a: "Depende del jugador y el momento. La Verdad es mejor cuando quieres descubrir algo real sobre alguien. El Reto es mejor cuando el ambiente ya está animado y el grupo busca acción. Los jugadores más valientes suelen preferir Verdad porque las preguntas buenas son más comprometidas que cualquier reto.",
    },
    {
      q: "¿Se puede jugar al Verdad o Reto sin reglas de beber?",
      a: "Sí. El Verdad o Reto funciona perfectamente sin alcohol: el que no quiere responder o cumplir el reto puede asumir cualquier penalización que el grupo acuerde (hacer 10 sentadillas, contar un secreto, etc.). La diversión está en las revelaciones, no en la bebida.",
    },
  ],

  "yo-nunca-preguntas-picantes-18": [
    {
      q: "¿Qué es el Yo Nunca +18?",
      a: "El Yo Nunca +18 es la versión adulta del clásico Yo Nunca, con preguntas íntimas y subidas de tono diseñadas exclusivamente para mayores de edad. Las confesiones que salen son mucho más reveladoras que en la versión estándar. Solo apto para grupos con confianza plena y mente abierta.",
    },
    {
      q: "¿Hay alguna regla especial en el Yo Nunca +18?",
      a: "La regla más importante del Yo Nunca +18 es el pacto de silencio: todo lo que se confiese durante el juego se queda entre los jugadores. Nadie puede usar las confesiones fuera del juego. También se respeta el derecho a pasar: nadie está obligado a beber ni a explicar nada.",
    },
    {
      q: "¿Cómo se lleva bien el ambiente en el Yo Nunca picante?",
      a: "La clave es escalar gradualmente: empezar siempre por preguntas del Bloque 1 (ligues y pasiones) antes de pasar a los bloques más intensos. Si notas que alguien está incómodo, baja el nivel o cambia de juego. La diversión tiene que ser mutua para que funcione.",
    },
  ],

  "yo-prefiero-preguntas": [
    {
      q: "¿Cómo se juega al Yo Prefiero?",
      a: "En el Yo Prefiero se presenta un dilema con dos opciones (A o B). Todos los jugadores votan simultáneamente levantando la mano. La minoría (los que votaron la opción menos popular) bebe un trago. Si hay empate, todos beben. Luego viene el debate de por qué cada uno eligió lo que eligió.",
    },
    {
      q: "¿Cuántas preguntas tiene el Yo Prefiero de BeberGames?",
      a: "BeberGames tiene más de 60 dilemas de Yo Prefiero organizados por intensidad. Incluyen dilemas cotidianos, preguntas incómodas y opciones absurdas que generan debate. Las preguntas se van renovando para que puedas jugar varias sesiones sin repetir.",
    },
    {
      q: "¿Cuál es la gracia del Yo Prefiero como juego de beber?",
      a: "La gracia del Yo Prefiero es que fuerza a tomar decisiones en dilemas donde no hay respuesta correcta. Luego el debate sobre por qué cada uno eligió una opción genera conversaciones muy reveladoras sobre los valores, límites y personalidad de cada jugador. Es el rompe-hielos más efectivo que existe.",
    },
    {
      q: "¿Se puede jugar al Yo Prefiero sin beber?",
      a: "Sí. Sin bebida el Yo Prefiero sigue siendo divertido: la penalización puede ser contar por qué elegiste esa opción, hacer un reto o simplemente 'el pringado de la ronda'. Con o sin alcohol, las revelaciones y el debate son igual de entretenidos.",
    },
  ],

  "preguntas-quien-es-mas-probable": [
    {
      q: "¿Cómo se juega al Quién Es Más Probable?",
      a: "Se lee una pregunta del tipo '¿Quién es más probable que acabe en la cárcel?'. A la cuenta de 3, todos señalan simultáneamente a alguien. El jugador con más dedos apuntándole bebe. En caso de empate, todos los empatados beben.",
    },
    {
      q: "¿Cuántas personas se necesitan para jugar al Quién Es Más Probable?",
      a: "Se necesitan mínimo 3 personas, pero el juego es mucho más divertido a partir de 5 o 6. Con más jugadores las votaciones son más variadas y las discusiones post-señalada más épicas.",
    },
    {
      q: "¿Se puede personalizar el Quién Es Más Probable para un cumpleaños?",
      a: "Sí, es uno de los mejores juegos para personalizar en un cumpleaños. El grupo puede preparar preguntas específicas sobre el festejado antes de la fiesta. Por ejemplo: '¿Quién es más probable que sea el primero en casarse de este grupo?' o '¿Quién es más probable que olvide el cumpleaños del homenajeado el año que viene?'",
    },
    {
      q: "¿Qué pasa si hay empate en el Quién Es Más Probable?",
      a: "Cuando hay empate (dos o más personas con el mismo número de votos), todas las empatadas beben. En BeberGames la app gestiona los empates automáticamente y puede hacer una segunda votación de desempate si el grupo lo desea.",
    },
  ],

  "juegos-para-cumpleanos-adultos": [
    {
      q: "¿Cuáles son los mejores juegos para un cumpleaños de adultos?",
      a: "Los mejores juegos para un cumpleaños de adultos son Quién Es Más Probable (personalizable con preguntas sobre el festejado), Verdad o Reto, Yo Nunca, Ring of Fire y Beer Pong. Todos están disponibles gratis en BeberGames sin necesidad de descargar nada.",
    },
    {
      q: "¿Cómo organizo los juegos en una fiesta de cumpleaños?",
      a: "El orden ideal es: empezar con un rompehielos (Medusa o La Bomba), pasar a juegos de grupo cuando todos hayan llegado (Yo Prefiero o Quién Es Más Probable), y cerrar con los juegos más intensos cuando la noche ya está lanzada (Ring of Fire o Beer Pong).",
    },
    {
      q: "¿Qué juego de cumpleaños funciona mejor para grupos grandes?",
      a: "Para grupos de más de 10 personas funcionan mejor Medusa (todos participan a la vez), Quién Es Más Probable (todos votan) y Beer Pong (por equipos con espectadores). Para grupos más pequeños de 4-8 personas, Ring of Fire o Verdad o Reto son perfectos.",
    },
  ],
};
