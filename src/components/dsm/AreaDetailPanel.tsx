import { useState } from 'react';
import { type Bloque, actorLabels } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const estadoESLabels: Record<string, { label: string; color: string }> = {
  directa: { label: 'Aplicación directa', color: 'var(--status-directa)' },
  transpuesta: { label: 'Transpuesta', color: 'var(--status-transpuesta)' },
  parcial: { label: 'Parcial', color: 'var(--status-parcial)' },
  pendiente: { label: 'Pendiente', color: 'var(--status-pendiente)' },
  propuesta: { label: 'Propuesta', color: 'var(--status-propuesta)' },
};

const intensidadConfig = {
  alta: { label: 'Alta', color: 'var(--status-pendiente)', bg: 'rgba(220,38,38,0.08)' },
  media: { label: 'Media', color: 'var(--status-proceso)', bg: 'rgba(245,158,11,0.08)' },
  baja: { label: 'Baja', color: 'var(--status-planificada)', bg: 'rgba(100,116,139,0.06)' },
  nula: { label: '—', color: 'var(--g-text-secondary)', bg: 'transparent' },
};

const depTypeConfig = {
  complementariedad: { label: 'Complementaria', icon: '↔', color: 'var(--status-directa)' },
  dependencia: { label: 'Dependencia', icon: '→', color: 'var(--status-proceso)' },
  conflicto: { label: 'Conflicto potencial', icon: '⚡', color: 'var(--status-pendiente)' },
};

type Tab = 'sintesis' | 'estadoUE' | 'transposicion' | 'obligaciones' | 'dependencias';

interface Props {
  bloque: Bloque;
  onClose: () => void;
}

