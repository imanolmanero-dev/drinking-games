<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# BeberGames — Reglas del Proyecto para Agentes IA

Este documento es OBLIGATORIO para cualquier agente IA que trabaje en este repositorio.
Léelo COMPLETO antes de escribir una sola línea de código o contenido.

Para selección de modelo, eficiencia de prompts y estrategia de uso de Codex, consultar `docs/codex-workflow.md`.

---

## 🔴 REGLA CRÍTICA #1: Anti-Stuttering en Contenido MDX

**CONTEXTO:** En abril de 2026 se produjo un incidente grave donde un modelo generó texto corrupto ("stuttering") en 4 archivos MDX del blog. El contenido spam resultante (bloques de palabras sin sentido repetidas cientos de veces) provocó el rechazo de Google AdSense por "Low Value Content" y puso en riesgo la indexación de todo el dominio.

### Obligaciones al generar/editar contenido MDX:

1. **NUNCA generar listas de más de 15 ítems en una sola operación de escritura.** Dividir en bloques de 10-15 ítems máximo.
2. **Después de cada bloque escrito, VERIFICAR visualmente** que no haya:
   - Palabras repetidas sin sentido
   - Frases incoherentes o sin estructura gramatical
   - Bloques de texto que parezcan aleatorios
3. **Si detectas repetición de palabras o incoherencia, PARA inmediatamente.** Borra el bloque corrupto y reescríbelo desde cero.
4. **Cada pregunta/ítem de lista debe ser una frase clara de 1-2 líneas máximo.** Sin adjetivos redundantes excesivos.
5. **Siempre verificar que el número total de ítems coincida con lo prometido en el título.** Si el título dice "80 preguntas", el archivo debe contener exactamente 80.

---

## 📝 REGLA #2: Estándares de Contenido MDX del Blog

### Estructura obligatoria de cada post:
```
---
title: "Título SEO (incluir keyword principal)"
excerpt: "Descripción de 1-2 frases para meta description"
date: "YYYY-MM-DD"
author: "BeberGames"
tags: ["tag1", "tag2", ...]
---

Introducción (2-3 párrafos)

---

## H2 Sección (con emoji opcional)

Contenido...

---

## 🎮 CTA Final con links internos
```

> ⚠️ **NO incluir `# H1` en el MDX.** El template `app/blog/[slug]/page.tsx` ya renderiza `<h1>{post.metadata.title}</h1>` automáticamente. Si pones `# Título` en el MDX, la página tendrá dos H1 idénticos, lo cual penaliza en SEO.

### Requisitos de calidad:
- **Idioma:** Español castellano informal pero correcto
- **Tono:** Divertido, cercano, como hablar con amigos en una previa
- **Extensión:** Mínimo 800 palabras, máximo 1500 por post
- **Links internos:** Incluir al menos 3 links a juegos de BeberGames donde sea natural
- **Autor:** Siempre "BeberGames" (nunca "Beber Games", "beber games", ni variantes)
- **Fechas:** Formato ISO `YYYY-MM-DD`

### Cosas PROHIBIDAS en contenido:
- ❌ Texto placeholder o lorem ipsum
- ❌ Contenido en inglés (todo debe ser en español)
- ❌ Copiar/pegar contenido de otros sitios
- ❌ Repetir la misma pregunta con diferentes palabras en la misma lista
- ❌ Ítems genéricos sin personalidad ("¿Cuál es tu color favorito?" en un post +18)

---

## 🏗️ REGLA #3: Arquitectura del Código

### Stack (NO cambiar sin aprobación explícita del usuario):
- Next.js 16 (App Router + Turbopack)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion para animaciones
- MDX con gray-matter + next-mdx-remote v6

### Infraestructura (Doble CDN Vercel + Cloudflare):
- **Hosting:** Vercel (Plan Hobby)
- **Proxy/Caché:** Cloudflare (Plan Free) con nube naranja activada (Proxied).
- **SSL:** Modo Full (strict) en Cloudflare.
- **Regla estricta:** Antes de sugerir cambios de DNS, caché o rutas dinámicas, tener en cuenta que Cloudflare está absorbiendo las peticiones estáticas antes de que lleguen a Vercel. NO desactivar la nube naranja ni cambiar los nameservers.

