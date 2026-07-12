'use client';
import React, { useState } from 'react';
import { useMetrics } from '../context/MetricsContext';

export function StatusHistoryTracker() {
  const { stats, saveCurrentSnapshot, deleteSnapshot, getMuscleRank, updateStats } = useMetrics();

  // State for handling inline edits
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const startEdit = (log: any) => {
    setEditingId(log.id);
    // Create a deep copy of the log to prevent accidental state mutation
    setEditForm(JSON.parse(JSON.stringify(log)));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (!editingId || !editForm) return;

    // Update the specific log in the history array
    const updatedLogs = (stats.historyLogs || []).map((log) =>
      log.id === editingId ? editForm : log
    );

    updateStats({ historyLogs: updatedLogs });
    setEditingId(null);
    setEditForm(null);
  };

  const handleMuscleChange = (muscleName: string, value: string) => {
    setEditForm({
      ...editForm,
      musclePoints: {
        ...editForm.musclePoints,
        [muscleName]: parseFloat(value) || 0
      }
    });
  };

  const getRankRemark = (rank: string) => {
    switch (rank) {
      case "S":
        return "Peak physical specimen. Exceptional muscular development.";
      case "A":
        return "Elite physique. Minor improvements remain.";
      case "B":
        return "Advanced musculature. Above operational standards.";
      case "C":
        return "Solid foundation. Consistent progression observed.";
      case "D":
        return "Developing physique. Further training recommended.";
      default:
        return "Recruit-level development. Establish baseline strength.";
    }
  };

  const getPotentialRemark = (potential: number) => {
    if (potential >= 95)
      return "Near the estimated natural ceiling. Only marginal gains remain.";
    if (potential >= 85)
      return "Elite physical development. Most genetic potential has been realized.";
    if (potential >= 70)
      return "Advanced muscular development. Significant progress has been documented.";
    if (potential >= 55)
      return "Strong foundation established. High growth potential remains.";
    if (potential >= 40)
      return "Early adaptation phase. Consistent training will yield substantial returns.";
    return "Initial development stage. The majority of projected potential remains untapped.";
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      {/* Ledger Header */}
      <div className="flex justify-between items-end border-b-2 border-amber-800 pb-4 mb-10">
        <h3 className="text-xl font-serif font-black uppercase tracking-widest text-amber-500 italic">
          Archival Ledger
        </h3>
        <button
          onClick={saveCurrentSnapshot}
          className="bg-amber-950/30 border border-amber-600 text-amber-500 px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-black transition-all cursor-pointer"
        >
          [ Log New Entry ]
        </button>
      </div>

      {/* Logs Container */}
      <div className="space-y-12">
        {(stats.historyLogs || []).map((log) => {
          const isEditing = editingId === log.id;
          const isExpanded = expandedLog === log.id;
          const targetData = isEditing ? editForm : log;

          // --- DYNAMIC CALCULATION ENGINE ---
          // This guarantees the Ledger ALWAYS matches the Profile HUD perfectly.
          const totalInches = Object.values(targetData.musclePoints).reduce((a: any, b: any) => a + b, 0) as number;
          const baseLevel = Math.max(1, Math.floor(totalInches / 6));
          const gymCount = (stats.weeklyCheckIns || []).length;
          const calculatedLevel = baseLevel + Math.floor(gymCount * 0.5);

          const muscleKeys = Object.keys(targetData.musclePoints) as string[];
          const muscleRanks = muscleKeys.map(m => getMuscleRank(m as any, targetData.musclePoints[m] as number));

          const rankMap: Record<string, number> = { 'E': 1, 'D': 2, 'C': 3, 'B': 4, 'A': 5, 'S': 6 };
          const numericRanks = muscleRanks.map(r => rankMap[r.charAt(0)] || 1);

          const avgNumeric = Math.round(
            numericRanks.reduce((a, b) => a + b, 0) / (numericRanks.length || 1)
          );

          const inverseRankMap: Record<number, string> = { 1: 'E', 2: 'D', 3: 'C', 4: 'B', 5: 'A', 6: 'S' };
          const calculatedRank = inverseRankMap[avgNumeric] || 'E';
          // --- POTENTIAL CALCULATION ---
          const heightMeters = 1.727; // or targetData.heightCm / 100 if you want it dynamic
          const maxWeightLimit = 25 * (heightMeters * heightMeters);

          const muscleSum = Object.values(targetData.musclePoints).reduce(
            (a: any, b: any) => a + b,
            0
          ) as number;

          const weightProgress = Math.min(
            100,
            (targetData.weightKg / maxWeightLimit) * 100
          );

          const muscleProgress = Math.min(
            100,
            (muscleSum / 180) * 100
          );

          const totalReached = (weightProgress * 0.6) + (muscleProgress * 0.4);
          // ------------------------------

          return (
            <div key={log.id} className="relative bg-[#050505] border border-amber-900/30 p-8 shadow-2xl transition-all">

              {/* Action Buttons (Top Right) */}
              <div className="absolute top-4 right-4 flex gap-4">
                {isEditing ? (
                  <>
                    <button onClick={saveEdit} className="text-green-600 hover:text-green-400 text-xs font-black uppercase tracking-widest transition-colors">
                      [Save]
                    </button>
                    <button onClick={cancelEdit} className="text-amber-700 hover:text-amber-500 text-xs font-black uppercase tracking-widest transition-colors">
                      [Cancel]
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                      className="text-amber-500 hover:text-amber-300 text-xs font-black uppercase tracking-widest transition-colors"
                    >
                      [{isExpanded ? "Hide" : "View"}]
                    </button>
                    <button onClick={() => startEdit(log)} className="text-amber-900 hover:text-amber-600 text-xs font-black uppercase tracking-widest transition-colors">
                      [Edit]
                    </button>
                    <button onClick={() => deleteSnapshot(log.id)} className="text-amber-900 hover:text-red-700 text-xs font-black uppercase tracking-widest transition-colors">
                      [Delete]
                    </button>
                  </>
                )}
              </div>

              {/* Entry Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 mt-4 md:mt-0">
                {/* Timestamp */}
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.timestamp}
                    onChange={(e) => setEditForm({ ...editForm, timestamp: e.target.value })}
                    className="bg-black/60 border border-amber-800 text-amber-500 p-2 text-lg font-serif italic outline-none focus:border-amber-500  w-full md:w-64"
                  />
                ) : (
                  <div className="text-base text-amber-400">
                    {new Date(log.timestamp).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                )}

                <div className="hidden md:block h-10 w-px bg-amber-900/50" />

                {/* Classification HUD Sync */}
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-amber-700">Classification</div>
                  <div className="text-sm font-black text-amber-400">
                    {calculatedRank}-RANK | Level {calculatedLevel}
                  </div>
                </div>

                {/* Baseline Editing */}
                <div className="md:ml-auto text-left md:text-right flex gap-4 md:block">
                  <div className="text-[9px] uppercase tracking-widest text-amber-700 mb-1">Baseline</div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={editForm.weightKg}
                        onChange={(e) => setEditForm({ ...editForm, weightKg: parseFloat(e.target.value) || 0 })}
                        className="w-16 bg-black/60 border border-amber-800 text-amber-200 text-xs p-1 outline-none text-center"
                      />
                      <span className="text-xs text-amber-700 self-center font-mono">KG</span>
                      <input
                        type="number"
                        value={editForm.heightCm}
                        onChange={(e) => setEditForm({ ...editForm, heightCm: parseFloat(e.target.value) || 0 })}
                        className="w-16 bg-black/60 border border-amber-800 text-amber-200 text-xs p-1 outline-none text-center"
                      />
                      <span className="text-xs text-amber-700 self-center font-mono">CM</span>
                    </div>
                  ) : (
                    <div className="text-sm font-mono text-amber-200">{log.weightKg} KG / {log.heightCm} CM</div>
                  )}
                </div>
              </div>

              {/* Metrics Grid */}
              {isExpanded && (
                <>
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {Object.entries(targetData.musclePoints).map(([name, val]) => {
                      const numVal = val as number;
                      const rank = getMuscleRank(name as any, numVal);

                      return (
                        <div key={name} className={`border p-2 text-center transition-colors ${isEditing ? 'border-amber-600 bg-amber-950/20' : 'border-amber-950 bg-black/50'}`}>
                          <div className="text-[7px] uppercase tracking-widest text-amber-800 font-bold mb-1">{name}</div>

                          {isEditing ? (
                            <input
                              type="number"
                              step="0.1"
                              value={numVal}
                              onChange={(e) => handleMuscleChange(name, e.target.value)}
                              className="w-full bg-black/80 border border-amber-800 text-amber-100 text-xs font-mono text-center p-1 mb-1 outline-none focus:border-amber-500"
                            />
                          ) : (
                            <div className="text-xs font-mono text-amber-100 mb-1">{numVal}"</div>
                          )}

                          <div className="text-[8px] font-black text-amber-500 bg-amber-950/40 py-0.5">
                            {rank.replace('-RANK', '')}
                          </div>
                        </div>

                      );
                    })}

                  </div>
                  <div className="mt-6 border-t border-amber-900/40 pt-4">
                    <div className="text-[9px] uppercase tracking-widest text-amber-700">
                      Field Remark
                    </div>

                    <p className="text-xs text-amber-300 italic">
                      {getRankRemark(calculatedRank)}
                    </p>

                    <p className="mt-4 text-xs italic text-amber-300 leading-relaxed border-t border-amber-900/30 pt-4">
                      Biological Potential Achieved:{" "}
                      <span className="font-bold text-amber-200">
                        {totalReached.toFixed(1)}%
                      </span>
                      <br />
                      {getPotentialRemark(totalReached)}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}