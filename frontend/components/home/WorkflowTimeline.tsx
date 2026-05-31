'use client';

import { motion } from 'framer-motion';
import { Search, Layers, Activity, Target, BarChart3, FileCheck } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Data-Driven Scoping',
    description: 'Every engagement starts with clear objectives, available evidence, constraints, and measurable decision points.',
    color: 'cyan',
  },
  {
    step: '02',
    icon: Layers,
    title: 'Integrated Expertise',
    description: 'Geology, geophysics, GIS, remote sensing, hydrogeology, and environmental teams work from one technical model.',
    color: 'copper',
  },
  {
    step: '03',
    icon: Activity,
    title: 'Field-Proven Delivery',
    description: 'Survey programs are planned for real terrain, local logistics, safety, and defensible technical outputs.',
    color: 'emerald',
  },
  {
    step: '04',
    icon: Target,
    title: 'Risk Reduction',
    description: 'We prioritize targets and recommendations so clients can invest with greater technical confidence.',
    color: 'cyan',
  },
  {
    step: '05',
    icon: BarChart3,
    title: 'Clear Reporting',
    description: 'Outputs are structured for boards, regulators, investors, project teams, and technical reviewers.',
    color: 'copper',
  },
  {
    step: '06',
    icon: FileCheck,
    title: 'Long-Term Partner',
    description: 'From early studies to implementation, we stay close to the project and its next decisions.',
    color: 'emerald',
  },
];

const colorMap = {
  cyan: { bg: 'bg-geo-cyan/10', icon: 'text-geo-cyan', connector: 'border-geo-cyan/20', number: 'text-geo-cyan' },
  copper: { bg: 'bg-geo-copper/10', icon: 'text-geo-copper', connector: 'border-geo-copper/20', number: 'text-geo-copper' },
  emerald: { bg: 'bg-geo-emerald/10', icon: 'text-geo-emerald', connector: 'border-geo-emerald/20', number: 'text-geo-emerald' },
};

export default function WorkflowTimeline() {
  return (
    <section id="why-us" className="section-padding relative bg-geo-dark overflow-hidden">
      <div className="absolute inset-0 geo-grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-geo-cyan/2 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Us"
          title="Technical Authority,"
          titleHighlight="Built for Trust"
          description="A professional, data-driven operating model for engineering firms, geoscience companies, oil and gas teams, environmental consultants, and research organizations."
          className="mb-16"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[8.33%] right-[8.33%] h-px border-t border-dashed border-geo-cyan/15" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => {
              const colors = colorMap[step.color as keyof typeof colorMap];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  {/* Step number + icon */}
                  <div className="flex flex-col items-center mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center relative z-10 border border-geo-border/30 shadow-card`}>
                      <step.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <span className={`mt-2 text-[10px] font-mono tracking-widest ${colors.number} uppercase`}>
                      {step.step}
                    </span>
                  </div>
                  <div className="text-center lg:text-center">
                    <h3 className="font-semibold font-display text-white text-sm mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
