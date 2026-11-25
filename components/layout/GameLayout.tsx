import { BreadcrumbJsonLd, GameJsonLd } from "@/components/seo/JsonLd";
import AlcoholDisclaimer from "@/components/ui/AlcoholDisclaimer";

const BASE = "https://bebergames.com";

// Map of game id -> display name (for breadcrumb)
const GAME_NAMES: Record<string, string> = {
  "yo-nunca": "Yo Nunca",
  "verdad-o-reto": "Verdad o Reto",
  "triman": "Triman",
  "la-ruleta": "La Ruleta",
  "quien-es-mas-probable": "Quién Es Más Probable",
  "ring-of-fire": "Ring of Fire",
  "yo-prefiero": "Yo Prefiero",
  "medusa": "Medusa",
  "rey-de-la-copa": "El Rey de la Copa",
  "la-bomba": "La Bomba",
  "tabu": "Tabú Borracho",
  "beer-pong": "Beer Pong",
  "la-piramide": "La Pirámide",
};

const GAME_DESCRIPTIONS: Record<string, string> = {
  "yo-nunca": "Di algo que nunca hayas hecho. Quien quiera responder puede bajar un dedo. También podéis pasar sin dar explicaciones.",
  "verdad-o-reto": "Elige entre responder una pregunta o probar un reto. Puedes pasar cualquier tarjeta sin penalización.",
  "triman": "Tira el dado virtual y descubre a quién le toca proponer un gesto.",
  "la-ruleta": "Gira la ruleta y descubre tu reto. Puedes pasar en cualquier turno.",
  "quien-es-mas-probable": "Lee la tarjeta, cuenta hasta 3 y señalad a la vez al más probable. Quien reciba más votos puede comentar o pasar.",
  "ring-of-fire": "Roba cartas, pasa la ola y cuenta los reyes. El cuarto cierra la partida.",
  "yo-prefiero": "¿A o B? Comparad los votos en la mesa. Hay 60 dilemas repartidos por intensidad.",
  "medusa": "A la señal, levantad la vista. Si dos miradas coinciden, decid ¡Medusa! y quedaos de piedra.",
  "rey-de-la-copa": "Roba cartas y descubre sus reglas. Al cuarto rey se aparta la copa.",
  "la-bomba": "Temporizador secreto. Pasa el móvil antes de que explote. Quien la tenga abre la siguiente ronda.",
  "tabu": "Da pistas a tu equipo durante un minuto. Cada acierto suma un punto y una palabra prohibida descarta la tarjeta.",
  "beer-pong": "El árbitro digital para tu partida de Beer Pong. Marca vasos, gestiona turnos y reglas especiales.",
  "la-piramide": "Memoriza tus cartas, farolea y asigna puntos. El juego de cartas para beber donde el farol es la clave.",
};

interface Props {
  gameId: string;
  children: React.ReactNode;
}

export default function GameLayout({ gameId, children }: Props) {
  const name = GAME_NAMES[gameId] ?? gameId;
  const description = GAME_DESCRIPTIONS[gameId] ?? "";
  const url = `${BASE}/juegos/${gameId}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE },
          { name: "Juegos para Beber", url: `${BASE}/juegos` },
          { name: name, url },
        ]}
      />
      <GameJsonLd name={name} description={description} url={url} />
      {children}
      <AlcoholDisclaimer />
    </>
  );
}
