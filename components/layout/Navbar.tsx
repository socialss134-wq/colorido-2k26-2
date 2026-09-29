'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoMark } from '@/components/shared/LogoMark';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

const SECONDARY = ['/about', '/announcements', '/sponsors', '/contact'];
const primary = NAV_LINKS.filter((l) => l.href !== '/' && !SECONDARY.includes(l.href));
const secondary = NAV_LINKS.filter((l) => SECONDARY.includes(l.href));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const linkClass = (active: boolean) =>
    cn(
      'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
      active
        ? 'text-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary'
        : 'text-foreground/65 hover:text-foreground'
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300',
        scrolled || open ? 'border-border bg-background/90' : 'border-transparent bg-background/70'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5" aria-label="COLORIDO 2K26 home">
          <LogoMark />
          <span className="font-display text-lg font-extrabold tracking-tight">
            COLORIDO <span className="text-primary">2K26</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {primary.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(pathname === link.href)}>
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(linkClass(secondary.some((l) => l.href === pathname)), 'inline-flex items-center gap-1 outline-none')}
            >
              More <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {secondary.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link href="/registration">Register now</Link>
          </Button>
        </div>

        <button
          className="-mr-2 rounded-lg p-2 hover:bg-muted lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-background lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-3 text-base font-medium',
                  pathname === link.href ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-2 w-full">
              <Link href="/registration">Register now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
