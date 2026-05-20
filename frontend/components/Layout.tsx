import Head from 'next/head';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: Props) {
  const fullTitle = title
    ? `${title} · Frandee Consulting Services`
    : 'Frandee Consulting Services · Mineral Exploration & Geophysics';
  const desc =
    description ??
    'Frandee Consulting Services delivers mineral exploration, geophysical surveying, hydrogeology and field operations across Nigeria and West Africa.';
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo/frandee-logo.jpg" />
      </Head>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
