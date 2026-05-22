/**
 * Site-wide brand and contact info.
 * Update values here and they flow through Header / Footer / Contact / SEO.
 */

export const SITE = {
  name: 'Frandee Consulting Services',
  shortName: 'Frandee',
  tagline: 'Mineral Exploration · Geophysics · Hydrogeology',
  contact: {
    email: 'info@frandeeconsult.com',
    phone: '+234 (0) 800 000 0000',
    address: 'Lokoja, Kogi State, Nigeria',
  },
  social: {
    whatsapp: {
      url: 'https://wa.me/message/OTFG6GTCJ66PP1',
      label: 'WhatsApp',
    },
    youtube: {
      url: 'https://www.youtube.com/@frandeeconsulting',
      label: 'YouTube',
    },
    facebook: {
      url: 'https://www.facebook.com/share/15xP1xt7PQ/',
      label: 'Facebook',
    },
    linkedin: {
      // NOTE: this is the PUBLIC company URL. Don't use the /admin/dashboard/
      // variant — that's the private LinkedIn admin view and 404s for visitors.
      url: 'https://www.linkedin.com/company/43282326/',
      label: 'LinkedIn',
    },
  },
} as const;

export type SocialKey = keyof typeof SITE.social;
