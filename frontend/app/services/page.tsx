import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical,
  Target, BarChart3, FileText, ArrowRight, CheckCircle,
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';
import { SERVICES } from '@/lib/data';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-stack geoscience services — geological mapping, geophysics, remote sensing, GIS, hydrogeology, environmental assessment, mineral exploration, data interpretation, and regulatory support.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical, Target, BarChart3, FileText,
};

const colorClasses = {
  cyan: {
    icon: 'text-geo-cyan',
    bg: 'bg-geo-cyan/10',
    border: 'border-geo-cyan/20',
    badge: 'bg-geo-cyan/10 text-geo-cyan border-geo-cyan/20',
    glow: 'shadow-geo',
  },
  copper: {
    icon: 'text-geo-copper',
    bg: 'bg-geo-copper/10',
    border: 'border-geo-copper/20',
    badge: 'bg-geo-copper/10 text-geo-copper border-geo-copper/20',
    glow: 'shadow-copper',
  },
  emerald: {
    icon: 'text-geo-emerald',
    bg: 'bg-geo-emerald/10',
    border: 'border-geo-emerald/20',
    badge: 'bg-geo-emerald/10 text-geo-emerald border-geo-emerald/20',
    glow: 'shadow-emerald',
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">What We Do</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Integrated{' '}
            <span className="text-gradient-cyan">Geoscience</span>
            <br />
            Services
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From satellite imagery to deep subsurface modeling — every discipline you need to take your project from concept to confidence.
          </p>
        </div>
      </section>

      {/* Services */}
      <div className="space-y-2">
        {SERVICES.map((service, i) => {
          const Icon = iconMap[service.icon] || Layers;
          const colors = colorClasses[service.color as keyof typeof colorClasses] || colorClasses.cyan;
          const isEven = i % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className={`section-padding relative overflow-hidden ${isEven ? 'bg-geo-black' : 'bg-geo-dark/60'}`}
            >
              <div className="absolute inset-0 geo-grid-bg opacity-30" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <span className={`text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${colors.badge}`}>
                        {String(i + 1).padStart(2, '0')} / Service
                      </span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold font-display text-white mb-4 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-slate-400 leading-relaxed mb-6 text-lg">{service.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {/* Process */}
                      <div className="p-4 rounded-xl bg-geo-panel border border-geo-border/30">
                        <div className="text-[10px] font-mono text-geo-cyan tracking-widest uppercase mb-3">Process</div>
                        <ol className="space-y-2">
                          {service.process.map((step, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                              <span className="font-mono text-geo-cyan/60 flex-shrink-0">{String(j + 1).padStart(2, '0')}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      {/* Deliverables */}
                      <div className="p-4 rounded-xl bg-geo-panel border border-geo-border/30">
                        <div className="text-[10px] font-mono text-geo-copper tracking-widest uppercase mb-3">Deliverables</div>
                        <ul className="space-y-2">
                          {service.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-xs text-slate-400">
                              <CheckCircle className="w-3 h-3 text-geo-emerald flex-shrink-0 mt-0.5" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-3">Technologies Used</div>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-geo-panel border border-geo-border/30 text-xs text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href="/contact" className="btn-primary inline-flex group">
                      Discuss This Service
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Image */}
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-geo-panel">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-geo-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {service.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 rounded-lg bg-geo-black/60 backdrop-blur-sm text-[10px] text-slate-300 border border-geo-border/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CTABanner />
    </div>
  );
}
