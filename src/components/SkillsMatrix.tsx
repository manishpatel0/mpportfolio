import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, CheckCircle2, Terminal, Code } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const activeCategory = SKILL_CATEGORIES[selectedCategoryIndex];

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-cyan-400 font-semibold">Technical Matrix</span>
            <span aria-hidden="true">·</span>
            <span>Mobile Engineering Ecosystem</span>
            <span aria-hidden="true">·</span>
            <span>5+ Years Deep Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Skills &amp; Technical Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            From raw Skia/Impeller canvas rendering and Dart isolate threading down to Swift/Kotlin platform bridges
            and Fastlane App Store release automation.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {SKILL_CATEGORIES.map((cat, index) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategoryIndex(index)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategoryIndex === index
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Selected Category Showcase */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{activeCategory.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{activeCategory.subtitle}</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-medium">
              {activeCategory.skills.length} Core Competencies
            </span>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{skill.level}</span>
                  </div>

                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="tabular-nums">{skill.years} Years in Production</span>
                    <span aria-hidden="true">·</span>
                    <span>Daily Driver</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {skill.description}
                  </p>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{
                      width:
                        skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '82%' : '70%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
