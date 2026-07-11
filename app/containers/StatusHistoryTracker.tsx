'use client';
import React from 'react';
import { useMetrics } from '../context/MetricsContext';

export function StatusHistoryTracker() {
  const { stats, saveCurrentSnapshot, deleteSnapshot, getMuscleRank } = useMetrics();

  return (
    <div className="bg-[#0a0a0c] border border-emerald-900/40 p-4 sm:p-8 w-full mx-auto shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4 border-b border-emerald-900/40 pb-6">
        <h3 className="text-md font-black uppercase tracking-[0.3em] text-emerald-500">
          Archival Ledger
        </h3>
        <button
          onClick={saveCurrentSnapshot}
          className="relatve border border-amber-900/40 bg-black  text-emerald-500 px-6 py-2 text-[9px] font-black uppercase tracking-widest hover:border-emerald-700 hover:text-emerald-400 transition-all w-full sm:w-auto cursor-pointer"
        >
          Save Current Progress
        </button>
      </div>

      {/* Logs Container */}
      <div className="space-y-6">
        {(stats.historyLogs || []).map((log) => (
          <div key={log.id} className="relative bg-[#0a0a0c] border border-emerald-900/30 p-4 sm:p-6">
            {/* Delete Action */}
            <button
              onClick={() => deleteSnapshot(log.id)}
              className="absolute cursor-pointer -top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-white transition-colors text-xs font-black"
            >
              X
            </button>

            {/* Header: Timestamp & Rank */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2 ">
              <span className="text-[11px] text-emerald-200 font-mono tracking-widest uppercase">{log.timestamp}</span>
              <div className="text-left sm:text-right mt-2">
                <span className="text-[11px] text-emerald-500 font-black uppercase tracking-widest mr-3">Status Level</span>
                <span className="text-lg font-serif font-black text-emerald-100">{log.playerRank} | LV.{log.overallLevel}</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(log.musclePoints).map(([name, val]) => (
                <div key={name} className="border border-emerald-900/20 bg-black/40 p-3">
                  <div className="text-[8px] text-emerald-500 uppercase tracking-[0.2em] font-black mb-1">{name}</div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-mono text-emerald-200">{val}"</span>
                    <span className="text-[11px] text-emerald-200 font-black uppercase">{getMuscleRank(name as any, val)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {(!stats.historyLogs || stats.historyLogs.length === 0) && (
          <div className="text-center py-10 border border-dashed border-emerald-900/30">
            <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-black">No Records In Ledger</p>
          </div>
        )}
      </div>
    </div>
  );
}