import { useState, useMemo } from 'react';
import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';
import { FilterState, normaPassesFilter, bloquePassesEstadoUE } from './VisualizationFilters';

interface Props {
  filters?: FilterState;
}

const estadoColors: Record<string, string> = {
  directa: '#2563eb',
  transpuesta: '#059669',
  parcial: '#d97706',
  pendiente: '#dc2626',
  propuesta: '#6b7280',
};

export const SunburstMap = ({ filters }: Props) => {
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal(0.2);
  const size = 640;
  const cx = size / 2;
  const cy = size / 2;

  const filteredBloques = useMemo(() => {
    if (!filters) return bloques;
    return bloques
      .filter(b => bloquePassesEstadoUE(b, filters.estadoUE))
      .map(b => ({
        ...b,
        normas: b.normas.filter(n => normaPassesFilter(n, b, filters)),
      }))
      .filter(b => b.normas.length > 0);
  }, [filters]);

  const totalNormas = filteredBloques.reduce((s, b) => s + b.normas.length, 0);

  const segments = useMemo(() => {
    let startAngle = -90;
    return filteredBloques.map(b => {
      const sweep = totalNormas > 0 ? (b.normas.length / totalNormas) * 360 : 0;
      const seg = { bloque: b, startAngle, sweep };
      startAngle += sweep;
      return seg;
    });
  }, [filteredBloques, totalNormas]);

  const describeArc = (cx: number, cy: number, r1: number, r2: number, startDeg: number, sweepDeg: number) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const s = toRad(startDeg);
    const e = toRad(startDeg + sweepDeg);
    const largeArc = sweepDeg > 180 ? 1 : 0;
    const x1o = cx + r2 * Math.cos(s), y1o = cy + r2 * Math.sin(s);
    const x2o = cx + r2 * Math.cos(e), y2o = cy + r2 * Math.sin(e);
    const x1i = cx + r1 * Math.cos(e), y1i = cy + r1 * Math.sin(e);
    const x2i = cx + r1 * Math.cos(s), y2i = cy + r1 * Math.sin(s);
    return `M${x1o},${y1o} A${r2},${r2} 0 ${largeArc} 1 ${x2o},${y2o} L${x1i},${y1i} A${r1},${r1} 0 ${largeArc} 0 ${x2i},${y2i} Z`;
  };

  if (totalNormas === 0) {
    return (
      <div ref={ref} className="flex items-center justify-center py-16 text-sm text-[var(--g-text-secondary)]">
        No hay normas que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-col items-center gap-6" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.92)', transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)' }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[480px]" role="img" aria-label="Mapa Radial Sunburst del DSM">
        {/* Center hub */}
        <circle cx={cx} cy={cy} r={52} fill="var(--g-brand-3308)" />
        <circle cx={cx} cy={cy} r={52} fill="none" stroke="var(--g-sec-300)" strokeWidth={2} opacity={0.5} />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Montserrat">DSM</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--g-sec-300)" fontSize="9" fontWeight="600" fontFamily="Montserrat">{filteredBloques.length} Bloques</text>
        <text x={cx} y={cy + 24} textAnchor="middle" fill="var(--g-sec-300)" fontSize="9" fontWeight="500" fontFamily="Montserrat">{totalNormas} Normas</text>

        {segments.map(({ bloque, startAngle, sweep }) => {
          const isHovered = hoveredBlock === bloque.id;
          const midAngle = ((startAngle + sweep / 2) * Math.PI) / 180;
          const labelR = 100;
          return (
            <g key={bloque.id} onMouseEnter={() => setHoveredBlock(bloque.id)} onMouseLeave={() => setHoveredBlock(null)} style={{ cursor: 'pointer' }}>
              {/* Block ring - thicker, fully opaque */}
              <path
                d={describeArc(cx, cy, 58, 115, startAngle, sweep - 0.8)}
                fill={bloque.color}
                opacity={isHovered ? 1 : 0.92}
                stroke="white"
                strokeWidth={0.8}
                style={{ transition: 'opacity 150ms ease, filter 150ms ease', filter: isHovered ? 'brightness(1.2) saturate(1.2)' : 'none' }}
              />
              {sweep > 14 && (
                <text x={cx + labelR * Math.cos(midAngle)} y={cy + labelR * Math.sin(midAngle)} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="700" fontFamily="Montserrat" style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                  B{bloque.id}
                </text>
              )}
              {/* Norma ring - vivid status colors */}
              {bloque.normas.map((norma, j) => {
                const normaSweep = (1 / totalNormas) * 360;
                const normaStart = startAngle + j * normaSweep;
                const color = estadoColors[norma.estadoES] || '#6b7280';
                return (
                  <path
                    key={j}
                    d={describeArc(cx, cy, 120, 165, normaStart, normaSweep - 0.4)}
                    fill={color}
                    opacity={isHovered ? 1 : 0.75}
                    stroke="white"
                    strokeWidth={0.3}
                    style={{ transition: 'opacity 200ms ease' }}
                  >
                    <title>{norma.nombre} — {norma.estadoES}</title>
                  </path>
                );
              })}
            </g>
          );
        })}
      </svg>

      {hoveredBlock && (() => {
        const b = filteredBloques.find(b => b.id === hoveredBlock);
        return b ? (
          <div className="text-center px-5 py-3" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: 'var(--g-shadow-dropdown)', borderLeft: `4px solid ${b.color}` }}>
            <div className="text-sm font-bold text-[var(--g-text-primary)]">{b.nombre}</div>
            <div className="text-xs text-[var(--g-text-secondary)]">{b.normas.length} normas</div>
          </div>
        ) : null;
      })()}

      <div className="flex flex-wrap justify-center gap-4 text-[11px]">
        {[
          { label: 'Apl. directa', color: estadoColors.directa },
          { label: 'Transpuesta', color: estadoColors.transpuesta },
          { label: 'Parcial', color: estadoColors.parcial },
          { label: 'Pendiente', color: estadoColors.pendiente },
          { label: 'Propuesta', color: estadoColors.propuesta },
        ].map(l => (
          <span key={l.label} className="inline-flex items-center gap-1.5 font-semibold text-[var(--g-text-secondary)]">
            <span className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
};
