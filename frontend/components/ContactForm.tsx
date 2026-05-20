import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../lib/api';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [err, setErr] = useState('');

  async function onSubmit(data: FormData) {
    setStatus('idle');
    setErr('');
    try {
      await api.post('/contact', data);
      setStatus('ok');
      reset();
    } catch (e) {
      setStatus('err');
      setErr((e as { message?: string }).message ?? 'Submission failed');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Honeypot — hidden from humans */}
      <input
        {...register('website')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            {...register('name', { required: 'Name is required', minLength: 2 })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="label" htmlFor="subject">Subject</label>
        <input id="subject" className="input" {...register('subject')} />
      </div>
      <div>
        <label className="label" htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={6}
          className="input"
          {...register('message', { required: 'Please include a message', minLength: 10 })}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
        {status === 'ok' && (
          <span className="text-sm text-brand-700">Thanks — we&apos;ll be in touch.</span>
        )}
        {status === 'err' && (
          <span className="text-sm text-red-600">{err}</span>
        )}
      </div>
    </form>
  );
}
