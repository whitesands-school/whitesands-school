import { ReactNode } from 'react';

type Category = 'Academic' | 'Sport' | 'Events' | 'Community' | 'Spiritual';

interface BadgeProps {
  category: Category;
  className?: string;
  children?: ReactNode;
}

const categoryClasses: Record<Category, string> = {
  Academic:  'bg-deep text-white',
  Sport:     'bg-bold text-white',
  Events:    'bg-lemon text-dark',
  Community: 'bg-muted text-white',
  Spiritual: 'bg-deep text-white',
};

export function Badge({ category, className = '', children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-block font-roboto font-medium text-xs uppercase tracking-wide px-2.5 py-1 rounded',
        categoryClasses[category],
        className,
      ].join(' ')}
    >
      {children ?? category}
    </span>
  );
}
