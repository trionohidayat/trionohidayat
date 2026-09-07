'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Featured Work', href: '#projects' },
    { label: 'Tech Stack', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Credentials', href: '#education' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
      <nav
        className={`w-full max-w-5xl rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between ${
          scrolled
            ? 'glass-panel shadow-2xl shadow-blue-500/5 backdrop-blur-xl bg-zinc-950/80'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 transition-colors">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors text-sm sm:text-base">
              {portfolioData.personal.name}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono -mt-0.5 hidden sm:block">
              Full-Stack & Solutions Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/25 active:scale-95"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900/60 border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 rounded-2xl glass-panel bg-zinc-950/95 border border-white/10 p-5 shadow-2xl flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
              >
                <span>Hire Me / Contact</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
