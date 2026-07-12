// app/context/MetricsContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MusclePoints {
  shoulders: number;
  chest: number;
  biceps: number;
  forearms: number;
  thighs: number;
  calves: number;
  // Change the index signature to explicitly return number, 
  // and ensure the specific keys are not marked as optional.
  [key: string]: number;
}

export interface StatusHistorySnapshot {
  id: string;
  timestamp: string;
  overallLevel: number;
  playerRank: string;
  weightKg: number;
  heightCm: number;
  musclePoints: MusclePoints; // Ensure this is here!
}

export interface PlayerStats {
  isConfigured: boolean;
  name?: string; // Add this line
  heightCm: number;
  weightKg: number;
  age?: number;
  gender?: string;
  dailyWaterDrank: number;
  weeklyCheckIns: string[];
  gymStartDate: string;
  musclePoints: MusclePoints;
  historyLogs?: StatusHistorySnapshot[];
}

interface MetricsContextType {
  stats: PlayerStats;
  updateStats: (newStats: Partial<PlayerStats>) => void;
  updateMusclePoints: (points: Partial<MusclePoints>) => void;
  incrementWater: (amount: number) => void;
  resetWater: () => void;
  playerRank: string;
  getMuscleRank: (muscleName: keyof MusclePoints, inches: number) => string;
  overallLevel: number;
  waterGoalLiters: number;
  checkInWorkout: () => void;
  saveCurrentSnapshot: () => void;
  deleteSnapshot: (id: string) => void;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

const defaultStats: PlayerStats = {
  isConfigured: false,
  heightCm: 0,
  weightKg: 0,
  dailyWaterDrank: 0,
  weeklyCheckIns: [],
  gymStartDate: new Date().toISOString().split('T')[0],
  musclePoints: { shoulders: 0, chest: 0, biceps: 0, forearms: 0, thighs: 0, calves: 0 },
  historyLogs: []
};

export function MetricsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<PlayerStats>(defaultStats);

  useEffect(() => {
    const saved = localStorage.getItem('monarch_metrics');
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveAndSet = (newStats: PlayerStats) => {
    setStats(newStats);
    localStorage.setItem('monarch_metrics', JSON.stringify(newStats));
  };

  const updateStats = (newStats: Partial<PlayerStats>) => {
    saveAndSet({ ...stats, ...newStats });
  };

  const updateMusclePoints = (points: Partial<MusclePoints>) => {
    // Create a copy and merge explicitly
    const updatedMusclePoints: MusclePoints = {
      ...stats.musclePoints,
      ...points,
    } as MusclePoints;

    saveAndSet({
      ...stats,
      musclePoints: updatedMusclePoints
    });
  };
  const incrementWater = (amount: number) => {
    saveAndSet({ ...stats, dailyWaterDrank: parseFloat((stats.dailyWaterDrank + amount).toFixed(2)) });
  };

  const resetWater = () => saveAndSet({ ...stats, dailyWaterDrank: 0 });

  const getMuscleRank = (muscle: keyof MusclePoints, inches: number): string => {
    const targets: Record<keyof MusclePoints, number[]> = {
      shoulders: [44, 46, 48, 50, 52],
      chest: [36.5, 38.5, 40.5, 43, 45],
      biceps: [12, 13, 14.25, 15.5, 16.75],
      forearms: [10.25, 11, 11.75, 12.5, 13.25],
      thighs: [19, 20.5, 22, 23.5, 25.5],
      calves: [12.75, 13.5, 14.25, 15, 16],
    };
    const vals = targets[muscle];
    if (inches < vals[0]) return 'E-RANK';
    if (inches < vals[1]) return 'D-RANK';
    if (inches < vals[2]) return 'C-RANK';
    if (inches < vals[3]) return 'B-RANK';
    if (inches < vals[4]) return 'A-RANK';
    return 'S-RANK';
  };

  // --- Dynamic Level Calculus (Recalibrated) ---
  const totalInches = Object.values(stats.musclePoints).reduce((a, b) => a + b, 0);

  // 1. Level scaling: Divide by 5.0 to prevent early inflation.
  const baseLevel = Math.max(1, Math.floor(totalInches / 5.0));

  // 2. Activity bonus: 0.5 points per unique day logged in history.
  const gymCount = (stats.weeklyCheckIns || []).length;
  const overallLevel = baseLevel + Math.floor(gymCount * 0.5);

  // 3. Hardened Thresholds: S-RANK is now a high-level achievement.
  const playerRank = overallLevel >= 80 ? 'S-RANK' :
    overallLevel >= 50 ? 'A-RANK' :
      overallLevel >= 30 ? 'B-RANK' :
        overallLevel >= 15 ? 'C-RANK' : 'D-RANK';

  const checkInWorkout = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!(stats.weeklyCheckIns || []).includes(today)) {
      saveAndSet({ ...stats, weeklyCheckIns: [...(stats.weeklyCheckIns || []), today] });
    }
  };

  // app/context/MetricsContext.tsx

  const saveCurrentSnapshot = () => {
    const snap: StatusHistorySnapshot = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleString('en-US', { hour12: true }),
      overallLevel,
      playerRank,
      // Add these fields explicitly:
      weightKg: stats.weightKg,
      heightCm: stats.heightCm,
      musclePoints: { ...stats.musclePoints },
      // If you have a specific object for body potential, add it:
      // bodyPotential: { ...stats.bodyPotential }, 
    };

    saveAndSet({ ...stats, historyLogs: [snap, ...(stats.historyLogs || [])] });
  };

  const deleteSnapshot = (id: string) => {
    saveAndSet({ ...stats, historyLogs: (stats.historyLogs || []).filter(l => l.id !== id) });
  };

  return (
    <MetricsContext.Provider value={{
      stats, updateStats, updateMusclePoints, incrementWater, resetWater,
      playerRank, getMuscleRank, overallLevel, waterGoalLiters: 3.5, checkInWorkout,
      saveCurrentSnapshot, deleteSnapshot
    }}>
      {children}
    </MetricsContext.Provider>
  );
}

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) throw new Error('useMetrics must be used within a MetricsProvider');
  return context;
};