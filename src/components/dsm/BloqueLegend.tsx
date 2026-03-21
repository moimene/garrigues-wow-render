import { useState } from 'react';
import { bloques } from '@/data/dsmData';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  defaultOpen?: boolean;
}

export const BloqueLegend = ({ defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-4" style={{ borderRadius: 'var(--g-radius-md)', border: '1px solid var(--g-border-subtle)', background: 'var(--g-surface-muted)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--g-text-secondary)] hover:text-[var(--g-text-primary)]"
        style={{ transition: 'color 150ms ease' }}
      >
        <span>Leyenda de Bloques (B1–B12)</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="px-4 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1.5">
          {bloques.map(b => (
            <div key={b.id} className="flex items-center gap-2 text-[11px]">
              <span className="w-4 h-4 rounded shrink-0 flex items-center justify-center text-[8px] font-bold text-white" style={{ background: b.color }}>
                {b.id}
              </span>
              <span className="font-semibold text-[var(--g-text-primary)] truncate" title={b.nombre}>
                B{b.id}: {b.nombre}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
