

## Auditoría de estilo completa — Mapa Normativo DSM Garrigues

### Diagnóstico: Emojis encontrados (TODOS deben eliminarse)

| Archivo | Línea | Emoji | Sustitución propuesta |
|---------|-------|-------|-----------------------|
| `Index.tsx` | 195 | 🇪🇺 | Chip texto `UE` con fondo `var(--g-brand-3308)` y texto blanco |
| `Index.tsx` | 207 | 🇪🇸 | Chip texto `ES` con fondo `var(--g-brand-3308)` y texto blanco |
| `Index.tsx` | 288 | 🇪🇸 | Chip texto `ES` (mismo estilo) |
| `TimelineSection.tsx` | 103 | ⚙ | Texto `[TEC]` en negrita o dot cuadrado `■` con color diferenciado |
| `TimelineSection.tsx` | 186 | ⚙ | Sustituir por `■` + texto "Hito técnico" |
| `TimelineSection.tsx` | 200 | 🇪🇸 | Chip `ES` |
| `AreaDetailPanel.tsx` | 131 | ⚙ | Sustituir por dot `·` o prefijo tipográfico `BB:` |
| `AreaDetailPanel.tsx` | 244 | 📅 | Eliminar, el contexto de fecha es evidente |
| `AreaDetailPanel.tsx` | 24 | ⚡ | Sustituir por `!` en bold o `×` |
| `EuroStackSection.tsx` | 133 | ⚙ | Sustituir por dot `·` tipográfico |
| `euroStackData.ts` | 116-123 | 🏛🔗📖🛡📐♻⚖🤝 | Eliminar campo `icono` de principios; usar numeración ordinal `01–08` con estilo tipográfico |

### Diagnóstico: Tooltips con fondo transparente (BUG ACTIVO)

Los tooltips en `InteractionsMatrix.tsx` (línea 85) siguen usando `var(--g-surface-card)` en vez de `#ffffff`. Mismo problema potencial en `EuroStackSection.tsx` sovereignty heatmap y `HeatGrid.tsx` según el screenshot del usuario.

**Acción**: Auditar TODOS los tooltips/popovers del proyecto y forzar `background: '#ffffff'`, `border: '1px solid #d1d5db'`, `boxShadow: '0 8px 30px rgba(0,0,0,0.22)'`, `zIndex: 50`.

Archivos afectados:
- `InteractionsMatrix.tsx` línea 85 — `var(--g-surface-card)` → `#ffffff`
- `EuroStackSection.tsx` — ya corregido, verificar
- `HeatGrid.tsx` — ya corregido, verificar
- `ObligationsHeatMap.tsx` — ya corregido

### Diagnóstico: Inconsistencias tipográficas

| Problema | Ubicación | Corrección |
|----------|-----------|------------|
| Textos `text-[9px]` demasiado pequeños | badges en EuroStackSection, labels | Mínimo `text-[10px]` en toda la app |
| `text-[11px]` vs `text-xs` mezclados | body text en múltiples componentes | Estandarizar: body pequeño = `text-xs` (12px), micro = `text-[10px]`, nunca menos de 10px |
| H3 inconsistentes: `text-base` vs `text-xl` | Section headings | Unificar: H3 sección = `text-lg font-bold` |

### Diagnóstico: Botones/chips/badges inconsistentes

| Problema | Corrección |
|----------|------------|
| `borderRadius` varía: `var(--g-radius-sm)`, `var(--g-radius-full)`, `rounded` | Chips/badges: `var(--g-radius-sm)`. Botones pill: `var(--g-radius-full)`. Cards: `var(--g-radius-lg)` |
| Hardcoded colors en badges (`#fef3c7`, `#92400e`, `#e2e8f0`) | Usar sistema de tokens CSS existente |
| Sombras pesadas en hover de cards | Reducir `var(--g-shadow-card-hover)` |

### Plan de cambios

**Fase 1 — Eliminar todos los emojis** (8 archivos)
1. `Index.tsx`: Reemplazar 🇪🇺/🇪🇸 por chips tipográficos `<span>UE</span>` / `<span>ES</span>` con estilo uniforme
2. `TimelineSection.tsx`: Reemplazar ⚙ por indicador tipográfico `■ TEC` y 🇪🇸 por chip `ES`
3. `AreaDetailPanel.tsx`: Reemplazar ⚙ por `BB ·`, eliminar 📅, reemplazar ⚡ por texto `(!)` 
4. `EuroStackSection.tsx`: Reemplazar `{p.icono}` emoji por numeración ordinal `01`–`08` estilizada
5. `euroStackData.ts`: Cambiar campo `icono` de emojis a strings numerales `'01'`–`'08'`

**Fase 2 — Corregir tooltips transparentes**
1. `InteractionsMatrix.tsx`: Forzar `background: '#ffffff'` en tooltip
2. Auditar todos los demás y asegurar consistencia

**Fase 3 — Unificar escala tipográfica y componentes**
1. Establecer mínimo `10px` para cualquier texto
2. Estandarizar badges: `text-[10px] font-semibold px-2 py-0.5`, radio `var(--g-radius-sm)`, sin hardcoded colors
3. Unificar headings de sección: `text-lg font-bold`
4. Eliminar hardcoded hex en badges de `BlockCard.tsx` → usar tokens CSS

**Fase 4 — Crear componente chip `ES`/`UE` reutilizable**
Un `<GeoChip variant="ES" | "UE" />` que renderice un chip tipográfico sobrio y consistente, reutilizable en todo el proyecto.

### Resultado esperado
- Cero emojis en todo el codebase
- Tooltips siempre opacos y legibles
- Escala tipográfica coherente (10px mínimo, jerarquía clara)
- Chips/badges unificados visualmente
- Tono visual institucional sin elementos decorativos

