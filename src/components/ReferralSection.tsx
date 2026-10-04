'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, IndianRupee, MessageCircle, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function ReferralSection() {
  const [formData, setFormData] = useState({
    referrer_name: '',
    referrer_phone: '',
    client_name: '',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.referrer_name || !formData.referrer_phone || !formData.client_name) {
      setErrorMsg('Please enter your details and the referred client name.');
      return;
    }

    setLoading(true);

    try {
      // 1. Save lead to PostgreSQL Neon database
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'referral',
          name: formData.client_name,
          phone: 'N/A (Referral Lead)',
          email: '',
          referrer_name: formData.referrer_name,
          referrer_phone: formData.referrer_phone,
          details: formData.details,
          service: '10% Referral Commission Submission',
        }),
      });

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#8B5CF6', '#10B981'],
      });

      setSubmitted(true);

      // 2. Open WhatsApp with prefilled message
      const msg = `🤝 *NEW CLIENT REFERRAL SUBMISSION (10% COMMISSION)*
━━━━━━━━━━━━━━━━━━━━
👤 *Referrer Name:* ${formData.referrer_name}
📱 *Referrer Phone:* ${formData.referrer_phone}
🏢 *Referred Client/Brand:* ${formData.client_name}
📝 *Project Needs:* ${formData.details || 'To be discussed'}
━━━━━━━━━━━━━━━━━━━━
📌 BrandYuga Referral Program
🌐 www.brandyuga.in`;

      setTimeout(() => {
        window.open(`https://wa.me/918853066278?text=${encodeURIComponent(msg)}`, '_blank');
      }, 500);

    } catch (err) {
      console.error('Referral error:', err);
      setErrorMsg('Error submitting referral. You can reach out directly via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="referral" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-purple-500/30 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Description & Commission Calculator */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                <span>BrandYuga Partner Network</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Earn <span className="glow-gradient-gold">10% Referral Commission</span> on Every Deal
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Know a founder launching a D2C brand, an Amazon seller struggling with PPC ad costs, or a business needing a high-speed website? Introduce them to BrandYuga. When the deal closes, we transfer <strong>10% of the project value</strong> directly to you.
              </p>

              {/* Commission Example Table */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs">
                <div className="font-semibold text-white flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                  <span>How Payouts Work:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div>₹50,000 Project</div>
                    <div className="text-sm font-bold text-amber-400 mt-1">₹5,000 Cash Payout</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div>₹2,00,000 Retainer</div>
                    <div className="text-sm font-bold text-emerald-400 mt-1">₹20,000 Cash Payout</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Payouts dispatched via UPI / Bank Transfer within 48 hours of project sign-off.</span>
              </div>
            </div>

            {/* Right Column: Referral Form */}
            <div className="lg:col-span-6">
              <div className="bg-[#0a0e20]/95 border border-purple-500/30 rounded-3xl p-7 sm:p-8 backdrop-blur-xl shadow-2xl">
                
                {submitted ? (
                  <div className="text-center py-8 space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 text-2xl">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Referral Logged Successfully!
                    </h3>
                    <p className="text-sm text-slate-300">
                      Thank you <strong className="text-white">{formData.referrer_name}</strong>. We have saved the referral for <strong className="text-white">{formData.client_name}</strong>. A WhatsApp message has been generated to verify your payout details.
                    </p>
                    <a
                      href="https://wa.me/918853066278"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat with Referral Desk</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Submit a Referral
                      </h3>
                      <p className="text-xs text-slate-400">
                        Fill in your info & the client details to lock in your 10% commission.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Your Name (Referrer) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.referrer_name}
                          onChange={(e) => setFormData({ ...formData, referrer_name: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Your Phone / UPI Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.referrer_phone}
                          onChange={(e) => setFormData({ ...formData, referrer_phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Client Name / Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        placeholder="Who are you referring?"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Client / Project Details & Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="What service do they need? (e.g. Amazon ads, D2C website, video shoot...)"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Logging Referral...</span>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4" />
                          <span>Submit via WhatsApp & Lock Commission</span>
                        </>
                      )}
                    </button>
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
