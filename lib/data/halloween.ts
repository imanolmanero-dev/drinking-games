export const HALLOWEEN_DATE = "2026-10-23";

export type HalloweenSection = { id: string; title: string; setup: string; paragraphs: string[]; href?: string; cta?: string };
export type HalloweenContent = { path: string; title: string; description: string; h1: string; intro: string; sections: HalloweenSection[]; faqs: { q: string; a: string }[] };

export const halloweenEs: HalloweenContent = {
  path: "/juegos-para-halloween",
  title: "Juegos para Halloween — Fiesta con amigos",
  description: "Juegos para Halloween con amigos: ruleta, Yo Nunca, retos y cartas. Ideas para organizar tu fiesta, con o sin alcohol, y juegos online gratis para empezar.",
  h1: "Juegos para Halloween: una noche de miedo con amigos",
  intro: "El sábado 31 de octubre de 2026 toca reunir disfraces, algo de picar y un grupo con ganas de jugar. Aquí tienes ideas para una fiesta de Halloween de adultos: rondas rápidas, preguntas y retos que funcionan con o sin alcohol. Elige una para romper el hielo y guarda otra para cuando llegue todo el mundo.",
  sections: [
    { id: "ruleta", title: "Ruleta de Halloween", setup: "3–10 personas · 10 minutos · papel y un lápiz", paragraphs: [
      "Dibuja seis casillas numeradas y escribe una acción en cada una: voz de fantasma, pose de vampiro, anuncio de una casa encantada, risa de bruja, título de película inventado y baile de esqueleto. Girad un lápiz en el centro para elegir. Cada persona tiene un turno y podéis parar después de dos vueltas al grupo.",
      "Una casilla puede proponer un brindis con un sorbo pequeño opcional, de cualquier bebida. Pasar siempre vale. La Ruleta online ofrece resultados generales predefinidos: no permite cargar estas casillas ni incluye un modo Halloween. Si la abrís, acordad antes sustituir cualquier indicación que no os encaje por uno de estos retos."
    ], href: "/juegos/la-ruleta", cta: "Probar la ruleta general" },
    { id: "yo-nunca", title: "Yo Nunca — historias de Halloween", setup: "3–12 personas · 10 minutos · sin materiales", paragraphs: [
      "Por turnos, alguien dice algo que nunca haya hecho. Quienes sí lo hayan hecho levantan la mano. Empezad con «Yo nunca he improvisado un disfraz cinco minutos antes de salir», «Yo nunca he gritado por un adorno» o «Yo nunca he fingido conocer la película de un disfraz».",
      "Contar la historia es voluntario. Si elegís jugar con bebida, levantar la mano puede acompañarse de un sorbo pequeño opcional, nunca de cantidades acumuladas. Haced dos preguntas por persona y cerrad la ronda. Para seguir con temas variados, el juego online tiene preguntas generales; las de Halloween las leéis desde aquí."
    ], href: "/juegos/yo-nunca", cta: "Jugar a Yo Nunca" },
    { id: "verdad-o-reto", title: "Verdad o Reto entre monstruos", setup: "3–10 personas · 15 minutos · una pantalla opcional", paragraphs: [
      "Cada participante elige verdad o reto. Para verdad: «¿Qué miedo absurdo tenías de pequeño?» o «¿Qué disfraz te gustaría borrar de las fotos?». Para reto: presenta una calabaza como si fuera una estrella de cine o interpreta a un fantasma intentando pedir una pizza.",
      "Dadle a cada persona dos turnos. Se puede cambiar de pregunta, rechazar el reto o pasar sin penalización y sin beber. Si os apetece un brindis opcional, reservadlo para el final de la ronda, desvinculado de las respuestas. El enlace abre el juego habitual, no un paquete temático: acordad que estas reglas de pasar libremente se mantienen."
    ], href: "/juegos/verdad-o-reto", cta: "Empezar Verdad o Reto" },
    { id: "mas-probable", title: "¿Quién es más probable que sobreviva al susto?", setup: "4–12 personas · 5–10 minutos · sin materiales", paragraphs: [
      "Leed una pregunta, contad hasta tres y señalad a la vez. ¿Quién se haría amigo del fantasma? ¿Quién entraría en la casa encantada por equivocación? ¿Quién llevaría aperitivos a un apocalipsis zombi? Elegid situaciones inventadas, no inseguridades personales.",
      "La persona más votada puede defender su candidatura con una frase. En caso de empate, compartís el papel. Si habéis acordado una variante con bebida, ser la persona más votada invita a un único sorbo pequeño opcional; los votos no se suman como tragos. Terminad tras seis preguntas y abrid el juego general si queréis cambiar de tema."
    ], href: "/juegos/quien-es-mas-probable", cta: "Jugar a Quién Es Más Probable" },
    { id: "cartas", title: "Saca una carta de la casa encantada", setup: "2–8 personas · 10 minutos · baraja física", paragraphs: [
      "Mezclad una baraja y sacad una carta por turno. Corazones: cuenta una anécdota de un disfraz. Diamantes: inventa un nombre de monstruo. Tréboles: haz una mímica de terror. Picas: el grupo adivina una película a partir de tres pistas. Si usáis baraja española, asignad esas acciones a copas, oros, bastos y espadas.",
      "Acabad cuando cada persona haya sacado dos cartas. Como variante, una carta de corazones puede invitar a un sorbo pequeño opcional después de la anécdota; no depende de contarla. Esta dinámica usa cartas físicas. Para una partida digital diferente, tenéis Rey de la Copa, con sus propias reglas: revisadlas y acordad adaptaciones antes de empezar."
    ], href: "/juegos/rey-de-la-copa", cta: "Ver el juego Rey de la Copa" },
    { id: "equipos", title: "Mímica de terror por parejas o equipos", setup: "4–12 personas · 15 minutos · papelitos", paragraphs: [
      "Escribid películas o personajes reconocibles: Drácula, una momia, un hombre lobo o un fantasma perdido. Dividíos en dos equipos. Una persona representa un papel sin hablar y su equipo tiene un minuto para adivinarlo. Podéis pasar un papel sin perder puntos.",
      "Cada acierto suma un punto. Jugad tres turnos por equipo y aceptad el empate si llega. Los puntos nunca se convierten en bebida. Si preferís describir palabras, Tabú ofrece otra dinámica para equipos con vocabulario general; el tema de Halloween se prepara en los papelitos, no en la app."
    ], href: "/juegos/tabu", cta: "Probar Tabú en equipo" },
    { id: "retos", title: "Retos rápidos para cuando llega más gente", setup: "2 o más personas · 5 minutos · sin preparación", paragraphs: [
      "Proponed un desfile de monstruos de diez segundos por persona, un concurso de nombres para una poción o una historia colectiva en la que cada participante añade una frase. Una buena apertura: «La calabaza llamó al timbre y pidió que bajáramos la música».",
      "Elegid un solo reto y terminad cuando todos hayan tenido ocasión de participar. Nadie tiene que salir en fotos, tocar a otra persona ni publicar nada. Para un grupo grande, formad pequeños círculos: se escucha mejor y nadie pasa media fiesta esperando su turno."
    ] },
    { id: "organizar", title: "Cómo organizar una noche de juegos de Halloween", setup: "Un plan sencillo para el sábado 31 de octubre", paragraphs: [
      "Dejad los primeros diez minutos para llegar y explicar dos acuerdos: se puede pasar y cualquier bebida es opcional. Empezad por las votaciones, seguid con preguntas y reservad la mímica para después de comer algo. Entre juegos, haced una pausa para charlar y decidir si seguís.",
      "Preparad agua, refrescos y aperitivos al alcance de todos. La versión sin alcohol funciona con las mismas preguntas y turnos: levantad la mano, haced una pose o jugad por puntos cuando corresponda. No hace falta reemplazar cada sorbo por otra obligación. Si hay alcohol, solo para personas con edad legal y cada cual decide cuánto, o nada.",
      "Bajad la música mientras se leen preguntas, dejad espacio libre para moverse y usad luz suficiente para ver las cartas. No necesitáis decoración cara: unos nombres de equipo y una lista de personajes ya ponen el ambiente. Cerrad la sesión tras dos o tres juegos si el grupo prefiere seguir hablando."
    ] }
  ],
  faqs: [
    { q: "¿Qué juegos se pueden hacer en Halloween?", a: "Yo Nunca con historias de disfraces, Verdad o Reto temático, votaciones sobre monstruos y mímica de películas. Elige preguntas para empezar y un juego por equipos cuando ya esté todo el grupo." },
    { q: "¿Qué juegos funcionan para grupos grandes?", a: "Las votaciones son rápidas porque todos participan a la vez. Para mímica o historias, divide el grupo en equipos o círculos pequeños y fija el mismo número de turnos para cada uno." },
    { q: "¿Se puede jugar sin alcohol?", a: "Sí. Todas estas propuestas funcionan sin bebida. Usa manos levantadas, respuestas habladas y puntos en la mímica. Pasar no lleva penalización y no obliga a explicar el motivo." },
    { q: "¿Qué juego rápido puedo hacer en una fiesta?", a: "Haz seis preguntas de Quién Es Más Probable con situaciones de Halloween. Leed cada una, contad hasta tres y votad juntos. En unos cinco minutos habréis roto el hielo." }
  ]
};

