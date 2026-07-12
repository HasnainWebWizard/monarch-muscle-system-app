'use client';
import React from 'react';

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-emerald-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="border-b border-emerald-900/40 pb-8">
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Peak Muscle System</h1>
          <p className="text-emerald-700 text-[10px] uppercase tracking-[0.3em] mt-2 font-black">
            System Documentation & Anatomical Calibration
          </p>
        </header>

        {/* Methodology */}
        <section className="space-y-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500 border-l-2 border-emerald-700 pl-4">
            Methodology
          </h2>
          <p className="text-xs text-emerald-300/70 leading-relaxed max-w-2xl">
            The Peak Muscle System anchors physical progress to a visual RPG Rank System (Ranks E through S). 
            Instead of tracking arbitrary data, this system benchmarks your measurements against real-world 
            human biological standards tailored for a 5'8" frame. Nonetheless, Any height person can use this system.
          </p>
        </section>

        {/* Rank Definitions */}
        <section className="space-y-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500 border-l-2 border-emerald-700 pl-4">
            Rank Classifications
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-[10px] text-emerald-700 uppercase tracking-widest">
            <p><span className="text-emerald-500 font-bold">[Rank E] Underdeveloped:</span> Starting baseline for lean frames.</p>
            <p><span className="text-emerald-500 font-bold">[Rank D] Untrained:</span> Standard civilian average.</p>
            <p><span className="text-emerald-500 font-bold">[Rank C] Athletic:</span> Visible muscle shape and definition.</p>
            <p><span className="text-emerald-500 font-bold">[Rank B] Highly Developed:</span> Significant mass; "obvious lifter."</p>
            <p><span className="text-emerald-500 font-bold">[Rank A] Advanced:</span> Elite natural development.</p>
            <p><span className="text-emerald-500 font-bold">[Rank S] Elite:</span> Peak aesthetic V-taper and separation.</p>
          </div>
        </section>

        {/* Index Reference */}
        <section className="border-t border-emerald-900/30 pt-8">
          <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500 mb-6">5'8" Muscle Index Reference</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {['Shoulders', 'Chest', 'Arms', 'Forearms', 'Thighs', 'Calves'].map((muscle) => (
              <div key={muscle} className="bg-black/40 p-4 border border-emerald-900/20">
                <h3 className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-2">{muscle}</h3>
                <div className="text-[9px] text-emerald-800 space-y-1">
                  <p>E: {muscle === 'Shoulders' ? '<44' : muscle === 'Chest' ? '<36.5' : muscle === 'Arms' ? '<12' : muscle === 'Forearms' ? '<10.25' : muscle === 'Thighs' ? '<19' : '<12.75'}"</p>
                  <p>S: {muscle === 'Shoulders' ? '52+' : muscle === 'Chest' ? '45+' : muscle === 'Arms' ? '16.75+' : muscle === 'Forearms' ? '13.25+' : muscle === 'Thighs' ? '25.5+' : '16+'}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section className="border-t border-emerald-900/30 pt-8 space-y-3">
          <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500">Protocol</h2>
          <p className="text-[10px] text-emerald-700 tracking-widest uppercase">
            • Measure on the 10th of every month at 10:50 PM.
          </p>
          <p className="text-[10px] text-emerald-700 tracking-widest uppercase">
            • Conditions: Rest day or pre-workout; use consistent tape methodology.
          </p>
        </section>

        <footer className="text-[9px] text-emerald-900 uppercase tracking-widest pt-8 border-t border-emerald-900/20">
          Peak Muscle System | Live @ monarch-muscle-system-app.vercel.app
        </footer>
      </div>
    </div>
  );
}