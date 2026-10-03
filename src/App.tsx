/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhoneSimulator } from './components/PhoneSimulator';
import { ProjectSection } from './components/ProjectSection';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types/portfolio';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [simulatorApp, setSimulatorApp] = useState<string>('zenith-finance');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const simulatorRef = useRef<HTMLDivElement>(null);

  const scrollToSimulator = (appId?: string) => {
    if (appId) {
      setSimulatorApp(appId);
    }
    if (simulatorRef.current) {
      simulatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectDetails = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setModalProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 3-Zone Top Bar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onScrollToSimulator={() => scrollToSimulator()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Split-Screen Hero */}
        <Hero
          onScrollToSimulator={() => scrollToSimulator()}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Live Interactive Phone Simulator */}
        <section id="simulator" ref={simulatorRef} className="py-12 md:py-20 max-w-7xl mx-auto px-6">
          <PhoneSimulator
            initialApp={simulatorApp}
            onSelectProjectDetails={handleOpenProjectDetails}
          />
        </section>

        {/* Projects Showcase Bento Grid */}
        <ProjectSection onLaunchInSimulator={(id) => scrollToSimulator(id)} />

        {/* Clean Architecture Explorer */}
        <ArchitectureExplorer />

        {/* Skills & Ecosystem Matrix */}
        <SkillsMatrix />

        {/* Experience Timeline */}
        <ExperienceTimeline />

        {/* Peer & Client Endorsements */}
        <Testimonials />

        {/* Contact & Availability Section */}
        <ContactSection />
      </main>

      {/* Subtle Footer */}
      <Footer />

      {/* Modals */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onLaunchInSimulator={(id) => scrollToSimulator(id)}
      />
    </div>
  );
}
