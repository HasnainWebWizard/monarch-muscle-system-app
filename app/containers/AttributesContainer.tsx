'use client';

import React, { useState } from 'react';
import { useMetrics, MusclePoints } from '../context/MetricsContext';

interface MuscleMetrics {
  min: number;
  next: number | null;
  currentRank: string;
  nextRank: string;
}

export function AttributesContainer() {
  const { stats, getMuscleRank, updateMusclePoints } = useMetrics();
  const [manualMode, setManualMode] = useState(false);

  const bounds: Record<keyof MusclePoints, { rank: string; val: number }[]> = {
    shoulders: [{ rank: 'D', val: 44 }, { rank: 'C', val: 46 }, { rank: 'B', val: 48 }, { rank: 'A', val: 50 }, { rank: 'S', val: 52 }],
    chest:     [{ rank: 'D', val: 36.5 }, { rank: 'C', val: 38.5 }, { rank: 'B', val: 40.5 }, { rank: 'A', val: 43 }, { rank: 'S', val: 45 }],
    biceps:    [{ rank: 'D', val: 12 }, { rank: 'C', val: 13 }, { rank: 'B', val: 14.25 }, { rank: 'A', val: 15.5 }, { rank: 'S', val: 16.75 }],
    forearms:  [{ rank: 'D', val: 10.25 }, { rank: 'C', val: 11 }, { rank: 'B', val: 11.75 }, { rank: 'A', val: 12.5 }, { rank: 'S', val: 13.25 }],
    thighs:    [{ rank: 'D', val: 19 }, { rank: 'C', val: 20.5 }, { rank: 'B', val: 22 }, { rank: 'A', val: 23.5 }, { rank: 'S', val: 25.5 }],
    calves:    [{ rank: 'D', val: 12.75 }, { rank: 'C', val: 13.5 }, { rank: 'B', val: 14.25 }, { rank: 'A', val: 15 }, { rank: 'S', val: 16 }],
  };

  const getRankBoundaries = (muscle: keyof MusclePoints, currentInches: number): MuscleMetrics => {
    const rank = getMuscleRank(muscle, currentInches);
    const tiers = bounds[muscle];
    
    if (rank === 'E-RANK') return { min: 0, next: tiers[0].val, currentRank: 'E', nextRank: 'D' };
    if (rank === 'S-RANK') return { min: tiers[tiers.length - 1].val, next: null, currentRank: 'S', nextRank: 'MAX' };

    const currentIndex = tiers.findIndex(t => `${t.rank}-RANK` === rank);
    const minVal = tiers[currentIndex].val;
    const nextTier = tiers[currentIndex + 1];

    return {
      min: minVal,
      next: nextTier.val,
      currentRank: tiers[currentIndex].rank,
      nextRank: nextTier.rank
    };
  };

  const adjustStat = (key: keyof MusclePoints, amount: number) => {
    const currentVal = stats.musclePoints[key] || 0;
    const updatedVal = parseFloat(Math.max(0, currentVal + amount).toFixed(2));
    updateMusclePoints({ [key]: updatedVal });
  };

  const handleInputChange = (key: keyof MusclePoints, valueStr: string) => {
    const parsed = parseFloat(valueStr);
    updateMusclePoints({ [key]: isNaN(parsed) ? 0 : parsed });
  };

  const muscleKeys = Object.keys(stats.musclePoints) as Array<keyof MusclePoints>;

  return (
    <div className="relative bg-[#0a0a0c] border border-amber-900/40 p-5 sm:p-6 shadow-[0_0_20px_rgba(217,119,6,0.1)]">
      {/* Ancient Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-600/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-600/50" />

      <div className="flex justify-between items-center border-b border-amber-900/30 pb-4 mb-6">
        <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-amber-500">
          Attribute Manifestation
        </h3>
        <button
          onClick={() => setManualMode(!manualMode)}
          className={`px-3 py-1 text-[8px] sm:text-[9px] font-black uppercase tracking-widest border transition-all ${
            manualMode 
              ? 'bg-amber-950/60 border-amber-500 text-amber-400' 
              : 'bg-black border-amber-900/40 text-amber-700 hover:border-amber-700'
          }`}
        >
          {manualMode ? '⚡ Input Active' : '✏️ Manual Overrides'}
        </button>
      </div>
      
      <div className="space-y-6">
        {muscleKeys.map((key) => {
          const inches = stats.musclePoints[key] || 0;
          const currentRank = getMuscleRank(key, inches);
          const { min, next, nextRank } = getRankBoundaries(key, inches);

          let percent = 0;
          let remaining = 0;
          if (next !== null) {
            const range = next - min;
            const progress = inches - min;
            percent = Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
            remaining = parseFloat((next - inches).toFixed(2));
          } else {
            percent = 100;
          }

          return (
            <div key={key} className="space-y-2 group">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="capitalize font-black tracking-widest text-amber-100">{key}</span>
                
                <div className="flex items-center gap-3">
                  {/* Highlighted Rank Badge */}
                  <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase border tracking-tight ${
                    currentRank.startsWith('S') ? 'bg-amber-500/10 text-amber-400 border-amber-500/40' :
                    currentRank.startsWith('A') ? 'bg-amber-800/20 text-amber-500 border-amber-800/40' :
                    'bg-black border-amber-900/50 text-amber-800'
                  }`}>
                    {currentRank}
                  </span>

                  {!manualMode ? (
                    <div className="flex items-center bg-black border border-amber-900/30 rounded">
                      <button onClick={() => adjustStat(key, -0.25)} className="px-2 py-1 text-amber-700 hover:text-amber-400 font-black cursor-pointer">-</button>
                      <span className="px-2 font-mono text-amber-200 text-xs sm:text-sm min-w-[40px] text-center">{inches}"</span>
                      <button onClick={() => adjustStat(key, 0.25)} className="px-2 py-1 text-amber-700 hover:text-amber-400 font-black cursor-pointer">+</button>
                    </div>
                  ) : (
                    <input
                      type="number" step="0.25" value={inches || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-16 bg-black border border-amber-700/50 text-amber-100 font-mono text-xs sm:text-sm text-center py-1 outline-none focus:border-amber-500"
                    />
                  )}
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative w-full h-1.5 bg-black border border-amber-900/30 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-800 to-amber-500 transition-all duration-500" 
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between text-[8px] sm:text-[9px] font-mono text-amber-900/80 uppercase">
                <span>{percent}% through tier</span>
                <span>{next !== null ? `${remaining}" until ${nextRank}-RANK` : 'MAX CEILING'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}