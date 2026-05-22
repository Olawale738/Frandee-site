'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Layers, Activity, Globe, Target } from 'lucide-react';

const pills = [
  { icon: Layers, label: 'Geological Mapping' },
  { icon: Activity, label: 'Geophysics' },
  { icon: Globe, label: 'Remote Sensing' },
  { icon: Target, label: 'Drill Targets' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw animated topographic contour lines
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        const baseY = h * 0.1 + (h * 0.8 * i) / 12;
        const amp = 20 + i * 3;
        const freq = 0.003 + i * 0.0002;
        const phase = t * 0.3 + i * 0.5;

        ctx.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 4) {
          const y = baseY + amp * Math.sin(x * freq + phase) + (amp * 0.5) * Math.sin(x * freq * 2.3 + phase * 0.7);
          ctx.lineTo(x, y);
        }

        const hue = i < 6 ? '182' : i < 9 ? '160' : '25';
        const alpha = 0.04 + (i % 3) * 0.02;
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Particle dots (survey points)
      for (let i = 0; i < 60; i++) {
        const x = ((i * 137.5 + t * 0.5) % w);
        const y = ((i * 97.3 + Math.sin(i) * 200) % h);
        const alpha = 0.1 + Math.sin(t * 0.02 + i) * 0.05;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.fill();
      }

      t++;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-geo-black">
      {/* Cinematic field photo background */}
      <div className="absolute inset-0">
        <Image
          src="/images/field-operations/field-03.jpg"
          alt="Frandee Geoscience field team"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-geo-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-geo-black/90 via-geo-black/60 to-geo-black/30" />
      </div>

      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 geo-grid-bg opacity-40" />

      {/* Deep radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(184,115,51,0.06),transparent)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(6,10,18,0.7)_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-geo-cyan/20 bg-geo-cyan/5 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-geo-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-geo-cyan"></span>
            </span>
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">
              Full-Stack Geoscience Services
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-[0.95] tracking-tight text-white mb-6"
          >
            Full-Stack
            <br />
            <span className="text-gradient-cyan">Geoscience</span>
            <br />
            Services
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl sm:text-2xl text-slate-400 mb-4 leading-relaxed max-w-2xl"
          >
            From reconnaissance to drill-ready targets —{' '}
            <span className="text-slate-200">and everything in between.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base text-slate-500 mb-10 max-w-xl leading-relaxed"
          >
            Delivering world-class geological intelligence to exploration companies, governments, research institutions, and mining operations across Africa and beyond.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link href="/services" className="btn-primary text-base px-8 py-4 group">
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/projects" className="btn-secondary text-base px-8 py-4">
              View Projects
            </Link>
          </motion.div>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-2"
          >
            {pills.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-geo-panel border border-geo-border/40 text-xs text-slate-400"
              >
                <Icon className="w-3 h-3 text-geo-copper" />
                {label}
              </div>
            ))}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-geo-panel border border-geo-border/40 text-xs text-slate-400">
              +9 more
            </div>
          </motion.div>
        </div>

        {/* Right side — animated data panel (hidden on small screens) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 w-72"
        >
          <div className="data-panel rounded-2xl p-5 relative overflow-hidden">
            <div className="scan-line absolute inset-0" />
            <div className="text-[10px] font-mono text-geo-cyan tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-geo-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-geo-cyan"></span>
              </span>
              Live Survey Data
            </div>
            {[
              { label: 'Active Projects', value: '14', unit: 'running' },
              { label: 'Drill Targets', value: '38', unit: 'this year' },
              { label: 'Area Surveyed', value: '2,400', unit: 'km²' },
              { label: 'Data Points', value: '1.2M', unit: 'processed' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-geo-border/30 last:border-0">
                <span className="text-xs text-slate-400">{item.label}</span>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-white">{item.value}</span>
                  <span className="text-[10px] text-slate-500 ml-1">{item.unit}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 h-16 flex items-end gap-1">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `rgba(6, 182, 212, ${0.2 + (h / 100) * 0.5})`,
                  }}
                />
              ))}
            </div>
            <div className="mt-1 text-[9px] font-mono text-slate-600 flex justify-between">
              <span>JAN</span><span>DEC</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
