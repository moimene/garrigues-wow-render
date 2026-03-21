

## Plan: Integrar EuroStack y Digital Building Blocks en el Mapa Normativo DSM

### Resumen

Incorporar una nueva sección "Infraestructura soberana" que visualice la relación entre el marco normativo y su capa de implementación técnica (Digital Building Blocks + EuroStack), sin sobrecargar la estructura existente.

### Cambios planificados

#### 1. Nuevo fichero de datos: `src/data/euroStackData.ts`

Definir el mapeo entre bloques B1-B12 y sus Building Blocks asociados:
- Interfaz `BuildingBlock` con campos: `id`, `nombre`, `descripcion`, `bloqueIds` (B1-B12 vinculados), `estado` (operativo / pilotaje / desarrollo / sin equivalente), `url` opcional
- Interfaz `SovereigntyLevel` por bloque: grado de madurez técnica soberana
- Array de Building Blocks: eID/EUDI Wallet (→B7), eDelivery (→B8, B12), eSignature (→B7), OOTS (→B12), con descripciones concisas
- Array de principios EuroStack (soberanía, interoperabilidad, sostenibilidad, etc.)
- Mapeo `bloquesSovereignty: Record<number, SovereigntyLevel>` para el heatmap

#### 2. Nuevo componente: `src/components/dsm/EuroStackSection.tsx`

Sección editorial que se insertará como nueva tab "Infraestructura" en la navegación, entre "España" y "Recursos". Contendrá:

- **Módulo narrativo introductorio**: Explica las 3 capas (normativa → técnica → soberanía) con texto institucional sobrio. Incluye disclaimer claro de que EuroStack es propuesta estratégica, no derecho vigente.
- **Mapa de Building Blocks**: Grid visual mostrando cada Building Block, qué bloques B1-B12 conecta, y su estado de despliegue. Diseño tipo tarjetas con iconos y conexiones a bloques.
- **Heatmap de soberanía técnica**: Visualización de 12 celdas (una por bloque) coloreadas según madurez de infraestructura soberana disponible. Leyenda con 4 niveles: "BB operativo", "BB en pilotaje", "Sin equivalente consolidado", "Dependencia de terceros".
- **Principios EuroStack**: Lista editorial de los 8 principios del informe con breve descripción.

#### 3. Modificar `src/pages/Index.tsx`

- Añadir tab `{ id: 'infraestructura', label: 'Infraestructura' }` al array de tabs
- Añadir ref en `sectionRefs`
- Insertar nueva `<section>` con `LayerHeading` ("Análisis · Soberanía digital", "De la norma a la infraestructura: el EuroStack y los Digital Building Blocks") y `<EuroStackSection />`
- Ubicar entre la sección España y Recursos

#### 4. Enriquecer `src/data/dsmData.ts` — Campo `buildingBlocks` en `Bloque`

- Añadir campo opcional `buildingBlocks?: string[]` a la interfaz `Bloque`
- Poblar para B7 (eID, EUDI Wallet, eSignature), B8 (eDelivery), B12 (OOTS, eDelivery)
- Los demás bloques quedan con array vacío o sin campo

#### 5. Modificar `src/components/dsm/AreaDetailPanel.tsx`

- En la pestaña "Síntesis" o como nueva mini-sección, mostrar un badge "Building Block asociado" cuando `bloque.buildingBlocks` tenga elementos
- Estilo discreto: icono de engranaje + nombre del BB, con tooltip explicativo

#### 6. Ampliar cronología en `src/data/dsmData.ts`

- Añadir 3-4 hitos técnicos al array `cronologia` con un nuevo campo `tipoHito?: 'normativo' | 'tecnico'`
- Hitos: despliegue EUDI Wallet, conexión OOTS, actos de ejecución eIDAS
- Valor por defecto: `'normativo'`

#### 7. Modificar `src/components/dsm/TimelineSection.tsx`

- Distinguir visualmente hitos técnicos (icono ⚙ y borde punteado) de normativos
- Pequeña leyenda adicional: "● Hito normativo" vs "⚙ Hito técnico"

### Secciones que NO se tocan

- Sunburst, Constellation, HeatGrid, matrices existentes → sin cambios
- NarrativeIntro → sin cambios
- Guided Tour → sin cambios

### Criterios editoriales

- Tono analítico e institucional, no promocional
- Separar claramente: norma (vinculante) vs Building Block (instrumento técnico) vs EuroStack (propuesta estratégica)
- Incluir disclaimer visible: "EuroStack es una propuesta de la Fundación Bertelsmann, no un acto jurídico de la Unión"
- Las imágenes subidas se usan solo como referencia visual, no se embeben

### Orden de implementación

1. Datos (`euroStackData.ts` + campos en `dsmData.ts`)
2. Componente `EuroStackSection.tsx`
3. Integración en `Index.tsx` (nueva tab + sección)
4. Badge en `AreaDetailPanel.tsx`
5. Cronología técnica en `TimelineSection.tsx`

