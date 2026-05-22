'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import GeoBackground from '@/components/shared/GeoBackground';

const inquiryTypes = [
  'Geological Exploration',
  'Geophysical Survey',
  'Remote Sensing / GIS',
  'Hydrogeology',
  'Environmental Assessment',
  'Training & Consulting',
  'Research Partnership',
  'Other',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', inquiry: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-geo-black min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Get In Touch</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold font-display text-white leading-tight mb-6">
            Start a{' '}
            <span className="text-gradient-cyan">Conversation</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Tell us about your project. Our team will respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              {/* Info cards */}
              {[
                { icon: MapPin, label: 'Office', value: '123 Geological Drive\nEarth Sciences Building\nLagos, Nigeria', color: 'copper' },
                { icon: Mail, label: 'Email', value: 'info@frandeegeoscience.com', color: 'cyan', href: 'mailto:info@frandeegeoscience.com' },
                { icon: Phone, label: 'Phone', value: '+234 800 000 0000', color: 'emerald', href: 'tel:+2348000000000' },
                { icon: Clock, label: 'Hours', value: 'Mon–Fri: 8am–6pm WAT\nEmergency support 24/7', color: 'copper' },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-2xl glass-card flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                    item.color === 'cyan' ? 'bg-geo-cyan/10' : item.color === 'copper' ? 'bg-geo-copper/10' : 'bg-geo-emerald/10'
                  }`}>
                    <item.icon className={`w-5 h-5 ${
                      item.color === 'cyan' ? 'text-geo-cyan' : item.color === 'copper' ? 'text-geo-copper' : 'text-geo-emerald'
                    }`} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-slate-300 hover:text-white transition-colors">{item.value}</a>
                    ) : (
                      <div className="text-sm text-slate-300 whitespace-pre-line">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2348000000000"
                className="flex items-center gap-3 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 hover:border-green-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-400">Chat on WhatsApp</div>
                  <div className="text-xs text-slate-400">Quick response for urgent queries</div>
                </div>
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center p-12">
                    <div className="w-16 h-16 rounded-full bg-geo-emerald/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-geo-emerald" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-card space-y-5">
                  <div className="text-[10px] font-mono text-geo-cyan tracking-widest uppercase mb-2">Project Inquiry Form</div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: 'name', label: 'Full Name *', placeholder: 'Your full name', type: 'text', required: true },
                      { name: 'email', label: 'Email Address *', placeholder: 'your@email.com', type: 'email', required: true },
                      { name: 'company', label: 'Company / Organization', placeholder: 'Your company', type: 'text', required: false },
                      { name: 'phone', label: 'Phone Number', placeholder: '+234 ...', type: 'tel', required: false },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs text-slate-400 mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={(form as any)[field.name]}
                          onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-geo-panel border border-geo-border/40 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-geo-cyan/50 focus:ring-1 focus:ring-geo-cyan/20 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Service Inquiry *</label>
                    <select
                      required
                      value={form.inquiry}
                      onChange={(e) => setForm((f) => ({ ...f, inquiry: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-geo-panel border border-geo-border/40 text-white text-sm focus:outline-none focus:border-geo-cyan/50 focus:ring-1 focus:ring-geo-cyan/20 transition-all"
                    >
                      <option value="">Select inquiry type</option>
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Project Description *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your project — location, scope, objectives, timeline..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-geo-panel border border-geo-border/40 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-geo-cyan/50 focus:ring-1 focus:ring-geo-cyan/20 transition-all resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
