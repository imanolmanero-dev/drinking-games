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

Los 12 informes posteriores usan `dataState: 'final'` y los periodos seleccionados.
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
Este cambio no añade reporting por idioma ni modifica la web o sus anuncios.

## Validación

`node --test tests/seo-reporting.test.mjs tests/seo-fetch.test.mjs` cubre selección de fechas, límites
UTC/Pacific, DST, metadata opcional o inválida, errores globales, ceros válidos y el
contrato de JSON/Markdown con datos deterministas. No necesita credenciales ni
peticiones reales a Search Console. Las pruebas del extractor ejecutan su código
con API y escritura de archivos simuladas: verifican la consulta `all`, los
informes `final`, la independencia de los huecos de actividad, la parada antes
de escribir sin metadata fiable y la salida nula ante un fallo global. También
se prueba v3 sin mutación ni evidencia temporal inventada.

Referencia: [Search Analytics: query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).
