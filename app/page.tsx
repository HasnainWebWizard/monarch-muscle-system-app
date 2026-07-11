// app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMetrics } from './context/MetricsContext';
import { OnboardingForm } from './components/OnboardingForm';

export default function Home() {
  const { stats } = useMetrics();
  const router = useRouter();

  // Route protection layer: redirect directly if profile already matches
  useEffect(() => {
    if (stats.isConfigured && stats.heightCm > 0) {
      router.replace('/awaken');
    }
  }, [stats.isConfigured, stats.heightCm, router]);

  // Don't flash content if already active
  if (stats.isConfigured && stats.heightCm > 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold animate-pulse">
          Synchronizing Core...
        </div>
      </div>
    );
  }

  return <OnboardingForm />;
}