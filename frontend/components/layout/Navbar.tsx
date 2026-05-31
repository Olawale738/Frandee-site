'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, MapPin, Layers, Activity,
  Globe, Droplets, FlaskConical, Target, BarChart3,
  FileText, Phone,
} from 'lucide-react';
import { SERVICES } from '@/lib/data';

const iconMap = {
  Layers, Activity, Globe, MapPin, Droplets, FlaskConical, Target, BarChart3, FileText,
};

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Why Us', href: '/#why-us' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-geo-dark/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-geo-copper/30 group-hover:ring-geo-copper/60 transition-all duration-300 shadow-copper">
                <Image
                  src="/images/logo/frandee-logo.jpg"
                  alt="Frandee Geoscience"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <span className="text-lg font-bold font-display text-white tracking-tight">
                  Frandee
                </span>
                <span className="block text-[10px] text-geo-cyan font-mono tracking-widest uppercase opacity-80">
                  Geoscience
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? 'text-geo-cyan bg-geo-cyan/10'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-geo-dark/95 backdrop-blur-xl border border-geo-border/60 rounded-2xl shadow-panel overflow-hidden"
                        >
                          <div className="p-2 max-h-[72vh] overflow-y-auto">
                            <div className="px-3 pt-2 pb-1">
                              <span className="text-[10px] font-mono tracking-widest text-geo-cyan uppercase">Our Services</span>
                            </div>
                            {SERVICES.map((service) => {
                              const Icon = iconMap[service.icon as keyof typeof iconMap] || Layers;
                              return (
                                <Link
                                  key={service.id}
                                  href={`/services#${service.id}`}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-geo-cyan/5 transition-colors group"
                                >
                                  <div className="w-7 h-7 rounded-lg bg-geo-panel flex items-center justify-center group-hover:bg-geo-cyan/10 transition-colors">
                                    <Icon className="w-3.5 h-3.5 text-geo-cyan/60 group-hover:text-geo-cyan transition-colors" />
                                  </div>
                                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{service.title}</span>
                                </Link>
                              );
                            })}
                            <div className="mt-2 pt-2 border-t border-geo-border/40 px-3 pb-2">
                              <Link href="/services" className="text-xs text-geo-copper hover:text-geo-copper-light transition-colors font-medium">
                                View all services →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-geo-cyan bg-geo-cyan/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="btn-primary text-sm py-2.5 px-5"
              >
                <Phone className="w-3.5 h-3.5" />
                Start a Project
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Thin accent line */}
        {scrolled && (
          <div className="h-px bg-gradient-to-r from-transparent via-geo-cyan/30 to-transparent" />
        )}
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-geo-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-geo-dark border-l border-geo-border/50 flex flex-col">
              {/* Mobile header */}
              <div className="flex items-center justify-between p-5 border-b border-geo-border/40">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-1 ring-geo-copper/30">
                    <Image
                      src="/images/logo/frandee-logo.jpg"
                      alt="Frandee Geoscience"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-white font-display">Frandee Geo</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive(link.href)
                            ? 'bg-geo-cyan/10 text-geo-cyan'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                        {isActive(link.href) && (
                          <div className="w-1.5 h-1.5 rounded-full bg-geo-cyan" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

              </div>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-geo-border/40">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-geo-cyan text-white font-semibold rounded-xl text-sm transition-all hover:bg-geo-cyan-dark"
                >
                  <Phone className="w-4 h-4" />
                  Start a Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
