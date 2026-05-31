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
  title: 'Frandee Geoscience | Engineering & Geoscience Consulting',
  description: 'Professional geoscience, engineering, oil and gas, environmental, and technical research services delivered with data-driven precision.',
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
