import Link from 'next/link';
import { ArrowLeft, MapPin, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 geo-grid-bg" />
      <div className="absolute inset-0 topo-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-geo-cyan/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative text-center px-4 max-w-xl mx-auto">
        {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-lg flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-10 h-10 text-geo-copper" />
        </div>

        {/* 404 */}
        <div className="text-[120px] font-black font-mono text-geo-dark leading-none relative">
          <span className="relative z-10 text-transparent" style={{ WebkitTextStroke: '1px rgba(6,182,212,0.2)' }}>404</span>
        </div>

        <h1 className="text-3xl font-bold font-display text-geo-dark mb-3 -mt-4">
          Location Not Found
        </h1>
        <p className="text-slate-600 mb-3">
          The coordinates you're looking for don't exist on our map. This geological feature may have been moved, renamed, or never existed.
        </p>
        <p className="text-sm font-mono text-geo-cyan/50 mb-8">
          ERROR_CODE: STRATUM_NOT_LOCATED / 404
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Return to Surface
          </Link>
          <Link href="/services" className="btn-secondary">
            <Layers className="w-4 h-4" />
            Browse Services
          </Link>
        </div>

        {/* Decorative contour lines */}
        <div className="mt-16 opacity-20">
          <svg viewBox="0 0 400 60" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C50,10 100,50 150,30 C200,10 250,50 300,30 C350,10 400,30 400,30" stroke="#06b6d4" strokeWidth="1" fill="none" />
            <path d="M0,40 C50,20 100,60 150,40 C200,20 250,60 300,40 C350,20 400,40 400,40" stroke="#06b6d4" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}
