// app/containers/BodyPotentialHud.tsx
'use client';

import React from 'react';
import { useMetrics } from '../context/MetricsContext';
import GlowingEyes from '../components/GlowingEyes';

export function BodyPotentialHud() {
  const { stats } = useMetrics();

  // 1. Height-based limit (5'8" = 172.7cm)
  const heightMeters = 1.727;
  const maxWeightLimit = (25 * (heightMeters * heightMeters)); // Natural Limit

  // 2. Calculate "Reached" %
  // Combined score: 60% based on weight, 40% based on muscle point sum (normalized to 180 inches)
  const muscleSum = Object.values(stats.musclePoints).reduce((a, b) => a + b, 0);
  const weightProgress = Math.min(100, (stats.weightKg / maxWeightLimit) * 100);
  const muscleProgress = Math.min(100, (muscleSum / 180) * 100);
  const totalReached = ((weightProgress * 0.6) + (muscleProgress * 0.4)).toFixed(1);

  return (
    <div className="relative bg-[#0a0a0c] border border-amber-900/40 p-6 shadow-[0_0_20px_rgba(217,119,6,0.1)]">
      {/* Sharp corner accents for that ancient RPG feel */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-600/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-600/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-600/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-600/50" />

      <div className="flex flex-col mb-4">
        <GlowingEyes />

        <h3 className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 drop-shadow-[0_0_5px_rgba(217,119,6,0.5)] mt-3">
          Biological Potential
        </h3>
        <span className="text-center text-xl font-black text-amber-200 drop-shadow-[0_0_5px_rgba(217,119,6,0.5)] font-serif tracking-tighter ">{totalReached}%</span>
      </div>

      {/* Visual Aura Progress Bar */}
      <div className="w-full bg-black h-2 border border-amber-900/50 overflow-hidden mb-4 relative">
        <div
          className="bg-gradient-to-r from-amber-700 via-rose-600 to-amber-700 h-full transition-all duration-1000 shadow-[0_0_15px_rgba(190,18,60,0.6)]"
          style={{ width: `${totalReached}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-[9px] uppercase tracking-widest text-amber-700/80">
        <div className="border border-amber-900/20 p-2 bg-amber-950/20">
          Frame Limit: <span className="text-amber-200 font-bold block text-[10px]">{maxWeightLimit.toFixed(1)}kg</span>
        </div>
        <div className="border border-amber-900/20 p-2 bg-amber-950/20">
          Muscle Volume: <span className="text-amber-200 font-bold block text-[10px]">{muscleSum.toFixed(1)}"</span>
        </div>
      </div>
    </div>
  );
}