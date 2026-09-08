export type ResumeVariantId = 'fullstack' | 'android' | 'govtech';

export interface ResumeProject {
  title: string;
  category: string;
  tech: string;
  description: string;
}

export interface ResumeSkillGroup {
  label: string;
  skills: string;
}

export interface ResumeExperience {
  role: string;
  organization: string;
  period: string;
  location: string;
  subLocation?: string;
  description: string[];
  tags: string[];
}

export interface ResumeVariantData {
  id: ResumeVariantId;
  label: string;
  badge: string;
  subtitle: string;
  targetRole: string;
  professionalTitle: string;
  professionalSummary: string;
  competencies: ResumeSkillGroup[];
  experiences: ResumeExperience[];
  featuredProjects: ResumeProject[];
  certificationsHighlight: string[];
}

export const resumeVariants: Record<ResumeVariantId, ResumeVariantData> = {
  fullstack: {
    id: 'fullstack',
    label: 'Full-Stack & Solutions',
    badge: 'Web, SaaS & Cloud',
    subtitle: 'Optimized for Full-Stack, Web Engineering, TypeScript/Next.js & SaaS Roles',
    targetRole: 'Full-Stack Software Engineer / Solutions Developer',
    professionalTitle: 'Full-Stack Solutions Developer | TypeScript, Next.js 16, React 19, PostgreSQL & Cloud Systems',
    professionalSummary:
      'High-impact **Full-Stack & Solutions Developer** with 8+ years of engineering experience architecting scalable web applications, distributed APIs, and resilient data systems. Proficient in **TypeScript, Next.js 16 (App Router), React 19, Node.js, Prisma ORM, and PostgreSQL**, with a proven record of building high-throughput cloud platforms and optimizing query latencies to sub-second benchmarks. Experienced in bridging full-stack systems with **AI-powered development tools, workflow automations (n8n)**, and native mobile clients. Recognized for autonomous technical leadership and end-to-end product delivery in fast-paced environments.',
    competencies: [
      {
        label: 'Full-Stack & Web',
        skills: 'TypeScript, JavaScript (ESNext), Next.js 16 (App Router), React 19, Tailwind CSS v4, Node.js, Express, RESTful APIs, Server Actions, SSR/SSG',
      },
      {
        label: 'Database & ORM',
        skills: 'PostgreSQL, MySQL, Prisma ORM, Redis Caching, SQLite / Room DB, Schema Migrations, Query Optimization',
      },
      {
        label: 'Cloud, DevOps & SRE',
        skills: 'Docker, Linux VPS, CDN & Edge Caching, Git & GitHub Actions, AWS Basics, Google Cloud Platform (GCP), Vercel',
      },
      {
        label: 'AI & Automation',
        skills: 'n8n (Self-Hosted & Cloud), AI Agent Workflows, LLM API Integration, Multi-Service Webhooks, Python Automation',
      },
      {
        label: 'Mobile & Systems',
        skills: 'Android Native (Kotlin & Java), MVVM Architecture, Offline-First Sync, Hardware SDKs (RFID/Barcode)',
      },
    ],
    experiences: [
      {
        role: 'Full-Stack Solutions Developer & IT Systems Officer',
        organization: 'Kementerian Ketenagakerjaan RI (Kemnaker)',
        period: 'May 2025 – Present',
        location: 'South Jakarta, Indonesia',
        subLocation: 'Directorate of Binapenta & PKK',
        description: [
          'Architected and deployed internal data platforms and automated REST API pipelines integrating multiple work units, eliminating communication bottlenecks across national employment programs.',
          'Spearheaded modern web dashboard development and n8n backend data synchronization pipelines connecting centralized PostgreSQL databases with regional work units.',
          'Enforced data integrity, enterprise security protocols, and comprehensive API documentation adhering to public-sector cybersecurity standards.',
          'Engineered automated data validation and aggregation workflows, reducing manual report compilation time by over 80%.',
        ],
        tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'REST APIs', 'n8n Automation', 'Data Governance'],
      },
      {
        role: 'Remote Project Manager & Technical Consultant',
        organization: 'PT Wahana Datarindo Sempurna',
        period: 'June 2025 – Nov 2025',
        location: 'South Jakarta, Indonesia (Remote)',
        description: [
          'Directed end-to-end engineering deliverables for distributed web & mobile systems using Agile/Scrum methodologies across remote multidisciplinary teams.',
          'Reviewed full-stack architectural proposals, API contracts, and database schemas to ensure sub-second response times and 100% milestone on-time delivery.',
          'Bridged technical requirements between corporate enterprise stakeholders, software engineers, and cloud infrastructure vendors.',
        ],
        tags: ['Agile / Scrum', 'Jira', 'API Architecture', 'Technical Consulting', 'Remote Leadership'],
      },
      {
        role: 'Head of Software Department',
        organization: 'PT Wahana Datarindo Sempurna',
        period: 'June 2023 – June 2025',
        location: 'South Jakarta, Indonesia',
        description: [
          'Led the software department in designing full-stack client-server architectures, Proof-of-Concept (PoC) platforms, and enterprise software solutions.',
          'Architected the backend and integration layers for 10+ major national-scale tender platforms, handling high-throughput sensor and inventory transaction data.',
          'Supervised code reviews, CI/CD deployment routines, and database schema migrations across relational database environments (PostgreSQL / MySQL).',
        ],
        tags: ['System Architecture', 'Software Leadership', 'PostgreSQL', 'Client-Server Systems', 'Tender Delivery'],
      },
      {
        role: 'Full-Stack & Web Developer',
        organization: 'PT Spekta Cipta Interusa',
        period: 'March 2020 – Oct 2021',
        location: 'Belitung / Remote, Indonesia',
        description: [
          'Developed custom web applications and content management platforms, fine-tuning server configurations and CDN edge caching for sub-second page loads.',
          'Engineered hardened user authentication, RBAC (role-based access control), and automated backup recovery pipelines.',
        ],
        tags: ['Full-Stack Web', 'CDN Edge Caching', 'Database Optimization', 'Web Security'],
      },
      {
        role: 'Android Developer (Logistics & Digital Wallet)',
        organization: 'PT Satria Antaran Prima Tbk. (SAP Express)',
        period: 'Jan 2022 – June 2022',
        location: 'DKI Jakarta, Indonesia',
        description: [
          'Integrated native mobile clients with central backend payment gateways, dispatch APIs, and tracking microservices.',
          'Implemented cryptographic signature validation and secure session token handling for digital wallet transactions.',
        ],
        tags: ['API Integration', 'Payment Gateways', 'Security & Cryptography', 'High-Volume Transactions'],
      },
    ],
    featuredProjects: [
      {
        title: 'Cloud Operations & High-Throughput Data Platform',
        category: 'Full-Stack Web & SaaS',
        tech: 'Next.js 16 • TypeScript • React 19 • Prisma ORM • PostgreSQL • Tailwind CSS v4',
        description:
          'Constructed a modern, type-safe management platform featuring server-side rendering (SSR), edge caching, and automated database migrations. Achieved sub-second query latency across complex relational data structures.',
      },
      {
        title: 'GovTech Enterprise Process Digitization & Data Pipeline',
        category: 'Data Engineering & API Integration',
        tech: 'TypeScript • PostgreSQL • REST APIs • n8n • Python • Webhooks',
        description:
          'Engineered end-to-end data synchronization pipelines and API connectors eliminating manual paperwork across government work units. Automated cross-directorate data validation and report aggregation.',
      },
      {
        title: 'Enterprise WMS Client-Server Architecture',
        category: 'Distributed Systems',
        tech: 'Next.js • PostgreSQL • Android Kotlin • Room DB • RESTful APIs',
        description:
          'Engineered an enterprise warehouse management system bridging handheld scanner clients with central databases via high-throughput REST APIs and offline-first caching.',
      },
    ],
    certificationsHighlight: [
      'Deploy Multi-Agent Architectures & ADK — Google (2026)',
      'Create Your First Gemini Enterprise Application — Google (2026)',
      'Belajar Membuat Back-End dengan Google Cloud & AWS — Dicoding (2026)',
      'Belajar Prinsip Pemrograman SOLID & Spec-Driven Development — Dicoding (2026)',
      'Cloud Practitioner Essentials (AWS) — AWS / Dicoding',
      'Oracle Java Programming & Java Fundamentals — Oracle Academy',
    ],
  },

  android: {
    id: 'android',
    label: 'Android & Mobile AI',
    badge: 'Kotlin, Coroutines & AI',
    subtitle: 'Optimized for Android Software Engineer, Mobile AI & Kotlin Specialist Roles',
    targetRole: 'Android Software Engineer / Mobile Developer (Kotlin)',
    professionalTitle: 'Android Software Engineer | Kotlin, Coroutines/Flow, MVVM, Room DB & AI Feature Integrations',
    professionalSummary:
      'Accomplished **Android Software Engineer** with 3+ years of dedicated native Android engineering and 8+ years of broader software systems experience. Deeply skilled in **Kotlin, Android Jetpack, MVVM + Repository Pattern, Coroutines, StateFlow/SharedFlow, and Room Database (SQLite)**. Proven track record shipping production-grade applications for nationwide logistics fleets, financial **Digital Wallet** suites, and enterprise Warehouse Management Systems (WMS). Specialized in building **resilient offline-first architectures**, low-latency background synchronization, hardware SDK integrations (RFID/Barcode), and integrating **AI features (streaming LLM responses, vision, and speech APIs)** for next-generation mobile user experiences.',
    competencies: [
      {
        label: 'Android Core & Architecture',
        skills: 'Kotlin, Java, MVVM, Clean Architecture, Repository Pattern, Android Jetpack (Navigation, LiveData, ViewModel, Room, WorkManager)',
      },
      {
        label: 'Asynchronous & Reactive',
        skills: 'Kotlin Coroutines, Kotlin Flow (StateFlow / SharedFlow), Reactive Streams, Background Workers, Concurrency Management',
      },
      {
        label: 'Storage & Offline-First',
        skills: 'Room Database (SQLite), Offline-First Caching, Bi-Directional Sync, DataStore, SharedPreferences, Conflict Resolution',
      },
      {
        label: 'Networking & AI Integration',
        skills: 'Retrofit, OkHttp, RESTful APIs, SSE / Streaming Responses, WebSockets, Generative AI / LLM API Integration, MLKit',
      },
      {
        label: 'Security & Hardware SDKs',
        skills: 'Digital Wallet Security, Cryptographic Session Auth, Payment Gateways, RFID (HF/UHF SDKs), Barcode Laser Scanners, NFC',
      },
    ],
    experiences: [
      {
        role: 'Android Developer (WMS & RFID Hardware Integration)',
        organization: 'PT Wahana Datarindo Sempurna',
        period: 'July 2022 – June 2023',
        location: 'South Jakarta, Indonesia',
        description: [
          'Engineered native Android Warehouse Management System (WMS) client applications deployed on industrial rugged handheld devices across major enterprise logistics facilities.',
          'Integrated hardware vendor SDKs for UHF/HF RFID tag reading and laser barcode scanning, ensuring sub-50ms scanning response times in high-volume environments.',
          'Designed a resilient offline-first architecture utilizing Room Database (SQLite) and Coroutines-driven background synchronization via REST APIs, eliminating data loss during warehouse dead-zones.',
          'Implemented MVVM + Repository architecture, reducing app crash rates to under 0.1% and significantly speeding up UI rendering performance.',
        ],
        tags: ['Android Kotlin', 'MVVM', 'Room DB', 'Coroutines', 'RFID HF/UHF SDK', 'Offline-First'],
      },
      {
        role: 'Android Developer (Digital Wallet & Courier Logistics)',
        organization: 'PT Satria Antaran Prima Tbk. (SAP Express)',
        period: 'Jan 2022 – June 2022',
        location: 'DKI Jakarta, Indonesia',
        description: [
          'Developed and launched critical native Android modules for Courier Dispatch, real-time Package Tracking, and the internal enterprise Digital Wallet.',
          'Implemented hardened client-side financial security: cryptographic token verification, PIN/Biometric auth, and tamper-resistant transaction payloads.',
          'Integrated third-party payment gateways and central logistics routing APIs with comprehensive network retry logic and graceful error handling.',
          'Optimized memory usage and battery consumption for courier devices running GPS-tracking services continuously throughout 10+ hour shifts.',
        ],
        tags: ['Android Java/Kotlin', 'Digital Wallet', 'Payment Gateway', 'Security', 'Battery/Memory Profiling'],
      },
      {
        role: 'Head of Software Department (Mobile & Enterprise Systems)',
        organization: 'PT Wahana Datarindo Sempurna',
        period: 'June 2023 – June 2025',
        location: 'South Jakarta, Indonesia',
        description: [
          'Oversaw mobile application engineering standards, code reviews, and hardware-software integration across 10+ national-scale enterprise tender implementations.',
          'Defined mobile client-server API contracts (RESTful/JSON) with backend engineering teams, standardizing data serialization and authentication schemas.',
          'Conducted performance profiling, memory leak detection, and network payload optimizations for enterprise mobile deployments.',
        ],
        tags: ['Mobile Leadership', 'API Contracts', 'Performance Profiling', 'Code Review', 'Enterprise Delivery'],
      },
      {
        role: 'IT Systems Officer & AI Workflow Integrator',
        organization: 'Kementerian Ketenagakerjaan RI (Kemnaker)',
        period: 'May 2025 – Present',
        location: 'South Jakarta, Indonesia',
        description: [
          'Spearheaded AI workflow automations and REST API data pipelines, researching agentic architectures and streaming data synchronization.',
          'Authored comprehensive system specifications, API documentation, and mobile client interface standards for government digital initiatives.',
        ],
        tags: ['AI Integration', 'REST APIs', 'Data Synchronization', 'System Architecture'],
      },
    ],
    featuredProjects: [
      {
        title: 'Enterprise WMS & RFID Mobile Scanner Suite',
        category: 'Android Native Application',
        tech: 'Kotlin • MVVM • Room DB • Coroutines & Flow • Retrofit • RFID HF/UHF SDK • Barcode SDK',
        description:
          'Constructed a production-grade Android application deployed across 10+ national tender operations. Features real-time handheld UHF RFID tag reading, offline-first local database caching, and high-throughput server synchronization.',
      },
      {
        title: 'SAP Express Logistics & Digital Wallet Mobile App',
        category: 'FinTech & Logistics Mobile',
        tech: 'Android (Java/Kotlin) • Digital Wallet • Cryptographic Auth • Payment Gateway • GPS Tracking',
        description:
          'Engineered mission-critical mobile features including secure digital wallet transactions, parcel barcode scanning, and real-time delivery milestone updates for nationwide courier fleets.',
      },
      {
        title: 'AI-Powered Assistant & Streaming Mobile Client (PoC)',
        category: 'Mobile AI & Reactive UI',
        tech: 'Kotlin • StateFlow • Coroutines • Server-Sent Events (SSE) • Gemini API • Jetpack',
        description:
          'Implemented reactive mobile client interactions consuming generative AI endpoints via streaming responses (Flow), complete with offline retry queue, partial response rendering, and network latency resilience.',
      },
    ],
    certificationsHighlight: [
      'Belajar Penerapan Machine Learning untuk Flutter & Mobile — Dicoding (2026)',
      'Pengembangan Generative AI berbasis LLM — Dicoding (2026)',
      'Dasar-dasar Mobile Programming Android dan Kotlin — Skill Academy',
      'Mastering Mobile Programming Android — Skill Academy',
      'Kotlin from Zero to Hero & Memulai Pemrograman Dengan Kotlin — Udacoding / Dicoding',
      'Belajar Prinsip Pemrograman SOLID — Dicoding (2026)',
    ],
  },

  govtech: {
    id: 'govtech',
    label: 'GovTech & AI Automation',
    badge: 'GovTech, n8n & Leadership',
    subtitle: 'Optimized for IT Systems Officer, Digital Transformation & AI Workflow Specialist Roles',
    targetRole: 'IT Systems Officer / AI Automation Architect / Project Lead',
    professionalTitle: 'IT Systems Officer & AI Automation Architect | GovTech Governance, n8n Pipelines & Project Leadership',
    professionalSummary:
      'Strategic **IT Systems Officer, Solutions Developer, and Project Leader** with 8+ years of cross-functional experience directing public-sector GovTech modernization, enterprise logistics software, and **AI workflow automations**. Currently serving as **Penata Kelola Sistem dan Teknologi Informasi** at the Ministry of Manpower of the Republic of Indonesia (Kemnaker), pioneering end-to-end process digitalization using **n8n, AI Agent architectures, and REST API pipelines**. Proven track record successfully leading 10+ national-scale enterprise tender deliveries, managing distributed agile teams, and formulating rigorous technical SOPs, data governance frameworks, and cybersecurity standards.',
    competencies: [
      {
        label: 'Automation & AI Workflows',
        skills: 'n8n (Self-Hosted & Cloud Pipelines), Multi-Agent Orchestration (Google ADK), Generative AI & LLM Integration, Webhooks, Python Scripting',
      },
      {
        label: 'Systems Governance & GovTech',
        skills: 'GovTech Information Systems, National Employment Expansion Platforms, Data Governance, Public-Sector Cybersecurity, SOP Authoring',
      },
      {
        label: 'Project & Tender Leadership',
        skills: 'IT Project Management (Agile, Scrum, Jira, Trello), 10+ National Tender Proposals & PoC Delivery, Vendor & Hardware Management',
      },
      {
        label: 'Software & Database Systems',
        skills: 'PostgreSQL, MySQL, Prisma ORM, Next.js 16, TypeScript, RESTful API Architecture, Linux VPS, Docker',
      },
      {
        label: 'Enterprise Logistics & Hardware',
        skills: 'Warehouse Management Systems (WMS), RFID (HF/UHF) Infrastructure, Barcode Solutions, Asset Tracking & Audit Trails',
      },
    ],
    experiences: [
      {
        role: 'Penata Kelola Sistem dan Teknologi Informasi (IT Systems Officer)',
        organization: 'Kementerian Ketenagakerjaan RI (Kemnaker)',
        period: 'May 2025 – Present',
        location: 'South Jakarta, Indonesia',
        subLocation: 'Directorate of Binapenta & PKK – Subbagian Tata Usaha',
        description: [
          'Direct internal information systems governance and technology infrastructure supporting strategic national employment expansion initiatives.',
          'Pioneered enterprise workflow automation pipelines utilizing n8n and REST APIs, eliminating multi-directorate data tracking delays and communication bottlenecks.',
          'Authored comprehensive digital system Standard Operating Procedures (SOPs), technical architectures, and data security governance frameworks.',
          'Spearheaded automated cross-platform data aggregation feeds and real-time visualization dashboards for executive decision-makers.',
        ],
        tags: ['GovTech', 'n8n Automation', 'Data Governance', 'System SOPs', 'Cross-Directorate Sync'],
      },
      {
        role: 'Remote Project Manager (Freelance / Contract)',
        organization: 'PT Wahana Datarindo Sempurna',
        period: 'June 2025 – Nov 2025',
        location: 'South Jakarta, Indonesia (Remote)',
        description: [
          'Led end-to-end execution of enterprise WMS and hardware-integrated software projects, maintaining 100% on-time milestone delivery.',
          'Served as chief technical liaison aligning corporate C-level stakeholders, distributed software engineering squads, and international hardware vendors.',
          'Enforced agile sprint planning, scope management, and risk mitigation using Jira and Trello across distributed remote teams.',
        ],
        tags: ['IT Project Management', 'Agile / Scrum', 'Jira', 'Stakeholder Alignment', 'Risk Mitigation'],
      },
      {
        role: 'Head of Software Department',
        organization: 'PT Wahana Datarindo Sempurna',
        period: 'June 2023 – June 2025',
        location: 'South Jakarta, Indonesia',
        description: [
          'Steered the entire software division from client discovery, presales architecture, and Proof-of-Concept (PoC) builds to commercial rollout and SLA maintenance.',
          'Successfully spearheaded technical architecture and administrative proposals for 10+ national-scale tenders in RFID asset tracking and supply chain logistics.',
          'Built end-to-end hardware-software interoperability standards bridging industrial RFID/Barcode readers with relational databases and custom client suites.',
        ],
        tags: ['Software Leadership', '10+ National Tenders', 'RFID Systems', 'Presales & PoC', 'Enterprise Architecture'],
      },
      {
        role: 'Android Developer (Logistics & Digital Wallet)',
        organization: 'PT Satria Antaran Prima Tbk. (SAP Express)',
        period: 'Jan 2022 – June 2022',
        location: 'DKI Jakarta, Indonesia',
        description: [
          'Architected and implemented enterprise mobile applications for courier dispatch, digital wallet transactions, and nationwide package tracking.',
          'Ensured rigorous transactional security and cryptographic token verification for courier financial modules.',
        ],
        tags: ['Digital Wallet', 'Logistics Infrastructure', 'Payment Security', 'Mobile Engineering'],
      },
    ],
    featuredProjects: [
      {
        title: 'GovTech Process Digitization & n8n Automation Pipeline',
        category: 'GovTech & Workflow Automation',
        tech: 'n8n • PostgreSQL • REST APIs • Python • Multi-Service Webhooks • GovTech',
        description:
          'Constructed automated data validation and report aggregation pipelines eliminating manual paperwork across ministry directorates. Synchronized disparate database silos with zero data loss.',
      },
      {
        title: 'National Enterprise WMS & RFID Asset Tracking Deployment',
        category: 'Enterprise Systems & Logistics',
        tech: 'RFID HF/UHF • Android Kotlin • Room DB • PostgreSQL • MVVM • Hardware SDKs',
        description:
          'Delivered an enterprise-grade tracking and warehouse management solution deployed across 10+ major national tender projects. Automated inventory reconciliation and real-time asset visibility.',
      },
      {
        title: 'Cloud Operations & Multi-Directorate Dashboard',
        category: 'Data Platform & Full-Stack Web',
        tech: 'Next.js 16 • TypeScript • React 19 • Prisma ORM • PostgreSQL • CDN Caching',
        description:
          'Designed a high-throughput management dashboard for operational data monitoring, featuring type-safe API actions, sub-second query performance, and role-based security.',
      },
    ],
    certificationsHighlight: [
      'DIGDAYA Practitioner Phase — LPPI (Lembaga Pengembangan Perbankan Indonesia, 2026)',
      'Deploy Multi-Agent Architectures & ADK — Google (2026)',
      'Orchestrate Multi-agent Workflows with Gemini Enterprise — Google (2026)',
      'Belajar Dasar Manajemen Proyek — Dicoding (2026)',
      'Prompt Engineering untuk Software Developer — Dicoding (2026)',
      'Internet of Things (IoT) — Digital Talent Scholarship Kominfo (2019)',
    ],
  },
};
