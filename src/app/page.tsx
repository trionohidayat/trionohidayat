import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { GitHubActivity } from '@/components/GitHubActivity';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { LatestArticles } from '@/components/LatestArticles';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-grid-pattern overflow-x-clip w-full max-w-full">
      {/* Floating Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-clip">
        {/* Hero Section */}
        <Hero />

        {/* 4 Core Offerings */}
        <Services />

        {/* Featured Case Studies with Category Filters */}
        <Projects />

        {/* Live GitHub Contributions & Footprint */}
        <GitHubActivity />

        {/* Technical Proficiency */}
        <Skills />

        {/* Career & Track Record */}
        <Experience />

        {/* Education & Certifications */}
        <Education />

        {/* Featured Technical Writing & Insights */}
        <LatestArticles />

        {/* Direct Contact & Collaboration */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
