import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Frandee Geoscience | Full-Stack Geoscience Services',
    template: '%s | Frandee Geoscience',
  },
  description:
    'From reconnaissance to drill-ready targets — and everything in between. World-class geological exploration, geophysics, remote sensing, GIS, hydrogeology, and environmental services.',
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
  ],
  authors: [{ name: 'Frandee Geoscience' }],
  creator: 'Frandee Geoscience',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frandeegeoscience.com',
    siteName: 'Frandee Geoscience',
    title: 'Frandee Geoscience | Full-Stack Geoscience Services',
    description: 'World-class geoscience intelligence platform — from reconnaissance to drill-ready targets.',
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
    title: 'Frandee Geoscience | Full-Stack Geoscience Services',
    description: 'World-class geoscience intelligence platform — from reconnaissance to drill-ready targets.',
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
  themeColor: '#060a12',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-geo-black text-slate-100 font-sans antialiased overflow-x-hidden">
        <div className="relative">
          {/* Global noise texture */}
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
