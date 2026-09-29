'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetDate: string;
  variant?: 'light' | 'dark';
}

function calculateTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export function Countdown({ targetDate, variant = 'light' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);
  const dark = variant === 'dark';

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn('h-20 rounded-xl animate-pulse', dark ? 'bg-white/10' : 'bg-muted')} />
        ))}
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className={cn('rounded-xl p-5 text-center font-display text-xl font-bold', dark ? 'bg-white/10 text-white' : 'bg-muted')}>
        The fest has begun!
      </div>
    );
  }

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label="Countdown to the fest">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            'flex flex-col items-center justify-center rounded-xl py-4',
            dark ? 'border border-white/10 bg-white/5 text-white' : 'border bg-card shadow-sm'
          )}
        >
          <span className="font-display text-2xl font-extrabold tabular-nums sm:text-4xl">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className={cn('mt-1 text-[11px] font-semibold uppercase tracking-wider', dark ? 'text-white/60' : 'text-muted-foreground')}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
