import React, { useEffect } from 'react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Printer, Download, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 space-y-8 print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="text-xs font-mono text-cyan-400">
            CURRICULUM VITAE · MANISH PATEL
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 border border-slate-700 transition-colors"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 print:border-slate-300">
            <h1 className="text-3xl font-bold text-white print:text-black">Manish Patel</h1>
            <p className="text-base text-cyan-400 font-medium mt-0.5 print:text-slate-700">
              Senior Flutter Developer &amp; Mobile Software Architect
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3 font-mono print:text-slate-600">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>5+ Years Experience</span>
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-800">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed print:text-slate-700">
              Senior Mobile Engineer with 5+ years of production experience architecting high-performance iOS and Android
              applications using Flutter and Dart. Shipped 18+ consumer and enterprise apps with over 1.2M downloads and
              99.9% crash-free sessions. Proven authority on Clean Architecture, reactive state management (BLoC &amp;
              Riverpod), native platform channels, and automated CI/CD pipelines.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-800">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:border-slate-200">
                <span className="font-semibold text-white print:text-black">Languages &amp; Frameworks:</span>
                <p className="text-slate-400 mt-1 print:text-slate-600">
                  Flutter 3.x, Dart 3.x, Swift, Kotlin, TypeScript, C++ (FFI)
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:border-slate-200">
                <span className="font-semibold text-white print:text-black">State &amp; Architecture:</span>
                <p className="text-slate-400 mt-1 print:text-slate-600">
                  BLoC, Cubit, Riverpod 2.x, Clean Architecture, DDD, TDD
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:border-slate-200">
                <span className="font-semibold text-white print:text-black">Native &amp; Hardware:</span>
                <p className="text-slate-400 mt-1 print:text-slate-600">
                  MethodChannels, HealthKit, Google Fit, Camera, BLE Bluetooth
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:border-slate-200">
                <span className="font-semibold text-white print:text-black">DevOps &amp; Quality:</span>
                <p className="text-slate-400 mt-1 print:text-slate-600">
                  Fastlane, GitHub Actions, Codemagic, Sentry, Firebase Crashlytics
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-800">
              Experience History
            </h2>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-white print:text-black">
                      {exp.role} — <span className="text-cyan-400 print:text-slate-800">{exp.company}</span>
                    </span>
                    <span className="font-mono text-slate-400 print:text-slate-600">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-300 print:text-slate-700">{exp.summary}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 print:text-slate-600 pl-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 print:border-slate-300">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-800">
                Education
              </h2>
              <div className="text-xs mt-1.5 space-y-0.5">
                <div className="font-semibold text-white print:text-black">
                  Bachelor of Technology in Computer Science
                </div>
                <div className="text-slate-400 print:text-slate-600">Graduated with Distinction · 2015 – 2019</div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-800">
                Certifications
              </h2>
              <div className="text-xs mt-1.5 space-y-1">
                <div className="text-slate-300 print:text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Google Associate Android Developer</span>
                </div>
                <div className="text-slate-300 print:text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Certified Flutter Mobile Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
