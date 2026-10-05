'use client';

import React from 'react';
import { Rocket, HeartHandshake, IndianRupee, Layers } from 'lucide-react';

export default function StatsBanner() {
  const stats = [
    {
      value: '30+',
      label: 'Startups Launched',
      sublabel: 'From zero to profitable brand',
      icon: Rocket,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400',
    },
    {
      value: '100%',
      label: 'Client Satisfaction',
      sublabel: 'Dedicated account managers',
      icon: HeartHandshake,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
    },
    {
      value: '₹15Cr+',
      label: 'GMV Scaled',
      sublabel: 'Generated across marketplaces',
      icon: IndianRupee,
      color: 'from-amber-500 to-yellow-500',
      textColor: 'text-amber-400',
    },
    {
      value: '360°',
      label: 'Digital Solutions',
      sublabel: 'Product, Web, Shoots & Ads',
      icon: Layers,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-400',
    },
  ];

  return (
    <section className="relative z-10 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="flex md:hidden justify-center mb-2">
          <div className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] text-purple-300 font-medium">
            <span>← Swipe stats →</span>
          </div>
        </div>
        <div className="mobile-card-scroll md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="mobile-card-item-compact flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/20 transition-all group shrink-0"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} p-[1px] mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <div className="w-full h-full bg-[#0c1022] rounded-[11px] flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
