import { useState, useRef, useMemo, useCallback } from 'react';
import heroBg from '@/assets/hero-building.png';
import { GuidedTour, GuidedTourButton } from '@/components/dsm/GuidedTour';
import { bloques } from '@/data/dsmData';
import { EuroStackSection } from '@/components/dsm/EuroStackSection';
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
import { NarrativeIntro } from '@/components/dsm/NarrativeIntro';
import { VisualizationCard } from '@/components/dsm/VisualizationCard';
import { GeoChip } from '@/components/dsm/GeoChip';

const tabs = [
  { id: 'orientacion', label: 'El sistema' },
  { id: 'general', label: 'Las 12 áreas' },
  { id: 'mapas', label: 'Exploración' },
  { id: 'cronologia', label: 'Cronología' },
  { id: 'transposicion', label: 'España' },
  { id: 'infraestructura', label: 'Infraestructura' },
  { id: 'recursos', label: 'Recursos' },
] as const;

type TabId = typeof tabs[number]['id'];

const SectionDivider = ({ label }: { label: string }) => {
  const { ref, isVisible } = useScrollReveal(0.3);
  return (
    <div
      ref={ref}
      className="flex items-center gap-4 py-4"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 600ms ease',
      }}
    >
      <div className="flex-1 h-px" style={{ background: 'var(--g-border-subtle)' }} />
      <span
        className="text-[10px] font-bold uppercase tracking-[0.25em] shrink-0"
        style={{ color: 'var(--g-text-secondary)' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--g-border-subtle)' }} />
    </div>
  );
};

