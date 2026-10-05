'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { ProjectItem } from '@/types';

interface Props {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: Props) {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'E-Commerce', label: 'E-Commerce' },
    { id: '3D Graphics', label: '3D & Marketplace' },
    { id: 'Healthcare', label: 'Healthcare' },
    { id: 'IT Consultancy', label: 'Tech & B2B' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Proven Track Record</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Selected <span className="glow-gradient-brand">Client Projects</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Explore how we have engineered digital stores, consumer brands, and multi-channel marketplace experiences.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === c.id
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)] border border-purple-400/50'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex md:hidden justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300 font-medium">
            <span>← Swipe horizontally to see case studies →</span>
          </div>
        </div>
        <div className="mobile-card-scroll md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="mobile-card-item glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/40 flex flex-col justify-between group transition-all duration-300"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[16/10] w-full bg-[#0a0f24] overflow-hidden border-b border-white/10">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Badge overlay */}
                <div className="absolute top-3 left-3 bg-[#060813]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-semibold text-purple-300">
                  {project.category}
                </div>

                {/* External link button */}
                {project.live_url && project.live_url !== '#' && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg"
                    title="Visit Live Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Project Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack / tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom link */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  {project.live_url && project.live_url !== '#' ? (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 group/link"
                    >
                      <span>Explore Live Project</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">Enterprise Case Study</span>
                  )}

                  <Link
                    href="#free-trial"
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    Build Something Similar &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