### Exportación estática a Cloudflare Pages:
- **Hosting previsto:** Cloudflare Pages mediante `output: "export"` en `next.config.ts`; Vercel se conserva como rollback.
- **Build y publicación:** ejecutar `npm run build` y publicar exclusivamente el directorio `out`.
- **Configuración de Pages:** las redirecciones viven en `public/_redirects` y los headers en `public/_headers`.
- **Rutas de metadata:** `app/robots.ts`, `app/sitemap.ts` y `app/opengraph-image.tsx` deben conservar `dynamic = "force-static"`.
- **Vercel Analytics:** mantener `@vercel/analytics` y renderizar `<Analytics />` solo cuando `process.env.VERCEL === "1"`.
- **Rollback técnico:** el stash `wip: OpenNext Workers migration` conserva la alternativa OpenNext. NO recuperarlo ni eliminarlo hasta verificar el dominio en producción sobre Cloudflare Pages.

### Convenciones de archivos:
```
app/                    → CSS, metadata global y global-not-found.tsx
  (spanish)/            → Root español y TODAS las rutas públicas actuales
    juegos/[slug]/      → Páginas de juego
    juegos/[slug]/reglas/ → Páginas de reglas (SEO)
    blog/[slug]/        → Posts del blog (exportados estáticamente)
  (english)/layout.tsx  → Root futuro en-US, sin páginas públicas en Fase 1
components/
  layout/               → Navbar, Footer, GameLayout
  seo/                  → JsonLd y schemas
  ui/                   → Componentes reutilizables
content/blog/           → Archivos .mdx del blog
lib/
  AppContext.tsx         → Estado global (sonido, vibración, jugadores)
  blog.ts               → Utilidades de lectura MDX
  data/                 → Datos estáticos de juegos (9 archivos)
```

### Roots por idioma (Fase 1):
- No crear `app/layout.tsx`: cada route group tiene su propio `<html>` y `<body>`. Los grupos no cambian las 70 URLs españolas ni añaden `/es` o `/en`.
- AdSense, AppProvider, Navbar/Footer y PWA permanecen en el root español. El root inglés solo importa el CSS común; no debe importar el shell español ni heredar sus anuncios o manifest. La prohibición de contenido inglés del blog sigue aplicándose a `content/blog/`; esta fase solo prepara un layout, sin publicar contenido inglés.
- `global-not-found.tsx` compone el root y el not-found españoles. `experimental.globalNotFound` es necesario en Next.js 16.2.12: sin él, el export usa el 404 por defecto y pierde la baseline española. Su título absoluto incluye la marca porque no tiene un layout padre que aplique el template.
- `icon.png`, `apple-icon.png`, `opengraph-image.tsx`, `robots.ts` y `sitemap.ts` permanecen en `app/`. El root español conserva mediante `generateMetadata` el descriptor y la query de la imagen global, aplicando `metadataBase`. No fijar `twitter.images`: debe seguir derivándose de la metadata final de cada página. Si no hay imagen heredada, omitir la propiedad `images` para permitir la convención de archivo del 404.
- Tras mover rutas, regenerar los tipos con `next typegen`. Si `.next/dev/types` conserva imports antiguos, retirar únicamente esos tipos generados. Verificar los 12 tests originales de exportación, los tests de roots y la auditoría sin cambiar fixtures.

### English foundation (Fase 2, fuera de main hasta añadir King's Cup)

- La Fase 2 amplía la preparación de Fase 1: `app/(english)/en/` contiene exactamente siete páginas: `/en`, `/en/games`, `/en/about`, `/en/contact`, `/en/legal/privacy`, `/en/legal/cookies`, `/en/legal/terms`. Los fixtures ES originales siguen inmutables; `tests/fixtures/en-routes.json` mantiene un contrato EN independiente.
- `lib/i18n/` define locales, IDs conceptuales, publicación por locale y metadata. Toda navegación, catálogo, sitemap EN y hreflang deben filtrar publicación. Reservar una ruta no la publica. Las equivalencias de futuros juegos requieren revisión editorial al publicarlos.
- El root EN usa navegación/footer propios y fuentes comunes. No importa AppProvider español, anuncios, analytics, CMP ni PWA. El selector de idioma solo se monta en EN en esta fase para conservar el contenido visible ES.
- `terms` y `legal-notice` son conceptos relacionados, no equivalentes. Solo home, games-hub, about, contact, privacy y cookies reciben hreflang recíproco `es`/`en-US`, sin `x-default`. Sus adiciones ES se documentan como `DELIBERATE SEO ADDITION`.
- El layout bajo `/en` permite heredar el descriptor de la imagen OG inglesa generada en build. Next añade un sufijo a las imágenes dentro de route groups: NO fijar `/en/opengraph-image` ni su hash. Usar la URL resuelta del padre, conservar descriptor/query, aplicar el dominio y verificar que el archivo exportado existe. Twitter deriva la imagen de la metadata final.
- El único 404 estático continúa siendo español, incluido su shell de anuncios/PWA; también puede responder a URLs EN inexistentes. No introducir runtime ni `/en/404` para resolverlo en esta fase.
- Privacidad, cookies y términos EN requieren revisión humana/legal antes de monetizar. No extrapolar configuración remota desde el repositorio. Revisar CMP y mensajes de estados de EE. UU. antes de añadir publicidad EN.

