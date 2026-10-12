import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Refund & Cancellation Policy | BrandYuga Technologies',
  description:
    'Clear guidelines on cancellations, satisfaction guarantees, and refunds for BrandYuga 3-Month Marketplace Subscriptions.',
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-300">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to BrandYuga Home</span>
      </Link>

      <div className="border border-white/10 rounded-3xl p-8 sm:p-12 bg-[#080c1d]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Refund &amp; Cancellation Policy</h1>
            <p className="text-xs text-slate-400">Effective Date: January 1, 2026 • PayU Merchant Compliance</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed mt-8 border-t border-white/10 pt-6">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1. Free Trial &amp; Risk-Free Evaluation
            </h2>
            <p>
              We want every brand partner to experience our operational excellence first-hand. BrandYuga offers a <strong className="text-white">1-Month Free Trial</strong> for new qualified sellers before any financial commitment is required. You can test our team&apos;s speed, catalog quality, and ad strategy with zero upfront fee.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              2. 7-Day Onboarding Guarantee (Cooling-off Period)
            </h2>
            <p>
              For our 3-Month Subscriptions (<strong className="text-white">Marketplace Duo ₹12,000</strong> and <strong className="text-white">Marketplace Trio ₹18,000</strong>):
            </p>
            <p>
              If within the first <strong className="text-white">7 days</strong> of subscribing we have not commenced account onboarding or assigned your dedicated Account Specialist, you may request a 100% full refund with no questions asked.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              3. Service Delivery &amp; Pro-Rata Policy
            </h2>
            <p>
              Because e-commerce management involves dedicated human resource allocation, creative graphic creation, keyword research, and custom catalog uploads:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Once initial listings, optimization audits, or active ad campaigns have commenced after the 7-day window, subscriptions are non-refundable for the active billing cycle.</li>
              <li>In exceptional cases of operational inability on BrandYuga&apos;s side, prorated refunds will be reviewed and processed fairly upon management approval.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. Refund Processing via PayU
            </h2>
            <p>
              Approved refunds are credited directly back to the original source account (Debit/Credit Card, Bank Account, or UPI VPA) used during the PayU transaction within <strong className="text-white">5 to 7 business days</strong> as per banking and PayU settlement turnaround standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              5. How to Initiate a Request
            </h2>
            <p>
              To request a cancellation or refund, email us at <strong className="text-purple-300">info@brandyuga.in</strong> with your Transaction ID (e.g., <code className="text-slate-300 bg-white/5 px-2 py-0.5 rounded">BYUGA_...</code>) or reach your dedicated manager directly on WhatsApp at <strong className="text-purple-300">+91 88530 66278</strong>.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Customer-First Transparent Policies</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-emerald-300 underline">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-emerald-300 underline">Privacy Policy</Link>
            <Link href="/subscription" className="hover:text-emerald-300 underline">View Plans</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
