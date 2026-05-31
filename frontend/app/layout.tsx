import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://frandeeconsultingservices.com'),
  title: {
    default: 'Frandee Geoscience | Engineering & Geoscience Consulting',
    template: '%s | Frandee Geoscience',
  },
  description:
    'Professional geoscience, engineering, oil and gas, environmental, and technical research services delivered with data-driven precision.',
  keywords: [
    'geoscience',
    'geological exploration',
    'geophysics',
    'remote sensing',
    'GIS mapping',
    'hydrogeology',
    'environmental studies',
    'drill target generation',
    'geochemical analysis',
    'mineral exploration',
    'oil and gas consulting',
    'engineering consulting',
    'technical research',
  ],
  authors: [{ name: 'Frandee Geoscience' }],
  creator: 'Frandee Geoscience',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frandeeconsultingservices.com',
    siteName: 'Frandee Geoscience',
    title: 'Frandee Geoscience | Engineering & Geoscience Consulting',
    description:
      'Professional geoscience intelligence for exploration, engineering, environmental, and research-led projects.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Frandee Geoscience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frandee Geoscience | Engineering & Geoscience Consulting',
    description:
      'Professional geoscience intelligence for exploration, engineering, environmental, and research-led projects.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B1F3A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden">
        <div className="relative">
          <div
            className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
