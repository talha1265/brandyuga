'use client';

import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface Props {
  label?: string;
  className?: string;
}

export default function SwipeHint({ label = "Swipe to explore cards", className = "" }: Props) {
  return (
    <div className={`flex md:hidden items-center justify-center gap-1.5 py-1.5 px-3 mx-auto w-fit rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-purple-300 font-medium tracking-wide animate-pulse mb-3 ${className}`}>
      <ArrowLeftRight className="w-3 h-3 text-cyan-400" />
      <span>{label}</span>
      <span className="text-[10px] text-slate-400">⇄</span>
    </div>
  );
}
