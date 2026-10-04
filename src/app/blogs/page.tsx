import React from 'react';
import { getBlogs } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'E-Commerce Scaling Blog & Insights | BrandYuga',
  description: 'Actionable strategies on product research, Amazon scaling, video ads, and profit analytics.',
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="py-16 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Knowledge & Strategy Hub</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          E-Commerce <span className="glow-gradient-brand">Growth Insights</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Tactical playbooks, case studies, and field-tested frameworks for scaling Indian consumer brands online.
        </p>
      </section>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/40 flex flex-col justify-between group transition-all"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full bg-[#0a0e22] overflow-hidden">
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#060813]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-semibold text-purple-300">
                  {blog.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.read_time}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-3 leading-snug">
                  <Link href={`/blogs/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 group/link"
              >
                <span>Read Full Strategy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
