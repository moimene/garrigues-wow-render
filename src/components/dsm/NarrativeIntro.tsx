import { useScrollReveal } from './useScrollReveal';
import { bloques } from '@/data/dsmData';

const steps = [
  {
    tag: 'El contexto',
    title: 'Un nuevo orden jurídico para la economía digital europea',
    body: 'La Unión Europea ha construido, en menos de una década, el marco regulatorio más ambicioso del mundo para gobernar la economía digital. No es una ley, sino un ecosistema de más de 40 normas que interactúan entre sí: reglamentos de aplicación directa, directivas que cada Estado debe transponer y propuestas que ya condicionan decisiones empresariales.',
  },
  {
    tag: 'La estructura',
    title: 'Doce áreas que configuran el Mercado Único Digital',
    body: 'El DSM se organiza en doce bloques temáticos. Cada uno regula un ámbito específico —desde la inteligencia artificial hasta los servicios de pago— pero ninguno opera de forma aislada. Comprender sus conexiones es esencial para anticipar obligaciones y planificar el cumplimiento.',
  },
  {
    tag: 'La dimensión España',
    title: 'De Bruselas a Madrid: transposición, implementación y vacíos',
    body: 'No basta con conocer la norma europea. La clave práctica reside en su recorrido hasta el ordenamiento español: qué reglamentos se aplican directamente, qué directivas ya se han transpuesto, dónde quedan lagunas de implementación y qué plazos condicionan la actuación de empresas y administraciones.',
  },
  {
    tag: 'La lectura',
    title: 'Cómo navegar este mapa',
    body: 'Esta herramienta permite tres niveles de lectura. Primero, una visión panorámica del sistema. Segundo, la exploración de cada área mediante visualizaciones que revelan densidad, interacciones y presión regulatoria. Tercero, el análisis detallado por norma, actor o plazo, con especial atención a la perspectiva España.',
  },
];

export const NarrativeIntro = () => {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <NarrativeStep key={i} step={step} index={i} />
      ))}

      {/* 12 blocks overview */}
      <BlocksOverview />
    </div>
  );
};

const NarrativeStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="py-16 sm:py-20 px-4"
      style={{
        background: isEven ? 'transparent' : 'var(--g-surface-card)',
        borderTop: index > 0 ? '1px solid var(--g-border-subtle)' : 'none',
      }}
    >
      <div
        className="max-w-2xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 900ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--g-brand-bright)' }}
          >
            {step.tag}
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--g-border-subtle)' }} />
        </div>

        <h3
          className="text-xl sm:text-2xl font-bold leading-tight"
          style={{ color: 'var(--g-text-primary)', lineHeight: 1.2 }}
        >
          {step.title}
        </h3>

        <p
          className="mt-4 text-sm sm:text-[15px] leading-[1.8]"
          style={{ color: 'var(--g-text-secondary)' }}
        >
          {step.body}
        </p>
      </div>
    </div>
  );
};

const BlocksOverview = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className="py-16 sm:py-20 px-4"
      style={{ background: 'var(--g-brand-3308)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--g-sec-300)' }}
          >
            Las 12 palancas regulatorias
          </span>
          <h3
            className="mt-3 text-xl sm:text-2xl font-bold"
            style={{ color: 'var(--g-text-inverse)' }}
          >
            Áreas que configuran el Mercado Único Digital
          </h3>
          <p
            className="mt-3 text-sm max-w-xl mx-auto"
            style={{ color: 'var(--g-sec-300)', lineHeight: 1.7 }}
          >
            Cada bloque regula un ámbito clave de la economía digital. Su interacción define
            el entorno normativo que deben gestionar empresas, administraciones e inversores.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {bloques.map((b, i) => (
            <div
              key={b.id}
              className="p-4 flex items-start gap-3"
              style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 'var(--g-radius-md)',
                borderLeft: `3px solid ${b.color}`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 600ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
              }}
            >
              <span
                className="text-[11px] font-bold shrink-0 w-7 h-7 flex items-center justify-center rounded"
                style={{ background: b.color, color: 'white' }}
              >
                {b.id}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white leading-tight">{b.nombre}</div>
                <div className="text-[10px] mt-1 leading-snug" style={{ color: 'var(--g-sec-300)' }}>
                  {b.normas.length} normas · {b.vigentes} vigentes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
