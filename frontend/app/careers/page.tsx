import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Briefcase, ArrowRight, Users, Globe, Zap } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Frandee Geoscience team. Open positions for geologists, geophysicists, GIS specialists, and field technicians.',
};

const openings = [
  { id: 1, title: 'Senior Exploration Geologist', department: 'Geology', location: 'Yenagoa, Bayelsa (Field)', type: 'Full-time', experience: '8+ years', description: 'Lead exploration geology programs across West Africa, managing field teams and integrating multi-source datasets for target generation.' },
  { id: 2, title: 'Geophysicist (IP Surveys)', department: 'Geophysics', location: 'Yenagoa, Bayelsa / Remote', type: 'Full-time', experience: '5+ years', description: 'Design, execute, and interpret induced polarization surveys for mineral exploration projects across Sub-Saharan Africa.' },
  { id: 3, title: 'GIS Analyst', department: 'GIS & Remote Sensing', location: 'Yenagoa, Bayelsa / Hybrid', type: 'Full-time', experience: '3+ years', description: 'Develop and maintain GIS databases, perform spatial analysis, and produce publication-quality geological maps for exploration projects.' },
  { id: 4, title: 'Hydrogeologist', department: 'Hydrogeology', location: 'Yenagoa, Bayelsa (Field)', type: 'Full-time', experience: '4+ years', description: 'Conduct hydrogeological investigations, aquifer testing, and groundwater modeling for mining, infrastructure, and humanitarian projects.' },
  { id: 5, title: 'Environmental Scientist', department: 'Environmental', location: 'Yenagoa, Bayelsa', type: 'Full-time', experience: '3+ years', description: 'Prepare EIA/ESIA reports, conduct environmental baseline surveys, and support regulatory compliance for mining and infrastructure clients.' },
  { id: 6, title: 'Geoscience Graduate (Internship)', department: 'All Departments', location: 'Yenagoa, Bayelsa', type: 'Internship', experience: 'Graduate level', description: 'A 6-month structured internship program for recent geology, geophysics, or environmental science graduates. Hands-on project exposure.' },
];

const deptColors: Record<string, string> = {
  'Geology': 'text-geo-copper bg-geo-copper/10 border-geo-copper/20',
  'Geophysics': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'GIS & Remote Sensing': 'text-geo-cyan bg-geo-cyan/10 border-geo-cyan/20',
  'Hydrogeology': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Environmental': 'text-geo-emerald bg-geo-emerald/10 border-geo-emerald/20',
  'All Departments': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
};

const perks = [
  { icon: Globe, title: 'Global Projects', description: 'Work on impactful exploration projects across 22+ countries.' },
  { icon: Users, title: 'Expert Team', description: 'Collaborate with world-class geoscientists and technical specialists.' },
  { icon: Zap, title: 'Modern Technology', description: 'Access to industry-leading software, UAVs, and field equipment.' },
  { icon: Briefcase, title: 'Career Growth', description: 'Structured career paths and professional development programs.' },
];

export default function CareersPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-20 text-slate-900">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-geo-dark">
        <GeoBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-geo-dark via-geo-navy to-geo-black/95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Join Our Team</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Build Your Career in{' '}
            <span className="text-gradient-cyan">Geoscience</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Join a world-class team of geoscientists delivering high-impact exploration and environmental programs across Africa.
          </p>
        </div>
      </section>

      {/* Why join */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-geo-cyan/10 flex items-center justify-center mx-auto mb-3">
                  <perk.icon className="w-5 h-5 text-geo-cyan" />
                </div>
                <h3 className="font-semibold text-geo-dark mb-1">{perk.title}</h3>
                <p className="text-sm text-slate-600">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Open Positions"
            title="Current"
            titleHighlight="Openings"
            align="left"
            tone="light"
            className="mb-10"
          />

          <div className="space-y-4">
            {openings.map((job) => (
              <div key={job.id} className="group p-6 glass-card rounded-2xl hover:border-geo-cyan/20 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${deptColors[job.department] || ''}`}>
                        {job.department}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 border border-slate-200 bg-slate-50 px-2.5 py-0.5 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-geo-dark mb-2 group-hover:text-geo-cyan transition-colors">{job.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-geo-copper" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-geo-copper" />
                        {job.experience}
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-geo-cyan/20 text-geo-cyan text-sm font-medium hover:bg-geo-cyan/10 transition-all flex-shrink-0 self-start"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Speculative application */}
          <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-geo-copper/5 to-transparent border border-geo-copper/10 text-center">
            <h3 className="text-xl font-bold font-display text-geo-dark mb-3">Don't See Your Role?</h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">We're always interested in talented geoscientists. Send us your CV and we'll be in touch when the right opportunity arises.</p>
            <Link href="/contact" className="btn-copper inline-flex">
              Send Speculative Application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
