

## Plan: Corrección de calidad editorial de bloques B1–B12 (excepto B7) en dsmData.ts

### Diagnóstico

El informe legal identifica errores y debilidades en 9 bloques (B7 ya corregido; B2 Industrial y B11 Media no tienen correcciones en este informe). Los problemas se concentran en los campos textuales: `sintesisEjecutiva`, `explicacionMedia`, `explicacionCompleta`, `estadoUEDetalle`, `transposicionDetalle` y `clavesInterpretacion`.

### Mapeo audit → bloques actuales

| Audit ref | Bloque actual (id) | Corrección principal |
|-----------|-------------------|---------------------|
| B5 Audit | id:1 (IA/I+D) | Aplicación escalonada precisa (prohibiciones feb 2025, GPAI ago 2025, alto riesgo 2026-2027); régimen GPAI con/sin riesgo sistémico; AESIA |
| B3 Audit | id:3 (Conectividad) | Añadir OTT/interpersonales independientes de numeración; Ley 11/2022; CNMC; neutralidad de red como reglamento autónomo |
| B1+B4 Audit | id:4 (Datos/Privacidad) | ePrivacy bloqueada ≠ RGPD; pluralidad de bases de licitud; DGA vs Data Act vs Open Data como instrumentos distintos; transferencias internacionales |
| B10 Audit | id:5 (PI) | Excepción art. 4 opt-out para minería de datos; relevancia para IA generativa; TJUE validación art. 17 |
| B6 Audit | id:6 (Ciberseguridad) | NIS2+CRA+CER como instrumentos complementarios; CCN-CERT/INCIBE-CERT; cadena suministro como obligación sustantiva; plazos notificación 24h/72h/1mes |
| B2 Audit | id:8 (Servicios Digitales) | DSA como diligencia verificable, no censura; régimen escalonado por tamaño (intermediario/plataforma/VLOP); Sec. Estado como coordinador |
| B9 Audit | id:9 (Consumidores) | Actualizaciones como parte de conformidad; Dir 2019/770 vs 2019/771 distintas; RDL 1/2007 como texto refundido |
| B8 Audit | id:10 (Mercados Digitales) | Ex ante vs ex post; proceso designación gatekeepers; CNMC coordinada; interoperabilidad con límites |
| B11 Audit | id:12 (Finanzas) | DORA (resiliencia) vs MiCA (criptoactivos) vs PSD3 (pagos) lógicas distintas; BdE/CNMV/DGSFP roles diferenciados |

### Cambios concretos en `src/data/dsmData.ts`

Para cada bloque afectado, se reescriben los siguientes campos con el texto del informe legal:

1. **`sintesisEjecutiva`** — Reescribir con la síntesis corregida
2. **`explicacionMedia`** — Reescribir con explicación media del informe
3. **`explicacionCompleta`** — Reescribir con explicación completa
4. **`estadoUEDetalle`** — Precisar fechas, plazos y estados correctos
5. **`transposicionDetalle`** — Perspectiva España con autoridades, normas nacionales y retos
6. **`clavesInterpretacion`** — Sustituir por las claves del informe (3-5 por bloque)

Los campos estructurales (`normas`, `obligacionesActores`, `dependencias`, `hitosProximos`) se mantienen salvo ajustes puntuales de coherencia con los nuevos textos.

### Archivo afectado
- `src/data/dsmData.ts` — Líneas 72-714 (los 12 objetos del array `bloques`)

### Orden de ejecución
Editar los 9 bloques secuencialmente por id: 1, 3, 4, 5, 6, 8, 9, 10, 12.

### Sin otros cambios
Los componentes UI no se modifican; consumen estos campos dinámicamente.

