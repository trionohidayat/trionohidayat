'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Mail,
  MessageSquare,
  ArrowUpRight,
  Copy,
  Check,
  Download,
  FileText,
  Send,
  Sparkles,
} from 'lucide-react';
import { LinkedInIcon, YouTubeIcon, GitHubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';

export const Contact = () => {
  const { contacts, personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-zinc-950/60 border-t border-white/5 overflow-hidden isolate w-full max-w-full">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[250px] sm:h-[300px] bg-blue-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A COLLABORATION</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Remarkable
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            Have a project in mind, need to automate mission-critical workflows, or want to build a modern web/mobile app? Let&apos;s connect.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* WhatsApp Direct Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-emerald-500/20 hover:border-emerald-500/40 bg-gradient-to-b from-emerald-950/10 to-transparent transition-all"
          >
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 sm:mb-6">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Fast Response via WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5 sm:mb-6">
                Ideal for quick project scopes, availability checks, or initial consultation calls. Pre-configured message ready for international clients.
              </p>
            </div>

            <a
              href={contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xl shadow-emerald-600/20 transition-all active:scale-[0.98] min-h-[48px]"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Email Direct Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-blue-500/20 hover:border-blue-500/40 bg-gradient-to-b from-blue-950/10 to-transparent transition-all"
          >
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 sm:mb-6">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Direct Email Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5 sm:mb-6">
                Send formal RFPs, job specifications, or contract proposals directly to my inbox. Typically replied within 12 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`mailto:${contacts.email}?subject=Freelance%20Project%20Inquiry%20-%20[Your%20Company]&body=Hi%20Triono,%0D%0A%0D%0AI%20am%20interested%20in%20discussing%20a%20project%20with%20you...`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] min-h-[48px]"
              >
                <span>Compose Email</span>
                <Send className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-white/10 transition-colors min-h-[48px] active:scale-95 cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* View Resume & Social Channels Strip */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Curriculum Vitae / Resume</div>
              <div className="text-[11px] sm:text-xs text-zinc-400">ATS-friendly layout &bull; View, print, or PDF</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              href="/resume"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer active:scale-[0.98] min-h-[44px]"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>View Resume</span>
            </Link>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center justify-center gap-2 pt-1 sm:pt-0">
              <a
                href={contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none p-2.5 rounded-xl bg-zinc-900 hover:text-blue-400 border border-white/10 text-zinc-400 transition-colors flex items-center justify-center active:scale-95"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none p-2.5 rounded-xl bg-zinc-900 hover:text-white border border-white/10 text-zinc-400 transition-colors flex items-center justify-center active:scale-95"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={contacts.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none p-2.5 rounded-xl bg-zinc-900 hover:text-red-400 border border-white/10 text-zinc-400 transition-colors flex items-center justify-center active:scale-95"
                title="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
