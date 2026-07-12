'use client';
import React, { useState } from 'react';
import { useMetrics } from '../context/MetricsContext';
import { OnboardingForm } from '../components/OnboardingForm';

export function ProfileClassificationHud() {
  const { stats, getMuscleRank } = useMetrics();
  const [isEditing, setIsEditing] = useState(false);

  // 1. Calculate Level
  const totalInches = Object.values(stats.musclePoints || {}).reduce((a, b) => a + b, 0);
  const baseLevel = Math.max(1, Math.floor(totalInches / 6));
  const gymCount = (stats.weeklyCheckIns || []).length;
  const calculatedLevel = baseLevel + Math.floor(gymCount * 0.5);

  // 2. Calculate Rank
  const musclePoints = stats.musclePoints || {};
  const muscleKeys = Object.keys(musclePoints) as (keyof typeof musclePoints)[];
  const muscleRanks = muscleKeys.map(m => getMuscleRank(m, musclePoints[m]));

  const rankMap: Record<string, number> = { 'E': 1, 'D': 2, 'C': 3, 'B': 4, 'A': 5, 'S': 6 };
  const numericRanks = muscleRanks.map(r => rankMap[r.charAt(0)] || 1);
  const avgNumeric = Math.round(numericRanks.reduce((a, b) => a + b, 0) / (numericRanks.length || 1));
  const inverseRankMap: Record<number, string> = { 1: 'E', 2: 'D', 3: 'C', 4: 'B', 5: 'A', 6: 'S' };
  const calculatedRank = inverseRankMap[avgNumeric] || 'E';

  if (isEditing) {
    return (
      <div className="w-full max-w-sm mx-auto p-6 bg-[#0a0a0c] border border-amber-800">
        <h3 className="text-amber-500 font-black text-center mb-4 uppercase tracking-widest">[ Edit Profile ]</h3>
        {/* Pass stats as initial data to your form */}
        <OnboardingForm initialData={stats} onComplete={() => setIsEditing(false)} />
        <button 
          onClick={() => setIsEditing(false)}
          className="w-full mt-4 text-amber-800 text-[10px] font-black uppercase hover:text-amber-500"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0a0a0c] border border-amber-900/40 p-6 shadow-[0_0_20px_rgba(217,119,6,0.1)] w-full max-w-sm mx-auto">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-600/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-600/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-600/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-600/50" />

      {/* Header */}
      <div className="flex flex-col items-center border-b border-amber-900/30 pb-6 mb-6">
        <button 
          onClick={() => setIsEditing(true)}
          className="cursor-pointer absolute top-2 right-2 text-amber-900 hover:text-amber-500 text-[8px] font-black uppercase tracking-widest transition-colors"
        >
          [Edit]
        </button>
        <div className="flex items-baseline gap-4 mb-1">
          <div className="text-xl text-amber-700 font-serif font-black">LV.{calculatedLevel}</div>
          <div className="text-4xl font-serif font-black tracking-tighter text-amber-500 drop-shadow-[0_0_5px_rgba(217,119,6,0.5)]">
            {calculatedRank} <span className='text-xl text-amber-700'>RANK</span>
          </div>
        </div>
        <div className="text-amber-600 font-bold text-[10px] tracking-[0.2em] uppercase bg-amber-950/30 px-3 py-1 border border-amber-900/50">
          Physique Standing
        </div>
      </div>

      <div className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-black mb-6 text-center">
        <span className='text-lg text-amber-100 drop-shadow-[0_0_5px_rgba(217,119,6,0.5)] font-serif'>
          {stats.name}
        </span>
        <br />
        Muscle Manifestation System
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-amber-900/20 bg-black/40 p-3 text-center">
          <div className="text-[8px] text-amber-800 uppercase tracking-widest font-bold mb-1">Height</div>
          <div className="text-sm font-mono text-amber-200 font-bold">{stats.heightCm} CM</div>
        </div>
        <div className="border border-amber-900/20 bg-black/40 p-3 text-center">
          <div className="text-[8px] text-amber-800 uppercase tracking-widest font-bold mb-1">Mass</div>
          <div className="text-sm font-mono text-amber-200 font-bold">{stats.weightKg} KG</div>
        </div>
      </div>
    </div>
  );
}