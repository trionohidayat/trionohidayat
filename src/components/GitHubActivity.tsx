'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  GitCommit,
  Flame,
  FolderGit2,
  Calendar,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { GitHubIcon } from '@/components/Icons';
import { getGitHubStats, GitHubStats, ContributionDay } from '@/lib/github';

// Helper to format date into readable text (e.g. "Tuesday, Sep 1, 2026")
function formatTooltipDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Color mapping for contribution levels
const LEVEL_CLASSES: Record<number, string> = {
  0: 'bg-zinc-900/90 border border-white/5 hover:border-zinc-500/50',
  1: 'bg-emerald-950/80 border border-emerald-800/40 hover:border-emerald-500/60',
  2: 'bg-emerald-800/90 border border-emerald-700/50 hover:border-emerald-400/70',
  3: 'bg-emerald-500 border border-emerald-400/50 shadow-xs shadow-emerald-500/30 hover:border-white/80',
  4: 'bg-emerald-400 border border-emerald-300 shadow-sm shadow-emerald-400/50 hover:border-white',
};

// Octicons Repo SVG Icon
const RepoIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.25a.25.25 0 0 1 .25-.25v1.5a.25.25 0 0 1-.25.25H5.25a.25.25 0 0 1-.25-.25Z" />
  </svg>
);

