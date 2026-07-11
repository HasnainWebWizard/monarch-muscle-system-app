'use client';

import React from 'react';
import { useMetrics } from '../context/MetricsContext';

export default function DailyQuestLog() {
  const { stats, incrementWater, resetWater, waterGoalLiters, checkInWorkout } = useMetrics();

  // Filter out check-ins that occurred within the last 7 rolling days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const currentDate = new Date();
  
  const sessionsThisWeek = (stats.weeklyCheckIns || []).filter(dateStr => {
    const d = new Date(dateStr);
    return d >= oneWeekAgo && d <= currentDate;
  }).length;

  const waterProgressPct = Math.min(100, Math.round((stats.dailyWaterDrank / waterGoalLiters) * 100));
  const hasBuff = sessionsThisWeek >= 4;

  // Check if user already logged a workout session today
  const todayStr = new Date().toISOString().split('T')[0];
  const alreadyCheckedInToday = (stats.weeklyCheckIns || []).some(dateStr => dateStr.startsWith(todayStr));

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto space-y-6">
      <div>
        <div className="inline-flex items-center px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-950/40 text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1.5">
          Active Campaign
        </div>
        <h2 className="text-xl font-black text-slate-100 tracking-wide uppercase">Daily Quest Log</h2>
        <p className="text-xs text-slate-400">Complete objectives to maintain your level power modifiers.</p>
      </div>

      {/* Objective 1: Gym Check-In Frequency */}
      <div className="border-t border-slate-800/80 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Weekly Grind Status</span>
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${hasBuff ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}>
            {sessionsThisWeek} / 4 Workouts
          </span>
        </div>

        <button 
          onClick={checkInWorkout}
          disabled={alreadyCheckedInToday}
          className={`w-full font-bold py-2.5 px-4 rounded-xl transition-all text-xs uppercase tracking-widest ${
            alreadyCheckedInToday 
              ? 'bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white shadow-lg shadow-emerald-950/40'
          }`}
        >
          {alreadyCheckedInToday ? '✓ Gym Session Secured Today' : '⚔️ Secure Gym Check-In'}
        </button>

        {hasBuff && (
          <div className="text-[11px] text-amber-400 mt-2.5 font-bold flex items-center gap-1.5 animate-pulse">
            <span>✨</span> High-Frequency Buff Active (+5 Level Multiplier Applied)
          </div>
        )}
      </div>

      {/* Objective 2: Hydration Target Loop */}
      <div className="border-t border-slate-800/80 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Hydration Tracker</span>
          <span className="text-xs font-mono font-bold text-cyan-400">{stats.dailyWaterDrank}L / {waterGoalLiters}L</span>
        </div>
        
        {/* Progress bar container track */}
        <div className="w-full bg-slate-950 rounded-full h-2 mb-4 overflow-hidden border border-slate-800/40">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${waterProgressPct}%` }}
          />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => incrementWater(0.25)}
            className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold py-2 rounded-xl text-[11px] uppercase tracking-wider transition-colors"
          >
            + 250ml
          </button>
          <button 
            onClick={() => incrementWater(0.5)}
            className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold py-2 rounded-xl text-[11px] uppercase tracking-wider transition-colors"
          >
            + 500ml
          </button>
          <button 
            onClick={resetWater}
            className="bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/40 text-slate-500 hover:text-red-400 px-3 rounded-xl text-xs transition-colors"
            title="Reset Counter"
          >
            🔄
          </button>
        </div>
      </div>
    </div>
  );
}