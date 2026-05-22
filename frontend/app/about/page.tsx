import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Globe, Shield, Users, Zap, Mountain, FlaskConical, BookOpen } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Frandee Geoscience — our story, mission, team, and commitment to scientific excellence in geoscience services.',
};

const milestones = [
  { year: '2010', title: 'Company Founded', description: 'Dr. Okonkwo establishes Frandee Geoscience in Lagos, Nigeria, with a vision to deliver world-class geoscience intelligence to African exploration.' },
  { year: '2013', title: 'Regional Expansion', description: 'Expanded operations to 8 West African countries, completing 30+ exploration programs for junior and mid-tier mining companies.' },
  { year: '2016', title: 'GIS Technology Center', description: 'Launched dedicated GIS and remote sensing technology center, integrating machine learning for large-scale geological mapping.' },
  { year: '2019', title: 'Research Partnership', description: 'Established research partnerships with University of Lagos, University of Ghana, and University of Cape Town.' },
  { year: '2022', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification for quality management systems across all geoscience service lines.' },
  { year: '2024', title: '250+ Projects', description: 'Completed our 250th project milestone, spanning 22 countries and generating over 150 drill-ready targets.' },
];

const capabilities = [
  { icon: Mountain, title: 'Field Operations', description: 'Expert field teams operating in remote, harsh environments across Sub-Saharan Africa.' },
  { icon: FlaskConical, title: 'Laboratory Analysis', description: 'Partner labs for geochemical, petrographic, and environmental sample analysis.' },
  { icon: Globe, title: 'Multi-Country Reach', description: '22 countries served with licensed operations and strong regulatory relationships.' },
  { icon: BookOpen, title: 'Research Excellence', description: '40+ peer-reviewed publications and active academic partnerships.' },
  { icon: Shield, title: 'Safety Standards', description: 'Zero-harm culture with comprehensive HSE management systems and field protocols.' },
  { icon: Zap, title: 'Technology Edge', description: 'Latest software, UAV platforms, and AI-assisted data processing workflows.' },
];

export default function AboutPage() {
  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-geo-cyan" />
              <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
              Built on{' '}
              <span className="text-gradient-copper">Scientific</span>
              <br />
              Excellence
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              Since 2010, Frandee Geoscience has been delivering premium geoscience intelligence to exploration companies, governments, research institutions, and mining organizations across Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-12 border-y border-geo-border/30 bg-geo-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 15, suffix: '+', label: 'Years Experience' },
              { value: 280, suffix: '+', label: 'Projects Completed' },
              { value: 22, suffix: '', label: 'Countries Served' },
              { value: 50, suffix: '+', label: 'Specialists' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold font-mono text-white mb-1">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-geo-copper/4 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Mission & Vision"
                title="Why We"
                titleHighlight="Exist"
                align="left"
                className="mb-8"
              />
              <div className="space-y-6">
                <div className="p-6 rounded-2xl glass-card border-l-2 border-l-geo-cyan">
                  <div className="text-xs font-mono tracking-widest text-geo-cyan uppercase mb-2">Our Mission</div>
                  <p className="text-slate-300 leading-relaxed">
                    To deliver technically excellent, scientifically rigorous geoscience services that help our clients make better exploration and development decisions — faster, with greater confidence, and at lower risk.
                  </p>
                </div>
                <div className="p-6 rounded-2xl glass-card border-l-2 border-l-geo-copper">
                  <div className="text-xs font-mono tracking-widest text-geo-copper uppercase mb-2">Our Vision</div>
                  <p className="text-slate-300 leading-relaxed">
                    To be Africa's most trusted and technically capable full-stack geoscience company — the partner of choice for governments, mining companies, universities, and international organizations.
                  </p>
                </div>
                <div className="p-6 rounded-2xl glass-card border-l-2 border-l-geo-emerald">
                  <div className="text-xs font-mono tracking-widest text-geo-emerald uppercase mb-2">Our Values</div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Scientific Rigor', 'Technical Excellence', 'Client Partnership', 'Safety First', 'Innovation', 'Integrity'].map((v) => (
                      <div key={v} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-geo-emerald flex-shrink-0" />
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-geo-panel">
                <Image
                  src="/images/field-operations/field-03.jpg"
                  alt="Frandee Geoscience field team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-geo-black/60 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl glass-card border border-geo-cyan/20 shadow-geo">
                <div className="text-xs font-mono text-geo-cyan mb-1">ISO 9001:2015</div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-geo-copper" />
                  <span className="text-sm font-semibold text-white">Quality Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-geo-dark relative overflow-hidden">
        <GeoBackground className="opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technical Capabilities"
            title="What Sets Us"
            titleHighlight="Apart"
            description="A combination of deep technical expertise, modern technology, and operational capability that few geoscience firms can match."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="p-6 rounded-2xl glass-card hover:border-geo-cyan/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-geo-cyan/10 flex items-center justify-center mb-4">
                  <cap.icon className="w-5 h-5 text-geo-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Company History"
            title="Our"
            titleHighlight="Journey"
            className="mb-16"
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-geo-cyan/30 via-geo-copper/20 to-transparent -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex flex-col lg:flex-row items-center gap-6 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="w-full lg:w-5/12">
                    <div className={`p-6 rounded-2xl glass-card hover:border-geo-cyan/20 transition-all ${i % 2 === 1 ? 'lg:text-right' : ''}`}>
                      <div className="text-xs font-mono text-geo-copper mb-2">{m.year}</div>
                      <h3 className="font-bold font-display text-white text-lg mb-2">{m.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-4 h-4 rounded-full bg-geo-black border-2 border-geo-cyan shadow-glow-cyan relative z-10" />
                  </div>
                  <div className="w-full lg:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-geo-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(6,182,212,0.06),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-slate-400 mb-8">Let's discuss your geoscience project and how we can deliver exceptional results.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/team" className="btn-secondary">Meet the Team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
