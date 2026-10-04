'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Check, Send, MessageCircle, AlertCircle } from 'lucide-react';

export default function FreeTrialSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'Marketplace Management — Amazon',
    'Marketplace Management — Flipkart',
    'Marketplace Management — Meesho & All Platforms',
    'Product Research & Opportunity Analysis',
    'D2C Website & E-Commerce Development',
    'Photo Editing & Product Photography',
    'Video Editing & High-CTR Reels Shoots',
    'PPC & Performance Marketing (Amazon/Meta Ads)',
    'Data Analytics & Profit Intelligence',
    'Brand Identity & Packaging Design',
    'Legal Consulting & Trademark Registration',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.phone || !formData.service) {
      setErrorMsg('Please fill in your name, phone number, and preferred service.');
      return;
    }

    setLoading(true);

    try {
      // 1. Save lead to PostgreSQL Neon database
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'trial',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          details: 'Claimed 1-Month Free Trial Offer',
        }),
      });

      if (!res.ok) {
        console.warn('API lead save response not OK, continuing to WhatsApp');
      }

      // 2. Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#06B6D4', '#F59E0B', '#10B981'],
      });

      setSubmitted(true);

      // 3. Compose WhatsApp message and open in new tab
      const message = `🎉 *FREE 1-MONTH TRIAL REQUEST*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email || 'N/A'}
🎯 *Service:* ${formData.service}
━━━━━━━━━━━━━━━━━━━━
📌 Sent from BrandYuga Platform
🌐 www.brandyuga.in`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918853066278?text=${encodedMessage}`;

      // Open WhatsApp window
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);

    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('There was an error saving your request, but you can still message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="free-trial" className="relative py-24 z-10">
      {/* Background Glow */}
      <div className="glow-blob glow-primary w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-5 sm:p-12 lg:p-16 border border-purple-500/30 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Zero Risk Guarantee</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Get 1 Month <span className="glow-gradient-gold">Free Services!</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                Experience our high-performance e-commerce marketplace management, D2C development, or product shoot services absolutely free for your first month. No upfront lock-in, no hidden charges — purely focused on measurable growth.
              </p>

              <div className="space-y-3 pt-1 sm:pt-2">
                {[
                  'Full seller platform setup & catalog optimization',
                  'Dedicated senior account manager assigned to your brand',
                  'Product listing & A+ infographics creative audit',
                  'Performance tracking dashboard & weekly growth audits',
                  'No credit card or payment commitment required',
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-400 flex items-center gap-3">
                <span className="text-xl sm:text-2xl shrink-0">⚡</span>
                <div>
                  <span className="font-semibold text-white">Instant WhatsApp Confirmation:</span> Once you submit, our senior strategist connects with you directly on WhatsApp to onboard your brand within 2 hours.
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0a0e20]/90 border border-purple-500/40 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl relative">
                
                {submitted ? (
                  <div className="text-center py-8 space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 text-2xl">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Request Submitted Successfully!
                    </h3>
                    <p className="text-sm text-slate-300">
                      Thank you <strong className="text-white">{formData.name}</strong>. Your 1-Month Free Trial inquiry has been logged in our system. A WhatsApp window should have opened automatically.
                    </p>
                    <a
                      href={`https://wa.me/918853066278?text=${encodeURIComponent(
                        `Hi BrandYuga! I am ${formData.name} and I just claimed the 1-Month Free Trial for ${formData.service}. Let's get started!`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp Chat Directly</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Claim Your Free Month
                      </h3>
                      <p className="text-xs text-slate-400">
                        Fill this form & we will reach out on WhatsApp instantly.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Talha Khan"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@brand.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Service You Are Interested In *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0c1022] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                      >
                        <option value="" disabled>Select Core Service</option>
                        {servicesList.map((srv, idx) => (
                          <option key={idx} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4" />
                          <span>Claim Free Month via WhatsApp</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-slate-400 pt-1">
                      🔒 Your details are 100% private. We never share your data.
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
