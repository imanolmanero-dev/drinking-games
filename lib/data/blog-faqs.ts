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
      a: "Medusa, Yo Nunca, Quién Es Más Probable, Yo Prefiero y La Bomba se pueden jugar en grupo con un móvil.",
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
      a: "A la de tres, levantad la cabeza y mirad a alguien del círculo. En nuestra variante de mesa, si dos miradas coinciden, esa pareja grita «¡Medusa!» y se queda de piedra un instante. Después empieza otra ronda.",
    },
    {
      q: "¿Cuál es el juego para beber más rápido?",
      a: "Medusa va bien si tenéis poco tiempo: basta con una cuenta de tres y una mirada para resolver cada ronda. En La Bomba podéis ajustar la duración de la partida de mesa con la alarma del móvil.",
    },
    {
      q: "¿Se puede jugar a juegos de beber sin alcohol?",
      a: "Sí. Para estas variantes bastan las voces, las manos y, en algunos juegos, un móvil. Podéis jugar sin vaso o brindar con la bebida que os apetezca. Pasar un turno no tiene penalización.",
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
      a: "En La Bomba, el móvil actúa como una bomba con un temporizador secreto. Los jugadores se pasan el móvil de mano en mano. Cuando el temporizador llega a cero, quien tenga el móvil abre la siguiente ronda. Cada ronda tiene un tiempo diferente entre 12 y 40 segundos.",
    },
  ],

  "ring-of-fire-reglas-cartas": [
    {
      q: "¿Qué es el Ring of Fire?",
      a: "El Ring of Fire, también llamado Kings, es un juego de cartas para beber con un círculo de cartas alrededor de una copa. En esta adaptación la copa se queda vacía. Al salir el cuarto rey, se retira y termina la ronda.",
    },
    {
      q: "¿Cuáles son las reglas del Ring of Fire?",
      a: "El As inicia una ola de brazos. El 2 invita a otra persona a dedicar un brindis y el 3 te da la palabra a ti. Del 4 al 8 hay gestos y parejas. El 9 propone rimas y el 10, categorías. La jota trae una norma, la dama juega con preguntas y el cuarto rey cierra la partida.",
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
      a: "La duración de Ring of Fire depende del ritmo de los turnos y de cuándo salga el cuarto rey. La versión digital cuenta los reyes y cierra la partida al revelar el cuarto.",
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
      a: "Los mejores retos para fiestas son los de Verdad o Reto (con niveles de intensidad), La Bomba (tensión del temporizador) y Yo Prefiero (dilemas del grupo). En Ring of Fire, la jota invita al grupo a acordar una norma de gestos.",
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
      a: "Formad dos equipos. En cada turno tenéis 60 segundos para adivinar palabras sin usar las cuatro pistas prohibidas. Cada acierto suma un punto. Tras tres turnos por equipo, gana quien tenga más puntos o hay empate.",
    },
    {
      q: "¿Cuántas personas se necesitan para jugar al Tabú Borracho?",
      a: "Se necesitan mínimo 4 personas para hacer 2 equipos de 2. Lo ideal son grupos de 6 a 10 personas (3-5 por equipo). Con más personas la diversión aumenta porque hay más espectadores presionando al descriptor.",
    },
    {
      q: "¿Qué pasa si dices una palabra tabú?",
      a: "Pulsad ¡Tabú! para descartar la tarjeta y registrar la infracción. El equipo conserva sus puntos y puede seguir dando pistas hasta el final del minuto.",
    },
    {
      q: "¿Cuántas tarjetas tiene el Tabú Borracho de BeberGames?",
      a: "La app incluye 65 tarjetas con cuatro palabras prohibidas cada una. Al empezar una partida se barajan. Cuando llegáis al final del mazo, volvéis al principio.",
    },
  ],

  "beer-pong-reglas-completas": [
    {
      q: "¿Cuáles son las reglas básicas del Beer Pong?",
      a: "Preparad dos triángulos con vasos de agua. Por turnos, lanzad hacia el lado rival y retirad cada vaso en el que entre la pelota. Gana quien retire el último vaso del otro lado.",
    },
    {
      q: "¿Qué materiales necesito para jugar al Beer Pong?",
      a: "Necesitáis vasos con agua, una mesa y una pelota de ping-pong. El árbitro virtual permite elegir seis o diez vasos por equipo. Las bebidas personales se dejan aparte.",
    },
    {
      q: "¿Qué es el Re-rack en el Beer Pong?",
      a: "Consiste en juntar los vasos que quedan para formar un nuevo grupo. En el árbitro digital podéis marcarlo una vez por lado cuando quedan cuatro vasos o menos.",
    },
    {
      q: "¿Qué significa 'Heating Up' o 'On Fire' en el Beer Pong?",
      a: "En la variante de mesa, dos aciertos del mismo jugador son Heating Up y el tercero es On Fire. El móvil muestra On Fire al marcar dos vasos en el mismo turno. Vosotros decidís cuándo cambiar de equipo.",
    },
  ],

  "100-preguntas-yo-nunca": [
    {
      q: "¿Cuántas preguntas tiene el juego Yo Nunca de BeberGames?",
      a: "La app de Yo Nunca tiene 150 frases repartidas entre Soft, Normal y Picante. Podéis elegir uno o varios niveles antes de empezar. Esta lista para jugar en la mesa reúne 100 frases.",
    },
    {
      q: "¿Cómo se juega al Yo Nunca?",
      a: "Una persona lee una frase. Quien haya hecho lo que dice puede bajar un dedo o levantar la mano. Si nadie responde, pasad a la siguiente. Puedes guardarte la anécdota y pasar cualquier turno sin penalización.",
    },
    {
      q: "¿Cuál es la mejor pregunta para empezar el Yo Nunca?",
      a: "Las mejores preguntas para empezar son las suaves y divertidas, como 'Yo nunca he dormido en clase' o 'Yo nunca me he caído en público'. Guardar las preguntas comprometidas para cuando el grupo esté más cómodo hace la noche mucho más divertida.",
    },
    {
      q: "¿Se puede jugar al Yo Nunca en pareja?",
      a: "Sí. Alternad quién lee. Cada persona decide si baja un dedo y si le apetece contar algo. Si los dos dejáis la mano quieta, probad otra frase.",
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
      a: "Acordad cómo empieza el turno y cuándo acaba la ronda. En Quarters, cada acierto vale un punto. En Power Hour intentáis reconocer las canciones y la ronda acaba con el último fragmento. Cualquiera puede pasar sin beber ni dar explicaciones.",
    },
    {
      q: "¿Cuáles son los drinking games más populares en España?",
      a: "Los drinking games más populares en España son Yo Nunca, Verdad o Reto, El Rey de la Copa, Medusa, La Bomba y Quién Es Más Probable. Todos tienen versión digital gratuita en BeberGames, perfecta para tenerlos siempre a mano desde el móvil.",
    },
    {
      q: "¿Cómo se dice 'Never Have I Ever' en español?",
      a: "En español se llama «Yo Nunca». Alguien dice algo que nunca ha hecho y quienes sí lo hayan hecho pueden levantar la mano o bajar un dedo. Cada persona decide si quiere contar su historia.",
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
      a: "Triman se juega con un dado. El primer tres elige al Señor del 3 y las seis caras proponen gestos distintos. También hay variantes de mesa con dos dados.",
    },
    {
      q: "¿Cómo se juega al Triman?",
      a: "Lanzad por turnos hasta que salga un tres. Esa persona lleva la corona. En los turnos siguientes el tres invita al Triman a hacer una reverencia o pasar. Nuevo Triman abre otra búsqueda.",
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
      a: "El móvil pasa de mano en mano. Al sonar la alarma, quien lo tenga abre la siguiente ronda o cede el turno. Con nombres, la pantalla indica a quién le toca.",
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
      a: "Sí. Solo hace falta el móvil. Puedes pasar el turno sin beber, explicar nada ni hacer un reto.",
    },
  ],

  "medusa-juego-beber": [
    {
      q: "¿Cómo se juega al Medusa?",
      a: "Mirad abajo durante la cuenta atrás. A la señal, cada persona mira a otra. Si os miráis mutuamente, decid ¡Medusa! y quedaos de piedra un instante. Podéis pasar cualquier ronda.",
    },
    {
      q: "¿Por qué se llama Medusa este juego?",
      a: "En el mito griego, la mirada de Medusa convertía en piedra. Aquí, la pareja que cruza la mirada imita durante un instante la postura de una estatua.",
    },
    {
      q: "¿Cuántas personas se necesitan para jugar al Medusa?",
      a: "Medusa funciona mejor con 4 o más jugadores. Con 3 personas hay pocas combinaciones de miradas. Lo ideal son grupos de 5 a 12 personas donde la tensión de a quién mirar sea máxima y los cruces de mirada más inesperados.",
    },
    {
      q: "¿Cuánto dura una partida de Medusa?",
      a: "El móvil marca quince rondas. Cada cuenta empieza en tres y el grupo decide cuándo iniciar la siguiente. Podéis hacer una pausa entre señales.",
    },
  ],

  "preguntas-picantes-verdad-o-reto": [
    {
      q: "¿Cuáles son las preguntas más picantes del Verdad o Reto?",
      a: "Las del tercer nivel entran en terreno íntimo. Por ejemplo, ¿cuál es la propuesta más picante que has aceptado? Puedes responder sin dar nombres o pasar la pregunta.",
    },
    {
      q: "¿Se puede jugar al Verdad o Reto picante en pareja?",
      a: "Sí, podéis usar esta lista en pareja y alternar los turnos. Cada persona elige pregunta, reto o paso. Para jugar en la app hacen falta al menos tres jugadores.",
    },
    {
      q: "¿Cómo saber qué nivel de preguntas elegir en el Verdad o Reto?",
      a: "Probad una pregunta del nivel verde. Si os apetece algo más personal, elegid otra del amarillo o del rojo (+18). Podéis volver al verde en cualquier momento. En la app se eligen los niveles antes de empezar.",
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
      a: "Por turnos, cada jugador dice 'Yo nunca he...' seguido de algo que afirma no haber hecho. Quienes sí lo hayan hecho levantan la mano, bajan un dedo o pueden tomar un sorbo pequeño y opcional, según lo acordado. Después pasa el turno al siguiente jugador. Si nadie lo ha hecho, se sigue sin consecuencia. La regla del creador es opcional y debe acordarse antes; no obliga a beber. Contar la historia también es voluntario.",
    },
    {
      q: "¿Cuántos jugadores se necesitan para el Yo Nunca?",
      a: "El Yo Nunca funciona desde 2 jugadores, aunque es más divertido con 4 o más. Con más jugadores hay más posibilidades de que alguien beba y las revelaciones son más variadas. BeberGames tiene una versión digital con preguntas automáticas adaptada a cualquier tamaño de grupo.",
    },
    {
      q: "¿Qué pasa si nadie bebe en el Yo Nunca?",
      a: "Si nadie ha hecho lo dicho, se pasa al siguiente turno sin consecuencia. Solo si lo habéis acordado antes, quien propuso la frase puede tomar un sorbo pequeño y opcional, también de una bebida sin alcohol. La regla del creador no es universal ni obliga a beber.",
    },
    {
      q: "¿Se puede jugar al Yo Nunca sin alcohol?",
      a: "Sí, no hace falta alcohol ni otra bebida. Podéis levantar la mano si habéis hecho lo dicho, o empezar con cinco dedos y bajar uno por cada frase que os aplique. Los turnos son los mismos: acordad cuándo terminar o reiniciar los dedos. También podéis usar agua, refrescos o zumos con sorbos pequeños y opcionales. Se puede pasar sin penalización.",
    },
  ],

  "rey-de-la-copa-reglas": [
    {
      q: "¿Cuáles son las reglas de El Rey de la Copa?",
      a: "Se colocan las cartas boca abajo en círculo alrededor de una copa central y se roba por turnos. As inicia una cascada o Waterfall, 2 invita a otra persona a un sorbo y 7 hace que todos señalen al cielo. En esta guía, beber es opcional, con sorbos pequeños y con o sin alcohol. Cualquiera puede pasar o parar en cualquier momento. Los tres primeros Reyes permiten una aportación pequeña y opcional a la copa. El cuarto termina la variante: puedes dar un sorbo pequeño y opcional o pasar, retirar la copa y desechar el resto.",
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
      a: "Quien saca uno de los tres primeros Reyes puede añadir una cantidad pequeña y opcional a la copa central, también de agua o refresco, o pasar sin aportar nada. Al cuarto Rey, la persona puede dar un sorbo pequeño y opcional o pasar. No tienes que terminar la copa ni beber toda la mezcla: se retira la copa, se desecha el resto y termina esta variante.",
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
      a: "Elegid juntos un tema que os apetezca. Podéis quedaros en ese bloque, saltar una frase o dejar la partida en cualquier momento. Si alguien pasa, leed otra frase sin preguntarle por qué.",
    },
  ],

  "yo-prefiero-preguntas": [
    {
      q: "¿Cómo se juega al Yo Prefiero?",
      a: "El móvil muestra A y B. A la de tres, mostrad uno o dos dedos o dejad la mano bajada. Contad los votos en la mesa. Si hay empate o unanimidad, podéis comentarlo o seguir.",
    },
    {
      q: "¿Cuántas preguntas tiene el Yo Prefiero de BeberGames?",
      a: "Hay 60 dilemas repartidos por intensidad. La partida usa los niveles que seleccionéis.",
    },
    {
      q: "¿Cuál es la gracia del Yo Prefiero como juego de beber?",
      a: "Los dilemas permiten descubrir qué prefiere cada persona. Quien quiera puede explicar su elección.",
    },
    {
      q: "¿Se puede jugar al Yo Prefiero sin beber?",
      a: "Sí. Podéis votar o absteneros sin beber, hacer retos ni justificar la respuesta.",
    },
  ],

  "preguntas-quien-es-mas-probable": [
    {
      q: "¿Cómo se juega al Quién Es Más Probable?",
      a: "A la de tres, señalad a la vez o dejad la mano bajada. Contad las nominaciones en la mesa. Quien reciba más votos puede comentar la pregunta o pasar.",
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
      a: "Compartid la nominación entre quienes empaten. La app no registra votos ni decide desempates. Si nadie vota, seguid con la siguiente tarjeta.",
    },
  ],

  "juegos-para-cumpleanos-adultos": [
    {
      q: "¿Cuáles son los mejores juegos para un cumpleaños de adultos?",
      a: "Los mejores juegos para un cumpleaños de adultos son Quién Es Más Probable (podéis añadir preguntas de cumpleaños en la mesa), Verdad o Reto, Yo Nunca, Ring of Fire y Beer Pong. Todos están disponibles gratis en BeberGames sin necesidad de descargar nada.",
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
