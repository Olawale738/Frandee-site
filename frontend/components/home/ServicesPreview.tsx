'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical,
  Target, BarChart3, FileText, ArrowRight,
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import { SERVICES } from '@/lib/data';

const iconMap = {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical, Target, BarChart3, FileText,
};

const colorMap = {
  cyan: { bg: 'bg-geo-cyan/10', icon: 'text-geo-cyan', border: 'hover:border-geo-cyan/30' },
  copper: { bg: 'bg-geo-copper/10', icon: 'text-geo-copper', border: 'hover:border-geo-copper/30' },
  emerald: { bg: 'bg-geo-emerald/10', icon: 'text-geo-emerald', border: 'hover:border-geo-emerald/30' },
};

export default function ServicesPreview() {
  return (
    <section className="section-padding relative bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 geo-grid-bg opacity-15" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-geo-cyan/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Do"
          title="Integrated Geoscience"
          titleHighlight="Solutions"
          description="Comprehensive geoscience capabilities under one roof: from satellite to subsurface, field to database, exploration to compliance."
          tone="light"
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Layers;
            const colors = colorMap[service.color as keyof typeof colorMap];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/services#${service.id}`}
                  className={`group block p-6 rounded-xl bg-white border border-slate-200 shadow-sm ${colors.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl service-card`}
                >
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="text-base font-semibold font-display text-geo-dark mb-2 group-hover:text-geo-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 group-hover:text-geo-cyan transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-secondary inline-flex">
            View All Services
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
