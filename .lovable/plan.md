

## Mapeo Normativo DSM — Versión Garrigues Espectacular

### Visión
Transformar el mapeo normativo del Mercado Único Digital en una aplicación React con identidad Garrigues premium: verde corporativo #004438, tipografía Montserrat, animaciones fluidas y visualizaciones interactivas de nivel profesional que no parezcan generadas por IA.

### Estructura de Páginas y Secciones

**1. Header Hero Inmersivo**
- Degradado verde Garrigues (#004438 → #007362) con patrón geométrico sutil (cuadrícula de puntos o líneas diagonales finas)
- Título "Mapeo Normativo del Mercado Único Digital" con Montserrat Bold
- Subtítulo con fecha de actualización y badge UE/España
- Contador animado: total normas vigentes, en proceso, pendientes transposición

**2. Navegación Sticky Premium**
- Tabs horizontales con estilo Garrigues (underline verde al activar, transiciones suaves)
- 5 secciones: Vista General, Cronología, Transposición España, Recursos, Visualizaciones

**3. Vista General — Mapa de 12 Bloques**
- Grid de cards con borde izquierdo coloreado por bloque, sombras Garrigues
- Cada card con número circular, nombre, descripción, badges de estado (vigente/proceso/planificada)
- Hover con elevación y glow sutil verde
- Click abre modal/drawer con detalle completo de cada norma UE y estado España
- Leyenda con dots de color y etiquetas

**4. Sección de Mapas Interactivos (NUEVO — efecto wow)**
- **Mapa Radial Sunburst**: Diagrama de anillos concéntricos (DSM centro → 12 bloques → normas) con SVG animado, colores por estado
- **Mapa de Calor por Bloques**: Grid visual que muestra densidad normativa y estado de transposición con gradientes de color
- **Diagrama de Constelación**: Red de nodos conectados mostrando interrelaciones entre normas UE y españolas
- Todos con animaciones de entrada escalonadas y tooltips informativos

**5. Cronología 2025-2028**
- Timeline vertical con línea central verde Garrigues
- Nodos con dot coloreado por estado, fecha, título y descripción
- Badges de bloques relacionados
- Animación de aparición al hacer scroll (intersection observer)

**6. Transposición España**
- Bloques colapsables por área con tabla detallada
- Badges de estado: Aplicación directa (azul), Transpuesta (verde), Parcial (ámbar), Pendiente (rojo)
- Barra de progreso visual por bloque mostrando % transpuesto

**7. Recursos**
- Cards agrupadas por categoría con icono y enlace
- Hover con elevación y borde verde

**8. Propuestas de Visualización**
- Cards con pros/cons en grid verde/ámbar, badge EAA compatible

### Diseño Visual Garrigues
- **Colores**: Verde #004438 primario, #009a77 acentos, #d8ece7 fondos sutiles, #4a4a49 texto
- **Tipografía**: Montserrat (400, 500, 700) vía Google Fonts
- **Patrones**: Líneas diagonales sutiles en headers, grid de puntos en fondos
- **Animaciones**: Fade-in escalonado en cards, counters animados, transiciones suaves en tabs
- **Sombras y radios**: Tokens Garrigues (shadow-card, radius-lg)

### Componentes Clave
- `NormativeMap` — Sunburst SVG interactivo
- `HeatGrid` — Mapa de calor de bloques
- `ConstellationGraph` — Red de relaciones normativas
- `BlockCard` — Card de bloque con modal de detalle
- `TimelineItem` — Nodo de cronología animado
- `TranspositionBlock` — Bloque colapsable con tabla y barra de progreso
- `AnimatedCounter` — Contador numérico animado para estadísticas

