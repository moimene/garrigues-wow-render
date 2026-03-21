import { useMemo, useState } from 'react';
import { bloques, type Norma } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';
import { FilterState, normaPassesFilter, bloquePassesEstadoUE } from './VisualizationFilters';

const estadoColors: Record<string, string> = {
  directa: '#2563eb',
  transpuesta: '#059669',
  parcial: '#d97706',
  pendiente: '#dc2626',
  propuesta: '#6b7280',
};

const estadoLabels: Record<string, string> = {
  directa: 'Apl. directa',
  transpuesta: 'Transpuesta',
  parcial: 'Parcial',
  pendiente: 'Pendiente',
  propuesta: 'Propuesta',
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
  norma?: Norma;
  bloqueNombre?: string;
  bloqueColor?: string;
}

interface Props {
  filters?: FilterState;
  vistaEspana?: boolean;
}

export const ConstellationGraph = ({ filters, vistaEspana }: Props) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [activeBloque, setActiveBloque] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
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
          norma: n, bloqueNombre: b.nombre, bloqueColor: b.color,
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

        {/* Norma nodes — clickable */}
        {normaNodes.map(n => {
          const active = activeBloque === null || activeBloque === n.bloqueId;
          const isSelected = selectedNode?.id === n.id;
          const esHighlight = vistaEspana && n.estadoES && n.estadoES !== 'propuesta';
          return (
            <g
              key={n.id}
              style={{ transition: 'opacity 200ms ease', cursor: 'pointer' }}
              opacity={active ? 1 : 0.2}
              onClick={() => setSelectedNode(isSelected ? null : n)}
            >
              {vistaEspana && esHighlight && (
                <circle cx={n.x} cy={n.y} r={n.r + 5} fill="none" stroke={n.color} strokeWidth={1.5} opacity={0.4} />
              )}
              <circle
                cx={n.x} cy={n.y} r={isSelected ? n.r + 3 : (esHighlight ? n.r + 1 : n.r)}
                fill={n.color}
                stroke="white"
                strokeWidth={isSelected ? 2.5 : 1.5}
                style={{
                  filter: isSelected ? `drop-shadow(0 0 8px ${n.color})` : (esHighlight ? `drop-shadow(0 0 4px ${n.color})` : 'none'),
                  transition: 'all 300ms ease',
                }}
              />
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
              <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="10" fontWeight="700" fontFamily="Montserrat" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Selected norma detail panel */}
      {selectedNode?.norma && (
        <div
          className="w-full max-w-md text-left p-4 relative"
          style={{
            background: 'var(--g-surface-card)',
            borderRadius: 'var(--g-radius-md)',
            boxShadow: 'var(--g-shadow-dropdown)',
            borderLeft: `4px solid ${estadoColors[selectedNode.norma.estadoES] || '#6b7280'}`,
            animation: 'fade-in 0.2s ease-out',
          }}
        >
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-3 right-3 text-[var(--g-text-secondary)] hover:text-[var(--g-text-primary)] text-xs font-bold"
            style={{ transition: 'color 150ms ease' }}
          >
            ✕
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded"
              style={{ background: selectedNode.bloqueColor, color: 'white' }}
            >
              B{selectedNode.bloqueId}
            </span>
            <span className="text-[10px] font-medium text-[var(--g-text-secondary)]">
              {selectedNode.bloqueNombre}
            </span>
          </div>
          <div className="text-sm font-bold text-[var(--g-text-primary)] leading-snug">
            {selectedNode.norma.nombre}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                background: estadoColors[selectedNode.norma.estadoES] || '#6b7280',
                color: 'white',
              }}
            >
              {estadoLabels[selectedNode.norma.estadoES] || selectedNode.norma.estadoES}
            </span>
            <span className="text-[10px] font-medium text-[var(--g-text-secondary)]">
              {selectedNode.norma.tipo}
            </span>
            {selectedNode.norma.plazo !== '—' && (
              <span className="text-[10px] text-[var(--g-text-secondary)]">
                Plazo: {selectedNode.norma.plazo}
              </span>
            )}
          </div>
          {selectedNode.norma.transposicionES && (
            <p className="mt-2 text-[11px] text-[var(--g-text-secondary)] leading-relaxed">
              {selectedNode.norma.transposicionES}
            </p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-[11px]">
        {Object.entries(estadoColors).map(([key, color]) => (
          <span key={key} className="inline-flex items-center gap-1.5 font-semibold text-[var(--g-text-secondary)] capitalize">
            <span className="w-3 h-3 rounded-full" style={{ background: color }} />
            {estadoLabels[key] || key}
          </span>
        ))}
      </div>

      <p className="text-[11px] text-[var(--g-text-secondary)] text-center max-w-md">
        Pulse sobre un nodo de norma para ver su ficha. Pase el ratón sobre un bloque para resaltar sus normas.
      </p>
    </div>
  );
};
