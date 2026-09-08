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
        <div className="flex items-center gap-3">
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

        {/* Middle Tech Tag & Resume Link */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400 font-mono">
          <span>Next.js 16 &amp; Tailwind CSS</span>
          <span className="text-zinc-600">&bull;</span>
          <Link
            href="/resume"
            className="inline-flex items-center gap-1 text-zinc-300 hover:text-blue-400 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive Resume</span>
          </Link>
          <span className="text-zinc-600">&bull;</span>
          <a
            href="/download"
            className="text-zinc-300 hover:text-emerald-400 transition-colors"
            title="Download PDF"
          >
            Download PDF
          </a>
        </div>

        {/* Right Info & Back to Top */}
        <div className="flex items-center gap-4">
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
