import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';

const posts = [
  { id: 'using-sentinel-2-alteration-mapping', title: 'Using Sentinel-2 for Hydrothermal Alteration Mapping in West Africa', category: 'Remote Sensing', author: 'Chukwudi Nwosu', date: 'May 10, 2026', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&q=80', content: 'Sentinel-2 satellite imagery provides an unprecedented opportunity for geological mapping across large areas at low cost. This article explores practical techniques for applying band ratio composites to identify hydrothermal alteration zones in Birimian greenstone terrains of West Africa.\n\nThe Birimian Supergroup hosts some of West Africa\'s most significant gold deposits, many of which are spatially associated with hydrothermal alteration. Identifying these zones remotely — before committing to expensive field campaigns — can dramatically improve exploration efficiency.\n\nKey band combinations for alteration mapping using Sentinel-2 include band ratios B11/B8A for clay/hydroxyl alteration, B11/B12 for iron oxide mapping, and principal component analysis of multiple bands for subtle alteration fingerprints. When combined with structural lineament extraction from band composites, these techniques can generate high-confidence target areas for follow-up field work.\n\nValidation against known deposits in Ghana and Burkina Faso has shown detection rates of 80-90% for hydrothermal alteration assemblages visible at the 20m resolution of Sentinel-2 SWIR bands.' },
  { id: 'ip-survey-porphyry-copper', title: 'Induced Polarization Survey Design for Porphyry Copper Targets', category: 'Geophysics', author: 'Dr. Fatima Ibrahim', date: 'April 28, 2026', readTime: '12 min read', image: 'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?w=1200&q=80', content: 'Induced polarization (IP) surveys remain one of the most powerful geophysical tools for detecting disseminated sulfide mineralization associated with porphyry copper-gold systems. However, effective survey design requires careful consideration of multiple parameters.\n\nElectrode array selection is the first critical decision. Dipole-dipole arrays provide good lateral resolution and are standard for detailed IP surveys, while gradient arrays offer broader coverage at lower resolution. For porphyry systems typically hosted in large intrusive complexes, a combination of both is often optimal.\n\nDipole length selection depends on the expected depth and size of the target. For porphyry systems with mineralization potentially extending to 600m depth, dipole lengths of 100-200m with n-spacings of 1-8 are typical. Survey line orientation should cross the inferred structural trend of the mineralized zone at approximately 90 degrees.\n\nData quality assurance during acquisition is critical — resistivity and IP phase readings should be checked in real-time, and apparent resistivity sections should be reviewed daily to identify data artifacts or equipment issues before they contaminate large areas of the survey grid.' },
];

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts.find((p) => p.id === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.content.slice(0, 160) };
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.id === params.slug);
  if (!post) notFound();

  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[300px] bg-geo-panel">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-geo-black via-geo-black/40 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-geo-cyan/10 text-geo-cyan text-xs font-mono border border-geo-cyan/20">{post.category}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-8">{post.title}</h1>

        <div className="prose prose-invert max-w-none">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-300 leading-relaxed mb-5 text-lg">{para}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-geo-border/30 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-slate-400">Written by</p>
            <p className="font-semibold text-white">{post.author}</p>
          </div>
          <Link href="/blog" className="btn-secondary text-sm">More Articles</Link>
        </div>
      </div>
    </div>
  );
}
