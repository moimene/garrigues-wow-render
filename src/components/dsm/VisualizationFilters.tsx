import { EstadoUE, EstadoES, TipoNorma } from '@/data/dsmData';

export interface FilterState {
  estadoUE: EstadoUE[];
  tipoNorma: TipoNorma[];
  estadoES: EstadoES[];
}

const estadoUEOptions: { value: EstadoUE; label: string }[] = [
  { value: 'vigente', label: 'Vigente' },
  { value: 'proceso', label: 'En proceso' },
  { value: 'planificada', label: 'Planificada' },
  { value: 'revision', label: 'En revisión' },
];

const tipoNormaOptions: { value: TipoNorma; label: string }[] = [
  { value: 'Reglamento', label: 'Reglamento' },
  { value: 'Directiva', label: 'Directiva' },
  { value: 'Propuesta', label: 'Propuesta' },
];

const estadoESOptions: { value: EstadoES; label: string; color: string }[] = [
  { value: 'directa', label: 'Apl. directa', color: 'var(--status-directa)' },
  { value: 'transpuesta', label: 'Transpuesta', color: 'var(--status-transpuesta)' },
  { value: 'parcial', label: 'Parcial', color: 'var(--status-parcial)' },
  { value: 'pendiente', label: 'Pendiente', color: 'var(--status-pendiente)' },
  { value: 'propuesta', label: 'Propuesta', color: 'var(--status-propuesta)' },
];

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const FilterChip = ({
  label,
  active,
  onClick,
  dotColor,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dotColor?: string;
}) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap select-none"
    style={{
      borderRadius: 'var(--g-radius-full)',
      background: active ? 'var(--g-brand-3308)' : 'var(--g-surface-card)',
      color: active ? 'var(--g-text-inverse)' : 'var(--g-text-secondary)',
      border: `1px solid ${active ? 'var(--g-brand-3308)' : 'var(--g-border-subtle)'}`,
      transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
      transform: active ? 'scale(1)' : 'scale(1)',
    }}
    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
  >
    {dotColor && (
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: active ? 'rgba(255,255,255,0.8)' : dotColor }}
      />
    )}
    {label}
  </button>
);

const toggle = <T,>(arr: T[], val: T): T[] =>
  arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

export const VisualizationFilters = ({ filters, onChange }: Props) => {
  const activeCount =
    filters.estadoUE.length + filters.tipoNorma.length + filters.estadoES.length;

  const clearAll = () =>
    onChange({ estadoUE: [], tipoNorma: [], estadoES: [] });

  return (
    <div
      className="p-4 sm:p-5 space-y-4"
      style={{
        background: 'var(--g-surface-card)',
        borderRadius: 'var(--g-radius-lg)',
        boxShadow: 'var(--g-shadow-sm)',
        border: '1px solid var(--g-border-subtle)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M1.5 3h13M4 8h8M6 13h4" stroke="var(--g-brand-3308)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-bold text-[var(--g-text-primary)] tracking-wide uppercase">
            Filtros
          </span>
          {activeCount > 0 && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold tabular-nums"
              style={{
                background: 'var(--g-brand-3308)',
                color: 'var(--g-text-inverse)',
                borderRadius: 'var(--g-radius-full)',
              }}
            >
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[11px] font-medium hover:underline"
            style={{ color: 'var(--g-brand-accent)' }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Estado UE */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--g-text-secondary)]">
          Estado UE
        </span>
        <div className="flex flex-wrap gap-1.5">
          {estadoUEOptions.map(opt => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              active={filters.estadoUE.includes(opt.value)}
              onClick={() =>
                onChange({ ...filters, estadoUE: toggle(filters.estadoUE, opt.value) })
              }
            />
          ))}
        </div>
      </div>

      {/* Tipo de Norma */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--g-text-secondary)]">
          Tipo de norma
        </span>
        <div className="flex flex-wrap gap-1.5">
          {tipoNormaOptions.map(opt => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              active={filters.tipoNorma.includes(opt.value)}
              onClick={() =>
                onChange({ ...filters, tipoNorma: toggle(filters.tipoNorma, opt.value) })
              }
            />
          ))}
        </div>
      </div>

      {/* Estado ES */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--g-text-secondary)]">
          Transposición España
        </span>
        <div className="flex flex-wrap gap-1.5">
          {estadoESOptions.map(opt => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              active={filters.estadoES.includes(opt.value)}
              onClick={() =>
                onChange({ ...filters, estadoES: toggle(filters.estadoES, opt.value) })
              }
              dotColor={opt.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/** Utility: check if a norma passes the active filters */
export const normaPassesFilter = (
  norma: { tipo: TipoNorma; estadoES: EstadoES },
  bloqueEstadoUE: { vigentes: number; enProceso: number; planificadas: number; enRevision: number },
  filters: FilterState,
): boolean => {
  // Tipo
  if (filters.tipoNorma.length > 0 && !filters.tipoNorma.includes(norma.tipo)) return false;
  // Estado ES
  if (filters.estadoES.length > 0 && !filters.estadoES.includes(norma.estadoES)) return false;
  return true;
};

/** Utility: check if a bloque has any matching estado UE */
export const bloquePassesEstadoUE = (
  bloque: { vigentes: number; enProceso: number; planificadas: number; enRevision: number },
  estadoUE: EstadoUE[],
): boolean => {
  if (estadoUE.length === 0) return true;
  return estadoUE.some(e => {
    if (e === 'vigente') return bloque.vigentes > 0;
    if (e === 'proceso') return bloque.enProceso > 0;
    if (e === 'planificada') return bloque.planificadas > 0;
    if (e === 'revision') return bloque.enRevision > 0;
    return false;
  });
};
