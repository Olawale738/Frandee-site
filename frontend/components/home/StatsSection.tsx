'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { STATS } from '@/lib/data';

export default function StatsSection() {
  return (
    <section className="relative py-16 border-y border-slate-200 bg-white overflow-hidden">
      <div className="absolute inset-0 geo-grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold font-mono text-geo-dark mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              <div className="mt-2 h-px w-12 bg-gradient-to-r from-geo-cyan to-transparent mx-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
