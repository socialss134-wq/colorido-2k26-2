import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  accent?: 'warm' | 'cool';
}

export function PageHeader({ title, subtitle, eyebrow, accent = 'warm' }: PageHeaderProps) {
  const cool = accent === 'cool';
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 pb-14 pt-14 text-white sm:px-12 sm:pb-20 sm:pt-20">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className={cn(
          'absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl',
          cool ? 'bg-[hsl(var(--colorido-blue))]/40' : 'bg-[hsl(var(--colorido-pink))]/40'
        )}
        aria-hidden
      />
      <div className="relative max-w-3xl">
        {eyebrow && (
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <span
              className={cn(
                'h-1.5 w-6 rounded-full',
                cool ? 'bg-[hsl(var(--colorido-blue))]' : 'bg-[hsl(var(--colorido-pink))]'
              )}
            />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>}
      </div>
      <div className="stripe absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
