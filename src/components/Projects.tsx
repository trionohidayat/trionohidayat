'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  TrendingUp,
  FolderGit2,
  X,
  Sparkles,
  Radio,
  Lock,
} from 'lucide-react';
import { VercelIcon } from '@/components/Icons';
import { portfolioData, Project } from '@/data/portfolio';
import { VercelProjectItem } from '@/lib/vercel';

export const Projects = () => {
  const { projects: staticProjects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [vercelProjects, setVercelProjects] = useState<VercelProjectItem[]>([]);
  const [isVercelLoaded, setIsVercelLoaded] = useState(false);

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

  // Fetch live Vercel deployments to synchronize active URLs and status
  useEffect(() => {
    let mounted = true;
    fetch('/api/vercel/projects')
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data?.projects) {
          setVercelProjects(data.projects);
          setIsVercelLoaded(true);
        }
      })
      .catch((err) => {
        console.warn('Failed to synchronize Vercel deployments:', err);
        if (mounted) setIsVercelLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Merge static curated case studies with live Vercel deployment data
  const mergedProjects = useMemo(() => {
    const list: Project[] = staticProjects.map((proj) => {
      // Find matching live deployment from Vercel
      const vMatch = vercelProjects.find((vp) => {
        if (proj.vercelSlug && vp.name.toLowerCase() === proj.vercelSlug.toLowerCase()) return true;
        if (vp.name.toLowerCase() === proj.id.toLowerCase()) return true;
        return false;
      });

      if (vMatch) {
        return {
          ...proj,
          demoUrl: vMatch.liveUrl || proj.demoUrl,
          isLive: true,
          githubUrl: vMatch.gitRepoUrl || proj.githubUrl,
        };
      }

      return proj;
    });

    return list;
  }, [staticProjects, vercelProjects]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Applications (Live)' },
    { id: 'automation', label: 'Workflow Automations' },
    { id: 'mobile', label: 'Mobile Solutions' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? mergedProjects
      : mergedProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-zinc-950/40 border-y border-white/5 overflow-hidden isolate w-full max-w-full">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3 shadow-xs">
            <VercelIcon className="w-3.5 h-3.5 text-white" />
            <span>PROOF OF WORK • LIVE ON VERCEL</span>
            <span className="flex h-2 w-2 relative ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Deployed Systems
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            Real-world applications, automated pipelines, and full-stack solutions built and deployed live on Vercel Global Edge Network.
          </p>
        </div>

        {/* Category Filters: Horizontal Swipeable Strip on Mobile */}
        <div className="mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar w-full max-w-full min-w-0">
          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max py-3 px-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap active:scale-95 cursor-pointer ${
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
            {filteredProjects.map((project: Project) => {
              const cleanDomain = project.demoUrl
                ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                : null;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-2xl p-5 sm:p-7 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 border border-white/10"
                >
                  <div>
                    {/* Top Bar: Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                      <span className="text-[11px] sm:text-xs font-mono font-medium text-blue-400 uppercase tracking-wider bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-800/30">
                        {project.categoryLabel}
                      </span>

                      {project.isLive || project.demoUrl ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                          <span>Live on Vercel</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-1 rounded-full">
                          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                          {project.impact}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Live Domain Preview Pill */}
                    {project.demoUrl && cleanDomain && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-blue-300 bg-zinc-900/80 hover:bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5 hover:border-blue-500/40 transition-all mb-3.5 group/domain max-w-full"
                        title={`Visit live app: ${project.demoUrl}`}
                      >
                        <VercelIcon className="w-3 h-3 text-zinc-400 group-hover/domain:text-white shrink-0" />
                        <span className="truncate">{cleanDomain}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover/domain:text-blue-400 shrink-0 ml-auto" />
                      </a>
                    )}

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
                    <div className="flex items-center gap-2">
                      {/* Live Demo Button */}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3.5 py-2 rounded-xl transition-all shadow-md shadow-blue-600/25 active:scale-95"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open App</span>
                        </a>
                      )}

                      {/* View Details Button */}
                      <button
                        onClick={() => setModalProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                      >
                        <span>Details</span>
                      </button>
                    </div>

                    {/* Repository / Private System */}
                    {project.githubUrl && project.githubUrl.includes('/trionohidayat/') && !project.githubUrl.endsWith('/trionohidayat') ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors py-2 px-2"
                        title="View Public Repository"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">Codebase</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 py-2 px-1">
                        <Lock className="w-3 h-3 text-zinc-500" />
                        <span className="hidden xs:inline">Private</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
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
                  {modalProject.demoUrl && (
                    <a
                      href={modalProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live App</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/${portfolioData.contacts.whatsappRaw}?text=Hello%20Triono,%20I%20saw%20your%20${encodeURIComponent(modalProject.title)}%20project%20and%20want%20to%20build%20something%20similar.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 hover:border-white/20 text-xs sm:text-sm font-semibold transition-all active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Inquire Solution</span>
                  </a>

                  <button
                    onClick={() => setModalProject(null)}
                    className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium border border-white/10 active:scale-95 transition-all cursor-pointer"
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