const LayerHeading = ({ layer, title, subtitle }: { layer: string; title: string; subtitle: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className="mb-10"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-[0.2em] block mb-3"
        style={{ color: 'var(--g-brand-bright)' }}
      >
        {layer}
      </span>
      <h2
        className="text-2xl sm:text-3xl font-bold leading-tight"
        style={{ color: 'var(--g-text-primary)', lineHeight: 1.15 }}
      >
        {title}
      </h2>
      <p className="mt-3 text-sm text-[var(--g-text-secondary)] max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('orientacion');
  const [vizFilters, setVizFilters] = useState<FilterState>({ estadoUE: [], tipoNorma: [], estadoES: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [tourActive, setTourActive] = useState(false);
  const [vistaEspana, setVistaEspana] = useState(false);
  const sectionRefs = useRef<Record<TabId, HTMLElement | null>>({
    orientacion: null, general: null, mapas: null, cronologia: null, transposicion: null, infraestructura: null, recursos: null,
  });

  const totalNormas = bloques.reduce((s, b) => s + b.normas.length, 0);
  const vigentes = bloques.reduce((s, b) => s + b.vigentes, 0);
  const enProceso = bloques.reduce((s, b) => s + b.enProceso, 0);
  const transpuestas = bloques.reduce(
    (s, b) => s + b.normas.filter(n => n.estadoES === 'directa' || n.estadoES === 'transpuesta').length,
    0,
  );
  const pctImplementacion = Math.round((transpuestas / totalNormas) * 100);

  const scrollTo = (tab: TabId) => {
    setActiveTab(tab);
    sectionRefs.current[tab]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredBloques = useMemo(() => {
    if (!searchQuery.trim()) return bloques;
    const q = searchQuery.toLowerCase().trim();
    return bloques
      .map(b => {
        const bloqueMatch =
          b.nombre.toLowerCase().includes(q) ||
          b.descripcion.toLowerCase().includes(q) ||
          `b${b.id}`.includes(q);
        const matchingNormas = b.normas.filter(
          n =>
            n.nombre.toLowerCase().includes(q) ||
            n.tipo.toLowerCase().includes(q) ||
            n.transposicionES.toLowerCase().includes(q),
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
      {/* ═══════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════ */}
      <header
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, var(--g-brand-3308) 0%, #00332a 50%, var(--g-sec-700) 100%)',
        }}
      >
        <div className="absolute inset-0 g-pattern-dots" />
        <div className="absolute inset-0 g-pattern-lines" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-20 sm:pt-20 sm:pb-28">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-[2px]" style={{ background: 'var(--g-brand-bright)' }} />
            <span
              className="text-[10px] font-bold tracking-[0.25em] uppercase"
              style={{ color: 'var(--g-sec-300)' }}
            >
              Garrigues · Inteligencia Jurídica Digital
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white"
            style={{ lineHeight: 1.08, letterSpacing: '-0.01em' }}
          >
            Mapa Normativo del
            <br />
            Mercado Único Digital
          </h1>

          <p
            className="mt-5 text-[15px] sm:text-base max-w-xl leading-[1.7]"
            style={{ color: 'var(--g-sec-300)' }}
          >
            Sistema de comprensión del ecosistema regulatorio europeo.
            <br />
            Perspectiva Unión Europea y España · Actualizado 19 de marzo de 2026.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span
              className="px-3 py-1.5 text-[11px] font-semibold inline-flex items-center gap-2"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--g-text-inverse)',
                borderRadius: 'var(--g-radius-full)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <GeoChip variant="UE" /> {bloques.length} áreas del DSM
            </span>
            <span
              className="px-3 py-1.5 text-[11px] font-semibold inline-flex items-center gap-2"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--g-text-inverse)',
                borderRadius: 'var(--g-radius-full)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <GeoChip variant="ES" /> Transposición e implementación
            </span>
          </div>

          <div className="mt-8">
            <GuidedTourButton onClick={() => setTourActive(true)} />
          </div>

          {/* Key metrics */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
            <AnimatedCounter target={totalNormas} label="Normas mapeadas" />
            <AnimatedCounter target={vigentes} label="Vigentes" />
            <AnimatedCounter target={enProceso} label="En proceso legislativo" />
            <AnimatedCounter target={pctImplementacion} label="Implementación ES" suffix="%" />
          </div>
        </div>

        <svg
          viewBox="0 0 1440 56"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ marginBottom: '-1px' }}
        >
          <path
            d="M0,32 C480,56 960,8 1440,32 L1440,56 L0,56 Z"
            fill="var(--g-surface-page)"
          />
        </svg>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MARQUEE BANNER — Visita guiada
      ═══════════════════════════════════════════════════════════════ */}
      <div
        onClick={() => setTourActive(true)}
        className="w-full overflow-hidden cursor-pointer select-none"
        style={{
          background: 'var(--g-brand-3308)',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
        }}
        role="button"
        tabIndex={0}
        aria-label="Iniciar visita guiada"
        onKeyDown={e => { if (e.key === 'Enter') setTourActive(true); }}
      >
        <div className="animate-marquee whitespace-nowrap flex items-center" style={{ minWidth: '200%' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="inline-flex items-center">
              <span
                className="text-[11px] font-semibold uppercase"
                style={{ color: 'rgba(255,255,255,0.9)', letterSpacing: '0.18em' }}
              >
                ¿Cómo usar este sitio?
              </span>
              <span
                className="mx-6 text-[10px]"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                ·
              </span>
              <span
                className="text-[11px] font-medium uppercase"
                style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em' }}
              >
                Visita guiada interactiva
              </span>
              <span
                className="mx-6 text-[10px]"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          STICKY NAV
      ═══════════════════════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-40"
        style={{
          background: 'var(--g-surface-card)',
          boxShadow: 'var(--g-shadow-sm)',
          borderBottom: '1px solid var(--g-border-subtle)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide flex-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className="relative px-3 sm:px-4 py-3.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap"
                  style={{
                    color: activeTab === tab.id ? 'var(--g-brand-3308)' : 'var(--g-text-secondary)',
                    transition: 'color var(--g-transition-fast)',
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-[2px]"
                      style={{
                        background: 'var(--g-brand-3308)',
                        borderRadius: '2px 2px 0 0',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Vista España toggle */}
            <button
              onClick={() => setVistaEspana(!vistaEspana)}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold whitespace-nowrap"
              style={{
                background: vistaEspana ? 'var(--g-brand-3308)' : 'transparent',
                color: vistaEspana ? 'white' : 'var(--g-text-secondary)',
                borderRadius: 'var(--g-radius-full)',
                border: `1.5px solid ${vistaEspana ? 'var(--g-brand-3308)' : 'var(--g-border-subtle)'}`,
                transition: 'all 200ms ease',
              }}
              title={vistaEspana ? 'Desactivar perspectiva España' : 'Activar perspectiva España: resalta transposición y filtra hitos'}
            >
              <GeoChip variant="ES" />
              Vista España
              {vistaEspana && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--g-brand-bright)' }}
                />
              )}
            </button>

            <GlobalSearch query={searchQuery} onChange={setSearchQuery} onSelect={handleSearchSelect} />
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          CAPA 1 — ORIENTACIÓN
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={el => { sectionRefs.current.orientacion = el; }} id="orientacion">
        <NarrativeIntro />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════════════════════════ */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {/* Las 12 áreas */}
        <section ref={el => { sectionRefs.current.general = el; }} id="general">
          <LayerHeading
            layer="Exploración · Las áreas"
            title="Las doce palancas regulatorias del Mercado Único Digital"
            subtitle="Cada bloque representa un ámbito normativo con sus propias normas, plazos y actores afectados. Despliega cualquier bloque para acceder a su ficha completa: síntesis ejecutiva, estado UE, transposición en España, obligaciones e interacciones."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs">
            {[
              { label: 'Vigente', color: 'var(--status-vigente)' },
              { label: 'En proceso legislativo', color: 'var(--status-proceso)' },
              { label: 'Planificada 2026', color: 'var(--status-planificada)' },
              { label: 'En revisión', color: 'var(--status-revision)' },
            ].map(l => (
              <span key={l.label} className="inline-flex items-center gap-1.5 font-medium text-[var(--g-text-secondary)]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>

          {searchQuery.trim() && (
            <div className="mb-4 text-xs text-[var(--g-text-secondary)] text-center">
              Mostrando{' '}
              <span className="font-bold text-[var(--g-text-primary)]">{filteredBloques.length}</span> bloques
              y{' '}
              <span className="font-bold text-[var(--g-text-primary)]">
                {filteredBloques.reduce((s, b) => s + b.normas.length, 0)}
              </span>{' '}
              normas para "
              <span className="font-medium" style={{ color: 'var(--g-brand-3308)' }}>
                {searchQuery}
              </span>
              "
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBloques.map((b, i) => (
              <BlockCard key={b.id} bloque={b} index={i} />
            ))}
          </div>

          {filteredBloques.length === 0 && searchQuery.trim() && (
            <div className="text-center py-16">
              <p className="text-sm text-[var(--g-text-secondary)]">
                No se encontraron resultados para "
                <span className="font-medium">{searchQuery}</span>"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-medium hover:underline"
                style={{ color: 'var(--g-brand-bright)' }}
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </section>

        <SectionDivider label="Visualizaciones analíticas" />

        {/* Visualizaciones */}
        <section ref={el => { sectionRefs.current.mapas = el; }} id="mapas" className="space-y-16">
          <LayerHeading
            layer="Exploración · Visualizaciones"
            title="Seis perspectivas para comprender el ecosistema"
            subtitle="Cada visualización responde a una pregunta concreta sobre la estructura, la intensidad regulatoria, las interacciones entre áreas o la evolución temporal del DSM. Los filtros permiten aislar dimensiones específicas."
          />

          <VisualizationFilters filters={vizFilters} onChange={setVizFilters} />

          <VisualizationCard
            question="¿Cómo se estructura el sistema normativo?"
            title="Arquitectura del DSM: mapa radial"
            description="Anillos concéntricos desde el núcleo del DSM hacia los bloques temáticos y, en el exterior, las normas individuales. El color exterior refleja el estado de transposición en España."
            interpretation="Los segmentos más amplios concentran mayor densidad normativa. El anillo exterior permite evaluar de un vistazo qué proporción del acervo tiene aplicación práctica en España."
          >
            <SunburstMap filters={vizFilters} vistaEspana={vistaEspana} />
          </VisualizationCard>

          <VisualizationCard
            question="¿Dónde se concentra la presión regulatoria?"
            title="Densidad normativa por bloque"
            description="Cada celda representa un bloque temático. La barra inferior indica el porcentaje de normas ya implementadas en España."
            interpretation="Los bloques con más normas no son necesariamente los de mayor impacto. Cruza esta vista con la matriz de obligaciones para identificar los ámbitos de mayor exigencia práctica."
          >
            <HeatGrid filters={vizFilters} vistaEspana={vistaEspana} />
          </VisualizationCard>

          <VisualizationCard
            question="¿Qué debe vigilar cada actor regulado?"
            title="Matriz de obligaciones por tipo de actor"
            description="Cruza los 12 bloques con los principales grupos regulados. La intensidad refleja volumen y complejidad de las obligaciones. Pase el cursor para ver las obligaciones concretas."
            interpretation="Las plataformas digitales y los fabricantes concentran la mayor presión regulatoria. Las pymes, aunque con menos obligaciones directas, deben atender requisitos en cadenas de suministro."
            showLegend={false}
          >
            <ObligationsHeatMap />
          </VisualizationCard>

          <VisualizationCard
            question="¿Qué áreas interactúan entre sí?"
            title="Atlas de interdependencias normativas"
            description="Cada celda identifica si dos bloques mantienen relaciones de complementariedad, dependencia o conflicto potencial. Estas interacciones condicionan el cumplimiento coordinado."
            interpretation="Los bloques con más conexiones exigen estrategias de cumplimiento transversales. Un cambio normativo en un bloque altamente conectado tiene efectos sistémicos."
          >
            <InteractionsMatrix />
          </VisualizationCard>

          <VisualizationCard
            question="¿Cuándo se acumula mayor actividad legislativa?"
            title="Densidad temporal de hitos regulatorios"
            description="Mapa de calor por trimestre: identifica los periodos con mayor concentración de entradas en vigor, plazos de transposición y propuestas legislativas."
            interpretation="Los trimestres con mayor densidad exigirán refuerzo de los equipos de cumplimiento. Anticipe la planificación interna en función de las ventanas críticas."
            showLegend={false}
          >
            <DensityTimeline />
          </VisualizationCard>

          <VisualizationCard
            question="¿Cómo se relacionan las normas dentro del sistema?"
            title="Red de relaciones normativas"
            description="Cada nodo representa un bloque o una norma individual. Las conexiones muestran la adscripción temática. El color indica el estado de transposición en España."
            interpretation="Los bloques con mayor número de nodos periféricos son los más complejos. Las zonas de convergencia señalan áreas donde múltiples normas se aplican simultáneamente."
          >
            <ConstellationGraph filters={vizFilters} vistaEspana={vistaEspana} />
          </VisualizationCard>
        </section>

        <SectionDivider label="Análisis detallado" />

        {/* Cronología */}
        <section ref={el => { sectionRefs.current.cronologia = el; }} id="cronologia">
          <LayerHeading
            layer="Análisis · Evolución temporal"
            title="Cronología legislativa 2025–2028"
            subtitle="Principales hitos del mandato legislativo 2024–2029. Cada entrada muestra su efecto jurídico y el próximo paso esperado. Las fechas marcadas como '~Estimado' están sujetas a la evolución del proceso legislativo."
          />
          <TimelineSection vistaEspana={vistaEspana} />
        </section>

        {/* Transposición España */}
        <section ref={el => { sectionRefs.current.transposicion = el; }} id="transposicion">
          <LayerHeading
            layer="Análisis · Perspectiva España"
            title="De Bruselas a Madrid: transposición e implementación"
            subtitle="Estado de la transposición de las Directivas y de la aplicación de los Reglamentos UE en el ordenamiento jurídico español. Despliegue cada bloque para conocer el detalle norma por norma."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-8 text-[10px]">
            {[
              { label: 'Reg. Aplicación directa', color: 'var(--status-directa)', desc: 'Obligaciones exigibles sin necesidad de norma interna' },
              { label: 'Dir. Transpuesta', color: 'var(--status-transpuesta)', desc: 'Directiva incorporada al derecho español' },
              { label: 'Transposición parcial', color: 'var(--status-parcial)', desc: 'Incorporada con lagunas o desarrollo pendiente' },
              { label: 'Pendiente transposición', color: 'var(--status-pendiente)', desc: 'Plazo de transposición aún no cumplido' },
              { label: 'Propuesta / No aplicable', color: 'var(--status-propuesta)', desc: 'En fase de propuesta o no exige transposición' },
            ].map(l => (
              <span
                key={l.label}
                className="inline-flex items-center gap-1.5 font-semibold text-[var(--g-text-secondary)]"
                title={l.desc}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>

          <TranspositionSection />
        </section>

        {/* Infraestructura soberana — EuroStack */}
        <section ref={el => { sectionRefs.current.infraestructura = el; }} id="infraestructura">
          <LayerHeading
            layer="Análisis · Soberanía digital"
            title="De la norma a la infraestructura: el EuroStack y los Digital Building Blocks"
            subtitle="La regulación define el marco. Los Digital Building Blocks lo convierten en infraestructura ejecutable y soberana. EuroStack articula el proyecto político de que esa infraestructura sea europea por diseño."
          />
          <EuroStackSection />
        </section>

        {/* Recursos */}
        <section ref={el => { sectionRefs.current.recursos = el; }} id="recursos">
          <LayerHeading
            layer="Análisis · Herramientas"
            title="Fuentes, herramientas y recursos de referencia"
            subtitle="Bases de datos institucionales, trackers legislativos, informes de think tanks y herramientas de despachos especializados para profundizar en cada dimensión del mapeo normativo."
          />
          <ResourcesSection />
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="py-10 px-4" style={{ background: 'var(--g-brand-3308)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px]" style={{ background: 'var(--g-brand-bright)' }} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
              Garrigues
            </span>
            <div className="w-8 h-[2px]" style={{ background: 'var(--g-brand-bright)' }} />
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--g-sec-300)' }}>
            Mapa Normativo del Mercado Único Digital · Actualizado 19 de marzo de 2026
            <br />
            © 2026 Garrigues. Herramienta de inteligencia jurídica para uso informativo.
          </p>
        </div>
      </footer>

      <GuidedTour active={tourActive} onClose={() => setTourActive(false)} />
    </div>
  );
};

export default Index;
