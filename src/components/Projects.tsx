'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  TrendingUp,
  FolderGit2,
} from 'lucide-react';
import { portfolioData, Project } from '@/data/portfolio';

export const Projects = () => {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'automation', label: 'Workflow Automations' },
    { id: 'web', label: 'Web Applications' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'systems', label: 'Systems & Data' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative bg-zinc-950/40 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <span>PROOF OF WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Systems & Case Studies
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Real-world projects delivering measurable business results, high-performance web architecture, and automated operations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Category & Impact Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-800/30">
                      {project.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-1 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {project.impact}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem / Solution Breakdown */}
                  <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                    <div className="bg-zinc-900/40 rounded-xl p-3 border border-white/5">
                      <span className="text-[11px] font-mono uppercase text-red-400 font-semibold block mb-1">
                        The Challenge:
                      </span>
                      <p className="text-zinc-400 leading-relaxed">{project.problem}</p>
                    </div>

                    <div className="bg-zinc-900/40 rounded-xl p-3 border border-white/5">
                      <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold block mb-1">
                        Engineered Solution:
                      </span>
                      <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono font-medium text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded-md border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    <span>View Case Details</span>
                  </button>

                  <a
                    href={portfolioData.contacts.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>Architecture</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Project Detail / Interactive Walkthrough */}
        <AnimatePresence>
          {modalProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="glass-panel bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-blue-400 uppercase font-semibold">
                    {modalProject.categoryLabel}
                  </span>
                  <button
                    onClick={() => setModalProject(null)}
                    className="text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900 border border-white/10 text-xs px-2"
                  >
                    Close (ESC)
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{modalProject.title}</h3>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1 rounded-full mb-6">
                  <TrendingUp className="w-4 h-4" />
                  <span>Key Result: {modalProject.impact}</span>
                </div>

                <div className="space-y-4 text-sm text-zinc-300 mb-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold mb-1">
                      Problem Context
                    </h4>
                    <p className="text-zinc-400 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-white/5">
                      {modalProject.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold mb-1">
                      Implementation & Engineering
                    </h4>
                    <p className="text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-white/5">
                      {modalProject.solution}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-semibold block mb-2">
                    Technologies Deployed:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {modalProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-md border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/${portfolioData.contacts.whatsappRaw}?text=Hello%20Triono,%20I%20saw%20your%20${encodeURIComponent(modalProject.title)}%20project%20and%20want%20to%20build%20something%20similar.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/25"
                  >
                    Build Similar Solution
                  </a>
                  <button
                    onClick={() => setModalProject(null)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium border border-white/10"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
