interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ eyebrow, title, description, align = 'left' }: Props) {
  const a = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`max-w-3xl ${a}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-slate-600">{description}</p>
      )}
    </div>
  );
}
