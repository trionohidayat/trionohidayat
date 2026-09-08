'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Cpu,
  Smartphone,
  Database,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { portfolioData, SkillCategory } from '@/data/portfolio';

const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend & Web': <Code className="w-5 h-5 text-blue-400" />,
  'Automation & Backend': <Cpu className="w-5 h-5 text-emerald-400" />,
  'Mobile Development': <Smartphone className="w-5 h-5 text-purple-400" />,
  'Database, Cloud & DevOps': <Database className="w-5 h-5 text-cyan-400" />,
  'Systems Governance & Methods': <ShieldCheck className="w-5 h-5 text-amber-400" />,
};

export const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden isolate w-full max-w-full">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-3">
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tools, Technologies & Methods
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            A comprehensive, battle-tested stack spanning modern web ecosystems, native Android, and automated workflow pipelines.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((cat: SkillCategory, idx: number) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`glass-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 ${
                idx === skills.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                    {categoryIcons[cat.name] || <Code className="w-5 h-5 text-blue-400" />}
                  </div>
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-xs text-zinc-300 hover:text-white hover:border-blue-500/30 hover:bg-blue-950/20 transition-all"
                    >
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>Production Ready</span>
                <span className="text-blue-400">100% Tested</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
