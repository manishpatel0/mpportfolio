import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, Smartphone, ExternalLink, Github, CheckCircle2, Code2, Award, Zap } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onLaunchInSimulator: (projectId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onLaunchInSimulator,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Top Header & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-cyan-400 font-semibold">{project.category.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>{project.stateManagement}</span>
              <span aria-hidden="true">·</span>
              <span>{project.architecture}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">{project.title}</h2>
            <p className="text-sm text-slate-300 mt-0.5">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 border border-slate-700/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video max-h-72">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
            <span className="bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-700">
              Figma to Flutter 1:1 Pixel Match
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-emerald-400 font-semibold">{project.metrics.crashFree} Crash-Free</span>
              <span className="font-mono text-amber-300 font-semibold">{project.metrics.rating}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-3">
          {project.hasLiveDemo && (
            <button
              onClick={() => {
                onLaunchInSimulator(project.id);
                onClose();
              }}
              className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Test Live in Simulator</span>
            </button>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub Repository</span>
            </a>
          )}
        </div>

        {/* Description & Engineering Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Architecture &amp; Problem Solving
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-300">Technical Highlights</div>
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.codeSnippet && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{project.codeSnippet.filename}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Production Snippet</span>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
