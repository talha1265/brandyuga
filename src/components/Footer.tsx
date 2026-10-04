'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUp, Shield } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060e] border-t border-white/10 pt-16 pb-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-[#0a0e20] rounded-[14px] flex items-center justify-center p-1.5">
                  <Image
                    src="/assets/images/logo-icon.png"
                    alt="BrandYuga"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  Brand<span className="text-purple-400">Yuga</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold -mt-0.5">
                  E-Commerce & Scale
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Empowering startups, direct-to-consumer innovators, and retail enterprises with end-to-end product research, D2C web stores, marketplace scaling, creative shoots, and profit intelligence.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/brandyuga"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
                title="Instagram"
              >
                IG
              </a>
              <a
                href="https://www.linkedin.com/company/brandyuga"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
                title="LinkedIn"
              >
                IN
              </a>
              <a
                href="https://twitter.com/brandyuga"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all text-xs font-bold"
                title="X / Twitter"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-purple-300 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Services</Link></li>
              <li><Link href="/projects" className="hover:text-purple-300 transition-colors">Client Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-purple-300 transition-colors">Blogs & Insights</Link></li>
              <li><Link href="/referral" className="hover:text-purple-300 transition-colors">Referral (10% Bonus)</Link></li>
              <li><Link href="/contact" className="hover:text-purple-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Capabilities</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Product Research</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">D2C Web Stores</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Photo & Video Shoots</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Amazon / Flipkart Ops</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">PPC Performance Ads</Link></li>
              <li><Link href="/services" className="hover:text-purple-300 transition-colors">Profit Analytics</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Desk</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>info@brandyuga.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 88530 66278</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+91 93366 10767</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Pan-India Presence</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 BrandYuga. All rights reserved. Built with Next.js & Neon PostgreSQL.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-slate-300 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-slate-300 flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
