import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Triono Hidayat | Full-Stack & Solutions Developer",
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
  ],
  authors: [{ name: "Triono Hidayat" }],
  creator: "Triono Hidayat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trionohidayat.dev",
    title: "Triono Hidayat | Full-Stack & Solutions Developer",
    description:
      "Turning complex operational workflows into high-performance Web, Mobile, and Automated solutions.",
    siteName: "Triono Hidayat Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triono Hidayat | Full-Stack & Solutions Developer",
    description:
      "High-performance Next.js web apps, Android solutions, and n8n workflow automations.",
  },
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
      <body className="min-h-screen bg-[#090a0f] text-zinc-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
