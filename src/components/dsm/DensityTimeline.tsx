import { useMemo } from 'react';
import { cronologia } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', 'Q1 2028'];

const dateToQuarter = (fecha: string): string => {
  // Handle "QN YYYY" format
  if (fecha.match(/^Q\d\s\d{4}$/)) return fecha;
  // Handle "DD.MM.YYYY"
  const parts = fecha.split('.');
  if (parts.length === 3) {
    const m = parseInt(parts[1]);
    const y = parts[2];
    const q = Math.ceil(m / 3);
    return `Q${q} ${y}`;
  }
  return 'Q1 2026';
};

export const DensityTimeline = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  const density = useMemo(() => {
    const counts: Record<string, number> = {};
    quarters.forEach(q => (counts[q] = 0));
    cronologia.forEach(e => {
      const q = dateToQuarter(e.fecha);
      if (counts[q] !== undefined) counts[q]++;
    });
    return counts;
  }, []);

  const maxCount = Math.max(...Object.values(density), 1);

  return (
    <div ref={ref} className="space-y-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="flex items-end gap-1.5 justify-center" style={{ height: '120px' }}>
        {quarters.map((q, i) => {
          const count = density[q];
          const heightPct = count > 0 ? Math.max(15, (count / maxCount) * 100) : 4;
          const intensity = count / maxCount;

          return (
            <div key={q} className="flex flex-col items-center gap-1 flex-1 max-w-[60px]">
              <div className="relative w-full flex items-end justify-center" style={{ height: '90px' }}>
                <div
                  className="w-full"
                  style={{
                    height: `${heightPct}%`,
                    background: count > 0 ? `rgba(0,68,56,${0.15 + intensity * 0.7})` : 'var(--g-sec-100)',
                    borderRadius: 'var(--g-radius-sm) var(--g-radius-sm) 0 0',
                    transition: `height 600ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
                  }}
                />
                {count > 0 && (
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tabular-nums"
                    style={{ color: 'var(--g-text-primary)' }}
                  >
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium text-[var(--g-text-secondary)] whitespace-nowrap">{q}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--g-text-secondary)]">
        <span>Menos hitos</span>
        <div className="w-24 h-2" style={{ background: 'linear-gradient(to right, rgba(0,68,56,0.1), rgba(0,68,56,0.85))', borderRadius: 'var(--g-radius-full)' }} />
        <span>Más hitos</span>
      </div>
    </div>
  );
};
