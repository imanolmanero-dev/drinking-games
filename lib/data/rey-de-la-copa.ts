import { shuffle } from "@/lib/games/shuffle";

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
      "Inicia una cascada de brindis. Cada persona puede alzar su vaso, dar un sorbo pequeño opcional o pasar. Puedes parar inmediatamente, sin esperar a nadie.",
  },
  {
    valor: "2",
    emoji: "👆",
    titulo: "Tú eliges",
    descripcion: "Invita a alguien a dedicar un brindis al grupo. Puede pasar.",
  },
  {
    valor: "3",
    emoji: "🍺",
    titulo: "Mi brindis",
    descripcion: "Dedica tú el brindis de esta carta, con palabras o un gesto.",
  },
  {
    valor: "4",
    emoji: "🌍",
    titulo: "Suelo",
    descripcion:
      "Toca la mesa para que el grupo copie el gesto.",
  },
  {
    valor: "5",
    emoji: "👦",
    titulo: "Los chicos",
    descripcion: "Los chicos que quieran pueden saludar al grupo.",
  },
  {
    valor: "6",
    emoji: "👧",
    titulo: "Las chicas",
    descripcion: "Las chicas que quieran pueden saludar al grupo.",
  },
  {
    valor: "7",
    emoji: "☁️",
    titulo: "Al cielo",
    descripcion:
      "Señala al cielo. Quien quiera puede seguirte.",
  },
  {
    valor: "8",
    emoji: "🤝",
    titulo: "Amigo del alma",
    descripcion:
      "Invita a alguien a compartir un saludo. Podéis repetirlo cuando salga otra carta o dejarlo ahí.",
  },
  {
    valor: "9",
    emoji: "🎵",
    titulo: "Rima",
    descripcion:
      "Di una palabra y buscad rimas. La cadena termina cuando alguien pasa o repite.",
  },
  {
    valor: "10",
    emoji: "📋",
    titulo: "Categorías",
    descripcion:
      "Elige un tema y nombrad ejemplos por turnos. Al repetir o pasar, termina la cadena.",
  },
  {
    valor: "J",
    emoji: "📜",
    titulo: "Haz una norma",
    descripcion:
      "Proponed una norma que todo el grupo acepte, como usar apodos. Podéis retirarla cuando queráis.",
  },
  {
    valor: "Q",
    emoji: "❓",
    titulo: "La pregunta",
    descripcion:
      "Haz una pregunta. Quien quiera sigue con otra pregunta; una respuesta o un pase cierra la cadena.",
  },
  {
    valor: "K",
    emoji: "👑",
    titulo: "Rey de la Copa",
    descripcion:
      "En los tres primeros reyes puedes añadir un poco de tu bebida a la copa o dejarla vacía. Al cuarto rey se aparta la copa y se desecha el contenido.",
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
  return shuffle(deck);
}
