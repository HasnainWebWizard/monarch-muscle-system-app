// app/containers/HydrationQuestTracker.tsx
'use client';

import React from 'react';
import { useMetrics } from '../context/MetricsContext';

export function HydrationQuestTracker() {
  const { stats, incrementWater, resetWater, waterGoalLiters } = useMetrics();

  return (
    <section className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-blue-950/40 relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-3">
        <div>
          <div className="inline-flex items-center px-2 py-0.5 rounded bg-blue-950/60 border border-blue-900/50 text-[9px] font-black tracking-widest text-blue-400 uppercase mb-1">
            Daily Quest
          </div>
          <h3 className="text-sm font-black uppercase text-slate-200 tracking-wide">Maintain Hydration Core</h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-300">{stats.dailyWaterDrank}</span>
          <span className="text-[10px] text-slate-500 mx-1">/</span>
          <span className="text-xs font-bold text-blue-400">{waterGoalLiters} L</span>
        </div>
      </div>

      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800/40 mb-4">
        <div
          className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full transition-all duration-300"
          style={{ width: `${Math.min(100, (stats.dailyWaterDrank / waterGoalLiters) * 100)}%` }}
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={() => incrementWater(0.25)} 
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] font-bold text-blue-300 transition-colors"
          >
            +250ml
          </button>
          <button 
            onClick={() => incrementWater(0.5)} 
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] font-bold text-blue-300 transition-colors"
          >
            +500ml
          </button>
        </div>
        <button 
          onClick={resetWater} 
          className="text-[9px] font-bold text-slate-600 hover:text-slate-400 uppercase tracking-wider transition-colors"
        >
          Clear Progress
        </button>
      </div>
    </section>
  );
}