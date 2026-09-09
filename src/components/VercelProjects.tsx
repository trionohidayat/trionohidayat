'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  GitBranch,
  Search,
  Sparkles,
  Layers,
  CheckCircle2,
  RefreshCw,
  Info,
  Clock,
  Radio,
  Lock,
} from 'lucide-react';
import { VercelIcon, GitHubIcon } from '@/components/Icons';
import { VercelProjectItem, VercelProjectsResponse } from '@/lib/vercel';

// Relative time formatter helper
function formatRelativeTime(timestamp: number): string {
  if (!timestamp) return 'Recently';
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMin > 0) return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
  return 'Just now';
}

// Framework badge color helper
function getFrameworkStyle(framework: string): { bg: string; text: string; border: string; label: string } {
  const fw = (framework || '').toLowerCase();
  if (fw.includes('next')) {
    return {
      bg: 'bg-zinc-800/80',
      text: 'text-zinc-100',
      border: 'border-white/20',
      label: 'Next.js',
    };
  }
  if (fw.includes('vite')) {
    return {
      bg: 'bg-purple-950/40',
      text: 'text-purple-300',
      border: 'border-purple-800/40',
      label: 'Vite',
    };
  }
  if (fw.includes('react')) {
    return {
      bg: 'bg-cyan-950/40',
      text: 'text-cyan-300',
      border: 'border-cyan-800/40',
      label: 'React',
    };
  }
  if (fw.includes('vue') || fw.includes('nuxt')) {
    return {
      bg: 'bg-emerald-950/40',
      text: 'text-emerald-300',
      border: 'border-emerald-800/40',
      label: 'Vue / Nuxt',
    };
  }
  if (fw.includes('svelte')) {
    return {
      bg: 'bg-orange-950/40',
      text: 'text-orange-300',
      border: 'border-orange-800/40',
      label: 'Svelte',
    };
  }
  return {
    bg: 'bg-blue-950/40',
    text: 'text-blue-300',
    border: 'border-blue-800/40',
    label: framework.toUpperCase() || 'Web App',
  };
}

