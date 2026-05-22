import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, BookOpen, Target, ArrowRight } from 'lucide-react';
import { TEAM } from '@/lib/data';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the world-class geoscientists, geophysicists, and GIS specialists that power Frandee Geoscience.',
};

export default function TeamPage() {
  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">The Experts</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            World-Class{' '}
            <span className="text-gradient-cyan">Geoscientists</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Our team of 50+ specialists combines deep technical expertise with hands-on field experience across Africa's most complex geological environments.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {TEAM.map((member, i) => (
              <div
                key={member.id}
                className="group glass-card rounded-2xl overflow-hidden hover:border-geo-cyan/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Photo */}
                  <div className="relative w-full sm:w-48 h-56 sm:h-auto flex-shrink-0 bg-geo-panel">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-geo-black/40 to-transparent sm:bg-gradient-to-r" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-geo-copper tracking-widest uppercase mb-1">{member.role}</div>
                      <h3 className="text-xl font-bold font-display text-white mb-3">{member.name}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {member.specialties.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-full bg-geo-panel border border-geo-border/30 text-[10px] text-slate-400">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Education */}
                      <div className="text-xs text-slate-500 mb-3">{member.education}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Stats */}
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold font-mono text-geo-cyan">{member.publications}</div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-wide">Papers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold font-mono text-geo-copper">{member.projects}+</div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-wide">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold font-mono text-geo-emerald">{member.experience}</div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-wide">Exp.</div>
                        </div>
                      </div>
                      <a href={member.linkedin} className="w-8 h-8 rounded-lg bg-geo-panel border border-geo-border/30 flex items-center justify-center text-slate-400 hover:text-geo-cyan hover:border-geo-cyan/30 transition-all">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Advisory board teaser */}
          <div className="p-8 rounded-2xl glass-card text-center border border-geo-copper/10">
            <div className="text-[10px] font-mono text-geo-copper tracking-widest uppercase mb-3">Advisory Board</div>
            <h2 className="text-2xl font-bold font-display text-white mb-3">
              Supported by International Experts
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6">
              Our advisory board includes senior geologists and exploration executives from leading mining companies and research universities worldwide.
            </p>
            <Link href="/contact" className="btn-copper inline-flex">
              Join Our Network <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Join section */}
      <section className="py-20 bg-geo-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(6,182,212,0.05),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display text-white mb-4">Work With Us</h2>
          <p className="text-slate-400 mb-8">We're always looking for passionate geoscientists and technical specialists to join our growing team.</p>
          <Link href="/careers" className="btn-primary">
            View Open Positions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
