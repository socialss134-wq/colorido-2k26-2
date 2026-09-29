import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
  action?: { label: string; href: string };
}

export function SectionHeading({ title, subtitle, eyebrow, centered = true, className, action }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10', centered ? 'text-center' : action && 'flex items-end justify-between gap-6', className)}>
      <div className={cn(centered && 'mx-auto max-w-2xl')}>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className={cn('mt-3 text-base text-muted-foreground', centered ? 'mx-auto' : 'max-w-2xl')}>{subtitle}</p>
        )}
      </div>
      {action && !centered && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
