'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Filter } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import SectionHeader from '@/components/shared/SectionHeader';
import GeoBackground from '@/components/shared/GeoBackground';

const categories = ['All', 'Exploration', 'Hydrogeology', 'Geophysics', 'Environmental', 'Research', 'Training'];

const categoryColors: Record<string, string> = {
  Exploration: 'text-geo-copper bg-geo-copper/10 border-geo-copper/20',
  Hydrogeology: 'text-geo-cyan bg-geo-cyan/10 border-geo-cyan/20',
  Geophysics: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  Environmental: 'text-geo-emerald bg-geo-emerald/10 border-geo-emerald/20',
  Research: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Training: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Portfolio</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Our{' '}
            <span className="text-gradient-copper">Projects</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A portfolio of geoscience projects spanning mineral exploration, hydrogeology, environmental assessment, and research across Africa.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-y border-geo-border/30 bg-geo-dark/50 sticky top-16 lg:top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-geo-cyan text-geo-black font-semibold'
                    : 'bg-geo-panel border border-geo-border/40 text-slate-400 hover:text-white hover:border-geo-cyan/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="group block glass-card rounded-2xl overflow-hidden hover:border-geo-cyan/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-geo-panel">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-geo-black/70 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${categoryColors[project.category] || ''}`}>
                          {project.category}
                        </span>
                      </div>
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full bg-geo-copper/80 text-white text-[10px] font-mono">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                        <MapPin className="w-3 h-3 text-geo-copper" />
                        {project.region}
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="font-bold font-display text-white text-base mb-2 group-hover:text-geo-cyan transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded bg-geo-panel border border-geo-border/30 text-[10px] text-slate-500">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 rounded bg-geo-panel border border-geo-border/30 text-[10px] text-slate-500">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-geo-copper group-hover:text-copper-light transition-colors">
                        <span>View case study</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
