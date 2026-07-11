'use client';

import React from 'react';
import { useMetrics } from '../context/MetricsContext';

export default function ProfileSettings() {
  const { stats, updateStats } = useMetrics();

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-xl font-black text-cyan-400 tracking-wide uppercase mb-4">
        Timeline Configuration
      </h2>
      <div>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
          Journey Awakening Date (Gym Start)
        </label>
        <input
          type="date"
          value={stats.gymStartDate || ''}
          onChange={(e) => updateStats({ gymStartDate: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono text-sm transition-colors"
        />
        <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
          The core engine calculates your passive commitment bonus values dynamically based on total days passed since this setting marker.
        </p>
      </div>
    </div>
  );
}