import { useState } from 'react';
import { type Bloque } from '@/data/dsmData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useScrollReveal } from './useScrollReveal';

const estadoLabel: Record<string, { label: string; bg: string; text: string }> = {
  directa: { label: 'Aplicación directa', bg: 'var(--status-directa)', text: 'var(--g-text-inverse)' },
  transpuesta: { label: 'Transpuesta', bg: 'var(--status-transpuesta)', text: 'var(--g-text-inverse)' },
  parcial: { label: 'Parcial', bg: 'var(--status-parcial)', text: 'var(--g-text-inverse)' },
  pendiente: { label: 'Pendiente', bg: 'var(--status-pendiente)', text: 'var(--g-text-inverse)' },
  propuesta: { label: 'Propuesta', bg: 'var(--status-propuesta)', text: 'var(--g-text-inverse)' },
};

interface BlockCardProps {
  bloque: Bloque;
  index: number;
}

export const BlockCard = ({ bloque, index }: BlockCardProps) => {
  const [open, setOpen] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <div
        ref={ref}
        onClick={() => setOpen(true)}
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
            <span className="text-[var(--g-link)] group-hover:text-[var(--g-link-hover)]" style={{ transition: 'var(--g-transition-fast)' }}>Ver detalle →</span>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" style={{ borderRadius: 'var(--g-radius-xl)', boxShadow: 'var(--g-shadow-modal)' }}>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-sm font-bold" style={{ background: bloque.color, color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-full)' }}>
                {bloque.id}
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-[var(--g-text-primary)]">{bloque.nombre}</DialogTitle>
                <DialogDescription className="text-xs text-[var(--g-text-secondary)]">{bloque.descripcion}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-2 space-y-2">
            {bloque.normas.map((norma, i) => {
              const est = estadoLabel[norma.estadoES];
              return (
                <div key={i} className="p-3" style={{ background: 'var(--g-surface-page)', borderRadius: 'var(--g-radius-md)', border: '1px solid var(--g-border-subtle)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-[var(--g-text-primary)]">{norma.nombre}</span>
                        <span className="px-1.5 py-0.5 text-[10px] font-medium" style={{ background: norma.tipo === 'Reglamento' ? 'var(--status-directa)' : norma.tipo === 'Directiva' ? 'var(--status-proceso)' : 'var(--status-propuesta)', color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-sm)' }}>
                          {norma.tipo}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--g-text-secondary)] leading-relaxed">{norma.transposicionES}</p>
                    </div>
                    <span className="flex-shrink-0 px-2 py-0.5 text-[10px] font-medium" style={{ background: est.bg, color: est.text, borderRadius: 'var(--g-radius-sm)' }}>
                      {est.label}
                    </span>
                  </div>
                  {norma.plazo !== '—' && (
                    <div className="mt-1.5 text-[10px] text-[var(--g-text-secondary)]">📅 {norma.plazo}</div>
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
