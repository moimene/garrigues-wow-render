import { useState, useRef, useMemo, useCallback } from 'react';
import { bloques } from '@/data/dsmData';
import { GlobalSearch } from '@/components/dsm/GlobalSearch';
import { AnimatedCounter } from '@/components/dsm/AnimatedCounter';
import { BlockCard } from '@/components/dsm/BlockCard';
import { TimelineSection } from '@/components/dsm/TimelineSection';
import { SunburstMap } from '@/components/dsm/SunburstMap';
import { HeatGrid } from '@/components/dsm/HeatGrid';
import { ConstellationGraph } from '@/components/dsm/ConstellationGraph';
import { ObligationsHeatMap } from '@/components/dsm/ObligationsHeatMap';
import { InteractionsMatrix } from '@/components/dsm/InteractionsMatrix';
import { DensityTimeline } from '@/components/dsm/DensityTimeline';
import { TranspositionSection } from '@/components/dsm/TranspositionSection';
import { ResourcesSection } from '@/components/dsm/ResourcesSection';
import { useScrollReveal } from '@/components/dsm/useScrollReveal';
import { VisualizationFilters, FilterState } from '@/components/dsm/VisualizationFilters';
import { BloqueLegend } from '@/components/dsm/BloqueLegend';

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
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRefs = useRef<Record<TabId, HTMLElement | null>>({ general: null, mapas: null, cronologia: null, transposicion: null, recursos: null });

  const totalNormas = bloques.reduce((s, b) => s + b.normas.length, 0);
  const vigentes = bloques.reduce((s, b) => s + b.vigentes, 0);
  const enProceso = bloques.reduce((s, b) => s + b.enProceso, 0);
  const transpuestas = bloques.reduce((s, b) => s + b.normas.filter(n => n.estadoES === 'directa' || n.estadoES === 'transpuesta').length, 0);

  const scrollTo = (tab: TabId) => {
    setActiveTab(tab);
    sectionRefs.current[tab]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredBloques = useMemo(() => {
    if (!searchQuery.trim()) return bloques;
    const q = searchQuery.toLowerCase().trim();
    return bloques
      .map(b => {
        const bloqueMatch = b.nombre.toLowerCase().includes(q) || b.descripcion.toLowerCase().includes(q) || `b${b.id}`.includes(q);
        const matchingNormas = b.normas.filter(n =>
          n.nombre.toLowerCase().includes(q) || n.tipo.toLowerCase().includes(q) || n.transposicionES.toLowerCase().includes(q)
        );
        if (bloqueMatch) return b;
        if (matchingNormas.length > 0) return { ...b, normas: matchingNormas };
        return null;
      })
      .filter(Boolean) as typeof bloques;
  }, [searchQuery]);

  const handleSearchSelect = useCallback(() => {
    setActiveTab('general');
    setTimeout(() => {
      document.getElementById('general')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--g-surface-page)' }}>
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--g-brand-3308) 0%, var(--g-sec-700) 100%)' }}>
        <div className="absolute inset-0 g-pattern-dots" />
        <div className="absolute inset-0 g-pattern-lines" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
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

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <AnimatedCounter target={totalNormas} label="Normas mapeadas" />
            <AnimatedCounter target={vigentes} label="Vigentes" />
            <AnimatedCounter target={enProceso} label="En proceso" />
            <AnimatedCounter target={transpuestas} label="Implementadas ES" />
          </div>
        </div>

        <svg viewBox="0 0 1440 48" className="w-full block" preserveAspectRatio="none" style={{ marginBottom: '-1px' }}>
          <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,48 1440,48 L1440,48 L0,48 Z" fill="var(--g-surface-page)" />
        </svg>
      </header>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40" style={{ background: 'var(--g-surface-card)', boxShadow: 'var(--g-shadow-sm)', borderBottom: '1px solid var(--g-border-subtle)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide flex-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className="relative px-4 py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap"
                  style={{ color: activeTab === tab.id ? 'var(--g-brand-3308)' : 'var(--g-text-secondary)', transition: 'color var(--g-transition-fast)' }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2.5px]" style={{ background: 'var(--g-brand-3308)', borderRadius: '2px 2px 0 0' }} />
                  )}
                </button>
              ))}
            </div>
            <GlobalSearch query={searchQuery} onChange={setSearchQuery} onSelect={handleSearchSelect} />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-20">
        {/* Vista General */}
        <section ref={el => { sectionRefs.current.general = el; }} id="general">
          <SectionHeading title="Mapa de las 12 Áreas del DSM" subtitle="Haz clic en cada bloque para desplegar la ficha completa: síntesis ejecutiva, estado UE, transposición, obligaciones por actor e interacciones con otras áreas." />

          {searchQuery.trim() && (
            <div className="mb-4 text-xs text-[var(--g-text-secondary)] text-center">
              Mostrando <span className="font-bold text-[var(--g-text-primary)]">{filteredBloques.length}</span> bloques y <span className="font-bold text-[var(--g-text-primary)]">{filteredBloques.reduce((s, b) => s + b.normas.length, 0)}</span> normas para "<span className="font-medium text-[var(--g-brand-3308)]">{searchQuery}</span>"
            </div>
          )}

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
            {filteredBloques.map((b, i) => (
              <BlockCard key={b.id} bloque={b} index={i} />
            ))}
          </div>

          {filteredBloques.length === 0 && searchQuery.trim() && (
            <div className="text-center py-16">
              <p className="text-sm text-[var(--g-text-secondary)]">No se encontraron resultados para "<span className="font-medium">{searchQuery}</span>"</p>
              <button onClick={() => setSearchQuery('')} className="mt-3 text-xs font-medium hover:underline" style={{ color: 'var(--g-brand-accent)' }}>Limpiar búsqueda</button>
            </div>
          )}
        </section>

        {/* Visualizaciones */}
        <section ref={el => { sectionRefs.current.mapas = el; }} id="mapas" className="space-y-16">
          <SectionHeading title="Visualizaciones Interactivas" subtitle="Seis perspectivas para explorar el ecosistema normativo: mapas radiales, de calor, de obligaciones, interacciones entre áreas y densidad temporal." />

          <VisualizationFilters filters={vizFilters} onChange={setVizFilters} />

          {/* Sunburst */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Mapa Radial Sunburst</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Anillos concéntricos: DSM → Bloques → Normas. Color exterior por estado de transposición en España.</p>
            <SunburstMap filters={vizFilters} />
            <BloqueLegend />
          </div>

          {/* HeatGrid */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Mapa de Calor por Bloques</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Densidad normativa y porcentaje de implementación en España por bloque temático.</p>
            <HeatGrid filters={vizFilters} />
            <BloqueLegend />
          </div>

          {/* Obligations Matrix */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Matriz de Obligaciones por Actor</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Cruza los 12 bloques con los principales tipos de actores regulados. La intensidad refleja el volumen y complejidad de las obligaciones. Pasa el ratón para ver obligaciones concretas.</p>
            <ObligationsHeatMap />
            <BloqueLegend />
          </div>

          {/* Interactions Matrix */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Matriz de Interacciones Normativas</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Atlas de dependencias y complementariedades entre las 12 áreas del DSM. Identifica solapamientos y relaciones que afectan al cumplimiento coordinado.</p>
            <InteractionsMatrix />
            <BloqueLegend />
          </div>

          {/* Density Timeline */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Densidad Temporal de Hitos</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Mapa de calor por trimestre: identifica los periodos con mayor concentración de entradas en vigor, plazos de transposición y propuestas legislativas.</p>
            <DensityTimeline />
          </div>

          {/* Constellation */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--g-surface-card)', borderRadius: 'var(--g-radius-lg)', boxShadow: 'var(--g-shadow-card)' }}>
            <h3 className="text-lg font-bold text-[var(--g-text-primary)] mb-1">Diagrama de Constelación</h3>
            <p className="text-xs text-[var(--g-text-secondary)] mb-6">Red de nodos: bloques temáticos y sus normas asociadas con estado de transposición.</p>
            <ConstellationGraph filters={vizFilters} />
            <BloqueLegend />
          </div>
        </section>

        {/* Cronología */}
        <section ref={el => { sectionRefs.current.cronologia = el; }} id="cronologia">
          <SectionHeading title="Cronología Legislativa 2025–2028" subtitle="Principales hitos del mandato 2024-2029. Filtra por estado, haz clic en un hito para ver su efecto jurídico y próximo paso. Las fechas con '~Estimado' están sujetas al proceso legislativo." />
          <TimelineSection />
        </section>

        {/* Transposición */}
        <section ref={el => { sectionRefs.current.transposicion = el; }} id="transposicion">
          <SectionHeading title="Transposición e Implementación en España" subtitle="Estado de transposición de las Directivas y de aplicación de los Reglamentos UE en el ordenamiento jurídico español." />

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
          Mapa Normativo del Mercado Único Digital · Actualizado 19 marzo 2026 · © 2026 Garrigues
        </p>
      </footer>
    </div>
  );
};

export default Index;
