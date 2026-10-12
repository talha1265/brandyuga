'use client';

import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  HelpCircle, 
  Lock, 
  CreditCard,
  Building2,
  Phone,
  Mail,
  User,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Percent,
  CheckCircle2,
  Clock,
  Layers,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

interface PlanDetail {
  id: 'marketplace_duo_3m' | 'marketplace_trio_3m';
  name: string;
  tagline: string;
  badge: string;
  isPopular?: boolean;
  price: number;
  originalPrice: number;
  monthlyEquivalent: number;
  platforms: string[];
  features: string[];
  deliverables: string[];
}

const PLANS: PlanDetail[] = [
  {
    id: 'marketplace_duo_3m',
    name: 'Marketplace Duo',
    badge: 'Popular for Growing Sellers',
    tagline: 'Dual marketplace dominance across Amazon & Flipkart with full-funnel cataloging and sponsored ads.',
    price: 12000,
    originalPrice: 24000,
    monthlyEquivalent: 4000,
    platforms: ['Amazon India', 'Flipkart'],
    features: [
      'Manage 2 Platforms (Amazon & Flipkart)',
      'Quarterly 3-Month Dedicated Sprint',
      'High-CTR Cataloging & SEO Listings (up to 40 SKUs)',
      'Amazon Sponsored Products & Flipkart PLA Ad Management',
      'Daily Buy Box & Pricing Optimization',
      'Inventory Sync & Low-Stock Alerts',
      'Weekly Sales & ROAS Performance Dashboard',
      'Dedicated Account Growth Specialist',
      'WhatsApp & Email Priority Desk',
    ],
    deliverables: [
      'Comprehensive Listing Audit & Keyword Indexing',
      'A+ Content / Enhanced Brand Asset Guidance',
      'Negative Keyword Harvesting to Stop Ad Bleed',
      'Monthly Strategic Growth Review Call',
    ],
  },
  {
    id: 'marketplace_trio_3m',
    name: 'Marketplace Trio (+ Meesho)',
    badge: 'Best Value • Complete Coverage',
    isPopular: true,
    tagline: 'Maximum market reach across Amazon, Flipkart AND Meesho with tier-2/tier-3 sales velocity engines.',
    price: 18000,
    originalPrice: 36000,
    monthlyEquivalent: 6000,
    platforms: ['Amazon India', 'Flipkart', 'Meesho'],
    features: [
      'Manage 3 Platforms (Amazon, Flipkart & Meesho)',
      'Quarterly 3-Month Dedicated Sprint',
      'Everything in Marketplace Duo Plan, plus:',
      'Full Meesho Catalog Upload & Price-Tier Optimization',
      'Meesho Smart Promotions & Flash Deal Enrollment',
      'Tier-2 / Tier-3 Regional Demand Targeting',
      'Cross-Platform Inventory Balancing (Zero Overselling)',
      'RTO & Return Ratio Reduction Playbook',
      'Dedicated Senior Account Growth Manager + Graphic Support',
      '24/7 VIP WhatsApp Growth Channel & Call Escalation',
    ],
    deliverables: [
      '3-Channel Synchronized Listing Matrix',
      'Advanced Amazon Brand Story & Flipkart Brand Mall Alignment',
      'Meesho Price Competitiveness Analytics',
      'Bi-Weekly 1-on-1 Founder Growth Strategy Sessions',
      'Priority Design & Creative Retouching for Catalog',
    ],
  },
];

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<'marketplace_duo_3m' | 'marketplace_trio_3m'>('marketplace_trio_3m');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandName: '',
    gstNumber: '',
  });

  const activePlan = PLANS.find(p => p.id === selectedPlan)!;

  const handleOpenCheckout = (planId: 'marketplace_duo_3m' | 'marketplace_trio_3m') => {
    setSelectedPlan(planId);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handlePayUSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name, email, and 10-digit mobile number.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, '').slice(-10))) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/payu/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          customerName: formData.name.trim(),
          customerEmail: formData.email.trim(),
          customerPhone: formData.phone.trim(),
          brandName: formData.brandName.trim(),
          gstNumber: formData.gstNumber.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to initiate checkout.');
      }

      // If in simulated demo mode or test without live merchant credentials
      if (!result.isLiveConfigured) {
        // Automatically provide options: either post to PayU Test Sandbox OR complete instant simulated sandbox verification!
        // We will create a dynamic hidden HTML form to submit to PayU Test Gateway or handle smooth redirect
        const usePayUTestGateway = true;

        if (usePayUTestGateway) {
          // Create standard PayU hidden form and submit to PayU endpoint
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = result.actionUrl;

          Object.keys(result.payuParams).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = result.payuParams[key];
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
          return;
        }
      } else {
        // Live PayU Hosted Checkout redirect
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = result.actionUrl;

        Object.keys(result.payuParams).forEach((key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = result.payuParams[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const msg = err instanceof Error ? err.message : 'An error occurred while connecting to PayU.';
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="plans">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Transparent 3-Month Growth Subscriptions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Scale Across Marketplaces with <span className="glow-gradient-brand">Zero Manpower Hassle</span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Hire an entire team of e-commerce specialists for less than 15% of a single employee salary.
          Full cataloging, Amazon &amp; Flipkart ad management, inventory sync, and Meesho scaling.
        </p>

        {/* Quick Plan Selector Tabs */}
        <div className="pt-4 flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setSelectedPlan('marketplace_duo_3m')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedPlan === 'marketplace_duo_3m'
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>2 Platforms (Amazon + Flipkart)</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/15 text-white">₹12,000</span>
            </button>

            <button
              onClick={() => setSelectedPlan('marketplace_trio_3m')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedPlan === 'marketplace_trio_3m'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(139,92,246,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>3 Platforms (+ Meesho)</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-400 text-black font-extrabold">₹18,000</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-[#101432] to-[#090d21] border-2 border-purple-500/50 shadow-[0_0_50px_rgba(139,92,246,0.25)]'
                  : 'bg-[#090d21]/90 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-lg shadow-yellow-500/20'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  {plan.badge}
                </span>

                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  3 Months Commitment
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{plan.name}</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Platforms Included */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Managed Channels:</span>
                  {plan.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/[0.06] border border-white/10 text-white flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3 text-purple-400" />
                      {p}
                    </span>
                  ))}
                </div>

                {/* Price Display */}
                <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400">/ 3 Months</span>
                    <span className="text-xs text-slate-500 line-through ml-2">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      SAVE 50%
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300 mt-1.5 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-300" />
                    Only ₹{plan.monthlyEquivalent.toLocaleString('en-IN')}/month • Billed quarterly via PayU
                  </p>
                </div>

                {/* Feature List */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Included Growth Stack:</h4>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2.5">Key Deliverables:</h4>
                  <ul className="space-y-2">
                    {plan.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleOpenCheckout(plan.id)}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all transform active:scale-98 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_rgba(139,92,246,0.9)]'
                      : 'bg-white text-slate-950 hover:bg-slate-200 shadow-xl'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Subscribe for ₹{plan.price.toLocaleString('en-IN')} via PayU</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <p className="text-[11px] text-center text-slate-500 mt-2.5 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Secure Checkout • UPI, Credit/Debit Cards, NetBanking</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* PayU Trust & Guarantees Banner */}
      <div className="rounded-3xl border border-white/10 bg-[#070b1a]/90 backdrop-blur-xl p-6 sm:p-8 mb-16 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold">Payment Partner</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tight">Pay<span className="text-emerald-400">U</span></span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Verified</span>
            </div>
            <p className="text-xs text-slate-400">Official Payment Gateway with 256-bit Bank Grade SSL.</p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">All Indian Modes Accepted</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Google Pay, PhonePe, Paytm UPI, RuPay, Visa, Mastercard, NetBanking &amp; EMI.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Zero Password Sharing</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">We operate strictly via Amazon/Flipkart Child Delegated Accounts. Your credentials stay 100% private.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">GST Invoicing Available</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Input your GSTIN at checkout to receive automated B2B Tax Invoices with full input tax credit (ITC).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="rounded-3xl border border-white/10 bg-[#070a18] p-6 sm:p-10 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-white">Side-by-Side Plan Comparison</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Choose the exact level of marketplace firepower your catalog demands.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-4 font-bold text-white">Capabilities</th>
                <th className="py-3 px-4 font-bold text-purple-300">Marketplace Duo (₹12,000)</th>
                <th className="py-3 px-4 font-bold text-amber-300">Marketplace Trio (+ Meesho) (₹18,000)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Platforms Managed</td>
                <td className="py-3 px-4">Amazon India + Flipkart</td>
                <td className="py-3 px-4 text-white font-bold">Amazon + Flipkart + Meesho</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Subscription Duration</td>
                <td className="py-3 px-4">3 Months (Quarterly Sprint)</td>
                <td className="py-3 px-4">3 Months (Quarterly Sprint)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Catalog &amp; SEO Optimization</td>
                <td className="py-3 px-4">Up to 40 SKUs</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Up to 100 SKUs</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">PPC &amp; Sponsored Ad Scaling</td>
                <td className="py-3 px-4">Amazon SP + Flipkart PLA</td>
                <td className="py-3 px-4">Amazon SP/SB + Flipkart PLA/PCA</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Meesho Smart Promotions</td>
                <td className="py-3 px-4 text-slate-500">—</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Included (Price Tier Engine)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Return &amp; RTO Reduction</td>
                <td className="py-3 px-4">Standard</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Advanced Multi-Tier Audits</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Graphic Retouching Support</td>
                <td className="py-3 px-4">Standard Guidelines</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Dedicated Creative Assistance</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Strategic Review Calls</td>
                <td className="py-3 px-4">Monthly</td>
                <td className="py-3 px-4 text-purple-300 font-bold">Bi-Weekly 1-on-1 Sessions</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Support SLA</td>
                <td className="py-3 px-4">WhatsApp (9 AM - 7 PM)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">24/7 VIP Channel &amp; Escalation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Why 3 Months Explanation Card */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/20 via-[#070b1a] to-indigo-950/20 p-8 sm:p-10 mb-16 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-yellow-300" />
            <span>Why a 3-Month Commitment?</span>
          </div>
          <h3 className="text-2xl font-black text-white">The 90-Day Marketplace Compound Effect</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Marketplace algorithms like Amazon’s A9/COSMO and Flipkart’s rank engine do not reward flash-in-the-pan tweaks.
            It takes <strong>30 days</strong> to index keywords and build review velocity, <strong>60 days</strong> to harvest high-converting PPC search queries, and <strong>90 days</strong> to achieve compound organic search dominance.
            Our 3-month cadence is engineered to guarantee sustainable, profitable growth.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-2xl font-black text-white text-center">Frequently Asked Questions</h3>

        <div className="space-y-3">
          <details className="group rounded-2xl bg-white/[0.03] border border-white/10 p-5 transition-all open:bg-white/[0.05]">
            <summary className="font-bold text-sm text-white cursor-pointer flex items-center justify-between list-none">
              <span>Do I need to share my main seller portal password?</span>
              <ChevronRight className="w-4 h-4 text-purple-400 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              No, absolutely never. You will grant our team restricted &quot;Child Account / Delegated User&quot; permissions on Amazon Seller Central, Flipkart Seller Hub, or Meesho Supplier Panel. You maintain complete master ownership and financial withdrawal controls.
            </p>
          </details>

          <details className="group rounded-2xl bg-white/[0.03] border border-white/10 p-5 transition-all open:bg-white/[0.05]">
            <summary className="font-bold text-sm text-white cursor-pointer flex items-center justify-between list-none">
              <span>How soon does management begin after payment via PayU?</span>
              <ChevronRight className="w-4 h-4 text-purple-400 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Within 2 to 4 business hours of completing your PayU checkout, your assigned Senior Account Specialist contacts you directly via WhatsApp to set up child access permissions and initiate the preliminary catalog audit. Full operational management commences within 24–48 hours.
            </p>
          </details>

          <details className="group rounded-2xl bg-white/[0.03] border border-white/10 p-5 transition-all open:bg-white/[0.05]">
            <summary className="font-bold text-sm text-white cursor-pointer flex items-center justify-between list-none">
              <span>Can I claim GST input tax credit on the subscription?</span>
              <ChevronRight className="w-4 h-4 text-purple-400 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Yes! Enter your company’s GSTIN in the checkout form, and you will receive an official GST Tax Invoice enabling you to claim full 18% Input Tax Credit (ITC).
            </p>
          </details>

          <details className="group rounded-2xl bg-white/[0.03] border border-white/10 p-5 transition-all open:bg-white/[0.05]">
            <summary className="font-bold text-sm text-white cursor-pointer flex items-center justify-between list-none">
              <span>What if I want to try before paying?</span>
              <ChevronRight className="w-4 h-4 text-purple-400 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              You can claim our <Link href="/#free-trial" className="text-purple-400 underline font-semibold">1-Month Free Trial</Link> on our homepage to experience our speed and listing quality before subscribing to the 3-month package!
            </p>
          </details>
        </div>
      </div>

      {/* Checkout Modal with PayU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#090d22] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Secure Checkout
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Subscribe to {activePlan.name}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Price Summary Card */}
            <div className="my-5 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-purple-200">{activePlan.name} (3 Months)</div>
                <div className="text-[11px] text-slate-400">{activePlan.platforms.join(' + ')}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-white">₹{activePlan.price.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-emerald-400 font-semibold">All-Inclusive</div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handlePayUSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@brand.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp / Phone <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Brand / Store Name (Optional)
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    placeholder="e.g. PureAyur Organics"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  GST Number (Optional, for B2B Tax Invoice)
                </label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                  placeholder="22AAAAA0000A1Z5"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* PayU Notice */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Processed securely via <strong>PayU Payment Gateway</strong></span>
                </span>
                <span className="font-bold text-white">256-Bit SSL</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-black text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting to PayU Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{activePlan.price.toLocaleString('en-IN')} via PayU</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                <Link href="/terms" target="_blank" className="hover:underline">Terms</Link>
                <span>•</span>
                <Link href="/privacy" target="_blank" className="hover:underline">Privacy</Link>
                <span>•</span>
                <Link href="/refund-policy" target="_blank" className="hover:underline">Refund Policy</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
