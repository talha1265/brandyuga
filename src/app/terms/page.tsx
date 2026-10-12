import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | BrandYuga Technologies',
  description:
    'Terms of Service and Subscription Agreement for BrandYuga E-Commerce Management Services.',
};

export default function TermsPage() {
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
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Terms of Service</h1>
            <p className="text-xs text-slate-400">Effective Date: January 1, 2026 • BrandYuga Technologies</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed mt-8 border-t border-white/10 pt-6">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              1. Acceptance of Terms & Services Overview
            </h2>
            <p>
              By accessing or using BrandYuga (&quot;BrandYuga Technologies&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) services, website (brandyuga.in), and client subscriptions, you agree to comply with and be bound by these Terms of Service. BrandYuga provides full-stack e-commerce growth services, including marketplace account management (Amazon, Flipkart, Meesho), product listing &amp; cataloging, PPC campaign optimization, D2C website development, and commercial photo/video shoots.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              2. Subscription Plans &amp; Billing
            </h2>
            <p>
              BrandYuga offers quarterly (3-Month) marketplace management plans:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>
                <strong className="text-white">Marketplace Duo (₹12,000 for 3 Months):</strong> Full-scope management across Amazon India and Flipkart Seller accounts.
              </li>
              <li>
                <strong className="text-white">Marketplace Trio (₹18,000 for 3 Months):</strong> Full-scope management across Amazon India, Flipkart Seller, and Meesho Supplier accounts.
              </li>
            </ul>
            <p>
              Payments are billed in advance at subscription initiation and processed securely through our authorized payment partner, <strong className="text-white">PayU Payments Private Limited</strong>. All fees are in Indian Rupees (INR) and inclusive of statutory taxes unless explicitly stated otherwise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              3. Marketplace Seller Account Permissions &amp; Data Security
            </h2>
            <p>
              To perform management services, clients provide restricted &quot;Child User / Delegated Access&quot; permissions on Amazon Seller Central, Flipkart Seller Portal, or Meesho Supplier Panel. Clients are strictly advised never to share primary master passwords or OTPs. BrandYuga treats all sales data, inventory numbers, and business metrics as strictly confidential.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              4. Payment Gateway &amp; Processing
            </h2>
            <p>
              All online transactions are securely encrypted via 256-bit SSL and processed via PayU. By selecting online payment, you authorize PayU and our payment partners to charge your selected payment method (UPI, Debit Card, Credit Card, or Net Banking) for the total subscription amount.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              5. Intellectual Property
            </h2>
            <p>
              All client product assets, brand trademarks, logos, and raw imagery remain the exclusive intellectual property of the client. Creative assets, A+ content, and store designs produced by BrandYuga become the licensed property of the client upon receipt of full payment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              6. Limitation of Liability
            </h2>
            <p>
              While BrandYuga employs industry-leading e-commerce SEO and PPC optimization methodologies, e-commerce marketplace algorithms, consumer market demand, category restrictions, and seller compliance guidelines remain under the sole governance of the respective platforms (Amazon, Flipkart, Meesho). BrandYuga is not liable for marketplace suspensions triggered by counterfeit claims, IP disputes, or seller-side non-compliance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PayU Verified Merchant Partner</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-purple-300 underline">Privacy Policy</Link>
            <Link href="/refund-policy" className="hover:text-purple-300 underline">Refund Policy</Link>
            <Link href="/subscription" className="hover:text-purple-300 underline">View Plans</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
