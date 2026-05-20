import type { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import { api } from '../lib/api';
import type { Equipment, Software } from '../lib/types';

interface Props { equipment: Equipment[]; software: Software[]; }

export default function Inventory({ equipment, software }: Props) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
  // group equipment by category
  const grouped = equipment.reduce<Record<string, Equipment[]>>((acc, e) => {
    (acc[e.category] ||= []).push(e);
    return acc;
  }, {});

  return (
    <Layout title="Equipment & Software">
      <section className="py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Inventory"
            title="Equipment & software"
            description="The kit we own, calibrate and mobilise on every campaign."
          />
          <div className="mt-6 flex gap-3">
            <a href={`${apiBase}/reports/inventory.pdf`} target="_blank" rel="noreferrer" className="btn-outline">
              Download inventory PDF
            </a>
          </div>

          <div className="mt-10 space-y-10">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h2 className="font-display text-xl font-semibold text-slate-900">{cat}</h2>
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-slate-700">Item</th>
                        <th className="px-4 py-2 text-left font-medium text-slate-700">Make / Model</th>
                        <th className="px-4 py-2 text-left font-medium text-slate-700">Qty</th>
                        <th className="px-4 py-2 text-left font-medium text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {items.map((e) => (
                        <tr key={e.id}>
                          <td className="px-4 py-2">
                            <div className="font-medium text-slate-900">{e.name}</div>
                            {e.description && (
                              <div className="text-xs text-slate-500">{e.description}</div>
                            )}
                          </td>
                          <td className="px-4 py-2 text-slate-700">
                            {[e.manufacturer, e.model].filter(Boolean).join(' · ') || '—'}
                          </td>
                          <td className="px-4 py-2 text-slate-700">{e.quantity}</td>
                          <td className="px-4 py-2">
                            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl font-semibold text-slate-900">Software stack</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {software.map((s) => (
                <div key={s.id} className="card p-4">
                  <h3 className="font-medium text-slate-900">{s.name}</h3>
                  <p className="text-xs text-slate-500">
                    {[s.vendor, s.version].filter(Boolean).join(' · ') || '—'} · {s.licenseType ?? 'license'}
                  </p>
                  {s.description && <p className="mt-2 text-sm text-slate-600">{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [equipment, software] = await Promise.all([
      api.get<Equipment[]>('/equipment'),
      api.get<Software[]>('/software'),
    ]);
    return { props: { equipment, software }, revalidate: 300 };
  } catch {
    return { props: { equipment: [], software: [] }, revalidate: 60 };
  }
};
