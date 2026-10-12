'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Sparkles, 
  Shield, 
  ArrowUpRight, 
  MessageCircle,
  Home,
  Layers,
  Briefcase,
  BookOpen,
  Gift,
  Mail,
  Phone,
  CreditCard
} from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent screen overflow and dual scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Layers },
    { name: 'Plans', href: '/subscription', icon: CreditCard },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Blogs', href: '/blogs', icon: BookOpen },
    { name: 'Referral', href: '/referral', icon: Gift },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-[#060813]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-[#060813]/90 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Glowing Star Emblem */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#0a0e20] rounded-[10px] flex items-center justify-center p-1 sm:p-1.5">
                <Image
                  src="/assets/images/logo-icon.png"
                  alt="BrandYuga Star Emblem"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-purple-300 transition-colors flex items-center gap-0.5">
                Brand<span className="text-purple-400 font-extrabold">Yuga</span>
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-bold -mt-0.5">
                E-Commerce & Scale
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-lg shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-white bg-purple-600/35 border border-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              title="Admin Dashboard"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-purple-300 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 hover:bg-purple-950/20 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/#free-trial"
              className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>1 Month Free</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-slate-200 hover:text-white transition-all active:scale-95"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-purple-300" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Full Dropdown Menu - Perfectly anchored, zero overflow */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 w-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-[#070a18]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl px-4 pt-3 pb-8 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Nav Grid */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-purple-600/30 border border-purple-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'bg-white/[0.03] border border-white/5 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className="w-4 h-4 shrink-0 text-purple-400" />
                      <span className="truncate">{link.name}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* Free Trial CTA Banner */}
            <Link
              href="/#free-trial"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 shadow-[0_0_25px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 shrink-0 animate-pulse" />
              <span>Claim 1 Month Free Service</span>
            </Link>

            {/* Quick Action Buttons & Links - Responsive Grid to prevent text overflow */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://wa.me/918853066278"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">WhatsApp: +91 88530 66278</span>
                </a>

                <a
                  href="tel:+918853066278"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-medium hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Direct Call: +91 88530 66278</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-1 px-1 text-xs">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-purple-300 py-1 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Operations Portal</span>
                </Link>

                <span className="text-[11px] text-slate-500">
                  BrandYuga Agency v2.6
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay when mobile menu is open for easy dismissal */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}
    </>
  );
}
