'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  SearchCheck, 
  Code2, 
  Camera, 
  Clapperboard, 
  Store, 
  TrendingUp, 
  LineChart, 
  Palette, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { ServiceItem } from '@/types';

interface Props {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'creative' | 'marketing' | 'operations' | 'legal'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    SearchCheck: <SearchCheck className="w-6 h-6 text-purple-400" />,
    Code2: <Code2 className="w-6 h-6 text-cyan-400" />,
    Camera: <Camera className="w-6 h-6 text-emerald-400" />,
    Clapperboard: <Clapperboard className="w-6 h-6 text-amber-400" />,
    Store: <Store className="w-6 h-6 text-indigo-400" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-pink-400" />,
    LineChart: <LineChart className="w-6 h-6 text-blue-400" />,
    Palette: <Palette className="w-6 h-6 text-violet-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal-400" />,
  };

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  const getWhatsAppLink = (serviceTitle: string) => {
    const text = encodeURIComponent(`Hi BrandYuga Team! I want to inquire about your service: *${serviceTitle}*. Can you please share details and free consultation?`);
    return `https://wa.me/918853066278?text=${text}`;
  };

  return (
    <section id="services" className="relative py-24 z-10">
      {/* Background ambient lighting */}
      <div className="glow-blob glow-primary w-96 h-96 top-20 left-[-10%] opacity-20"></div>
      <div className="glow-blob glow-cyan w-96 h-96 bottom-20 right-[-10%] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Complete 360° E-Commerce Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Services Built to <span className="glow-gradient-brand">Scale Your Brand</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From discovering high-margin products and building custom D2C stores to marketplace operations and cinematic video shoots — we execute everything with proven results.
          </p>

          {/* Filter Categories Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'core', label: 'Core E-Com & Web' },
              { id: 'creative', label: 'Shoots & Creatives' },
              { id: 'operations', label: 'Marketplace & Ops' },
              { id: 'marketing', label: 'PPC & Ads' },
              { id: 'legal', label: 'Legal & Identity' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400/50'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex md:hidden justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300 font-medium">
            <span>← Swipe horizontally to see all services →</span>
          </div>
        </div>
        <div className="mobile-card-scroll md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const icon = iconMap[service.icon] || <Sparkles className="w-6 h-6 text-purple-400" />;

            return (
              <div
                key={service.id}
                className="mobile-card-item glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-purple-500/40 relative group overflow-hidden"
              >
                {/* Top Glowing Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  {/* Top Row: Icon & Hindi Tagline Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform shadow-inner">
                      {icon}
                    </div>

                    {service.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Hindi Tagline Highlighting User Requirement */}
                  {service.hindi_tagline && (
                    <div className="inline-block mb-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      ✦ {service.hindi_tagline}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features Bullet List */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 group/btn"
                  >
                    <span>View Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={getWhatsAppLink(service.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all flex items-center gap-1.5 text-xs font-medium"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-950/40 to-slate-900/50 border border-purple-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Want a Custom End-to-End Package?
            </h3>
            <p className="text-slate-300 text-sm">
              Combine Product Research + D2C Store + Marketplace Ads into a tailored roadmap.
            </p>
          </div>
          <Link
            href="#free-trial"
            className="px-6 py-3 rounded-full text-sm font-semibold text-white glow-btn-primary whitespace-nowrap shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Claim Free 1-Month Trial</span>
          </Link>
        </div>

      </div>

      {/* Service Modal Popup */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0c1022] border border-purple-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            {/* Hindi Badge */}
            {selectedService.hindi_tagline && (
              <div className="inline-block mb-3 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                ✦ {selectedService.hindi_tagline}
              </div>
            )}

            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedService.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedService.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                Key Scope & Features Included:
              </h4>
              <div className="space-y-2">
                {selectedService.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            {selectedService.deliverables && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                  What You Receive (Deliverables):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.deliverables.map((d, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-slate-300">
                      📦 {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
              <a
                href={getWhatsAppLink(selectedService.title)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 text-sm shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>

              <Link
                href="#free-trial"
                onClick={() => setSelectedService(null)}
                className="py-3 px-6 rounded-xl font-semibold text-white glow-btn-primary text-center text-sm"
              >
                Claim 1 Month Free
              </Link>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
