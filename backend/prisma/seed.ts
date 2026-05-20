/**
 * Frandee Consulting Services — Seed script
 *
 * Idempotent: safe to re-run. Creates an ADMIN user, services, equipment,
 * software and four real projects backed by the field images shipped with
 * the repo (frontend/public/images/...).
 *
 * Image paths are stored as web-relative URLs (e.g. /images/projects/foo.jpg)
 * because the frontend serves them straight from its public/ folder.
 */

import { PrismaClient, Role, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

const prisma = new PrismaClient();

// ----- helpers ----------------------------------------------------------------

const sluggify = (s: string) => slugify(s, { lower: true, strict: true });

// ----- admin user -------------------------------------------------------------

async function seedAdmin() {
  const email = 'admin@frandee.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;
  const passwordHash = await bcrypt.hash('SuperSecret123!', 12);
  return prisma.user.create({
    data: {
      email,
      passwordHash,
      name: 'Dr. Francis Omonefe',
      role: Role.ADMIN,
    },
  });
}

// ----- services ---------------------------------------------------------------

const SERVICES = [
  {
    title: 'Mineral Exploration',
    summary:
      'Reconnaissance, prospecting and resource estimation across the Nigerian Basement Complex and beyond.',
    description:
      'We deliver end-to-end mineral exploration programmes: geological reconnaissance, stream sediment and soil geochemistry, trenching and pitting, drill targeting, and JORC-aligned resource estimation. Our team brings 20+ years of regional experience in solid minerals (gold, lithium, tantalite, columbite, baryte, gemstones) and runs structurally-controlled targeting using a combination of remote sensing, ground geophysics and field validation.',
    icon: 'pickaxe',
    order: 1,
  },
  {
    title: 'Geophysical Survey',
    summary:
      'VES, ERT, magnetics, and radiometrics for groundwater, minerals and engineering investigations.',
    description:
      'Frandee Consulting Services operates a full suite of ground geophysical instruments. Our Vertical Electrical Sounding (VES) and Electrical Resistivity Tomography (ERT) workflows are routinely deployed for borehole siting, basement-depth mapping, fault delineation and overburden characterisation. We also offer magnetics and gamma-ray spectrometry for mineral and structural mapping.',
    icon: 'activity',
    order: 2,
  },
  {
    title: 'Hydrogeological Studies',
    summary:
      'Borehole siting, aquifer characterisation, yield testing and groundwater quality assessments.',
    description:
      'From desk study to drilling supervision, we manage the full water-supply life cycle. Services include hydrogeological mapping, geophysical siting with success-rate guarantees, drilling and casing supervision, pumping tests with aquifer-parameter analysis, and physico-chemical water quality assessment to WHO and NSDWQ standards.',
    icon: 'droplets',
    order: 3,
  },
  {
    title: 'Field Operations & Logistics',
    summary:
      'Project-managed field campaigns: crew, equipment, HSE, community liaison, and reporting.',
    description:
      'We run safe, well-instrumented and properly-documented field campaigns. Each campaign is led by a senior field geoscientist, supported by qualified technicians, with HSE plans, daily morning briefings, GPS-tracked sampling, photo logs, and end-of-day data backups. Community liaison and stakeholder engagement are built into every mobilisation.',
    icon: 'truck',
    order: 4,
  },
  {
    title: 'Training & Capacity Building',
    summary:
      'Hands-on field schools and conference workshops for graduate geoscientists and industry professionals.',
    description:
      'We host annual field schools for university students and bespoke training for industry professionals. Modules cover field mapping, instrument handling (VES/ERT, magnetometers, GPS, total station), QA/QC of geochemical sampling, and modern data interpretation using open-source and proprietary software.',
    icon: 'graduation-cap',
    order: 5,
  },
  {
    title: 'Consulting & Conference Support',
    summary:
      'Expert reviews, due-diligence reports, and technical secretariat services for industry conferences.',
    description:
      'Frandee provides independent technical reviews for mining companies and investors, prepares due-diligence and competent person reports, and serves as technical secretariat for sector conferences and stakeholder workshops.',
    icon: 'briefcase',
    order: 6,
  },
];

async function seedServices() {
  for (const s of SERVICES) {
    const slug = sluggify(s.title);
    await prisma.service.upsert({
      where: { slug },
      create: { ...s, slug },
      update: s,
    });
  }
}

// ----- equipment --------------------------------------------------------------

const EQUIPMENT = [
  {
    name: 'ABEM Terrameter SAS 1000',
    category: 'Geophysics',
    manufacturer: 'ABEM',
    model: 'SAS 1000',
    quantity: 1,
    status: 'AVAILABLE',
    description:
      'Resistivity and IP meter used for VES and ERT surveys. Supports 250 W output and full multi-electrode configurations.',
  },
  {
    name: 'IRIS Syscal Junior Switch 48',
    category: 'Geophysics',
    manufacturer: 'IRIS Instruments',
    model: 'Syscal Junior Switch 48',
    quantity: 1,
    status: 'AVAILABLE',
    description:
      '48-electrode resistivity / IP imaging system for ERT, used for engineering and groundwater applications.',
  },
  {
    name: 'GEM Systems GSM-19T Proton Magnetometer',
    category: 'Geophysics',
    manufacturer: 'GEM Systems',
    model: 'GSM-19T',
    quantity: 2,
    status: 'AVAILABLE',
    description:
      'High-precision proton precession magnetometer for ground magnetic surveys and base-station diurnal correction.',
  },
  {
    name: 'RS-230 Gamma-ray Spectrometer',
    category: 'Geophysics',
    manufacturer: 'Radiation Solutions',
    model: 'RS-230 BGO Super-SPEC',
    quantity: 1,
    status: 'AVAILABLE',
    description:
      'Hand-held BGO gamma-ray spectrometer measuring K, U, Th — used for radiometric mapping and uranium prospecting.',
  },
  {
    name: 'Garmin GPSMAP 64sx',
    category: 'Surveying',
    manufacturer: 'Garmin',
    model: 'GPSMAP 64sx',
    quantity: 8,
    status: 'AVAILABLE',
    description:
      'Rugged handheld GPS receivers used by field crews for waypoints, tracklogs and station marking.',
  },
  {
    name: 'Leica TS06 Plus Total Station',
    category: 'Surveying',
    manufacturer: 'Leica',
    model: 'TS06 plus',
    quantity: 1,
    status: 'AVAILABLE',
    description:
      'Reflectorless total station for topographic and engineering surveys.',
  },
  {
    name: 'Brunton Geo Pocket Transit',
    category: 'Sampling',
    manufacturer: 'Brunton',
    model: 'Com-Pro',
    quantity: 6,
    status: 'AVAILABLE',
    description:
      'Pocket transits / compasses for structural measurements (dip, strike, bearing).',
  },
  {
    name: 'XRF Analyzer Niton XL2 800',
    category: 'Geochemistry',
    manufacturer: 'Thermo Scientific',
    model: 'Niton XL2 800',
    quantity: 1,
    status: 'AVAILABLE',
    description:
      'Hand-held XRF for rapid in-field assay of soil, rock and concentrate samples.',
  },
  {
    name: 'Tube-well Pumping Test Kit',
    category: 'Hydrogeology',
    manufacturer: 'Solinst',
    model: 'Levelogger 5 + Barologger 5',
    quantity: 4,
    status: 'AVAILABLE',
    description:
      'Pressure transducers for constant-rate and step-drawdown aquifer tests.',
  },
];

async function seedEquipment() {
  for (const e of EQUIPMENT) {
    // simple "upsert by name+model" since name isn't unique
    const existing = await prisma.equipment.findFirst({
      where: { name: e.name, model: e.model },
    });
    if (existing) {
      await prisma.equipment.update({ where: { id: existing.id }, data: e });
    } else {
      await prisma.equipment.create({ data: e });
    }
  }
}

// ----- software ---------------------------------------------------------------

const SOFTWARE = [
  {
    name: 'IPI2Win',
    vendor: 'Moscow State University',
    version: '3.x',
    licenseType: 'perpetual',
    seats: 2,
    description: 'Interpretation of vertical electrical sounding (VES) curves.',
  },
  {
    name: 'Res2Dinv',
    vendor: 'Geotomo Software',
    version: '4.x',
    licenseType: 'perpetual',
    seats: 1,
    description: 'Smoothness-constrained 2D inversion of resistivity / IP data.',
  },
  {
    name: 'Oasis montaj',
    vendor: 'Seequent / Bentley',
    version: '2024.x',
    licenseType: 'subscription',
    seats: 1,
    description: 'Geophysical data processing and integration platform.',
  },
  {
    name: 'ArcGIS Pro',
    vendor: 'Esri',
    version: '3.x',
    licenseType: 'subscription',
    seats: 2,
    description: 'GIS for spatial analysis, map production and reporting.',
  },
  {
    name: 'QGIS',
    vendor: 'OSGeo',
    version: '3.34 LTR',
    licenseType: 'open-source',
    seats: 99,
    description: 'Open-source GIS used across all field teams.',
  },
  {
    name: 'Leapfrog Geo',
    vendor: 'Seequent',
    version: '2024.x',
    licenseType: 'subscription',
    seats: 1,
    description: 'Implicit 3D geological modelling for exploration projects.',
  },
];

async function seedSoftware() {
  for (const s of SOFTWARE) {
    const existing = await prisma.software.findFirst({
      where: { name: s.name, vendor: s.vendor },
    });
    if (existing) {
      await prisma.software.update({ where: { id: existing.id }, data: s });
    } else {
      await prisma.software.create({ data: s });
    }
  }
}

// ----- projects (with real images) -------------------------------------------

const gallery = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `/images/${dir}/${dir === 'conferences' ? 'conf' : dir === 'field-operations' ? 'field' : dir === 'mineral-exploration' ? 'mineral' : dir === 'students' ? 'student' : 'ves'}-${String(i + 1).padStart(2, '0')}.jpg`,
  );

