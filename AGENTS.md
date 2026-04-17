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

# H1 (igual o similar al title)

Introducción (2-3 párrafos)

---

## H2 Sección (con emoji opcional)

Contenido...

---

## 🎮 CTA Final con links internos
```

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
- Anteriormente rechazado por "Low Value Content"

### Obligaciones SEO:
- Cada página debe tener `title` y `meta description` únicos
- Estructura de headings: un solo `<h1>` por página, jerarquía H2→H3
- HTML semántico obligatorio
- Todos los elementos interactivos deben tener IDs únicos
- Páginas legales (privacidad, cookies, aviso legal) NO se tocan sin aprobación
- Página `/sobre-nosotros` es CRÍTICA para E-E-A-T — mantener actualizada

### Prohibiciones:
- ❌ NO eliminar páginas existentes sin aprobación (afecta indexación)
- ❌ NO cambiar URLs/slugs de posts ya indexados
- ❌ NO modificar el schema JSON-LD sin entender el impacto
- ❌ NO deployar contenido incompleto o placeholder a producción

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

---

## 📋 Historial de Incidentes

| Fecha | Incidente | Archivos afectados | Resolución |
|---|---|---|---|
| 2026-04-15 | Stuttering en MDX por generación de listas largas | 4 archivos blog | Reescritura completa con bloques de ≤15 ítems |
| 2026-04-17 | `verdad-o-reto` prometía 80 ítems pero tenía 70 | `verdad-o-reto-preguntas-buenas.mdx` | Añadidos 10 ítems faltantes |
