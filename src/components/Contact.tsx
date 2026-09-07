'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  MessageSquare,
  ArrowUpRight,
  Copy,
  Check,
  Download,
  Send,
  Sparkles,
} from 'lucide-react';
import { LinkedInIcon, YouTubeIcon, GitHubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';

export const Contact = () => {
  const { contacts } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCV = () => {
    window.print();
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative bg-zinc-950/60 border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Remarkable
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, need to automate mission-critical workflows, or want to build a modern web/mobile app? Let&apos;s connect.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Direct Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-emerald-500/20 hover:border-emerald-500/40 bg-gradient-to-b from-emerald-950/10 to-transparent transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Fast Response via WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Ideal for quick project scopes, availability checks, or initial consultation calls. Pre-configured message ready for international clients.
              </p>
            </div>

            <a
              href={contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
            className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-blue-500/20 hover:border-blue-500/40 bg-gradient-to-b from-blue-950/10 to-transparent transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Direct Email Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Send formal RFPs, job specifications, or contract proposals directly to my inbox. Typically replied within 12 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`mailto:${contacts.email}?subject=Freelance%20Project%20Inquiry%20-%20[Your%20Company]&body=Hi%20Triono,%0D%0A%0D%0AI%20am%20interested%20in%20discussing%20a%20project%20with%20you...`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Compose Email</span>
                <Send className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-white/10 transition-colors"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Download Resume & Social Channels Strip */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Curriculum Vitae (PDF)</div>
              <div className="text-xs text-zinc-400">Ready for instant print or download</div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadCV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <a
                href={contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:text-blue-400 border border-white/10 text-zinc-400 transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:text-white border border-white/10 text-zinc-400 transition-colors"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={contacts.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:text-red-400 border border-white/10 text-zinc-400 transition-colors"
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
