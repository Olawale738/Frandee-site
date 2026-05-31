'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = 'center',
  tone = 'dark',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const titleClass = tone === 'light' ? 'text-geo-dark' : 'text-white';
  const descriptionClass = tone === 'light' ? 'text-slate-600' : 'text-slate-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`flex flex-col ${alignClass} ${className}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-geo-cyan" />
          <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-geo-cyan" />
        </div>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display ${titleClass} leading-tight`}>
        {title}{' '}
        {titleHighlight && (
          <span className="text-gradient-cyan">{titleHighlight}</span>
        )}
      </h2>
      {description && (
        <p className={`mt-4 ${descriptionClass} text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
