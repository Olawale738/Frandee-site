import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <Layout title="Contact">
      <section className="py-16">
        <div className="container-wide grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Get in touch"
              title="Tell us about your project"
              description="Scope, timeline, budget — anything. We typically respond within 2 business days."
            />
            <div className="mt-8 space-y-4 text-sm text-slate-700">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-brand-700" />
                <span>Lokoja, Kogi State, Nigeria</span>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-brand-700" />
                <a href="mailto:info@frandeeconsult.com" className="hover:text-brand-700">info@frandeeconsult.com</a>
              </p>
              <p className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-brand-700" />
                <span>+234 (0) 800 000 0000</span>
              </p>
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
