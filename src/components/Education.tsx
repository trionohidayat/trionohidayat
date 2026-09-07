'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { portfolioData, EducationItem, CertificationItem } from '@/data/portfolio';

export const Education = () => {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-3">
            <span>CREDENTIALS & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Background & Certifications
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Formally grounded in Computer Science, software engineering pedagogy, and advanced information systems architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formal Higher Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Higher Academic Education
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu: EducationItem, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="glass-panel rounded-2xl p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-blue-400 bg-blue-950/40 border border-blue-800/30 px-2 py-0.5 rounded">
                      {edu.year}
                    </span>
                    <span className="text-xs text-zinc-400">{edu.location}</span>
                  </div>

                  <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                  <div className="text-sm font-medium text-zinc-400 mb-3">
                    {edu.institution}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-white/5">
                    {edu.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Professional Accreditations & Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Certifications & Accreditations
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert: CertificationItem, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-[11px] font-mono text-zinc-400">{cert.year}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {cert.title}
                    </h4>
                  </div>
                  <div className="text-xs text-zinc-400 pt-3 border-t border-white/5 font-mono">
                    {cert.issuer}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Assurance Box */}
            <div className="mt-6 p-5 rounded-2xl bg-zinc-900/40 border border-white/5 flex items-start gap-3 text-xs text-zinc-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                All credentials, degrees, and professional certifications are verified and verifiable on official university and national databases upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
