'use client';

import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-white/5 relative bg-zinc-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
              Enterprise Systems Governance & Solutions Engineering
            </div>
          </div>
        </div>

        {/* Middle Tech Tag */}
        <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
          <span>Engineered with Next.js 16 &amp; Tailwind CSS</span>
        </div>

        {/* Right Info & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400">
            &copy; {currentYear} {portfolioData.personal.name}
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
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
