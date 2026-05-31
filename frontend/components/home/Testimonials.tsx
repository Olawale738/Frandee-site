'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';
import SectionHeader from '@/components/shared/SectionHeader';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding relative bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 geo-grid-bg opacity-15" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Voices"
          title="Trusted By"
          titleHighlight="Industry Leaders"
          description="What our clients say about working with the Frandee Geoscience team."
          tone="light"
          className="mb-14"
        />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-8 lg:p-10 text-center">
                <Quote className="w-8 h-8 text-geo-cyan/30 mx-auto mb-6" />
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-geo-copper text-geo-copper" />
                  ))}
                </div>
                <p className="text-lg lg:text-xl text-slate-700 leading-relaxed italic mb-8">
                  "{TESTIMONIALS[active].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-geo-cyan/20">
                    <Image
                      src={TESTIMONIALS[active].image}
                      alt={TESTIMONIALS[active].author}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-geo-dark">{TESTIMONIALS[active].author}</div>
                    <div className="text-sm text-slate-500">{TESTIMONIALS[active].role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActive((a) => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-geo-dark hover:border-geo-cyan/50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active ? 'w-6 h-2 bg-geo-cyan' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-geo-dark hover:border-geo-cyan/50 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
