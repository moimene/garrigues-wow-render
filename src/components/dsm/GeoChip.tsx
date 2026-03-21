interface GeoChipProps {
  variant: 'UE' | 'ES';
  className?: string;
}

export const GeoChip = ({ variant, className = '' }: GeoChipProps) => (
  <span
    className={`inline-flex items-center justify-center text-[10px] font-bold leading-none px-1.5 py-0.5 ${className}`}
    style={{
      background: 'var(--g-brand-3308)',
      color: 'var(--g-text-inverse)',
      borderRadius: 'var(--g-radius-sm)',
      letterSpacing: '0.04em',
    }}
  >
    {variant}
  </span>
);