### King's Cup EN (Fase 3, todavía sin publicar)

- El contrato actual amplía la Fase 2 a 70 ES + 8 EN = 78 páginas públicas. La única ruta nueva es `/en/games/kings-cup`; no crear reglas, blog ni variantes EN como URLs separadas. Home y catálogo solo enlazan juegos publicados en el registry.
- `app/(english)/en/games/kings-cup/page.tsx` conserva metadata, reglas, tabla de 13 rangos y FAQ en HTML estático. `components/games/kings-cup/KingsCupGame.tsx` es la única entrada cliente EN autorizada en esta fase. Los tests de aislamiento siguen prohibiendo anuncios, CMP, PWA y AppProvider español.
- `lib/games/kings-cup.ts` comparte las reglas entre tabla y juego y define un reducer con etapas de robo, revelación y avance. Repetir un evento no debe consumir otra carta ni saltar turnos. El temporizador de revelación se cancela al salir de su etapa; pausar bloquea robos y avanzar, y terminar invalida revelaciones tardías.
- El cuarto Rey EN revela una despedida de grupo opcional y permite continuar hasta las 52 cartas. No importar reglas de consumo españolas. Los jugadores EN se identifican por número, sin nombres, persistencia, cookies, audio ni vibración.
- La revisión editorial mantiene `kings-cup` como `unpaired`: la adaptación EN cambia reglas centrales respecto a Rey de la Copa ES. No añadir hreflang entre ellos ni con Ring of Fire; el selector ofrece un enlace explícito a la home del otro idioma. Se conservan únicamente las seis parejas de Fase 2.
- `lib/games/shuffle.ts` extrae solo Fisher–Yates. `shuffleDeck(Carta[])` conserva su API, orden de llamadas a Math.random, copia de array y referencias de cartas. Antes de cambiar primitivas compartidas, ejecutar la caracterización contra `18837ef`; componentes, reglas, metadata y flujo de ambos juegos ES permanecen intactos.
- `GameJsonLd` permite locale opcional: por defecto mantiene exactamente ES/EUR; EN usa en-US/USD. La FAQ estructurada debe proceder de las mismas preguntas/respuestas que se muestran en la página.
- Esta fase sigue local, sin monetización. Requiere auditoría combinada de Fases 2 y 3 antes de push, merge o publicación.

### English visual parity (Fase 4, revisión local)

- La base EN v1 está publicada en `dbc8595`. Esta fase cambia únicamente presentación EN; conserva las 70 páginas ES, 8 EN, 78 URLs del sitemap, copy, metadata y lógica de King's Cup.
- `EnglishDesign.module.css` se importa solo en el root EN. Todos sus selectores deben quedar bajo `.root`, incluidos responsive y reduced motion. No trasladar overrides de prosa a `globals.css`: sus enlaces naranjas pertenecen también a ES.
- `EnglishArtwork.tsx` contiene únicamente SVG/CSS decorativo con `aria-hidden`, sin dependencias ni servicios. Los botones EN comparten clases `en-button` con variantes primary y danger; los controles principales mantienen al menos 48 px de alto.
- El mock de layouts en `tests/locale-root-layouts.test.mjs` debe resolver el export default de los CSS Modules además de los imports CSS sin valor. No eliminar las comprobaciones de aislamiento para adaptar un cambio visual.
- Comparar el HTML exportado con un build del HEAD inicial: metadata completa, headings, enlaces y contenido ES. Los hashes de assets y payloads de Next pueden variar entre builds; no equivalen por sí solos a cambios de contenido.
- El sitemap ES existente usa fechas de build en `lastModified` salvo en los posts. Al comparar exports, conservar la comprobación de URLs, prioridades, frecuencias y fechas editoriales; separar únicamente las fechas generadas por `new Date()`.

