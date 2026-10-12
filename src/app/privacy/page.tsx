import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | BrandYuga Technologies',
  description:
    'BrandYuga Privacy Policy outlining how client data, payments, and marketplace seller credentials are protected.',
};

export default function PrivacyPage() {
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
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Last Updated: January 1, 2026 • BrandYuga Technologies</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed mt-8 border-t border-white/10 pt-6">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              1. Information We Collect
            </h2>
            <p>
              When engaging BrandYuga services or subscribing to marketplace management packages, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Contact details: Name, email address, mobile number, company or brand name.</li>
              <li>Billing details: GST registration number (if applicable) and billing address.</li>
              <li>E-Commerce context: Marketplace seller URLs, product catalogs, brand category, and target sales goals.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              2. Payment Data &amp; Gateway Security
            </h2>
            <p>
              BrandYuga does not store your credit card numbers, debit card PINs, CVV codes, or UPI MPINs on our servers. All financial transactions are securely handled through <strong className="text-white">PayU</strong>, a PCI-DSS Level 1 compliant payment processor that uses 256-bit bank-grade SSL encryption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              3. Marketplace Seller Account Confidentiality
            </h2>
            <p>
              We operate strictly under Non-Disclosure standards. Your sales reports, gross margins, supplier contacts, and ad performance metrics are accessible solely to your designated BrandYuga account team and will never be shared, leased, or disclosed to third parties or competitor brands.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              4. Cookies &amp; Analytics
            </h2>
            <p>
              Our website uses basic performance cookies to analyze user journeys, optimize page load speeds, and maintain user preferences. We do not use invasive tracking pixels or sell user data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              5. Contact Us Regarding Your Privacy
            </h2>
            <p>
              If you have any questions or requests regarding your personal data, please contact our Data Officer at <strong className="text-purple-300">info@brandyuga.in</strong> or call <strong className="text-purple-300">+91 88530 66278</strong>.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>256-Bit SSL Encrypted &amp; PCI-DSS Level 1 Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-cyan-300 underline">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-cyan-300 underline">Refund Policy</Link>
            <Link href="/contact" className="hover:text-cyan-300 underline">Contact Desk</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
