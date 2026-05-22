import Head from 'next/head';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { SITE } from '../lib/site';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: Props) {
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · ${SITE.tagline}`;
  const desc =
    description ??
    `${SITE.name} delivers mineral exploration, geophysical surveying, hydrogeology and field operations across Nigeria and West Africa.`;

  // schema.org Organization — tells Google/LinkedIn the verified social profiles.
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: 'https://www.frandeeconsult.com',
    logo: 'https://www.frandeeconsult.com/images/logo/frandee-logo.jpg',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.contact.email,
      telephone: SITE.contact.phone,
      areaServed: 'NG',
    },
    sameAs: [
      SITE.social.facebook.url,
      SITE.social.linkedin.url,
 