import { useMemo, useState } from 'react';
import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const depTypeConfig = {
  complementariedad: { label: 'Complementaria', color: 'var(--status-directa)' },
  dependencia: { label: 'Dependencia', color: 'var(--status-proceso)' },
  conflicto: { label: 'Conflicto', color: 'var(--status-pendiente)' },
};

interface Cell {
  tipo: 'complementariedad' | 'dependencia' | 'conflicto' | null;
  desc: string;
}

export const InteractionsMatrix = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [hoveredCell, setHoveredCell] = useState<{ from: number; to: number } | null>(null);

  const matrix = useMemo(() => {
    const m: Record<string, Cell> = {};
    bloques.forEach(b => {
      b.dependencias.forEach(d => {
        m[`${b.id}-${d.areaId}`] = { tipo: d.tipo, desc: d.descripcion };
      });
    });
    return m;
  }, []);

  const cellColor = (cell: Cell | undefined) => {
    if (!cell?.tipo) return 'transparent';
    return depTypeConfig[cell.tipo].color;
  };

  return (
    <div ref={ref} className="space-y-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="overflow-x-auto">
        <table className="border-collapse text-[10px]" style={{ minWidth: '480px' }}>
          <thead>
            <tr>
              <th className="p-1.5" />
              {bloques.map(b => (
                <th key={b.id} className="p-1.5 text-center font-bold" style={{ color: b.color, minWidth: '32px' }}>
                  B{b.id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloques.map(bRow => (
              <tr key={bRow.id}>
                <td className="p-1.5 font-bold text-right pr-3 whitespace-nowrap" style={{ color: bRow.color }}>
                  B{bRow.id}
                </td>
                {bloques.map(bCol => {
                  const key = `${bRow.id}-${bCol.id}`;
                  const cell = matrix[key];
                  const isDiag = bRow.id === bCol.id;
                  const isH = hoveredCell?.from === bRow.id && hoveredCell?.to === bCol.id;

                  return (
                    <td
                      key={bCol.id}
                      className="relative p-0 cursor-pointer"
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid var(--g-border-subtle)',
                      }}
                      onMouseEnter={() => !isDiag && setHoveredCell({ from: bRow.id, to: bCol.id })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: isDiag ? `${bRow.color}18` : cell?.tipo ? `${cellColor(cell)}20` : 'transparent',
                          transition: 'all 150ms ease',
                          transform: isH ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >
                        {isDiag ? (
                          <span className="text-[9px] font-bold" style={{ color: bRow.color }}>■</span>
                        ) : cell?.tipo ? (
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: cellColor(cell), opacity: 0.7 }} />
                        ) : null}
                      </div>

                      {isH && cell?.desc && (
                        <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] p-2.5 text-left" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: 'var(--g-shadow-dropdown)', border: '1px solid var(--g-border-subtle)' }}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-[var(--g-text-primary)]">B{bRow.id} → B{bCol.id}</span>
                            {cell.tipo && (
                              <span className="text-[9px] font-medium px-1 py-0.5" style={{ color: cellColor(cell), background: `${cellColor(cell)}15`, borderRadius: 'var(--g-radius-sm)' }}>
                                {depTypeConfig[cell.tipo].label}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[var(--g-text-secondary)] leading-relaxed">{cell.desc}</p>
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
        {Object.entries(depTypeConfig).map(([key, cfg]) => (
          <span key={key} className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color, opacity: 0.7 }} />
            {cfg.label}
          </span>
        ))}
      </div>
    </div>
  );
};
