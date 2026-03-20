import { useState, useMemo } from 'react';
import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

export const SunburstMap = () => {
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal(0.2);
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;

  const totalNormas = bloques.reduce((s, b) => s + b.normas.length, 0);

  const segments = useMemo(() => {
    let startAngle = -90;
    return bloques.map(b => {
      const sweep = (b.normas.length / totalNormas) * 360;
      const seg = { bloque: b, startAngle, sweep };
      startAngle += sweep;
      return seg;
    });
  }, [totalNormas]);

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

  return (
    <div ref={ref} className="flex flex-col items-center gap-6" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.92)', transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)' }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[480px]" role="img" aria-label="Mapa Radial Sunburst del DSM">
        {/* Center circle */}
        <circle cx={cx} cy={cy} r={52} fill="var(--g-brand-3308)" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="var(--g-text-inverse)" fontSize="11" fontWeight="700" fontFamily="Montserrat">DSM</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="var(--g-sec-300)" fontSize="8" fontWeight="500" fontFamily="Montserrat">12 Bloques</text>
        <text x={cx} y={cy + 22} textAnchor="middle" fill="var(--g-sec-300)" fontSize="8" fontWeight="500" fontFamily="Montserrat">{totalNormas} Normas</text>

        {/* Block ring */}
        {segments.map(({ bloque, startAngle, sweep }, i) => {
          const isHovered = hoveredBlock === bloque.id;
          const midAngle = ((startAngle + sweep / 2) * Math.PI) / 180;
          const labelR = 100;
          return (
            <g key={bloque.id}
              onMouseEnter={() => setHoveredBlock(bloque.id)}
              onMouseLeave={() => setHoveredBlock(null)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={describeArc(cx, cy, 58, 105, startAngle, sweep - 1)}
                fill={bloque.color}
                opacity={isHovered ? 1 : 0.8}
                style={{ transition: 'opacity 150ms ease, filter 150ms ease', filter: isHovered ? 'brightness(1.15)' : 'none' }}
              />
              {sweep > 18 && (
                <text
                  x={cx + labelR * Math.cos(midAngle)}
                  y={cy + labelR * Math.sin(midAngle)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="var(--g-text-inverse)"
                  fontSize="7"
                  fontWeight="600"
                  fontFamily="Montserrat"
                  style={{ pointerEvents: 'none' }}
                >
                  {bloque.id}
                </text>
              )}

              {/* Norma sub-segments */}
              {bloque.normas.map((norma, j) => {
                const normaSweep = (1 / totalNormas) * 360;
                const normaStart = startAngle + j * normaSweep;
                const estadoColor = norma.estadoES === 'directa' ? 'var(--status-directa)' :
                  norma.estadoES === 'transpuesta' ? 'var(--status-transpuesta)' :
                  norma.estadoES === 'parcial' ? 'var(--status-parcial)' :
                  norma.estadoES === 'pendiente' ? 'var(--status-pendiente)' : 'var(--status-propuesta)';
                return (
                  <path
                    key={j}
                    d={describeArc(cx, cy, 110, 150, normaStart, normaSweep - 0.5)}
                    fill={estadoColor}
                    opacity={isHovered ? 0.9 : 0.5}
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

      {/* Tooltip */}
      {hoveredBlock && (
        <div className="text-center px-4 py-2" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: 'var(--g-shadow-dropdown)' }}>
          <div className="text-sm font-bold text-[var(--g-text-primary)]">
            {bloques.find(b => b.id === hoveredBlock)?.nombre}
          </div>
          <div className="text-xs text-[var(--g-text-secondary)]">
            {bloques.find(b => b.id === hoveredBlock)?.normas.length} normas
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 text-[10px]">
        {[
          { label: 'Apl. directa', color: 'var(--status-directa)' },
          { label: 'Transpuesta', color: 'var(--status-transpuesta)' },
          { label: 'Parcial', color: 'var(--status-parcial)' },
          { label: 'Pendiente', color: 'var(--status-pendiente)' },
          { label: 'Propuesta', color: 'var(--status-propuesta)' },
        ].map(l => (
          <span key={l.label} className="inline-flex items-center gap-1 font-medium text-[var(--g-text-secondary)]">
            <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
};
