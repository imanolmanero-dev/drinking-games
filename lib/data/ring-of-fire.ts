export interface CartaROF {
  valor: string;
  nombre: string;
  regla: string;
  descripcion: string;
  emoji: string;
}

export const CARTAS_ROF: CartaROF[] = [
  {
    valor: "A",
    nombre: "Cascada (Waterfall)",
    regla: "¡Todos beben!",
    descripcion: "Empiezas a beber y el de tu derecha también, y así sucesivamente. No se puede parar hasta que el de tu izquierda pare.",
    emoji: "🌊",
  },
  {
    valor: "2",
    nombre: "Tú",
    regla: "Elige a alguien",
    descripcion: "Señala a alguien para que beba 2 tragos.",
    emoji: "🫵",
  },
  {
    valor: "3",
    nombre: "Yo",
    regla: "Bebes tú",
    descripcion: "Te toca beber 3 tragos. ¡Salud!",
    emoji: "🥃",
  },
  {
    valor: "4",
    nombre: "Chicas",
    regla: "¡Todas las chicas beben!",
    descripcion: "Todas las mujeres de la mesa deben beber un trago.",
    emoji: "💃",
  },
  {
    valor: "5",
    nombre: "Pulgar",
    regla: "Maestro del Pulgar",
    descripcion: "Pon tu pulgar en la mesa. El último en hacerlo bebe. Puedes hacerlo cuando quieras hasta que salga otro 5.",
    emoji: "👍",
  },
  {
    valor: "6",
    nombre: "Chicos",
    regla: "¡Todos los chicos beben!",
    descripcion: "Todos los hombres de la mesa deben beber un trago.",
    emoji: "🕺",
  },
  {
    valor: "7",
    nombre: "Cielo",
    regla: "¡Manos arriba!",
    descripcion: "Levanta las manos. El último en hacerlo bebe un trago.",
    emoji: "🙌",
  },
  {
    valor: "8",
    nombre: "Colega",
    regla: "Elige un colega",
    descripcion: "Elige a alguien. Cada vez que tú bebas, él/ella también tendrá que beber (hasta que salga otro 8).",
    emoji: "🤝",
  },
  {
    valor: "9",
    nombre: "Rima",
    regla: "A rimar",
    descripcion: "Di una palabra. En el sentido del reloj, cada uno debe decir una palabra que rime. El primero que falle o repita, bebe.",
    emoji: "🎤",
  },
  {
    valor: "10",
    nombre: "Categorías",
    regla: "Elige una categoría",
    descripcion: "Ej: 'Marcas de cerveza'. El primero que no sepa qué decir o repita una ya dicha, bebe.",
    emoji: "🧠",
  },
  {
    valor: "J",
    nombre: "Norma",
    regla: "Inventa una norma",
    descripcion: "Crea una regla (ej: prohibido decir 'sí' o 'no'). El que la rompa debe beber. Dura todo el juego.",
    emoji: "📜",
  },
  {
    valor: "Q",
    nombre: "Preguntas",
    regla: "Maestro de Preguntas",
    descripcion: "Hazle una pregunta a alguien. Éste debe responder con otra pregunta. El que conteste normalmente, bebe.",
    emoji: "❓",
  },
  {
    valor: "K",
    nombre: "Copa del Rey",
    regla: "Echa tu bebida en la Copa",
    descripcion: "Vierte un poco de tu bebida en la Copa central. ¡El que saque el cuarto y último Rey se tiene que beber la mezcla!",
    emoji: "👑",
  },
];
