'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Shield, 
  ShieldCheck,
  Lock, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Zap,
  Globe2
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#03050c] border-t border-white/10 pt-16 pb-12 z-10 text-slate-400 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Growth Callout Bar */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-950/30 via-white/[0.02] to-cyan-950/30 p-6 sm:p-8 mb-14 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Quarterly Growth Sprint 2026</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Scale Your Brand on Amazon, Flipkart &amp; Meesho
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Ready to delegate your marketplace cataloging and ads? Subscribe for 3 months starting at ₹12,000 with secure checkout powered by PayU.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/subscription"
                className="px-5 py-3 rounded-xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center gap-2"
              >
                <span>View 3-Month Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#free-trial"
                className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
              >
                Claim 1 Month Free
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-[#0a0e20] rounded-[14px] flex items-center justify-center p-1.5">
                  <Image
                    src="/assets/images/logo-icon.png"
                    alt="BrandYuga"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  Brand<span className="text-purple-400">Yuga</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold -mt-0.5">
                  E-Commerce &amp; Marketplace Scale
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              India’s full-stack e-commerce growth powerhouse. We manage daily marketplace operations, launch high-speed D2C stores, conduct viral video shoots, and scale PPC ad revenue across Amazon, Flipkart, and Meesho.
            </p>

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/918853066278"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp Growth Desk: +91 88530 66278</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.instagram.com/brandyuga"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
                title="Instagram"
              >
                IG
              </a>
              <a
                href="https://www.linkedin.com/company/brandyuga"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
                title="LinkedIn"
              >
                IN
              </a>
              <a
                href="https://twitter.com/brandyuga"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
                title="X / Twitter"
              >
                𝕏
              </a>
              <a
                href="mailto:info@brandyuga.in"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
                title="Direct Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Subscriptions & Pricing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-purple-400" />
              <span>Subscriptions</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/subscription" className="hover:text-purple-300 transition-colors flex items-center justify-between group">
                  <span>Marketplace Duo (₹12k)</span>
                  <span className="text-[10px] text-purple-400 group-hover:translate-x-0.5 transition-transform">2 Ch</span>
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="hover:text-purple-300 transition-colors flex items-center justify-between group">
                  <span className="text-white font-semibold">Marketplace Trio (₹18k)</span>
                  <span className="text-[10px] text-amber-400 group-hover:translate-x-0.5 transition-transform">+Meesho</span>
                </Link>
              </li>
              <li>
                <Link href="/#free-trial" className="hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>1-Month Free Trial</span>
                  <span className="text-[10px] text-emerald-400 font-bold">FREE</span>
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-purple-300 transition-colors">
                  Growth ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/subscription/status" className="hover:text-purple-300 transition-colors">
                  Payment Status &amp; Receipt
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Product Research &amp; Validation</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Amazon &amp; Flipkart Account Ops</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Meesho Catalog &amp; Promotions</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">D2C Next.js / Shopify Stores</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Commercial Studio Shoots</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">PPC Performance Advertising</Link></li>
            </ul>
          </div>

          {/* Column 4: Company & Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Company</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-purple-300 transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-purple-300 transition-colors">Client Projects &amp; Case Studies</Link></li>
              <li><Link href="/blogs" className="hover:text-purple-300 transition-colors">Blogs &amp; Insights</Link></li>
              <li><Link href="/referral" className="hover:text-purple-300 transition-colors text-purple-300 font-semibold">Referral Bonus (Earn 10%)</Link></li>
              <li><Link href="/contact" className="hover:text-purple-300 transition-colors">Contact Growth Desk</Link></li>
            </ul>
          </div>

          {/* Column 5: Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trust &amp; Legal</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/terms" className="hover:text-purple-300 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-purple-300 transition-colors">Refund &amp; Cancellation Policy</Link></li>
              <li className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </li>
              <li className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>PCI-DSS Level 1 Safe</span>
              </li>
            </ul>
          </div>

        </div>

        {/* PayU Payment Methods Trust Row */}
        <div className="py-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
              <span className="font-extrabold text-white tracking-tight">Pay<span className="text-emerald-400">U</span></span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Official Gateway
              </span>
            </div>
            <span className="text-slate-400 text-xs">Accepted Payment Modes:</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300">
                UPI (GPay / PhonePe / Paytm)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300">
                Debit / Credit Cards
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300">
                RuPay
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300">
                NetBanking (50+ Banks)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300">
                EMI Options
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-semibold">Verified Merchant</span>
            </div>
            <div className="text-slate-500">•</div>
            <div className="text-slate-400">
              Instant Activation
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 BrandYuga Technologies Pvt. Ltd. All rights reserved. Pan-India E-Commerce Enablement Agency.
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="hover:text-slate-300 flex items-center gap-1.5 transition-colors py-1 px-2.5 rounded-lg hover:bg-white/[0.05]"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Operations</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-slate-300 flex items-center gap-1.5 transition-colors py-1 px-2.5 rounded-lg hover:bg-white/[0.05]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
