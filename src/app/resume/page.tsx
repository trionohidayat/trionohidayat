'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  Layers,
  Smartphone,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';
import { resumeVariants, ResumeVariantId, ResumeVariantData } from '@/data/resumeVariants';

function ResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read variant from URL query param or default to 'fullstack'
  const variantParam = (searchParams.get('variant') as ResumeVariantId) || 'fullstack';
  const initialVariant = resumeVariants[variantParam] ? variantParam : 'fullstack';

  const [activeVariant, setActiveVariant] = useState<ResumeVariantId>(initialVariant);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (variantParam && resumeVariants[variantParam]) {
      setActiveVariant(variantParam);
    }
  }, [variantParam]);

  const handleVariantChange = (id: ResumeVariantId) => {
    setActiveVariant(id);
    const newUrl = id === 'fullstack' ? '/resume' : `/resume?variant=${id}`;
    router.replace(newUrl, { scroll: false });
  };

  const currentVariant: ResumeVariantData = resumeVariants[activeVariant];
  const { personal, contacts } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    const mdContent = `# ${personal.name}
${currentVariant.professionalTitle}
Email: ${contacts.email} | Phone: ${contacts.whatsappNumber}
Location: ${personal.location}
LinkedIn: ${contacts.linkedin} | GitHub: ${contacts.github}

---

## PROFESSIONAL SUMMARY
${currentVariant.professionalSummary.replace(/\*\*/g, '')}

---

## CORE TECHNICAL COMPETENCIES
${currentVariant.competencies.map((c) => `- ${c.label}: ${c.skills}`).join('\n')}

---

## PROFESSIONAL EXPERIENCE
${currentVariant.experiences
  .map(
    (exp) => `### ${exp.role} — ${exp.organization}
${exp.period} | ${exp.location}${exp.subLocation ? ` (${exp.subLocation})` : ''}
${exp.description.map((bullet) => `- ${bullet}`).join('\n')}
Skills: ${exp.tags.join(', ')}`
  )
  .join('\n\n')}

---

## FEATURED PROJECTS
${currentVariant.featuredProjects
  .map(
    (proj) => `### ${proj.title} [${proj.category}]