export const VercelProjects = () => {
  const [data, setData] = useState<VercelProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vercel/projects');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn('Failed to load Vercel projects from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const projects = data?.projects || [];
  const isConfigured = data?.configured ?? false;

  // Extract unique frameworks for quick filter
  const availableFrameworks = useMemo(() => {
    const list = new Set<string>();
    projects.forEach((p) => {
      if (p.framework) list.add(p.framework.toLowerCase());
    });
    return Array.from(list);
  }, [projects]);

  // Filter projects by search query & framework
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return projects.filter((item) => {
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.displayName && item.displayName.toLowerCase().includes(q)) ||
        (item.domain && item.domain.toLowerCase().includes(q)) ||
        (item.commitMessage && item.commitMessage.toLowerCase().includes(q));
      const matchFramework =
        selectedFramework === 'all' ||
        (item.framework && item.framework.toLowerCase().includes(selectedFramework.toLowerCase()));
      return matchSearch && matchFramework;
    });
  }, [projects, searchQuery, selectedFramework]);

  return (
    <section
      id="deployments"
      className="py-16 sm:py-24 px-4 sm:px-6 relative bg-zinc-950/70 border-b border-white/5 overflow-hidden isolate w-full max-w-full"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-zinc-100 bg-white/5 border border-white/10 mb-3 shadow-xs">
            <VercelIcon className="w-3.5 h-3.5 text-white" />
            <span>EDGE DEPLOYMENTS & LIVE APPS</span>
            <span className="flex h-2 w-2 relative ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Web Applications on Vercel
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            Real-time deployed web apps, full-stack tools, and digital solutions hosted directly on Vercel Global Edge Network.
          </p>
        </div>

        {/* Status / Quick Action Bar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 mb-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Summary Metrics */}
          <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="text-xs text-zinc-400 font-mono">Edge Network</div>
                <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span>99.9% Uptime</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <div>
              <div className="text-xs text-zinc-400 font-mono">Total Deployed Apps</div>
              <div className="text-sm font-semibold text-white">
                {projects.length} Active System{projects.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <div>
              <div className="text-xs text-zinc-400 font-mono">Live Sync</div>
              <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isConfigured ? 'Vercel API Connected' : 'Showcase Mode'}</span>
              </div>
            </div>
          </div>

          {/* Right: Search & Refresh */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search app or commit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-hidden focus:border-blue-500/60 transition-colors"
              />
            </div>

            <button
              onClick={fetchProjects}
              disabled={loading}
              title="Refresh Vercel data"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Notice Banner if VERCEL_TOKEN is not yet set in production/env */}
        {!isConfigured && (
          <div className="mb-8 rounded-2xl p-4 sm:p-5 bg-blue-950/30 border border-blue-800/40 text-zinc-300 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">
                  Akun Vercel siap disinkronkan langsung
                </div>
                <p className="text-zinc-400 leading-relaxed mb-3">
                  Aplikasi di bawah ini sedang menampilkan proyek showcase terpilih. Hubungkan token Vercel Anda di file{' '}
                  <code className="px-1.5 py-0.5 rounded bg-zinc-900 text-blue-300 font-mono text-xs">.env.local</code>{' '}
                  agar semua aplikasi Vercel Anda muncul secara otomatis dan real-time.
                </p>
                <button
                  onClick={() => setShowConfigHelp(!showConfigHelp)}
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 underline underline-offset-2 inline-flex items-center gap-1"
                >
                  <span>{showConfigHelp ? 'Sembunyikan Panduan Setup Token' : 'Lihat Cara Mengambil Token Vercel →'}</span>
                </button>

                {showConfigHelp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-blue-900/40 text-xs space-y-2 text-zinc-300 font-mono bg-zinc-950/60 p-3 rounded-xl"
                  >
                    <div className="text-emerald-400 font-semibold">Langkah Mudah:</div>
                    <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                      <li>Buka vercel.com → Account Settings → Tokens.</li>
                      <li>Buat token baru (misal: "portfolio-token").</li>
                      <li>
                        Isi di file <span className="text-white">.env.local</span>:{' '}
                        <span className="text-blue-300">VERCEL_TOKEN=rahasia_token_anda</span>
                      </li>
                      <li>Selesai! Aplikasi Vercel Anda langsung disinkronkan secara aman.</li>
                    </ol>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Framework Filter Tabs */}
        {availableFrameworks.length > 1 && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedFramework('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedFramework === 'all'
                  ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              All Frameworks ({projects.length})
            </button>
            {availableFrameworks.map((fw) => (
              <button
                key={fw}
                onClick={() => setSelectedFramework(fw)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap ${
                  selectedFramework === fw
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-white/5'
                }`}
              >
                {fw}
              </button>
            ))}
          </div>
        )}

        {/* Project Cards Grid */}
        {loading && projects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-6 border border-white/5 animate-pulse flex flex-col justify-between h-48"
              >
                <div className="h-5 bg-white/10 rounded w-1/3 mb-4" />
                <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
                <div className="h-8 bg-white/10 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl border border-white/5">
            <Layers className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">Tidak ada aplikasi yang cocok dengan pencarian "{searchQuery}".</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((item) => {
                const fwStyle = getFrameworkStyle(item.framework);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="glass-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/5"
                  >
                    <div>
                      {/* Top Header: Framework Badge & Status */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${fwStyle.bg} ${fwStyle.text} ${fwStyle.border}`}
                          >
                            {fwStyle.label}
                          </span>

                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                            <span>READY</span>
                          </span>
                        </div>

                        {/* Last deployed time */}
                        <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatRelativeTime(item.updatedAt)}</span>
                        </div>
                      </div>

                      {/* Project Name & Display Title */}
                      <div className="mb-2.5">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                          <span className="truncate">{item.displayName || item.name}</span>
                        </h3>
                        {item.displayName && item.displayName.toLowerCase() !== item.name.toLowerCase() && (
                          <span className="text-[11px] text-zinc-500 font-mono block -mt-0.5 truncate">
                            {item.name}
                          </span>
                        )}
                      </div>

                      {/* Live Domain URL Preview */}
                      {item.liveUrl && (
                        <div className="text-xs font-mono text-zinc-300 truncate mb-3 bg-zinc-900/70 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2 group-hover:border-blue-500/30 transition-colors">
                          <VercelIcon className="w-3 h-3 text-zinc-400 shrink-0" />
                          <span className="truncate">{item.domain || item.liveUrl.replace(/^https?:\/\//, '')}</span>
                        </div>
                      )}

                      {/* Commit message if available */}
                      {item.commitMessage && (
                        <div className="text-xs text-zinc-400 leading-relaxed mb-4 flex items-start gap-1.5 line-clamp-2">
                          <GitBranch className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                          <span className="italic font-mono text-[11px] text-zinc-400">{item.commitMessage}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 mt-2">
                      {item.gitRepoUrl ? (
                        <a
                          href={item.gitRepoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-medium transition-colors"
                        >
                          <GitHubIcon className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-mono bg-zinc-900/50 px-2 py-0.5 rounded border border-white/5">
                          <Lock className="w-3 h-3 text-zinc-500" />
                          <span>Private System</span>
                        </span>
                      )}

                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/20 active:scale-95 group/btn"
                        >
                          <span>Open App</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
