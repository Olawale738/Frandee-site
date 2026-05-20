import Link from 'next/link';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import { api } from '../lib/api';
import type { Service, Project } from '../lib/types';

interface Props { services: Service[]; projects: Project[]; }

export default function Home({ services, projects }: Props) {
  return (
    <Layout>
      <Hero />

      {/* Services */}
      <section className="py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="What we do"
            title="Full-stack geoscience services"
            description="From reconnaissance to drill-ready targets — and everything in between. We support exploration teams, water boards, regulators, and academia."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <Link key={s.id} href={`/services#${s.slug}`} className="card p-6 transition hover:shadow-md">
                <h3 className="font-display text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-slate-50 py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Field-tested"
            title="Recent projects"
            description="A small sample of our recent campaigns across exploration, geophysics and training."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <Link key={p.id} href={`/projects/${p.slug}`} className="card overflow-hidden transition hover:shadow-md">
                <div className="relative h-44 w-full">
                  {p.coverImage && (
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-brand-700">{p.category}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/projects" className="btn-outline">All projects →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-narrow card flex flex-col items-center gap-4 bg-gradient-to-br from-brand-700 to-brand-900 p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold">Have a site, basin or licence in mind?</h2>
          <p className="max-w-xl text-brand-100">
            Tell us about the work. We&apos;ll respond within 2 business days with a scope of work, indicative cost,
            and timeline.
          </p>
          <Link href="/contact" className="btn bg-white text-brand-800 hover:bg-brand-50">
            Get in touch
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [services, projects] = await Promise.all([
      api.get<Service[]>('/services'),
      api.get<Project[]>('/projects'),
    ]);
    return { props: { services, projects }, revalidate: 300 };
  } catch {
    return { props: { services: [], projects: [] }, revalidate: 60 };
  }
};
