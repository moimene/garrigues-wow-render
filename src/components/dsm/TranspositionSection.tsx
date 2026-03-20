import { useState } from 'react';
import { bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';
import { ChevronDown } from 'lucide-react';

const estadoBadge: Record<string, { label: string; bg: string }> = {
  directa: { label: 'Apl. directa', bg: 'var(--status-directa)' },
  transpuesta: { label: 'Transpuesta', bg: 'var(--status-transpuesta)' },
  parcial: { label: 'Parcial', bg: 'var(--status-parcial)' },
  pendiente: { label: 'Pendiente', bg: 'var(--status-pendiente)' },
  propuesta: { label: 'Propuesta', bg: 'var(--status-propuesta)' },
};

export const TranspositionSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {bloques.map((b, idx) => {
        const transpuestas = b.normas.filter(n => n.estadoES === 'directa' || n.estadoES === 'transpuesta').length;
        const pct = Math.round((transpuestas / b.normas.length) * 100);
        const isOpen = expanded === b.id;

        return <TranspositionBlock key={b.id} bloque={b} pct={pct} transpuestas={transpuestas} isOpen={isOpen} onToggle={() => setExpanded(isOpen ? null : b.id)} index={idx} />;
      })}
    </div>
  );
};

const TranspositionBlock = ({ bloque, pct, transpuestas, isOpen, onToggle, index }: any) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)', transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${index * 60}ms` }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left"
        style={{
          background: 'var(--g-surface-card)',
          borderRadius: isOpen ? 'var(--g-radius-lg) var(--g-radius-lg) 0 0' : 'var(--g-radius-lg)',
          boxShadow: 'var(--g-shadow-card)',
          borderLeft: `4px solid ${bloque.color}`,
          transition: 'box-shadow var(--g-transition-normal)',
        }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--g-text-primary)]">
              {bloque.id}. {bloque.nombre}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-2 overflow-hidden" style={{ background: 'var(--g-surface-muted)', borderRadius: 'var(--g-radius-full)' }}>
              <div className="h-full" style={{ width: `${pct}%`, background: pct === 100 ? 'var(--status-success)' : pct > 60 ? 'var(--g-brand-bright)' : 'var(--status-proceso)', borderRadius: 'var(--g-radius-full)', transition: 'width 600ms ease-out' }} />
            </div>
            <span className="text-xs font-bold tabular-nums text-[var(--g-text-primary)] w-12 text-right">{pct}%</span>
          </div>
          <div className="mt-1 text-[10px] text-[var(--g-text-secondary)]">{transpuestas}/{bloque.normas.length} normas implementadas</div>
        </div>
        <ChevronDown className="w-4 h-4 text-[var(--g-text-secondary)] flex-shrink-0" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform var(--g-transition-normal)' }} />
      </button>

      {isOpen && (
        <div style={{ background: 'var(--g-surface-card)', borderRadius: '0 0 var(--g-radius-lg) var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)', borderLeft: `4px solid ${bloque.color}` }}>
          <div className="px-4 pb-4 space-y-2">
            {bloque.normas.map((norma: any, i: number) => {
              const badge = estadoBadge[norma.estadoES];
              return (
                <div key={i} className="flex items-start gap-3 p-2.5" style={{ background: 'var(--g-surface-page)', borderRadius: 'var(--g-radius-md)' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-[var(--g-text-primary)]">{norma.nombre}</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-medium" style={{ background: badge.bg, color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-sm)' }}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-[var(--g-text-secondary)] leading-relaxed">{norma.transposicionES}</p>
                  </div>
                  {norma.plazo !== '—' && (
                    <span className="flex-shrink-0 text-[10px] text-[var(--g-text-secondary)] font-medium">{norma.plazo}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
