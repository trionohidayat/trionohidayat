'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Printer, Download, ArrowLeft } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';
import { resumeVariants, ResumeVariantId } from '@/data/resumeVariants';

const printStyles = `
@page {
  size: A4 portrait;
  margin: 10mm 14mm 10mm 14mm;
}

@media print {
  html, body {
    background-color: #ffffff !important;
    background: #ffffff !important;
    color: #1a1a1a !important;
    margin: 0 !important;
    padding: 0 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    font-size: 9.4pt !important;
    line-height: 1.42 !important;
  }

  .print-hide {
    display: none !important;
  }

  .resume-page-wrapper {
    background-color: #ffffff !important;
    background: #ffffff !important;
    padding: 0 !important;
    margin: 0 !important;
    min-height: auto !important;
  }

  .resume-main-paper {
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
    margin: 0 auto !important;
    max-width: 800px !important;
    width: 100% !important;
    color: #1a1a1a !important;
  }

  .resume-header {
    border-bottom: 2px solid #2563eb !important;
    padding-bottom: 8px !important;
    margin-bottom: 10px !important;
  }

  .resume-name {
    font-size: 21pt !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    letter-spacing: -0.5px !important;
    line-height: 1.1 !important;
    text-transform: uppercase !important;
  }

  .resume-title {
    font-size: 10.5pt !important;
    font-weight: 600 !important;
    color: #2563eb !important;
    margin-top: 3px !important;
    letter-spacing: -0.2px !important;
  }

  .resume-contact-bar {
    margin-top: 6px !important;
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    font-size: 8.6pt !important;
    color: #475569 !important;
  }

  .resume-contact-item {
    display: inline-flex !important;
    align-items: center !important;
    gap: 4px !important;
    font-size: 8.6pt !important;
    color: #334155 !important;
  }

  .resume-contact-item a {
    color: #334155 !important;
    text-decoration: none !important;
  }

  .resume-contact-item svg {
    display: none !important;
  }

  .resume-separator {
    color: #cbd5e1 !important;
    display: inline !important;
  }

  .resume-section {
    margin-bottom: 10px !important;
    break-inside: auto !important;
  }

  .resume-section-title {
    font-size: 9.8pt !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.8px !important;
    color: #0f172a !important;
    border-bottom: 1px solid #e2e8f0 !important;
    padding-bottom: 2px !important;
    margin-bottom: 6px !important;
    break-after: avoid !important;
    page-break-after: avoid !important;
  }

  .resume-summary {
    font-size: 9pt !important;
    color: #334155 !important;
    text-align: justify !important;
    line-height: 1.42 !important;
  }

  .resume-skills-grid {
    display: grid !important;
    grid-template-columns: 155px 1fr !important;
    row-gap: 3px !important;
    column-gap: 10px !important;
    font-size: 8.8pt !important;
  }

  .resume-skill-category {
    font-weight: 700 !important;
    color: #1e293b !important;
    font-size: 8.8pt !important;
  }

  .resume-skill-list {
    color: #334155 !important;
    font-size: 8.8pt !important;
  }

  .resume-entry {
    margin-bottom: 8px !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  .resume-entry:last-child {
    margin-bottom: 0 !important;
  }

  .resume-entry-header {
    display: flex !important;
    justify-content: space-between !important;
    align-items: baseline !important;
    margin-bottom: 1px !important;
  }

  .resume-entry-role {
    font-size: 9.4pt !important;
    font-weight: 700 !important;
    color: #0f172a !important;
  }

  .resume-entry-company {
    font-size: 9pt !important;
    font-weight: 600 !important;
    color: #2563eb !important;
  }

  .resume-entry-date {
    font-size: 8.5pt !important;
    font-weight: 600 !important;
    color: #64748b !important;
    white-space: nowrap !important;
  }

  .resume-entry-location {
    font-size: 8.4pt !important;
    color: #64748b !important;
    font-style: italic !important;
  }

  .resume-bullets {
    margin-top: 2px !important;
    padding-left: 15px !important;
    list-style-type: disc !important;
  }

  .resume-bullets li {
    font-size: 8.8pt !important;
    color: #334155 !important;
    margin-bottom: 2px !important;
    line-height: 1.38 !important;
  }

  .resume-bullets li strong {
    color: #0f172a !important;
  }

  .resume-edu-cert-grid {
    display: grid !important;
    grid-template-columns: 1fr 1.15fr !important;
    gap: 14px !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  .resume-cert-item {
    font-size: 8.5pt !important;
    margin-bottom: 2px !important;
    color: #334155 !important;
  }

  .resume-cert-item strong {
    color: #0f172a !important;
  }
}
`;

