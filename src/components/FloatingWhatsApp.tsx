'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Claim 1 Month Free Service');

  const topics = [
    'Claim 1 Month Free Service',
    'Amazon / Flipkart Account Management',
    'Product Research (Kya sell karein)',
    'D2C Website Development',
    'Product Photography & Reels Shoot',
    'PPC Ads & ROAS Improvement',
  ];

  const handleSend = () => {
    const text = encodeURIComponent(`Hi BrandYuga Team! I am interested in: *${selectedTopic}*. Could you please provide consultation and next steps?`);
    window.open(`https://wa.me/918853066278?text=${text}`, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick-reply dialog popup */}
      {open && (
        <div className="mb-3 w-80 sm:w-96 bg-[#0a0e22] border border-emerald-500/40 rounded-3xl p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>BrandYuga WhatsApp</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="text-[10px] text-slate-400">Typical reply: &lt; 5 mins</div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-slate-300">
              Select what you want to discuss with our lead strategist:
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {topics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                    selectedTopic === t
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] border border-white/5'
                  }`}
                >
                  ✦ {t}
                </button>
              ))}
            </div>

            <button
              onClick={handleSend}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Conversation</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transition-all transform hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />

        {/* Pulsing ping indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#060813]"></span>
        </span>
      </button>
    </div>
  );
}
