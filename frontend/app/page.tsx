import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProjectsCarousel from '@/components/home/ProjectsCarousel';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import ClientLogos from '@/components/home/ClientLogos';
import WorkflowTimeline from '@/components/home/WorkflowTimeline';

export const metadata: Metadata = {
  title: 'Frandee Geoscience | Full-Stack Geoscience Services',
  description: 'From reconnaissance to drill-ready targets. World-class geological exploration, geophysics, remote sensing, GIS, hydrogeology, and environmental services across Africa and beyond.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesPreview />
      <WorkflowTimeline />
      <ProjectsCarousel />
      <ClientLogos />
      <Testimonials />
      <CTABanner />
    </>
  );
}
