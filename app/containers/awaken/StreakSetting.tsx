'use client';
import React from 'react';
import { useMetrics } from '@/app/context/MetricsContext';

export default function StreakSetting() {
  const { stats, updateStats } = useMetrics();
  
  const today = new Date().toISOString().split('T')[0];
  const isCheckedToday = stats.weeklyCheckIns?.includes(today);

  const toggleDate = (date: string) => {
    const current = stats.weeklyCheckIns || [];
    const updated = current.includes(date) 
      ? current.filter(d => d !== date) 
      : [...current, date];
    updateStats({ weeklyCheckIns: updated });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activity Log</h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Total Logs: {stats.weeklyCheckIns?.length || 0}</p>
        </div>
        
        {/* Quick Add Button */}
        <button 
          onClick={() => toggleDate(today)}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
            isCheckedToday ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-cyan-950 text-cyan-400 border border-cyan-900'
          }`}
        >
          {isCheckedToday ? '✓ Logged Today' : '+ Log Today'}
        </button>
      </div>

      {/* Date Picker for Manual Entry */}
      <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <span className="text-[9px] font-bold text-slate-600 uppercase px-2">Manual Entry:</span>
        <input
          type="date"
          value={today}
          onChange={(e) => toggleDate(e.target.value)}
          className="bg-transparent text-[10px] text-slate-300 font-mono focus:outline-none w-full"
        />
      </div>
    </div>
  );
}