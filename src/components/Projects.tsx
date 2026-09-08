'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  TrendingUp,
  FolderGit2,
  X,
  Sparkles,
} from 'lucide-react';
import { portfolioData, Project } from '@/data/portfolio';

export const Projects = () => {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalProject]);

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
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-zinc-950/40 border-y border-white/5 overflow-hidden isolate w-full max-w-full">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <span>PROOF OF WORK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Systems & Case Studies
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            Real-world projects delivering measurable business results, high-performance web architecture, and automated operations.
          </p>
        </div>

        {/* Category Filters: Horizontal Swipeable Strip on Mobile */}
        <div className="mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar w-full max-w-full min-w-0">
          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap active:scale-95 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
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
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Category & Impact Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-mono font-medium text-blue-400 uppercase tracking-wider bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-800/30">
                      {project.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-1 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      {project.impact}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem / Solution Breakdown */}
                  <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-zinc-300">
                    <div className="bg-zinc-900/50 rounded-xl p-3 border border-white/5">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase text-red-400 font-semibold block mb-1">
                        The Challenge:
                      </span>
                      <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">{project.problem}</p>
                    </div>

                    <div className="bg-zinc-900/50 rounded-xl p-3 border border-white/5">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase text-emerald-400 font-semibold block mb-1">
                        Engineered Solution:
                      </span>
                      <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">{project.solution}</p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-[11px] font-mono font-medium text-zinc-400 bg-zinc-900 px-2 sm:px-2.5 py-0.5 rounded-md border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 sm:mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    <span>View Details</span>
                  </button>

                  <a
                    href={portfolioData.contacts.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors py-2 px-2.5"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span className="hidden xs:inline">Architecture</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Project Detail: Mobile Scrollable Bottom-Sheet / Dialog */}
        <AnimatePresence>
          {modalProject && (
            <div
              onClick={() => setModalProject(null)}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-panel bg-zinc-950 border border-white/15 rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sticky top-0 bg-zinc-950/95 backdrop-blur-md py-1 -mt-1 z-10 border-b border-white/5 pb-3">
                  <span className="text-xs font-mono text-blue-400 uppercase font-semibold">
                    {modalProject.categoryLabel}
                  </span>
                  <button
                    onClick={() => setModalProject(null)}
                    className="text-zinc-400 hover:text-white p-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden xs:inline">Close</span>
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{modalProject.title}</h3>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1 rounded-full mb-5">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span>Key Result: {modalProject.impact}</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-zinc-300 mb-6">
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-mono uppercase text-zinc-400 font-semibold mb-1.5">
                      Problem Context
                    </h4>
                    <p className="text-zinc-400 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-white/5 text-xs sm:text-sm">
                      {modalProject.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-mono uppercase text-zinc-400 font-semibold mb-1.5">
                      Implementation & Engineering
                    </h4>
                    <p className="text-zinc-300 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-white/5 text-xs sm:text-sm">
                      {modalProject.solution}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[11px] sm:text-xs font-mono uppercase text-zinc-400 font-semibold block mb-2">
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

                {/* Modal Footer / Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4 border-t border-white/10 sticky bottom-0 bg-zinc-950/95 backdrop-blur-md -mb-1 pb-1">
                  <a
                    href={`https://wa.me/${portfolioData.contacts.whatsappRaw}?text=Hello%20Triono,%20I%20saw%20your%20${encodeURIComponent(modalProject.title)}%20project%20and%20want%20to%20build%20something%20similar.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Build Similar Solution</span>
                  </a>
                  <button
                    onClick={() => setModalProject(null)}
                    className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium border border-white/10 active:scale-95 transition-all cursor-pointer"
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
