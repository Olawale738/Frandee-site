import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FileEdit, BookOpen, CheckCircle, Search, FileText, BarChart3, Globe, Award, ArrowRight, MessageCircle } from 'lucide-react';
import GeoBackground from '@/components/shared/GeoBackground';

export const metadata: Metadata = {
  title: 'Research & Publication Support | Frandee Consulting Services',
  description: 'Expert academic writing support — manuscript editing, proofreading, journal submission preparation, statistical review, and research consulting for geoscience scholars.',
};

const services = [
  { icon: FileEdit, title: 'Manuscript Editing', color: 'cyan', description: 'Comprehensive line-by-line editing of your manuscript for clarity, coherence, academic tone, and logical flow.', includes: ['Grammar, syntax, and spelling correction', 'Academic tone and clarity refinement', 'Logical structure and argument flow', 'Title, abstract, and keyword optimisation', 'Consistency in terminology and notation'] },
  { icon: CheckCircle, title: 'Proofreading', color: 'emerald', description: 'Final-stage quality check to catch any remaining errors before submission. Ensures your work is polished and professional.', includes: ['Spelling and punctuation errors', 'Formatting inconsistencies', 'Reference list and in-text citation matching', 'Figure and table caption verification', 'Compliance with target journal style guide'] },
  { icon: FileText, title: 'Manuscript Preparation', color: 'copper', description: 'Full preparation for a specific journal — formatting, structuring, and tailoring your manuscript to meet exact requirements.', includes: ['Journal-specific formatting (APA, AGU, GSA, Elsevier, etc.)', 'Section restructuring for journal scope', 'Word count management', 'Supplementary material organisation', 'Cover letter drafting'] },
  { icon: Search, title: 'Journal Selection Support', color: 'cyan', description: 'Strategic advice on selecting the right journal — balancing scope match, impact factor, turnaround time, and open-access requirements.', includes: ['Scope and audience matching', 'Impact factor and quartile guidance', 'Open-access vs. subscription analysis', 'Suggested target journals with rationale', 'Rejection risk assessment'] },
  { icon: BarChart3, title: 'Statistical & Data Review', color: 'emerald', description: 'Independent review of your statistical methods, data presentation, and analytical validity — ensuring results withstand peer review scrutiny.', includes: ['Statistical method appropriateness check', 'Data presentation and visualisation review', 'Interpretation accuracy assessment', 'Geospatial and geophysical data validation', 'Recommendations for additional analysis'] },
  { icon: BookOpen, title: 'Literature Review Support', color: 'copper', description: 'Structured support for building a rigorous, well-sourced literature review that situates your research in the scholarly conversation.', includes: ['Source identification and gap analysis', 'Thematic organisation and synthesis', 'Citation and referencing (all major styles)', 'Identification of seminal and recent works', 'Anti-plagiarism and paraphrasing guidance'] },
  { icon: Globe, title: 'Research Proposal Writing', color: 'cyan', description: 'Expert support preparing grant applications and research proposals that clearly communicate your research significance.', includes: ['Research problem and gap articulation', 'Objectives and hypothesis framing', 'Methodology section development', 'Budget justification writing', 'Funder-specific formatting and language'] },
  { icon: Award, title: 'Peer Review Response', color: 'emerald', description: 'Guidance through the revision process — crafting detailed, professional responses to reviewer comments that address every point.', includes: ['Structured response-to-reviewer letter', 'Identification of compulsory vs. optional changes', 'Rewritten sections addressing reviewer concerns', 'Rebuttal strategy for disputed points', 'Track-changes revision management'] },
];

const steps = [
  { step: '01', title: 'Submit Your Work', description: 'Send your manuscript, draft, or proposal through the contact form. Include your target journal and any specific instructions.' },
  { step: '02', title: 'Scope & Quotation', description: 'We review your document and provide a clear scope of work, timeline, and fee — usually within 24 hours.' },
  { step: '03', title: 'Expert Review & Edit', description: 'Your document is reviewed by a geoscience-trained specialist who understands the subject matter, not just language.' },
  { step: '04', title: 'Delivery & Revisions', description: 'Receive your edited manuscript with tracked changes and a summary of edits. One round of revisions included.' },
];

const disciplines = ['Applied Geophysics', 'Hydrogeology', 'Engineering Geology', 'Structural Geology', 'Mineral Exploration', 'Remote Sensing & GIS', 'Environmental Geoscience', 'Petroleum Geology', 'Sedimentology', 'Geochemistry', 'Seismology', 'Geotechnical Engineering', 'Earth Sciences', 'Natural Hazards'];

