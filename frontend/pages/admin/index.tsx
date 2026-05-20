import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import { useAuth } from '../../lib/auth';
import { api } from '../../lib/api';
import type { Project, Equipment, Service, User } from '../../lib/types';

export default function AdminDashboard() {
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<{
    projects: number; equipment: number; services: number; users?: number;
  }>({ projects: 0, equipment: 0, services: 0 });

  useEffect(() => {
    if (loading) return;
    if (!user || !token) {
      router.replace('/admin/login');
      return;
    }
    void (async () => {
      try {
        const [projects, equipment, services] = await Promise.all([
          api.get<Project[]>('/projects'),
          api.get<Equipment[]>('/equipment'),
          api.get<Service[]>('/services'),
        ]);
        let users: number | undefined;
        if (user.role === 'ADMIN') {
          try {
            const us = await api.get<User[]>('/auth/users', token);
            users = us.length;
          } catch { /* ignore */ }
        }
        setStats({ projects: projects.length, equipment: equipment.length, services: services.length, users });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('admin load', e);
      }
    })();
  }, [loading, user, token, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <Layout title="Admin">
      <section className="py-12">
        <div className="container-wide">
          <div className="flex items-start justify-between">
            <SectionHeader
              eyebrow="Logged in"
              title={`Welcome, ${user.name}`}
              description={`Role: ${user.role}`}
            />
            <button onClick={logout} className="btn-outline">Log out</button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Projects" value={stats.projects} />
            <Stat label="Equipment" value={stats.equipment} />
            <Stat label="Services" value={stats.services} />
            {stats.users !== undefined && <Stat label="Users" value={stats.users} />}
          </div>

          <div className="mt-10 card p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">Next steps</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>This dashboard is a starter view. Add CRUD pages under <code>/admin/projects</code>, <code>/admin/inventory</code>, etc.</li>
              <li>All write endpoints accept <code>Authorization: Bearer {`<token>`}</code> and enforce role-based access on the backend.</li>
              <li>Use <code>STAFF</code> role for content editors (services, projects, equipment) and <code>ADMIN</code> for user management and deletes.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-brand-800">{value}</p>
    </div>
  );
}
