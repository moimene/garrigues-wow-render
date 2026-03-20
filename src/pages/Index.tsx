import { useState, useRef } from 'react';
import { bloques } from '@/data/dsmData';
import { AnimatedCounter } from '@/components/dsm/AnimatedCounter';
import { BlockCard } from '@/components/dsm/BlockCard';
import { TimelineSection } from '@/components/dsm/TimelineSection';
import { SunburstMap } from '@/components/dsm/SunburstMap';
import { HeatGrid } from '@/components/dsm/HeatGrid';
import { ConstellationGraph } from '@/components/dsm/ConstellationGraph';
import { TranspositionSection } from '@/components/dsm/TranspositionSection';
import { ResourcesSection } from '@/components/dsm/ResourcesSection';
import { useScrollReveal } from '@/components/dsm/useScrollReveal';
import { VisualizationFilters, FilterState } from '@/components/dsm/VisualizationFilters';

const tabs = [
  { id: 'general', label: 'Vista General' },
  { id: 'mapas', label: 'Visualizaciones' },
  { id: 'cronologia', label: 'Cronología' },
  { id: 'transposicion', label: 'Transposición ES' },
  { id: 'recursos', label: 'Recursos' },
] as const;

type TabId = typeof tabs[number]['id'];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="mb-8 text-center" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 600ms cubic-bezier(0.16,1,0.3,1)' }}>
      <h2 className="text-2xl font-bold text-[var(--g-text-primary)]">{title}</h2>
      <p className="mt-2 text-sm text-[var(--g-text-secondary)] max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [vizFilters, setVizFilters] = useState<FilterState>({ estadoUE: [], tipoNorma: [], estadoES: [] });
  const sectionRefs = useRef<Record<TabId, HTMLElement | null>>({ general: null, mapas: null, cronologia: null, transposicion: null, recursos: null });

  const totalNormas = bloques.reduce((s, b) => s + b.normas.length, 0);
  const vigentes = bloques.reduce((s, b) => s + b.vigentes, 0);
  const enProceso = bloques.reduce((s, b) => s + b.enProceso, 0);
  const transpuestas = bloques.reduce((s, b) => s + b.normas.filter(n => n.estadoES === 'directa' || n.estadoES === 'transpuesta').length, 0);

  const scrollTo = (tab: TabId) => {
    setActiveTab(tab);
    sectionRefs.current[tab]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--g-surface-page)' }}>
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--g-brand-3308) 0%, var(--g-sec-700) 100%)' }}>
        <div className="absolute inset-0 g-pattern-dots" />
        <div className="absolute inset-0 g-pattern-lines" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
          {/* Garrigues mark */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-1" style={{ background: 'var(--g-brand-bright)' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--g-sec-300)' }}>Garrigues · Digital & Innovation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[var(--g-text-inverse)]" style={{ textWrap: 'balance', lineHeight: 1.1 }}>
            Mapa Normativo del<br />Mercado Único Digital
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[var(--g-sec-300)] max-w-xl leading-relaxed">
            Unión Europea y España — 12 áreas del DSM — Actualizado 19 marzo 2026
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <span className="px-3 py-1 text-xs font-medium" style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-full)', backdropFilter: 'blur(8px)' }}>🇪🇺 Unión Europea</span>
            <span className="px-3 py-1 text-xs font-medium" style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--g-text-inverse)', borderRadius: 'var(--g-radius-full)', backdropFilter: 'blur(8px)' }}>🇪🇸 España</span>
          </div>

          {/* Counters */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <AnimatedCounter target={totalNormas} label="Normas mapeadas" />
            <AnimatedCounter target={vigentes} label="Vigentes" />
            <AnimatedCounter target={enProceso} label="En proceso" />
            <AnimatedCounter target={transpuestas} label="Implementadas ES" />
          </div>
        </div>

        {/* Bottom wave */}
        <svg viewBox="0 0 1440 48" className="w-full block" preserveAspectRatio="none" style={{ marginBottom: '-1px' }}>
          <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,48 1440,48 L1440,48 L0,48 Z" fill="var(--g-surface-page)" />
        </svg>
      </header>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40" style={{ background: 'var(--g-surface-card)', boxShadow: 'var(--g-shadow-sm)', borderBottom: '1px solid var(--g-border-subtle)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className="relative px-4 py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap"
                style={{
                  color: activeTab === tab.id ? 'var(--g-brand-3308)' : 'var(--g-text-secondary)',
                  transition: 'color var(--g-transition-fast)',
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px]" style={{ background: 'var(--g-brand-3308)', borderRadius: '2px 2px 0 0', transition: 'all var(--g-transition-smooth)' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-20">
        {/* Vista General */}
        <section ref={el => { sectionRefs.current.general = el; }} id="general">
          <SectionHeading title="Mapa de las 12 Áreas del DSM" subtitle="Haz clic en cada bloque para ver la legislación UE y su estado de transposición/implementación en España." />

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs">
            {[
              { label: 'Vigente', color: 'var(--status-vigente)' },
              { label: 'En proceso', color: 'var(--status-proceso)' },
              { label: 'Planificada', color: 'var(--status-planificada)' },
              { label: 'En revisión', color: 'var(--status-revision)' },
            ].map(l => (
              <span key={l.label} className="inline-flex items-center gap-1.5 font-medium text-[var(--g-text-secondary)]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bloques.map((b, i) => (
              <BlockCard key={b.id} bloque={b} index={i} />
            ))}
          </div>
        </section>

        {/* Visualizaciones */}
        <section ref={el => { sectionRefs.current.mapas = el; }} id="mapas" className="space-y-16">
          <SectionHeading title="Visualizaciones Interactivas" subtitle="Tres perspectivas diferentes para explorar el ecosistema normativo del Mercado Único Digital." />

          <VisualizationFilters filters={vizFilters} onChange={setVizFilters} />

          {/* Sunburst */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Mapa Radial Sunburst</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Anillos concéntricos: DSM → Bloques → Normas. Color exterior por estado de transposición en España.</p>
            <SunburstMap filters={vizFilters} />
          </div>

          {/* HeatGrid */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Mapa de Calor por Bloques</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Densidad normativa y porcentaje de implementación en España por bloque temático.</p>
            <HeatGrid filters={vizFilters} />
          </div>

          {/* Constellation */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Diagrama de Constelación</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Red de nodos: bloques temáticos y sus normas asociadas con estado de transposición.</p>
            <ConstellationGraph filters={vizFilters} />
          </div>
        </section>

        {/* Cronología */}
        <section ref={el => { sectionRefs.current.cronologia = el; }} id="cronologia">
          <SectionHeading title="Cronología Legislativa 2025–2028" subtitle="Principales hitos de las nuevas iniciativas del mandato 2024-2029 y plazos de transposición en España." />
          <TimelineSection />
        </section>

        {/* Transposición */}
        <section ref={el => { sectionRefs.current.transposicion = el; }} id="transposicion">
          <SectionHeading title="Transposición e Implementación en España" subtitle="Estado de transposición de las Directivas y de aplicación de los Reglamentos UE en el ordenamiento jurídico español." />

          {/* Status legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 text-[10px]">
            {[
              { label: 'Reg. Aplicación directa', color: 'var(--status-directa)' },
              { label: 'Dir. Transpuesta', color: 'var(--status-transpuesta)' },
              { label: 'Transposición parcial', color: 'var(--status-parcial)' },
              { label: 'Pendiente transposición', color: 'var(--status-pendiente)' },
              { label: 'Propuesta / No aplicable', color: 'var(--status-propuesta)' },
            ].map(l => (
              <span key={l.label} className="inline-flex items-center gap-1.5 font-medium text-[var(--g-text-secondary)]">
                <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>

          <TranspositionSection />
        </section>

        {/* Recursos */}
        <section ref={el => { sectionRefs.current.recursos = el; }} id="recursos">
          <SectionHeading title="Herramientas y Recursos" subtitle="Bases de datos, trackers y herramientas de despachos, think tanks e instituciones UE de mapeo normativo digital." />
          <ResourcesSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center" style={{ background: 'var(--g-brand-3308)' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-0.5" style={{ background: 'var(--g-brand-bright)' }} />
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--g-text-inverse)]">Garrigues</span>
          <div className="w-6 h-0.5" style={{ background: 'var(--g-brand-bright)' }} />
        </div>
        <p className="text-[10px] text-[var(--g-sec-300)]">
          Mapeo Normativo del Mercado Único Digital · Actualizado 19 marzo 2026 · © 2026 Garrigues
        </p>
      </footer>
    </div>
  );
};

export default Index;
