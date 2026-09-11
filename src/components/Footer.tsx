'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Terminal, FileText } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 sm:py-12 px-4 sm:px-6 border-t border-white/5 relative bg-zinc-950 overflow-hidden isolate w-full max-w-full">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight">
              {portfolioData.personal.name}
            </div>
            <div className="text-xs text-zinc-400">
              Enterprise Systems Governance &amp; Solutions Engineering
            </div>
          </div>
        </div>

        {/* Colophon Credits (Brittany Chiang style) */}
        <p className="text-xs text-zinc-400 leading-relaxed text-center max-w-sm sm:max-w-md">
          Designed and coded in{' '}
          <a
            href="https://antigravity.google"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-200 hover:text-blue-400 transition-colors"
          >
            Google Antigravity
          </a>{' '}
          by yours truly. Built with{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-200 hover:text-blue-400 transition-colors"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-200 hover:text-blue-400 transition-colors"
          >
            Tailwind CSS
          </a>
          , deployed with{' '}
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-200 hover:text-blue-400 transition-colors"
          >
            Vercel
          </a>
          . All text is set in the{' '}
          <a
            href="https://rsms.me/inter/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-200 hover:text-blue-400 transition-colors"
          >
            Inter
          </a>{' '}
          typeface.
        </p>

        {/* Right Info & Back to Top */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/resume"
            className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5 hover:border-white/10"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Resume / CV</span>
          </Link>
          <span className="text-xs text-zinc-400">
            &copy; {currentYear} {portfolioData.personal.name}
          </span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors active:scale-95 cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
