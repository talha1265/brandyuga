'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: 'What services does BrandYuga provide?',
      answer:
        'BrandYuga provides complete 360° e-commerce solutions: Winning Product Research, Custom D2C Storefronts (Next.js & Shopify), Studio Photography & Cinematic Video Shoots, Amazon & Flipkart Marketplace Management, and PPC Ad Scaling.',
    },
    {
      question: 'How does BrandYuga scale Amazon and Flipkart seller accounts?',
      answer:
        'We optimize keyword indexing, craft high-converting A+ Enhanced Brand Content, plan FBA inventory replenishment, eliminate unauthorized hijackers, and execute algorithmically tuned PPC advertising campaigns to dramatically improve BSR ranking.',
    },
    {
      question: 'How does the BrandYuga 1-Month Free Trial work?',
      answer:
        'You get 1 full month of marketplace management, catalog enhancement, or strategy execution without upfront fees or credit card requirements. If you love the measurable growth, we transition into an ongoing growth partnership.',
    },
    {
      question: 'Does BrandYuga build custom D2C e-commerce websites?',
      answer:
        'Yes! We build high-speed, SEO-optimized custom D2C storefronts using Next.js and Shopify, integrated with Indian payment gateways (Razorpay, Cashfree), COD fraud prevention, and automated shipping workflows.',
    },
    {
      question: 'How does the BrandYuga 10% referral program work?',
      answer:
        'When you refer a client or founder needing marketplace management, product shoots, or website development, you receive 10% of the total closed contract value paid straight to your bank or UPI within 48 hours of project sign-off.',
    },
  ];

  return (
    <section id="faq" className="relative py-20 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? <span className="glow-gradient-brand">We Have Answers</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Everything you need to know about our free trial, marketplace management, and revenue growth systems.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 text-white hover:text-purple-300 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-purple-600/30 text-purple-300' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Small Bottom Helper */}
        <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <span>Still have questions?</span>
          <a
            href="https://wa.me/918853066278"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp directly</span>
          </a>
        </div>
      </div>
    </section>
  );
}
