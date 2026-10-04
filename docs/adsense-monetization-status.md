# Estado de monetización AdSense — 2026-09-23

Este documento registra el estado comunicado por el propietario del proyecto antes de Phase 6. Los ajustes, exclusiones, experimentos y métricas del panel de Google AdSense son **externos**: Git no permite verificar su estado actual y deben comprobarse de nuevo en AdSense antes de tomar decisiones. No se ha cambiado ninguna configuración para redactarlo.

En el repositorio sí constan el script de AdSense en el root español, `public/ads.txt` y el bloque manual de `/juegos/verdad-o-reto`. El root inglés permanece aislado de los anuncios. Este documento no verifica el estado externo de la CMP ni autoriza monetizar las páginas EN.

## Auto Ads y exclusiones

Configuración comunicada para Auto Ads:

| Formato | Estado comunicado |
|---|---|
| Auto Ads | Enabled |
| In-page | Enabled |
| Multiplex | Enabled |
| Anchor | Disabled como configuración deseada; confirmar el estado externo del experimento antes de cambios futuros |
| Side rail | Disabled |
| Vignette | Enabled como prueba nueva |

Exclusiones de **Auto Ads** comunicadas para páginas individuales:

```text
/contacto
/juegos/beer-pong
/juegos/la-bomba
/juegos/la-piramide
/juegos/la-ruleta
/juegos/medusa
/juegos/quien-es-mas-probable
/juegos/rey-de-la-copa
/juegos/ring-of-fire
/juegos/tabu
/juegos/triman
/juegos/verdad-o-reto
/juegos/yo-nunca
/juegos/yo-prefiero
```

Sección excluida: `/legal`.

Estas exclusiones protegen los juegos interactivos principales de formatos automáticos, incluidas las viñetas. **No equivalen a excluir bloques manuales**: el piloto manual de Verdad o Reto es independiente.

## Dos pruebas distintas

### A. Bloque manual de Verdad o Reto

- Página: `/juegos/verdad-o-reto` (excluida de Auto Ads).
- Nombre del slot comunicado desde AdSense: `BG_TEST_VERDAD_RETO_SETUP_01`. El repositorio contiene el bloque manual en la pantalla de preparación del juego; el nombre externo no se verifica desde Git.
- Objetivo: medir un placement manual controlado dentro del juego.
- Últimas métricas comunicadas, periodo visible **16–22 de septiembre de 2026**: 627 impresiones, 5 clics, ingresos estimados de €0.13, impression RPM de €0.20 y Active View viewability de 8.02 %.

El volumen aún es pequeño para sacar conclusiones definitivas y los ingresos absolutos son reducidos. Active View de 8.02 % es bajo y merece seguimiento, sin atribuirle una causa. Mantener el piloto para acumular más muestra; estos datos no justifican extender el placement a otros juegos todavía.

### B. Prueba de viñetas de Auto Ads

- Inicio comunicado: **2026-09-23**.
- Vignette ads: **ON**; frecuencia: **10 minutos**.
- Additional vignette triggers: **ON**.
- Vignette ads on screens wider than 1000 px: **OFF**.
- Alcance: solo páginas no excluidas de Auto Ads; no introducir viñetas mediante esta prueba en los juegos excluidos.
- Objetivo: evaluar si aumentan los ingresos sin perjudicar significativamente la experiencia de usuario.

La prueba acaba de empezar: todavía no hay resultados económicos que documentar. Sus resultados no deben mezclarse con los del bloque manual.

## Experimento de Anchor Ads

Google AdSense had an automatic Anchor Ads experiment running when last reviewed. Its current external status should be confirmed in AdSense before future monetization changes.

## Next monetization review

Revisar tras acumular varios días adicionales de tráfico, sin fijar aún una fecha automática ni modificar configuraciones automáticamente. Recopilar por separado:

| Prueba | Métricas y señales para revisar |
|---|---|
| Vignette | Ingresos estimados, impresiones, RPM, comportamiento de tráfico/sesiones si está disponible y quejas o problemas de UX. |
| Manual Verdad o Reto | Impresiones, clics, impression RPM, Active View e ingresos estimados. |

Comparar con el baseline previo cuando sea posible. Confirmar también en AdSense el estado actual de formatos, exclusiones y experimentos antes de decidir cualquier cambio.

## Reglas operativas actuales

### Coordinación técnica de carga — 2026-10-04

El root español es el único propietario del script de AdSense. Usa `next/script` con ID `spanish-adsense` y `lazyOnload`: el componente se monta, espera `load` si aún no ocurrió y programa la carga en idle. No se emite un script publicitario ejecutable en el HTML estático. Esto evita la carrera confirmada en el blog actual, donde Auto Ads insertaba un bloque entre el encabezado y la prosa antes de hidratar. No cambia el publisher, slots, CMP ni ajustes remotos.

El slot manual conserva su cola previa a la llegada del script. La CMP sigue siendo la de Google; no se añade otra UI ni se cambia el consentimiento. La carga más tardía también retrasa su inicialización. EN no importa este loader.

La prueba determinista se ejecuta **solo mediante Playwright MCP**: `browser_run_code_unsafe` con `filename: "tests/browser/adsense-hydration.mjs"`, sirviendo `out` en `http://127.0.0.1:4173`. Retrasa los scripts Next un segundo y responde inmediatamente con un mock que inserta el mismo bloque. El control negativo añade la etiqueta nativa anterior a la respuesta HTML y debe producir #418; la versión corregida debe tener el párrafo hidratado antes de insertar, un único loader y cero errores en cuatro artículos a 390/1440 px, incluido refresco. El control negativo conserva el loader nuevo, pero verifica la **primera** ejecución/inserción de la etiqueta nativa; la segunda ejecución no se usa para probar la carrera.

`lazyOnload` no se trata como una garantía universal para futuras fronteras de hidratación: cambios de Suspense, streaming o carga diferida requieren repetir la prueba. La QA con recursos reales de Google puede servir el export local mediante interceptación del origen de producción, sin publicar nada. Verificar CMP nueva/guardada y slot procesado; no exigir una impresión concreta.

- No activar Anchor Ads de forma permanente ni Side rail sin revisión.
- No reducir la frecuencia de Vignette por debajo de 10 minutos sin datos.
- No eliminar las exclusiones de Auto Ads de los juegos sin análisis.
- No extender el bloque manual de Verdad o Reto a otros juegos antes de revisar sus métricas.
- No confundir exclusiones de Auto Ads con bloques manuales.
- Tratar todo estado del panel de AdSense como externo y volver a verificarlo antes de futuras decisiones.
