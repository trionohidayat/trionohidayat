'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  FolderGit2,
  FileText,
  MessageSquare,
  Layers,
  History,
  GraduationCap,
  Radio,
} from 'lucide-react';
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

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Curated, high-impact navigation links
  const navLinks = [
    { label: 'Services', href: '#services', icon: Layers },
    { label: 'Projects', href: '#projects', icon: FolderGit2 },
    { label: 'Live Apps', href: '#deployments', icon: Radio },
    { label: 'Experience', href: '#experience', icon: History },
    { label: 'Credentials', href: '#education', icon: GraduationCap },
    { label: 'Resume', href: '/resume', icon: FileText },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-4 transition-all duration-300">
        <nav
          className={`w-full max-w-5xl rounded-2xl transition-all duration-300 px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled
              ? 'glass-panel shadow-2xl shadow-blue-500/5 backdrop-blur-xl bg-zinc-950/85 border border-white/10'
              : 'bg-zinc-950/40 backdrop-blur-md sm:bg-transparent border border-white/5 sm:border-transparent'
          }`}
        >
          {/* Brand / Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 transition-colors shrink-0">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors text-xs sm:text-base">
                {portfolioData.personal.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono -mt-0.5 hidden xs:block">
                Full-Stack &amp; Solutions Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isInternal = link.href.startsWith('/');
              return isInternal ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Desktop CTA */}
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
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-300 hover:text-white bg-zinc-900/80 border border-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Full Backdrop & Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
              />

              {/* Drawer Content */}
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="md:hidden absolute top-16 left-3 right-3 z-50 rounded-2xl glass-panel bg-zinc-950/95 border border-white/15 p-4 shadow-2xl flex flex-col gap-1.5"
              >
                {/* Header in Menu */}
                <div className="flex items-center justify-between pb-2.5 mb-1 border-b border-white/10 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      Navigation Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isInternal = link.href.startsWith('/');
                    const Icon = link.icon;
                    const linkClasses =
                      'flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/10 rounded-xl transition-all active:scale-[0.99]';

                    return isInternal ? (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={linkClasses}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-blue-400">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span>{link.label}</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={linkClasses}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-blue-400">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span>{link.label}</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                      </a>
                    );
                  })}
                </div>

                {/* Direct Action Buttons inside Mobile Menu */}
                <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                  >
                    <span>Hire Me / Let&apos;s Talk</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={portfolioData.contacts.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all active:scale-[0.98]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Quick Inquiry</span>
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
