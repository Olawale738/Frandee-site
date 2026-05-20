import Image from 'next/image';
import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';

export default function About() {
  return (
    <Layout title="About" description="About Frandee Consulting Services">
      <section className="py-16">
        <div className="container-wide grid items-start gap-10 md:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Who we are"
              title="Two decades of West African geoscience expertise"
            />
            <div className="prose-frandee mt-6 space-y-4">
              <p>
                Frandee Consulting Services is an independent geoscience consultancy based in Lokoja, Nigeria.
                We specialise in mineral exploration, ground geophysics, hydrogeology and field operations management,
                with project experience across the Nigerian Basement Complex and the Benue Trough.
              </p>
              <p>
                Our work combines modern instrumentation, careful field practice and rigorous reporting. We hold ourselves
                to international standards (JORC competent-person reporting, WHO water-quality criteria) and we believe
                that good geoscience starts with safe, well-organised fieldwork.
              </p>
              <p>
                We are proud to partner with universities, regulators, investors and operators — and to host annual
                field schools for the next generation of geoscientists.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/mineral-exploration/mineral-07.jpg"
              alt="Field team at work"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-wide">
          <SectionHeader eyebrow="What guides us" title="Principles" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Safety first', 'Daily HSE briefings, GPS-tracked crews, written campaign HSE plans for every mobilisation.'],
              ['Ground-truth', 'Every interpretation is tied back to physical observation, sampling and instrumentation.'],
              ['Open data', 'Clients receive full raw data, processing notes and reproducible workflows — not just final PDFs.'],
              ['Community first', 'Formal stakeholder engagement on every campaign. Local content is built in, not bolted on.'],
              ['Modern tools', 'VES/ERT, magnetics, GPR, total stations, drones, and a fully licensed software stack.'],
              ['Honest reporting', 'Competent-person reports written to JORC standards. We say no to overselling.'],
            ].map(([t, d]) => (
              <div key={t} className="card p-6">
                <h3 className="font-display text-lg font-semibold text-slate-900">{t}</h3>
                <p className="mt-2 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
