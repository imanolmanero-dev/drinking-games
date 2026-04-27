import Link from "next/link";
import type { Metadata } from "next";
import {
  Wine,
  Sparkles,
  Dice3,
  Hand,
  Flame,
  Scale,
  Eye,
  Crown,
  Zap,
  MessageSquare,
  Trophy,
  PartyPopper,
  Users,
  ArrowRight,
  LayoutGrid,
  Zap as ZapIcon,
  BookOpen,
} from "lucide-react";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Juegos para Beber Online — 12 Juegos Gratis Sin Descargas",
  description:
    "Los mejores juegos para beber online, gratis y sin descargas. Yo Nunca, Verdad o Reto, Ring of Fire, Medusa, La Bomba, Tabú Borracho y más. Perfectos para previas, botellones y fiestas.",
  keywords: [
    "juegos para beber",
    "juegos de beber online",
    "juegos para beber gratis",
    "juegos para beber sin descargar",
    "juegos para beber en grupo",
    "juegos para previas",
    "juegos para botellón",
    "yo nunca juego",
    "verdad o reto",
    "ring of fire online",
    "medusa juego beber",
    "la bomba juego",
    "tabú borracho",
    "beer pong virtual",
  ],
  openGraph: {
    title: "12 Juegos para Beber Gratis Online — BeberGames",
    description:
      "Yo Nunca, Verdad o Reto, Ring of Fire, Medusa, La Bomba y más. Juega desde el móvil, sin descargas ni registro.",
    type: "website",
    url: "https://bebergames.com/juegos",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos",
  },
};