### English guide (Fase 5, implementación local)

- Phase 4 está cerrada y verificada en producción sobre `e707c88`. Phase 5 añade solo `/en/blog/drinking-games-for-2`: 70 ES + 9 EN, 79 URLs públicas y de sitemap. El concepto sigue siendo `drinking-games-for-two`, `kind: guide`, publicado EN y `unpaired`; no emparejarlo con los artículos ES de dos personas o parejas. El selector ofrece `/` y se conservan las seis parejas hreflang sin `x-default`.
- La guía es una ruta literal Server Component, independiente de MDX y `lib/blog.ts`. No crear `/en/blog`, slug alternativo, enlaces a guías futuras ni Blog en navbar/footer. Home y Games enlazan un bloque editorial breve, fuera del catálogo `game`. El sitemap ya deriva EN de `publishedRoutes`.
- `englishArticleMetadata` compone la herencia OG inglesa. La guía tiene un único `BlogPosting`, breadcrumb Home → artículo y FAQ visible sin `FAQPage`. No modificar `ArticleJsonLd` español ni fijar el path/hash OG.
- `lib/data/drinking-games-for-2-editorial.ts` centraliza la fecha editorial fija prevista para el lanzamiento, actualmente `2026-09-21`; el mismo valor alimenta la fecha visible, OpenGraph y `BlogPosting`. Phase 5 sigue local: esta fecha no confirma un despliegue en producción. No usar el reloj del build ni publicar `dateModified` sin una actualización editorial real. Reconfirmar la fecha inmediatamente antes del deploy; si el lanzamiento se retrasa, ajustarla mediante un commit dedicado y revisado.
- Mantener exactamente siete juegos, turnos y finales claros, alcohol opcional y pasar sin penalización. Revisar semánticamente el contenido además de las regex. Estilos solo bajo `.root` en el módulo EN, TOC de anchors nativos y ninguna nueva entrada cliente, persistencia, publicidad, CMP, PWA ni dependencia.
- Antes de entrega, ejecutar tests unitarios, typegen, TypeScript, build, tests de exportación y auditoría; comparar las 70 páginas ES con el export inicial (metadata, headings, enlaces, JSON-LD y texto). QA visual pendiente no equivale a PASS. Requiere auditoría separada antes de push.

### Truth or Dare EN (Fase 6, implementación local)

- Phase 6 añade solo `/en/games/truth-or-dare`: 70 ES + 10 EN = 80 páginas públicas y URLs de sitemap. `publishedRoutes` suministra el sitemap; no duplicar la ruta en `app/sitemap.ts`. El juego sigue `unpaired` respecto a Verdad o Reto ES; se conservan las seis parejas hreflang existentes.
- La ruta EN es Server Component con contenido estático y `GameJsonLd` en-US. `components/games/truth-or-dare/TruthOrDareGame.tsx` es la segunda entrada cliente EN, junto a King's Cup. `lib/games/truth-or-dare.ts` contiene transiciones puras y reutiliza `lib/games/shuffle.ts`; `lib/data/truth-or-dare-prompts.ts` contiene 30 Truth y 30 Dare originales.
- El juego EN usa 2–12 jugadores numerados, una pantalla y un modo. Cada conjunto se baraja por separado, no repite prompts antes de agotarse y deshabilita su elección al agotarse. Skip consume solo el prompt mostrado y avanza un turno; Finish y Restart son explícitos. No importar el juego ni los prompts ES, AppContext, almacenamiento, audio, vibración, anuncios, CMP, Analytics o PWA al grafo EN.
- Home, hub, King's Cup y la guía para dos enlazan el juego de forma contextual. La home orienta sobre BeberGames; el hub compara juegos; la ruta nueva responde a jugar online; la guía mantiene intención editorial. Estilos nuevos solo bajo `.root` en `EnglishDesign.module.css`. Phase 6 requiere auditoría independiente antes de push o integración.

### Reglas de código:

