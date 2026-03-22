

## Plan: Imagen de fondo del hero con overlay verde institucional

### Cambios

1. **Copiar imagen** al proyecto: `user-uploads://image-6.png` → `src/assets/hero-building.png`

2. **Modificar `src/pages/Index.tsx`** (líneas ~147-154):
   - Importar la imagen: `import heroBg from '@/assets/hero-building.png'`
   - Añadir un `<img>` absoluto dentro del hero como fondo (`object-cover`, `object-center`)
   - Superponer un overlay verde oscuro semitransparente con `mix-blend-mode: multiply` + gradiente para mantener legibilidad del texto
   - Mantener los patrones decorativos existentes encima

   Estructura resultante del hero:
   ```text
   <section (relative, overflow-hidden)>
     <img src={heroBg} (absolute, inset-0, object-cover, opacity ~0.3)>
     <div (absolute, inset-0, gradient verde #004438 → #00332a, opacity ~0.85)>
     <div (absolute, inset-0, g-pattern-dots)>
     <div (absolute, inset-0, g-pattern-lines)>
     <div (relative, contenido texto)>
   </section>
   ```

   La imagen se verá sutilmente detrás del verde institucional, aportando textura y profundidad sin comprometer legibilidad ni identidad cromática.

