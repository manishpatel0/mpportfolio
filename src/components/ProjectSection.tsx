import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { Smartphone, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

interface ProjectSectionProps {
  onLaunchInSimulator: (projectId: string) => void;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ onLaunchInSimulator }) => {
  const [filter, setFilter] = useState<'all' | 'fintech' | 'health' | 'travel' | 'ecommerce'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <span>Production Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>18+ Apps Shipped</span>
              <span aria-hidden="true">·</span>
              <span>App Store &amp; Play Store</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Mobile Applications
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Engineered with modern Flutter standards, Clean Architecture, test-driven state machines, and
              high-throughput asynchronous concurrency.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers, not pill metadata) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'fintech', label: 'Fintech' },
              { id: 'health', label: 'HealthKit' },
              { id: 'travel', label: 'Travel' },
              { id: 'ecommerce', label: 'Q-Commerce' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Media Container with Scrim */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating Metric Badges on Media */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700">
                    {project.metrics.crashFree}
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700">
                    {project.metrics.downloads}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-cyan-400 uppercase font-semibold">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.stateManagement}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.architecture}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-slate-800/80 rounded-md border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] font-mono text-slate-500">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Card Action Controls */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <span>View Case Study &amp; Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>

                  {project.hasLiveDemo && (
                    <button
                      onClick={() => onLaunchInSimulator(project.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Test in Simulator</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Lightbox */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunchInSimulator={onLaunchInSimulator}
      />
    </section>
  );
};
