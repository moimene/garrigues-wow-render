import { useMemo, useState } from 'react';
import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

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

export const ConstellationGraph = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [activeBloque, setActiveBloque] = useState<number | null>(null);
  const width = 700;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;

  const { bloqueNodes, normaNodes, links } = useMemo(() => {
    const bNodes: Node[] = [];
    const nNodes: Node[] = [];
    const lnks: { from: Node; to: Node }[] = [];

    bloques.forEach((b, i) => {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const orbitR = 150;
      const bNode: Node = {
        id: `b${b.id}`, label: `B${b.id}`, x: cx + orbitR * Math.cos(angle), y: cy + orbitR * Math.sin(angle),
        r: 18, color: b.color, type: 'bloque', bloqueId: b.id,
      };
      bNodes.push(bNode);

      b.normas.slice(0, 6).forEach((n, j) => {
        const nAngle = angle + ((j - b.normas.slice(0, 6).length / 2) * 0.18);
        const nOrbit = orbitR + 55 + j * 12;
        const nNode: Node = {
          id: `n${b.id}-${j}`, label: n.nombre.split(' ').slice(0, 2).join(' '),
          x: cx + nOrbit * Math.cos(nAngle), y: cy + nOrbit * Math.sin(nAngle),
          r: 5, color: n.estadoES === 'directa' ? 'var(--status-directa)' : n.estadoES === 'transpuesta' ? 'var(--status-transpuesta)' : n.estadoES === 'parcial' ? 'var(--status-parcial)' : n.estadoES === 'pendiente' ? 'var(--status-pendiente)' : 'var(--status-propuesta)',
          type: 'norma', estadoES: n.estadoES, bloqueId: b.id,
        };
        nNodes.push(nNode);
        lnks.push({ from: bNode, to: nNode });
      });
    });

    return { bloqueNodes: bNodes, normaNodes: nNodes, links: lnks };
  }, [cx, cy]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)' }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[680px]" role="img" aria-label="Diagrama de Constelación Normativa">
        {/* Links */}
        {links.map((l, i) => {
          const active = activeBloque === null || activeBloque === l.from.bloqueId;
          return (
            <line key={i} x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
              stroke={l.from.color} strokeWidth={active ? 1.2 : 0.3} opacity={active ? 0.5 : 0.1}
              style={{ transition: 'all 300ms ease' }}
            />
          );
        })}

        {/* Center */}
        <circle cx={cx} cy={cy} r={30} fill="var(--g-brand-3308)" />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central" fill="var(--g-text-inverse)" fontSize="9" fontWeight="700" fontFamily="Montserrat">DSM</text>

        {/* Center connections */}
        {bloqueNodes.map(bn => (
          <line key={`c-${bn.id}`} x1={cx} y1={cy} x2={bn.x} y2={bn.y} stroke="var(--g-sec-300)" strokeWidth={0.6} opacity={0.25} />
        ))}

        {/* Norma nodes */}
        {normaNodes.map(n => {
          const active = activeBloque === null || activeBloque === n.bloqueId;
          return (
            <g key={n.id} style={{ transition: 'opacity 200ms ease' }} opacity={active ? 1 : 0.15}>
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
              <title>{n.label}</title>
            </g>
          );
        })}

        {/* Bloque nodes */}
        {bloqueNodes.map(n => (
          <g key={n.id} className="cursor-pointer"
            onMouseEnter={() => setActiveBloque(n.bloqueId)}
            onMouseLeave={() => setActiveBloque(null)}
          >
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} stroke="var(--g-surface-card)" strokeWidth={2} />
            <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="central" fill="var(--g-text-inverse)" fontSize="8" fontWeight="700" fontFamily="Montserrat">{n.label}</text>
          </g>
        ))}
      </svg>

      <p className="text-xs text-[var(--g-text-secondary)] text-center max-w-md">
        Pasa el ratón sobre un bloque para resaltar sus normas y conexiones. Los colores de los nodos externos representan el estado de transposición en España.
      </p>
    </div>
  );
};
