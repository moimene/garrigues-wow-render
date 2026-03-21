import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';
import { useState, useMemo } from 'react';
import { FilterState, normaPassesFilter, bloquePassesEstadoUE } from './VisualizationFilters';

interface Props {
  filters?: FilterState;
}

export const HeatGrid = ({ filters }: Props) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [hovered, setHovered] = useState<number | null>(null);

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

  const maxNormas = Math.max(...filteredBloques.map(b => b.normas.length), 1);

  if (filteredBloques.length === 0) {
    return (
      <div ref={ref} className="flex items-center justify-center py-16 text-sm text-[var(--g-text-secondary)]">
        No hay bloques que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredBloques.map((b, i) => {
          const intensity = b.normas.length / maxNormas;
          const transpuestas = b.normas.filter(n => n.estadoES === 'directa' || n.estadoES === 'transpuesta').length;
          const pct = Math.round((transpuestas / b.normas.length) * 100);
          const isH = hovered === b.id;

          return (
            <div
              key={b.id}
              className="relative cursor-pointer p-3 flex flex-col items-center justify-center text-center"
              style={{
                borderRadius: 'var(--g-radius-lg)',
                background: b.color,
                boxShadow: isH ? `0 8px 24px ${b.color}55` : 'var(--g-shadow-card)',
                transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
                transform: isH ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${i * 60}ms`,
                minHeight: '120px',
                borderLeft: `4px solid ${b.color}`,
                filter: isH ? 'brightness(1.12)' : 'none',
              }}
            >
              <div className="text-3xl font-bold tabular-nums text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                {b.normas.length}
              </div>
              <div className="text-[11px] font-bold mt-1 leading-tight text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
                B{b.id}
              </div>
              <div className="mt-2.5 w-full h-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 'var(--g-radius-full)' }}>
                <div className="h-full" style={{ width: `${pct}%`, background: 'rgba(255,255,255,0.9)', borderRadius: 'var(--g-radius-full)', transition: 'width 600ms ease-out' }} />
              </div>
              <div className="text-[10px] mt-1 font-bold text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {pct}% impl.
              </div>

              {isH && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-20 px-4 py-3 min-w-[180px]" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: 'var(--g-shadow-dropdown)', border: `2px solid ${b.color}` }}>
                  <div className="text-xs font-bold text-[var(--g-text-primary)]">{b.nombre}</div>
                  <div className="text-[10px] text-[var(--g-text-secondary)] mt-0.5">{b.normas.length} normas · {transpuestas} implementadas</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-[var(--g-text-secondary)] mt-4">
        {filteredBloques.slice(0, 6).map(b => (
          <span key={b.id} className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-3 h-3 rounded" style={{ background: b.color }} />
            B{b.id}
          </span>
        ))}
        {filteredBloques.length > 6 && <span className="font-medium">+{filteredBloques.length - 6} más</span>}
      </div>
    </div>
  );
};
