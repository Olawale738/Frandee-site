import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, FileText, Database, Globe, Users, ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Frandee Geoscience research — publications, geological datasets, scientific reports, and research collaborations.',
};

const publications = [
  {
    title: 'Hydrothermal Alteration Mapping Using ASTER and Sentinel-2 in the Birimian Supergroup, West Africa',
    authors: 'Okonkwo, A.D., Ibrahim, F., Nwosu, C.',
    journal: 'Journal of African Earth Sciences',
    year: '2024',
    doi: '10.1016/j.jafrearsci.2024.xxxxx',
    type: 'Journal Article',
    abstract: 'Multi-spectral satellite imagery was used to systematically map hydrothermal alteration zones across 1,200 km² of Birimian greenstone terrain, identifying 14 new prospective corridors.',
  },
  {
    title: 'Integrated Geophysical Characterization of Porphyry Cu-Au Systems in the Central African Copperbelt',
    authors: 'Ibrahim, F., Okonkwo, A.D., Yusuf, A.',
    journal: 'Geophysical Journal International',
    year: '2023',
    doi: '10.1093/gji/ggad.xxxxx',
    type: 'Journal Article',
    abstract: 'Systematic IP and EM surveys combined with 3D inversion modeling to characterize subsurface geometry of porphyry-style mineralization in the DRC.',
  },
  {
    title: 'Groundwater Vulnerability Mapping for Urban Aquifer Management in Southwest Nigeria',
    authors: 'Yusuf, A., Okonkwo, A.D.',
    journal: 'Hydrogeology Journal',
    year: '2023',
    doi: '10.1007/s10040-023-xxxxx',
    type: 'Journal Article',
    abstract: 'A GIS-based DRASTIC model validated with field data to assess aquifer vulnerability across Lagos metropolitan area.',
  },
  {
    title: 'Machine Learning Classification of Geological Units from Airborne Geophysical Data in Northern Nigeria',
    authors: 'Nwosu, C., Ibrahim, F., Okonkwo, A.D.',
    journal: 'Computers & Geosciences',
    year: '2022',
    doi: '10.1016/j.cageo.2022.xxxxx',
    type: 'Journal Article',
    abstract: 'Random forest and support vector machine classification of airborne magnetic and radiometric data for geological unit discrimination.',
  },
];

const themes = [
  {
    title: 'Mineral Systems & Targeting',
    description: 'Understanding ore-forming processes and developing predictive targeting frameworks for primary mineral systems in African cratons.',
    icon: Database,
    color: 'copper',
  },
  {
    title: 'Remote Sensing & AI',
    description: 'Integrating machine learning with multi-spectral and hyperspectral satellite data for automated geological mapping.',
    icon: Globe,
    color: 'cyan',
  },
  {
    title: 'Groundwater Systems',
    description: 'Characterizing aquifer systems and developing sustainable groundwater management frameworks for arid and semi-arid regions.',
    icon: FileText,
    color: 'emerald',
  },
  {
    title: 'Environmental Geochemistry',
    description: 'Research on geochemical baselines, metal mobility, and environmental impact of mining on soil and water quality.',
    icon: BookOpen,
    color: 'copper',
  },
];

const partners = [
  'University of Lagos', 'University of Ghana', 'University of Cape Town',
  'Ahmadu Bello University', 'Council for Geoscience (SA)', 'Nigeria Geological Survey Agency',
];

export default function ResearchPage() {
  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Scientific Research</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Advancing{' '}
            <span className="text-gradient-cyan">Geoscience</span>
            <br />
            Knowledge
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Our research program bridges academic excellence with practical exploration applications — publishing results, sharing data, and collaborating with world-class institutions.
          </p>
        </div>
      </section>

      {/* Research themes */}
      <section className="section-padding bg-geo-dark relative overflow-hidden">
        <GeoBackground className="opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Focus Areas"
            title="Research"
            titleHighlight="Themes"
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {themes.map((theme) => {
              const colors = {
                cyan: 'bg-geo-cyan/10 text-geo-cyan',
                copper: 'bg-geo-copper/10 text-geo-copper',
                emerald: 'bg-geo-emerald/10 text-geo-emerald',
              }[theme.color];
              return (
                <div key={theme.title} className="p-6 glass-card rounded-2xl hover:border-geo-cyan/20 transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl ${colors} flex items-center justify-center mb-4`}>
                    <theme.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{theme.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{theme.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Peer-Reviewed Publications"
            title="Selected"
            titleHighlight="Publications"
            align="left"
            className="mb-10"
          />

          <div className="space-y-4">
            {publications.map((pub, i) => (
              <div key={i} className="p-6 glass-card rounded-2xl hover:border-geo-cyan/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-geo-cyan/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-geo-cyan" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono text-geo-copper border border-geo-copper/20 bg-geo-copper/10 px-2 py-0.5 rounded">{pub.type}</span>
                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {pub.year}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-1 leading-snug">{pub.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">{pub.authors}</p>
                    <p className="text-xs text-geo-cyan/70 italic mb-3">{pub.journal}</p>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{pub.abstract}</p>
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      className="inline-flex items-center gap-1.5 text-xs text-geo-cyan hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> DOI: {pub.doi}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="#" className="btn-secondary inline-flex">
              View All 40+ Publications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-geo-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Academic Partnerships"
            title="Research"
            titleHighlight="Collaborators"
            className="mb-10"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((p) => (
              <div key={p} className="p-4 glass-card rounded-xl text-center text-sm text-slate-400 hover:text-white hover:border-geo-cyan/20 transition-all">
                <div className="w-8 h-8 rounded-lg bg-geo-cyan/10 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-geo-cyan" />
                </div>
                {p}
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-geo-cyan/5 to-geo-copper/5 border border-geo-cyan/10 text-center">
            <h3 className="text-xl font-bold font-display text-white mb-3">Interested in Research Collaboration?</h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">We welcome partnerships with universities, research institutes, and government agencies on geoscience projects of regional importance.</p>
            <Link href="/contact" className="btn-primary inline-flex">
              Propose a Collaboration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
