

## Plan: Añadir banner roller/marquee para destacar el botón "¿Cómo usar este sitio?"

### Objetivo
Crear una franja animada tipo "ticker" o "marquee" justo debajo del hero (o en la parte inferior del hero) que se desplace horizontalmente de forma continua, repitiendo el mensaje "¿Cómo usar este sitio?" para captar la atención del usuario hacia la funcionalidad de visita guiada.

### Cambios

#### 1. Modificar `src/pages/Index.tsx`
- Insertar un banner roller justo debajo del hero (después de la línea ~225, antes de la navegación sticky).
- El banner será una franja de ancho completo con fondo sutil (p.ej. `var(--g-brand-3308)` con opacidad baja o el verde institucional).
- Contenido: texto "¿Cómo usar este sitio? — Visita guiada interactiva" repetido varias veces, con animación CSS `marquee` de desplazamiento horizontal continuo.
- Todo el banner será clicable y disparará `setTourActive(true)`.

#### 2. Añadir keyframe en `src/index.css`
- Definir `@keyframes marquee-scroll` que desplace `translateX(0)` → `translateX(-50%)` en bucle infinito.
- Clase utilitaria `.animate-marquee` con `animation: marquee-scroll 20s linear infinite`.

### Diseño visual
- Franja estrecha (~36px alto), fondo verde institucional oscuro, texto blanco `text-[11px] font-semibold uppercase tracking-widest`.
- Separadores tipográficos `·` entre repeticiones.
- `cursor: pointer` en toda la franja.
- Sobrio e institucional: sin emojis, sin iconos decorativos.

