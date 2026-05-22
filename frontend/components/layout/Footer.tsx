'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, Linkedin, Youtube, Facebook, MessageCircle } from 'lucide-react';

const services = [
  { name: 'Geological Mapping', href: '/services#geological' },
  { name: 'Geophysical Surveys', href: '/services#geophysics' },
  { name: 'Remote Sensing', href: '/services#remote-sensing' },
  { name: 'GIS & Spatial Analysis', href: '/services#gis' },
  { name: 'Hydrogeology', href: '/services#hydro' },
  { name: 'Environmental Assessment', href: '/services#environmental' },
  { name: 'Mineral Exploration', href: '/services#exploration' },
  { name: 'Data Interpretation', href: '/services#data' },
];

const company = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Research & Publications', href: '/research' },
  { name: 'Training', href: '/training' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-geo-black border-t border-geo-border/40 overflow-hidden">
      {/* Background topographic pattern */}
      <div className="absolute inset-0 topo-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 geo-grid-bg pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-1 ring-geo-copper/30 group-hover:ring-geo-copper/60 transition-all duration-300 shadow-copper flex-shrink-0">
                <Image
                  src="/images/logo/frandee-logo.jpg"
                  alt="Frandee Geoscience"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold font-display text-white">Frandee</span>
                <span className="block text-[10px] text-geo-cyan font-mono tracking-widest uppercase">Consulting Services</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              <em className="text-geo-copper not-italic font-medium">Telling the story beneath the earth.</em>
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Expert geoscience consulting — from field surveys to published research. Serving exploration companies, governments, and academia across Africa.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/company/43282326/', label: 'LinkedIn' },
                { icon: Facebook, href: 'https://www.facebook.com/share/15xP1xt7PQ/', label: 'Facebook' },
                { icon: Youtube, href: 'https://youtube.com/@frandeeconsulting', label: 'YouTube' },
                { icon: MessageCircle, href: 'https://wa.me/message/OTFG6GTCJ66PP1', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-geo-panel border border-geo-border/40 flex items-center justify-center text-slate-400 hover:text-geo-cyan hover:border-geo-cyan/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-geo-cyan uppercase mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors animated-underline"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-geo-cyan uppercase mb-5">Company</h4>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.name}>
                  <Link
                    href={c.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors animated-underline"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-geo-cyan uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-geo-copper mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">
                  Arietallin Street<br />
                  Yenagoa 569101, Bayelsa<br />
                  Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-geo-copper flex-shrink-0" />
                <a href="mailto:dr.francis@frandeeconsultingservices.com" className="text-sm text-slate-400 hover:text-white transition-colors break-all">
                  dr.francis@frandeeconsultingservices.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-geo-copper flex-shrink-0" />
                <a href="mailto:contact@frandeeconsultingservices.com" className="text-sm text-slate-400 hover:text-white transition-colors break-all">
                  contact@frandeeconsultingservices.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-geo-copper flex-shrink-0" />
                <a href="tel:+2349067298542" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +234 906 729 8542
                </a>
              </li>
            </ul>

            {/* Tagline badge */}
            <div className="mt-6 p-3 rounded-xl bg-geo-panel border border-geo-copper/20">
              <div className="text-[10px] font-mono text-geo-copper tracking-widest uppercase mb-1">Expertise</div>
              <div className="text-xs text-slate-400">Geology · Geophysics · GIS · Research Support</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-geo-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Frandee Consulting Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link key={item} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
