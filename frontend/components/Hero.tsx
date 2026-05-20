import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <Image
        src="/images/field-operations/field-01.jpg"
        alt="Field operations"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-0 object-cover opacity-30"
      />
      <div className="relative z-10 container-wide py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="mb-3 inline-block rounded-full bg-brand-700/30 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-brand-300/40">
            Exploration · Geophysics · Hydrogeology
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Ground-truth answers for the resources of West Africa.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">
            Frandee Consulting Services delivers safe, well-instrumented field campaigns,
            modern geophysical surveys and competent-person reports — from reconnaissance
            to drill-ready targets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services" className="btn-primary">Our services</Link>
            <Link href="/projects" className="btn-outline border-white/60 text-white hover:bg-white/10">
              See our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
