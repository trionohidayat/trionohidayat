'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, MapPin, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { portfolioData, ExperienceItem } from '@/data/portfolio';

export const Experience = () => {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-16 sm:py-24 px-3 sm:px-6 relative bg-zinc-950/40 border-t border-white/5 overflow-hidden isolate w-full max-w-full">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-3">
            <span>CAREER TRACK RECORD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience & Milestones
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            Bridging institutional-scale GovTech systems governance, enterprise RFID & WMS logistics, and modern full-stack application development.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-zinc-800 ml-2 sm:ml-8 space-y-6 sm:space-y-10">
          {experiences.map((exp: ExperienceItem, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative pl-4 sm:pl-8 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-blue-500 group-hover:scale-125 group-hover:bg-blue-500 transition-all duration-300" />

              <div className="glass-panel rounded-2xl p-4 sm:p-7 hover:border-white/20 transition-all duration-300">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 bg-blue-950/40 border border-blue-800/30 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <div className="text-sm font-medium text-zinc-400 mb-4">
                  {exp.organization}
                </div>

                {/* Description Bullets */}
                <div className="space-y-2 mb-5">
                  {exp.description.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Resume CTA Callout */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-blue-500/40 text-xs sm:text-sm font-semibold transition-all group shadow-lg shadow-black/40 active:scale-[0.98]"
          >
            <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Looking for full career details? View Complete Resume &amp; PDF</span>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
};
