

## Plan: Reescribir íntegramente el bloque B7 en dsmData.ts

### Problema
El bloque B7 (id: 7) contiene errores graves de contenido: incluye e-Evidence, PNR, Europol y la Directiva sobre violencia contra mujeres, que no pertenecen a confianza digital. Los textos no reflejan correctamente eIDAS 2, la Ley 6/2020, ni los plazos de la cartera EUDI.

### Cambio
Reescribir completamente el objeto del bloque `id: 7` en `src/data/dsmData.ts` (líneas 392-443), sustituyendo todos los campos con el contenido del informe legal proporcionado:

**Campos a reescribir:**
- `subtitulo` → "Marco común de identificación electrónica, carteras EUDI y servicios de confianza cualificados"
- `descripcion` → "eIDAS 2, Reglamento (UE) 2024/1183, cartera EUDI, firma electrónica cualificada, servicios de confianza, Ley 6/2020"
- `vigentes: 3, enProceso: 0, planificadas: 0, enRevision: 0, reglamentos: 1, directivas: 0` (ajustado a las normas reales del bloque)
- `sintesisEjecutiva` → texto del informe sobre eIDAS 2 y EUDI
- `explicacionMedia` → texto nivel 2 del informe
- `explicacionCompleta` → texto nivel 3 del informe
- `impactoResumen` → obligaciones nucleares (cartera EUDI, aceptación por administraciones, Ley 6/2020 art. 326.4 LEC)
- `estadoUEDetalle` → estado con fechas precisas (vigor 20.05.2024, actos ejecución 21.11.2024, plazos 24/36 meses)
- `transposicionDetalle` → perspectiva España con Ley 6/2020, DNIe, Cl@ve, @firma, pilotos DC4EU
- `alcance` → sin e-Evidence/PNR/Europol
- `conceptosClave` → nuevos términos (EUDI, atributos verificados, prestador cualificado, niveles de garantía, art. 326.4 LEC, minimización)
- `arquitecturaNormativaUE` → eIDAS 2 + actos de ejecución + coordinación RGPD/DSA/DMA
- `clavesInterpretacion` → 5 claves del informe legal
- `alertasRigor` → 2 alertas actualizadas
- `recursosReferencia` → fuentes corregidas (sin e-Evidence)
- `funcionNormativa` → "Habilitante e infraestructural — arquitectura de confianza para transacciones seguras"
- `obligacionesActores` → reescritos según el informe (Estados/administraciones, proveedores de carteras, partes usuarias privadas, prestadores cualificados)
- `dependencias` → reescritas (protección de datos, servicios digitales/VLOP, mercados digitales/DMA, sector público, pagos, ciberseguridad)
- `hitosProximos` → plazos reales eIDAS 2 (cartera 24 meses, aceptación 36 meses, actos ejecución 2025)
- `normas` → reemplazar las 5 normas erróneas por las correctas:
  1. Reglamento eIDAS (910/2014) — vigente/directa
  2. Reglamento (UE) 2024/1183 (eIDAS 2) — vigente/directa
  3. Ley 6/2020 (complemento nacional) — transpuesta

### Archivo afectado
- `src/data/dsmData.ts` — líneas 392-443 (solo el objeto de id: 7)

### Sin otros cambios
Los componentes de UI no se tocan; el `AreaDetailPanel` ya consume estos campos correctamente.

