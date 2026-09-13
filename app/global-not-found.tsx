import type { Metadata, ResolvingMetadata } from "next";
import SpanishRootLayout, {
  generateMetadata as generateSpanishMetadata,
} from "./(spanish)/layout";
import SpanishNotFound, {
  metadata as notFoundMetadata,
} from "./(spanish)/not-found";

export async function generateMetadata(
  props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    ...(await generateSpanishMetadata(props, parent)),
    ...notFoundMetadata,
    // Este documento no tiene un layout padre que aplique el template de título.
    title: { absolute: `${notFoundMetadata.title} | BeberGames` },
  };
}

// Fase 1: todos los errores conservan el documento español completo.
// El root inglés es independiente y no importa este shell.
export default function GlobalNotFound() {
  return (
    <SpanishRootLayout>
      <SpanishNotFound />
    </SpanishRootLayout>
  );
}
