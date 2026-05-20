import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/frandee-logo.jpg"
            alt="Frandee Consulting Services"
            width={36}
            height={36}
            className="rounded"
            priority
          />
          <span className="font-display text-lg font-semibold text-brand-800">
            Frandee Consulting <span className="hidden sm:inline">Services</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-slate-700 hover:text-brand-700">
              {n.label}
            </Link>
          ))}
          <Link href="/admin" className="btn-outline">Admin</Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 md:hidden">
          <div className="container-wide flex flex-col gap-2 py-3">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setOpen(false)} className="btn-outline">
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
