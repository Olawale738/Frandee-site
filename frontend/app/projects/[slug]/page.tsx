import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Users, ArrowLeft, ArrowRight, CheckCircle, Target } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import GeoBackground from '@/components/shared/GeoBackground';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.id === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.id === params.slug);
  if (!project) notFound();

  const related = PROJECTS.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2);

  return (
    <div className="bg-slate-50 min-h-screen pt-20 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[60vh] min-h-[400px] bg-geo-panel">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-geo-black via-geo-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-geo-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 max-w-7xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-geo-cyan/20 text-geo-cyan text-xs font-mono border border-geo-cyan/20">
                {project.category}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-geo-copper" /> {project.region}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-geo-copper" /> {project.year}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-display text-white leading-tight max-w-3xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-xl font-bold font-display text-geo-dark mb-4">Project Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{project.description}</p>
            </div>

            {/* Methodology */}
            <div>
              <h2 className="text-xl font-bold font-display text-geo-dark mb-4">Methodology & Approach</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our integrated approach combined traditional field methods with modern geoscience technology to deliver exceptional results within the project timeline and budget. The program was designed to systematically de-risk the target and generate high-confidence drill targets.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center gap-3 p-3 rounded-xl glass-card">
                    <div className="w-8 h-8 rounded-lg bg-geo-cyan/10 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-geo-cyan" />
                    </div>
                    <span className="text-sm text-slate-600">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key outcomes */}
            <div>
              <h2 className="text-xl font-bold font-display text-geo-dark mb-4">Key Outcomes</h2>
              <div className="p-6 rounded-2xl glass-card border-l-2 border-l-geo-emerald">
                <ul className="space-y-3">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-geo-emerald flex-shrink-0 mt-0.5" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Survey area info */}
            {project.area !== 'N/A' && (
              <div>
                <h2 className="text-xl font-bold font-display text-geo-dark mb-4">Survey Coverage</h2>
                <div className="rounded-2xl overflow-hidden bg-geo-panel aspect-[16/8] relative">
                  {/* Map placeholder with geological pattern */}
                  <div className="absolute inset-0 geo-grid-bg" />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                    <rect width="800" height="400" fill="#0d1525" />
                    <path d="M0,200 C100,120 200,280 300,200 C400,120 500,280 600,200 C700,120 800,200 800,200" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.15" fill="none" />
                    <path d="M0,250 C100,170 200,330 300,250 C400,170 500,330 600,250 C700,170 800,250 800,250" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.1" fill="none" />
                    <circle cx="400" cy="200" r="60" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" fill="none" strokeDasharray="5,5" />
                    <circle cx="400" cy="200" r="30" stroke="#b87333" strokeWidth="2" strokeOpacity="0.6" fill="none" />
                    <circle cx="400" cy="200" r="6" fill="#b87333" fillOpacity="0.8" />
                    {[380, 420, 360, 440, 390, 410].map((x, i) => (
                      <circle key={i} cx={x} cy={180 + i * 10} r="3" fill="#06b6d4" fillOpacity="0.5" />
                    ))}
                  </svg>
                  <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-geo-black/60 backdrop-blur-sm border border-geo-border/30">
                    <div className="text-[10px] font-mono text-geo-cyan mb-1">Survey Area</div>
                    <div className="text-lg font-bold font-mono text-white">{project.area}</div>
                  </div>
                  <div className="absolute top-4 right-4 p-2 rounded-xl bg-geo-black/60 backdrop-blur-sm border border-geo-border/30">
                    <div className="text-[10px] font-mono text-slate-400">{project.region}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project details */}
            <div className="p-6 rounded-2xl glass-card">
              <div className="text-[10px] font-mono text-geo-cyan tracking-widest uppercase mb-4">Project Details</div>
              <div className="space-y-4">
                {[
                  { label: 'Client Type', value: project.client },
                  { label: 'Region', value: project.region },
                  { label: 'Year', value: project.year },
                  { label: 'Duration', value: project.duration },
                  { label: 'Category', value: project.category },
                  ...(project.area !== 'N/A' ? [{ label: 'Area', value: project.area }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start text-sm">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-geo-dark font-medium text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="p-6 rounded-2xl glass-card">
              <div className="text-[10px] font-mono text-geo-copper tracking-widest uppercase mb-4">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-geo-cyan/10 to-geo-copper/5 border border-geo-cyan/20">
              <h3 className="font-bold text-geo-dark mb-2">Similar Project?</h3>
              <p className="text-sm text-slate-600 mb-4">Let's discuss how we can deliver comparable results for your project.</p>
              <Link href="/contact" className="btn-primary text-sm w-full justify-center">
                Start a Conversation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-2xl font-bold font-display text-geo-dark">Related Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group flex gap-4 p-4 rounded-2xl glass-card hover:border-geo-cyan/20 transition-all"
                >
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-geo-panel">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="96px" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-geo-cyan">{p.category}</span>
                    <h3 className="font-semibold text-geo-dark text-sm mt-0.5 group-hover:text-geo-cyan transition-colors leading-tight">{p.title}</h3>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {p.region}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