const juegos = [
  {
    id: "yo-nunca",
    nombre: "Yo Nunca",
    descripcion: "Di algo que nunca hayas hecho. Los que sí lo hayan hecho… ¡beben!",
    detalle: "El juego perfecto para conocerse mejor y sacar los trapos sucios del grupo. Funciona con 2 o más personas y tiene cientos de frases en 3 niveles de intensidad.",
    icono: Wine,
    color: "from-purple-500 to-pink-500",
    shadowColor: "shadow-purple-500/20",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    jugadores: "2+",
    intensidad: "🟢 Suave a 🔴 Picante",
    sinMaterial: true,
  },
  {
    id: "verdad-o-reto",
    nombre: "Verdad o Reto",
    descripcion: "Elige verdad o reto. Si no cumples… ¡fondo blanco!",
    detalle: "Preguntas comprometidas y retos atrevidos generados automáticamente. Elige el nivel de intensidad antes de empezar y la app lleva el control.",
    icono: Sparkles,
    color: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/20",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/10",
    jugadores: "3+",
    intensidad: "🟡 Normal a 🔴 Picante",
    sinMaterial: true,
  },
  {
    id: "quien-es-mas-probable",
    nombre: "Quién Es Más Probable",
    descripcion: "Lee la tarjeta, cuenta hasta 3 y señalad a la vez. ¡El más votado bebe!",
    detalle: "Saca a la luz lo que todo el grupo piensa pero nadie dice. '¿Quién es más probable que acabe bailando en la mesa?' A la de 3, todos señalan.",
    icono: Hand,
    color: "from-cyan-500 to-blue-500",
    shadowColor: "shadow-cyan-500/20",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    jugadores: "3+",
    intensidad: "🟡 Normal a 🔴 Picante",
    sinMaterial: true,
  },
  {
    id: "ring-of-fire",
    nombre: "Ring of Fire",
    descripcion: "Roba cartas y cumple sus reglas. ¡El que saque el cuarto Rey bebe la mezcla!",
    detalle: "El clásico juego de cartas para beber, ahora en formato digital. Cada carta tiene una regla diferente. 52 cartas, 13 reglas, infinitas posibilidades.",
    icono: Flame,
    color: "from-red-500 to-rose-600",
    shadowColor: "shadow-red-500/20",
    accentColor: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/10",
    jugadores: "3+",
    intensidad: "🟡 Normal",
    sinMaterial: false,
  },
  {
    id: "la-ruleta",
    nombre: "La Ruleta",
    descripcion: "Gira la ruleta y cumple el castigo que te toque. Sin excusas.",
    detalle: "Gira y obedece. La ruleta decide tu destino: bebe, cumple un reto o reta a otro jugador. Cada giro es una sorpresa.",
    icono: PartyPopper,
    color: "from-rose-500 to-pink-500",
    shadowColor: "shadow-rose-500/20",
    accentColor: "text-rose-400",
    borderColor: "border-rose-500/30",
    bgColor: "bg-rose-500/10",
    jugadores: "2+",
    intensidad: "🟢 Suave a 🟡 Normal",
    sinMaterial: true,
  },
  {
    id: "yo-prefiero",
    nombre: "Yo Prefiero",
    descripcion: "A o B, sin excusas. El grupo vota y la minoría bebe. ¡60+ dilemas!",
    detalle: "¿Preferirías vivir sin música o sin series? El grupo vota A o B simultáneamente. La minoría bebe. Los dilemas van de inocentes a imposibles.",
    icono: Scale,
    color: "from-violet-500 to-fuchsia-500",
    shadowColor: "shadow-violet-500/20",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/10",
    jugadores: "3+",
    intensidad: "🟢 Suave a 🔴 Picante",
    sinMaterial: true,
  },
  {
    id: "medusa",
    nombre: "Medusa",
    descripcion: "Todos miran abajo. A la de 3, mira a alguien. Si os cruzáis… ¡MEDUSA!",
    detalle: "El juego más rápido del mundo. Sin reglas complicadas: solo ojos, tensión y 3 segundos de cuenta atrás. Perfecto para cualquier momento de la noche.",
    icono: Eye,
    color: "from-lime-500 to-green-600",
    shadowColor: "shadow-lime-500/20",
    accentColor: "text-lime-400",
    borderColor: "border-lime-500/30",
    bgColor: "bg-lime-500/10",
    jugadores: "4+",
    intensidad: "🟢 Suave",
    sinMaterial: true,
  },
  {
    id: "rey-de-la-copa",
    nombre: "El Rey de la Copa",
    descripcion: "Roba cartas y cumple sus reglas. El 4º Rey bebe la copa entera.",
    detalle: "La variación española del Ring of Fire con sus propias reglas por carta. Baraja completa de 52 cartas en formato digital. Incluye reglas en español.",
    icono: Crown,
    color: "from-amber-400 to-yellow-500",
    shadowColor: "shadow-amber-400/20",
    accentColor: "text-amber-400",
    borderColor: "border-amber-400/30",
    bgColor: "bg-amber-400/10",
    jugadores: "3+",
    intensidad: "🟡 Normal",
    sinMaterial: false,
  },
  {
    id: "la-bomba",
    nombre: "La Bomba",
    descripcion: "Temporizador secreto. Pásala antes de que explote. ¡El que la tenga bebe!",
    detalle: "El móvil es la bomba. Nadie sabe cuándo explota. Pasadla de mano en mano hasta que el tiempo llegue a cero. Tensión pura en cada ronda.",
    icono: Zap,
    color: "from-orange-500 to-red-500",
    shadowColor: "shadow-orange-500/20",
    accentColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/10",
    jugadores: "3+",
    intensidad: "🟢 Suave a 🟡 Normal",
    sinMaterial: true,
  },
  {
    id: "triman",
    nombre: "Triman",
    descripcion: "Tira el dado y que el destino decida quién bebe y cuánto.",
    detalle: "El dado virtual más divertido. Cada cara tiene una regla diferente. Simple, rápido y perfecto para cuando no queréis pensar demasiado.",
    icono: Dice3,
    color: "from-teal-500 to-cyan-600",
    shadowColor: "shadow-teal-500/20",
    accentColor: "text-teal-400",
    borderColor: "border-teal-500/30",
    bgColor: "bg-teal-500/10",
    jugadores: "2+",
    intensidad: "🟢 Suave",
    sinMaterial: true,
  },
  {
    id: "tabu",
    nombre: "Tabú Borracho",
    descripcion: "Describe la palabra sin decir las prohibidas. Si fallas, tu equipo bebe.",
    detalle: "El juego de palabras por equipos más divertido. 65+ tarjetas, 2 equipos, 60 segundos por turno. Si dices una palabra tabú, todo tu equipo bebe.",
    icono: MessageSquare,
    color: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/20",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/10",
    jugadores: "4+",
    intensidad: "🟡 Normal",
    sinMaterial: true,
  },
  {
    id: "beer-pong",
    nombre: "Beer Pong",
    descripcion: "El árbitro digital para tu partida. Marca vasos, gestiona turnos y reglas.",
    detalle: "Controla tu partida de Beer Pong desde el móvil. Triángulos táctiles, Re-rack, Heating Up, desafíos especiales y marcador automático.",
    icono: Trophy,
    color: "from-amber-400 to-orange-500",
    shadowColor: "shadow-amber-400/20",
    accentColor: "text-amber-400",
    borderColor: "border-amber-400/30",
    bgColor: "bg-amber-400/10",
    jugadores: "4+",
    intensidad: "🟡 Normal",
    sinMaterial: false,
  },
];

