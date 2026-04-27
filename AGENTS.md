<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# BeberGames — Reglas del Proyecto para Agentes IA

Este documento es OBLIGATORIO para cualquier agente IA que trabaje en este repositorio.
Léelo COMPLETO antes de escribir una sola línea de código o contenido.

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

### Convenciones de archivos:
```
app/                    → Rutas (App Router)
  juegos/[slug]/        → Páginas de juego
  juegos/[slug]/reglas/ → Páginas de reglas (SEO)
  blog/[slug]/          → Posts del blog (dinámico)
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

**CONTEXTO:** En abril de 2026 se descubrió que varios posts del blog tenían prosa extremadamente artificial e inflada, con frases ininteligibles que Google podría clasificar como contenido de baja calidad generado por IA. Esto contribuyó al rechazo de AdSense.

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
