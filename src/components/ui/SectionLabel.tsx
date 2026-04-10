interface SectionLabelProps {
  label: string;
  light?: boolean;
  className?: string;
}

export function SectionLabel({ label, light = false, className = '' }: SectionLabelProps) {
  return (
    <div className={['flex items-center gap-3', className].join(' ')}>
      <span className="w-0.5 h-5 bg-lemon shrink-0" aria-hidden="true" />
      <span
        className={[
          'font-roboto font-medium text-xs uppercase tracking-widest',
          light ? 'text-white' : 'text-deep',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  );
}
