'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import SectionHeader from '@/components/shared/SectionHeader';

const featured = PROJECTS.filter((p) => p.featured);

export default function ProjectsCarousel() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? featured.length - 1 : a - 1));
  const next = () => setActive((a) => (a === featured.length - 1 ? 0 : a + 1));

  const project = featured[active];

  return (
    <section className="section-padding relative bg-geo-dark overflow-hidden">
      <div className="absolute inset-0 topo-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-geo-cyan/3 via-transparent to-geo-copper/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Our Work"
            title="Featured"
            titleHighlight="Projects"
            description="Selected case studies from our portfolio of geological exploration and geoscience service projects."
            align="left"
          />
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-geo-border/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-geo-cyan/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-geo-border/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-geo-cyan/30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-geo-panel">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-geo-black/60 via-transparent to-transparent" />
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-geo-black/60 backdrop-blur-sm border border-geo-cyan/20 text-xs font-mono text-geo-cyan">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 text-sm text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-geo-copper" />
                    {project.region}
                  </div>
                  <span className="text-slate-600">·</span>
                  <span className="text-sm text-slate-400">{project.year}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold font-display text-white leading-tight">
                  {project.title}
                </h3>
              </div>

              <p className="text-slate-400 leading-relaxed">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg bg-geo-panel border border-geo-border/40 text-xs text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Outcomes */}
              <div className="p-4 rounded-xl bg-geo-panel/50 border border-geo-border/30">
                <div className="text-[10px] font-mono text-geo-cyan tracking-widest uppercase mb-3">Key Outcomes</div>
                <ul className="space-y-2">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-geo-emerald flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/projects/${project.id}`} className="btn-secondary inline-flex group">
                View Full Case Study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots + All projects */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active ? 'w-6 h-2 bg-geo-cyan' : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <Link href="/projects" className="text-sm text-geo-copper hover:text-copper-light transition-colors flex items-center gap-1">
            All Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