- **AudioContext:** Existe UN SOLO singleton en `lib/AppContext.tsx`. NUNCA crear instancias adicionales de AudioContext en otros componentes.
- **Sonido/Vibración:** Siempre usar `useApp().playSound()` y `useApp().vibrateDevice()`. NUNCA acceder directamente a Web Audio API desde componentes.
- **Brand name:** Siempre "BeberGames" (una palabra, camelCase). La única excepción es el array `alternateName` en `JsonLd.tsx` para SEO.
- **Sitemap:** El archivo `app/sitemap.ts` debe incluir TODAS las rutas públicas. Al añadir una nueva página, actualizar el sitemap.
- **Build:** Siempre ejecutar `npm run build` antes de dar por terminada una tarea. El build DEBE pasar sin errores.

---

## 🔍 REGLA #4: SEO y AdSense

### Contexto:
- Dominio: bebergames.com (hosting en Vercel)
- AdSense en proceso de aprobación — CADA CAMBIO impacta la revisión
- Anteriormente rechazado por "Low Value Content" (2 veces: abril 2026)

### Obligaciones SEO:
- Cada página debe tener `title` y `meta description` únicos
- Estructura de headings: un solo `<h1>` por página, jerarquía H2→H3
- HTML semántico obligatorio
- Todos los elementos interactivos deben tener IDs únicos
- Páginas legales (privacidad, cookies, aviso legal) NO se tocan sin aprobación
- Página `/sobre-nosotros` es CRÍTICA para E-E-A-T — mantener actualizada

### 🔴 Regla de títulos (CRÍTICA — causó bug en producción):
- El root `layout.tsx` tiene `template: "%s | BeberGames"`. Esto añade `" | BeberGames"` automáticamente al final de TODOS los títulos.
- **NUNCA incluir `"| BeberGames"` en el `title` de una página individual.** Si lo haces, el resultado será `"Título | BeberGames | BeberGames"` (marca duplicada).
- Correcto: `title: "Juegos para Beber Online — 12 Juegos Gratis"`
- Incorrecto: `title: "Juegos para Beber Online | BeberGames"`

### Regla de categorías:
- Cada página de categoría (`/juegos/categorias/*`) DEBE tener:
  1. `export const metadata: Metadata` con `title` y `description` únicos
  2. Un bloque de texto SEO visible (~200-300 palabras) debajo de la grid de juegos
  3. Links internos al blog y a los juegos de esa categoría
- Una categoría sin texto SEO es "thin content" para Google y perjudica AdSense.

### Regla anti-canibalización:
- Si existe tanto un post de blog (`/blog/reglas-de-X`) como una página de reglas (`/juegos/X/reglas`) para el mismo juego:
  - El post del blog debe cubrir: guía extensa, estrategias, variantes, contexto cultural
  - La página de reglas debe cubrir: cómo jugar paso a paso (resumen rápido)
  - El post del blog DEBE incluir un banner al inicio: `> 🎴 **¿Buscas las reglas rápidas?** → [Ver reglas paso a paso](/juegos/X/reglas)`

### 🔴 Alerta "Rastreada, actualmente sin indexar" en Search Console:
- Si Search Console marca páginas con este error, suele ser consecuencia directa de incumplir las **Reglas #1 (Stuttering)**, **#6 (Prosa Inflada)** o por tener "thin content". 
- La solución obligatoria es reescribir el contenido manteniendo un tono conversacional natural y directo, eliminando repeticiones algorítmicas y asegurando suficiente longitud de texto (~300 palabras mínimo).

### 🤖 Bucle de Optimización Automatizada:
- El proyecto cuenta con un sistema de extracción automática de datos desde la API de Search Console. 
- **OBLIGACIÓN:** Antes de proponer crear nuevos juegos, posts, o estrategias SEO, debes leer siempre el archivo `SEO_DATA.md` situado en la raíz del proyecto para basar tus decisiones en métricas reales recientes.
- Los periodos del reporting deben contener exactamente 7 fechas inclusivas, excluir el día actual y no solaparse. Para totales del sitio, usar consultas de Search Console sin dimensiones; nunca sumar un top dimensional ni calcular la posición global desde sus filas.
- Si el valor anterior de una métrica es 0, `percentDelta` debe ser `null`. No representar ese caso como `+100%`.
- El límite visible del dashboard y el límite de descarga de Search Console deben ser independientes. Alcanzar el límite visible no implica truncamiento del informe recuperado.
- En comparativas dimensionales, una identidad ausente solo equivale a cero si el informe anterior terminó por debajo del límite real de descarga. Si alcanzó ese límite, `previous`, `difference` y `percentDelta` deben quedar como desconocidos (`null`) y la fila debe marcarse explícitamente.
- `queryPages` es únicamente el dataset compacto de display. Los análisis por URL deben usar `queryPagesFull`, que conserva la unión determinista current + previous completa recuperada. Nunca limitar datos de análisis con `displayLimit`.
- `pageQueryCoverage` compara las filas query + page visibles con los totales del informe page. Una cobertura inferior al 100 % puede deberse a consultas anonimizadas por Search Console; nunca reconstruir ni inventar esas consultas.

