import Link from 'next/link';
import { Hero } from '@/components/shared/Hero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EventCategoryCard } from '@/components/events/EventCategoryCard';
import { EventCard } from '@/components/events/EventCard';
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard';
import { ResultCard } from '@/components/results/ResultCard';
import { Button } from '@/components/ui/button';
import { getFeaturedEvents } from '@/lib/api/events';
import { getLatestAnnouncements } from '@/lib/api/announcements';
import { getLatestResults } from '@/lib/api/results';
import { getSponsors } from '@/lib/api/sponsors';
import { getGalleryImages } from '@/lib/api/gallery';
import { FEST_CONFIG } from '@/lib/constants';
import { Palette, Trophy, ArrowRight, Users, Award, Calendar } from 'lucide-react';

const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

const reasons = [
  { icon: Users, title: 'Meet new people', text: 'Connect with 500+ participants from 15+ colleges across the region.' },
  { icon: Trophy, title: 'Win exciting prizes', text: 'Cash prizes, trophies, and certificates in every category.' },
  { icon: Calendar, title: 'Four days of action', text: 'Performances, tournaments, and memories packed into one fest.' },
  { icon: Award, title: 'Build your profile', text: 'Participation and wins add value to your academic profile.' },
];

export default async function HomePage() {
  const [featuredEvents, latestAnnouncements, latestResults, sponsors, galleryImages] = await Promise.all([
    getFeaturedEvents(),
    getLatestAnnouncements(3),
    getLatestResults(4),
    getSponsors(),
    getGalleryImages(),
  ]);

  return (
    <>
      <Hero />

      {/* About */}
      <section className={`${wrap} py-20`}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About" title="A celebration of talent, creativity and sportsmanship" centered={false} className="mb-6" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              COLORIDO 2K26 is the flagship cultural and sports fest of {FEST_CONFIG.college}. Over four days,
              students from across the region compete in music, dance, drama, basketball, volleyball and more.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/about">Learn more<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`${wrap} pb-20`}>
        <SectionHeading eyebrow="Compete" title="Two arenas, one fest" subtitle="Pick your stage — or take both." />
        <div className="grid gap-6 md:grid-cols-2">
          <EventCategoryCard
            title="Cultural"
            description="Express your creativity on the grandest stage."
            href="/cultural"
            icon={<Palette className="h-7 w-7" />}
            gradient="from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))]"
            tags={['Music', 'Dance', 'Drama', 'Fashion', 'Fine Arts', 'Literary']}
          />
          <EventCategoryCard
            title="Sports"
            description="Compete with the best and claim the trophy."
            href="/sports"
            icon={<Trophy className="h-7 w-7" />}
            gradient="from-[hsl(var(--colorido-blue))] to-[hsl(var(--colorido-green))]"
            tags={['Basketball', 'Volleyball', 'Table Tennis', 'Throwball', 'Tennikoit']}
          />
        </div>
      </section>

      {/* Featured events */}
      <section className="bg-muted/60 py-20">
        <div className={wrap}>
          <SectionHeading
            eyebrow="Highlights"
            title="Featured events"
            subtitle="Don't miss these highlights of COLORIDO 2K26."
            centered={false}
            action={{ label: 'All cultural events', href: '/cultural' }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className={`${wrap} py-20`}>
        <SectionHeading eyebrow="Updates" title="Latest announcements" centered={false} action={{ label: 'View all', href: '/announcements' }} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestAnnouncements.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="bg-muted/60 py-20">
        <div className={wrap}>
          <SectionHeading eyebrow="Winners" title="Recent results" centered={false} action={{ label: 'View all', href: '/results' }} />
          <div className="grid gap-6 sm:grid-cols-2">
            {latestResults.map((r) => (
              <ResultCard key={r.id} result={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className={`${wrap} py-20`}>
        <SectionHeading eyebrow="Partners" title="Our sponsors" subtitle="Powered by our amazing partners." />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {sponsors.slice(0, 6).map((s) => (
            <div key={s.id} className="flex h-20 w-36 items-center justify-center rounded-xl border bg-card px-3 text-center">
              <span className="font-display text-lg font-extrabold text-muted-foreground">{s.logo}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/sponsors" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View all sponsors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className={`${wrap} pb-20`}>
        <SectionHeading eyebrow="Moments" title="Gallery" centered={false} action={{ label: 'View gallery', href: '/gallery' }} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.slice(0, 8).map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`${wrap} pb-20`}>
        <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center text-white sm:px-16 sm:py-20">
          <div className="absolute inset-0 bg-grid" aria-hidden />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[hsl(var(--colorido-pink))]/35 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[hsl(var(--colorido-blue))]/35 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              Ready to be part of COLORIDO 2K26?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Register now and secure your spot in the most exciting college fest of the year.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="inverse">
                <Link href="/registration">Register now<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <Link href="/cultural">Explore events</Link>
              </Button>
            </div>
          </div>
          <div className="stripe absolute inset-x-0 bottom-0" aria-hidden />
        </div>
      </section>
    </>
  );
}
