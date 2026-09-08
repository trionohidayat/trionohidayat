'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { portfolioData, EducationItem, CertificationItem } from '@/data/portfolio';

type CategoryFilter = 'all' | 'ai' | 'cloud' | 'mobile' | 'web' | 'engineering' | 'leadership';

interface CategoryTab {
  key: CategoryFilter;
  label: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'cloud', label: 'Cloud & DevOps' },
  { key: 'mobile', label: 'Mobile & IoT' },
  { key: 'web', label: 'Web & Backend' },
  { key: 'engineering', label: 'Architecture & Java' },
  { key: 'leadership', label: 'GovTech & Mgmt' },
];

const CATEGORY_BADGES: Record<
  CertificationItem['category'],
  { label: string; className: string }
> = {
  ai: {
    label: 'AI & ML',
    className: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  cloud: {
    label: 'Cloud',
    className: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  },
  mobile: {
    label: 'Mobile',
    className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  web: {
    label: 'Web',
    className: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  engineering: {
    label: 'Engineering',
    className: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  },
  leadership: {
    label: 'GovTech & Mgmt',
    className: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
};

export const Education = () => {
  const { education, certifications, contacts } = portfolioData;

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: certifications.length };
    certifications.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [certifications]);

  // Filtered certifications
  const filteredCertifications = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory =
        activeCategory === 'all' || cert.category === activeCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
        cert.year.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [certifications, activeCategory, searchQuery]);

  // Initial visible count when collapsed (show 6 by default)
  const INITIAL_LIMIT = 6;
  const isFiltering = activeCategory !== 'all' || searchQuery.trim() !== '';
  const displayedCertifications =
    isExpanded || isFiltering
      ? filteredCertifications
      : filteredCertifications.slice(0, INITIAL_LIMIT);

  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden isolate w-full max-w-full">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>43+ VERIFIED CREDENTIALS & ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Background &amp; Certifications
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Formally grounded in Computer Science and continuously validated through 43+ verified certifications from industry leaders including Google, Oracle, LPPI, and Dicoding Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Formal Higher Education + Stats (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 mb-2">
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

            {/* Credential Metrics Overview Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certification Highlights</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-center">
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5">
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    43+
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 font-medium">
                    Verified Licenses
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5">
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                    17
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 font-medium">
                    AI &amp; ML Badges
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Credentials span Google Enterprise AI Multi-Agent architecture, LPPI DIGDAYA Governance, Oracle Java, and AWS Cloud foundations.
              </p>

              <a
                href={contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <span>Verify on Official LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Quick Assurance Box */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 flex items-start gap-3 text-xs text-zinc-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                All credentials, degrees, and professional certifications are authenticated and verifiable on official university portals, Credential ID registries, and national databases.
              </p>
            </div>
          </div>

          {/* Right Column: Professional Accreditations & Certifications (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Certifications &amp; Accreditations
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {filteredCertifications.length} certificates found
                  </p>
                </div>
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search certificate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Category Filter Pills: Swipeable Strip on Mobile */}
            <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 w-full max-w-full min-w-0">
              <div className="flex items-center gap-1.5 min-w-max">
                {CATEGORY_TABS.map((tab) => {
                  const count = categoryCounts[tab.key] || 0;
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveCategory(tab.key)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20 font-semibold'
                          : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      {tab.label} <span className="opacity-70 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certifications Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <AnimatePresence mode="popLayout">
                {displayedCertifications.map((cert: CertificationItem, idx: number) => {
                  const badge = CATEGORY_BADGES[cert.category];
                  return (
                    <motion.div
                      key={`${cert.title}-${cert.year}-${idx}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.25) }}
                      className="glass-panel rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-medium ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-400">
                            {cert.year}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-1">
                          {cert.title}
                        </h4>
                      </div>

                      <div className="pt-2 mt-2 border-t border-white/5 space-y-1">
                        <div className="text-xs text-zinc-400 font-mono">
                          {cert.issuer}
                        </div>
                        {cert.credentialId && (
                          <div className="text-[10px] font-mono text-zinc-500 truncate" title={cert.credentialId}>
                            ID: <span className="text-zinc-400">{cert.credentialId}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Zero State if search yields no results */}
            {filteredCertifications.length === 0 && (
              <div className="text-center py-12 px-4 rounded-2xl bg-zinc-900/40 border border-white/5 text-zinc-400 text-xs">
                No certifications matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset filters.
              </div>
            )}

            {/* Toggle Expand/Collapse Button (when not searching or single category) */}
            {!isFiltering && filteredCertifications.length > INITIAL_LIMIT && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 hover:border-white/20 shadow-lg shadow-black/20 transition-all cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <span>Tampilkan Lebih Sedikit (Ciutkan)</span>
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    </>
                  ) : (
                    <>
                      <span>
                        Tampilkan Semua ({filteredCertifications.length} Sertifikasi)
                      </span>
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
