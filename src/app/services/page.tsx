import React from 'react';
import { getServices } from '@/lib/db';
import ServicesSection from '@/components/ServicesSection';
import FreeTrialSection from '@/components/FreeTrialSection';
import { Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Our Services | BrandYuga - Full-Stack E-Commerce Growth',
  description:
    'Explore BrandYuga services: Product Research, D2C Web Stores, Photo/Video Shoots, Marketplace Scaling, PPC Ads, and Analytics.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pt-24 pb-16">
      {/* Services Header */}
      <section className="relative py-16 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Tailored Brand Accelerators</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Comprehensive <span className="glow-gradient-brand">E-Commerce Solutions</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          From finding what sells to building your high-speed D2C storefront, creating viral video ads, and managing daily Amazon/Flipkart operations.
        </p>
      </section>

      {/* Services Grid Component */}
      <ServicesSection services={services} />

      {/* 1 Month Free Trial Banner */}
      <FreeTrialSection />
    </div>
  );
}
