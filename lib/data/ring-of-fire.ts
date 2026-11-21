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
    regla: "Pasa la ola",
    descripcion: "Levanta los brazos y pasa la ola hacia la derecha. Cada persona puede sumarse o dejarla pasar.",
    emoji: "🌊",
  },
  {
    valor: "2",
    nombre: "Tú",
    regla: "Invita a un brindis",
    descripcion: "Invita a alguien a dedicar un brindis con palabras.",
    emoji: "🫵",
  },
  {
    valor: "3",
    nombre: "Yo",
    regla: "Dedica unas palabras",
    descripcion: "Dedica unas palabras al grupo o pasa.",
    emoji: "💬",
  },
  {
    valor: "4",
    nombre: "Chicas",
    regla: "Paso de baile",
    descripcion: "Las chicas que quieran pueden improvisar un paso de baile.",
    emoji: "💃",
  },
  {
    valor: "5",
    nombre: "Pulgar",
    regla: "Maestro del Pulgar",
    descripcion: "Apoya el pulgar en la mesa. Quien lo vea puede imitarte hasta que salga otro cinco.",
    emoji: "👍",
  },
  {
    valor: "6",
    nombre: "Chicos",
    regla: "Marca el ritmo",
    descripcion: "Los chicos que quieran pueden marcar un ritmo con las manos.",
    emoji: "🕺",
  },
  {
    valor: "7",
    nombre: "Cielo",
    regla: "¡Manos arriba!",
    descripcion: "Señala al techo para que el grupo copie el gesto.",
    emoji: "🙌",
  },
  {
    valor: "8",
    nombre: "Colega",
    regla: "Un saludo compartido",
    descripcion: "Invita a alguien a inventar un saludo contigo. Podéis hacerlo una vez o pasar.",
    emoji: "🤝",
  },
  {
    valor: "9",
    nombre: "Rima",
    regla: "A rimar",
    descripcion: "Di una palabra y buscad rimas por turnos. Al repetir o pasar, termina la cadena.",
    emoji: "🎤",
  },
  {
    valor: "10",
    nombre: "Categorías",
    regla: "Elige una categoría",
    descripcion: "Elige una categoría. Dad ejemplos hasta que alguien repita o pase.",
    emoji: "🧠",
  },
  {
    valor: "J",
    nombre: "Norma",
    regla: "Inventa una norma",
    descripcion: "Proponed una norma de gestos que todos acepten. El siguiente Jack la reemplaza.",
    emoji: "📜",
  },
  {
    valor: "Q",
    nombre: "Preguntas",
    regla: "Maestro de Preguntas",
    descripcion: "Responde a una pregunta con otra. Una respuesta o un pase cierra la cadena.",
    emoji: "❓",
  },
  {
    valor: "K",
    nombre: "Copa del Rey",
    regla: "Cuenta los reyes",
    descripcion: "Cuenta este rey junto a la copa vacía. Al cuarto rey, aparta la copa y termina la partida.",
    emoji: "👑",
  },
];
