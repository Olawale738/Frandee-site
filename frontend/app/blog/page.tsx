import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Geoscience insights, technical articles, and exploration industry news from the Frandee Geoscience team.',
};

const posts = [
  {
    id: 'using-sentinel-2-alteration-mapping',
    title: 'Using Sentinel-2 for Hydrothermal Alteration Mapping in West Africa',
    excerpt: 'A practical guide to applying Sentinel-2 band ratios and composite imagery techniques for mapping hydrothermal alteration zones in Birimian greenstone terrains.',
    category: 'Remote Sensing',
    author: 'Chukwudi Nwosu',
    date: 'May 10, 2026',
    readTime: '8 min read',
    image: '/images/students/student-01.jpg',
    featured: true,
  },
  {
    id: 'ip-survey-porphyry-copper',
    title: 'Induced Polarization Survey Design for Porphyry Copper Targets',
    excerpt: 'Key considerations in IP survey design — electrode spacing, line orientation, frequency selection, and data quality assurance for porphyry-style exploration.',
    category: 'Geophysics',
    author: 'Dr. Fatima Ibrahim',
    date: 'April 28, 2026',
    readTime: '12 min read',
    image: '/images/ves-ert/ves-02.jpg',
    featured: true,
  },
  {
    id: 'groundwater-nigeria-challenges',
    title: 'Groundwater Exploration in Southwest Nigeria: Key Hydrogeological Challenges',
    excerpt: 'Understanding the hydrogeological complexity of crystalline basement aquifers in Southwest Nigeria — fracture systems, weathered profiles, and sustainable yield estimation.',
    category: 'Hydrogeology',
    author: 'Amina Yusuf',
    date: 'April 15, 2026',
    readTime: '10 min read',
    image: '/images/ves-ert/ves-04.jpg',
    featured: false,
  },
  {
    id: 'eia-mining-west-africa',
    title: 'EIA Best Practices for Junior Mining Projects in West Africa',
    excerpt: 'How to navigate the regulatory EIA process across Francophone and Anglophone West African countries — key requirements, common pitfalls, and approval timelines.',
    category: 'Environmental',
    author: 'Dr. Adeyemi Okonkwo',
    date: 'March 30, 2026',
    readTime: '9 min read',
    image: '/images/field-operations/field-06.jpg',
    featured: false,
  },
  {
    id: 'machine-learning-geological-mapping',
    title: 'Machine Learning in Geological Mapping: Where Are We Really?',
    excerpt: 'An honest assessment of the current state of ML-assisted geological mapping — what works, what doesn\'t, and what the future holds for automated geology.',
    category: 'Technology',
    author: 'Chukwudi Nwosu',
    date: 'March 12, 2026',
    readTime: '11 min read',
    image: '/images/field-operations/field-01.jpg',
    featured: false,
  },
  {
    id: 'drill-targeting-framework',
    title: 'Building a Systematic Drill Targeting Framework for Greenfields Gold',
    excerpt: 'A step-by-step methodology for integrating geology, geochemistry, and geophysics into a coherent, defensible drill targeting framework for greenfields gold exploration.',
    category: 'Exploration',
    author: 'Dr. Adeyemi Okonkwo',
    date: 'February 28, 2026',
    readTime: '15 min read',
    image: '/images/mineral-exploration/mineral-03.jpg',
    featured: false,
  },
];

const catColors: Record<string, string> = {
  'Remote Sensing': 'text-geo-cyan bg-geo-cyan/10 border-geo-cyan/20',
  'Geophysics': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'Hydrogeology': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Environmental': 'text-geo-emerald bg-geo-emerald/10 border-geo-emerald/20',
  'Technology': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  'Exploration': 'text-geo-copper bg-geo-copper/10 border-geo-copper/20',
};

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Insights & Articles</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Geoscience{' '}
            <span className="text-gradient-cyan">Insights</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Technical articles, exploration guides, and industry perspectives from our team of geoscience experts.
          </p>
        </div>
      </section>

      {/* Featured posts */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {featured.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group glass-card rounded-2xl overflow-hidden hover:border-geo-cyan/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-geo-panel">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-geo-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${catColors[post.category] || ''}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-geo-copper/80 text-white text-[10px] font-mono">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-geo-cyan transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">By {post.author}</span>
                    <span className="text-xs text-geo-copper group-hover:text-geo-copper-light flex items-center gap-1 transition-colors">
                      Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <SectionHeader
            eyebrow="Latest Articles"
            title="More"
            titleHighlight="Insights"
            align="left"
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group glass-card rounded-2xl overflow-hidden hover:border-geo-cyan/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-geo-panel">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-geo-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${catColors[post.category] || ''}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] text-slate-500 mb-2 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {post.readTime}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-geo-cyan transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500">{post.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
