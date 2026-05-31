'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
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

const directEmails = [
  'dr.francis@frandeeconsultingservices.com',
  'services@frandeeconsultingservices.com',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiry: '',
    message: '',
  });

  const directMailHref = `mailto:${directEmails.join(',')}?subject=${encodeURIComponent(
    `Project enquiry${form.inquiry ? ` - ${form.inquiry}` : ''}`
  )}&body=${encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : '',
      form.phone ? `Phone: ${form.phone}` : '',
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')
  )}`;
  const showDirectFallback = status === 'error' && errorMsg.toLowerCase().includes('email service');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Unknown error');
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message ?? 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <section className="relative py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-geo-dark via-geo-black to-black">
        <GeoBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-geo-cyan" />
            <span className="text-xs font-mono tracking-widest text-geo-cyan uppercase">Get In Touch</span>
            <div className="h-px w-8 bg-geo-cyan" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold font-display text-white leading-tight mb-6">
            Start a <span className="text-gradient-cyan">Conversation</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Tell us about your project. Our technical team will respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: 'Office',
                  value: 'Arietallin Street\nYenagoa 569101, Bayelsa\nNigeria',
                  color: 'copper',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'services@frandeeconsultingservices.com',
                  color: 'cyan',
                  href: 'mailto:services@frandeeconsultingservices.com',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+234 906 729 8542',
                  color: 'emerald',
                  href: 'tel:+2349067298542',
                },
                {
                  icon: Clock,
                  label: 'Hours',
                  value: 'Mon-Fri: 8am-6pm WAT\nEmergency support 24/7',
                  color: 'copper',
                },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                      item.color === 'cyan'
                        ? 'bg-geo-cyan/10'
                        : item.color === 'copper'
                        ? 'bg-geo-copper/10'
                        : 'bg-geo-emerald/10'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        item.color === 'cyan'
                          ? 'text-geo-cyan'
                          : item.color === 'copper'
                          ? 'text-geo-copper'
                          : 'text-geo-emerald'
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-slate-700 hover:text-geo-cyan transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm text-slate-700 whitespace-pre-line">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-xl bg-white border border-geo-cyan/20 shadow-sm">
                <div className="text-[10px] font-mono tracking-widest text-geo-copper uppercase mb-3">
                  Direct Inboxes
                </div>
                <div className="space-y-2">
                  {directEmails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="flex items-center gap-2 text-sm text-slate-700 hover:text-geo-cyan transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-geo-copper flex-shrink-0" />
                      <span className="break-all">{email}</span>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/message/OTFG6GTCJ66PP1"
                className="flex items-center gap-3 p-5 rounded-xl bg-white border border-green-200 shadow-sm hover:border-green-400 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-600">Chat on WhatsApp</div>
                  <div className="text-xs text-slate-500">Quick response for urgent queries</div>
                </div>
              </a>
            </div>

            <div className="lg:col-span-2">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex items-center justify-center min-h-[500px] bg-white border border-slate-200 rounded-xl shadow-sm"
                >
                  <div className="text-center p-12">
                    <div className="w-16 h-16 rounded-full bg-geo-emerald/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-geo-emerald" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-geo-dark mb-2">Message Sent!</h3>
                    <p className="text-slate-600 mb-2">Your enquiry has been delivered to our team.</p>
                    <p className="text-sm text-slate-500">
                      Check your inbox. We have sent you a confirmation and will reply within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setForm({ name: '', email: '', company: '', phone: '', inquiry: '', message: '' });
                      }}
                      className="mt-8 btn-secondary text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-white border border-slate-200 shadow-xl space-y-5" noValidate>
                  <div className="text-[10px] font-mono text-geo-cyan tracking-widest uppercase">
                    Project Inquiry Form
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </div>
                      {showDirectFallback && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a href={directMailHref} className="btn-primary text-xs px-4 py-2">
                            Email Directly
                          </a>
                          <a href="https://wa.me/message/OTFG6GTCJ66PP1" className="btn-secondary text-xs px-4 py-2">
                            WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {(
                      [
                        { name: 'name', label: 'Full Name *', placeholder: 'Your full name', type: 'text', required: true },
                        { name: 'email', label: 'Email Address *', placeholder: 'your@email.com', type: 'email', required: true },
                        { name: 'company', label: 'Company / Organisation', placeholder: 'Your company', type: 'text', required: false },
                        { name: 'phone', label: 'Phone Number', placeholder: '+234 ...', type: 'tel', required: false },
                      ] as const
                    ).map((field) => (
                      <div key={field.name}>
                        <label htmlFor={field.name} className="block text-xs text-slate-600 mb-1.5">
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={(form as any)[field.name]}
                          onChange={handleChange}
                          disabled={status === 'loading'}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-geo-cyan focus:ring-2 focus:ring-geo-cyan/15 transition-all disabled:opacity-50"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="inquiry" className="block text-xs text-slate-600 mb-1.5">
                      Service Inquiry *
                    </label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      value={form.inquiry}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-geo-cyan focus:ring-2 focus:ring-geo-cyan/15 transition-all disabled:opacity-50"
                    >
                      <option value="">Select inquiry type</option>
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs text-slate-600 mb-1.5">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about your project: location, scope, objectives, timeline..."
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-geo-cyan focus:ring-2 focus:ring-geo-cyan/15 transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Your message is sent directly to{' '}
                    <span className="text-slate-600">dr.francis@frandeeconsultingservices.com</span>
                    {' '}and{' '}
                    <span className="text-slate-600">services@frandeeconsultingservices.com</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
