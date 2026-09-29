import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { LogoMark } from '@/components/shared/LogoMark';
import { FEST_CONFIG } from '@/lib/constants';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Cultural Events', href: '/cultural' },
  { label: 'Sports Events', href: '/sports' },
  { label: 'Registration', href: '/registration' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Results', href: '/results' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Contact', href: '/contact' },
];

const socialIcons = [
  { Icon: Instagram, href: FEST_CONFIG.socials.instagram, label: 'Instagram' },
  { Icon: Twitter, href: FEST_CONFIG.socials.twitter, label: 'Twitter' },
  { Icon: Facebook, href: FEST_CONFIG.socials.facebook, label: 'Facebook' },
  { Icon: Youtube, href: FEST_CONFIG.socials.youtube, label: 'YouTube' },
  { Icon: Linkedin, href: FEST_CONFIG.socials.linkedin, label: 'LinkedIn' },
];

const heading = 'mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="stripe" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="bg-white/10" />
              <span className="font-display text-lg font-extrabold tracking-tight">COLORIDO 2K26</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {FEST_CONFIG.tagline}. A celebration of cultural and sports talent.
            </p>
          </div>

          <div>
            <h3 className={heading}>Explore</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" /><span>{FEST_CONFIG.address}</span></li>
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-white/40" /><a href={`mailto:${FEST_CONFIG.email}`} className="hover:text-white">{FEST_CONFIG.email}</a></li>
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-white/40" /><a href={`tel:${FEST_CONFIG.phone.replace(/\s/g, '')}`} className="hover:text-white">{FEST_CONFIG.phone}</a></li>
            </ul>
          </div>

          <div>
            <h3 className={heading}>Follow us</h3>
            <div className="flex flex-wrap gap-2">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {FEST_CONFIG.name}. All rights reserved.</span>
          <span>{FEST_CONFIG.college}</span>
        </div>
      </div>
    </footer>
  );
}
