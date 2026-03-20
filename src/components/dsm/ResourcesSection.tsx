import { recursos } from '@/data/dsmData';
import { useScrollReveal } from './useScrollReveal';
import { Scale, Building2, Lightbulb, MousePointerClick } from 'lucide-react';

const categoryConfig: Record<string, { label: string; icon: any }> = {
  despachos: { label: 'Despachos de Abogados', icon: Scale },
  thinktanks: { label: 'Think Tanks e Investigación', icon: Lightbulb },
  instituciones: { label: 'Instituciones UE', icon: Building2 },
  herramientas: { label: 'Herramientas Interactivas', icon: MousePointerClick },
};

export const ResourcesSection = () => {
  const categories = ['despachos', 'thinktanks', 'instituciones', 'herramientas'] as const;

  return (
    <div className="space-y-8">
      {categories.map(cat => {
        const config = categoryConfig[cat];
        const items = recursos.filter(r => r.categoria === cat);
        const Icon = config.icon;

        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4" style={{ color: 'var(--g-brand-3308)' }} />
              <h3 className="text-sm font-bold text-[var(--g-text-primary)]">{config.label}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((r, i) => (
                <ResourceCard key={i} recurso={r} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ResourceCard = ({ recurso, index }: { recurso: typeof recursos[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className="p-3 cursor-pointer"
      style={{
        background: 'var(--g-surface-card)',
        borderRadius: 'var(--g-radius-md)',
        boxShadow: 'var(--g-shadow-sm)',
        border: '1px solid var(--g-border-subtle)',
        transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${index * 60}ms`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--g-shadow-card-hover)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--g-brand-3308)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--g-shadow-sm)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--g-border-subtle)';
      }}
    >
      <div className="text-xs font-semibold text-[var(--g-text-primary)]">{recurso.nombre}</div>
      <div className="mt-1 text-[10px] text-[var(--g-text-secondary)] leading-relaxed">{recurso.descripcion}</div>
    </div>
  );
};
