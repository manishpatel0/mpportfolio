import React, { useState } from 'react';
import {
  Smartphone,
  RotateCw,
  Eye,
  EyeOff,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  Heart,
  Flame,
  Droplets,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Star,
  MapPin,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface PhoneSimulatorProps {
  initialApp?: string;
  onSelectProjectDetails?: (projectId: string) => void;
}

type DeviceType = 'iphone' | 'pixel';
type SeedColor = 'flutter-blue' | 'emerald' | 'sunset' | 'violet';

const SEED_CONFIGS: Record<
  SeedColor,
  { name: string; primary: string; primaryHover: string; bgSoft: string; border: string; text: string }
> = {
  'flutter-blue': {
    name: 'Flutter Sky',
    primary: '#0284c7',
    primaryHover: '#0369a1',
    bgSoft: 'rgba(2, 132, 199, 0.12)',
    border: 'rgba(2, 132, 199, 0.3)',
    text: '#38bdf8',
  },
  emerald: {
    name: 'Material Green',
    primary: '#10b981',
    primaryHover: '#059669',
    bgSoft: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.3)',
    text: '#34d399',
  },
  sunset: {
    name: 'Amber Glow',
    primary: '#f59e0b',
    primaryHover: '#d97706',
    bgSoft: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.3)',
    text: '#fbbf24',
  },
  violet: {
    name: 'Deep Purple',
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    bgSoft: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.3)',
    text: '#a78bfa',
  },
};

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  initialApp = 'zenith-finance',
  onSelectProjectDetails,
}) => {
  const [activeApp, setActiveApp] = useState<string>(initialApp);
  const [device, setDevice] = useState<DeviceType>('iphone');
  const [seedColor, setSeedColor] = useState<SeedColor>('flutter-blue');
  const [debugPaint, setDebugPaint] = useState<boolean>(false);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [reloadNotice, setReloadNotice] = useState<string | null>(null);

  // App 1: Zenith Finance State
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [zenithPeriod, setZenithPeriod] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');
  const [balance, setBalance] = useState<number>(24850.4);
  const [transferModal, setTransferModal] = useState<boolean>(false);
  const [transferAmount, setTransferAmount] = useState<string>('250');
  const [txHistory, setTxHistory] = useState([
    { id: '1', title: 'Stripe Payout', time: 'Today, 10:42 AM', amount: '+ $1,420.00', positive: true },
    { id: '2', title: 'AWS Cloud Server', time: 'Yesterday', amount: '- $84.20', positive: false },
    { id: '3', title: 'App Store Proceeds', time: 'Oct 01', amount: '+ $3,890.50', positive: true },
  ]);

  // App 2: PulseHealth State
  const [waterCups, setWaterCups] = useState<number>(6);
  const [pulseBeats, setPulseBeats] = useState<number>(72);
  const [isMeasuringHeart, setIsMeasuringHeart] = useState<boolean>(false);

  // App 3: NomadStay State
  const [stayCategory, setStayCategory] = useState<'Villas' | 'Cabins' | 'Coastal'>('Villas');
  const [bookedProperty, setBookedProperty] = useState<string | null>(null);

  // App 4: AuraMart State
  const [cart, setCart] = useState<Record<string, number>>({
    'Organic Hass Avocado': 2,
    'Cold Brew Reserve': 1,
  });
  const [checkoutToast, setCheckoutToast] = useState<string | null>(null);

  const activeTheme = SEED_CONFIGS[seedColor];

  // Hot Reload Simulation
  const triggerHotReload = () => {
    setIsReloading(true);
    setReloadNotice('⚡ Flutter Hot Reload: 48ms (2 widgets re-rendered)');
    setTimeout(() => {
      setIsReloading(false);
      setTimeout(() => setReloadNotice(null), 3500);
    }, 400);
  };

  const handleSendFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(transferAmount);
    if (!isNaN(num) && num > 0) {
      setBalance((prev) => prev - num);
      setTxHistory((prev) => [
        {
          id: Date.now().toString(),
          title: 'Direct Transfer',
          time: 'Just now',
          amount: `- $${num.toFixed(2)}`,
          positive: false,
        },
        ...prev,
      ]);
      setTransferModal(false);
      setTransferAmount('100');
    }
  };

  const measureHeartRate = () => {
    setIsMeasuringHeart(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setPulseBeats((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
      if (count > 5) {
        clearInterval(interval);
        setIsMeasuringHeart(false);
      }
    }, 300);
  };

  const updateCart = (item: string, delta: number) => {
    setCart((prev) => {
      const current = prev[item] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[item];
        return copy;
      }
      return { ...prev, [item]: next };
    });
  };

  const cartTotalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-10 backdrop-blur-md">
      {/* Simulator Control Deck */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Flutter Engine v3.24</span>
            <span aria-hidden="true">·</span>
            <span>Skia / Impeller Pipeline</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">60 FPS Native</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Interactive Flutter Device Simulator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Test-drive real Flutter mini-apps engineered by Manish Patel. Switch apps, trigger hot reload, or enable debug paint.
          </p>
        </div>

        {/* Simulator Global Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Hot Reload Button */}
          <button
            onClick={triggerHotReload}
            disabled={isReloading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            title="Simulate Flutter Hot Reload (r in terminal)"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span>Hot Reload</span>
          </button>

          {/* Debug Paint Toggle */}
          <button
            onClick={() => setDebugPaint(!debugPaint)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              debugPaint
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Flutter Debug Paint Size (Shows widget boundaries)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Debug Paint</span>
          </button>

          {/* Device Type Segmented Switch */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
            <button
              onClick={() => setDevice('iphone')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                device === 'iphone' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              iOS
            </button>
            <button
              onClick={() => setDevice('pixel')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                device === 'pixel' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pixel
            </button>
          </div>

          {/* Seed Color Selector */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/60">
            <span className="text-[11px] text-slate-400 mr-1">M3 Seed:</span>
            {(['flutter-blue', 'emerald', 'sunset', 'violet'] as SeedColor[]).map((c) => (
              <button
                key={c}
                onClick={() => setSeedColor(c)}
                className={`w-4 h-4 rounded-full transition-transform ${
                  seedColor === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: SEED_CONFIGS[c].primary }}
                title={`Material 3 seed: ${SEED_CONFIGS[c].name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hot Reload Flash Toast */}
      {reloadNotice && (
        <div className="my-3 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs rounded-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-mono">{reloadNotice}</span>
          </div>
          <button
            onClick={() => setReloadNotice(null)}
            className="text-amber-400 hover:text-amber-200 text-xs font-mono"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Split Layout: Left App Selector & Specs; Right Phone Hardware Chassis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-center">
        {/* Left Side: App Selector & Technical Deep-Dive */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              Select Shipped App Demo
            </span>
            <h4 className="text-xl font-bold text-white mt-1">Experience Live Architecture in Action</h4>
            <p className="text-sm text-slate-400 mt-1.5">
              Interact directly with the simulated UI. Every interaction triggers real local state changes modeled after
              Manish's production Flutter apps.
            </p>
          </div>

          {/* App Selection Tabs */}
          <div className="space-y-2.5">
            {[
              {
                id: 'zenith-finance',
                title: 'Zenith Finance',
                category: 'Fintech & Multi-Currency',
                stack: 'BLoC · Dio · WebSockets',
                desc: 'Real-time asset pricing, transactions, and biometric security pattern.',
              },
              {
                id: 'pulse-health',
                title: 'PulseHealth',
                category: 'HealthKit & Telemetry',
                stack: 'Riverpod · CustomPainter',
                desc: 'Wearable health sync, dynamic bezier activity rings & heart telemetry.',
              },
              {
                id: 'nomad-stay',
                title: 'NomadStay Boutique',
                category: 'Travel & Booking',
                stack: 'Stripe · Mapbox · Hero',
                desc: 'Fluid hero transitions, property filters, and frictionless checkout.',
              },
              {
                id: 'aura-mart',
                title: 'AuraMart Delivery',
                category: 'Quick-Commerce',
                stack: 'StateNotifier · Optimistic UI',
                desc: 'Sub-millisecond cart mutation, item increments & live checkout state.',
              },
            ].map((app) => {
              const isSelected = activeApp === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-950/20'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {app.title}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400/90">{app.stack}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{app.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Project Details Modal Trigger */}
          {onSelectProjectDetails && (
            <button
              onClick={() => onSelectProjectDetails(activeApp)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>View Full Case Study & Dart Architecture</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          {/* Technical Invariants Bar */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Production Invariants Enforced</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>• Strict separation: UI Widgets never invoke HTTP/DB directly</div>
              <div>• Constant constructors eliminate unnecessary rebuild passes</div>
              <div>• 100% reactive state updates with predictable lifecycle cleanup</div>
            </div>
          </div>
        </div>

        {/* Right Side: Realistic Mobile Hardware Frame */}
        <div className="lg:col-span-7 flex justify-center items-center py-4">
          <div
            className={`relative transition-all duration-300 shadow-2xl ${
              device === 'iphone'
                ? 'w-[340px] h-[670px] rounded-[50px] p-[10px] bg-slate-800 ring-1 ring-slate-700 shadow-cyan-950/40'
                : 'w-[335px] h-[670px] rounded-[42px] p-[8px] bg-neutral-800 ring-1 ring-neutral-700'
            }`}
            style={{
              boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px -10px ${activeTheme.primary}20`,
            }}
          >
            {/* Screen Inner Frame */}
            <div
              className={`w-full h-full rounded-[40px] overflow-hidden flex flex-col bg-[#0b101b] text-slate-100 select-none relative ${
                debugPaint ? 'ring-1 ring-pink-500/70' : ''
              }`}
            >
              {/* Debug Paint Guide Overlay */}
              {debugPaint && (
                <div className="absolute inset-0 pointer-events-none z-50 border border-cyan-400/40 opacity-70">
                  <div className="absolute top-0 bottom-0 left-4 w-px bg-cyan-400/30" />
                  <div className="absolute top-0 bottom-0 right-4 w-px bg-cyan-400/30" />
                  <div className="absolute top-12 left-0 right-0 h-px bg-pink-400/40" />
                  <span className="absolute bottom-2 right-2 bg-pink-500/90 text-[9px] text-white font-mono px-1 rounded">
                    debugPaintSize = true
                  </span>
                </div>
              )}

              {/* Hardware Notch / Island / Status Bar */}
              <div className="h-11 px-5 pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 shrink-0 z-20">
                <span>9:41</span>
                {device === 'iphone' ? (
                  /* Dynamic Island */
                  <div className="h-5 w-24 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                ) : (
                  /* Pixel Camera Punchhole */
                  <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto ring-1 ring-neutral-700" />
                )}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">5G</span>
                  <div className="w-4 h-2 border border-slate-300 rounded-sm p-0.5 flex items-center">
                    <div className="w-2.5 h-full bg-emerald-400 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Dynamic App Content Body */}
              <div className="flex-1 overflow-y-auto px-4 pb-14 scrollbar-none">
                {/* 1. ZENITH FINANCE APP */}
                {activeApp === 'zenith-finance' && (
                  <div className="space-y-4 pt-1">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">Total Net Worth</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold font-mono tracking-tight text-white">
                            {showBalance ? `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••••'}
                          </span>
                          <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="text-slate-400 hover:text-white"
                          >
                            {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 border border-slate-700">
                        MP
                      </div>
                    </div>

                    {/* Chart Canvas Preview */}
                    <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-emerald-400 font-medium font-mono">+8.4% this month</span>
                        <div className="flex gap-1 text-[10px]">
                          {(['1D', '1W', '1M', '1Y'] as const).map((p) => (
                            <button
                              key={p}
                              onClick={() => setZenithPeriod(p)}
                              className={`px-1.5 py-0.5 rounded ${
                                zenithPeriod === p ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* SVG Sparkline */}
                      <svg className="w-full h-16 overflow-visible" viewBox="0 0 100 35">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={activeTheme.primary} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={activeTheme.primary} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 25 Q 20 10, 40 20 T 70 8 T 100 12 L 100 35 L 0 35 Z"
                          fill="url(#chartGrad)"
                        />
                        <path
                          d="M 0 25 Q 20 10, 40 20 T 70 8 T 100 12"
                          fill="none"
                          stroke={activeTheme.primary}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTransferModal(true)}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white shadow transition-transform active:scale-95"
                        style={{ backgroundColor: activeTheme.primary }}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Wire</span>
                      </button>
                      <button
                        onClick={() => {
                          setBalance((b) => b + 500);
                          setTxHistory((prev) => [
                            {
                              id: Date.now().toString(),
                              title: 'Direct Deposit',
                              time: 'Just now',
                              amount: '+ $500.00',
                              positive: true,
                            },
                            ...prev,
                          ]);
                        }}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-transform active:scale-95"
                      >
                        <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Receive</span>
                      </button>
                    </div>

                    {/* Recent Transactions List */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 px-1">Recent Activity</div>
                      {txHistory.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                tx.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                              }`}
                            >
                              {tx.positive ? (
                                <ArrowDownLeft className="w-3 h-3" />
                              ) : (
                                <ArrowUpRight className="w-3 h-3" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-slate-200">{tx.title}</div>
                              <div className="text-[10px] text-slate-500">{tx.time}</div>
                            </div>
                          </div>
                          <span
                            className={`font-mono font-medium ${
                              tx.positive ? 'text-emerald-400' : 'text-slate-300'
                            }`}
                          >
                            {tx.amount}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Wire Transfer Sheet Modal */}
                    {transferModal && (
                      <div className="p-3 bg-slate-800/95 border border-slate-700 rounded-2xl space-y-2.5 animate-in fade-in">
                        <div className="text-xs font-semibold text-white flex items-center justify-between">
                          <span>Simulate BLoC Transfer Event</span>
                          <button
                            onClick={() => setTransferModal(false)}
                            className="text-slate-400 hover:text-white text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <form onSubmit={handleSendFunds} className="space-y-2">
                          <input
                            type="number"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                            placeholder="Amount in USD"
                            min="1"
                          />
                          <button
                            type="submit"
                            className="w-full py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity"
                            style={{ backgroundColor: activeTheme.primary }}
                          >
                            Execute Transfer (via Dio Mock)
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. PULSE HEALTH APP */}
                {activeApp === 'pulse-health' && (
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">Daily Activity</div>
                        <div className="text-lg font-bold text-white">Thursday, Oct 3</div>
                      </div>
                      <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                        Synced
                      </div>
                    </div>

                    {/* Activity Metric Cards */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                        <div className="flex items-center gap-1.5 text-rose-400 text-xs">
                          <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                          <span>Heart Rate</span>
                        </div>
                        <div className="text-xl font-bold font-mono text-white mt-1">
                          {pulseBeats} <span className="text-[11px] font-normal text-slate-400">BPM</span>
                        </div>
                        <button
                          onClick={measureHeartRate}
                          disabled={isMeasuringHeart}
                          className="mt-2 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <Zap className={`w-3 h-3 ${isMeasuringHeart ? 'animate-pulse text-amber-400' : ''}`} />
                          <span>{isMeasuringHeart ? 'Measuring...' : 'Measure now'}</span>
                        </button>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                        <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                          <Flame className="w-3.5 h-3.5" />
                          <span>Active Burn</span>
                        </div>
                        <div className="text-xl font-bold font-mono text-white mt-1">
                          640 <span className="text-[11px] font-normal text-slate-400">kcal</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-amber-400 h-full rounded-full w-[78%]" />
                        </div>
                      </div>
                    </div>

                    {/* Steps Counter */}
                    <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">Steps Today</span>
                        <span className="text-cyan-400 font-mono font-bold">8,420 / 10,000</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: '84%', backgroundColor: activeTheme.primary }}
                        />
                      </div>
                    </div>

                    {/* Interactive Hydration Tracker */}
                    <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-sky-400">
                          <Droplets className="w-3.5 h-3.5" />
                          <span>Hydration Intake</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">{waterCups} / 8 Glasses</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => setWaterCups((w) => Math.max(0, w - 1))}
                          className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex gap-1.5">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-3.5 h-6 rounded-sm transition-colors ${
                                i < waterCups ? 'bg-sky-400' : 'bg-slate-800'
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setWaterCups((w) => Math.min(12, w + 1))}
                          className="w-7 h-7 rounded-lg text-white flex items-center justify-center shadow"
                          style={{ backgroundColor: activeTheme.primary }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. NOMAD STAY APP */}
                {activeApp === 'nomad-stay' && (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">Explore Stays</div>
                        <div className="text-base font-bold text-white">Find Your Sanctuary</div>
                      </div>
                      <div className="text-xs text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Curated</span>
                      </div>
                    </div>

                    {/* Filter Segmented Control */}
                    <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                      {(['Villas', 'Cabins', 'Coastal'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setStayCategory(cat)}
                          className={`flex-1 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                            stayCategory === cat
                              ? 'bg-slate-800 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Property Card */}
                    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 space-y-2">
                      <div className="relative h-28 bg-slate-800">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${
                              stayCategory === 'Villas'
                                ? 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80'
                                : 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80'
                            })`,
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-amber-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>4.96</span>
                        </div>
                      </div>

                      <div className="p-3 pt-0">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-xs text-white">
                            {stayCategory === 'Villas' ? 'Villa Serenità' : 'The Pine Peak Cabin'}
                          </h5>
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {stayCategory === 'Villas' ? '$340/nt' : '$210/nt'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{stayCategory === 'Villas' ? 'Amalfi Coast, Italy' : 'Banff, Canada'}</span>
                        </div>

                        <button
                          onClick={() => {
                            setBookedProperty(stayCategory === 'Villas' ? 'Villa Serenità' : 'The Pine Peak Cabin');
                            setTimeout(() => setBookedProperty(null), 3000);
                          }}
                          className="w-full mt-2.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity flex items-center justify-center gap-1"
                          style={{ backgroundColor: activeTheme.primary }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Instant Reserve</span>
                        </button>

                        {bookedProperty && (
                          <div className="mt-2 text-[10px] p-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded text-center">
                            ✓ Reserved {bookedProperty}! Receipt generated.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. AURA MART APP */}
                {activeApp === 'aura-mart' && (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">Instant Hyperlocal</div>
                        <div className="text-base font-bold text-white">AuraMart Express</div>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">12 min delivery</div>
                    </div>

                    {/* Product List */}
                    <div className="space-y-2">
                      {[
                        { name: 'Organic Hass Avocado', price: 2.49, unit: 'per piece' },
                        { name: 'Cold Brew Reserve', price: 4.8, unit: '350ml bottle' },
                        { name: 'Artisan Sourdough', price: 5.25, unit: 'fresh loaf' },
                      ].map((prod) => {
                        const qty = cart[prod.name] || 0;
                        return (
                          <div
                            key={prod.name}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800"
                          >
                            <div>
                              <div className="text-xs font-medium text-slate-200">{prod.name}</div>
                              <div className="text-[10px] text-slate-400">
                                ${prod.price.toFixed(2)} · {prod.unit}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {qty > 0 ? (
                                <div className="flex items-center gap-1.5 bg-slate-800 px-1 py-0.5 rounded-lg border border-slate-700">
                                  <button
                                    onClick={() => updateCart(prod.name, -1)}
                                    className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-white"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-mono font-bold text-white px-1">{qty}</span>
                                  <button
                                    onClick={() => updateCart(prod.name, 1)}
                                    className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-white"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => updateCart(prod.name, 1)}
                                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white"
                                  style={{ backgroundColor: activeTheme.primary }}
                                >
                                  + Add
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Cart Bar */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setCheckoutToast('🚀 Order placed with WebSocket live rider dispatch!');
                          setTimeout(() => setCheckoutToast(null), 3500);
                        }}
                        disabled={cartTotalItems === 0}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl text-white font-medium text-xs shadow transition-opacity disabled:opacity-50"
                        style={{ backgroundColor: activeTheme.primary }}
                      >
                        <div className="flex items-center gap-1.5">
                          <ShoppingBag className="w-4 h-4" />
                          <span>{cartTotalItems} Items</span>
                        </div>
                        <span className="font-mono font-bold">Checkout →</span>
                      </button>

                      {checkoutToast && (
                        <div className="mt-2 p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] rounded text-center">
                          {checkoutToast}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Device Home Bar */}
              <div className="h-5 flex items-center justify-center shrink-0">
                <div className="w-32 h-1 bg-slate-500/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
