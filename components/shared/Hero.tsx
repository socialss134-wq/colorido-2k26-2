'use client';

import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/shared/Countdown';
import { FEST_CONFIG, COUNTDOWN_DATE } from '@/lib/constants';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function dateRange(start: string, end: string) {
  const [sy, sm, sd] = start.split('-').map(Number);
  const [, em, ed] = end.split('-').map(Number);
  return sm === em
    ? `${sd}–${ed} ${MONTHS[sm - 1]} ${sy}`
    : `${sd} ${MONTHS[sm - 1]} – ${ed} ${MONTHS[em - 1]} ${sy}`;
}

const stats = [
  { value: '20+', label: 'Events' },
  { value: '4', label: 'Days' },
  { value: '500+', label: 'Participants' },
  { value: '15+', label: 'Colleges' },
];

export function Hero() {
  const dates = dateRange(FEST_CONFIG.startDate, FEST_CONFIG.endDate);

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--colorido-pink))]/30 blur-3xl animate-float" aria-hidden />
      <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--colorido-blue))]/30 blur-3xl animate-float-delayed" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--colorido-green))]" />
              College Cultural &amp; Sports Fest
            </p>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              COLORIDO
              <br />
              <span className="text-gradient">2K26</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/70 sm:text-xl">{FEST_CONFIG.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-white/50" />{dates}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-white/50" />{FEST_CONFIG.venue}</span>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/registration">Register now<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <Link href="/cultural">Explore events</Link>
              </Button>
            </div>
          </div>

          <div className="glass-dark rounded-3xl p-6 sm:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Fest begins in</p>
            <Countdown targetDate={COUNTDOWN_DATE} variant="dark" />
            <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/60">
              Registration closes {new Date(FEST_CONFIG.registrationDeadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-white/10 py-6 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
              <dd className="font-display text-3xl font-extrabold sm:text-4xl">{s.value}</dd>
              <dt className="mt-1 text-sm text-white/60">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="stripe" aria-hidden />
    </section>
  );
}
