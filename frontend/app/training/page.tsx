import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Monitor, MapPin, BookOpen, Award, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Training & Professional Development',
  description: 'Professional geoscience training programs — GIS workshops, field training, research seminars, and certification courses for industry professionals.',
};

const courses = [
  {
    id: 'gis-exploration',
    title: 'GIS for Mineral Exploration',
    format: 'Workshop',
    duration: '5 days',
    level: 'Intermediate',
    delivery: 'In-person / Online',
    icon: MapPin,
    color: 'cyan',
    description: 'Comprehensive hands-on training in ArcGIS Pro and QGIS for geological mapping, data management, and spatial analysis in mineral exploration contexts.',
    topics: ['ArcGIS Pro & QGIS fundamentals', 'Geodatabase design', 'Spatial analysis for targeting', 'Map cartography & reporting', 'Python scripting for GIS'],
    certification: 'Frandee GIS Professional Certificate',
    participants: '10–20 per cohort',
    price: 'Contact for pricing',
  },
  {
    id: 'remote-sensing',
    title: 'Remote Sensing & Geological Mapping',
    format: 'Short Course',
    duration: '3 days',
    level: 'Intermediate',
    delivery: 'In-person / Online',
    icon: Monitor,
    color: 'emerald',
    description: 'Learn to extract geological intelligence from Sentinel-2, Landsat, and ASTER satellite imagery using industry-standard workflows and machine learning.',
    topics: ['Satellite imagery principles', 'Band ratio composites', 'Hydrothermal alteration mapping', 'Google Earth Engine basics', 'Machine learning classification'],
    certification: 'Frandee Remote Sensing Certificate',
    participants: '8–15 per cohort',
    price: 'Contact for pricing',
  },
  {
    id: 'field-geology',
    title: 'Field Geology & Exploration Methods',
    format: 'Field Course',
    duration: '7 days',
    level: 'All levels',
    delivery: 'Field-based',
    icon: MapPin,
    color: 'copper',
    description: 'Intensive field training in geological mapping, sampling methods, geophysical instruments, and exploration data collection in real geological environments.',
    topics: ['Geological mapping techniques', 'Rock sampling & logging', 'Geophysical instrument operation', 'Field safety & HSE', 'Data recording & QA/QC'],
    certification: 'Frandee Field Geology Certificate',
    participants: '6–12 per cohort',
    price: 'Contact for pricing',
  },
  {
    id: 'data-interpretation',
    title: 'Geoscience Data Interpretation',
    format: 'Workshop',
    duration: '3 days',
    level: 'Advanced',
    delivery: 'In-person / Online',
    icon: BookOpen,
    color: 'cyan',
    description: 'Advanced training in integrating and interpreting geochemical, geophysical, and geological datasets using Oasis Montaj, Leapfrog, and Python.',
    topics: ['Multi-element geochemistry', 'Geophysical data processing', '3D geological modeling', 'Target prioritization', 'Presentation & reporting'],
    certification: 'Frandee Data Interpretation Certificate',
    participants: '8–15 per cohort',
    price: 'Contact for pricing',
  },
  {
    id: 'environmental-gis',
    title: 'Environmental GIS & Baseline Studies',
    format: 'Short Course',
    duration: '3 days',
    level: 'Intermediate',
    delivery: 'In-person / Online',
    icon: Monitor,
    color: 'emerald',
    description: 'Environmental GIS techniques for baseline surveys, impact mapping, and compliance reporting for EIA/ESIA projects.',
    topics: ['Environmental baseline methodology', 'GIS for impact assessment', 'Regulatory reporting', 'Stakeholder mapping', 'Monitoring design'],
    certification: 'Frandee Environmental GIS Certificate',
    participants: '10–20 per cohort',
    price: 'Contact for pricing',
  },
  {
    id: 'corporate-training',
    title: 'Corporate & Customized Training',
    format: 'Bespoke',
    duration: 'Flexible',
    level: 'All levels',
    delivery: 'On-site / Online',
    icon: GraduationCap,
    color: 'copper',
    description: 'Tailored geoscience training programs designed for government agencies, mining companies, and universities — delivered at your location or online.',
    topics: ['Custom curriculum design', 'Expert instructors', 'Practical case studies', 'Your data & projects', 'Team certification'],
    certification: 'Custom certification available',
    participants: 'Flexible',
    price: 'Contact for quote',
  },
];

const colorMap = {
  cyan: { icon: 'text-geo-cyan', bg: 'bg-geo-cyan/10', badge: 'bg-geo-cyan/10 text-geo-cyan border-geo-cyan/20' },
  copper: { icon: 'text-geo-copper', bg: 'bg-geo-copper/10', badge: 'bg-geo-copper/10 text-geo-copper border-geo-copper/20' },
  emerald: { icon: 'text-geo-emerald', bg: 'bg-geo-emerald/10', badge: 'bg-geo-emerald/10 text-geo-emerald border-geo-emerald/20' },
};

export default function TrainingPage() {
  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Learn From Experts</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Professional{' '}
            <span className="text-gradient-cyan">Training</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Practical, industry-relevant geoscience training programs designed to upskill professionals, teams, and organizations.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-geo-border/30 bg-geo-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Professionals Trained' },
              { value: '20+', label: 'Training Programs' },
              { value: '15', label: 'Countries Reached' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold font-mono text-white mb-1">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Programs"
            title="Training"
            titleHighlight="Courses"
            description="From intensive field courses to online workshops — practical geoscience training that translates directly to better work."
            className="mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course, i) => {
              const colors = colorMap[course.color as keyof typeof colorMap];
              return (
                <div key={course.id} className="glass-card rounded-2xl p-6 hover:border-geo-cyan/20 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <course.icon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${colors.badge}`}>{course.format}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 font-mono">Duration</div>
                      <div className="text-sm font-bold text-white">{course.duration}</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{course.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Topics Covered</div>
                      <ul className="space-y-1.5">
                        {course.topics.slice(0, 4).map((t) => (
                          <li key={t} className="flex items-start gap-1.5 text-xs text-slate-400">
                            <CheckCircle className="w-3 h-3 text-geo-emerald flex-shrink-0 mt-0.5" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      {[
                        { icon: Award, label: 'Cert.', value: course.certification.replace('Frandee ', '') },
                        { icon: Users, label: 'Class Size', value: course.participants },
                        { icon: Clock, label: 'Delivery', value: course.delivery },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <item.icon className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                          <div>
                            <div className="text-[9px] text-slate-600 uppercase tracking-wide">{item.label}</div>
                            <div className="text-xs text-slate-300">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-geo-border/30">
                    <div className="text-sm text-geo-copper font-medium">{course.price}</div>
                    <Link href="/contact" className="flex items-center gap-1.5 text-sm text-geo-cyan hover:text-cyan-300 transition-colors">
                      Enroll Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
