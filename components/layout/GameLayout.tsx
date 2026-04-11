import { BreadcrumbJsonLd, GameJsonLd } from "@/components/seo/JsonLd";

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
};

const GAME_DESCRIPTIONS: Record<string, string> = {
  "yo-nunca": "Juego de confesiones en grupo. Di algo que nunca hayas hecho y los que sí lo hayan hecho beben.",
  "verdad-o-reto": "Elige entre responder una verdad comprometida o cumplir un reto. Si no cumples, bebes.",
  "triman": "Tira el dado virtual y que el destino decida quién bebe y cuánto.",
  "la-ruleta": "Gira la ruleta y cumple el castigo que te toque. Sin excusas.",
  "quien-es-mas-probable": "Lee la tarjeta, cuenta hasta 3 y señalad a la vez al más probable. El más votado bebe.",
  "ring-of-fire": "Roba cartas y cumple sus reglas. El que saque el cuarto Rey bebe la mezcla central.",
  "yo-prefiero": "A o B, sin excusas. El grupo elige su opción y la minoría bebe. Más de 60 dilemas.",
  "medusa": "Todos miran abajo. A la de 3, mira a alguien. Si os cruzáis la mirada… ¡MEDUSA! A beber.",
  "rey-de-la-copa": "Roba cartas y cumple sus reglas. El que saque el 4º Rey bebe la copa entera.",
  "la-bomba": "Temporizador secreto. Pasa el móvil antes de que explote. El que la tenga cuando explote bebe.",
  "tabu": "Describe la palabra sin decir las prohibidas. Si dices una tabú, todo tu equipo bebe.",
  "beer-pong": "El árbitro digital para tu partida de Beer Pong. Marca vasos, gestiona turnos y reglas especiales.",
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
    </>
  );
}
