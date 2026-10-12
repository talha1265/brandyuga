import React from 'react';
import SubscriptionSection from '@/components/SubscriptionSection';
import FreeTrialSection from '@/components/FreeTrialSection';
import FaqSection from '@/components/FaqSection';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Quarterly Marketplace Management Subscriptions | BrandYuga',
  description:
    'Subscribe to BrandYuga’s 3-Month Marketplace Management: ₹12,000 for Amazon & Flipkart (2 platforms), or ₹18,000 to include Meesho (3 platforms). Powered by PayU secure payments.',
  alternates: {
    canonical: 'https://brandyuga.in/subscription',
  },
  openGraph: {
    title: '3-Month Marketplace Management Subscriptions | BrandYuga',
    description:
      'Manage Amazon, Flipkart & Meesho for ₹12,000 – ₹18,000 / 3 Months with full cataloging, ad management, and dedicated specialist. Secure payment via PayU.',
    url: 'https://brandyuga.in/subscription',
    type: 'website',
  },
};

export default function SubscriptionPage() {
  return (
    <div className="pt-24 pb-16 space-y-8">
      {/* Interactive Plans & PayU Gateway */}
      <SubscriptionSection />

      {/* 1 Month Free Trial Alternative */}
      <FreeTrialSection />

      {/* FAQ */}
      <FaqSection />
    </div>
  );
}
