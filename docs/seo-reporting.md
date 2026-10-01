# Fiabilidad del reporting de Search Console

El extractor `scripts/fetch-seo-data.ts` es el único propietario de
`SEO_DATA.md` y `seo-data.json`. No editar sus resultados manualmente.
La automatización semanal existente sigue siendo la encargada de ejecutarlo.

## Finalización y actividad son cosas distintas

Search Console interpreta las fechas en `America/Los_Angeles` y puede omitir
días sin datos. Ni una fila ausente demuestra que ese día esté incompleto, ni
la última fila de actividad identifica el último día finalizado. Las filas
diarias no se usan para elegir periodos, rellenar ceros o calcular métricas.

El extractor consulta primero 28 fechas de calendario, incluido hoy en Pacific,
con `dimensions: ['date']`, `dataState: 'all'` y `type: 'web'`, sin filtros.
Esta consulta busca **metadata**, no tráfico. Google documenta
`metadata.first_incomplete_date` como la primera fecha cuyos datos siguen en
recopilación/procesamiento. Solo se informa con `all`, agrupación por `date` y
un rango que contenga datos incompletos. La metadata es opcional: su ausencia
no se interpreta como confirmación de finalización.

Cuando llega un límite válido dentro del rango consultado, el periodo actual
termina el día anterior a `first_incomplete_date`. Se construyen siete fechas
inclusivas y las siete inmediatamente anteriores. Ambos periodos deben quedar
dentro del rango de la consulta de metadata. El día actual, el primer día
incompleto y todos los posteriores quedan excluidos de las métricas. El log y
el snapshot guardan el límite que explica la selección, aunque no haya filas
de actividad para todos esos días.

Los 14 informes posteriores (12 existentes y dos totales EN) usan `dataState: 'final'` y los periodos seleccionados.
Los totales globales siguen obteniéndose sin dimensiones; nunca se suman las
filas de la consulta diaria. La consulta de metadata no cuenta en `reportsRequested`.

`dataQuality.dateCoverage` registra estado, motivo, solicitud, zona, instante,
`firstIncompleteDate` y periodos. La evaluación distingue:

| Estado | Motivo y comportamiento |
|---|---|
| `verified` | Límite válido y dos ventanas anteriores dentro del rango consultado; permite generar v4 |
| `unverified` | `metadata_absent` o `insufficient_metadata_range`; no hay evidencia suficiente para seleccionar dos ventanas |
| `unavailable` | `request_failed` o `invalid_response`; falló la consulta o su metadata es inválida |

El fallback es detenerse con código 1 **antes de consultar métricas o escribir**
si el estado no es `verified`. Actions registra estado y motivo; los últimos
archivos conservan su fecha original. No se publica un snapshot nuevo de error,
no se cambia a un desfase fijo y no se busca el último día con actividad.
Las fechas imposibles, futuras, fuera del rango o campos de metadata de tipo
incorrecto no sirven como evidencia. Las filas diarias se ignoran por completo.

Esta política puede detener una ejecución legítima si Google omite la metadata,
incluido un sitio con poca actividad. Es una limitación explícita del fallback,
no una afirmación de que sus días omitidos estén incompletos. La verificación
describe el corte comunicado por Google en esa consulta; no garantiza cobertura
de todas las queries ni impide futuras revisiones de datos históricos.

## Totales globales y schema v4

La versión 4 conserva los datasets, límites, cobertura de queries y reglas de
truncamiento de v3. Añade cobertura temporal obligatoria y estos estados en
`dataQuality.globalReports.current` y `.previous`:

| Estado | Métricas del periodo |
|---|---|
| `available` | Fila global válida con métricas numéricas |
| `valid_zero` | Fila explícita con cero clics y cero impresiones |
| `report_unavailable` | `null`: petición fallida o sin estado de éxito |
| `empty_response` | `null`: petición exitosa sin fila global |
| `invalid_response` | `null`: fila global malformada o múltiples filas |