const PROJECTS = [
  {
    title: 'Northern Nigeria Lithium & Tantalite Exploration',
    client: 'Confidential — Mining Investor',
    location: 'Nasarawa & Plateau States, Nigeria',
    category: 'Mineral Exploration',
    status: ProjectStatus.COMPLETED,
    summary:
      'Multi-phase exploration programme over pegmatite-hosted lithium-tantalite targets, from stream-sediment reconnaissance to drill-target generation.',
    description:
      'Frandee Consulting Services completed a four-phase exploration programme across two licence blocks. Work included airborne magnetics interpretation, stream-sediment and soil geochemistry (>1,800 samples assayed by XRF and ICP-MS), structural mapping along the regional Ifewara-Zungeru lineament, ground magnetics on 50 m × 5 m grids, and trenching across the highest-priority anomalies. The campaign delivered six drill-ready targets supported by a peer-reviewed technical report.',
    startDate: new Date('2025-08-15'),
    endDate: new Date('2026-03-30'),
    tags: ['lithium', 'tantalite', 'pegmatite', 'geochemistry', 'geophysics'],
    coverImage: '/images/mineral-exploration/mineral-07.jpg',
    gallery: gallery('mineral-exploration', 16),
  },
  {
    title: 'Groundwater Resource Assessment — Federal Capital Territory',
    client: 'FCT Water Board (Consulting subcontract)',
    location: 'Abuja Satellite Towns, FCT, Nigeria',
    category: 'Geophysical Survey',
    status: ProjectStatus.COMPLETED,
    summary:
      'VES and ERT campaign across 12 communities to site high-yield boreholes and characterise the regolith aquifer system.',
    description:
      'A regional hydrogeological investigation combining 168 VES stations and 22 ERT lines (Wenner-Schlumberger array, 5 m electrode spacing) over weathered crystalline basement terrain. Outputs included pseudo-section inversions, depth-to-bedrock maps, fracture-zone delineations, and a prioritised list of 28 borehole sites. Drilling success rate across the recommended sites is currently 92 %.',
    startDate: new Date('2025-05-10'),
    endDate: new Date('2025-12-20'),
    tags: ['groundwater', 'VES', 'ERT', 'basement', 'hydrogeology'],
    coverImage: '/images/ves-ert/ves-05.jpg',
    gallery: gallery('ves-ert', 17),
  },
  {
    title: 'Multi-Site Field Operations & Logistics — Kogi/Niger Confluence',
    client: 'Frandee Internal',
    location: 'Lokoja & adjacent communities, Nigeria',
    category: 'Field Operations',
    status: ProjectStatus.ACTIVE,
    summary:
      'Coordinated field operations across artisanal mining communities — sampling, mapping, stakeholder engagement and HSE oversight.',
    description:
      'Ongoing campaign mobilising mixed crews of geologists, geophysicists and field technicians across multiple artisanal and small-scale mining sites. Activities include daily HSE briefings, formal community engagement sessions with local leaders, sample chain-of-custody management, and integrated reporting back to clients on a weekly cadence.',
    startDate: new Date('2026-01-08'),
    endDate: null,
    tags: ['field operations', 'logistics', 'HSE', 'ASM', 'community'],
    coverImage: '/images/field-operations/field-01.jpg',
    gallery: gallery('field-operations', 8),
  },
  {
    title: 'Industry Conference & Stakeholder Workshop Series',
    client: 'Various — Conference Organisers',
    location: 'Lagos / Abuja, Nigeria',
    category: 'Conference',
    status: ProjectStatus.COMPLETED,
    summary:
      'Technical secretariat and presentation lead for multiple regional mining and groundwater conferences.',
    description:
      'Frandee staff served as conference rapporteurs, session chairs and keynote presenters across multiple events in 2025–2026, with particular focus on solid-minerals investment, hydrogeology, and capacity building for early-career geoscientists.',
    startDate: new Date('2025-09-01'),
    endDate: new Date('2026-04-15'),
    tags: ['conference', 'speaking', 'capacity-building'],
    coverImage: '/images/conferences/conf-01.jpg',
    gallery: gallery('conferences', 12),
  },
  {
    title: 'University Field School — Geophysics & Geological Mapping',
    client: 'Federal University Lokoja (Partnership)',
    location: 'Patti-Forest Reserve, Kogi State, Nigeria',
    category: 'Training',
    status: ProjectStatus.ACTIVE,
    summary:
      'Annual hands-on field training for 200+ undergraduate and postgraduate geoscience students.',
    description:
      'Frandee hosts the annual field school where students get hands-on time with VES/ERT systems, magnetometers, total stations, and structural mapping. The programme runs over 14 days with a structured curriculum, supervised exercises, and end-of-camp reporting in JORC/competent-person style.',
    startDate: new Date('2025-03-10'),
    endDate: new Date('2025-03-24'),
    tags: ['training', 'students', 'field-school', 'capacity-building'],
    coverImage: '/images/students/student-01.jpg',
    gallery: gallery('students', 11),
  },
];

async function seedProjects(adminId: string) {
  for (const p of PROJECTS) {
    const slug = sluggify(p.title);
    await prisma.project.upsert({
      where: { slug },
      create: { ...p, slug, ownerId: adminId },
      update: { ...p },
    });
  }
}

// ----- main -------------------------------------------------------------------

async function main() {
  console.log('[seed] start');
  const admin = await seedAdmin();
  console.log('[seed] admin:', admin.email);
  await seedServices();
  console.log('[seed] services: ok');
  await seedEquipment();
  console.log('[seed] equipment: ok');
  await seedSoftware();
  console.log('[seed] software: ok');
  await seedProjects(admin.id);
  console.log('[seed] projects: ok');
  console.log('[seed] done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
