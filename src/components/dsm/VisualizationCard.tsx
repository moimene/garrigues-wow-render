import { ReactNode } from 'react';
import { BloqueLegend } from './BloqueLegend';

interface Props {
  question: string;
  title: string;
  description: string;
  interpretation?: string;
  children: ReactNode;
  showLegend?: boolean;
}

export const VisualizationCard = ({ question, title, description, interpretation, children, showLegend = true }: Props) => (
  <div
    className="overflow-visible"
    style={{
      background: 'var(--g-surface-card)',
      borderRadius: 'var(--g-radius-lg)',
      boxShadow: 'var(--g-shadow-card)',
    }}
  >
    <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
      <span
        className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-2"
        style={{ color: 'var(--g-brand-bright)' }}
      >
        {question}
      </span>
      <h3 className="text-base sm:text-lg font-bold text-[var(--g-text-primary)] leading-snug">
        {title}
      </h3>
      <p className="mt-1.5 text-xs text-[var(--g-text-secondary)] leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>

    <div className="px-6 sm:px-8 py-4">
      {children}
    </div>

    {(interpretation || showLegend) && (
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-3">
        {interpretation && (
          <div
            className="p-3 text-xs leading-relaxed"
            style={{
              background: 'var(--g-surface-subtle)',
              borderRadius: 'var(--g-radius-md)',
              color: 'var(--g-text-secondary)',
              borderLeft: '3px solid var(--g-brand-bright)',
            }}
          >
            <span className="font-bold text-[var(--g-text-primary)]">Clave de lectura: </span>
            {interpretation}
          </div>
        )}
        {showLegend && <BloqueLegend />}
      </div>
    )}
  </div>
);
