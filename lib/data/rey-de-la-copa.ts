export interface ReglaCartaRey {
  valor: string;
  emoji: string;
  titulo: string;
  descripcion: string;
  esCopa?: boolean;
}

export const reglasCartas: ReglaCartaRey[] = [
  {
    valor: "A",
    emoji: "🌊",
    titulo: "Cascada",
    descripcion:
      "Empieza a beber. El de tu derecha empieza cuando tú pares, y así en cascada. Nadie puede parar antes que la persona a su izquierda.",
  },
  {
    valor: "2",
    emoji: "👆",
    titulo: "Tú eliges",
    descripcion: "Señala a alguien del grupo. Esa persona bebe.",
  },
  {
    valor: "3",
    emoji: "🍺",
    titulo: "Yo bebo",
    descripcion: "Mala suerte. Tú eres quien bebe esta vez.",
  },
  {
    valor: "4",
    emoji: "🌍",
    titulo: "Suelo",
    descripcion:
      "¡Todos al suelo! El último en tocar el suelo con la mano bebe.",
  },
  {
    valor: "5",
    emoji: "👦",
    titulo: "Los chicos",
    descripcion: "Todos los chicos beben. Las chicas se salvan... por ahora.",
  },
  {
    valor: "6",
    emoji: "👧",
    titulo: "Las chicas",
    descripcion: "Todas las chicas beben. Los chicos pasan.",
  },
  {
    valor: "7",
    emoji: "☁️",
    titulo: "Al cielo",
    descripcion:
      "¡Todos señalen al cielo! El último en levantar el dedo bebe.",
  },
  {
    valor: "8",
    emoji: "🤝",
    titulo: "Amigo del alma",
    descripcion:
      "Elige a alguien. A partir de ahora, cuando bebas tú bebe él/ella también (y viceversa). La regla dura hasta que salga otro 8.",
  },
  {
    valor: "9",
    emoji: "🎵",
    titulo: "Rima",
    descripcion:
      "Di una palabra. El grupo dice palabras que rimen. El primero que falle o se repita bebe.",
  },
  {
    valor: "10",
    emoji: "📋",
    titulo: "Categorías",
    descripcion:
      "Elige una categoría (países, marcas de coches, etc.). El grupo nombra cosas de esa categoría. El que falle bebe.",
  },
  {
    valor: "J",
    emoji: "📜",
    titulo: "Haz una norma",
    descripcion:
      "Invéntate una regla que todo el grupo debe cumplir el resto de la partida. Quien la incumpla bebe.",
  },
  {
    valor: "Q",
    emoji: "❓",
    titulo: "La pregunta",
    descripcion:
      "Mira a alguien y hazle una pregunta. Debe responder con otra pregunta. El primero que responda de verdad o se quede en blanco bebe.",
  },
  {
    valor: "K",
    emoji: "👑",
    titulo: "Rey de la Copa",
    descripcion:
      "Llena la Copa del Rey con parte de tu bebida. ¡El que saque el cuarto Rey debe beberse toda la copa!",
    esCopa: true,
  },
];

export type Palo = "♠" | "♥" | "♦" | "♣";

export interface Carta {
  valor: string;
  palo: Palo;
  regla: ReglaCartaRey;
}

export function buildDeck(): Carta[] {
  const palos: Palo[] = ["♠", "♥", "♦", "♣"];
  const deck: Carta[] = [];
  for (const palo of palos) {
    for (const regla of reglasCartas) {
      deck.push({ valor: regla.valor, palo, regla });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Carta[]): Carta[] {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}
