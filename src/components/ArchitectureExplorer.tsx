import React, { useState } from 'react';
import { ARCHITECTURE_LAYERS } from '../data/portfolioData';
import { Layers, CheckCircle2, Copy, Check, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export const ArchitectureExplorer: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('presentation');
  const [copiedCode, setCopiedCode] = useState(false);

  const activeLayer =
    ARCHITECTURE_LAYERS.find((l) => l.id === activeLayerId) || ARCHITECTURE_LAYERS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeLayer.codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="architecture" className="py-20 md:py-28 relative bg-slate-950/40 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-cyan-400 font-semibold">Clean Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Feature-First Packaging</span>
            <span aria-hidden="true">·</span>
            <span>Domain-Driven Design (DDD)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How Manish Engineers Flutter at Scale
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Large Flutter apps fail when business logic bleeds into widget trees. Manish enforces strict boundary
            isolation where the Domain layer contains zero Flutter dependencies, enabling 100% unit-testable business
            rules.
          </p>
        </div>

        {/* Interactive Architecture Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Layer Selection & Boundary Map */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Architectural Layer
            </span>

            <div className="space-y-3">
              {ARCHITECTURE_LAYERS.map((layer, index) => {
                const isSelected = layer.id === activeLayerId;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: layer.color }}
                        />
                        <span className="font-bold text-sm text-white">
                          0{index + 1}. {layer.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {layer.id === 'domain' ? 'Pure Dart' : 'Flutter / IO'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {layer.purpose}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Architecture Invariants Box */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 mt-6">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>The Dependency Rule</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dependencies always point inwards. The <span className="text-emerald-400 font-mono">Domain</span> layer
                knows nothing about databases, network endpoints, or UI widgets. Data sources implement contracts defined
                in Domain.
              </p>
            </div>
          </div>

          {/* Right Column: Code Inspector & Best Practices */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeLayer.color }}
                  />
                  <h3 className="text-lg font-bold text-white">{activeLayer.name}</h3>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeLayer.purpose}</p>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-colors"
                title="Copy Dart code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Components Inside This Layer */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Layer Components
              </div>
              <div className="flex flex-wrap gap-2">
                {activeLayer.components.map((comp) => (
                  <span
                    key={comp}
                    className="px-2.5 py-1 text-xs font-mono text-slate-200 bg-slate-800/80 rounded-lg border border-slate-700/60"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Dart Code Snippet Window */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Production Pattern Specification</span>
                </span>
                <span className="font-mono text-[11px] text-slate-500">Dart 3.x</span>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-72">
                <code>{activeLayer.codeExample}</code>
              </pre>
            </div>

            {/* Best Practices */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300">Enforced Invariants:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLayer.bestPractices.map((bp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