export default function ResearchPage() {
  return (
    <div className="bg-geo-black min-h-screen pt-20">

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <GeoBackground />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
            <Image src="/images/conferences/conf-01.jpg" alt="" fill className="object-cover object-left" />
            <div className="absolute inset-0 bg-gradient-to-r from-geo-black via-geo-black/60 to-transparent" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-geo-cyan" />
              <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Publication Support</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold font-display text-white leading-tight mb-6">
              Your Research,{" "}
              <span className="text-gradient-cyan">Published.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 leading-relaxed">
              Professional editing, proofreading, and manuscript preparation for researchers in geoscience and earth sciences.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              You do the science — we make sure the world can read it. From first draft to submission-ready manuscript, our specialists work alongside you at every stage of the publication journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                <MessageCircle className="w-4 h-4" />
                Discuss Your Manuscript
              </Link>
              <a href="#services" className="btn-secondary">
                <BookOpen className="w-4 h-4" />
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="section-padding-sm border-y border-geo-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '200+', label: 'Manuscripts Supported' },
              { value: '40+', label: 'Journals Published In' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '48hr', label: 'Typical Turnaround' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold font-display text-geo-cyan mb-1">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-geo-copper" />
              <span className="text-xs font-mono tracking-widest text-geo-copper uppercase">What We Offer</span>
              <div className="h-px w-8 bg-geo-copper" />
            </div>
            <h2 className="text-4xl font-bold font-display text-white mb-4">Publication Support Services</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every service is delivered by a geoscience-trained specialist — someone who understands your subject, not just your sentences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.title} className="glass-card rounded-2xl p-6 hover:border-geo-cyan/20 transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${svc.color === 'cyan' ? 'bg-geo-cyan/10' : svc.color === 'copper' ? 'bg-geo-copper/10' : 'bg-geo-emerald/10'}`}>
                    <Icon className={`w-6 h-6 ${svc.color === 'cyan' ? 'text-geo-cyan' : svc.color === 'copper' ? 'text-geo-copper' : 'text-geo-emerald'}`} />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-geo-cyan transition-colors">{svc.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{svc.description}</p>
                  <ul className="space-y-1.5">
                    {svc.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                        <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${svc.color === 'cyan' ? 'bg-geo-cyan' : svc.color === 'copper' ? 'bg-geo-copper' : 'bg-geo-emerald'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-geo-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-geo-cyan" />
              <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Simple Process</span>
              <div className="h-px w-8 bg-geo-cyan" />
            </div>
            <h2 className="text-4xl font-bold font-display text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">A straightforward four-step process from first contact to final manuscript.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-geo-cyan/30 to-transparent z-0" />
                )}
                <div className="glass-card rounded-2xl p-6 relative z-10">
                  <div className="text-4xl font-bold font-mono text-geo-cyan/20 mb-3">{step.step}</div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines + images */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-geo-copper" />
                <span className="text-xs font-mono tracking-widest text-geo-copper uppercase">Subject Expertise</span>
              </div>
              <h2 className="text-4xl font-bold font-display text-white mb-5">Disciplines We Cover</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Our support team brings genuine geoscience expertise — we understand the terminology, the methods, and the journals. Only specialists who have worked in the field.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {disciplines.map((d) => (
                  <span key={d} className="px-3 py-1.5 rounded-full text-xs font-medium bg-geo-panel border border-geo-border/40 text-slate-300 hover:border-geo-cyan/30 hover:text-white transition-all">{d}</span>
                ))}
              </div>
              <Link href="/contact" className="btn-copper">
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src="/images/conferences/conf-01.jpg" alt="Training workshop" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-geo-black/60 to-transparent" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden mt-8">
                <Image src="/images/conferences/conf-04.jpg" alt="Academic presentation" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-geo-black/60 to-transparent" />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <Image src="/images/students/student-01.jpg" alt="Research data" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-geo-black/60 to-transparent" />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden mt-4">
                <Image src="/images/conferences/conf-06.jpg" alt="Expert consultation" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-geo-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-3xl p-12 border border-geo-copper/15 relative overflow-hidden">
            <div className="absolute inset-0 topo-bg opacity-20 pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-geo-copper/10 flex items-center justify-center mx-auto mb-6">
                <FileEdit className="w-7 h-7 text-geo-copper" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">Ready to Get Published?</h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                Send your manuscript today. We will review it and provide a scope, timeline, and fee within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  <MessageCircle className="w-4 h-4" />
                  Submit Your Manuscript
                </Link>
                <a href="mailto:dr.francis@frandeeconsultingservices.com" className="btn-secondary">
                  <FileText className="w-4 h-4" />
                  Email Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
