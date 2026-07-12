'use client';
import React from 'react';

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-emerald-600 p-4 md:p-20 font-mono tracking-tight">
      <div className="max-w-4xl mx-auto border border-emerald-900/50 p-6 md:p-12 shadow-[0_0_80px_-20px_rgba(16,185,129,0.15)] bg-[#050505]">

        {/* Title Block */}
        <header className="mb-16 border-b border-emerald-900 pb-8">
          <div className="text-[10px] uppercase tracking-[0.5em] text-emerald-400 mb-2">Project Codename: Monarch</div>
          <h1 className="text-2xl md:text-7xl font-black text-white italic tracking-tighter uppercase">
            M.M.S.
          </h1>
          <p className="text-amber-500 text-2xl mt-2 uppercase font-semibold">
            Muscle Manifestation System <p className='text-emerald-500 text-xs '> — Anthropometric Optimization Engine </p>
          </p>
        </header>

        {/* Narrative & Origin */}
        <section className="mb-16 space-y-6">
          <h2 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em] border-l-4 border-amber-500 pl-4">
            Genesis & Intent
          </h2>
          <p className="text-[14px] leading-relaxed text-emerald-400/90">
            This system was architected to transcend the limitations of manual note-taking. Originally conceived to track
            my own physiological transformation, the platform evolved into a comprehensive <span className="text-emerald-500 font-bold">Hypertrophy Tracking Environment</span>.
            The goal was simple: to replace fragmented, chaotic notes with a unified, deterministic framework that
            visualizes physical progress through the lens of RPG-style progression.
          </p>
          <p className="text-[14px] leading-relaxed text-emerald-400/90">
            By digitizing the struggle, we turn every centimeter gained into a measurable data point, providing
            the psychological reinforcement necessary to bridge the gap between "untrained" and "elite."
          </p>
        </section>

        {/* The Mechanics */}
        <section className="mb-16 space-y-8">
          <h2 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em] border-l-4 border-amber-500 pl-4">
            Functional Architecture
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-emerald-900/30 p-6 bg-emerald-950/5">
              <h3 className="font-bold text-white mb-3 text-xs uppercase tracking-widest">Predictive Potential</h3>
              <p className="text-[14px] text-emerald-400 leading-relaxed">
                The system utilizes biological scaling metrics tailored to your frame. It doesn't just track current size;
                it calculates your proximity to peak natural potential, allowing you to visualize where your physique
                is headed before you arrive there.
              </p>
            </div>
            <div className="border border-emerald-900/30 p-6 bg-emerald-950/5">
              <h3 className="font-bold text-white mb-3 text-xs uppercase tracking-widest">Cognitive Gamification</h3>
              <p className="text-[14px] text-emerald-400 leading-relaxed">
                Transforming the grind into a progression ladder. By assigning "Rank" tiers to muscle measurements,
                the user experience shifts from "exercise" to "character development." It turns the monotony
                of measurement into a high-stakes leveling process.
              </p>
            </div>
          </div>
        </section>

        {/* Rank Logic */}
        <section className="mb-16">
          <h2 className="text-[14px] font-black text-amber-400 uppercase tracking-[0.3em] mb-8">Rank Hierarchy</h2>
          <div className="space-y-2">
            {[
              { r: 'E', d: 'Underdeveloped: The foundational stage. Establishing initial volume.' },
              { r: 'D', d: 'Untrained: Base civilian status. Movement patterns are now consistent.' },
              { r: 'C', d: 'Athletic: Visible definition; the transition from novice to builder.' },
              { r: 'B', d: 'Highly Developed: Significant muscle mass gain; the "lifter" aesthetic.' },
              { r: 'A', d: 'Advanced: Elite natural thresholds. High muscle separation.' },
              { r: 'S', d: 'Elite: The peak. V-taper mastery and structural perfection.' }
            ].map((rank) => (
              <div key={rank.r} className="flex items-center gap-6 p-3 border-b border-emerald-900/20 group hover:bg-emerald-900/10">
                <span className="text-xl font-black text-white w-8">{rank.r}</span>
                <span className="text-[11px] uppercase tracking-widest text-emerald-600 font-bold group-hover:text-emerald-400">{rank.d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Protocol Deep Dive */}
        <section className="border border-amber-900 p-8 bg-black">
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs"> Measurement Protocol</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-[14px] text-emerald-400">
            <p className="border-b border-emerald-900/30 pb-2">01. Periodicity: 10th day, 22:50 Hours.</p>
            <p className="border-b border-emerald-900/30 pb-2">02. State: Post-fast or pre-session.</p>
            <p className="border-b border-emerald-900/30 pb-2">03. Tooling: Standardized tape tension.</p>
            <p className="border-b border-emerald-900/30 pb-2">04. Metric: Centimeters preferred.</p>
          </div>
        </section>


        {/* The Psychological Edge */}
        <section className="mt-5 mb-16 space-y-6">
          <h2 className="text-sm font-black text-amber-400 uppercase tracking-[0.3em] border-l-4 border-emerald-500 pl-4">
            The Psychological Edge
          </h2>
          <div className="text-[14px] leading-relaxed text-emerald-400/90 space-y-4">
            <p>
              Traditional fitness tracking is often plagued by "data fatigue"—the phenomenon where users lose interest due to the
              monotony of logging. The M.M.S. counters this by reframing the body as a <span className="text-emerald-500 font-bold">manifestation target</span>.
            </p>
            <p>
              By treating your physical growth as a persistent character file, you decouple your emotional state from daily
              fluctuations. You aren't just "working out"; you are executing a <span className="text-emerald-500 font-bold">calibration sequence</span>.
              This mindset shifts the focus from short-term frustration to long-term architectural evolution.
            </p>
          </div>
        </section>

        {/* System Maintenance & Evolution */}
        <section className="mb-16 space-y-6">
          <h2 className="text-sm font-black text-amber-400 uppercase tracking-[0.3em] border-l-4 border-emerald-500 pl-4">
            Maintenance & Evolution
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Integrity', detail: 'Consistent measurement methods prevent "data drift". Always measure at the same time.' },
              { label: 'Progression', detail: 'When an "S" rank is reached, the system requires a new baseline reset for secondary muscle groups.' },
              { label: 'Storage', detail: 'Your data is the historical record of your biological change—treat this archive with priority.' }
            ].map((item) => (
              <div key={item.label} className="border border-emerald-400/30 p-5 bg-emerald-950/5">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-2">{item.label}</h4>
                <p className="text-[14px] text-emerald-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-emerald-900 text-[9px] uppercase tracking-[0.4em] text-emerald-400 text-center">
          End of Archive / System Integrity Verified / Access Granted
        </footer>
      </div>
    </div>
  );
}