function ResumeContent() {
  const searchParams = useSearchParams();
  const variantParam = (searchParams.get('variant') as ResumeVariantId) || 'fullstack';
  const currentVariant = resumeVariants[variantParam] || resumeVariants.fullstack;
  const { personal, contacts } = portfolioData;

  return (
    <div className="resume-page-wrapper min-h-screen bg-zinc-950 text-zinc-100 py-6 sm:py-10 px-2 sm:px-6 lg:px-8 overflow-x-hidden w-full max-w-full">
      {/* Dynamic Print Styles matching PDF generator */}
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      {/* Clean Utility Bar (Non-Floating, Screen Only, Hidden on Print) */}
      <div className="print-hide max-w-4xl mx-auto mb-4 sm:mb-6 flex items-center justify-between px-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-xs font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
            title="Print Resume (A4)"
          >
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span>Print</span>
          </button>

          <a
            href={`/resume/download?variant=${variantParam}`}
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            title="Download PDF Document"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main Resume Paper Container */}
      <main className="resume-main-paper max-w-4xl mx-auto bg-white text-zinc-900 rounded-2xl shadow-2xl p-4 sm:p-12 text-xs sm:text-[9.6pt] leading-relaxed overflow-hidden">
        {/* Header */}
        <header className="resume-header border-b-2 border-blue-600 pb-3 mb-4">
          <h1 className="resume-name text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-950">
            {personal.name}
          </h1>
          <p className="resume-title text-sm font-semibold text-blue-600 mt-1">
            {currentVariant.professionalTitle}
          </p>

          <div className="resume-contact-bar mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
            <span className="resume-contact-item inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Jakarta, Indonesia (UTC+7) &bull; Worldwide Remote</span>
            </span>
            <span className="resume-separator text-zinc-300">|</span>
            <a
              href={`mailto:${contacts.email}`}
              className="resume-contact-item inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{contacts.email}</span>
            </a>
            <span className="resume-separator text-zinc-300">|</span>
            <a
              href={contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-contact-item inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{contacts.whatsappNumber}</span>
            </a>
            <span className="resume-separator text-zinc-300">|</span>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-contact-item inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>linkedin.com/in/triono-hidayat</span>
            </a>
            <span className="resume-separator text-zinc-300">|</span>
            <a
              href={contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-contact-item inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>github.com/trionohidayat</span>
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="resume-section mb-4">
          <h2 className="resume-section-title text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p
            className="resume-summary text-xs text-zinc-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{
              __html: currentVariant.professionalSummary.replace(
                /\*\*(.*?)\*\*/g,
                '<strong>$1</strong>'
              ),
            }}
          />
        </section>

        {/* Core Technical Competencies */}
        <section className="resume-section mb-4">
          <h2 className="resume-section-title text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Core Technical Competencies
          </h2>
          <div className="resume-skills-grid grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-3 gap-y-1.5 text-xs">
            {currentVariant.competencies.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="resume-skill-category font-bold text-zinc-900">{item.label}</span>
                <span className="resume-skill-list text-zinc-700">{item.skills}</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="resume-section mb-4">
          <h2 className="resume-section-title text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Professional Experience
          </h2>

          <div className="space-y-3.5">
            {currentVariant.experiences.map((exp, idx) => (
              <div key={idx} className="resume-entry break-inside-avoid">
                <div className="resume-entry-header flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="resume-entry-role font-bold text-zinc-950 text-xs sm:text-sm">
                      {exp.role}
                    </span>
                    <span className="resume-entry-company font-semibold text-blue-600 text-xs">
                      {' '}&bull; {exp.organization}
                    </span>
                  </div>
                  <span className="resume-entry-date text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <div className="resume-entry-location text-[11px] text-zinc-500 italic">
                  {exp.location} {exp.subLocation ? `\u2022 ${exp.subLocation}` : ''}
                </div>
                <ul className="resume-bullets mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
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
        <section className="resume-section mb-4">
          <h2 className="resume-section-title text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Key Featured Projects
          </h2>
          <div className="space-y-2.5">
            {currentVariant.featuredProjects.map((proj, idx) => (
              <div key={idx} className="resume-entry break-inside-avoid">
                <div className="resume-entry-header flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="resume-entry-role font-bold text-zinc-950 text-xs">{proj.title}</span>
                    <span className="resume-entry-company text-blue-600 font-semibold text-xs"> &bull; {proj.category}</span>
                  </div>
                  <span className="resume-entry-date text-[11px] text-zinc-500 font-mono">{proj.tech}</span>
                </div>
                <p className="resume-summary text-xs text-zinc-700 mt-0.5">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="resume-section break-inside-avoid">
          <div className="resume-edu-cert-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="resume-section-title text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
                Education
              </h2>
              <div className="mb-2">
                <div className="resume-entry-role font-bold text-xs text-zinc-950">Bachelor of Informatics Engineering (S.Kom)</div>
                <div className="resume-entry-company text-xs font-medium text-blue-600">STMIK Nusa Mandiri, Jakarta</div>
                <div className="resume-entry-date text-[11px] text-zinc-500">2017 – 2019</div>
              </div>
              <div>
                <div className="resume-entry-role font-bold text-xs text-zinc-950">Associate of Computer Engineering (A.Md.Kom)</div>
                <div className="resume-entry-company text-xs font-medium text-blue-600">Universitas Bina Sarana Informatika (BSI), Jakarta</div>
                <div className="resume-entry-date text-[11px] text-zinc-500">2013 – 2016</div>
              </div>
            </div>

            <div>
              <h2 className="resume-section-title text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
                Target Certifications Highlight
              </h2>
              <ul className="space-y-1 text-xs text-zinc-700">
                {currentVariant.certificationsHighlight.map((cert, idx) => (
                  <li key={idx} className="resume-cert-item">&bull; {cert}</li>
                ))}
                <li className="resume-cert-item text-[10px] text-zinc-500 italic pt-0.5">
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
