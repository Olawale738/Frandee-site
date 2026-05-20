import type { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import { api } from '../lib/api';
import type { Service } from '../lib/types';

interface Props { services: Service[]; }

export default function Services({ services }: Props) {
  return (
    <Layout title="Services">
      <section className="py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="What we do"
            title="Services"
            description="From single-site VES surveys to multi-licence exploration programmes, here is the full spectrum of what we deliver."
          />
          <div className="mt-12 space-y-12">
            {services.map((s) => (
              <article id={s.slug} key={s.id} className="grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">#{String(s.order).padStart(2,'0')}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">{s.title}</h2>
                </div>
                <div className="md:col-span-2 prose-frandee">
                  <p className="text-lg font-medium text-slate-800">{s.summary}</p>
                  <p className="mt-4">{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const services = await api.get<Service[]>('/services');
    return { props: { services }, revalidate: 300 };
  } catch {
    return { props: { services: [] }, revalidate: 60 };
  }
};