export const halloweenEn: HalloweenContent = {
  path: "/en/halloween-drinking-games",
  title: "Halloween Drinking Games & Party Games",
  description: "Plan Halloween drinking games with friends: spooky questions, quick challenges and card games, plus free online play. Every game works without alcohol.",
  h1: "Halloween Drinking Games for a Scary Good Party",
  intro: "Halloween falls on Saturday, October 31 in 2026. Bring the costumes, put snacks on the table, and pick a game that gets everyone talking. These Halloween party games for adults include quick icebreakers, spooky questions and team challenges. Drinks are optional, and nobody has to earn the right to sit out.",
  sections: [
    { id: "roulette", title: "Halloween roulette: spin for a scene", setup: "3–10 players · 10 minutes · paper and a pencil", paragraphs: [
      "Draw a wheel with six spaces and spin a pencil in the middle. Fill the spaces with a ghost voice, a vampire pose, a haunted-house sales pitch, a witch's laugh, a made-up horror title and a skeleton dance. Whoever spins acts out the result or passes. Give everyone two turns, then retire the wheel.",
      "For a drinking version, label one space an optional toast instead: landing there invites one small sip of any drink. You can wave your glass or do nothing. This is a paper game you set up together; the English site does not have an interactive Halloween wheel."
    ] },
    { id: "never-have-i-ever", title: "Never Have I Ever — costume confessions", setup: "3–12 players · 10 minutes · no equipment", paragraphs: [
      "Take turns saying something you have never done. Anyone who has done it raises a hand. Try: “Never have I ever made a costume out of things in my laundry basket,” “Never have I ever jumped at a plastic spider,” or “Never have I ever pretended to recognize someone's costume.”",
      "Raising a hand can be the cue for one small, optional sip if you chose to include drinks. There is no need to tell the story, and several matching statements never create a debt of drinks. Stop after everyone has offered two prompts. Keep the questions light when friends are meeting for the first time."
    ] },
    { id: "truth-or-dare", title: "Truth or Dare — Halloween edition at your table", setup: "2–12 players · 15 minutes · one shared screen optional", paragraphs: [
      "Ask “Which harmless thing scared you as a kid?” or “What is your most questionable costume decision?” For a dare, try giving a pumpkin an awards speech, ordering takeout as a ghost, or pitching a horror movie about a very ordinary toaster. Take turns choosing a question or a challenge.",
      "Play two turns each. Answering, doing a dare and passing are all valid turns; refusing never triggers a drink. If you want a drinking cue, the end of the full round can be an optional small-sip toast for anyone who wants one. Our online game supplies general Classic and Party prompts, not a Halloween pack. Use the ideas here between rounds."
    ], href: "/en/games/truth-or-dare", cta: "Play Truth or Dare" },
    { id: "most-likely", title: "Most Likely To — meet your horror-movie cast", setup: "4–12 players · 5–10 minutes · no equipment", paragraphs: [
      "Read a question and point together on the count of three. Who would try to negotiate with the ghost? Who would bring snacks to a zombie apocalypse? Who would accidentally become the haunted-house tour guide? Stick to imaginary situations instead of real sore spots.",
      "The person with the most votes gets to give a one-line acceptance speech, or pass. In a tie, both people get the part. If your group includes drinks, the most-voted player may take one small sip; votes never add up to extra drinks. Finish after six questions. With a crowd, split into circles so everyone can see the votes."
    ] },
    { id: "pick-a-card", title: "Pick a card from the haunted deck", setup: "2–8 players · 10 minutes · a physical deck", paragraphs: [
      "Shuffle a deck and draw clockwise. Hearts mean a costume story, diamonds mean invent a monster name, clubs mean act out a creature, and spades mean give three clues to a spooky movie. Use the suit only, so you do not have to memorize thirteen different rules. Each person draws twice, then the game ends.",
      "For an optional drinking twist, a heart invites one small sip whether or not you tell a story. Put the card aside and move on. Want a digital deck with a different set of rules? King's Cup has its own on-screen card prompts. It is a separate game, not an online version of this four-suit Halloween activity."
    ], href: "/en/games/kings-cup", cta: "Play King's Cup" },
    { id: "teams", title: "Monster charades for pairs and teams", setup: "4–12 players · 15 minutes · paper slips", paragraphs: [
      "Write familiar creatures or movies on slips: a mummy, a werewolf, Dracula or a ghost stuck in an elevator. Split into two teams. One person acts while their team guesses, with up to a minute per slip. Passing a slip is fine. Give each team three turns and award one point per correct guess.",
      "Keep points separate from drinks. If you want a drinking cue, the end of the match is an optional small-sip toast for either team, including a tie. You can also cheer, have water or skip it. Leave enough room to move, and keep costumes and props away from candles."
    ] },
    { id: "quick-challenges", title: "Quick Halloween challenges between games", setup: "2 or more players · 5 minutes · no preparation", paragraphs: [
      "Try a ten-second monster walk, invent a name for a terrible magic potion, or build a story one sentence at a time. Start with: “The pumpkin rang the doorbell and asked us to turn the music down.” Go around once and let the last player supply the ending.",
      "For a drinking option, the completed story can cue one small, optional sip. Never attach drinks to speaking quickly, making mistakes or declining a challenge. Nobody needs to be filmed, touch another player or post anything. These work well while late arrivals settle in because you can explain the whole activity in a sentence."
    ] },
    { id: "plan", title: "How to run a Halloween games night", setup: "A simple plan for Saturday, October 31", paragraphs: [
      "Start with a short voting game, move to questions once everyone has arrived, and save charades for after snacks. Two or three games are plenty. Agree on a stopping point before each one, then ask whether people want another round or would rather catch up. Lower the music while someone reads a prompt.",
      "Put water, soft drinks and food where everyone can reach them. Every idea here works without alcohol: hands, spoken answers and ordinary game points keep the action moving. You do not need to replace each sip with a task. Anyone choosing alcohol must be of legal drinking age where they are, and chooses their own limits.",
      "Choose a few familiar characters rather than obscure movie trivia if your guests have different tastes. For a large party, run small groups with the same rules instead of making everyone wait for one turn. A spare phone charger, readable prompts and somewhere to sit will do more for the night than elaborate decorations."
    ] }
  ],
  faqs: [
    { q: "What are good games for a Halloween party?", a: "Costume-themed Never Have I Ever, spooky Truth or Dare, horror-movie Most Likely To and monster charades all need little preparation. Start with a quick group vote, then choose questions or teams to suit your guests." },
    { q: "What Halloween games work for large groups?", a: "Most Likely To lets everyone vote together. For charades and stories, use small teams or circles with equal turns, so guests spend more time playing and less time waiting." },
    { q: "Can these games be played without alcohol?", a: "Yes. Use raised hands, spoken answers or ordinary points where the rules call for them. Soft drinks are welcome too. Passing is always allowed and never creates a drinking penalty." },
    { q: "What is a quick Halloween drinking game?", a: "Play six spooky Most Likely To questions. Vote together; the most-voted player can take one small, optional sip or simply accept the fictional role. Votes do not multiply drinks, and the whole game takes around five minutes." }
  ]
};
