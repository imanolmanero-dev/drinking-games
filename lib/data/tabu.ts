// Tabú Borracho — word data
// Each card has a word to describe and 4 taboo words that can't be used

export interface TabuCard {
  word: string;
  taboo: string[];
}

export const tabuCards: TabuCard[] = [
  // ── Comida y Bebida ──
  { word: "Pizza", taboo: ["Italia", "queso", "masa", "horno"] },
  { word: "Cerveza", taboo: ["alcohol", "bar", "rubia", "caña"] },
  { word: "Sushi", taboo: ["Japón", "arroz", "pescado", "alga"] },
  { word: "Hamburguesa", taboo: ["carne", "pan", "McDonald's", "patatas"] },
  { word: "Tequila", taboo: ["México", "limón", "sal", "chupito"] },
  { word: "Chocolate", taboo: ["dulce", "cacao", "bombón", "negro"] },
  { word: "Paella", taboo: ["arroz", "Valencia", "marisco", "sartén"] },
  { word: "Champagne", taboo: ["burbujas", "brindis", "Francia", "botella"] },
  { word: "Guacamole", taboo: ["aguacate", "México", "nachos", "verde"] },
  { word: "Kebab", taboo: ["carne", "pita", "salsa", "turco"] },

  // ── Cultura Pop ──
  { word: "Harry Potter", taboo: ["magia", "varita", "Hogwarts", "cicatriz"] },
  { word: "Instagram", taboo: ["fotos", "stories", "filtro", "likes"] },
  { word: "Netflix", taboo: ["series", "películas", "streaming", "pantalla"] },
  { word: "Pokémon", taboo: ["Pikachu", "atrapar", "Nintendo", "batalla"] },
  { word: "TikTok", taboo: ["vídeos", "baile", "viral", "red social"] },
  { word: "Fortnite", taboo: ["videojuego", "disparar", "baile", "batalla"] },
  { word: "Star Wars", taboo: ["espada", "Jedi", "Darth Vader", "fuerza"] },
  { word: "Minecraft", taboo: ["bloques", "construir", "píxel", "cueva"] },
  { word: "WhatsApp", taboo: ["mensaje", "grupo", "verde", "chat"] },
  { word: "YouTube", taboo: ["vídeos", "canal", "suscribirse", "rojo"] },

  // ── Famosos ──
  { word: "Messi", taboo: ["fútbol", "Argentina", "Barcelona", "gol"] },
  { word: "Shakira", taboo: ["cantar", "Colombia", "caderas", "Piqué"] },
  { word: "Bad Bunny", taboo: ["reggaetón", "Puerto Rico", "conejo", "cantar"] },
  { word: "Taylor Swift", taboo: ["cantar", "americana", "eras", "concierto"] },
  { word: "Cristiano Ronaldo", taboo: ["fútbol", "Portugal", "gol", "Real Madrid"] },
  { word: "Rosalía", taboo: ["cantar", "española", "flamenco", "motomami"] },
  { word: "Elon Musk", taboo: ["Tesla", "cohete", "Twitter", "millonario"] },
  { word: "Beyoncé", taboo: ["cantar", "americana", "diva", "Jay-Z"] },

  // ── Lugares ──
  { word: "Ibiza", taboo: ["isla", "fiesta", "discoteca", "playa"] },
  { word: "París", taboo: ["Francia", "torre", "Eiffel", "amor"] },
  { word: "Benidorm", taboo: ["playa", "Alicante", "turismo", "hotel"] },
  { word: "Las Vegas", taboo: ["casino", "juego", "desierto", "boda"] },
  { word: "Mallorca", taboo: ["isla", "playa", "Baleares", "vacaciones"] },
  { word: "Nueva York", taboo: ["estatua", "Manhattan", "rascacielos", "Broadway"] },

  // ── Objetos y Conceptos ──
  { word: "Resaca", taboo: ["beber", "dolor", "cabeza", "mañana"] },
  { word: "Tinder", taboo: ["cita", "match", "deslizar", "ligar"] },
  { word: "Karaoke", taboo: ["cantar", "micrófono", "escenario", "letra"] },
  { word: "Selfie", taboo: ["foto", "móvil", "cámara", "cara"] },
  { word: "Discoteca", taboo: ["bailar", "música", "noche", "DJ"] },
  { word: "Uber", taboo: ["taxi", "coche", "app", "conductor"] },
  { word: "Reggaetón", taboo: ["música", "perreo", "latino", "bailar"] },
  { word: "Meme", taboo: ["internet", "gracioso", "imagen", "viral"] },
  { word: "Botellón", taboo: ["beber", "calle", "amigos", "fiesta"] },
  { word: "Playa", taboo: ["arena", "mar", "sol", "toalla"] },
  { word: "Gimnasio", taboo: ["ejercicio", "pesas", "músculo", "sudar"] },
  { word: "Siesta", taboo: ["dormir", "cama", "tarde", "descanso"] },

  // ── Acciones y Situaciones ──
  { word: "Ghosteo", taboo: ["ignorar", "mensaje", "desaparecer", "WhatsApp"] },
  { word: "Crush", taboo: ["gustar", "secreto", "persona", "amor"] },
  { word: "Empanada mental", taboo: ["confuso", "pensar", "lío", "cabeza"] },
  { word: "Madrugón", taboo: ["despertar", "temprano", "mañana", "alarma"] },
  { word: "Cita a ciegas", taboo: ["desconocido", "quedar", "primera vez", "nervios"] },
  { word: "Boda", taboo: ["casarse", "anillo", "iglesia", "vestido"] },
  { word: "Road trip", taboo: ["coche", "viaje", "carretera", "conducir"] },
  { word: "Festival", taboo: ["música", "escenario", "verano", "entrada"] },

  // ── Deportes ──
  { word: "Penalti", taboo: ["fútbol", "portero", "falta", "punto"] },
  { word: "Maratón", taboo: ["correr", "kilómetros", "carrera", "42"] },
  { word: "Surf", taboo: ["ola", "tabla", "playa", "agua"] },

  // ── Extras divertidos ──
  { word: "Suegra", taboo: ["madre", "pareja", "familia", "política"] },
  { word: "Lunes", taboo: ["semana", "trabajo", "odio", "día"] },
  { word: "Ex", taboo: ["pareja", "anterior", "relación", "romper"] },
  { word: "WiFi", taboo: ["internet", "contraseña", "conexión", "router"] },
  { word: "Pijama", taboo: ["dormir", "ropa", "noche", "cama"] },
  { word: "Cumpleaños", taboo: ["fiesta", "vela", "tarta", "regalo"] },
  { word: "Examen", taboo: ["estudiar", "nota", "profesor", "aprobar"] },
  { word: "Jefe", taboo: ["trabajo", "mandar", "oficina", "sueldo"] },
];

// Shuffle utility
export function shuffleCards(cards: TabuCard[]): TabuCard[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