### Regla de canonical URLs:
- Cada página DEBE tener un `alternates.canonical` que apunte a **su propia URL**, NO a otra página.
- **Bug real encontrado (julio 2026):** `/juegos` tenía `canonical: "https://bebergames.com"` en vez de `canonical: "https://bebergames.com/juegos"`, lo cual le decía a Google que era un duplicado de la homepage.
- Al crear o editar metadata, verificar siempre que el canonical coincide con la URL real de la página.

### Regla de separadores en títulos:
- Usar SIEMPRE `—` (em dash) como separador en títulos, NUNCA `|` (pipe).
- El template ya añade `| BeberGames` al final. Si el título usa `|` como separador interno, el resultado será `"Título | Cómo Jugar | BeberGames"` (doble pipe, aspecto poco profesional).
- Correcto: `title: "Reglas de X — Cómo Jugar"`
- Incorrecto: `title: "Reglas de X | Cómo Jugar"`

### Prohibiciones:
- ❌ NO eliminar páginas existentes sin aprobación (afecta indexación)
- ❌ NO cambiar URLs/slugs de posts ya indexados
- ❌ NO modificar el schema JSON-LD sin entender el impacto
- ❌ NO deployar contenido incompleto o placeholder a producción
- ❌ NO incluir `"| BeberGames"` en títulos de página (el template ya lo hace)

---

## ✅ REGLA #5: Checklist Obligatorio Pre-Entrega

Antes de considerar una tarea como completada, verificar TODOS estos puntos:

