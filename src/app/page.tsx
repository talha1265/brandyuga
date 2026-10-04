import HeroSection from '@/components/HeroSection';
import StatsBanner from '@/components/StatsBanner';
import ServicesSection from '@/components/ServicesSection';
import EcommerceSection from '@/components/EcommerceSection';
import GrowthCalculator from '@/components/GrowthCalculator';
import FreeTrialSection from '@/components/FreeTrialSection';
import ProjectsSection from '@/components/ProjectsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ReferralSection from '@/components/ReferralSection';
import ContactSection from '@/components/ContactSection';
import { getServices, getProjects } from '@/lib/db';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const services = await getServices();
  const projects = await getProjects();

  return (
    <div className="space-y-4">
      <HeroSection />
      <StatsBanner />
      <ServicesSection services={services} />
      <EcommerceSection />
      <GrowthCalculator />
      <FreeTrialSection />
      <ProjectsSection projects={projects} />
      <ReviewsSection />
      <ReferralSection />
      <ContactSection />
    </div>
  );
}
