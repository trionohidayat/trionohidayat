'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  BookOpen,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Tag,
} from 'lucide-react';
import { getAllBlogPosts } from '@/data/blog';

export const LatestArticles = () => {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section
      id="blog"
      className="py-16 sm:py-24 px-4 sm:px-6 relative bg-zinc-950/40 border-t border-white/5 overflow-hidden isolate w-full max-w-full"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL WRITING &amp; INSIGHTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Notes &amp; Case Reflections
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            Catatan arsitektur sistem pemerintahan (*GovTech*), orkestrasi automasi alur kerja *mission-critical*, dan praktik terbaik rekayasa web modern.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl glass-panel bg-zinc-950/60 border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden"
            >
              <div>
                {/* Meta Top Row */}
                <div className="flex items-center justify-between gap-2 text-xs mb-3.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>&bull;</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight line-clamp-2 mb-2.5 leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Row: Tags & Read Action */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] text-zinc-400 font-mono"
                    >
                      <Tag className="w-2.5 h-2.5 text-zinc-500" />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-[10px] text-zinc-500 font-mono">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Baca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Explore All CTA Banner */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-500/50 text-xs sm:text-sm font-semibold transition-all group active:scale-95 shadow-lg shadow-blue-500/5"
          >
            <BookOpen className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Lihat Semua Artikel &amp; Studi Kasus</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
