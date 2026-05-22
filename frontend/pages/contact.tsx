import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';
import { SITE } from '../lib/site';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

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
                <span>{SITE.contact.address}</span>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-brand-700" />
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-brand-700">
                  {SITE.contact.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-brand-700" />
                <span>{SITE.contact.phone}</span>
              </p>
              <p className="flex items-start ga