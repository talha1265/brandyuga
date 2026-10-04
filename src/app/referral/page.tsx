import React from 'react';
import ReferralSection from '@/components/ReferralSection';
import FreeTrialSection from '@/components/FreeTrialSection';
import { Gift } from 'lucide-react';

export const metadata = {
  title: 'BrandYuga Referral Program | Earn 10% Cash Commission',
  description: 'Refer startups and e-commerce clients to BrandYuga and earn 10% referral commission upon closing.',
};

export default function ReferralPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-16 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Gift className="w-3.5 h-3.5" />
          <span>Partner Incentive Program</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          BrandYuga <span className="glow-gradient-gold">Referral Program</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Introduce businesses and creators to BrandYuga. Receive 10% of the project revenue straight to your bank or UPI.
        </p>
      </section>

      <ReferralSection />
      <FreeTrialSection />
    </div>
  );
}
