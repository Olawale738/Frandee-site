import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';

/**
 * Static gallery — pulls from the local public/images tree at build time.
 * Categories are baked here to match the seeded image set; if you add more
 * images to public/images, extend the relevant array below.
 */
const CATEGORIES = [
  {
    id: 'mineral-exploration',
    label: 'Mineral Exploration',
    dir: 'mineral-exploration',
    prefix: 'mineral',
    count: 16,
  },
  {
    id: 'ves-ert',
    label: 'VES & ERT Surveys',
    dir: 'ves-ert',
    prefix: 'ves',
    count: 17,
  },
  {
    id: 'field-operations',
    label: 'Field Operations',
    dir: 'field-operations',
    prefix: 'field',
    count: 8,
  },
  {
    id: 'students',
    label: 'Field School',
    dir: 'students',
    prefix: 'student',
    count: 11,
  },
  {
    id: 'conferences',
    label: 'Conferences',
    dir: 'conferences',
    prefix: 'conf',
    count: 12,
  },
];

const images = (dir: string, prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `/images/${dir}/${prefix}-${String(i + 1).padStart(2, '0')}.jpg`,
  );

export default function Gallery() {
  const [active, setActive] = useState<string>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const all = CATEGORIES.flatMap((c) =>
    images(c.dir, c.prefix, c.count).map((src) => ({ src, cat: c.id })),
  );
  const visible = active === 'all' ? all : all.filter((i) => i.cat === active);

  return (
    <Layout title="Gallery">
      <section className="py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Field gallery"
            title="From the field"
            description="A selection of photographs from recent mineral exploration, geophysical surveys, training programmes and industry events."
          />

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActive('all')}
              className={`btn ${active === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            >
              All ({all.length})
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`btn ${active === c.id ? 'btn-primary' : 'btn-ghost'}`}
              >
                {c.label} ({c.count})
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map(({ src }) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                className="relative block aspect-[4/3] overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
              >
                <Image
                  src={src}
                  alt={src}
                  fill
                  sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        {lightbox && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightbox(null)}
          >
            <div className="relative h-[90vh] w-full max-w-5xl">
              <Image
                src={lightbox}
                alt="Field photo"
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <button
                aria-label="Close"
                className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-slate-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
