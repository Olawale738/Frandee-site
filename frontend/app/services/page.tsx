import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type { ComponentType } from 'react';
import {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical,
  Target, BarChart3, FileText, ArrowRight, CheckCircle,
} from 'lucide-react';
import GeoBackground from '@/components/shared/GeoBackground';
import { SERVICES } from '@/lib/data';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Integrated geoscience, oil and gas, petrophysics, reservoir basin modeling, geotechnics, pipeline corrosivity, geochemical analysis, environmental, GIS, and field support services.',
};

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical, Target, BarChart3, FileText,
};

const colorClasses = {
  cyan: {
    icon: 'text-geo-cyan',
    bg: 'bg-geo-cyan/10',
    border: 'border-geo-cyan/20',
    badge: 'bg-geo-cyan/10 text-geo-cyan border-geo-cyan/20',
  },
  copper: {
    icon: 'text-geo-copper',
    bg: 'bg-geo-copper/10',
    border: 'border-geo-copper/20',
    badge: 'bg-geo-copper/10 text-geo-copper border-geo-copper/20',
  },
  emerald: {
    icon: 'text-geo-emerald',
    bg: 'bg-geo-emerald/10',
    border: 'border-geo-emerald/20',
    badge: 'bg-geo-emerald/10 text-geo-emerald border-geo-emerald/20',
  },
};

const serviceGallery = [
  {
    src: '/images/ves-ert/ves-12.jpg',
    title: 'Electrical resistivity field acquisition',
  },
  {
    src: '/images/mineral-exploration/mineral-13.jpg',
    title: 'Mineral exploration terrain assessment',
  },
  {
    src: '/images/conferences/conf-08.jpg',
    title: 'Technical review and stakeholder briefing',
  },
  {
    src: '/images/students/student-03.jpg',
    title: 'Geoscience training and data review',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 text-slate-900">
      <section className="relative overflow-hidden bg-geo-dark py-20 lg:py-24">
        <GeoBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-geo-dark via-geo-navy to-geo-black/95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">What We Do</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Integrated <span className="text-gradient-cyan">Geoscience</span>
            <br />
            Services
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From field operations and geotechnics to petrophysics, reservoir basin evaluation, oil and gas support, and geochemical interpretation.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] || Layers;
              const colors = colorClasses[service.color as keyof typeof colorClasses] || colorClasses.cyan;
              return (
                <Link
                  key={service.id}
                  href={`#${service.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-geo-cyan/30 hover:bg-white hover:shadow-lg"
                >
                  <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${colors.bg}`}>
                    <Icon className={`h-4 w-4 ${colors.icon}`} />
                  </span>
                  <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-geo-dark">
                    {service.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div>
        {SERVICES.map((service, i) => {
          const Icon = iconMap[service.icon] || Layers;
          const colors = colorClasses[service.color as keyof typeof colorClasses] || colorClasses.cyan;
          const isEven = i % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className={`relative scroll-mt-24 overflow-hidden py-16 lg:py-24 ${isEven ? 'bg-slate-50' : 'bg-white'}`}
            >
              <div className="absolute inset-0 geo-grid-bg opacity-20" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="mb-5 flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.bg} border ${colors.border}`}>
                        <Icon className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-widest ${colors.badge}`}>
                        {String(i + 1).padStart(2, '0')} / Service
                      </span>
                    </div>

                    <h2 className="mb-4 text-3xl font-bold font-display leading-tight text-geo-dark lg:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-slate-600">{service.description}</p>

                    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-geo-cyan">Process</div>
                        <ol className="space-y-2">
                          {service.process.map((step, j) => (
                            <li key={step} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                              <span className="flex-shrink-0 font-mono text-geo-cyan">{String(j + 1).padStart(2, '0')}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-geo-copper">Deliverables</div>
                        <ul className="space-y-2">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                              <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-geo-emerald" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-7">
                      <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">Technologies Used</div>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href="/contact" className="btn-primary inline-flex group">
                      Discuss This Service
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-200">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-geo-dark/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {service.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="rounded-lg border border-white/20 bg-geo-black/65 px-2 py-1 text-[10px] text-slate-100 backdrop-blur-sm">
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

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px w-8 bg-geo-copper" />
              <span className="text-xs font-mono tracking-widest text-geo-copper uppercase">Field Capability</span>
            </div>
            <h2 className="text-3xl font-bold font-display text-geo-dark lg:text-4xl">
              More Field Evidence, No Repeated Service Images
            </h2>
            <p className="mt-4 text-slate-600">
              A wider view of Frandee's field, training, exploration, and technical review work across geoscience assignments.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {serviceGallery.map((item, index) => (
              <div
                key={item.src}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={index === 0 ? 'aspect-[4/3] md:aspect-auto md:h-full min-h-[360px]' : 'aspect-[4/3]'}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-geo-dark/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
