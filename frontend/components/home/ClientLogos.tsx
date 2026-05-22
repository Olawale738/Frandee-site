'use client';

import { motion } from 'framer-motion';

const clients = [
  { name: 'AurixMine PLC', abbr: 'AUX' },
  { name: 'Lagos State Gov.', abbr: 'LSG' },
  { name: 'University of Ghana', abbr: 'UoG' },
  { name: 'Kogi Resources', abbr: 'KGR' },
  { name: 'AfriGold Corp', abbr: 'AGC' },
  { name: 'Sahel Mining', abbr: 'SAH' },
  { name: 'GeoTech Africa', abbr: 'GTA' },
  { name: 'Mineral Dev. Corp', abbr: 'MDC' },
];

export default function ClientLogos() {
  return (
    <section className="py-14 relative bg-geo-black/50 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-geo-border/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-geo-border/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-mono tracking-widest text-slate-500 uppercase mb-8"
        >
          Trusted by Exploration Companies, Governments & Research Institutions
        </motion.p>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            className="flex gap-6 w-max"
          >
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-geo-panel border border-geo-border/30 flex-shrink-0 min-w-[160px]"
              >
                <div className="w-8 h-8 rounded-lg bg-geo-cyan/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-mono font-bold text-geo-cyan">{client.abbr}</span>
                </div>
                <span className="text-sm text-slate-400 whitespace-nowrap">{client.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
