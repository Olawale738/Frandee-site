import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container-wide grid gap-8 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-brand-800">
            Frandee Consulting Services
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Mineral exploration, geophysical surveying and field operations across Nigeria
            and West Africa.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/about" className="hover:text-brand-700">About</Link></li>
            <li><Link href="/services" className="hover:text-brand-700">Services</Link></li>
            <li><Link href="/projects" className="hover:text-brand-700">Projects</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/inventory" className="hover:text-brand-700">Equipment & Software</Link></li>
            <li><Link href="/gallery" className="hover:text-brand-700">Field Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Reach us</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Lokoja, Kogi State, Nigeria</li>
            <li>info@frandeeconsult.com</li>
            <li>+234 (0) 800 000 0000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Frandee Consulting Services. All rights reserved.
      </div>
    </footer>
  );
}
