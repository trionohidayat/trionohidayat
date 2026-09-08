import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://trionohidayat.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Triono Hidayat | GovTech & Full-Stack Solutions Developer",
  description:
    "Senior Full-Stack Developer & IT Systems Specialist. Crafting high-performance Next.js web applications, Android mobile solutions, and n8n workflow automations for international clients.",
  keywords: [
    "Triono Hidayat",
    "Full-Stack Developer",
    "Solutions Developer",
    "Next.js Developer",
    "n8n Automation Specialist",
    "Android Developer",
    "IT Systems Governance",
    "Freelance Software Engineer",
    "Indonesia Remote Developer",
    "Kemnaker IT Officer",
  ],
  authors: [{ name: "Triono Hidayat", url: siteUrl }],
  creator: "Triono Hidayat",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Triono Hidayat | GovTech & Full-Stack Solutions Developer",
    description:
      "Turning complex operational workflows into high-performance Web, Mobile, and Automated solutions.",
    siteName: "Triono Hidayat Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triono Hidayat | GovTech & Full-Stack Solutions Developer",
    description:
      "High-performance Next.js web apps, Android solutions, and n8n workflow automations.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Triono Hidayat",
      url: siteUrl,
      jobTitle: "GovTech & Full-Stack Solutions Developer",
      worksFor: {
        "@type": "GovernmentOrganization",
        name: "Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker)",
      },
      sameAs: [
        "https://github.com/trionohidayat",
        "https://www.linkedin.com/in/triono-hidayat",
        "https://youtube.com/@triono.hidayat",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "n8n Workflow Automation",
        "Android Native Development",
        "RFID HF/UHF",
        "Warehouse Management Systems",
        "IT Systems Governance",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Triono Hidayat - Technical Solutions & Consulting",
      url: siteUrl,
      priceRange: "$$",
      areaServed: "Worldwide",
      founder: { "@id": `${siteUrl}/#person` },
      description:
        "Full-stack web development, native Android solutions, and n8n automated workflow pipelines.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#090a0f] text-zinc-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
