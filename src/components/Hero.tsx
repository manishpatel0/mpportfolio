import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Smartphone,
  Copy,
  Check,
  FileText,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  onScrollToSimulator: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSimulator, onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typographic Hierarchy & Proof Metrics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Header (Strict Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="text-cyan-400 font-semibold">Flutter & Dart Specialist</span>
              <span aria-hidden="true">·</span>
              <span>iOS & Android</span>
              <span aria-hidden="true">·</span>
              <span>Clean Architecture & BLoC</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Available for Senior Roles</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Architecting fluid, production Flutter applications at scale.
            </h1>

            {/* Bio Prose */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light">
              Hi, I’m <span className="font-semibold text-white">Manish Patel</span>. Senior Mobile Engineer
              crafting cross-platform iOS and Android applications with sub-16ms render loops, reactive BLoC &amp;
              Riverpod architecture, and pixel-precise Material 3 &amp; Cupertino fidelity.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-950/40 flex items-center gap-2"
              >
                <span>Explore Shipped Apps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onScrollToSimulator}
                className="px-5 py-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Test Live Simulator</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-3 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>View CV</span>
              </button>
            </div>

            {/* Direct Email Contact Bar */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
                <button
                  onClick={copyEmail}
                  className="ml-1 text-slate-400 hover:text-white focus:outline-none transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              {copied && <span className="text-xs text-emerald-400 font-mono">Copied to clipboard!</span>}
            </div>

            {/* Quantitative Proof Metrics Grid (Adjacency to claims) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
                  {PERSONAL_INFO.experienceYears}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
                  {PERSONAL_INFO.appsShipped}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Production Apps</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-cyan-400">
                  {PERSONAL_INFO.downloadsCount}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Store Downloads</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-400">
                  {PERSONAL_INFO.crashFreeRate}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Crash-Free Users</div>
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Portrait & Flutter Blueprint Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-black/60 group">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt="Manish Patel - Senior Flutter Developer"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>Manish Patel</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-xs text-slate-400">Senior Mobile Architect</div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                      <Sparkles className="w-3 h-3" />
                      <span>Flutter 3.x</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-slate-800">
                    <span>Expertise: BLoC · Riverpod · FFI</span>
                    <span className="text-emerald-400 font-medium">99.9% Crash-Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
