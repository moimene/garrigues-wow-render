import { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, Play } from 'lucide-react';

const tourSteps = [
  {
    target: 'orientacion',
    tag: 'Paso 1 de 7',
    title: 'El sistema normativo europeo',
    body: 'El Mercado Único Digital se sustenta en más de 40 normas que la UE ha desplegado para gobernar la economía digital. Esta sección introductoria explica el contexto, la estructura y las claves de lectura del mapa.',
    position: 'bottom' as const,
  },
  {
    target: 'general',
    tag: 'Paso 2 de 7',
    title: 'Las 12 palancas regulatorias',
    body: 'Cada bloque representa un ámbito normativo —desde inteligencia artificial hasta servicios de pago—. Despliega cualquier bloque para ver su ficha completa: síntesis, estado UE, transposición, obligaciones e interacciones.',
    position: 'top' as const,
  },
  {
    target: 'mapas',
    tag: 'Paso 3 de 7',
    title: 'Exploración visual del ecosistema',
    body: 'Seis visualizaciones analíticas, cada una responde a una pregunta concreta: estructura, densidad, obligaciones por actor, interacciones entre áreas y evolución temporal. Los filtros permiten aislar dimensiones específicas.',
    position: 'top' as const,
  },
  {
    target: 'cronologia',
    tag: 'Paso 4 de 7',
    title: 'Cronología legislativa 2025–2028',
    body: 'Los principales hitos del mandato legislativo. Cada entrada incluye su efecto jurídico y el próximo paso esperado. Filtre por estado para explorar escenarios de evolución regulatoria.',
    position: 'top' as const,
  },
  {
    target: 'transposicion',
    tag: 'Paso 5 de 7',
    title: 'La dimensión España',
    body: 'El diferencial clave: de Bruselas a Madrid. Vea qué reglamentos se aplican directamente, qué directivas están transpuestas, dónde hay lagunas y qué plazos condicionan la actuación empresarial.',
    position: 'top' as const,
  },
  {
    target: 'recursos',
    tag: 'Paso 6 de 7',
    title: 'Fuentes y herramientas',
    body: 'Bases de datos institucionales, trackers legislativos y recursos de despachos especializados para profundizar en cada dimensión del ecosistema normativo.',
    position: 'top' as const,
  },
  {
    target: '',
    tag: 'Paso 7 de 7',
    title: 'Listo para explorar',
    body: 'Ya conoce la estructura del mapa. Puede navegar libremente entre secciones, aplicar filtros a las visualizaciones o desplegar cualquier bloque para análisis detallado. El sistema está diseñado para responder tanto a la consulta rápida como al estudio en profundidad.',
    position: 'center' as const,
  },
];

interface Props {
  active: boolean;
  onClose: () => void;
}

export const GuidedTour = ({ active, onClose }: Props) => {
  const [step, setStep] = useState(0);

  const currentStep = tourSteps[step];
  const isLast = step === tourSteps.length - 1;
  const isFirst = step === 0;

  const goNext = useCallback(() => {
    if (isLast) {
      onClose();
      return;
    }
    const nextStep = tourSteps[step + 1];
    if (nextStep.target) {
      const el = document.getElementById(nextStep.target);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setStep(s => s + 1);
  }, [step, isLast, onClose]);

  const goPrev = useCallback(() => {
    if (isFirst) return;
    const prevStep = tourSteps[step - 1];
    if (prevStep.target) {
      const el = document.getElementById(prevStep.target);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setStep(s => s - 1);
  }, [step, isFirst]);

  // Scroll to first section on start
  useEffect(() => {
    if (active) {
      setStep(0);
      const el = document.getElementById(tourSteps[0].target);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [active]);

  // Keyboard navigation
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'Enter') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, goNext, goPrev, onClose]);

  if (!active) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,30,24,0.6)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* Tour card */}
      <div
        className="fixed z-50 w-[calc(100%-2rem)] sm:w-[420px]"
        style={{
          bottom: '2rem',
          right: '1rem',
          left: 'auto',
        }}
      >
        <div
          style={{
            background: 'var(--g-surface-card)',
            borderRadius: 'var(--g-radius-lg)',
            boxShadow: '0 20px 60px rgba(0,68,56,0.25), 0 0 0 1px rgba(0,68,56,0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Progress bar */}
          <div className="h-1 w-full" style={{ background: 'var(--g-surface-muted)' }}>
            <div
              className="h-full"
              style={{
                width: `${((step + 1) / tourSteps.length) * 100}%`,
                background: 'var(--g-brand-bright)',
                transition: 'width 400ms cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </div>

          <div className="p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: 'var(--g-brand-bright)' }}
              >
                {currentStep.tag}
              </span>
              <button
                onClick={onClose}
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded"
                style={{
                  color: 'var(--g-text-secondary)',
                  transition: 'color 150ms ease',
                }}
                aria-label="Cerrar recorrido"
              >
                <X size={14} />
              </button>
            </div>

            <h4
              className="text-base font-bold leading-snug"
              style={{ color: 'var(--g-text-primary)' }}
            >
              {currentStep.title}
            </h4>

            <p
              className="mt-2 text-[13px] leading-[1.7]"
              style={{ color: 'var(--g-text-secondary)' }}
            >
              {currentStep.body}
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--g-border-subtle)' }}>
              <button
                onClick={goPrev}
                disabled={isFirst}
                className="inline-flex items-center gap-1 text-[11px] font-semibold"
                style={{
                  color: isFirst ? 'var(--g-border-subtle)' : 'var(--g-text-secondary)',
                  cursor: isFirst ? 'default' : 'pointer',
                  transition: 'color 150ms ease',
                }}
              >
                <ChevronLeft size={13} />
                Anterior
              </button>

              <div className="flex gap-1">
                {tourSteps.map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: i === step ? 'var(--g-brand-bright)' : i < step ? 'var(--g-brand-3308)' : 'var(--g-border-subtle)',
                      transition: 'background 200ms ease',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold"
                style={{
                  background: 'var(--g-brand-3308)',
                  color: 'white',
                  borderRadius: 'var(--g-radius-sm)',
                  transition: 'background 150ms ease',
                }}
              >
                {isLast ? 'Comenzar' : 'Siguiente'}
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/** Trigger button for the hero */
export const GuidedTourButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2.5 px-5 py-2.5 text-[12px] font-bold group"
    style={{
      background: 'rgba(255,255,255,0.12)',
      color: 'white',
      borderRadius: 'var(--g-radius-full)',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(8px)',
      transition: 'all 200ms ease',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
    }}
  >
    <Play size={13} className="group-hover:scale-110 transition-transform" />
    Explícame el sistema en 2 minutos
  </button>
);
