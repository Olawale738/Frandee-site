import { Facebook, Linkedin, Youtube } from 'lucide-react';
import { SITE } from '../lib/site';

/**
 * Inline WhatsApp glyph — lucide-react doesn't ship one as of 0.453.
 * Keeps the bundle one fewer dependency.
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.077 4.928A9.95 9.95 0 0 0 12.012 2c-5.503 0-9.997 4.495-9.997 9.998 0 1.762.463 3.484 1.339 4.999L2 22l5.142-1.348a9.99 9.99 0 0 0 4.87 1.244h.004c5.503 0 9.997-4.495 9.997-9.998a9.95 9.95 0 0 0-2.936-7.07ZM12.016 20.215h-.003a8.21 8.21 0 0 1-4.184-1.147l-.3-.178-3.054.8.815-2.977-.195-.308a8.207 8.207 0 0 1-1.252-4.408c0-4.541 3.694-8.235 8.238-8.235 2.2 0 4.266.856 5.821 2.413a8.18 8.18 0 0 1 2.414 5.825c-.002 4.541-3.696 8.215-8.3 8.215Zm4.52-6.163c-.247-.124-1.464-.722-1.69-.804-.227-.083-.392-.124-.557.124-.165.247-.64.804-.785.97-.144.166-.289.187-.536.062-.247-.124-1.044-.385-1.989-1.227-.735-.655-1.232-1.466-1.377-1.713-.144-.247-.015-.38.108-.504.111-.11.247-.288.371-.432.124-.144.165-.247.247-.412.083-.166.041-.31-.02-.433-.062-.124-.557-1.342-.763-1.836-.2-.481-.404-.416-.557-.424l-.475-.008c-.165 0-.433.061-.66.31-.227.247-.866.846-.866 2.064 0 1.219.887 2.397 1.011 2.564.124.166 1.746 2.666 4.23 3.739.591.255 1.052.407 1.412.521.593.189 1.133.162 1.56.099.476-.071 1.464-.598 1.671-1.177.207-.578.207-1.073.145-1.177-.062-.103-.227-.165-.474-.289Z"/>
    </svg>
  );
}

const ICONS = {
  whatsapp: WhatsAppIcon,
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

interface Props {
  /** "icon" = icon-only round buttons. "label" = icon + text. */
  variant?: 'icon' | 'label';
  className?: string;
}

export default function SocialLinks({ variant = 'icon', className = '' }: Props) {
  const items = (Object.keys(SITE.social) as Array<keyof typeof SITE.social>).map(
    (k) => ({ key: k, ...SITE.social[k], Icon: ICONS[k] }),
  );

  if (variant === 'label') {
    return (
      <ul className={`grid gap-2 ${className}`}>
        {items.map(({ key, url, label, Icon }) => (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-slate-700 hover:text-brand-700"
              aria-label={label}
            >
              <Icon className="h-5 w-5 text-brand-700" />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {items.map(({ key, url, label, Icon }) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-700 hover:bg-brand-700 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
