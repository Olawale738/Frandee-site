'use client';

import Link from 'next/link';
import { MapPin, Mail, Phone, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';

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
  { name: 'About Us', href: '/about' },
  { name: 'Our Team', href: '/team' },
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-geo-copper to-geo-cyan flex items-center justify-center shadow-copper">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold font-display text-white">Frandee</span>
                <span className="block text-[10px] text-geo-cyan font-mono tracking-widest uppercase">Geoscience</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Full-stack geoscience services — from reconnaissance to drill-ready targets. Serving exploration companies, governments, and research institutions worldwide.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
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
                  123 Geological Drive<br />
                  Earth Sciences Building<br />
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-geo-copper flex-shrink-0" />
                <a href="mailto:info@frandeegeoscience.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                  info@frandeegeoscience.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-geo-copper flex-shrink-0" />
                <a href="tel:+2348000000000" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +234 800 000 0000
                </a>
              </li>
            </ul>

            {/* Certifications badge */}
            <div className="mt-6 p-3 rounded-xl bg-geo-panel border border-geo-border/40">
              <div className="text-[10px] font-mono text-geo-cyan tracking-widest uppercase mb-1">Certified By</div>
              <div className="text-xs text-slate-400">ISO 9001 · GISP · SEG · AGU</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-geo-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Frandee Geoscience. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
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
