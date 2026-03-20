import { useState } from 'react';
import { type Bloque } from '@/data/dsmData';
import { AreaDetailPanel } from './AreaDetailPanel';
import { useScrollReveal } from './useScrollReveal';

interface BlockCardProps {
  bloque: Bloque;
  index: number;
}

export const BlockCard = ({ bloque, index }: BlockCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <div
        ref={ref}
        onClick={() => setExpanded(!expanded)}
        className="group cursor-pointer overflow-hidden"
        style={{
          background: 'var(--g-surface-card)',
          borderRadius: 'var(--g-radius-lg)',
          boxShadow: 'var(--g-shadow-card)',
          borderLeft: `4px solid ${bloque.color}`,
          transition: 'box-shadow 300ms cubic-bezier(0.16,1,0.3,1), transform 300ms cubic-bezier(0.16,1,0.3,1)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transitionDelay: `${index * 80}ms`,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'var(--g-shadow-card-hover)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'var(--g-shadow-card)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-sm font-bold"
              style={{
                background: bloque.color,
                color: 'var(--g-text-inverse)',
                borderRadius: 'var(--g-radius-full)',
              }}
            >
              {bloque.id}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold leading-snug text-[var(--g-text-primary)]">{bloque.nombre}</h3>
              <p className="mt-1 text-xs text-[var(--g-text-secondary)] leading-relaxed line-clamp-2">{bloque.descripcion}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {bloque.vigentes > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium" style={{ background: 'var(--g-sec-100)', color: 'var(--g-brand-3308)', borderRadius: 'var(--g-radius-sm)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--status-vigente)' }} />
                {bloque.vigentes} vigentes
              </span>
            )}
            {bloque.enProceso > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium" style={{ background: '#fef3c7', color: '#92400e', borderRadius: 'var(--g-radius-sm)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--status-proceso)' }} />
                {bloque.enProceso} en proceso
              </span>
            )}
            {bloque.planificadas > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium" style={{ background: '#e2e8f0', color: '#475569', borderRadius: 'var(--g-radius-sm)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--status-planificada)' }} />
                {bloque.planificadas} planificadas
              </span>
            )}
            {bloque.enRevision > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium" style={{ background: '#f1f5f9', color: '#64748b', borderRadius: 'var(--g-radius-sm)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--status-revision)' }} />
                {bloque.enRevision} en revisión
              </span>
            )}
          </div>

          <div className="mt-3 pt-3 flex items-center justify-between text-[10px] font-medium text-[var(--g-text-secondary)]" style={{ borderTop: '1px solid var(--g-border-subtle)' }}>
            <span>{bloque.reglamentos} Reg. + {bloque.directivas} Dir.</span>
            <span className="text-[var(--g-link)] group-hover:text-[var(--g-link-hover)]" style={{ transition: 'var(--g-transition-fast)' }}>
              {expanded ? 'Cerrar ↑' : 'Ver detalle →'}
            </span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="col-span-full mt-2 mb-2">
          <AreaDetailPanel bloque={bloque} onClose={() => setExpanded(false)} />
        </div>
      )}
    </>
  );
};