Un informe global vacío no prueba cero tráfico y no se normaliza como tal.
Cuando cualquiera de los dos periodos es `null`, `difference` y `percentDelta`
también son `null`. El Markdown muestra «No disponible», una advertencia visible
y el estado de cada periodo. Las otras colecciones disponibles se conservan.
Un descenso real desde un valor positivo hasta un cero explícito sigue mostrando
−100 %. Un denominador anterior igual a cero sigue produciendo `percentDelta: null`.

Los lectores deben admitir métricas globales nulas y comprobar `schemaVersion`.
El constructor solo genera v4 con corte verificado. El validator y renderer
también aceptan v3: validan sus métricas y datasets sin exigir campos v4 y
muestran «Cobertura temporal histórica no verificada». Conservan los valores
históricos, incluidos sus ceros, sin atribuirles una procedencia que v3 no guardó.
No mutan el objeto recibido ni añaden evidencia de cobertura o estados globales.
El contrato base v4 no exige reporting por idioma. La extensión EN opcional
descrita abajo no modifica la web ni sus anuncios.

## Extensión English performance (opcional, schema v4)

El extractor añade `english` sin cambiar `schemaVersion: 4`. El scope usa
exactamente `https://bebergames.com/en` y sus descendientes `/en/`, incluidas
variantes con query string. `EN_SCOPE.pageFilterExpression` es el único patrón
para el filtro API `page/includingRegex` y la selección local. No incluye
`/english`, `/enough`, HTTP ni otros orígenes. Nunca se infiere idioma por país,
idioma del navegador o texto de la consulta. Las identidades URL se conservan
sin fusionar query strings ni barras finales.

Una ejecución normal hace 15 peticiones: una prueba de metadata, los 12 informes
existentes y dos informes nuevos de totales EN (actual/anterior). Estos últimos
no tienen dimensiones, usan el filtro page, `aggregationType: auto`, `type: web`
y `dataState: final`. Guardan `responseAggregationType`; solo una respuesta
válida `byPage` acredita los totales. Una agregación ausente o inesperada queda
`invalid_response`. Los totales EN son agregados por página y no intercambiables
con los totales globales por propiedad; no calcular su cuota de impresiones
como si ambas agregaciones fueran idénticas. Sin metadata temporal verificada
se conserva la parada previa a todas las métricas y escrituras.

### Fuentes y estructura

- `english.scope`: origen, prefijo de pathname y expresión del filtro.
- `english.periods`: copia de los periodos padre, validada contra ellos.
- `english.publishedPages`: inventario capturado desde `publishedRoutes('en-US')`.
- `english.totals`: current, previous, difference y percentDelta.
- `english.pages`: unión del inventario y URLs EN observadas en cualquiera de
  los dos informes page o query/page, con métricas y estados por periodo.
- `english.quality`: estados y procedencia de totals, pages y queryPages por
  periodo, filas recuperadas y límites. Totals conserva agregación solicitada
  y recibida.

Las páginas se construyen desde los informes page originales antes del top 50.
No se hacen nuevas consultas dimensionales ni se reconstruyen totales de página
sumando queries. Se ordenan por impresiones actuales, clics y URL. Las consultas
usan `queryPagesFull`; su nuevo campo aditivo `sourcePage` conserva la URL
absoluta antes de la normalización relativa y evita atribuir orígenes ajenos
al scope EN. No se duplican `queryPagesFull` ni `pageQueryCoverage` dentro de
`english`.

El Markdown muestra cinco combinaciones por página, ordenadas por el máximo de
impresiones observadas entre ambos periodos y query como desempate. Indica X de Y
combinaciones recuperadas y no aplica umbral mínimo. Conserva todas las filas
existentes en JSON. La cobertura visible se calcula sobre las combinaciones de
esa URL absoluta y sus impresiones page actuales, sin mezclar otros orígenes.
Sin denominador válido es N/D. Puede ser inferior al 100 % por consultas ocultas
o límites de recuperación; no se inventan consultas anonimizadas ni se fuerza
la cobertura a 100 %.

### Observaciones, ceros y errores

