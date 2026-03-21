import { useState } from 'react';
import { useScrollReveal } from './useScrollReveal';
import { bloques } from '@/data/dsmData';
import {
  buildingBlocks,
  sovereigntyMap,
  euroStackPrincipios,
  sovereigntyLevelConfig,
  type BBEstado,
  type SovereigntyLevel,
} from '@/data/euroStackData';

const bbEstadoConfig: Record<BBEstado, { label: string; color: string }> = {
  operativo: { label: 'Operativo', color: 'var(--status-vigente)' },
  pilotaje: { label: 'En pilotaje', color: 'var(--status-proceso)' },
  desarrollo: { label: 'En desarrollo', color: 'var(--status-planificada)' },
  'sin-equivalente': { label: 'Sin equivalente', color: 'var(--status-pendiente)' },
};

// ─── Narrative intro ────────────────────────────────────────────

const NarrativeModule = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div
      ref={ref}
      className="space-y-6"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 600ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            layer: '1',
            title: 'Capa normativa',
            desc: 'Qué está regulado. Reglamentos, directivas y propuestas que definen derechos, obligaciones y marcos de gobernanza.',
            color: 'var(--status-vigente)',
          },
          {
            layer: '2',
            title: 'Capa técnica',
            desc: 'Cómo se ejecuta. Los Digital Building Blocks son instrumentos técnicos soberanos que materializan las obligaciones normativas en infraestructura interoperable.',
            color: 'var(--status-proceso)',
          },
          {
            layer: '3',
            title: 'Capa estratégica',
            desc: 'Por qué importa la soberanía. EuroStack articula el proyecto político de garantizar que la infraestructura digital europea esté bajo control europeo.',
            color: 'var(--g-brand-bright)',
          },
        ].map(l => (
          <div
            key={l.layer}
            className="p-5"
            style={{
              background: 'var(--g-surface-card)',
              borderRadius: 'var(--g-radius-lg)',
              border: '1px solid var(--g-border-subtle)',
              borderTop: `3px solid ${l.color}`,
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-7 h-7 flex items-center justify-center text-[11px] font-bold"
                style={{ background: l.color, color: 'white', borderRadius: 'var(--g-radius-full)' }}
              >
                {l.layer}
              </span>
              <span className="text-sm font-bold text-[var(--g-text-primary)]">{l.title}</span>
            </div>
            <p className="text-[12px] text-[var(--g-text-secondary)] leading-relaxed">{l.desc}</p>
          </div>
        ))}
      </div>

      <div
        className="p-4 text-[11px] leading-relaxed"
        style={{
          background: 'rgba(0,68,56,0.04)',
          borderRadius: 'var(--g-radius-md)',
          borderLeft: '3px solid var(--g-brand-bright)',
          color: 'var(--g-text-secondary)',
        }}
      >
        <strong className="text-[var(--g-text-primary)]">Nota editorial:</strong> Los Digital Building Blocks son
        instrumentos técnicos del programa Europa Digital de la Comisión Europea, con más de 300 reutilizaciones
        documentadas desde 2014. EuroStack es una propuesta estratégica de la Fundación Bertelsmann (2025), no un
        acto jurídico vinculante de la Unión. La adopción de un Building Block facilita el cumplimiento normativo,
        pero no lo garantiza automáticamente.
      </div>
    </div>
  );
};

// ─── Building Blocks grid ───────────────────────────────────────

