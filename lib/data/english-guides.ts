import { getPublishedRoute, type RouteId } from "@/lib/i18n/routes";

const entries: { id: RouteId; title: string; situation: string; label: string; description: string; seasonal: boolean }[] = [
  { id: "drinking-games-for-two", title: "Drinking Games for 2", situation: "Only two people", label: "2 players", description: "Find turns and endings adapted for a pair, from conversation games to simple challenges.", seasonal: false },
  { id: "drinking-games-without-cards", title: "Drinking Games Without Cards", situation: "No deck available", label: "No deck", description: "Use manual games with little or no equipment. Check each entry for its setup and round ending.", seasonal: false },
  { id: "choose-drinking-game", title: "How to Choose a Drinking Game", situation: "Not sure what the group will enjoy", label: "Group fit", description: "Compare shared responses, individual turns and less personal formats by comfort, attention and room setup.", seasonal: false },
  { id: "halloween", title: "Halloween Drinking Games", situation: "Planning a Halloween party", label: "Seasonal", description: "Choose Halloween party ideas and table variations for a themed gathering.", seasonal: true },
];

export const englishGuides = entries.filter(entry => getPublishedRoute(entry.id, "en-US"));