| Estado | Significado |
|---|---|
| `observed` | Fila page válida; cero clics con impresiones es una observación real |
| `no_observation` | Informe dimensional completado sin fila para esa URL; métricas null |
| `unknown_truncated` | URL ausente de una fuente que alcanzó su límite; métricas null |
| `report_unavailable` | Petición fallida; métricas null |
| `invalid_response` | Fuente malformada; no normalizar sus filas a ceros |
| `page_row_missing` | Evidencia query/page sin observación page; métricas page null |

Totals mantiene `available`, `valid_zero`, `empty_response`,
`report_unavailable` e `invalid_response`. Solo una fila explícita válida puede
acreditar un cero total; una respuesta vacía nunca lo acredita. Las comparativas
requieren ambas observaciones. Sin ellas, difference y percentDelta son null,
sin falsas caídas de −100 %. Un anterior cero produce porcentaje null. CTR se
compara en puntos porcentuales; posición en unidades, donde una disminución
mejora. No se calculan cambios relativos de CTR/posición. Sin impresiones,
CTR/posición se muestran como N/D.

Los `known_absent` históricos de `queryPagesFull` siguen conservando su contrato
original. La vista EN ignora sus ceros sintetizados y no muestra sus deltas como
tráfico confirmado. El inventario sin observaciones permanece visible con
«No observed Search Console data in this period.»; esto no acredita tráfico
cero, desindexación ni problemas SEO.

Si una fuente page o query/page contiene filas malformadas, descartarlas no
acredita ausencia. EN conserva `invalid_response`. En los datasets genéricos,
las filas válidas recuperadas siguen siendo observaciones; las identidades
ausentes de esa fuente usan `unknown_report_unavailable`, métricas y comparativas
null, y procedencia `report_unavailable`, con un aviso de respuesta inválida.
Se conservan los conteos originales de descarga y de peticiones completadas por
la API. La incertidumbre se aplica a la fuente porque una fila malformada puede
no permitir identificar con seguridad qué URL/query se perdió.

El límite de descarga sigue siendo 25.000 por informe, sin paginación nueva.
Alcanzarlo marca la fuente como potencialmente truncada. Terminar por debajo
solo describe la respuesta recuperada: Search Console puede omitir datos por
límites internos y privacidad. Se exponen los avisos incluso cuando hay algunas
filas observadas. La sección presenta evidencia, sin scoring ni recomendaciones
de contenido.

### Compatibilidad y validación EN

`english` es opcional. v3 y v4 anteriores siguen siendo legibles sin mutación,
backfill ni certificación temporal inventada. Su ausencia se presenta como
«EN extension not collected in this snapshot», nunca cero tráfico inglés.
Los snapshots semanales retenidos en Git bastan para el histórico actual;
no se añade tabla de tendencias ni almacenamiento adicional.

Si existe `english`, requiere v4 y se validan scope, URLs únicas, inventario,
periodos padre, métricas finitas/no negativas, CTR 0–1, estados, aritmética,
límites y procedencia. Las filas malformadas se rechazan como fuente EN inválida,
sin debilitar la validación base v4. Los informes generados solo los escribe el
extractor, nunca tests ni una edición manual.
Una observación page requiere una fuente usable y suficientes filas recuperadas.
Sin observación page, la evidencia query/page exige `page_row_missing` si la
fuente page es usable; los fallos o respuestas inválidas de esa fuente mantienen
su prioridad. Sin esa evidencia, el estado distingue truncamiento de ausencia
de observación.

## Validación

`node --test tests/seo-reporting.test.mjs tests/seo-fetch.test.mjs tests/seo-english.test.mjs` cubre selección de fechas, límites
UTC/Pacific, DST, metadata opcional o inválida, errores globales, ceros válidos y el
contrato de JSON/Markdown con datos deterministas. No necesita credenciales ni
peticiones reales a Search Console. Las pruebas del extractor ejecutan su código
con API y escritura de archivos simuladas: verifican la consulta `all`, los
informes `final`, la independencia de los huecos de actividad, la parada antes
de escribir sin metadata fiable y la salida nula ante un fallo global. También
se prueba v3 sin mutación ni evidencia temporal inventada.

Referencia: [Search Analytics: query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).
