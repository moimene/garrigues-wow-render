import { useMemo, useState } from 'react';
import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';
import { FilterState, normaPassesFilter, bloquePassesEstadoUE } from './VisualizationFilters';

const estadoColors: Record<string, string> = {
  directa: '#2563eb',
  transpuesta: '#059669',
  parcial: '#d97706',
  pendiente: '#dc2626',
  propuesta: '#6b7280',
};

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  type: 'bloque' | 'norma';
  estadoES?: string;
  bloqueId: number;
}

interface Props {
  filters?: FilterState;
}

export const ConstellationGraph = ({ filters }: Props) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [activeBloque, setActiveBloque] = useState<number | null>(null);
  const width = 800;
  const height = 620;
  const cx = width / 2;
  const cy = height / 2;

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

  const { bloqueNodes, normaNodes, links } = useMemo(() => {
    const bNodes: Node[] = [];
    const nNodes: Node[] = [];
    const lnks: { from: Node; to: Node }[] = [];
    const count = filteredBloques.length;

    filteredBloques.forEach((b, i) => {
      const angle = (i / Math.max(count, 1)) * Math.PI * 2 - Math.PI / 2;
      const orbitR = 190;
      const bNode: Node = {
        id: `b${b.id}`, label: `B${b.id}`, x: cx + orbitR * Math.cos(angle), y: cy + orbitR * Math.sin(angle),
        r: 28, color: b.color, type: 'bloque', bloqueId: b.id,
      };
      bNodes.push(bNode);

      b.normas.slice(0, 6).forEach((n, j) => {
        const nAngle = angle + ((j - b.normas.slice(0, 6).length / 2) * 0.18);
        const nOrbit = orbitR + 70 + j * 16;
        const color = estadoColors[n.estadoES] || '#6b7280';
        const nNode: Node = {
          id: `n${b.id}-${j}`, label: n.nombre.split(' ').slice(0, 2).join(' '),
          x: cx + nOrbit * Math.cos(nAngle), y: cy + nOrbit * Math.sin(nAngle),
          r: 9, color, type: 'norma', estadoES: n.estadoES, bloqueId: b.id,
        };
        nNodes.push(nNode);
        lnks.push({ from: bNode, to: nNode });
      });
    });

    return { bloqueNodes: bNodes, normaNodes: nNodes, links: lnks };
  }, [filteredBloques, cx, cy]);

  if (filteredBloques.length === 0) {
    return (
      <div ref={ref} className="flex items-center justify-center py-16 text-sm text-[var(--g-text-secondary)]">
        No hay datos que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-col items-center gap-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)' }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[800px]" role="img" aria-label="Diagrama de Constelación Normativa">
        {/* Links */}
        {links.map((l, i) => {
          const active = activeBloque === null || activeBloque === l.from.bloqueId;
          return (
            <line key={i} x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
              stroke={active ? l.from.color : '#d1d5db'}
              strokeWidth={active ? 1.8 : 0.5}
              opacity={active ? 0.7 : 0.2}
              style={{ transition: 'all 300ms ease' }}
            />
          );
        })}

        {/* Center hub */}
        <circle cx={cx} cy={cy} r={42} fill="var(--g-brand-3308)" />
        <circle cx={cx} cy={cy} r={42} fill="none" stroke="var(--g-sec-300)" strokeWidth={2} opacity={0.6} />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="13" fontWeight="700" fontFamily="Montserrat">DSM</text>

        {/* Orbit lines */}
        {bloqueNodes.map(bn => (
          <line key={`c-${bn.id}`} x1={cx} y1={cy} x2={bn.x} y2={bn.y} stroke={bn.color} strokeWidth={1} opacity={activeBloque === bn.bloqueId ? 0.5 : 0.15} strokeDasharray="4 3" style={{ transition: 'opacity 300ms ease' }} />
        ))}

        {/* Norma nodes */}
        {normaNodes.map(n => {
          const active = activeBloque === null || activeBloque === n.bloqueId;
          return (
            <g key={n.id} style={{ transition: 'opacity 200ms ease' }} opacity={active ? 1 : 0.2}>
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} stroke="white" strokeWidth={1.5} />
            </g>
          );
        })}

        {/* Block nodes */}
        {bloqueNodes.map(n => {
          const isActive = activeBloque === n.bloqueId;
          return (
            <g key={n.id} className="cursor-pointer"
              onMouseEnter={() => setActiveBloque(n.bloqueId)}
              onMouseLeave={() => setActiveBloque(null)}
            >
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} stroke="white" strokeWidth={2.5}
                style={{ filter: isActive ? `drop-shadow(0 0 6px ${n.color})` : 'none', transition: 'filter 200ms ease' }}
              />
              <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="700" fontFamily="Montserrat" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-[11px]">
        {Object.entries(estadoColors).map(([key, color]) => (
          <span key={key} className="inline-flex items-center gap-1.5 font-semibold text-[var(--g-text-secondary)] capitalize">
            <span className="w-3 h-3 rounded-full" style={{ background: color }} />
            {key}
          </span>
        ))}
      </div>

      <p className="text-xs text-[var(--g-text-secondary)] text-center max-w-md">
        Pasa el ratón sobre un bloque para resaltar sus normas. Los colores representan el estado de transposición en España.
      </p>
    </div>
  );
};
