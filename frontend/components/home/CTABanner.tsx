'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden bg-geo-dark">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(6,182,212,0.08),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-geo-cyan/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-geo-cyan/30 to-transparent" />
      <div className="absolute inset-0 geo-grid-bg opacity-30" />

      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-geo-cyan/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-geo-copper/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-10 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Ready to Explore?</span>
            <div className="h-px w-10 bg-geo-cyan" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-5 leading-tight">
            Let's Build Your{' '}
            <span className="text-gradient-cyan">Next Discovery</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're planning a greenfields exploration program, need regulatory support, or want to upskill your team — we're ready to help.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4 group">
              <Phone className="w-4 h-4" />
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="btn-secondary text-base px-8 py-4">
              Explore Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
