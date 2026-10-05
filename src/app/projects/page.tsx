import React from 'react';
import { getProjects } from '@/lib/db';
import ProjectsSection from '@/components/ProjectsSection';
import FreeTrialSection from '@/components/FreeTrialSection';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Client Projects & Portfolio Case Studies | BrandYuga',
  description:
    'Explore selected digital platforms and high-converting e-commerce case studies delivered by BrandYuga: Dezignxo, Jettel, Gadgets Zone, and more.',
  alternates: {
    canonical: 'https://brandyuga.in/projects',
  },
  openGraph: {
    title: 'Client Projects & Portfolio Case Studies | BrandYuga',
    description:
      'Explore successful digital storefronts and marketplaces engineered by BrandYuga.',
    url: 'https://brandyuga.in/projects',
    type: 'website',
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-24 pb-16">
      <section className="relative py-16 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Case Studies & Work</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Selected <span className="glow-gradient-brand">Client Projects</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          From 3D digital marketplaces to consumer electronics D2C stores and high-volume e-commerce catalogs.
        </p>
      </section>

      <ProjectsSection projects={projects} />
      <FreeTrialSection />
    </div>
  );
}