export const GitHubActivity = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const heatmapScrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    getGitHubStats('trionohidayat')
      .then((data) => {
        if (mounted) {
          setStats(data);
          setLoading(false);
          // Auto-scroll to the end (most recent weeks) on mobile
          setTimeout(() => {
            if (heatmapScrollRef.current) {
              heatmapScrollRef.current.scrollLeft = heatmapScrollRef.current.scrollWidth;
            }
          }, 100);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const totalContribFormatted = useMemo(() => {
    if (!stats?.totalContributions) return '850+';
    return `${stats.totalContributions.toLocaleString()}`;
  }, [stats]);

  return (
    <section id="github" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden isolate w-full max-w-full">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3 shadow-xs shadow-emerald-500/10">
            <GitHubIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>OPEN SOURCE & CODE ACTIVITY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Continuous Delivery & GitHub Footprint
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-base leading-relaxed">
            Consistent code commits across enterprise GovTech solutions, workflow automations, and native Android engineering.
          </p>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {/* Card 1: Total Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="glass-panel p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] sm:text-xs font-mono">Contributions</span>
              <GitCommit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {totalContribFormatted}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5 sm:mt-1">Past 12 Months</div>
            </div>
          </motion.div>

          {/* Card 2: Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="glass-panel p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] sm:text-xs font-mono">Current Streak</span>
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stats?.currentStreak ? `${stats.currentStreak} Days` : '17+ Days'}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5 sm:mt-1">
                Max: {stats?.maxStreak ? `${stats.maxStreak} Days` : '17 Days'}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Public Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="glass-panel p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] sm:text-xs font-mono">Repositories</span>
              <FolderGit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stats?.publicRepos ? stats.publicRepos : 55}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5 sm:mt-1">Public Codebases</div>
            </div>
          </motion.div>

          {/* Card 4: Active Days */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass-panel p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] sm:text-xs font-mono">Active Days</span>
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stats?.activeDays ? `${stats.activeDays} Days` : '110+ Days'}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5 sm:mt-1">Regular Delivery</div>
            </div>
          </motion.div>
        </div>

        {/* Main Contribution Graph Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-3xl p-4 sm:p-8 border border-white/10 relative overflow-hidden"
        >
          {/* Top Bar inside Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                <GitHubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span>Contributions in the Last Year</span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Sync
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400">
                  @trionohidayat &bull; {totalContribFormatted} contributions
                </p>
              </div>
            </div>

            {/* Hover/Touch Tooltip / Status Display */}
            <div className="min-h-[28px] sm:min-h-[32px] flex items-center">
              {hoveredDay && hoveredDay.date ? (
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-900/90 border border-emerald-500/30 text-[11px] sm:text-xs font-mono text-zinc-200 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">
                    {hoveredDay.count} {hoveredDay.count === 1 ? 'commit' : 'commits'}
                  </span>
                  <span className="text-zinc-500">&bull;</span>
                  <span className="text-zinc-400">{formatTooltipDate(hoveredDay.date)}</span>
                </div>
              ) : (
                <div className="text-[11px] sm:text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Tap or hover over blocks to inspect daily commits</span>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Heatmap Container with Horizontal Scroll */}
          <div
            ref={heatmapScrollRef}
            className="pt-5 pb-2 overflow-x-auto scrollbar-thin -mx-4 px-4 sm:mx-0 sm:px-0 w-full max-w-full min-w-0"
          >
            <div className="w-max mx-auto sm:mx-auto">
              {/* Month Labels */}
              <div className="relative h-5 text-[11px] font-mono text-zinc-400 mb-2 ml-[32px]">
                {stats?.months?.map((m, idx) => (
                  <div
                    key={`${m.label}-${idx}`}
                    style={{
                      left: `${m.weekIndex * 15}px`,
                    }}
                    className="absolute top-0 text-left select-none whitespace-nowrap"
                  >
                    {m.label}
                  </div>
                ))}
              </div>

              {/* Grid: 7 rows with Day Labels on Left */}
              <div className="flex gap-2">
                {/* Day Labels (Mon, Wed, Fri) aligned to exact rows */}
                <div className="w-6 relative text-[10px] font-mono text-zinc-500 select-none h-[102px]">
                  <span className="absolute top-[15px]">Mon</span>
                  <span className="absolute top-[45px]">Wed</span>
                  <span className="absolute top-[75px]">Fri</span>
                </div>

                {/* Weeks Grid */}
                <div className="flex gap-[3px]">
                  {loading && !stats ? (
                    // Skeleton loader
                    Array.from({ length: 53 }).map((_, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, dIdx) => (
                          <div
                            key={dIdx}
                            className="w-[12px] h-[12px] rounded-[3px] bg-zinc-900 animate-pulse"
                          />
                        ))}
                      </div>
                    ))
                  ) : (
                    stats?.weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3px]">
                        {week.map((day, dIdx) => {
                          if (!day.date) {
                            return (
                              <div
                                key={dIdx}
                                className="w-[12px] h-[12px] rounded-[3px] opacity-0 pointer-events-none"
                              />
                            );
                          }

                          const levelClass = LEVEL_CLASSES[day.level] || LEVEL_CLASSES[0];

                          return (
                            <div
                              key={day.date || dIdx}
                              onMouseEnter={() => setHoveredDay(day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              onClick={() => setHoveredDay(day)}
                              onTouchStart={() => setHoveredDay(day)}
                              className={`w-[12px] h-[12px] rounded-[3px] transition-all duration-150 cursor-pointer active:scale-125 ${levelClass}`}
                              title={`${day.count} contributions on ${formatTooltipDate(day.date)}`}
                            />
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Legend & Action Footer */}
              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-zinc-400">
                {/* Legend */}
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span>Less</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-3 rounded-[3px] bg-zinc-900 border border-white/5" />
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-950 border border-emerald-800/40" />
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-800 border border-emerald-700/50" />
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-500 border border-emerald-400/50" />
                    <div className="w-3 h-3 rounded-[3px] bg-emerald-400 border border-emerald-300" />
                  </div>
                  <span>More</span>
                </div>

                {/* Profile CTA Button */}
                <a
                  href="https://github.com/trionohidayat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-semibold group shadow-sm active:scale-95"
                >
                  <GitHubIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Explore @trionohidayat on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Activity Overview Box (Identical to GitHub profile) */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-md p-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Contributed Repositories */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <span>Activity overview</span>
                </h4>
                <div className="flex items-start gap-3 text-xs leading-relaxed text-zinc-300">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-zinc-400 mt-0.5">
                    <RepoIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="pt-0.5">
                    Contributed to{' '}
                    <a
                      href="https://github.com/trionohidayat/inset-ecosystem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-400 hover:text-blue-300 hover:underline inline-block"
                    >
                      trionohidayat/inset-ecosystem
                    </a>
                    ,{' '}
                    <a
                      href="https://github.com/trionohidayat/tok2tube"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-400 hover:text-blue-300 hover:underline inline-block"
                    >
                      trionohidayat/tok2tube
                    </a>
                    ,{' '}
                    <a
                      href="https://github.com/trionohidayat/mentorhub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-400 hover:text-blue-300 hover:underline inline-block"
                    >
                      trionohidayat/mentorhub
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://github.com/trionohidayat?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-zinc-400 hover:text-white hover:underline inline-block"
                    >
                      30 other repositories
                    </a>
                  </div>
                </div>
              </div>

              {/* Middle Divider (Desktop) */}
              <div className="hidden lg:block lg:col-span-1 flex justify-center">
                <div className="w-[1px] h-28 bg-white/10 mx-auto" />
              </div>

              {/* Right Column: 4-Axis Coordinate Radar Chart */}
              <div className="lg:col-span-4 flex justify-center items-center">
                <div className="relative flex items-center justify-center py-2">
                  <svg
                    viewBox="0 0 280 180"
                    className="w-[260px] h-[160px] select-none overflow-visible"
                    aria-label="GitHub activity overview coordinate graph"
                  >
                    {/* Background Axes */}
                    <line
                      x1="140"
                      y1="30"
                      x2="140"
                      y2="150"
                      stroke="#27272a"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="60"
                      y1="90"
                      x2="220"
                      y2="90"
                      stroke="#27272a"
                      strokeWidth="1.5"
                    />

                    {/* Active Axis Lines (GitHub Green) */}
                    <line
                      x1="140"
                      y1="36"
                      x2="140"
                      y2="144"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeOpacity="0.8"
                    />
                    <line
                      x1="70"
                      y1="90"
                      x2="210"
                      y2="90"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeOpacity="0.8"
                    />

                    {/* 100% Commits Active Vector (Extending from center to left) */}
                    <line
                      x1="140"
                      y1="90"
                      x2="80"
                      y2="90"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Indicator Circle for 100% Commits */}
                    <circle
                      cx="80"
                      cy="90"
                      r="4.5"
                      fill="#090a0f"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />

                    {/* Labels */}
                    {/* Top: Code review */}
                    <text
                      x="140"
                      y="20"
                      textAnchor="middle"
                      className="text-[10px] font-mono fill-zinc-400"
                    >
                      Code review
                    </text>

                    {/* Bottom: Pull requests */}
                    <text
                      x="140"
                      y="166"
                      textAnchor="middle"
                      className="text-[10px] font-mono fill-zinc-400"
                    >
                      Pull requests
                    </text>

                    {/* Right: Issues */}
                    <text
                      x="224"
                      y="94"
                      textAnchor="start"
                      className="text-[10px] font-mono fill-zinc-400"
                    >
                      Issues
                    </text>

                    {/* Left: 100% Commits */}
                    <text
                      x="70"
                      y="85"
                      textAnchor="end"
                      className="text-[10px] font-mono font-bold fill-white"
                    >
                      100%
                    </text>
                    <text
                      x="70"
                      y="98"
                      textAnchor="end"
                      className="text-[10px] font-mono fill-zinc-400"
                    >
                      Commits
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
