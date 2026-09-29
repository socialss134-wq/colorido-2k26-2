import Link from 'next/link';
import { Calendar, MapPin, Clock, Palette, Music, Mic, Shirt, Cpu, BookOpen, Users, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { FestEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusConfig = {
  open: { label: 'Open', dot: 'bg-emerald-500', text: 'text-emerald-700' },
  closed: { label: 'Closed', dot: 'bg-red-500', text: 'text-red-700' },
  'filling-fast': { label: 'Filling fast', dot: 'bg-amber-500', text: 'text-amber-700' },
};

const categoryGradient: Record<string, string> = {
  Cultural: 'from-[hsl(336_78%_42%)] to-[hsl(18_90%_50%)]',
  Sports: 'from-[hsl(215_85%_32%)] to-[hsl(170_80%_34%)]',
};

const subIcons: Record<string, React.ElementType> = {
  'Fine Arts': Palette,
  'Music & Band': Music,
  Dance: Music,
  Choreoday: Users,
  Dramatics: Mic,
  'Fashion Show': Shirt,
  'Tekraft Events': Cpu,
  Literary: BookOpen,
};

export function EventCard({ event }: { event: FestEvent }) {
  const status = statusConfig[event.status];
  const gradient = categoryGradient[event.category] || categoryGradient.Cultural;
  const Icon = subIcons[event.subCategory] || (event.category === 'Sports' ? Trophy : Sparkles);

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={cn('relative h-32 overflow-hidden bg-gradient-to-br', gradient)}>
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <Icon className="absolute -bottom-6 -right-4 h-32 w-32 text-white/20" aria-hidden />
        <span className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {event.subCategory}
        </span>
        <span className={cn('absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold shadow-sm', status.text)}>
          <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {event.type}{event.gender ? ` · ${event.gender}` : ''}
        </p>
        <h3 className="mt-1 font-display text-lg font-extrabold tracking-tight transition-colors group-hover:text-primary">
          {event.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0" />
            {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </li>
          <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" />{event.time}</li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /><span className="truncate">{event.venue}</span></li>
        </ul>

        <div className="mt-auto pt-5"><div className="flex items-center justify-between gap-3 border-t pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Entry fee</p>
            <p className="font-display text-lg font-extrabold">{event.registrationFee ? `₹${event.registrationFee}` : 'Free'}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={`/events/${event.id}`}>Details</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/registration?eventId=${event.id}`}>Register</Link>
            </Button>
          </div>
        </div></div>
      </div>
    </Card>
  );
}