const categorias = [
  {
    href: "/juegos/categorias/sin-materiales",
    label: "Sin Materiales",
    desc: "Solo el móvil",
    color: "text-lime-400",
    bg: "bg-lime-500/10",
    border: "border-lime-500/20",
    emoji: "📱",
  },
  {
    href: "/juegos/categorias/preguntas",
    label: "Preguntas",
    desc: "Verdades y secretos",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    emoji: "💬",
  },
  {
    href: "/juegos/categorias/cartas",
    label: "Cartas",
    desc: "Con baraja virtual",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    emoji: "🃏",
  },
  {
    href: "/juegos/categorias/dados",
    label: "Dados",
    desc: "El azar decide",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    emoji: "🎲",
  },
];

const faqs = [
  {
    q: "¿Qué juegos para beber hay disponibles en BeberGames?",
    a: "BeberGames tiene 12 juegos para beber gratuitos: Yo Nunca, Verdad o Reto, Quién Es Más Probable, Ring of Fire, La Ruleta, Yo Prefiero, Medusa, El Rey de la Copa, La Bomba, Triman, Tabú Borracho y Beer Pong Virtual. Todos funcionan desde el móvil sin descargar nada.",
  },
  {
    q: "¿Son gratis los juegos para beber de BeberGames?",
    a: "Sí, todos los juegos de BeberGames son completamente gratuitos. No necesitas registrarte, no necesitas descargar ninguna app y no hay anuncios que interrumpan el juego. Solo abre bebergames.com en el móvil y empieza a jugar.",
  },
  {
    q: "¿Cuáles son los mejores juegos para beber sin materiales?",
    a: "Los mejores juegos para beber sin materiales son Medusa, La Bomba, Yo Prefiero, Yo Nunca, Verdad o Reto y Quién Es Más Probable. Solo necesitáis un móvil y bebidas. Todos disponibles gratis en BeberGames.",
  },
  {
    q: "¿Cuántas personas se necesitan para jugar a juegos de beber?",
    a: "Depende del juego. Yo Nunca y La Ruleta funcionan desde 2 personas. Medusa, Verdad o Reto y La Bomba necesitan mínimo 3. Tabú Borracho y Beer Pong necesitan al menos 4 (para hacer 2 equipos). La mayoría son más divertidos con 5-10 personas.",
  },
  {
    q: "¿Se pueden jugar estos juegos sin alcohol?",
    a: "Sí, todos los juegos de BeberGames se pueden jugar con cualquier bebida: agua, refrescos, zumos o bebidas sin alcohol. La dinámica y diversión es exactamente la misma. BeberGames promueve el juego responsable.",
  },
];

