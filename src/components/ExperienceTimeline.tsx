import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 relative bg-slate-950/40 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-cyan-400 font-semibold">Career History</span>
            <span aria-hidden="true">·</span>
            <span>Production Leadership</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Scale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Proven track record leading mobile engineering teams, executing zero-downtime architecture migrations,
            and shipping mission-critical Flutter apps.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-px before:bg-slate-800">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="relative pl-10 sm:pl-12 group">
              {/* Timeline Dot Marker */}
              <div
                className={`absolute left-1.5 top-1.5 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                  exp.current
                    ? 'bg-cyan-400 border-slate-900 shadow-md shadow-cyan-400/50'
                    : 'bg-slate-800 border-slate-700'
                }`}
              />

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-4">
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{exp.role}</span>
                      <span className="text-cyan-400 font-normal">@ {exp.company}</span>
                    </h3>

                    {/* Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.period}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.location}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.type}</span>
                    </div>
                  </div>

                  {exp.current && (
                    <span className="self-start sm:self-auto text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      Current Role
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed">{exp.summary}</p>

                {/* Key Achievements */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Key Engineering Achievements
                  </div>
                  <div className="space-y-2">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-slate-800/60 rounded-lg border border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
