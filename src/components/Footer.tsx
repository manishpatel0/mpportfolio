import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#070b12] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Rights */}
        <div className="space-y-1 text-center md:text-left">
          <div className="font-bold text-white text-sm flex items-center justify-center md:justify-start gap-1.5">
            <span>Manish Patel</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <p className="text-slate-500">
            Senior Flutter &amp; Mobile Engineer · Clean Architecture &amp; Reactive State Systems
          </p>
        </div>

        {/* Social & Contact Links */}
        <div className="flex items-center gap-6 text-slate-400">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors flex items-center gap-1 text-slate-500 hover:text-slate-300"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