export default function JuegosPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://bebergames.com" },
          { name: "Juegos para Beber", url: "https://bebergames.com/juegos" },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      {/* ── HERO ── */}
      <section className="px-4 pt-14 pb-10 sm:pt-20 sm:pb-14 text-center">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
            <ZapIcon className="h-3.5 w-3.5 text-accent" />
            12 juegos · Gratis · Sin descargas
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Juegos para{" "}
            <span className="bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent">
              Beber Online
            </span>
          </h1>
          <p className="text-base text-muted max-w-xl leading-relaxed sm:text-lg">
            La colección más completa de juegos para beber en español. Sin
            descargas, sin registro, sin anuncios a mitad del juego. Solo abre
            el móvil y empieza.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-accent" /> Para 2–20 personas
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-accent" /> Reglas explicadas
            </span>
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="h-4 w-4 text-accent" /> 4 categorías
            </span>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ── */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
            Explorar por tipo
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categorias.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`flex items-center gap-3 rounded-xl border ${cat.border} ${cat.bg} p-3 transition-all hover:brightness-110`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <p className={`text-xs font-bold ${cat.color}`}>{cat.label}</p>
                  <p className="text-[10px] text-muted">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAMES GRID ── */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
            Todos los juegos
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {juegos.map((juego) => {
              const Icon = juego.icono;
              return (
                <Link
                  key={juego.id}
                  href={`/juegos/${juego.id}`}
                  className={`group flex flex-col gap-4 rounded-2xl border ${juego.borderColor} bg-surface p-6 transition-all duration-300 hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1 ${juego.shadowColor}`}
                >
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${juego.color} shadow-lg ${juego.shadowColor}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {juego.sinMaterial && (
                      <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-2 py-0.5 text-[10px] font-bold text-lime-400">
                        📱 Sin materiales
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h2 className="text-lg font-bold leading-snug group-hover:text-accent transition-colors">
                      {juego.nombre}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed">
                      {juego.detalle}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Users className="h-3 w-3" />
                        {juego.jugadores} jugadores
                      </span>
                      <span className="text-[10px] text-muted">
                        {juego.intensidad}
                      </span>
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${juego.accentColor} transition-transform group-hover:translate-x-1`}
                    >
                      Jugar <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SEO TEXT BLOCK ── */}
      <section className="border-t border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-3xl flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-extrabold mb-4">
              Los mejores juegos para beber en grupo, gratis y online
            </h2>
            <div className="text-sm text-muted space-y-3 leading-relaxed">
              <p>
                BeberGames es la plataforma de juegos para beber más completa en
                español. Con <strong className="text-foreground">12 juegos interactivos</strong> que
                funcionan directamente desde el navegador del móvil, sin
                necesidad de descargar ninguna aplicación ni crear una cuenta.
              </p>
              <p>
                Desde el clásico{" "}
                <Link href="/juegos/yo-nunca" className="text-accent hover:underline">
                  Yo Nunca
                </Link>{" "}
                —el juego de confesiones por excelencia— hasta el intenso{" "}
                <Link href="/juegos/verdad-o-reto" className="text-accent hover:underline">
                  Verdad o Reto
                </Link>{" "}
                con preguntas generadas automáticamente, pasando por el tenso{" "}
                <Link href="/juegos/la-bomba" className="text-accent hover:underline">
                  La Bomba
                </Link>{" "}
                (temporizador secreto que nadie sabe cuándo explota) o el viral{" "}
                <Link href="/juegos/medusa" className="text-accent hover:underline">
                  Medusa
                </Link>{" "}
                (contacto visual = beber).
              </p>
              <p>
                Para los que prefieren juegos en equipo,{" "}
                <Link href="/juegos/tabu" className="text-accent hover:underline">
                  Tabú Borracho
                </Link>{" "}
                trae más de 65 tarjetas con palabras y tabús, y{" "}
                <Link href="/juegos/beer-pong" className="text-accent hover:underline">
                  Beer Pong Virtual
                </Link>{" "}
                actúa como árbitro digital para vuestras partidas.
              </p>
            </div>
          </div>

          {/* Mini comparison */}
          <div>
            <h2 className="text-xl font-extrabold mb-4">
              ¿Cuál es el mejor juego para beber según la situación?
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { titulo: "Para romper el hielo", juego: "Yo Prefiero", href: "/juegos/yo-prefiero", desc: "Dilemas sin presión, todo el mundo participa a la vez" },
                { titulo: "Para una previa pequeña", juego: "Yo Nunca", href: "/juegos/yo-nunca", desc: "Confesiones que generan conversación de forma natural" },
                { titulo: "Para grupos de 10+", juego: "Medusa", href: "/juegos/medusa", desc: "Todos juegan simultáneamente, sin turnos ni esperas" },
                { titulo: "Para más tensión", juego: "La Bomba", href: "/juegos/la-bomba", desc: "Nadie sabe cuándo explota. Tensión máxima en cada ronda" },
                { titulo: "Para amantes de cartas", juego: "Ring of Fire", href: "/juegos/ring-of-fire", desc: "El clásico de baraja en formato digital completo" },
                { titulo: "Para jugar en equipos", juego: "Tabú Borracho", href: "/juegos/tabu", desc: "Competición, risas y tragos por equipos" },
              ].map(({ titulo, juego, href, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col gap-1 rounded-xl border border-border bg-background p-4 transition-all hover:border-accent/30 hover:bg-surface"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{titulo}</p>
                  <p className="text-sm font-bold text-accent">{juego}</p>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ visible */}
          <div>
            <h2 className="text-xl font-extrabold mb-4">
              Preguntas frecuentes
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="rounded-xl border border-border bg-background p-5 flex flex-col gap-2">
                  <h3 className="text-sm font-bold">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
