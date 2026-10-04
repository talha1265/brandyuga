'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient Glowing Blobs */}
      <div className="glow-blob glow-primary w-96 h-96 top-10 right-[-5%]"></div>
      <div className="glow-blob glow-cyan w-80 h-80 top-1/3 left-[-8%]"></div>
      <div className="glow-blob glow-amber w-72 h-72 bottom-10 right-[20%]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Full-Stack E-Commerce & Growth Agency</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.16]">
              We Build Brands That <br className="hidden sm:inline" />
              <span className="glow-gradient-brand">Dominate Online</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From profitable product research to D2C sales funnels, high-converting Amazon & Flipkart operations, cinematic product shoots, and aggressive PPC advertising — we provide end-to-end execution so you scale without limits.
            </p>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1 text-[11px] sm:text-xs text-slate-300 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">Product Research</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">D2C Web Stores</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Photo & Video Shoots</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Marketplace Scaling</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">High-ROAS PPC</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Profit Analytics</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
              <Link
                href="#free-trial"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white glow-btn-primary group"
              >
                <span>Claim 1 Month Free Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 backdrop-blur-md transition-all"
              >
                <span>View Portfolio & Work</span>
              </Link>
            </div>

            {/* Trust Badges - Fully Responsive Wrapping */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-6 pt-3 text-[11px] sm:text-xs text-slate-400">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] sm:bg-transparent border border-white/5 sm:border-0 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Risk Trial</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] sm:bg-transparent border border-white/5 sm:border-0 shrink-0">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>WhatsApp Response in 5m</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] sm:bg-transparent border border-white/5 sm:border-0 shrink-0">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>100% Focused on Profit</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column (3D Rocket + Floating Cards) */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
            {/* Visual Glass backdrop */}
            <div className="relative w-full max-w-[300px] sm:max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-purple-900/30 via-indigo-900/10 to-transparent p-1 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl">
              
              {/* Radial glow orb inside */}
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,transparent_70%)]"></div>

              {/* 3D Floating Rocket Image */}
              <div className="relative z-10 w-56 h-56 sm:w-80 sm:h-80 floating-rocket flex items-center justify-center">
                <Image
                  src="/assets/images/rocket-3d.svg"
                  alt="Launch Your Brand"
                  width={320}
                  height={320}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(139,92,246,0.5)]"
                  priority
                />
              </div>

              {/* Floating Metric Card 1 - Kept within bounds on mobile */}
              <div className="absolute -top-3 left-2 sm:-top-4 sm:-left-6 bg-[#0d132b]/95 border border-purple-500/30 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm sm:text-base">
                  🚀
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Target Marketplace</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Amazon & Flipkart Ready</div>
                </div>
              </div>

              {/* Floating Metric Card 2 - Kept within bounds on mobile */}
              <div className="absolute -bottom-3 right-2 sm:-bottom-5 sm:-right-6 bg-[#0d132b]/95 border border-emerald-500/30 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-pulse" style={{ animationDuration: '3.5s' }}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm sm:text-base">
                  📈
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Proven ROAS</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-300">4.5x Average Return</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
