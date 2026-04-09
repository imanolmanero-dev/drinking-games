import Link from "next/link";
import { WebSiteJsonLd, GameJsonLd } from "@/components/seo/JsonLd";
import {
  Wine,
  Users,
  Sparkles,
  Dice3,
  ArrowRight,
  PartyPopper,
  Hand,
  Flame,
  LayoutGrid,
  BookOpen,
  Scale,
  Eye,
} from "lucide-react";
import { getAllPosts } from "@/lib/blog";

const juegos = [
  {
    id: "yo-nunca",
    nombre: "Yo Nunca",
    descripcion:
      "Di algo que nunca hayas hecho. Los que sí lo hayan hecho… ¡beben!",
    icono: Wine,
    color: "from-purple-500 to-pink-500",
    shadowColor: "shadow-purple-500/20",
    jugadores: "2+",
    estado: "disponible" as const,
  },
  {
    id: "verdad-o-reto",
    nombre: "Verdad o Reto",
    descripcion:
      "Elige verdad o reto. Si no cumples… ¡fondo blanco!",
    icono: Sparkles,
    color: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/20",
    jugadores: "3+",
    estado: "disponible" as const,
  },
  {
    id: "triman",
    nombre: "Triman",
    descripcion:
      "El Señor del 3. Lanza el dado y descubre quién bebe según las reglas.",
    icono: Dice3,
    color: "from-emerald-500 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
    jugadores: "3+",
    estado: "disponible" as const,
  },
  {
    id: "la-ruleta",
    nombre: "La Ruleta",
    descripcion:
      "Gira la ruleta y cumple el castigo que te toque. Sin excusas.",
    icono: PartyPopper,
    color: "from-rose-500 to-pink-500",
    shadowColor: "shadow-rose-500/20",
    jugadores: "2+",
    estado: "disponible" as const,
  },
  {
    id: "quien-es-mas-probable",
    nombre: "Quién Es Más Probable",
    descripcion:
      "Lee la tarjeta, cuenta hasta 3 y señalad a la vez. ¡El más votado bebe!",
    icono: Hand,
    color: "from-cyan-500 to-blue-500",
    shadowColor: "shadow-cyan-500/20",
    jugadores: "3+",
    estado: "disponible" as const,
  },
  {
    id: "ring-of-fire",
    nombre: "Ring of Fire",
    descripcion:
      "Roba cartas y cumple sus reglas. ¡El que saque el cuarto Rey se bebe la mezcla central!",
    icono: Flame,
    color: "from-red-500 to-rose-600",
    shadowColor: "shadow-red-500/20",
    jugadores: "2+",
    estado: "disponible" as const,
  },
  {
    id: "yo-prefiero",
    nombre: "Yo Prefiero",
    descripcion:
      "A o B, sin excusas. El grupo elige su opción y la minoría bebe. ¡Más de 60 dilemas!",
    icono: Scale,
    color: "from-violet-500 to-fuchsia-500",
    shadowColor: "shadow-violet-500/20",
    jugadores: "3+",
    estado: "disponible" as const,
  },
  {
    id: "medusa",
    nombre: "Medusa",
    descripcion:
      "Todos miran abajo. A la de 3, mira a alguien. Si os cruzáis la mirada… ¡MEDUSA! A beber.",
    icono: Eye,
    color: "from-lime-500 to-green-600",
    shadowColor: "shadow-lime-500/20",
    jugadores: "4+",
    estado: "disponible" as const,
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <WebSiteJsonLd />
      {juegos.map((juego) => (
        <GameJsonLd
          key={juego.id}
          name={juego.nombre}
          description={juego.descripcion}
          url={`https://bebergames.com/juegos/${juego.id}`}
        />
      ))}
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        {/* Gradient orb background */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted">
            <PartyPopper className="h-4 w-4 text-accent" />
            La fiesta empieza aquí
          </div>

          {/* Title */}
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Juegos para{" "}
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              beber
            </span>{" "}
            con amigos
          </h1>

          {/* Subtitle */}
          <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Elige un juego, reúne a tus amigos y prepara las copas.
            Diversión y risas garantizadas. 🍻
          </p>

          {/* CTA */}
          <Link
            href="#juegos"
            className="mt-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-glow transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent-glow"
          >
            Explorar juegos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Games Grid */}
      <section id="juegos" className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
            <Users className="h-4 w-4" />
            Juegos disponibles
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {juegos.map((juego) => {
            const Icon = juego.icono;
            const disponible = juego.estado === "disponible";

            const cardContent = (
              <div
                className={`group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 ${
                  disponible
                    ? "cursor-pointer hover:border-accent/30 hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1 " +
                      juego.shadowColor
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${juego.color} shadow-lg ${juego.shadowColor}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{juego.nombre}</h3>
                    {!disponible && (
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                        Próximamente
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {juego.descripcion}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <Users className="h-3.5 w-3.5" />
                    {juego.jugadores} jugadores
                  </span>
                  {disponible && (
                    <span className="flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-1">
                      Jugar
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );

            return disponible ? (
              <Link
                key={juego.id}
                href={`/juegos/${juego.id}`}
                className="outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
              >
                {cardContent}
              </Link>
            ) : (
              <div key={juego.id}>{cardContent}</div>
            );
          })}
        </div>
      </section>

      {/* Categories SEO Grid */}
      <section className="bg-surface border-t border-border mt-auto w-full py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
              <LayoutGrid className="h-4 w-4" />
              Explorar por categorías
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/juegos/categorias/preguntas"
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all hover:border-purple-500/30 hover:bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Juegos de Preguntas</h3>
                <p className="text-xs text-muted">Secretos y verdades</p>
              </div>
            </Link>
            <Link
              href="/juegos/categorias/cartas"
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all hover:border-red-500/30 hover:bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Juegos de Cartas</h3>
                <p className="text-xs text-muted">Con baraja de póker</p>
              </div>
            </Link>
            <Link
              href="/juegos/categorias/dados"
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all hover:border-emerald-500/30 hover:bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Dice3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Juegos de Dados</h3>
                <p className="text-xs text-muted">Para dejar al azar</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-background w-full py-16 pb-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
              <BookOpen className="h-4 w-4" />
              Últimos artículos
            </h2>
            <Link href="/blog" className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors">
              Ver todos &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {getAllPosts().slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-base font-bold group-hover:text-accent transition-colors line-clamp-2">
                    {post.metadata.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2">
                    {post.metadata.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
