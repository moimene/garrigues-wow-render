import { useMemo, useState } from 'react';
import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const depTypeConfig = {
  complementariedad: { label: 'Complementaria', color: '#2563eb', symbol: '◆' },
  dependencia: { label: 'Dependencia', color: '#d97706', symbol: '▲' },
  conflicto: { label: 'Conflicto', color: '#dc2626', symbol: '■' },
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

  return (
    <div ref={ref} className="space-y-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="overflow-x-auto">
        <table className="border-collapse text-[11px]" style={{ minWidth: '520px' }}>
          <thead>
            <tr>
              <th className="p-2" />
              {bloques.map(b => (
                <th key={b.id} className="p-2 text-center font-bold text-[11px]" style={{ color: b.color, minWidth: '36px' }}>
                  B{b.id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloques.map(bRow => (
              <tr key={bRow.id}>
                <td className="p-2 font-bold text-right pr-3 whitespace-nowrap text-[11px]" style={{ color: bRow.color }} title={bRow.nombre}>
                  B{bRow.id}
                </td>
                {bloques.map(bCol => {
                  const key = `${bRow.id}-${bCol.id}`;
                  const cell = matrix[key];
                  const isDiag = bRow.id === bCol.id;
                  const isH = hoveredCell?.from === bRow.id && hoveredCell?.to === bCol.id;
                  const cfg = cell?.tipo ? depTypeConfig[cell.tipo] : null;

                  return (
                    <td
                      key={bCol.id}
                      className="relative p-0 cursor-pointer"
                      style={{
                        width: '36px',
                        height: '36px',
                        border: '2px solid var(--g-surface-card)',
                      }}
                      onMouseEnter={() => !isDiag && setHoveredCell({ from: bRow.id, to: bCol.id })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center rounded-sm"
                        style={{
                          background: isDiag ? bRow.color : cfg ? `${cfg.color}25` : 'var(--g-surface-muted)',
                          transition: 'all 150ms ease',
                          transform: isH ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >
                        {isDiag ? (
                          <span className="text-[11px] font-bold text-white">■</span>
                        ) : cfg ? (
                          <span className="text-[13px] font-bold" style={{ color: cfg.color }}>{cfg.symbol}</span>
                        ) : null}
                      </div>

                      {isH && cell?.desc && (
                        <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-[240px] p-3 text-left" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: 'var(--g-shadow-dropdown)', border: `2px solid ${cfg?.color || 'var(--g-border-subtle)'}` }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-xs text-[var(--g-text-primary)]">B{bRow.id} → B{bCol.id}</span>
                            {cfg && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ color: 'white', background: cfg.color }}>
                                {cfg.label}
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
      <div className="flex flex-wrap items-center justify-center gap-5 text-[11px] text-[var(--g-text-secondary)]">
        {Object.entries(depTypeConfig).map(([key, cfg]) => (
          <span key={key} className="inline-flex items-center gap-2 font-semibold">
            <span className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: `${cfg.color}25` }}>
              <span className="text-[12px] font-bold" style={{ color: cfg.color }}>{cfg.symbol}</span>
            </span>
            {cfg.label}
          </span>
        ))}
      </div>
    </div>
  );
};