const BuildingBlocksGrid = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 600ms cubic-bezier(0.16,1,0.3,1) 100ms' }}>
      <h3 className="text-base font-bold text-[var(--g-text-primary)] mb-1">Digital Building Blocks de la Comisión Europea</h3>
      <p className="text-[12px] text-[var(--g-text-secondary)] mb-5 max-w-2xl leading-relaxed">
        Componentes técnicos soberanos, reutilizables e interoperables que los Estados miembros emplean para ejecutar sus obligaciones normativas sin construir desde cero.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {buildingBlocks.map(bb => {
          const est = bbEstadoConfig[bb.estado];
          const isOpen = expanded === bb.id;
          const linkedBloques = bb.bloqueIds.map(id => bloques.find(b => b.id === id)).filter(Boolean);

          return (
            <div
              key={bb.id}
              className="cursor-pointer"
              onClick={() => setExpanded(isOpen ? null : bb.id)}
              style={{
                background: 'var(--g-surface-card)',
                borderRadius: 'var(--g-radius-lg)',
                border: '1px solid var(--g-border-subtle)',
                boxShadow: isOpen ? 'var(--g-shadow-card)' : 'none',
                transition: 'all 200ms ease',
              }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚙</span>
                    <span className="text-sm font-bold text-[var(--g-text-primary)]">{bb.nombre}</span>
                  </div>
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 shrink-0"
                    style={{ background: est.color, color: 'white', borderRadius: 'var(--g-radius-sm)' }}
                  >
                    {est.label}
                  </span>
                </div>

                <p className="text-[11px] text-[var(--g-text-secondary)] leading-relaxed mb-3">{bb.descripcionCorta}</p>

                {/* Linked blocks */}
                <div className="flex flex-wrap gap-1.5">
                  {linkedBloques.map(b => b && (
                    <span
                      key={b.id}
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5"
                      style={{ background: `${b.color}12`, color: b.color, borderRadius: 'var(--g-radius-sm)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
                      B{b.id} · {b.nombre}
                    </span>
                  ))}
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="mt-4 pt-3 space-y-3" style={{ borderTop: '1px solid var(--g-border-subtle)' }}>
                    <p className="text-[11px] text-[var(--g-text-primary)] leading-relaxed">{bb.descripcionLarga}</p>
                    <div className="p-3" style={{ background: 'var(--g-surface-page)', borderRadius: 'var(--g-radius-md)' }}>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--g-text-secondary)] mb-1">Función en el DSM</div>
                      <p className="text-[11px] text-[var(--g-text-primary)] leading-relaxed">{bb.funcionEnDSM}</p>
                    </div>
                    {bb.casosReutilizacion && (
                      <div className="text-[10px] text-[var(--g-text-secondary)]">
                        ~{bb.casosReutilizacion} casos de reutilización documentados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Sovereignty Heatmap ────────────────────────────────────────

const SovereigntyHeatmap = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 600ms cubic-bezier(0.16,1,0.3,1) 200ms' }}>
      <h3 className="text-base font-bold text-[var(--g-text-primary)] mb-1">Mapa de soberanía técnica por área</h3>
      <p className="text-[12px] text-[var(--g-text-secondary)] mb-2 max-w-2xl leading-relaxed">
        ¿Dónde existe infraestructura técnica soberana para ejecutar las obligaciones normativas? Este mapa no evalúa el cumplimiento jurídico, sino la madurez técnica de la soberanía digital.
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-5 text-[10px]">
        {(Object.entries(sovereigntyLevelConfig) as [SovereigntyLevel, typeof sovereigntyLevelConfig[SovereigntyLevel]][]).map(([key, cfg]) => (
          <span key={key} className="inline-flex items-center gap-1.5 font-medium text-[var(--g-text-secondary)]">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.color }} />
            {cfg.label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {sovereigntyMap.map(s => {
          const bloque = bloques.find(b => b.id === s.bloqueId);
          if (!bloque) return null;
          const cfg = sovereigntyLevelConfig[s.nivel];
          const isHov = hovered === s.bloqueId;

          return (
            <div
              key={s.bloqueId}
              className="relative p-3 cursor-default"
              onMouseEnter={() => setHovered(s.bloqueId)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: cfg.bg,
                borderRadius: 'var(--g-radius-md)',
                border: `1.5px solid ${isHov ? cfg.color : 'var(--g-border-subtle)'}`,
                transition: 'all 200ms ease',
                transform: isHov ? 'translateY(-2px)' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-6 h-6 flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ background: bloque.color, color: 'white', borderRadius: 'var(--g-radius-full)' }}
                >
                  {bloque.id}
                </span>
                <span className="text-[10px] font-bold text-[var(--g-text-primary)] leading-tight line-clamp-2">
                  {bloque.nombre}
                </span>
              </div>
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 inline-block"
                style={{ color: cfg.color, background: `${cfg.color}15`, borderRadius: 'var(--g-radius-sm)' }}
              >
                {cfg.label}
              </span>

              {/* Hover tooltip */}
              {isHov && (
                <div
                  className="absolute left-0 right-0 top-full mt-1 p-3 z-20"
                  style={{
                    background: 'var(--g-surface-card)',
                    borderRadius: 'var(--g-radius-md)',
                    boxShadow: 'var(--g-shadow-lg)',
                    border: '1px solid var(--g-border-subtle)',
                  }}
                >
                  <p className="text-[10px] text-[var(--g-text-primary)] leading-relaxed">{s.nota}</p>
                  {s.buildingBlocks.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {s.buildingBlocks.map(bbId => {
                        const bb = buildingBlocks.find(b => b.id === bbId);
                        return bb ? (
                          <span key={bbId} className="text-[9px] font-medium px-1.5 py-0.5" style={{ background: 'var(--g-sec-100)', color: 'var(--g-brand-3308)', borderRadius: 'var(--g-radius-sm)' }}>
                            ⚙ {bb.nombre}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── EuroStack Principles ───────────────────────────────────────

const EuroStackPrinciples = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 600ms cubic-bezier(0.16,1,0.3,1) 300ms' }}>
      <h3 className="text-base font-bold text-[var(--g-text-primary)] mb-1">Principios del EuroStack</h3>
      <p className="text-[12px] text-[var(--g-text-secondary)] mb-5 max-w-2xl leading-relaxed">
        El informe EuroStack (Fundación Bertelsmann, 2025) propone ocho principios para una infraestructura digital europea soberana. Estos principios no son normativos, sino orientaciones estratégicas para el diseño de políticas públicas.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {euroStackPrincipios.map((p, i) => (
          <div
            key={p.id}
            className="p-4"
            style={{
              background: 'var(--g-surface-card)',
              borderRadius: 'var(--g-radius-md)',
              border: '1px solid var(--g-border-subtle)',
            }}
          >
            <div className="text-xl mb-2">{p.icono}</div>
            <div className="text-[11px] font-bold text-[var(--g-text-primary)] mb-1">{p.titulo}</div>
            <p className="text-[10px] text-[var(--g-text-secondary)] leading-relaxed">{p.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main section export ────────────────────────────────────────

export const EuroStackSection = () => {
  return (
    <div className="space-y-16">
      <NarrativeModule />
      <BuildingBlocksGrid />
      <SovereigntyHeatmap />
      <EuroStackPrinciples />
    </div>
  );
};
