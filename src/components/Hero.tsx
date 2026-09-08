'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Download,
  Mail,
  Sparkles,
  CheckCircle2,
  Code2,
  Workflow,
  Smartphone,
} from 'lucide-react';
import { LinkedInIcon, YouTubeIcon, GitHubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';

export const Hero = () => {
  const { personal, contacts } = portfolioData;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden isolate w-full max-w-full">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-blue-600/15 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 sm:right-10 w-[260px] sm:w-[500px] h-[260px] sm:h-[350px] bg-purple-600/12 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Two-Column Grid: Text on Left, Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Texts, Pitch, and CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-xs font-medium mb-4 sm:mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.status}</span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              Turning Complex Workflows into{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                High-Performance
              </span>{' '}
              Solutions
            </motion.h1>

            {/* Subtitle / Narrative Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-sm sm:text-lg text-zinc-300 leading-relaxed max-w-2xl"
            >
              Hello, I&apos;m <span className="font-semibold text-white">{personal.name}</span>. I build
              ultra-fast <span className="text-blue-400 font-medium">Next.js</span> web applications,
              native <span className="text-purple-400 font-medium">Android</span> mobile solutions, and
              frictionless <span className="text-emerald-400 font-medium">n8n</span> workflow
              automations for forward-thinking clients worldwide.
            </motion.p>

            {/* Trust Factor Pills (Option B: Public-Sector & Master's) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-zinc-900/70 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                8+ Years Tech Experience
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-zinc-900/70 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                GovTech IT Systems Officer (Kemnaker)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-zinc-900/70 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                RFID, WMS &amp; n8n Specialist
              </span>
            </motion.div>

            {/* Action Buttons (CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 transition-all active:scale-[0.98] min-h-[48px]"
              >
                <span>Explore Selected Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition-all active:scale-[0.98] min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Consultation</span>
              </a>
            </motion.div>

            {/* Social Proof Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 sm:mt-8 flex items-center gap-2.5 sm:gap-3 text-zinc-400"
            >
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-mono text-zinc-500 mr-1">
                Connect:
              </span>
              <a
                href={contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-xl glass-panel hover:text-white hover:border-blue-500/40 transition-all active:scale-95"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-xl glass-panel hover:text-blue-400 hover:border-blue-500/40 transition-all active:scale-95"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={contacts.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-xl glass-panel hover:text-red-400 hover:border-red-500/40 transition-all active:scale-95"
                title="YouTube Channel"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="p-2 sm:p-2.5 rounded-xl glass-panel hover:text-emerald-400 hover:border-emerald-500/40 transition-all active:scale-95"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Frameless Enlarged Photo with Floating Badges (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative mt-4 lg:mt-0"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] flex items-end justify-center">
              
              {/* Soft Ambient Spotlight Glow Behind Photo */}
              <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-gradient-to-t from-blue-600/30 via-indigo-500/20 to-purple-600/15 rounded-full blur-[90px] sm:blur-[100px] pointer-events-none -z-10" />

              {/* Large Frameless Profile Portrait with True Alpha Masking */}
              <div className="relative w-full h-[360px] sm:h-[480px] md:h-[600px] flex items-end justify-center [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
                <Image
                  src={personal.avatarUrl}
                  alt={personal.name}
                  width={640}
                  height={800}
                  priority
                  className="w-auto h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                />
              </div>

              {/* Floating Badge 1: Next.js & React (Top Left) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl glass-panel bg-zinc-950/90 border border-white/15 shadow-2xl backdrop-blur-xl absolute top-6 sm:top-12 left-0 sm:-left-6 z-20 cursor-default"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner shrink-0">
                  <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Next.js 16</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400">React 19 &amp; SSR</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: n8n Automations (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl glass-panel bg-zinc-950/90 border border-white/15 shadow-2xl backdrop-blur-xl absolute top-20 sm:top-28 right-0 sm:-right-6 z-20 cursor-default"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
                  <Workflow className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white tracking-tight">n8n Automation</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400">APIs &amp; Webhooks</div>
                </div>
              </motion.div>

              {/* Floating Badge 3: Android Development (Middle/Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl glass-panel bg-zinc-950/90 border border-white/15 shadow-2xl backdrop-blur-xl absolute bottom-12 sm:bottom-28 left-0 sm:-left-8 z-20 cursor-default"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner shrink-0">
                  <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Android Native</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400">Kotlin &amp; Compose</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Key Metrics Banner (Full-Width Strip Below Two Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-20 w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4"
        >
          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl text-center hover:border-white/20 transition-all">
            <div className="text-xl sm:text-3xl font-bold text-white font-mono">
              {personal.yearsOfExperience}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">Years Experience</div>
          </div>
          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl text-center hover:border-white/20 transition-all">
            <div className="text-xl sm:text-3xl font-bold text-blue-400 font-mono">
              {personal.completedProjects}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">Projects Delivered</div>
          </div>
          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl text-center hover:border-white/20 transition-all">
            <div className="text-xl sm:text-3xl font-bold text-emerald-400 font-mono">
              {personal.hoursAutomated}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">Hours Automated</div>
          </div>
          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl text-center hover:border-white/20 transition-all">
            <div className="text-xl sm:text-3xl font-bold text-purple-400 font-mono">
              100%
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">Client Reliability</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
