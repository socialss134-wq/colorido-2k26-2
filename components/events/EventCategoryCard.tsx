import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  tags?: string[];
}

export function EventCategoryCard({ title, description, href, icon, gradient, tags }: EventCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl"
    >
      <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', gradient)} />
      <div className={cn('flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg', gradient)}>
        {icon}
      </div>
      <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      {tags && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/70">{t}</span>
          ))}
        </div>
      )}
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
