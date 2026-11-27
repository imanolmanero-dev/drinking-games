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
      a: "En BeberGames.com tienes 13 juegos de fiesta gratuitos, sin registro ni descargas. Solo abre la web en el móvil y empieza a jugar. Incluye Yo Nunca, Verdad o Reto, Medusa, La Bomba, Ring of Fire y más.",
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
      a: "Empezad con una ronda corta de Yo Nunca, Yo Prefiero, Medusa, La Bomba o Verdad o Reto. Si tenéis más tiempo para una partida, probad Ring of Fire o Beer Pong. Para Beer Pong necesitáis una mesa, una pelota y vasos con agua como blancos.",
    },
    {
      q: "¿Cuánto dura una previa normal?",
      a: "Una previa suele durar entre una y dos horas. Tened tres juegos a mano y probad rondas de cinco a quince minutos si vais a salir pronto. Podéis repetir si el grupo quiere seguir.",
    },
    {
      q: "¿Qué juego es mejor para romper el hielo en una previa?",
      a: "Yo Prefiero abre conversación con dos opciones. En Yo Nunca, quienes hayan vivido la experiencia pueden bajar un dedo, contar una anécdota o pasar. Si preferís empezar sin hablar, probad Medusa.",
    },
    {
      q: "¿Cuántas personas son ideales para una previa con juegos de beber?",
      a: "De cinco a doce personas dan para un círculo en el que se oigan las preguntas. Con un grupo grande, leed en voz alta o haced dos círculos. En Medusa y Quién Es Más Probable podéis jugar a la vez. En La Bomba, el móvil pasa de mano en mano.",
    },
  ],

  "juegos-para-beber-rapidos": [
    {
      q: "¿Cuáles son los juegos para beber más rápidos?",
      a: "Medusa, Bizz Buzz y La Moneda se explican en pocos segundos. En Medusa la cuenta empieza en tres. En Bizz Buzz tenéis tres segundos por respuesta y en La Moneda podéis jugar hasta cinco puntos.",
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
      a: "Con baraja francesa podéis jugar a Ring of Fire, Pirámide, Presidente, Blackjack o Alta o Baja. BeberGames tiene versiones digitales de Ring of Fire, Rey de la Copa y La Pirámide.",
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
      a: "Si no tenéis mesa, probad Medusa, Yo Nunca, La Bomba, Yo Prefiero o Verdad o Reto. Podéis pasar cualquier pregunta o reto. Si hay una superficie firme, también podéis montar el relevo de Flip Cup con vasos vacíos.",
    },
    {
      q: "¿Cómo organizar un botellón con juegos de beber?",
      a: "Empezad con una ronda de Medusa o Yo Prefiero y cambiad de juego cuando apetezca al grupo. Para el Flunkyball, buscad una zona llana sin gente de paso, una botella vacía y una pelota blanda. El equipo que derriba la botella gana un punto.",
    },
    {
      q: "¿Qué juegos de beber funcionan para grupos muy grandes?",
      a: "Si sois más de diez, probad Medusa en círculo, Yo Prefiero con votos a la vez o La Bomba pasándoos el móvil. Si preferís jugar por equipos, haced relevos con vasos vacíos en una mesa estable.",
    },
  ],

  "retos-para-fiestas": [
    {
      q: "¿Cuáles son los mejores retos para fiestas?",
      a: "Prueba mímica, doblaje improvisado y juegos de ritmo. La guía reúne 55 retos en tres niveles. Podéis pasar cualquier prueba y seguir con la siguiente persona.",
    },
    {
      q: "¿Cómo se juega al Verdad o Reto?",
      a: "En tu turno eliges Verdad o Reto. Cuando ves la tarjeta, puedes intentar la propuesta o pasar sin explicación ni consecuencia. La app ofrece tres intensidades y funciona a partir de tres jugadores.",
    },
    {
      q: "¿Hay juegos de retos para grupos mixtos?",
      a: "Sí. Elegid un nivel y probad retos que no requieran contacto ni acceso a móviles o cuentas. En Verdad o Reto se puede pasar cada propuesta. En Yo Prefiero podéis votar, comentar o pasar.",
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
      a: "Podéis empezar con Yo Nunca o Medusa en poco espacio. Si tenéis mesa, montad Beer Pong con vasos de agua como blancos o usad la baraja de Ring of Fire. Elegid Verdad o Reto cuando os apetezca una ronda de preguntas y propuestas que cualquiera pueda pasar.",
    },
    {
      q: "¿En qué orden debo poner los juegos en una fiesta?",
      a: "Para la llegada, probad Dos Verdades o Medusa. Cuando el grupo esté reunido, sacad las cartas o haced un torneo corto. Al final podéis volver a un juego de conversación, como La Historia Encadenada.",
    },
    {
      q: "¿Cuántos juegos necesito preparar para una fiesta con juegos de beber?",
      a: "Con tres juegos preparados suele bastar. Elegid uno que admita incorporaciones, otro para el grupo completo y uno de reserva. El kit de la guía reúne doce enlaces para elegir desde el móvil.",
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
      a: "Con una baraja española de 40 cartas podéis jugar a Siete y Medio, la Mona, el Burro, Guerra y Escoba. En Guerra, la carta más alta recoge el montón. En Escoba, capturáis cartas que sumen quince con una de vuestra mano.",
    },
    {
      q: "¿Se puede jugar al Ring of Fire con baraja española?",
      a: "El Ring of Fire digital no requiere baraja física. Si queréis hacer una variante de mesa con la española, acordad qué hará cada número o figura antes de repartir. Podéis conservar el final con el cuarto rey y pasar cualquier acción.",
    },
    {
      q: "¿Cuántas cartas tiene una baraja española?",
      a: "La baraja española larga tiene 48 cartas repartidas en oros, copas, espadas y bastos. La corta tiene 40: del uno al siete, sota, caballo y rey en cada palo. Si tenéis la larga, retirad los ochos y nueves para jugar a estas variantes.",
    },
  ],

  "juegos-de-mesa-para-beber": [
    {
      q: "¿Cuáles son los mejores juegos de mesa para convertir en juegos de beber?",
      a: "Jenga, UNO, Parchís y Trivial funcionan bien en una previa. Contad bloques colocados en Jenga, jugad a quedaros sin cartas en UNO, llevad fichas a la meta en Parchís o competid por tres quesitos en una partida corta de Trivial.",
    },
    {
      q: "¿Se puede añadir una regla de beber a cualquier juego de mesa?",
      a: "Podéis acordar variantes de mesa antes de empezar. Elegid objetivos que encajen con el tablero, como jugar a dos fichas en Parchís o contar territorios tras un número fijo de rondas en Risk. Las bebidas personales quedan aparte de la puntuación.",
    },
    {
      q: "¿Necesito comprar juegos especiales para jugar a juegos de mesa de beber?",
      a: "No. Usad las piezas del juego que tengáis en casa y acordad la duración y el objetivo antes de empezar. Si no tenéis tablero, BeberGames ofrece 13 juegos gratuitos que funcionan en el móvil.",
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
      a: "Triman y El 21 usan un dado. Mexicano, 7-11-D y Par o Nones usan dos. Barco Capitán usa cinco, Chingón seis y Dudo cinco por persona. Triman online incluye su propio dado.",
    },
  ],

  "juegos-para-beber-en-pareja": [
    {
      q: "¿Cuáles son los mejores juegos para beber en pareja?",
      a: "Para una pareja van bien Yo Nunca, Mayor o Menor y Verdad o Reto de mesa. Podéis jugar a Yo Nunca con dos en la app. Para Verdad o Reto, la app requiere tres personas, así que en pareja podéis alternar las propuestas a mano.",
    },
    {
      q: "¿Es el Yo Nunca un buen juego para una primera cita?",
      a: "Sí. Empezad con frases suaves sobre canciones, primeras citas o gustos. Podéis responder con un gesto, hablar del recuerdo si os apetece o pasar.",
    },
    {
      q: "¿Cómo se adaptan las reglas del Verdad o Reto para dos personas?",
      a: "Turnaos para proponer una pregunta o un reto de mesa. Quien recibe la propuesta puede responder, probar el reto o pasar sin dar explicaciones. La app requiere al menos tres jugadores.",
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
      a: "Elegid según el momento. La lista reúne 50 frases sobre recuerdos románticos, tensiones, intimidad y futuro. Podéis quedaros en un bloque o pasar al siguiente.",
    },
    {
      q: "¿Cómo se juega al Yo Nunca solo dos personas?",
      a: "Alternad quién lee cada frase. Si os reconocéis, podéis bajar un dedo o asentir. Si ninguno responde, leed la siguiente. Podéis dejar pasar cualquier frase y contar la historia solo si os apetece.",
    },
    {
      q: "¿El Yo Nunca ayuda a conocerse mejor en pareja?",
      a: "Puede abrir conversación sobre recuerdos o planes si ambos queréis. Un gesto basta para jugar, y podéis cambiar de tema en cualquier turno.",
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
      q: "¿Cuántas preguntas y retos incluye esta lista?",
      a: "Este artículo reúne 45 preguntas y 35 retos, divididos en tres niveles. La app tiene su propio repertorio por intensidad y se juega con un mínimo de tres personas.",
    },
    {
      q: "¿Es mejor elegir Verdad o Reto?",
      a: "Depende de lo que te apetezca en ese turno. Una pregunta da pie a conversar y un reto suele ser una prueba breve de mímica o improvisación. Puedes cambiar de opción en otro turno o pasar.",
    },
    {
      q: "¿Se puede jugar al Verdad o Reto sin reglas de beber?",
      a: "Sí. Puedes decir «paso» a cualquier pregunta o reto. El turno avanza sin pedir explicaciones, pruebas ni otra acción.",
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
      a: "Empezad con Medusa o La Bomba. Cuando llegue el resto, probad Yo Prefiero o Quién Es Más Probable. Para el cierre, elegid Ring of Fire, Beer Pong o una ronda de deseos que la persona que cumple años pueda aceptar o pasar.",
    },
    {
      q: "¿Qué juego de cumpleaños funciona mejor para grupos grandes?",
      a: "Para grupos de más de 10 personas funcionan mejor Medusa (todos participan a la vez), Quién Es Más Probable (todos votan) y Beer Pong (por equipos con espectadores). Para grupos más pequeños de 4-8 personas, Ring of Fire o Verdad o Reto son perfectos.",
    },
  ],
};
