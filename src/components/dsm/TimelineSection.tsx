import { useState, useMemo } from 'react';
import { cronologia, EstadoUE, EstadoES, bloques } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const estadoColors: Record<string, string> = {
  vigente: 'var(--status-vigente)',
  proceso: 'var(--status-proceso)',
  planificada: 'var(--status-planificada)',
  revision: 'var(--status-revision)',
};

const estadoLabels: Record<string, string> = {
  vigente: 'Vigente',
  proceso: 'En proceso',
  planificada: 'Planificada',
  revision: 'En revisión',
};

type FilterEstado = EstadoUE | 'all';

const FilterChip = ({ label, active, color, onClick }: { label: string; active: boolean; color?: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium"
    style={{
      borderRadius: 'var(--g-radius-full)',
      background: active ? 'var(--g-brand-3308)' : 'var(--g-surface-card)',
      color: active ? 'var(--g-text-inverse)' : 'var(--g-text-secondary)',
      border: `1px solid ${active ? 'var(--g-brand-3308)' : 'var(--g-border-subtle)'}`,
      transition: 'all 150ms ease',
    }}
  >
    {color && <span className="w-2 h-2 rounded-full" style={{ background: active ? 'rgba(255,255,255,0.7)' : color }} />}
    {label}
  </button>
);

const TimelineNode = ({ event, index }: { event: typeof cronologia[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const [showDetail, setShowDetail] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      {/* Mobile */}
      <div className="md:hidden flex gap-3 w-full">
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className="w-3.5 h-3.5 rounded-full border-[3px] z-10"
            style={{
              borderColor: estadoColors[event.estado],
              background: 'var(--g-surface-card)',
              borderStyle: event.tipoHito === 'tecnico' ? 'dashed' : 'solid',
            }}
          />
          <div className="w-0.5 flex-1" style={{ background: 'var(--g-sec-300)', opacity: 0.4 }} />
        </div>
        <div className="pb-6 flex-1">
          <CardContent event={event} align="left" showDetail={showDetail} onToggle={() => setShowDetail(!showDetail)} />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr] w-full items-start">
        <div className={isLeft ? 'pr-6 text-right' : 'pr-6 text-right opacity-0 pointer-events-none'}>
          {isLeft && <CardContent event={event} align="right" showDetail={showDetail} onToggle={() => setShowDetail(!showDetail)} />}
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-4 h-4 rounded-full border-[3px] z-10"
            style={{
              borderColor: estadoColors[event.estado],
              background: 'var(--g-surface-card)',
              borderStyle: event.tipoHito === 'tecnico' ? 'dashed' : 'solid',
            }}
          />
        </div>
        <div className={!isLeft ? 'pl-6' : 'pl-6 opacity-0 pointer-events-none'}>
          {!isLeft && <CardContent event={event} align="left" showDetail={showDetail} onToggle={() => setShowDetail(!showDetail)} />}
        </div>
      </div>
    </div>
  );
};

const CardContent = ({ event, align, showDetail, onToggle }: {
  event: typeof cronologia[0];
  align: 'left' | 'right';
  showDetail: boolean;
  onToggle: () => void;
}) => (
  <div className="pb-8 group">
    <div className="flex items-center gap-2 flex-wrap" style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: estadoColors[event.estado] }}>
        {event.tipoHito === 'tecnico' ? '⚙ ' : ''}{event.fecha}
      </span>
      {event.incertidumbre && (
        <span className="text-[9px] font-medium px-1.5 py-0.5" style={{ background: 'var(--g-sec-100)', color: 'var(--g-text-secondary)', borderRadius: 'var(--g-radius-sm)', border: '1px dashed var(--g-border-subtle)' }} title="Fecha sujeta a proceso legislativo">
          ~Estimado
        </span>
      )}
    </div>
    <h4 className="text-sm font-bold text-[var(--g-text-primary)] mt-0.5 cursor-pointer hover:underline" onClick={onToggle}>{event.titulo}</h4>
    <p className="text-xs text-[var(--g-text-secondary)] mt-1 leading-relaxed">{event.descripcion}</p>

    {/* Expanded detail */}
    {showDetail && (event.efectoJuridico || event.proximoPaso) && (
      <div className="mt-2 p-2.5 space-y-1.5" style={{ background: 'var(--g-surface-page)', borderRadius: 'var(--g-radius-md)', borderLeft: `2px solid ${estadoColors[event.estado]}`, transition: 'all 200ms ease' }}>
        {event.efectoJuridico && (
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--g-text-secondary)]">Efecto jurídico</span>
            <p className="text-[11px] text-[var(--g-text-primary)] leading-relaxed">{event.efectoJuridico}</p>
          </div>
        )}
        {event.proximoPaso && (
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--g-text-secondary)]">Próximo paso</span>
            <p className="text-[11px] text-[var(--g-text-primary)] leading-relaxed">{event.proximoPaso}</p>
          </div>
        )}
      </div>
    )}

    <div className={`flex flex-wrap gap-1 mt-2 ${align === 'right' ? 'justify-end' : ''}`}>
      {event.bloques.map(b => {
        const bloque = bloques.find(bl => bl.id === b);
        return (
          <span key={b} className="px-1.5 py-0.5 text-[10px] font-medium" style={{ background: 'var(--g-sec-100)', color: 'var(--g-brand-3308)', borderRadius: 'var(--g-radius-sm)' }}>
            B{b}{bloque ? ` ${bloque.nombre.split(' ')[0]}` : ''}
          </span>
        );
      })}
    </div>

    {!showDetail && (event.efectoJuridico || event.proximoPaso) && (
      <button onClick={onToggle} className="mt-1.5 text-[10px] font-medium" style={{ color: 'var(--g-brand-accent)' }}>
        Ver detalle →
      </button>
    )}
  </div>
);

export const TimelineSection = ({ vistaEspana }: { vistaEspana?: boolean }) => {
  const [filter, setFilter] = useState<FilterEstado>('all');

  const filteredEvents = useMemo(() => {
    let events = filter === 'all' ? cronologia : cronologia.filter(e => e.estado === filter);
    if (vistaEspana) {
      events = events.filter(e => {
        // Keep events linked to blocks that have non-propuesta normas in Spain
        return e.bloques.some(bId => {
          const bloque = bloques.find(b => b.id === bId);
          return bloque?.normas.some(n => n.estadoES !== 'propuesta');
        });
      });
    }
    return events;
  }, [filter, vistaEspana]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <FilterChip label="Todos" active={filter === 'all'} onClick={() => setFilter('all')} />
        {(['vigente', 'proceso', 'planificada', 'revision'] as EstadoUE[]).map(e => (
          <FilterChip key={e} label={estadoLabels[e]} active={filter === e} color={estadoColors[e]} onClick={() => setFilter(e)} />
        ))}
      </div>

      {vistaEspana && (
        <div
          className="flex items-center justify-center gap-2 px-4 py-2 text-[11px] font-semibold"
          style={{
            background: 'var(--g-surface-subtle)',
            borderRadius: 'var(--g-radius-md)',
            color: 'var(--g-brand-3308)',
            border: '1px solid var(--g-sec-300)',
          }}
        >
          <span>🇪🇸</span>
          Mostrando solo hitos con impacto en España ({filteredEvents.length} de {cronologia.length})
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 text-sm text-[var(--g-text-secondary)]">
          No hay hitos para el filtro seleccionado.
        </div>
      ) : (
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, var(--g-brand-3308), var(--g-sec-300), transparent)' }} />
          <div className="space-y-0">
            {filteredEvents.map((event, i) => (
              <TimelineNode key={`${event.fecha}-${event.titulo}`} event={event} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
