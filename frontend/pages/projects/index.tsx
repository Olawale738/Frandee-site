import Link from 'next/link';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import { api } from '../../lib/api';
import type { Project } from '../../lib/types';

interface Props { projects: Project[]; }

export default function ProjectsIndex({ projects }: Props) {
  return (
    <Layout title="Projects">
      <section className="py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Selected work"
            title="Projects"
            description="A representative selection of our recent campaigns. Tap any card for full details and a downloadable PDF report."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.id} href={`/projects/${p.slug}`} className="card overflow-hidden transition hover:shadow-md">
                <div className="relative aspect-[16/9] w-full">
                  {p.coverImage && (
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                      {p.category}
                    </span>
                    <span className="text-xs text-slate-500">· {p.status}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.summary}</p>
                  <p className="mt-3 text-xs text-slate-500">{p.location ?? '—'}</p>
                </div>
              </Link>
            ))}
            {projects.length === 0 && (
              <p className="text-slate-600">No projects yet — check back soon.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const projects = await api.get<Project[]>('/projects');
    return { props: { projects }, revalidate: 300 };
  } catch {
    return { props: { projects: [] }, revalidate: 60 };
  }
};
