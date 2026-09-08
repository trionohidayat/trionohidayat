'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';
import { resumeVariants, ResumeVariantId } from '@/data/resumeVariants';

function ResumeContent() {
  const searchParams = useSearchParams();
  const variantParam = (searchParams.get('variant') as ResumeVariantId) || 'fullstack';
  const currentVariant = resumeVariants[variantParam] || resumeVariants.fullstack;
  const { personal, contacts } = portfolioData;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-6 sm:py-12 px-2 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-zinc-900 overflow-x-hidden w-full max-w-full">
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
              __html: currentVariant.professionalSummary.replace(
                /\*\*(.*?)\*\*/g,
                '<strong>$1</strong>'
              ),
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
