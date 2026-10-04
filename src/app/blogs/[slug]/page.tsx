import React from 'react';
import { getBlogs } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ArrowLeft, Share2, Sparkles, MessageCircle } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: 'Blog Not Found | BrandYuga' };

  return {
    title: `${blog.title} | BrandYuga Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Back button */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 p-2 rounded-xl bg-white/[0.04] border border-white/5 transition-all"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Articles</span>
      </Link>

      {/* Header */}
      <header className="space-y-4 mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
          {blog.category}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-purple-400" />
            <span>{blog.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>{blog.read_time}</span>
          </div>
          <span>•</span>
          <span>{blog.created_at}</span>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 mb-10 shadow-2xl bg-[#0a0e22]">
        <Image
          src={blog.cover_image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-slate-300 text-base leading-relaxed mb-12 prose prose-invert max-w-none">
        <p className="text-lg text-purple-200 font-medium italic border-l-2 border-purple-500 pl-4 mb-6">
          {blog.excerpt}
        </p>

        <div className="whitespace-pre-line space-y-4 font-normal text-slate-200">
          {blog.content}
        </div>
      </div>

      {/* Consultation Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/50 via-indigo-900/40 to-slate-900/60 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            Need Expert Execution for Your Brand?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Let BrandYuga manage your product research, D2C store, and ad scaling.
          </p>
        </div>

        <Link
          href="/#free-trial"
          className="px-6 py-3 rounded-full text-xs font-bold text-white glow-btn-primary whitespace-nowrap shadow-lg"
        >
          Claim 1 Month Free
        </Link>
      </div>
    </article>
  );
}
