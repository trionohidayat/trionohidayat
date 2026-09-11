export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'automation' | 'systems';
  categoryLabel: string;
  impact: string;
  problem: string;
  solution: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  vercelSlug?: string;
  isLive?: boolean;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
  details: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  category: 'ai' | 'cloud' | 'mobile' | 'web' | 'engineering' | 'leadership';
}

export const portfolioData = {
  personal: {
    name: "Triono Hidayat",
    title: "GovTech & Full-Stack Solutions Developer",
    secondaryTitle: "IT Systems Officer | AI & Workflow Automation (n8n) | RFID & Mobile Specialist",
    headline: "Turning Complex Workflows into High-Performance Web & Mobile Solutions",
    subheadline:
      "Bridging public-sector GovTech standards, RFID/WMS logistics engineering, and modern Next.js & Android development for global businesses.",
    about:
      "I am an IT Systems Officer, Solutions Developer, and Project Manager with extensive cross-industry experience spanning enterprise GovTech, RFID & Warehouse Management Systems (WMS), and native Android application development. Currently serving as Penata Kelola Sistem dan Teknologi Informasi at the Ministry of Manpower of the Republic of Indonesia (Kemnaker), I focus on process digitalization, AI workflow automation (n8n), and scalable software systems. As an independent remote consultant and freelance project manager, I lead cross-functional initiatives and build high-performance, resilient digital solutions for international clients.",
    status: "Available for Remote Freelance & Contract Projects",
    location: "Jakarta, Indonesia (UTC+7) • Working Worldwide",
    avatarUrl: "/profile.png",
    resumeUrl: "/resume_triono-hidayat.pdf",
    yearsOfExperience: "8+",
    completedProjects: "25+",
    hoursAutomated: "2,000+",
  },

  contacts: {
    email: "trionohidayat3@gmail.com",
    whatsappRaw: "6287788084441",
    whatsappUrl:
      "https://wa.me/6287788084441?text=Hello%20Triono,%20I'd%20like%20to%20discuss%20a%20freelance%20project%20with%20you.",
    whatsappNumber: "+62 877-8808-4441",
    linkedin: "https://www.linkedin.com/in/triono-hidayat",
    github: "https://github.com/trionohidayat",
    youtube: "https://youtube.com/@triono.hidayat",
  },

  services: [
    {
      id: "automation",
      title: "Workflow Automation (n8n) & AI",
      iconName: "Cpu",
      description:
        "Architecting resilient workflow automations and data pipelines using n8n, AI agents, and webhooks to eliminate repetitive administrative overhead and synchronize cross-platform data.",
      highlights: [
        "End-to-End n8n Workflow Design (Self-Hosted & Cloud)",
        "AI Agent & Generative AI Integration",
        "Multi-Service Webhooks & REST API Data Pipelines",
        "GovTech & Enterprise Process Digitization",
      ],
    },
    {
      id: "mobile-dev",
      title: "Mobile & RFID Solutions",
      iconName: "Smartphone",
      description:
        "Engineering high-performance native Android applications with Java and Kotlin, featuring offline-first capabilities, Room DB, and deep hardware integrations (RFID, NFC, Barcode).",
      highlights: [
        "Native Android Development with Kotlin & Java (MVVM)",
        "Hardware Integration: RFID (HF/UHF), Barcode Scanners, NFC",
        "Offline-First Architecture with Local SQLite / Room Database",
        "Warehouse Management System (WMS) & Logistics Apps",
      ],
    },
    {
      id: "web-dev",
      title: "Full-Stack Web Development",
      iconName: "Globe",
      description:
        "Building fast, modern, and SEO-optimized web applications and SaaS dashboards using TypeScript, Next.js 16, React 19, Tailwind CSS, and Prisma ORM.",
      highlights: [
        "Modern Stack: Next.js 16 (App Router), React 19, TypeScript",
        "Database Modeling with Prisma ORM & PostgreSQL / MySQL",
        "Server-Side Rendering (SSR) & High-Speed API Routes",
        "CDN, Caching & Performance Architecture",
      ],
    },
    {
      id: "it-consulting",
      title: "IT Systems & Project Management",
      iconName: "Layers",
      description:
        "Guiding digital initiatives from initial technical proposals and PoC to deployment. Proven track record leading cross-functional teams, hardware vendors, and national-scale tenders.",
      highlights: [
        "Agile Project Leadership (Jira, Trello, Remote Management)",
        "Technical Documentation, System SOPs & Tender Proposals",
        "Hardware-Software Interoperability & Risk Mitigation",
        "Data Governance & Operational Integrity",
      ],
    },
  ] as Service[],

  projects: [
    {
      id: "tok2tube-automation",
      title: "Tok2Tube – Video Ingestion & Multi-Platform Pipeline",
      category: "automation",
      categoryLabel: "Media Automation",
      impact: "10x Faster Publishing Speed",
      problem:
        "Cross-posting and archiving short-form videos across creator platforms required hours of manual downloading, metadata conversion, and redundant upload tasks.",
      solution:
        "Architected an automated asynchronous pipeline leveraging Next.js, Python, YouTube Data API v3, and media processing workers to extract, optimize, and distribute video assets automatically.",
      techStack: ["Next.js", "TypeScript", "Python", "YouTube API v3", "FastAPI", "Tailwind CSS"],
      demoUrl: "https://tok2tube.vercel.app",
      vercelSlug: "tok2tube",
      isLive: true,
      githubUrl: "https://github.com/trionohidayat/tok2tube",
    },
    {
      id: "nusataway-platform",
      title: "Nusataway – Island Tours & Travel Discovery Platform",
      category: "web",
      categoryLabel: "Travel & Tourism Tech",
      impact: "Interactive Tour Booking & Discovery",
      problem:
        "Travelers in regional destinations struggled to discover curated tour packages, customized itineraries, and authentic local experiences with seamless digital booking.",
      solution:
        "Engineered a high-performance, mobile-first travel web application using Next.js with optimized PageSpeed, dynamic package filtering, and responsive booking inquiries.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO Engine", "Edge Hosting"],
      demoUrl: "https://nusataway.vercel.app",
      vercelSlug: "nusataway",
      isLive: true,
      githubUrl: "https://github.com/trionohidayat/nusataway",
    },
    {
      id: "mentorhub-platform",
      title: "MentorHub – Collaborative Mentorship & Learning Platform",
      category: "web",
      categoryLabel: "Full-Stack EdTech",
      impact: "Real-Time Scheduling & Roadmaps",
      problem:
        "Independent developers and learners lacked an integrated workspace to book structured 1-on-1 mentoring sessions, track competency roadmaps, and review milestone progress.",
      solution:
        "Constructed a modern responsive web platform using Next.js, TypeScript, PostgreSQL, and Prisma ORM with automated calendar booking and notification flows.",
      techStack: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
      demoUrl: "https://mentorhub-puce.vercel.app",
      vercelSlug: "mentorhub",
      isLive: true,
      githubUrl: "https://github.com/trionohidayat/mentorhub",
    },
    {
      id: "cuci-ac-belitung",
      title: "Cuci AC Belitung – On-Demand Air Conditioning Platform",
      category: "web",
      categoryLabel: "Service On-Demand",
      impact: "Instant Service Booking & Dispatch",
      problem:
        "Residential and corporate customers in Belitung needed an effortless digital booking platform for air conditioning maintenance and transparent technician dispatch.",
      solution:
        "Developed a modern on-demand service web application with Next.js featuring direct WhatsApp API integration, pricing calculator, and streamlined technician scheduling.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API", "Edge Hosting"],
      demoUrl: "https://cuci-ac-belitung.vercel.app",
      vercelSlug: "cuci-ac-belitung-next",
      isLive: true,
    },
    {
      id: "black-garlic-store",
      title: "Sehat Herbal – Natural Wellness E-Commerce Platform",
      category: "web",
      categoryLabel: "E-Commerce & Health",
      impact: "Direct-to-Consumer Digital Store",
      problem:
        "Traditional herbal health products required a credible, SEO-optimized e-commerce storefront with high conversion rates, product education, and rapid checkout.",
      solution:
        "Built a fast, conversion-focused e-commerce web platform deployed with a custom domain (www.sehatherbal.id), rich product catalog, customer testimonials, and direct ordering.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Custom Domain", "Conversion UX"],
      demoUrl: "https://www.sehatherbal.id",
      vercelSlug: "black-garlic",
      isLive: true,
    },
    {
      id: "belitung-clean-service",
      title: "Belitung Clean – Commercial & Residential Cleaning Platform",
      category: "web",
      categoryLabel: "Facility Management",
      impact: "Automated Service Quotes & Booking",
      problem:
        "Commercial facilities and villa owners in Belitung required reliable, on-demand professional cleaning with instant quotation estimates and booking tracking.",
      solution:
        "Deployed an interactive digital service booking platform on Vercel with responsive rate calculators, automated service confirmations, and mobile-friendly layouts.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel Edge", "Interactive UI"],
      demoUrl: "https://belitung-clean.vercel.app",
      vercelSlug: "belitung-clean",
      isLive: true,
    },
    {
      id: "slangio-api",
      title: "Slangio – Colloquial & Slang Lexicon Edge Service",
      category: "automation",
      categoryLabel: "API & Linguistic Engine",
      impact: "Sub-100ms Linguistic API Queries",
      problem:
        "Modern conversational applications and chatbots needed a high-performance lexicon API to parse colloquial slang, informal language, and contemporary vocabulary.",
      solution:
        "Designed and deployed a serverless Next.js edge backend delivering high-speed RESTful query endpoints, structured linguistic definitions, and low-latency response times.",
      techStack: ["Next.js Edge API", "TypeScript", "RESTful Architecture", "JSON Cache"],
      demoUrl: "https://slangio-backend.vercel.app",
      vercelSlug: "slangio-backend",
      isLive: true,
    },
    {
      id: "govtech-n8n",
      title: "GovTech Process Digitization & n8n Pipeline",
      category: "automation",
      categoryLabel: "Workflow Automation",
      impact: "Multi-Directorate Data Sync",
      problem:
        "Administrative tracking, inter-directorate data synchronization, and reporting across employment expansion initiatives involved fragmented manual workflows and communication bottlenecks.",
      solution:
        "Implemented automated workflow pipelines using n8n and REST APIs to automate data validation, internal report aggregation, and cross-department notification feeds.",
      techStack: ["n8n", "PostgreSQL", "REST API", "Webhooks", "GovTech", "Python"],
      githubUrl: "https://github.com/trionohidayat",
    },
    {
      id: "sap-express-app",
      title: "SAP Express Logistics & Digital Wallet Mobile Suite",
      category: "mobile",
      categoryLabel: "Mobile App",
      impact: "Nationwide Package & Payment Sync",
      problem:
        "Field logistics operations needed real-time package tracking, shipment milestone logging, and a secure internal digital wallet for operational payment transactions.",
      solution:
        "Developed responsive native Android applications featuring robust digital wallet authentication, shipment tracking API integration, and barcode scanning modules.",
      techStack: ["Android (Java/Kotlin)", "Digital Wallet", "REST API", "Package Tracking", "Security"],
      githubUrl: "https://github.com/trionohidayat",
    },
  ] as Project[],

  skills: [
    {
      name: "Top & Full-Stack",
      skills: [
        { name: "TypeScript" },
        { name: "Full-Stack Development" },
        { name: "Prisma ORM" },
        { name: "Next.js 16 (App Router)" },
        { name: "React 19" },
        { name: "Tailwind CSS v4" },
      ],
    },
    {
      name: "Mobile & Embedded",
      skills: [
        { name: "Android Native (Kotlin & Java)" },
        { name: "MVVM + Repository Pattern" },
        { name: "Room Database (SQLite)" },
        { name: "RFID & Barcode SDK Integration" },
        { name: "NFC & Bluetooth Hardware Sync" },
      ],
    },
    {
      name: "Workflow & Automation",
      skills: [
        { name: "n8n (Self-Hosted & Cloud)" },
        { name: "Generative AI Integration" },
        { name: "RESTful APIs & Webhooks" },
        { name: "Internet of Things (IoT)" },
        { name: "Python Scripting" },
      ],
    },
    {
      name: "Database, Cloud & DevOps",
      skills: [
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "Redis Caching" },
        { name: "CDN & Performance Tuning" },
        { name: "Docker & Linux VPS" },
        { name: "Git & GitHub Version Control" },
      ],
    },
    {
      name: "Systems & Project Management",
      skills: [
        { name: "IT Project Management (Agile, Jira, Trello)" },
        { name: "GovTech Information Systems" },
        { name: "Warehouse Management Systems (WMS)" },
        { name: "Technical Documentation & SOPs" },
        { name: "Presales, PoC & Tender Proposals" },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      period: "Mei 2025 – Present",
      role: "Penata Kelola Sistem dan Teknologi Informasi",
      organization: "Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker)",
      location: "South Jakarta, Indonesia",
      description: [
        "Direktorat Bina Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja (Binapenta & PKK) – Subbagian Tata Usaha.",
        "Mengelola dan mengembangkan sistem informasi internal untuk menunjang program-program strategis Perluasan Kesempatan Kerja.",
        "Memelopori digitalisasi proses dan automasi alur kerja (workflow automation) menggunakan platform seperti n8n.",
        "Menyusun dokumentasi teknis, SOP sistem digital, serta memastikan keamanan dan integritas data operasional lintas direktorat.",
        "Mendukung pemetaan data, visualisasi informasi berbasis teknologi, dan sinkronisasi data dengan tim pusat.",
      ],
      tags: ["GovTech", "n8n Automation", "Data Governance", "SOP & Documentation", "Kemnaker"],
    },
    {
      period: "Juni 2025 – November 2025",
      role: "Remote Project Manager (Freelance)",
      organization: "PT Wahana Datarindo Sempurna",
      location: "South Jakarta, Indonesia (Remote)",
      description: [
        "Dipercaya memimpin dan mengawasi pelaksanaan proyek WMS dan sistem berbasis software & RFID secara end-to-end.",
        "Menjadi penghubung utama antara pemangku kepentingan (stakeholders), tim developer, vendor hardware, dan pengguna akhir.",
        "Mengatur ritme kerja tim pengembang jarak jauh dan memantau progres menggunakan metodologi Agile serta alat manajemen proyek (Jira/Trello).",
        "Menjamin kualitas hasil kerja melalui manajemen risiko, pengendalian perubahan, serta sesi evaluasi rutin bersama stakeholder.",
      ],
      tags: ["IT Project Management", "Agile / Scrum", "Jira", "RFID Systems", "WMS"],
    },
    {
      period: "Juni 2023 – Juni 2025",
      role: "Head Software Department",
      organization: "PT Wahana Datarindo Sempurna",
      location: "Jakarta Selatan, Indonesia",
      description: [
        "Menangani seluruh proses digitalisasi dan implementasi teknologi — mulai dari pengenalan produk ke klien, presales/PoC, hingga after-sales support.",
        "Fokus pada perancangan dan implementasi solusi berbasis RFID untuk asset tracking & people monitoring berskala nasional.",
        "Berhasil memimpin dan menangani 10+ tender besar dari sisi teknis arsitektur maupun administratif.",
        "Membangun sistem end-to-end dari perancangan awal hingga implementasi produksi.",
      ],
      tags: ["RFID Solutions", "Asset Tracking", "Tender Proposals", "PoC & Presales", "Software Leadership"],
    },
    {
      period: "Juli 2022 – Juni 2023",
      role: "Android Developer",
      organization: "PT Wahana Datarindo Sempurna",
      location: "South Jakarta, Indonesia",
      description: [
        "Mengembangkan aplikasi Android Warehouse Management System (WMS) terintegrasi dengan teknologi barcode scanner dan RFID (HF/UHF) via SDK vendor.",
        "Mengimplementasikan offline mode dengan sinkronisasi ke server melalui RESTful API dan penyimpanan lokal Room Database.",
        "Menerapkan arsitektur modern MVVM + Repository Pattern untuk pengelolaan kode yang skalabel dan mudah dipelihara.",
        "Melakukan support implementasi langsung dan debugging di lapangan (on-site deployment pergudangan).",
      ],
      tags: ["Android", "Kotlin / Java", "MVVM", "Room DB", "RFID HF/UHF", "WMS"],
    },
    {
      period: "Januari 2022 – Juni 2022",
      role: "Android Developer",
      organization: "PT Satria Antaran Prima Tbk. (SAP Express)",
      location: "DKI Jakarta, Indonesia",
      description: [
        "Merancang dan mengembangkan aplikasi Android untuk kebutuhan Digital Wallet, Package Tracking, dan Warehouse Management.",
        "Menerapkan mekanisme keamanan dan autentikasi kuat untuk transaksi keuangan di dalam modul Digital Wallet.",
        "Mengintegrasikan aplikasi kurir pengiriman dengan payment gateway dan sistem manajemen pengiriman pusat.",
      ],
      tags: ["Android", "Digital Wallet", "Package Tracking", "Payment Integration", "Logistics"],
    },
    {
      period: "November 2021 – Januari 2022",
      role: "Web Developer",
      organization: "Rumah Sakit Pamanukan Medical Center",
      location: "Subang, Jawa Barat, Indonesia",
      description: [
        "Mengembangkan dan mengelola modul aplikasi Sistem Informasi Manajemen Rumah Sakit (SIMRS) untuk mendigitalisasi alur pelayanan medis serta administrasi pasien.",
        "Merancang antarmuka web yang responsif dan mengoptimalkan integrasi basis data untuk pencatatan rekam medis yang cepat, akurat, dan terstruktur.",
        "Menjaga keandalan sistem, efisiensi query basis data, serta penerapan kontrol hak akses guna melindungi kerahasiaan data rekam medis pasien.",
      ],
      tags: ["Web Development", "SIMRS", "Healthcare Systems", "Database Management", "Web Application"],
    },
    {
      period: "Maret 2020 – Oktober 2021",
      role: "WordPress Developer",
      organization: "PT Spekta Cipta Interusa",
      location: "Belitung, Kepulauan Bangka Belitung, Indonesia",
      description: [
        "Mengembangkan dan menerapkan Content Delivery Network (CDN) serta sistem caching untuk mereduksi latency dan mengoptimalkan kecepatan website.",
        "Membangun sistem login yang aman untuk melindungi data pengguna dan mencegah unauthorized access.",
        "Mengimplementasikan backup system otomatis untuk memastikan integritas data dan disaster recovery cepat saat terjadi outage.",
      ],
      tags: ["WordPress", "CDN", "Caching Optimization", "Web Security", "Backup & Recovery"],
    },
    {
      period: "Juli 2015 – September 2015",
      role: "IT Support & Network Technician (Magang)",
      organization: "Kantor Camat Tanjung Pandan",
      location: "Belitung, Kepulauan Bangka Belitung, Indonesia",
      description: [
        "Merancang dan membangun infrastruktur jaringan lokal (LAN & Wi-Fi) di lingkungan kantor camat untuk menunjang kelancaran koneksi internet dan koordinasi kerja aparatur pemerintah.",
        "Melakukan instalasi dan konfigurasi perangkat keras jaringan (router, switch, access point), penarikan dan crimping kabel UTP RJ45, serta pengelolaan alokasi IP address.",
        "Memberikan layanan IT Support harian, perbaikan dan pemeliharaan perangkat komputer (PC/laptop, printer), serta troubleshooting sistem operasi dan aplikasi perkantoran.",
      ],
      tags: ["IT Support", "Network Infrastructure", "LAN / Wi-Fi Setup", "Hardware & Troubleshooting", "Router & Switch Configuration"],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "Strata I (S1) – Teknik Informatika",
      institution: "STMIK Nusa Mandiri",
      location: "Jakarta, Indonesia",
      year: "2017 – 2019",
      details:
        "Fokus pada rekayasa perangkat lunak, sistem basis data, arsitektur komputasi, dan pengembangan solusi teknologi informasi modern.",
    },
    {
      degree: "Diploma III (D3) – Teknik Komputer",
      institution: "Universitas Bina Sarana Informatika (BSI)",
      location: "Jakarta, Indonesia",
      year: "2013 – 2016",
      details:
        "Fondasi komprehensif dalam arsitektur perangkat keras komputer, jaringan, troubleshooting sistem, dan pemrograman dasar.",
    },
  ] as EducationItem[],

  certifications: [
    // 2026 - AI & Cloud Specializations
    {
      title: "DIGDAYA Practitioner Phase",
      issuer: "LPPI (Lembaga Pengembangan Perbankan Indonesia)",
      year: "Agu 2026",
      credentialId: "efc242ec-4b01-41f4-a13c-db603b2aeddd",
      category: "leadership",
    },
    {
      title: "Belajar Penerapan Machine Learning dengan Google Cloud",
      issuer: "Dicoding Indonesia",
      year: "Agu 2026",
      credentialId: "6RPN7MD9SX2M",
      category: "ai",
    },
    {
      title: "Deploy Multi-Agent Architectures",
      issuer: "Google",
      year: "Jul 2026",
      category: "ai",
    },
    {
      title: "Engineer AI Agents with Agent Development Kit (ADK)",
      issuer: "Google",
      year: "Jul 2026",
      category: "ai",
    },
    {
      title: "Orchestrate Multi-agent Workflows with Gemini Enterprise",
      issuer: "Google",
      year: "Jul 2026",
      category: "ai",
    },
    {
      title: "Create Your First Gemini Enterprise Application",
      issuer: "Google",
      year: "Jul 2026",
      category: "ai",
    },
    {
      title: "Belajar Fundamental Deep Learning",
      issuer: "Dicoding Indonesia",
      year: "Jul 2026",
      credentialId: "81P2004OZOY",
      category: "ai",
    },
    {
      title: "Belajar Fundamental Generative AI",
      issuer: "Dicoding Indonesia",
      year: "Jul 2026",
      credentialId: "L4PQ9NWJ7P01",
      category: "ai",
    },
    {
      title: "Belajar Penerapan Machine Learning untuk Flutter",
      issuer: "Dicoding Indonesia",
      year: "Jul 2026",
      credentialId: "0LZOYLLJQJX65",
      category: "ai",
    },
    {
      title: "Membangun Sistem Machine Learning",
      issuer: "Dicoding Indonesia",
      year: "Jul 2026",
      credentialId: "JLX1VM90JZ72",
      category: "ai",
    },
    {
      title: "Pengembangan Generative AI berbasis LLM",
      issuer: "Dicoding Indonesia",
      year: "Jul 2026",
      credentialId: "72ZD/1E7Q2YW",
      category: "ai",
    },
    {
      title: "Belajar Back-End Pemula dengan Python",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "OLZOYM5KNX65",
      category: "web",
    },
    {
      title: "Belajar Dasar Cloud dan Gen AI di AWS",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "RVZK03LKNZD5",
      category: "cloud",
    },
    {
      title: "Belajar Dasar Data Science",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "81P2OMDVNZOY",
      category: "ai",
    },
    {
      title: "Belajar Dasar Manajemen Proyek",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "0LZ0Y79QQX65",
      category: "leadership",
    },
    {
      title: "Belajar Dasar Pemrograman JavaScript",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "NVP7ND884ZR0",
      category: "web",
    },
    {
      title: "Belajar Dasar Pemrograman Web",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "98XW0N56WXM3",
      category: "web",
    },
    {
      title: "Belajar Fundamental Pemrosesan Data",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "ERZRL80VQZYV",
      category: "ai",
    },
    {
      title: "Belajar Machine Learning untuk Pemula",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "MRZMWJ5LKPYQ",
      category: "ai",
    },
    {
      title: "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "JMZVOBODRXN9",
      category: "cloud",
    },
    {
      title: "Belajar Penerapan AI di Aplikasi Web",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "KEXLQK97RPG2",
      category: "ai",
    },
    {
      title: "Belajar Prinsip Pemrograman SOLID",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "1GP8R3M38ZQK",
      category: "engineering",
    },
    {
      title: "Memulai Pemrograman Dengan Java",
      issuer: "Dicoding Indonesia",
      year: "Jun 2026",
      credentialId: "EYX4QLM/WPDL",
      category: "engineering",
    },
    {
      title: "Belajar Dasar Google Cloud",
      issuer: "Dicoding Indonesia",
      year: "Mei 2026",
      credentialId: "1GP8RJJOVzQK",
      category: "cloud",
    },
    {
      title: "Belajar Dasar UX Design",
      issuer: "Dicoding Indonesia",
      year: "Mei 2026",
      credentialId: "JMZVO053JXN9",
      category: "leadership",
    },
    {
      title: "Prompt Engineering untuk Software Developer",
      issuer: "Dicoding Indonesia",
      year: "Mei 2026",
      credentialId: "NVP7NJLOWZR0",
      category: "ai",
    },
    {
      title: "Belajar Penggunaan Generative AI",
      issuer: "Dicoding Indonesia",
      year: "Apr 2026",
      credentialId: "EYX4QJ295PDL",
      category: "ai",
    },
    {
      title: "Spec-Driven Development dengan Kiro",
      issuer: "Dicoding Indonesia",
      year: "Apr 2026",
      credentialId: "OLZOY4LW3X65",
      category: "engineering",
    },
    {
      title: "AI Praktis untuk Produktivitas",
      issuer: "Dicoding Indonesia",
      year: "Mar 2026",
      credentialId: "0LZOY9VG3X65",
      category: "ai",
    },
    {
      title: "Belajar Membuat Front-End Web untuk Pemula",
      issuer: "Dicoding Indonesia",
      year: "Mar 2026",
      credentialId: "NVP7N80YVZRO",
      category: "web",
    },

    // 2023 - Cloud & Backend Foundational
    {
      title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
      issuer: "Dicoding Academy",
      year: "Mar 2023",
      credentialId: "JMZVNW5V3PN9",
      category: "web",
    },
    {
      title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
      issuer: "Dicoding Academy",
      year: "Feb 2023",
      credentialId: "QLZ92GGGEX5D",
      category: "cloud",
    },

    // 2020 - Mobile, Java & System Fundamentals
    {
      title: "Public Speaking",
      issuer: "Luarsekolah",
      year: "Des 2020",
      category: "leadership",
    },
    {
      title: "Dasar-dasar Mobile Programming Android dan Kotlin untuk Pemula",
      issuer: "Skill Academy by Ruangguru",
      year: "Okt 2020",
      category: "mobile",
    },
    {
      title: "Mastering Mobile Programming Android",
      issuer: "Skill Academy by Ruangguru",
      year: "Okt 2020",
      category: "mobile",
    },
    {
      title: "Memulai Pemrograman Dengan Python",
      issuer: "Dicoding Academy",
      year: "Okt 2020",
      category: "web",
    },
    {
      title: "Oracle Java Fundamentals",
      issuer: "Oracle",
      year: "Okt 2020",
      category: "engineering",
    },
    {
      title: "Oracle Java Programming",
      issuer: "Oracle",
      year: "Okt 2020",
      category: "engineering",
    },
    {
      title: "Belajar Dasar Pemrograman Web",
      issuer: "Dicoding Academy",
      year: "Sep 2020",
      category: "web",
    },

    // 2019 - Android & IoT Foundation
    {
      title: "Memulai Pemrograman Dengan Kotlin",
      issuer: "Dicoding Academy",
      year: "Sep 2019",
      category: "mobile",
    },
    {
      title: "Internet of Things (IoT)",
      issuer: "Digital Talent Scholarship (Kominfo)",
      year: "Agu 2019",
      category: "mobile",
    },
    {
      title: "Kotlin from Zero to Hero - Bahasa Indonesia",
      issuer: "Udacoding",
      year: "Jun 2019",
      credentialId: "UC-RG94E4FA",
      category: "mobile",
    },
    {
      title: "Belajar Membuat Aplikasi Android untuk Pemula",
      issuer: "Dicoding Academy",
      year: "Agu 2019",
      category: "mobile",
    },
  ] as CertificationItem[],
};
