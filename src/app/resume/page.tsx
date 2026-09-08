'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';

export default function ResumePage() {
  const { personal, contacts } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-4 sm:py-8 px-2 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-zinc-900 overflow-x-hidden w-full max-w-full">
      {/* Top Floating / Action Toolbar */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl glass-panel bg-zinc-900/80 border border-white/10 shadow-xl print:hidden">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-white/10 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 transition-colors cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4 text-blue-400" />
            <span>Print</span>
          </button>

          <a
            href={personal.resumeUrl}
            download="resume_triono-hidayat.pdf"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
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
            Full-Stack &amp; Solutions Developer | GovTech Systems Officer | AI &amp; Workflow Automation
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
          <p className="text-xs text-zinc-700 leading-relaxed text-justify">
            Versatile <strong>Full-Stack &amp; Solutions Developer</strong> and <strong>IT Systems Officer</strong> with 8+ years of cross-industry engineering experience spanning public-sector GovTech standards, enterprise RFID / WMS logistics architecture, and modern web &amp; native mobile applications. Proven track record leading software departments, delivering 10+ national-scale tender initiatives, architecting resilient <strong>n8n AI workflow pipelines</strong>, and developing scalable applications using <strong>Next.js 16, TypeScript, React 19, Kotlin, and Android Native</strong>. Adept at bridging technical implementation with high-level stakeholder management.
          </p>
        </section>

        {/* Core Technical Competencies */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Core Technical Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-3 gap-y-1.5 text-xs">
            <span className="font-bold text-zinc-900">Full-Stack &amp; Web</span>
            <span className="text-zinc-700">TypeScript, Next.js 16 (App Router), React 19, Tailwind CSS v4, Node.js, Prisma ORM, RESTful APIs, SSR/SSG</span>

            <span className="font-bold text-zinc-900">Mobile &amp; Embedded</span>
            <span className="text-zinc-700">Android Native (Kotlin &amp; Java), MVVM &amp; Repository Pattern, Room DB (SQLite), RFID (HF/UHF SDKs), Barcode Scanners, NFC</span>

            <span className="font-bold text-zinc-900">Automation &amp; AI</span>
            <span className="text-zinc-700">n8n (Self-Hosted &amp; Cloud), AI Agent Workflows, Multi-Service Webhooks, REST API Pipelines, Python Automation</span>

            <span className="font-bold text-zinc-900">Databases &amp; DevOps</span>
            <span className="text-zinc-700">PostgreSQL, MySQL, Redis Caching, Docker, Linux VPS, Git / GitHub, CDN &amp; Performance Optimization</span>

            <span className="font-bold text-zinc-900">Systems &amp; Governance</span>
            <span className="text-zinc-700">GovTech IT Systems Governance, IT Project Management (Agile/Scrum, Jira), WMS Architecture, Technical SOPs &amp; Tender Bids</span>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Professional Experience
          </h2>

          <div className="space-y-3.5">
            {/* Kemnaker */}
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Penata Kelola Sistem dan Teknologi Informasi (IT Systems Officer)
                  </span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {' '}&bull; Kementerian Ketenagakerjaan RI (Kemnaker)
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                  May 2025 – Present
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic">
                South Jakarta, Indonesia &bull; Directorate of Binapenta &amp; PKK
              </div>
              <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                <li>Direct internal information systems governance supporting strategic national employment expansion initiatives across directorate work units.</li>
                <li>Pioneer process digitalization and workflow automation pipelines utilizing <strong>n8n</strong> and REST APIs to eliminate inter-directorate communication bottlenecks.</li>
                <li>Author enterprise technical documentation, digital system SOPs, and governance frameworks ensuring operational data integrity and public-sector cybersecurity compliance.</li>
                <li>Spearhead cross-platform data mapping, automated report aggregation, and real-time synchronization feeds with central government databases.</li>
              </ul>
            </div>

            {/* WDS Project Manager */}
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Remote Project Manager (Freelance / Contract)
                  </span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {' '}&bull; PT Wahana Datarindo Sempurna
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                  June 2025 – Nov 2025
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic">
                South Jakarta, Indonesia (Remote)
              </div>
              <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                <li>Directed end-to-end execution of enterprise Warehouse Management Systems (WMS) and RFID-based software infrastructure.</li>
                <li>Served as chief technical liaison aligning corporate stakeholders, distributed software engineering squads, and international hardware vendors.</li>
                <li>Orchestrated sprint cadence and deliverable tracking via Agile/Scrum methodologies using Jira and Trello, achieving 100% milestone on-time delivery.</li>
              </ul>
            </div>

            {/* WDS Head Software */}
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Head of Software Department
                  </span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {' '}&bull; PT Wahana Datarindo Sempurna
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                  June 2023 – June 2025
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic">
                South Jakarta, Indonesia
              </div>
              <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                <li>Led the software engineering department overseeing product discovery, presales architecture, Proof-of-Concept (PoC) builds, and post-deployment SLAs.</li>
                <li>Successfully led technical architecture and administrative proposals for <strong>10+ national-scale enterprise tenders</strong> in RFID asset tracking and logistics.</li>
                <li>Engineered full lifecycle hardware-software integration bridging industrial RFID readers (HF/UHF) with backend databases and custom client software.</li>
              </ul>
            </div>

            {/* WDS Android Developer */}
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Android Developer
                  </span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {' '}&bull; PT Wahana Datarindo Sempurna
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                  July 2022 – June 2023
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic">
                South Jakarta, Indonesia
              </div>
              <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                <li>Developed native Android WMS applications integrated with RFID HF/UHF and handheld laser barcode scanners via vendor SDKs.</li>
                <li>Implemented resilient offline-first architecture with local <strong>Room Database (SQLite)</strong> and background sync via RESTful APIs.</li>
                <li>Architected codebase adhering to MVVM and Repository patterns, reducing crash rates and streamlining on-site warehouse deployments.</li>
              </ul>
            </div>

            {/* SAP Express */}
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Android Developer
                  </span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {' '}&bull; PT Satria Antaran Prima Tbk. (SAP Express)
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                  Jan 2022 – June 2022
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic">
                DKI Jakarta, Indonesia
              </div>
              <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                <li>Engineered mission-critical native Android applications for Digital Wallet, real-time Package Tracking, and courier logistics operations.</li>
                <li>Implemented hardened security mechanisms, session tokens, and cryptographic verification for financial digital wallet transactions.</li>
                <li>Integrated courier devices with central payment gateways and dispatch management APIs across nationwide hubs.</li>
              </ul>
            </div>

            {/* Spekta Cipta Interusa */}
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                    Full-Stack &amp; Web Developer
                  </span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {' '}&bull; PT Spekta Cipta Interusa
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                  March 2020 – Oct 2021
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic">
                Belitung / Remote, Indonesia
              </div>
              <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                <li>Engineered custom web platforms, deploying CDN edge caching, and fine-tuning server load times for sub-second latency.</li>
                <li>Implemented secure user authentication, role-based access control (RBAC), and automated disaster recovery backup pipelines.</li>
              </ul>
            </div>

            {/* Kantor Camat Tanjung Pandan */}
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                    IT Support &amp; Network Technician (Internship)
                  </span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {' '}&bull; Kantor Camat Tanjung Pandan
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                  July 2015 – Sept 2015
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic">
                Belitung, Bangka Belitung, Indonesia
              </div>
              <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700">
                <li>Designed and deployed local area network (LAN &amp; Wi-Fi) infrastructure across office work units, establishing stable internet connectivity for sub-district government operations.</li>
                <li>Installed and configured network hardware including routers, access points, network switches, UTP cabling (crimping RJ45), and local IP address distribution.</li>
                <li>Provided front-line technical support, hardware troubleshooting (PCs, laptops, printers), and operating system maintenance for government personnel.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Featured Engineering Projects */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Key Featured Engineering Projects
          </h2>
          <div className="space-y-2.5">
            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs">GovTech Process Digitization &amp; n8n Data Pipeline</span>
                  <span className="text-blue-600 font-semibold text-xs"> &bull; Workflow Automation &amp; AI</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">PostgreSQL &bull; n8n &bull; REST APIs &bull; Python</span>
              </div>
              <p className="text-xs text-zinc-700 mt-0.5">
                Built automated workflow pipelines eliminating administrative tracking lag across government employment expansion programs. Integrated automated data validation, inter-departmental notification feeds, and multi-directorate reporting.
              </p>
            </div>

            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs">Enterprise WMS &amp; RFID Asset Tracking Solution</span>
                  <span className="text-blue-600 font-semibold text-xs"> &bull; Systems &amp; Mobile</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">Android Kotlin &bull; RFID HF/UHF &bull; Room DB &bull; MVVM</span>
              </div>
              <p className="text-xs text-zinc-700 mt-0.5">
                Constructed an end-to-end WMS client application deployed across 10+ major national logistics tenders. Features real-time handheld UHF tag scanning, offline-first caching, and high-throughput server synchronization.
              </p>
            </div>

            <div className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-zinc-950 text-xs">Cloud Operations &amp; High-Throughput Platform</span>
                  <span className="text-blue-600 font-semibold text-xs"> &bull; Full-Stack Web</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">Next.js 16 &bull; TypeScript &bull; React 19 &bull; Prisma</span>
              </div>
              <p className="text-xs text-zinc-700 mt-0.5">
                Designed a high-throughput management platform utilizing Next.js 16 App Router, Prisma ORM, and Tailwind CSS. Implemented edge caching, server actions, and type-safe database schemas with sub-second response times.
              </p>
            </div>
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
                Professional Certifications (43+ Verified)
              </h2>
              <ul className="space-y-1 text-xs text-zinc-700">
                <li>&bull; <strong>Deploy Multi-Agent Architectures &amp; ADK</strong> &mdash; Google (2026)</li>
                <li>&bull; <strong>DIGDAYA Practitioner Phase</strong> &mdash; LPPI (2026)</li>
                <li>&bull; <strong>Fundamental Deep Learning &amp; Gen AI</strong> &mdash; Dicoding (2026)</li>
                <li>&bull; <strong>Cloud Practitioner Essentials (AWS)</strong> &mdash; AWS / Dicoding</li>
                <li>&bull; <strong>Oracle Java Programming</strong> &mdash; Oracle Academy</li>
                <li>&bull; <strong>Internet of Things (IoT)</strong> &mdash; Digital Talent Scholarship</li>
                <li className="text-[10px] text-zinc-500 italic pt-0.5">&bull; + 37 additional verified credentials in AI, Cloud, Mobile &amp; Systems (details on web portfolio).</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
