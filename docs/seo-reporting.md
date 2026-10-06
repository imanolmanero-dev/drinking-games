# Fiabilidad del reporting de Search Console

El extractor `scripts/fetch-seo-data.ts` es el único propietario de
`SEO_DATA.md` y `seo-data.json`. No editar sus resultados manualmente.
La automatización semanal existente sigue siendo la encargada de ejecutarlo.

## Política de semanas maduras

El dashboard prioriza tendencias estables y comparables frente a máxima
frescura. La política no garantiza finalización matemática por día.
Se captura un único instante de ejecución y se resuelve su fecha `D` en
`America/Los_Angeles`, la base de fechas de Search Console.

1. Calcular `D − 7` como fecha de calendario.
2. Elegir `S`, el último domingo que sea <= `D − 7`.
3. Actual: `[S − 6, S]`; anterior: `[S − 13, S − 7]`.

Ambas ventanas son lunes-domingo, con siete fechas inclusivas, consecutivas
y sin solapamiento. La actual termina al menos siete fechas antes de `D`.
Las semanas no cambian entre ejecuciones de lunes a sábado; el domingo
habilita una nueva semana madura. La aritmética no usa horas locales ni
desfases fijos, por lo que conserva los límites durante DST.

Ejemplo: para `D = 2026-10-04`, `S = 2026-09-27`, actual
`2026-09-21..2026-09-27` y anterior `2026-09-14..2026-09-20`.
Todas las consultas de métricas usan `dataState: final`; ese parámetro
no se presenta como prueba independiente de finalización de cada día.

## Metadata opcional como seguridad adicional

Se hace **un solo sondeo advisory**, sin retry ni ampliación: `[D − 27, D]`,
`dimensions: ['date']`, `dataState: all`, `type: web`, `rowLimit: 29`, sin
filtros ni `aggregationType`. Sus filas solo aportan diagnósticos;
ni la última fila ni filas vacías demuestran finalización o tráfico cero.

Si llega un `first_incomplete_date = F` válido dentro del rango consultado,
elegir el último domingo <= `min(D − 7, F − 1)`. Esto mantiene ambas semanas
estrictamente antes del corte y solo puede moverlas hacia atrás. El margen
mínimo de siete días nunca disminuye. La política madura no exige que las
ventanas ajustadas estén dentro del sondeo: no se atribuye verificación a
fechas que la solicitud no cubre.

Metadata y cutoff son opcionales. Su ausencia no prueba finalización, pero
tampoco impide generar un informe con la política madura. Un campo presente
con null, tipo incorrecto, fecha imposible o fuera del rango no es evidencia.
Un fallo API del sondeo, metadata malformada o envelope inválido deja el
advisory no disponible y continúa con las ventanas maduras por defecto.
Si autenticación, permisos o una caída API también afectan las métricas,
la ejecución termina con código 1; el sondeo no oculta esos fallos.

Los motivos del advisory siguen distinguiendo `metadata_object_absent`,
`first_incomplete_date_absent`, `malformed_metadata`,
`invalid_first_incomplete_date`, `request_failed` e `invalid_response`.
`insufficient_metadata_range` conserva un corte válido que puede ajustar
la política madura sin otra petición.

## Evidencia schema v4 y diagnósticos

`dataQuality.dateCoverage` usa `status: mature_lag`,
`method: mature_weekly_window`, `maturityBufferDays: 7`,
`timeZone: America/Los_Angeles`, `periodAlignment: Monday-Sunday`,
`dataState: final`, `executionDate`, `selectedSunday`, `periods`,
`metadataCutoff`, `metadataCutoffAvailable` y `metadataAdjusted`.
`reason` distingue `mature_lag_only` y `mature_lag_plus_metadata`.
`firstIncompleteDate` conserva el alias del cutoff; ambos son null si falta
evidencia válida. `advisory` guarda únicamente solicitud y evaluación segura.
El validator reconstruye exactamente la política, el advisory y las ventanas,
y exige el mismo instante en `checkedAt` y `updatedAt`.

Los v4 históricos con `verified` conservan su validator estricto, incluida
la evidencia de intentos y ampliación del contrato anterior. Esa lógica solo
valida artifacts históricos; el extractor nuevo no reintenta. V3 sigue siendo
histórico no verificado. No se migra ni reescribe ningún artifact existente.

Se conserva `seo_coverage_probe` con solicitud, metadata presente/tipo,
cutoff presente/valor seguro, filas y clasificación. `seo_period_selection`
registra fecha LA, margen, domingo, ventanas, cutoff, ajuste, método y motivo
del advisory. `seo_reporting_outcome` resume clasificación primaria,
retry `not_attempted`, selección, outcome, escrituras, exit code y schema,
timestamp y edad en segundos del artifact anterior. No se serializan metadata
arbitraria, credenciales, tokens, headers ni cuerpos privados de error.

Una ejecución normal realiza **1 advisory + 14 métricas = 15 peticiones**:
12 informes existentes y dos totales EN. Solo las métricas cuentan en
`reportsRequested`. Dimensiones, filtros, límites y semántica null/zero y
truncamiento permanecen iguales.

## Resultados de ejecución

| Resultado | Comportamiento | Exit code |
|---|---|---|
| `REPORT_UPDATED` | Snapshot validado, Markdown y JSON escritos; metadata opcional puede faltar | 0 |
| `API_FAILURE` | Fallo al preparar autenticación/cliente; artifacts conservados | 1 |
| `METRIC_REPORT_FAILURE` | Representación parcial solo en memoria; artifacts conservados, Actions falla y omite el commit automático | 1 |
| `SNAPSHOT_VALIDATION_FAILURE` | Fallo de construcción/validación/render; artifacts conservados | 1 |
| `ARTIFACT_WRITE_FAILURE` | No se declara actualización completa | 1 |

No se emite `COVERAGE_UNRESOLVED` por ausencia advisory. Se usa
`process.exitCode`, sin salida abrupta. Respuestas de métricas vacías siguen
siendo no disponibles, nunca cero; se conserva la política parcial existente.
Antes de normalizar filas se valida el envelope de métricas: objeto no null
ni array, con `rows` omitido o array. El cliente Google declara `rows` opcional;
un campo presente null, undefined o de otro tipo es inválido. Un envelope
inválido no se convierte en una respuesta vacía exitosa. Fallos de peticiones,
envelopes o filas detienen la publicación antes de renderizar o escribir;
los estados parciales/null del snapshot se conservan solo en memoria.
Las escrituras del par siguen siendo secuenciales, una limitación previa.
No hace falta modificar el workflow. El Markdown explica el margen semanal
y si hubo cutoff compatible, sin afirmar finalización verificada por el lag.

## Totales globales y schema v4

La versión 4 conserva los datasets, límites, cobertura de queries y reglas de
truncamiento de v3. Añade política temporal explícita y estos estados en
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
El constructor genera v4 con semanas maduras; no exige un corte independiente. El validator y renderer
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
como si ambas agregaciones fueran idénticas. ES y EN usan las mismas semanas
maduras, también cuando falta el cutoff advisory.

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
14 informes `final`, la independencia de los huecos de actividad, generación
con advisory ausente/inválido y los valores null ante fallos globales.
Se comprueban también el ajuste hacia atrás, los outcomes de fallo de métricas,
validación y escritura, y v3/v4 históricos sin mutación ni evidencia inventada.

Referencia: [Search Analytics: query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).