export const AreaDetailPanel = ({ bloque, onClose }: Props) => {
  const [tab, setTab] = useState<Tab>('sintesis');
  const { ref, isVisible } = useScrollReveal(0.05);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'sintesis', label: 'Síntesis' },
    { id: 'estadoUE', label: 'Estado UE' },
    { id: 'transposicion', label: 'España' },
    { id: 'obligaciones', label: 'Obligaciones' },
    { id: 'dependencias', label: 'Interacciones' },
  ];

  const transpuestas = bloque.normas.filter(n => n.estadoES === 'directa' || n.estadoES === 'transpuesta').length;
  const pctImpl = Math.round((transpuestas / bloque.normas.length) * 100);

  return (
    <div
      ref={ref}
      className="overflow-hidden"
      style={{
        background: 'var(--g-surface-card)',
        borderRadius: 'var(--g-radius-lg)',
        boxShadow: 'var(--g-shadow-card)',
        border: '1px solid var(--g-border-subtle)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 500ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Header */}
      <div className="p-5 sm:p-6" style={{ borderBottom: '1px solid var(--g-border-subtle)', background: `linear-gradient(135deg, ${bloque.color}08 0%, transparent 60%)` }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0" style={{ background: bloque.color, color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-full)' }}>
              {bloque.id}
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--g-text-primary)] leading-snug">{bloque.nombre}</h3>
              <p className="text-xs text-[var(--g-text-secondary)] mt-0.5">{bloque.descripcion}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-xs font-medium shrink-0 px-2 py-1" style={{ color: 'var(--g-text-secondary)', borderRadius: 'var(--g-radius-sm)' }}>✕</button>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold tabular-nums" style={{ color: bloque.color }}>{bloque.normas.length}</div>
            <div className="text-[10px] text-[var(--g-text-secondary)]">Normas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold tabular-nums" style={{ color: 'var(--status-vigente)' }}>{bloque.vigentes}</div>
            <div className="text-[10px] text-[var(--g-text-secondary)]">Vigentes</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold tabular-nums" style={{ color: 'var(--status-proceso)' }}>{bloque.enProceso + bloque.planificadas}</div>
            <div className="text-[10px] text-[var(--g-text-secondary)]">En trámite</div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 overflow-hidden" style={{ background: 'var(--g-sec-100)', borderRadius: 'var(--g-radius-full)' }}>
              <div className="h-full" style={{ width: `${pctImpl}%`, background: 'var(--status-vigente)', borderRadius: 'var(--g-radius-full)', transition: 'width 600ms ease-out' }} />
            </div>
            <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--g-text-primary)' }}>{pctImpl}%</span>
            <span className="text-[10px] text-[var(--g-text-secondary)]">impl. ES</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex overflow-x-auto scrollbar-hide" style={{ borderBottom: '1px solid var(--g-border-subtle)' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="relative px-4 py-2.5 text-[11px] sm:text-xs font-medium whitespace-nowrap"
            style={{
              color: tab === t.id ? 'var(--g-brand-3308)' : 'var(--g-text-secondary)',
              transition: 'color 150ms ease',
            }}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute bottom-0 left-2 right-2 h-[2px]" style={{ background: 'var(--g-brand-3308)', borderRadius: '2px 2px 0 0' }} />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 sm:p-6">
        {tab === 'sintesis' && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--g-text-primary)] leading-relaxed">{bloque.sintesisEjecutiva}</p>
            <div className="p-4" style={{ background: 'var(--g-sec-50)', borderRadius: 'var(--g-radius-md)', borderLeft: `3px solid ${bloque.color}` }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--g-text-secondary)] mb-1">Impacto principal</div>
              <p className="text-xs text-[var(--g-text-primary)] leading-relaxed">{bloque.impactoResumen}</p>
            </div>
            {bloque.hitosProximos.length > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--g-text-secondary)] mb-2">Próximos hitos</div>
                <ul className="space-y-1">
                  {bloque.hitosProximos.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[var(--g-text-primary)]">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: bloque.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'estadoUE' && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--g-text-primary)] leading-relaxed">{bloque.estadoUEDetalle}</p>
            <div className="space-y-2">
              {bloque.normas.map((n, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5" style={{ background: 'var(--g-surface-page)', borderRadius: 'var(--g-radius-md)' }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: estadoESLabels[n.estadoES]?.color }} />
                  <span className="text-xs font-medium text-[var(--g-text-primary)] flex-1 min-w-0 truncate">{n.nombre}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 shrink-0" style={{ background: n.tipo === 'Reglamento' ? 'var(--status-directa)' : n.tipo === 'Directiva' ? 'var(--status-proceso)' : 'var(--status-propuesta)', color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-sm)' }}>{n.tipo}</span>
                  {n.plazo !== '—' && <span className="text-[10px] text-[var(--g-text-secondary)] shrink-0">📅 {n.plazo}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'transposicion' && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--g-text-primary)] leading-relaxed">{bloque.transposicionDetalle}</p>
            <div className="space-y-2">
              {bloque.normas.map((n, i) => {
                const est = estadoESLabels[n.estadoES];
                return (
                  <div key={i} className="p-3" style={{ background: 'var(--g-surface-page)', borderRadius: 'var(--g-radius-md)', borderLeft: `3px solid ${est?.color}` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-[var(--g-text-primary)]">{n.nombre}</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5" style={{ background: est?.color, color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-sm)' }}>{est?.label}</span>
                    </div>
                    <p className="text-[11px] text-[var(--g-text-secondary)] leading-relaxed">{n.transposicionES}</p>
                  </div>
                );
              })}
            </div>
            {/* Glossary */}
            <div className="p-3" style={{ background: 'rgba(0,68,56,0.04)', borderRadius: 'var(--g-radius-md)' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--g-text-secondary)] mb-2">📖 Glosario rápido</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div><strong className="text-[var(--g-text-primary)]">Aplicación directa:</strong> <span className="text-[var(--g-text-secondary)]">El reglamento UE es exigible sin necesidad de norma nacional.</span></div>
                <div><strong className="text-[var(--g-text-primary)]">Transposición:</strong> <span className="text-[var(--g-text-secondary)]">La directiva UE se incorpora al ordenamiento español mediante ley o real decreto-ley.</span></div>
                <div><strong className="text-[var(--g-text-primary)]">Implementación:</strong> <span className="text-[var(--g-text-secondary)]">Desarrollo reglamentario, designación de autoridades y adopción de guías técnicas.</span></div>
                <div><strong className="text-[var(--g-text-primary)]">Parcial:</strong> <span className="text-[var(--g-text-secondary)]">Existe normativa nacional pero no cubre todos los aspectos de la directiva UE.</span></div>
              </div>
            </div>
          </div>
        )}

        {tab === 'obligaciones' && (
          <div className="space-y-4">
            <p className="text-xs text-[var(--g-text-secondary)] leading-relaxed">Obligaciones por tipo de actor afectado. La intensidad refleja el volumen y complejidad de las obligaciones.</p>
            <div className="space-y-3">
              {bloque.obligacionesActores.map((oa, i) => {
                const cfg = intensidadConfig[oa.intensidad];
                return (
                  <div key={i} className="p-3" style={{ background: cfg.bg, borderRadius: 'var(--g-radius-md)', border: '1px solid var(--g-border-subtle)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-[var(--g-text-primary)]">{actorLabels[oa.actor]}</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5" style={{ color: cfg.color, background: `${cfg.color}15`, borderRadius: 'var(--g-radius-sm)' }}>
                        Intensidad {cfg.label.toLowerCase()}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {oa.obligaciones.map((o, j) => (
                        <li key={j} className="flex items-start gap-2 text-[11px] text-[var(--g-text-primary)]">
                          <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: cfg.color }} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'dependencias' && (
          <div className="space-y-4">
            <p className="text-xs text-[var(--g-text-secondary)] leading-relaxed">Relaciones con otras áreas del Mercado Único Digital. Estas interacciones afectan a la implementación y al cumplimiento coordinado.</p>
            <div className="space-y-2">
              {bloque.dependencias.map((d, i) => {
                const cfg = depTypeConfig[d.tipo];
                return (
                  <div key={i} className="p-3 flex items-start gap-3" style={{ background: 'var(--g-surface-page)', borderRadius: 'var(--g-radius-md)' }}>
                    <span className="text-lg mt-0.5">{cfg.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[var(--g-text-primary)]">Bloque {d.areaId}</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5" style={{ color: cfg.color, background: `${cfg.color}15`, borderRadius: 'var(--g-radius-sm)' }}>{cfg.label}</span>
                      </div>
                      <p className="text-[11px] text-[var(--g-text-secondary)] leading-relaxed">{d.descripcion}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
