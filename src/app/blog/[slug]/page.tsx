import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blog';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan | Triono Hidayat',
    };
  }

  const siteUrl = 'https://trionohidayat.my.id';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Triono Hidayat`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} | Triono Hidayat`,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Triono Hidayat`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-grid-pattern overflow-x-clip w-full max-w-full">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Semua Artikel</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="flex flex-col gap-4 pb-8 mb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs">
              {post.category}
            </span>
            <span className="text-zinc-600">&bull;</span>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {new Date(post.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic border-l-2 border-blue-500/40 pl-3.5 my-1">
            {post.excerpt}
          </p>

          {/* Author & Actions Bar */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5 text-xs text-zinc-400">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-zinc-200">{post.author.name}</div>
                <div className="text-[11px] text-zinc-500">{post.author.role}</div>
              </div>
            </div>

            <ShareButton title={post.title} />
          </div>
        </header>

        {/* Article Body */}
        <article className="mb-12">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Tags */}
        <div className="pt-6 pb-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono mr-1">Topik:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 font-mono"
            >
              <Tag className="w-3 h-3 text-zinc-500" />
              {tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="p-6 rounded-2xl glass-panel bg-zinc-950/70 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm sm:text-base">{post.author.name}</div>
              <div className="text-xs text-zinc-400">
                Enterprise Systems Governance &amp; Solutions Engineering Specialist
              </div>
            </div>
          </div>
          <Link
            href="/#contact"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95 shrink-0"
          >
            Diskusi Proyek
          </Link>
        </div>

        {/* Navigation back to blog */}
        <div className="text-center pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-200 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lihat Artikel Lainnya di Blog</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
