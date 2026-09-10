import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getAllBlogPosts, getBlogCategories } from '@/data/blog';
import { BlogCatalog } from './BlogCatalog';

export const metadata: Metadata = {
  title: 'Blog & Technical Insights | Triono Hidayat',
  description:
    'Explorations in GovTech system architecture, enterprise governance, n8n workflow automations, and modern web engineering.',
  openGraph: {
    title: 'Blog & Technical Insights | Triono Hidayat',
    description:
      'Explorations in GovTech system architecture, enterprise governance, n8n workflow automations, and modern web engineering.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();

  return (
    <div className="relative min-h-screen flex flex-col bg-grid-pattern overflow-x-clip w-full max-w-full">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono self-center sm:self-start">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Technical Notes &amp; Case Studies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Writing &amp; Insights
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Catatan teknis, refleksi arsitektur sistem pemerintahan (*GovTech*), orkestrasi automasi workflow, dan praktik terbaik rekayasa web modern.
          </p>
        </div>

        {/* Interactive Catalog Component */}
        <BlogCatalog initialPosts={posts} categories={categories} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