- [ ] `npm run build` pasa sin errores
- [ ] Si se editó contenido MDX: verificar que no hay stuttering ni texto corrupto
- [ ] Si se editó contenido MDX: verificar que el número de ítems coincide con el título
- [ ] Si se añadió una nueva página: verificar que está en `app/sitemap.ts`
- [ ] Si se tocó código de componentes: verificar que no hay errores de TypeScript
- [ ] Brand name consistente ("BeberGames")
- [ ] No se rompieron links internos existentes
- [ ] **Si se corrigió un bug o descubrió un patrón nuevo: actualizar AGENTS.md** (ver REGLA #7)

---

## ✍️ REGLA #6: Calidad de Prosa (Anti-Inflado)

**CONTEXTO:** En abril y junio de 2026 se descubrió que varios posts del blog tenían prosa extremadamente artificial e inflada, con frases ininteligibles que Google clasificó directamente como contenido de baja calidad o spam generado por IA. Esto causó rechazos de AdSense y que Google marcara múltiples URLs como "Rastreadas: actualmente sin indexar", negándose a mostrarlas en búsquedas. La prosa inflada es letal para el SEO de este proyecto.

### Obligaciones:
1. **Escribir en tono conversacional y directo.** Como si le explicaras algo a un amigo en una previa.
2. **Frases cortas y claras.** Máximo 2 líneas por frase. Si una frase necesita punto y coma, probablemente debería ser dos frases.
3. **Evitar adjetivos redundantes y encadenados.** ❌ "La sincronización rítmica del trabajo en equipo y el consumo festivo de alcohol" → ✅ "El trabajo en equipo y el alcohol"
4. **Los links internos deben tener anchor text natural y descriptivo.**
   - ❌ `[Afrontar Extremas Elecciones con "Yo Prefiero: 60 Dilemas Letales"](/juegos/yo-prefiero)`
   - ✅ `[Yo Prefiero](/juegos/yo-prefiero) — 60 dilemas donde la minoría bebe.`
5. **Las secciones CTA al final del post deben ser breves** — máximo 1 párrafo de intro + lista de 3-5 links con descripción de 1 línea cada uno.
6. **Después de escribir un párrafo, releerlo.** Si suena a discurso de graduación o a abogado, reescribirlo más sencillo.

### Señales de alerta (si ves esto en un texto, está mal):
- Frases de más de 3 líneas sin punto
- Más de 3 adjetivos seguidos
- Palabras como "inquebrantable", "irrevocable", "pernicioso", "egregio" en un blog de juegos para beber
- Anchor text de links que ocupa más de 10 palabras
- Párrafos que no tienen sentido si los lees en voz alta

---

## 🔄 REGLA #7: Protocolo de Auto-Actualización de este Documento

**Este archivo es un documento vivo.** Debe mantenerse siempre actualizado con las lecciones aprendidas de cada sesión de trabajo.

### Cuándo actualizar AGENTS.md (OBLIGATORIO):

1. **Al corregir un bug que se podría haber evitado con una regla.** Si arreglas algo y piensas "esto no debería haber pasado", añade una regla que lo prevenga.
2. **Al descubrir un patrón nuevo del codebase** que no está documentado (ej: un componente que tiene restricciones no obvias).
3. **Al añadir una nueva página, juego o funcionalidad** — actualizar la sección de Arquitectura si cambia la estructura de archivos.
4. **Al resolver un incidente** — siempre añadir una fila nueva a la tabla de Historial de Incidentes.

### Cómo actualizar:

- **Reglas nuevas:** Añadir en la sección que corresponda. Si no encaja en ninguna, crear una subsección nueva dentro de la regla más cercana.
- **Incidentes:** Añadir al final de la tabla con formato `| YYYY-MM-DD | Descripción breve | Archivos | Cómo se resolvió |`.
- **NO borrar reglas antiguas** aunque parezcan obvias — existen porque algún agente anterior cometió ese error exacto.

### Formato del commit:

Al actualizar este archivo, el mensaje del commit o la descripción del cambio debe empezar con `[AGENTS]` para que sea fácil de rastrear. Ejemplo: `[AGENTS] Añadida regla anti-duplicación de títulos`.

### Validación rápida:

Antes de dar por terminada CUALQUIER tarea, pregúntate:
> "¿He hecho algo hoy que un agente futuro podría hacer mal si no lo sabe?"

Si la respuesta es sí → actualiza este archivo.

---

## 📋 Historial de Incidentes

| Fecha | Incidente | Archivos afectados | Resolución |
|---|---|---|---|
| 2026-04-15 | Stuttering en MDX por generación de listas largas | 4 archivos blog | Reescritura completa con bloques de ≤15 ítems |
| 2026-04-17 | `verdad-o-reto` prometía 80 ítems pero tenía 70 | `verdad-o-reto-preguntas-buenas.mdx` | Añadidos 10 ítems faltantes |
| 2026-04-27 | Títulos duplicados `"\| BeberGames \| BeberGames"` en 6 páginas | juegos, sobre-nosotros, contacto, 3 legales | Eliminado `"\| BeberGames"` del title local; el template ya lo añade |
| 2026-04-27 | H1 duplicado en 18 posts del blog | 18 archivos `.mdx` | Eliminada línea `# H1` del MDX; el template `[slug]/page.tsx` ya renderiza el H1 |
| 2026-04-27 | Prosa corrupta/ininteligible en 3 posts del blog | `ring-of-fire-reglas-cartas`, `juegos-para-beber-sin-cartas`, `juegos-de-mesa-para-beber` | Reescritura completa de secciones corruptas con prosa natural |
| 2026-04-27 | 4 categorías con "thin content" (~30 palabras) | cartas, dados, preguntas, sin-materiales | Añadido metadata + bloque SEO (~250 palabras) con links internos |
| 2026-05-19 | Falso positivo de corrección: Títulos duplicados `"\| BeberGames"` persistían en 18 archivos `layout.tsx` | `app/juegos/*/layout.tsx`, `app/not-found.tsx`, `app/blog/page.tsx` | Eliminado de todos los archivos afectados; la regla original solo se aplicó a "6 páginas" en lugar de buscar globalmente. |
| 2026-06-11 | 7 páginas desindexadas por GSC ("Rastreada, sin indexar") por prosa inflada/stuttering | 6 posts del blog + la-bomba reglas | Reescritura completa con tono conversacional y expansión de thin content |
| 2026-06-28 | Error al extraer datos SEO en GitHub Actions (Premature close / fetch error con Node 24) | `.github/workflows/seo-automation.yml` | Cambiar la versión de Node de 24 a 20 LTS en el workflow, eliminar FORCE_JAVASCRIPT_ACTIONS_TO_NODE24 y usar tsx en lugar de ts-node para evitar el error de Unknown file extension |
| 2026-07-07 | Canonical URL de `/juegos` apuntaba a homepage (`bebergames.com` en vez de `bebergames.com/juegos`) | `app/juegos/page.tsx` | Corregido canonical a URL correcta. Añadida regla de canonical URLs a AGENTS.md |
| 2026-07-07 | 5 páginas de reglas usaban `\|` como separador en títulos (doble pipe con template) | 5× `app/juegos/*/reglas/page.tsx` | Cambiado `\|` por `—` en la-ruleta, QEMP, ring-of-fire, triman, verdad-o-reto. Añadida regla de separadores |
| 2026-07-07 | Auditoría masiva: 3 count mismatches, 2 posts con prosa inflada, 2 posts con <3 links, 5 posts con listas >15 ítems, 1 post con word count <800 | 15 archivos MDX del blog | Correcciones individuales por archivo. La-bomba mencionaba "Next.js" en contenido de usuario |
| 2026-07-08 | Exceso de cuota de Vercel (Edge Requests al 96% y Speed Insights al 290%) | `app/layout.tsx`, `app/opengraph-image.tsx`, `package.json` | Eliminado `@vercel/speed-insights` y eliminado `runtime="edge"` de opengraph-image para optimizar la cuota gratuita |
| 2026-07-26 | 9 posts del blog con emojis corruptos (`??`) en headers y CTAs — contenido visible para Googlebot como "Low Value Content" | 9 archivos MDX del blog (`como-organizar-fiesta`, `juegos-para-beber-con-cartas`, `juegos-para-beber-con-dados`, `juegos-para-beber-rapidos`, `juegos-para-cumpleanos-adultos`, `preguntas-quien-es-mas-probable`, `preguntas-yo-nunca-parejas`, `verdad-o-reto-preguntas-buenas`, `yo-nunca-preguntas-picantes-18`) | Reemplazados todos los `??` por emojis correctos según contexto. Verificación global con script Node. Total 0 `??` restantes |
| 2026-07-26 | Preparación para aprobación de Google AdSense: CookieBanner custom no cumplía IAB TCF v2.3, faltaba script AdSense, faltaban bots de AdSense en robots.ts, 2 posts bajo 800 palabras, legales sin links de opt-out | `app/layout.tsx`, `app/robots.ts`, `app/legal/privacidad/page.tsx`, `app/legal/cookies/page.tsx`, `components/layout/GameLayout.tsx`, `content/blog/rey-de-la-copa-reglas.mdx`, `content/blog/beer-pong-reglas-completas.mdx` | Eliminado CookieBanner custom; añadido script AdSense + meta tag; añadidos Mediapartners-Google y AdsBot-Google a robots.ts; creado componente AlcoholDisclaimer en todos los juegos; links de opt-out en privacidad y cookies; posts expandidos a >850 palabras |
| 2026-08-27 | Reporting SEO etiquetaba como 7 días rangos de 8 fechas, limitaba snapshots a 15 filas y carecía de totales globales y desgloses de mercado | `scripts/fetch-seo-data.ts`, `scripts/seo-reporting.mjs`, `seo-data.json`, `SEO_DATA.md` | Implementados periodos 7/7 sin solapamiento, schema v2, totales sin dimensiones, top 50, países, dispositivos, query + page, calidad de datos y pruebas deterministas |
| 2026-08-27 | Comparativas schema v2 convertían en cero las identidades ausentes del top anterior aunque el informe estuviera truncado | `scripts/seo-reporting.mjs`, `tests/seo-reporting.test.mjs`, `SEO_DATA.md` | Separados `displayLimit` y `fetchLimit`; previous desconocido se representa con `null` y canibalización analiza todas las filas recuperadas |
| 2026-09-04 | El artifact descartaba query + page fuera del top 50 aunque la API recuperaba miles de filas | `scripts/seo-reporting.mjs`, `scripts/fetch-seo-data.ts`, `tests/seo-reporting.test.mjs` | Schema v3 conserva la unión current + previous completa, añade cobertura por URL y mantiene separado el display compacto |
| 2026-09-13 | El primer build local EN exportó la imagen OG con un sufijo de route group que no coincidía con la URL fijada en metadata | `lib/i18n/metadata.ts`, `app/(english)/en/layout.tsx`, tests EN | Heredado el descriptor resuelto por Next, conservando sufijo/query y verificando la existencia del PNG exportado; corregido antes de publicar |
