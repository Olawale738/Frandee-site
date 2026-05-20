import Image from 'next/image';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { api } from '../../lib/api';
import type { Project } from '../../lib/types';

interface Props { project: Project | null; }

export default function ProjectPage({ project }: Props) {
  if (!project) {
    return (
      <Layout title="Project not found">
        <div className="container-wide py-16">
          <p>That project could not be found.</p>
        </div>
      </Layout>
    );
  }
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
  return (
    <Layout title={project.title} description={project.summary}>
      <article>
        <header className="relative h-72 w-full overflow-hidden md:h-96">
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40" />
          <div className="absolute bottom-0 w-full">
            <div className="container-wide pb-8 text-white">
              <p className="text-sm font-medium uppercase tracking-wider text-brand-200">
                {project.category} · {project.status}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">{project.title}</h1>
              {project.location && <p className="mt-1 text-slate-200">{project.location}</p>}
            </div>
          </div>
        </header>

        <div className="container-wide grid gap-10 py-12 md:grid-cols-3">
          <aside className="md:col-span-1 space-y-3 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Client</p>
              <p className="text-slate-800">{project.client ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Period</p>
              <p className="text-slate-800">
                {project.startDate ? new Date(project.startDate).toISOString().slice(0, 10) : '—'}{' '}
                →{' '}
                {project.endDate ? new Date(project.endDate).toISOString().slice(0, 10) : 'ongoing'}
              </p>
            </div>
            {project.tags?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Tags</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <a
              href={`${apiBase}/reports/projects/${project.slug}.pdf`}
              className="btn-primary mt-4"
              target="_blank"
              rel="noreferrer"
            >
              Download PDF report
            </a>
          </aside>

          <div className="prose-frandee md:col-span-2">
            <p className="text-lg font-medium text-slate-800">{project.summary}</p>
            <p className="mt-6 whitespace-pre-line">{project.description}</p>
          </div>
        </div>

        {project.gallery?.length > 0 && (
          <section className="bg-slate-50 py-12">
            <div className="container-wide">
              <h2 className="font-display text-2xl font-bold text-slate-900">Field gallery</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((src, i) => (
                  <div key={src + i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={src}
                      alt={`${project.title} — photo ${i + 1}`}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const projects = await api.get<Project[]>('/projects');
    return {
      paths: projects.map((p) => ({ params: { slug: p.slug } })),
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const slug = params!.slug as string;
    const project = await api.get<Project>(`/projects/${slug}`);
    return { props: { project }, revalidate: 300 };
  } catch {
    return { props: { project: null }, revalidate: 60 };
  }
};
