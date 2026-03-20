import { cronologia } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const estadoColors: Record<string, string> = {
  vigente: 'var(--status-vigente)',
  proceso: 'var(--status-proceso)',
  planificada: 'var(--status-planificada)',
  revision: 'var(--status-revision)',
};

const TimelineNode = ({ event, index }: { event: typeof cronologia[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex items-start gap-0 md:gap-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(20px)`,
        transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      }}
    >
      {/* Mobile: simple left-aligned */}
      <div className="md:hidden flex gap-3 w-full">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-3.5 h-3.5 rounded-full border-[3px] z-10" style={{ borderColor: estadoColors[event.estado], background: 'var(--g-surface-card)' }} />
          <div className="w-0.5 flex-1" style={{ background: 'var(--g-sec-300)', opacity: 0.4 }} />
        </div>
        <div className="pb-6 flex-1">
          <div className="text-[10px] font-bold tracking-wider uppercase" style={{ color: estadoColors[event.estado] }}>{event.fecha}</div>
          <h4 className="text-sm font-bold text-[var(--g-text-primary)] mt-0.5">{event.titulo}</h4>
          <p className="text-xs text-[var(--g-text-secondary)] mt-1 leading-relaxed">{event.descripcion}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {event.bloques.map(b => (
              <span key={b} className="px-1.5 py-0.5 text-[10px] font-medium" style={{ background: 'var(--g-sec-100)', color: 'var(--g-brand-3308)', borderRadius: 'var(--g-radius-sm)' }}>
                B{b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: alternating */}
      <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr] w-full items-start">
        <div className={isLeft ? 'pr-6 text-right' : 'pr-6 text-right opacity-0 pointer-events-none'}>
          {isLeft && <CardContent event={event} align="right" />}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full border-[3px] z-10" style={{ borderColor: estadoColors[event.estado], background: 'var(--g-surface-card)' }} />
        </div>
        <div className={!isLeft ? 'pl-6' : 'pl-6 opacity-0 pointer-events-none'}>
          {!isLeft && <CardContent event={event} align="left" />}
        </div>
      </div>
    </div>
  );
};

const CardContent = ({ event, align }: { event: typeof cronologia[0]; align: 'left' | 'right' }) => (
  <div className="pb-8">
    <div className="text-[10px] font-bold tracking-wider uppercase" style={{ color: estadoColors[event.estado] }}>{event.fecha}</div>
    <h4 className="text-sm font-bold text-[var(--g-text-primary)] mt-0.5">{event.titulo}</h4>
    <p className="text-xs text-[var(--g-text-secondary)] mt-1 leading-relaxed">{event.descripcion}</p>
    <div className={`flex flex-wrap gap-1 mt-2 ${align === 'right' ? 'justify-end' : ''}`}>
      {event.bloques.map(b => (
        <span key={b} className="px-1.5 py-0.5 text-[10px] font-medium" style={{ background: 'var(--g-sec-100)', color: 'var(--g-brand-3308)', borderRadius: 'var(--g-radius-sm)' }}>
          B{b}
        </span>
      ))}
    </div>
  </div>
);

export const TimelineSection = () => {
  return (
    <div className="relative">
      {/* Central line desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, var(--g-brand-3308), var(--g-sec-300), transparent)' }} />
      <div className="space-y-0">
        {cronologia.map((event, i) => (
          <TimelineNode key={i} event={event} index={i} />
        ))}
      </div>
    </div>
  );
};
