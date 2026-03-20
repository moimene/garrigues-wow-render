import { useMemo } from 'react';
import { cronologia } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';

const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', 'Q1 2028'];

const barColors = [
  '#059669', '#0d9488', '#0891b2', '#2563eb', '#7c3aed',
  '#c026d3', '#db2777', '#dc2626', '#d97706',
];

const dateToQuarter = (fecha: string): string => {
  if (fecha.match(/^Q\d\s\d{4}$/)) return fecha;
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
      <div className="flex items-end gap-2 justify-center" style={{ height: '140px' }}>
        {quarters.map((q, i) => {
          const count = density[q];
          const heightPct = count > 0 ? Math.max(18, (count / maxCount) * 100) : 6;

          return (
            <div key={q} className="flex flex-col items-center gap-1.5 flex-1 max-w-[64px]">
              <div className="relative w-full flex items-end justify-center" style={{ height: '100px' }}>
                <div
                  className="w-full"
                  style={{
                    height: `${heightPct}%`,
                    background: barColors[i],
                    borderRadius: '6px 6px 0 0',
                    transition: `height 600ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
                    boxShadow: count > 0 ? `0 2px 8px ${barColors[i]}44` : 'none',
                  }}
                />
                {count > 0 && (
                  <span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-[12px] font-bold tabular-nums"
                    style={{ color: barColors[i] }}
                  >
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold text-[var(--g-text-secondary)] whitespace-nowrap">{q}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 text-[11px] text-[var(--g-text-secondary)] font-medium">
        <span>Menos hitos</span>
        <div className="w-28 h-2.5 overflow-hidden" style={{ borderRadius: 'var(--g-radius-full)', background: 'var(--g-surface-muted)' }}>
          <div className="w-full h-full" style={{ background: `linear-gradient(to right, ${barColors[0]}, ${barColors[4]}, ${barColors[8]})` }} />
        </div>
        <span>Más hitos</span>
      </div>
    </div>
  );
};
