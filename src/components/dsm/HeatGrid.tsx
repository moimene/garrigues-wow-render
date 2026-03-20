import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';
import { useState } from 'react';

export const HeatGrid = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [hovered, setHovered] = useState<number | null>(null);
  const maxNormas = Math.max(...bloques.map(b => b.normas.length));

  return (
    <div ref={ref} className="space-y-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {bloques.map((b, i) => {
          const intensity = b.normas.length / maxNormas;
          const transpuestas = b.normas.filter(n => n.estadoES === 'directa' || n.estadoES === 'transpuesta').length;
          const pct = Math.round((transpuestas / b.normas.length) * 100);
          const isH = hovered === b.id;

          return (
            <div
              key={b.id}
              className="relative cursor-pointer p-3 flex flex-col items-center justify-center text-center"
              style={{
                borderRadius: 'var(--g-radius-md)',
                background: `rgba(0, 68, 56, ${0.08 + intensity * 0.82})`,
                boxShadow: isH ? 'var(--g-shadow-card-hover)' : 'var(--g-shadow-sm)',
                transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
                transform: isH ? 'scale(1.04)' : 'scale(1)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${i * 60}ms`,
                minHeight: '110px',
              }}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="text-2xl font-bold tabular-nums" style={{ color: intensity > 0.4 ? 'var(--g-text-inverse)' : 'var(--g-brand-3308)' }}>
                {b.normas.length}
              </div>
              <div className="text-[10px] font-medium mt-1 leading-tight" style={{ color: intensity > 0.4 ? 'rgba(255,255,255,0.85)' : 'var(--g-text-primary)' }}>
                B{b.id}
              </div>
              <div className="mt-2 w-full h-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--g-radius-full)' }}>
                <div className="h-full" style={{ width: `${pct}%`, background: 'var(--status-success)', borderRadius: 'var(--g-radius-full)', transition: 'width 600ms ease-out' }} />
              </div>
              <div className="text-[9px] mt-0.5 font-medium" style={{ color: intensity > 0.4 ? 'rgba(255,255,255,0.7)' : 'var(--g-text-secondary)' }}>
                {pct}% impl.
              </div>

              {isH && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-20 px-3 py-2 min-w-[160px]" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-md)', boxShadow: 'var(--g-shadow-dropdown)', border: '1px solid var(--g-border-subtle)' }}>
                  <div className="text-xs font-bold text-[var(--g-text-primary)]">{b.nombre}</div>
                  <div className="text-[10px] text-[var(--g-text-secondary)] mt-0.5">{b.normas.length} normas · {transpuestas} implementadas</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Gradient scale */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--g-text-secondary)]">
        <span>Menos normas</span>
        <div className="w-32 h-2" style={{ background: 'linear-gradient(to right, rgba(0,68,56,0.1), rgba(0,68,56,0.9))', borderRadius: 'var(--g-radius-full)' }} />
        <span>Más normas</span>
      </div>
    </div>
  );
};
