'use client';
import React from 'react';
import { useMetrics } from '../context/MetricsContext';

export function ProfileClassificationHud() {
  const { stats, playerRank, overallLevel } = useMetrics();

  return (
    <div className="relative bg-[#0a0a0c] border border-amber-900/40 p-6 shadow-[0_0_20px_rgba(217,119,6,0.1)]">
      {/* Ancient Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-600/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-600/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-600/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-600/50" />

      {/* Header */}
      <div className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-black mb-4 text-center">
        Bloodline Manifestation
        <br />
        <span className='animate-pulse text-lg text-amber-100 drop-shadow-[0_0_5px_rgba(217,119,6,0.5)] font-serif'>
          {stats.name}
        </span>
      </div>

      {/* Main Level & Rank Display */}
      <div className="flex flex-col items-center border-b border-amber-900/30 pb-6 mb-6">
        <div className="text-5xl font-serif font-bold tracking-tighter text-amber-500 drop-shadow-[0_0_5px_rgba(217,119,6,0.5)] mb-1">

          <span className='text-3xl'>LVL</span> {overallLevel}
        </div>
        <div className="animate-pulse text-amber-600 font-bold text-[10px] tracking-[0.2em] uppercase bg-amber-950/30 px-3 py-1 border border-amber-900/50">
          {playerRank} Tier
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-amber-900/20 bg-black/40 p-3 text-center">
          <div className="text-[9px] text-amber-800 uppercase tracking-widest font-bold mb-1">Height</div>
          <div className="text-xs font-mono text-amber-200 font-bold">{stats.heightCm} CM</div>
        </div>
        <div className="border border-amber-900/20 bg-black/40 p-3 text-center">
          <div className="text-[9px] text-amber-800 uppercase tracking-widest font-bold mb-1">Mass</div>
          <div className="text-xs font-mono text-amber-200 font-bold">{stats.weightKg} KG</div>
        </div>
      </div>
    </div>
  );
}