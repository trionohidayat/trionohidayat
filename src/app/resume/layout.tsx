import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Triono Hidayat — Engineering Dossier & Specialized Resume',
  description:
    'Technical competencies, architecture achievements, and verified credentials across Full-Stack, Android Mobile, and GovTech AI systems.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
