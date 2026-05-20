import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import { useAuth } from '../../lib/auth';

type Form = { email: string; password: string };

export default function AdminLogin() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>();
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!loading && user) router.replace('/admin');
  }, [loading, user, router]);

  async function onSubmit(data: Form) {
    setErr('');
    try {
      await login(data.email, data.password);
      router.replace('/admin');
    } catch (e) {
      setErr((e as { message?: string }).message ?? 'Login failed');
    }
  }

  return (
    <Layout title="Admin · Sign in">
      <section className="py-16">
        <div className="container-narrow max-w-md">
          <h1 className="font-display text-2xl font-bold text-slate-900">Sign in</h1>
          <p className="mt-1 text-sm text-slate-600">Staff and administrator access only.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" className="input" autoComplete="email"
                {...register('email', { required: 'Email required' })} />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" className="input" autoComplete="current-password"
                {...register('password', { required: 'Password required' })} />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <button disabled={isSubmitting} className="btn-primary disabled:opacity-60">
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
