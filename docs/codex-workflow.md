# Guía operativa de Codex para BeberGames

Esta es una **guía operativa del proyecto**, no documentación oficial de OpenAI. Recoge el criterio actual del equipo para equilibrar calidad y consumo de cuota. Los nombres, la disponibilidad y las capacidades de los modelos pueden cambiar con el tiempo; revisa las opciones disponibles antes de elegir.

## Selección de modelo

| Modelo y esfuerzo | Uso preferido |
| --- | --- |
| **GPT-6 Astra · Medium** | Investigación estratégica importante, investigación SEO, análisis competitivo, problemas ambiguos, investigaciones difíciles de causa raíz, decisiones de arquitectura importantes y definición de nuevas fases cuando aún no está claro qué construir. No usar Astra por defecto en tareas mecánicas. |
| **GPT-5.6 Sol · Medium** | Implementación de funcionalidades con alcance definido, cambios normales de código, refactors controlados, tests, revisiones técnicas y trabajo de dificultad media. |
| **GPT-5.6 Sol · Low/Medium** | Git, documentación, comprobaciones de solo lectura, cambios triviales y tareas mecánicas. Elegir Low cuando baste; subir a Medium si la tarea lo requiere. |
| **GPT-6 Astra · High** | Reservar únicamente para problemas excepcionalmente difíciles cuando Medium no sea suficiente. |

**Fast mode:** OFF por defecto, salvo que exista una necesidad explícita de velocidad.

## Estrategia de cuota y créditos

Estas pautas son una **heurística interna**, no límites oficiales del producto:

- No gastar modelos caros en `git status`, commits, pushes, documentación sencilla o verificaciones mecánicas.
- Usar el modelo más capaz cuando la decisión inicial tenga mucho impacto. Una vez definido el alcance, pasar a Sol para implementar.
- Evitar prompts gigantes si `AGENTS.md` y `docs/` ya contienen el contexto. Indicar qué documentos leer en vez de repetir toda la historia del proyecto.
- Preferir conclusiones accionables a informes enormes cuando sean suficientes.
- Mantener Fast mode OFF por defecto.
- Si queda menos de aproximadamente un 30 % en la ventana de 5 horas, evitar iniciar una investigación grande salvo urgencia.
- Si el límite semanal está bajo, reservar Astra para tareas donde aporte más valor.

No registrar aquí porcentajes actuales, horas de reinicio ni cuotas temporales concretas.

## Eficiencia de los prompts

Los futuros prompts deberían:

- Pedir que se lea primero `AGENTS.md` y después solo la documentación relevante.
- Reutilizar el estado ya documentado del proyecto sin repetir cientos de líneas de contexto conocido.
- Especificar objetivo, restricciones y entrega de forma compacta.
- Evitar repetir suites costosas sin una necesidad concreta.
- Separar investigación, implementación, validación y Git cuando ayude a controlar consumo y riesgo.

## Flujo de trabajo del proyecto

1. Investigación y definición.
2. Implementación.
3. Validación.
4. Integración y Git.
5. QA de producción.
6. Cierre de documentación.

Para una fase nueva con alcance ambiguo, no empezar por la implementación. Primero analizar datos, definir la oportunidad, cerrar el alcance y fijar criterios de aceptación. Después implementar.
