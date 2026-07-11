// app/containers/CharacterFooterFieldGuide.tsx
'use client';

import React from 'react';
import { useMetrics } from '../context/MetricsContext';

export function CharacterFooterFieldGuide() {
  const { stats } = useMetrics();

  const feet = Math.floor(stats.heightCm / 30.48);
  const inches = Math.round((stats.heightCm % 30.48) / 2.54);

  return (
    <div className="w-full bg-slate-950/40 border border-slate-900/80 rounded-2xl p-5 text-left text-xs text-slate-400 space-y-3">
      <div className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1">
        <span>📜 THE FIELD GUIDE REFERENCE</span>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed">
        Designed for a{' '}
        <strong className="text-slate-200">
          {feet}&apos;{inches}&quot; ({stats.heightCm} cm) frame
        </strong>{' '}
        with a baseline weight of <strong className="text-slate-200">{stats.weightKg} kg</strong>. 
        Measures are cataloged on the <strong>10th of every month around 10:50 PM</strong> under rest 
        conditions using the identical scale tape.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[10px] text-slate-500 border-t border-slate-900">
        <div><span className="text-slate-400 font-bold">Shoulders S-Rank:</span> 52&quot;+</div>
        <div><span className="text-slate-400 font-bold">Chest S-Rank:</span> 45&quot;+</div>
        <div><span className="text-slate-400 font-bold">Arms S-Rank:</span> 16.75&quot;+</div>
        <div><span className="text-slate-400 font-bold">Forearms S-Rank:</span> 13.25&quot;+</div>
        <div><span className="text-slate-400 font-bold">Thighs S-Rank:</span> 25.5&quot;+</div>
        <div><span className="text-slate-400 font-bold">Calves S-Rank:</span> 16&quot;+</div>
      </div>
    </div>
  );
}