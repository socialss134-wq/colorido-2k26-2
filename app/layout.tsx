import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'COLORIDO 2K26 — Where Talent Meets the Spotlight',
  description:
    'COLORIDO 2K26 — A vibrant college-level cultural and sports fest. Register for cultural events, sports tournaments, and more.',
  openGraph: {
    title: 'COLORIDO 2K26 — Where Talent Meets the Spotlight',
    description:
      'A vibrant college-level cultural and sports fest. Register now for cultural events and sports tournaments.',
    images: [{ url: '/og.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">Skip to content</a>
        <Navbar />
        <main id="main" className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