Tech: ${proj.tech}
${proj.description}`
  )
  .join('\n\n')}

---

## EDUCATION
- Bachelor of Informatics Engineering (S.Kom) — STMIK Nusa Mandiri, Jakarta (2017 – 2019)
- Associate of Computer Engineering (A.Md.Kom) — Universitas Bina Sarana Informatika (BSI), Jakarta (2013 – 2016)

---

## KEY CERTIFICATIONS
${currentVariant.certificationsHighlight.map((cert) => `- ${cert}`).join('\n')}
`;

    try {
      await navigator.clipboard.writeText(mdContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy markdown: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-4 sm:py-8 px-2 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-zinc-900 overflow-x-hidden w-full max-w-full">
      {/* Top Floating / Action Toolbar */}
      <div className="max-w-4xl mx-auto mb-4 sm:mb-6 flex flex-col gap-3 p-3 sm:p-4 rounded-2xl glass-panel bg-zinc-900/80 border border-white/10 shadow-xl print:hidden">
        {/* Navigation & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-white/10 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              onClick={handleCopyMarkdown}
              title="Copy plain text / markdown for job applications"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 transition-all cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy ATS Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 transition-colors cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>Print / Save PDF</span>
            </button>

            <a
              href={personal.resumeUrl}
              download="resume_triono-hidayat.pdf"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Original PDF</span>
            </a>
          </div>
        </div>

        {/* Variant Switcher Segmented Tabs */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-zinc-300">Engineering Specialization Lens:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-zinc-950/60 rounded-xl border border-white/5">
            <button
              onClick={() => handleVariantChange('fullstack')}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeVariant === 'fullstack'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack &amp; Web</span>
            </button>

            <button
              onClick={() => handleVariantChange('android')}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeVariant === 'android'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android &amp; Mobile AI</span>
            </button>

            <button
              onClick={() => handleVariantChange('govtech')}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeVariant === 'govtech'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>GovTech &amp; AI Workflows</span>
            </button>
          </div>
        </div>

        {/* Context info banner */}
        <div className="text-[11px] text-zinc-400 bg-zinc-950/40 px-3 py-1.5 rounded-lg border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span>
            Specialization: <strong className="text-zinc-200">{currentVariant.targetRole}</strong> &bull; {currentVariant.subtitle}
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 self-start sm:self-auto">
            {currentVariant.badge}
          </span>
        </div>
      </div>

      {/* Main Resume Paper Container */}
      <main className="max-w-4xl mx-auto bg-white text-zinc-900 rounded-2xl shadow-2xl p-4 sm:p-12 print:p-0 print:shadow-none print:rounded-none print:max-w-none text-xs sm:text-[9.6pt] leading-relaxed overflow-hidden">
        {/* Header */}
        <header className="border-b-2 border-blue-600 pb-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-950">
            {personal.name}
          </h1>
          <p className="text-sm font-semibold text-blue-600 mt-1">
            {currentVariant.professionalTitle}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Jakarta, Indonesia (UTC+7) &bull; Worldwide Remote</span>
            </span>
            <span className="text-zinc-300">|</span>
            <a
              href={`mailto:${contacts.email}`}
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>{contacts.email}</span>
            </a>
            <span className="text-zinc-300">|</span>
            <a
              href={contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{contacts.whatsappNumber}</span>
            </a>
            <span className="text-zinc-300">|</span>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-zinc-300">|</span>
            <a
              href={contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub</span>
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p
            className="text-xs text-zinc-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{
              __html: currentVariant.professionalSummary
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        </section>

        {/* Core Technical Competencies */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Core Technical Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-3 gap-y-1.5 text-xs">
            {currentVariant.competencies.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="font-bold text-zinc-900">{item.label}</span>
                <span className="text-zinc-700">{item.skills}</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Professional Experience
          </h2>

          <div className="space-y-3.5">
            {currentVariant.experiences.map((exp, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                      {exp.role}
                    </span>
                    <span className="font-semibold text-blue-600 text-xs">
                      {' '}&bull; {exp.organization}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500 italic">
                  {exp.location} {exp.subLocation ? `\u2022 ${exp.subLocation}` : ''}
                </div>
                <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                  {exp.description.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      dangerouslySetInnerHTML={{
                        __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key Featured Engineering Projects */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Key Featured Projects
          </h2>
          <div className="space-y-2.5">
            {currentVariant.featuredProjects.map((proj, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="font-bold text-zinc-950 text-xs">{proj.title}</span>
                    <span className="text-blue-600 font-semibold text-xs"> &bull; {proj.category}</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">{proj.tech}</span>
                </div>
                <p className="text-xs text-zinc-700 mt-0.5">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="break-inside-avoid">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
                Education
              </h2>
              <div className="mb-2">
                <div className="font-bold text-xs text-zinc-950">Bachelor of Informatics Engineering (S.Kom)</div>
                <div className="text-xs font-medium text-blue-600">STMIK Nusa Mandiri, Jakarta</div>
                <div className="text-[11px] text-zinc-500">2017 – 2019</div>
              </div>
              <div>
                <div className="font-bold text-xs text-zinc-950">Associate of Computer Engineering (A.Md.Kom)</div>
                <div className="text-xs font-medium text-blue-600">Universitas Bina Sarana Informatika (BSI), Jakarta</div>
                <div className="text-[11px] text-zinc-500">2013 – 2016</div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
                Target Certifications Highlight
              </h2>
              <ul className="space-y-1 text-xs text-zinc-700">
                {currentVariant.certificationsHighlight.map((cert, idx) => (
                  <li key={idx}>&bull; {cert}</li>
                ))}
                <li className="text-[10px] text-zinc-500 italic pt-0.5">
                  &bull; + 37 additional verified credentials in AI, Cloud, Mobile &amp; Systems on web portfolio.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
          Loading resume...
        </div>
      }
    >
      <ResumeContent />
    </Suspense>
  );
}
