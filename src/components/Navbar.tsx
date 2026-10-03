import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onScrollToSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onScrollToSimulator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled ? 'bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5"
        >
          <span>Manish Patel</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <button
            onClick={onScrollToSimulator}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-300"
          >
            <span>Live Simulator</span>
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          </button>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#experience" className="hover:text-white transition-colors">
            Experience
          </a>
          <button
            onClick={onOpenResume}
            className="hover:text-white transition-colors text-slate-300"
          >
            Resume
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shadow-sm shadow-cyan-900/40"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Strict <= 15% sticky cap compliance) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b0f17] border-b border-slate-800 px-6 py-4 space-y-3">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Projects
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSimulator();
            }}
            className="block text-left w-full text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            Live Simulator
          </button>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Architecture
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Skills
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Experience
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="block text-left w-full text-sm font-medium text-slate-300 hover:text-white"
          >
            View Resume
          </button>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
};
