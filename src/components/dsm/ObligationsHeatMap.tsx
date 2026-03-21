import { useMemo, useState } from 'react';
import { bloques, actorLabels, ActorType } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const allActors: ActorType[] = ['plataformas', 'fabricantes', 'proveedores', 'administraciones', 'pymes', 'financieras', 'telecoms', 'medios'];

const intensidadValue = { alta: 3, media: 2, baja: 1, nula: 0 };

const intensidadColor = (v: number) => {
  if (v === 0) return 'var(--g-surface-muted)';
  if (v === 1) return '#93c5fd';   // blue-300
  if (v === 2) return '#d97706';   // amber-600
  return '#dc2626';                // red-600
};
const intensidadPattern = (v: number) => {
  if (v === 0) return '—';
  if (v === 1) return '○';
  if (v === 2) return '◑';
  return '●';
};
const intensidadTextColor = (v: number) => {
  if (v === 0) return 'var(--g-text-secondary)';
  if (v === 1) return '#1e40af';
  if (v === 2) return '#92400e';
  return '#ffffff';
};

export const ObligationsHeatMap = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [hoveredCell, setHoveredCell] = useState<{ bloqueId: number; actor: ActorType } | null>(null);

  const matrix = useMemo(() => {
    return bloques.map(b => {
      const row: Record<ActorType, { intensidad: number; obligaciones: string[] }> = {} as any;
      allActors.forEach(a => {
        const match = b.obligacionesActores.find(oa => oa.actor === a);
        row[a] = match
          ? { intensidad: intensidadValue[match.intensidad], obligaciones: match.obligaciones }
          : { intensidad: 0, obligaciones: [] };
      });
      return { bloque: b, actors: row };
    });
  }, []);

  return (
    <div ref={ref} className="space-y-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="overflow-x-auto" style={{ overflow: 'visible', overflowX: 'auto' }}>
        <table className="w-full border-collapse text-[11px]" style={{ minWidth: '780px' }}>
          <thead>
            <tr>
              <th className="text-left p-2 font-bold text-[var(--g-text-secondary)] uppercase tracking-wider text-[10px]" style={{ width: '200px' }}>Bloque</th>
              {allActors.map(a => (
                <th key={a} className="p-2 text-center font-bold text-[var(--g-text-secondary)] uppercase tracking-wider text-[9px]" style={{ writingMode: 'vertical-rl', height: '100px', minWidth: '40px' }}>
                  {actorLabels[a].split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map(({ bloque, actors }) => (
              <tr key={bloque.id}>
                <td className="p-2 font-semibold text-[var(--g-text-primary)]" style={{ borderBottom: '1px solid var(--g-border-subtle)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded shrink-0 flex items-center justify-center text-[8px] font-bold text-white" style={{ background: bloque.color }}>{bloque.id}</span>
                    <span className="truncate text-[11px]" title={bloque.nombre}>B{bloque.id}: {bloque.nombre}</span>
                  </div>
                </td>
                {allActors.map(a => {
                  const cell = actors[a];
                  const isH = hoveredCell?.bloqueId === bloque.id && hoveredCell?.actor === a;
                  return (
                    <td
                      key={a}
                      className="relative p-1 text-center cursor-pointer"
                      style={{
                        background: intensidadColor(cell.intensidad),
                        borderBottom: '2px solid var(--g-surface-card)',
                        borderRight: '2px solid var(--g-surface-card)',
                        transition: 'all 150ms ease',
                        transform: isH ? 'scale(1.12)' : 'scale(1)',
                        borderRadius: '3px',
                      }}
                      onMouseEnter={() => setHoveredCell({ bloqueId: bloque.id, actor: a })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-sm font-bold" style={{ color: intensidadTextColor(cell.intensidad) }} aria-label={`Intensidad ${cell.intensidad}`}>
                        {intensidadPattern(cell.intensidad)}
                      </span>
                      {isH && cell.obligaciones.length > 0 && (
                        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] p-3 text-left" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: '0 8px 30px rgba(0,0,0,0.18)', border: '1px solid var(--g-border-subtle)' }}>
                          <div className="font-bold text-[var(--g-text-primary)] text-xs mb-1">{actorLabels[a]}</div>
                          <div className="text-[10px] text-[var(--g-text-secondary)] mb-1.5">{bloque.nombre}</div>
                          <ul className="space-y-0.5">
                            {cell.obligaciones.slice(0, 3).map((o, i) => (
                              <li key={i} className="text-[10px] text-[var(--g-text-primary)]">• {o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-5 text-[11px] text-[var(--g-text-secondary)]">
        <span className="font-bold uppercase tracking-wider text-[10px]">Intensidad:</span>
        {[
          { label: 'Nula', v: 0 },
          { label: 'Baja', v: 1 },
          { label: 'Media', v: 2 },
          { label: 'Alta', v: 3 },
        ].map(l => (
          <span key={l.v} className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-5 h-5 flex items-center justify-center rounded" style={{ background: intensidadColor(l.v) }}>
              <span className="text-[11px] font-bold" style={{ color: intensidadTextColor(l.v) }}>{intensidadPattern(l.v)}</span>
            </span>
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
};
