import React from 'react';
import ContactSection from '@/components/ContactSection';
import FreeTrialSection from '@/components/FreeTrialSection';
import { MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact Strategy Desk & Free Consultation | BrandYuga',
  description:
    'Have a project in mind or want to scale your Amazon, Flipkart or D2C brand? Contact the BrandYuga strategy desk via WhatsApp (+91 88530 66278), Phone or direct inquiry form.',
  alternates: {
    canonical: 'https://brandyuga.in/contact',
  },
  openGraph: {
    title: 'Contact Strategy Desk | BrandYuga',
    description:
      'Book an exploratory growth call with our senior account directors to audit your listings, D2C funnel, or ad campaigns.',
    url: 'https://brandyuga.in/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-16 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Let’s Build Your <span className="glow-gradient-brand">E-Commerce Brand</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Book an exploratory growth call with our senior account directors to audit your listings, D2C funnel, or ad campaigns.
        </p>
      </section>

      <ContactSection />
      <FreeTrialSection />
    </div>
  );
}
