'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function GrowthCalculator() {
  const [currentRevenue, setCurrentRevenue] = useState<number>(300000); // 3 Lakhs

  // Multiplier formulas based on multi-channel scaling (D2C + Marketplaces + Video Ads)
  const projectedMarketplace = Math.round(currentRevenue * 2.8);
  const projectedD2C = Math.round(currentRevenue * 1.6);
  const totalProjected = projectedMarketplace + projectedD2C;
  const growthMultiplier = ((totalProjected / currentRevenue) || 1).toFixed(1);
  const projectedMonthlyNetProfit = Math.round(totalProjected * 0.22); // ~22% net margin

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-5 sm:p-12 rounded-3xl border border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive ROI Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Estimate Your <span className="glow-gradient-gold">6-Month Growth Potential</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              See what happens when you combine winning product research with optimized D2C storefronts, Amazon/Flipkart management, and high-CTR video shoots.
            </p>
          </div>

          {/* Slider input */}
          <div className="mb-8 sm:mb-10 max-w-xl mx-auto text-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
              <span>Your Current Monthly Sales:</span>
              <span className="text-lg sm:text-2xl font-black text-purple-300 bg-purple-500/10 px-3.5 py-1 rounded-xl border border-purple-500/30">
                {formatINR(currentRevenue)}/mo
              </span>
            </div>

            <input
              type="range"
              min={50000}
              max={2500000}
              step={25000}
              value={currentRevenue}
              onChange={(e) => setCurrentRevenue(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none"
            />

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹50K</span>
              <span>₹5 Lakhs</span>
              <span>₹10 Lakhs</span>
              <span>₹25 Lakhs+</span>
            </div>
          </div>

          {/* Result Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xs text-slate-400 mb-1">Projected Marketplace Revenue</div>
              <div className="text-xl sm:text-2xl font-bold text-amber-400">
                {formatINR(projectedMarketplace)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Amazon + Flipkart Optimization</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xs text-slate-400 mb-1">Projected D2C Web Revenue</div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                {formatINR(projectedD2C)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Direct Brand Storefront</div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-tr from-purple-900/40 to-indigo-900/40 border border-purple-500/40 text-center relative overflow-hidden">
              <div className="text-xs text-purple-300 font-semibold mb-1">Total Monthly Sales Target</div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatINR(totalProjected)}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-1">
                ✦ {growthMultiplier}x Revenue Expansion
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes estimated ~{formatINR(projectedMonthlyNetProfit)} in monthly net profit margin.</span>
            </div>

            <Link
              href="#free-trial"
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-white glow-btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <span>Build My 6-Month Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
