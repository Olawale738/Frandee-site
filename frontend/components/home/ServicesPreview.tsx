'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical,
  Target, BarChart3, FileText, ArrowRight,
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const services = [
  { icon: Layers, title: 'Geological Mapping', description: 'Systematic bedrock and surface mapping programs using modern field and remote techniques.', color: 'cyan', href: '/services#geological' },
  { icon: Activity, title: 'Geophysical Surveys', description: 'Ground and airborne geophysics including IP, EM, magnetics, gravity, and seismic methods.', color: 'copper', href: '/services#geophysics' },
  { icon: Globe, title: 'Remote Sensing', description: 'Multi-spectral satellite imagery analysis for lithological and alteration mapping at scale.', color: 'emerald', href: '/services#remote-sensing' },
  { icon: MapPin, title: 'GIS & Spatial Analysis', description: 'Advanced spatial data management, analysis, and visualization for exploration programs.', color: 'cyan', href: '/services#gis' },
  { icon: Droplets, title: 'Hydrogeology', description: 'Groundwater exploration, aquifer characterization, and water resource management studies.', color: 'cyan', href: '/services#hydro' },
  { icon: FlaskConical, title: 'Environmental Assessment', description: 'EIAs, ESIAs, and environmental baseline surveys for regulatory compliance worldwide.', color: 'emerald', href: '/services#environmental' },
  { icon: Target, title: 'Mineral Exploration', description: 'End-to-end exploration programs from first-pass reconnaissance to drill-ready targets.', color: 'copper', href: '/services#exploration' },
  { icon: BarChart3, title: 'Data Interpretation', description: 'Integrated 3D modeling and geostatistical analysis of complex multi-source datasets.', color: 'cyan', href: '/services#data' },
  { icon: FileText, title: 'Regulatory Support', description: 'Expert guidance through complex permitting and compliance requirements worldwide.', color: 'copper', href: '/services#regulatory' },
];

const colorMap = {
  cyan: { bg: 'bg-geo-cyan/10', icon: 'text-geo-cyan', border: 'hover:border-geo-cyan/30' },
  copper: { bg: 'bg-geo-copper/10', icon: 'text-geo-copper', border: 'hover:border-geo-copper/30' },
  emerald: { bg: 'bg-geo-emerald/10', icon: 'text-geo-emerald', border: 'hover:border-geo-emerald/30' },
};

export default function ServicesPreview() {
  return (
    <section className="section-padding relative bg-geo-black overflow-hidden">
      <div className="absolute inset-0 geo-grid-bg opacity-40" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-geo-copper/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Do"
          title="Integrated Geoscience"
          titleHighlight="Solutions"
          description="Comprehensive geoscience capabilities under one roof — from satellite to subsurface, field to database, exploration to compliance."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
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
                  href={service.href}
                  className={`group block p-6 rounded-2xl glass-card border border-geo-border/30 ${colors.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-panel service-card`}
                >
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="text-base font-semibold font-display text-white mb-2 group-hover:text-geo-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {service.description}
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
