import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-cyan-400 font-semibold">Peer Endorsements</span>
            <span aria-hidden="true">·</span>
            <span>Engineering Leadership</span>
            <span aria-hidden="true">·</span>
            <span>Client Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            What Leaders Say About Manish
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Direct feedback from VPs of Engineering, Product Leads, and Principal Architects who have built
            alongside Manish.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-cyan-400/40" />
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-xs flex items-center justify-center">
                  {t.avatarText}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">
                    {t.role} · {t.company}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{t.relationship}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
