import { useMemo, useState } from 'react';
import { bloques, actorLabels, ActorType } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const allActors: ActorType[] = ['plataformas', 'fabricantes', 'proveedores', 'administraciones', 'pymes', 'financieras', 'telecoms', 'medios'];

const intensidadValue = { alta: 3, media: 2, baja: 1, nula: 0 };
const intensidadColor = (v: number) => {
  if (v === 0) return 'var(--g-surface-page)';
  if (v === 1) return 'rgba(0,68,56,0.12)';
  if (v === 2) return 'rgba(0,68,56,0.35)';
  return 'rgba(0,68,56,0.7)';
};
const intensidadPattern = (v: number) => {
  if (v === 0) return '—';
  if (v === 1) return '○';
  if (v === 2) return '◑';
  return '●';
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[10px]" style={{ minWidth: '640px' }}>
          <thead>
            <tr>
              <th className="text-left p-2 font-bold text-[var(--g-text-secondary)] uppercase tracking-wider" style={{ width: '140px' }}>Bloque</th>
              {allActors.map(a => (
                <th key={a} className="p-2 text-center font-bold text-[var(--g-text-secondary)] uppercase tracking-wider" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: '90px', minWidth: '36px' }}>
                  {actorLabels[a].split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map(({ bloque, actors }, rowIdx) => (
              <tr key={bloque.id}>
                <td className="p-2 font-medium text-[var(--g-text-primary)]" style={{ borderBottom: '1px solid var(--g-border-subtle)' }}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: bloque.color }} />
                    <span className="truncate">B{bloque.id}</span>
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
                        borderBottom: '1px solid var(--g-border-subtle)',
                        borderRight: '1px solid var(--g-border-subtle)',
                        transition: 'all 150ms ease',
                        transform: isH ? 'scale(1.08)' : 'scale(1)',
                      }}
                      onMouseEnter={() => setHoveredCell({ bloqueId: bloque.id, actor: a })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-xs font-bold" style={{ color: cell.intensidad > 2 ? 'var(--g-text-inverse)' : 'var(--g-text-primary)' }} aria-label={`Intensidad ${cell.intensidad}`}>
                        {intensidadPattern(cell.intensidad)}
                      </span>
                      {isH && cell.obligaciones.length > 0 && (
                        <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-[200px] p-2.5 text-left" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: 'var(--g-shadow-dropdown)', border: '1px solid var(--g-border-subtle)' }}>
                          <div className="font-bold text-[var(--g-text-primary)] mb-1">{actorLabels[a]}</div>
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
      <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-[var(--g-text-secondary)]">
        <span className="font-bold uppercase tracking-wider">Intensidad:</span>
        {[
          { label: 'Nula —', v: 0 },
          { label: 'Baja ○', v: 1 },
          { label: 'Media ◑', v: 2 },
          { label: 'Alta ●', v: 3 },
        ].map(l => (
          <span key={l.v} className="inline-flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center" style={{ background: intensidadColor(l.v), borderRadius: '3px' }}>
              <span className="text-[9px]" style={{ color: l.v > 2 ? 'var(--g-text-inverse)' : 'var(--g-text-primary)' }}>{intensidadPattern(l.v)}</span>
            </span>
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
};
