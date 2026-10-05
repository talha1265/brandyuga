'use client';

import React from 'react';
import { Package, BarChart3, Target, TrendingUp, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EcommerceSection() {
  const platforms = [
    {
      name: 'Amazon India & Global',
      badge: 'BSR Leader',
      color: 'from-amber-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      description:
        'Complete Amazon seller central account management — A+ Enhanced Brand Content, FBA inventory optimization, negative keyword mining, and Brand Registry defense.',
      perks: [
        'A+ Content & Brand Story modules',
        'FBA storage limits & restocking planning',
        'Sponsored Products, Brands & Video ads',
        'Hijacker removal & brand protection',
      ],
    },
    {
      name: 'Flipkart & Shopsy',
      badge: 'Big Billion Days Prep',
      color: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-cyan-400',
      description:
        'Strategic Flipkart management with smart tier pricing, PLA ad optimization, catalog enhancement, and dedicated festival campaign planning for maximum sales volume.',
      perks: [
        'Assured Badge qualification support',
        'PLA & PCA ad optimization algorithms',
        'Smart pricing & competitive buy-box tracking',
        'Mega Sale Event stocking & deal approvals',
      ],
    },
    {
      name: 'Meesho & Quick Commerce',
      badge: 'High Velocity',
      color: 'from-pink-500/20 via-purple-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      iconColor: 'text-pink-400',
      description:
        'Full Meesho and quick-commerce account orchestration — hyper-optimized cataloging, 0% commission strategies, order fulfillment support, and viral tier-2/3 audience targeting.',
      perks: [
        'Lowest price recommendation algorithms',
        'Packaging & fast dispatch workflows',
        'Direct social commerce integration',
        'Rapid SKU onboarding & variations',
      ],
    },
  ];

  const features = [
    {
      icon: Package,
      title: 'Product Listing SEO',
      desc: 'High-converting titles, bullet points, backend keywords, and A+ graphics that index on page 1.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      icon: BarChart3,
      title: 'Inventory & FBA Ops',
      desc: 'Real-time stock forecasting to prevent painful stockouts and avoid dead storage fees.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
    {
      icon: Target,
      title: 'Aggressive PPC & Ads',
      desc: 'Laser-focused ad architectures yielding high sales velocity while keeping ACoS strictly controlled.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Profit & Loss Analytics',
      desc: 'Weekly executive dashboards tracking actual net margins after commissions, shipping, and ad fees.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <section id="ecommerce" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            🚀 Marketplace Dominance
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            E-Commerce Platform <span className="glow-gradient-brand">Management</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We manage and scale your seller accounts across India’s leading marketplaces. From day-to-day catalog maintenance to multi-million festive ad campaigns — we handle every operational headache.
          </p>
        </div>

        {/* 3 Main Marketplace Cards */}
        <div className="flex md:hidden justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300 font-medium">
            <span>← Swipe horizontally to explore platforms →</span>
          </div>
        </div>
        <div className="mobile-card-scroll md:grid-cols-3 gap-8 mb-16">
          {platforms.map((p, idx) => (
            <div
              key={idx}
              className={`mobile-card-item glass-panel rounded-3xl p-7 border ${p.borderColor} relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300 shadow-xl`}
            >
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${p.color} rounded-bl-full pointer-events-none opacity-40`}></div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/10">
                    {p.badge}
                  </span>
                  <span className={`text-2xl font-black ${p.iconColor}`}>0{idx + 1}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {p.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="#free-trial"
                className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center gap-2 group-hover:border-purple-500/40 transition-all"
              >
                <span>Scale on {p.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="flex md:hidden justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300 font-medium">
            <span>← Swipe horizontally to view capabilities →</span>
          </div>
        </div>
        <div className="mobile-card-scroll md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="mobile-card-item-compact md:mobile-card-item glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
