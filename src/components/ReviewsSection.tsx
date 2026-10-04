'use client';

import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { initialTestimonials } from '@/lib/initialData';

export default function ReviewsSection() {
  return (
    <section className="relative py-24 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            ★ Real Client Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Client Stories & <span className="glow-gradient-brand">Trust</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hear directly from founders and e-commerce brand owners who scaled their revenue and customer acquisition with BrandYuga.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialTestimonials.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-purple-500/30 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Top Quote & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-purple-400/40" />
                </div>

                {/* Highlight Badge */}
                {item.highlight && (
                  <div className="text-xs font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20 mb-3 inline-block">
                    &ldquo;{item.highlight}&rdquo;
                  </div>
                )}

                {/* Main Quote */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md text-sm">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
