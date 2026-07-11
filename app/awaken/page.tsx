'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMetrics } from '../context/MetricsContext';
import { AttributesContainer } from '../containers/AttributesContainer';
import { StatusHistoryTracker } from '../containers/StatusHistoryTracker';
import { BodyPotentialHud } from '../containers/BodyPotentialHud';
import { ProfileClassificationHud } from '../containers/ProfileClassificationHud';
import { CharacterFooterFieldGuide } from '../containers/CharacterFooterFieldGuide';

export default function AwakenPage() {
  const { stats } = useMetrics();
  const router = useRouter();

  useEffect(() => {
    if (!stats.isConfigured || stats.heightCm === 0) {
      router.replace('/');
    }
  }, [stats.isConfigured, stats.heightCm, router]);

  if (!stats.isConfigured || stats.heightCm === 0) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 p-4 md:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Page Header */}
        <header className="flex flex-wrap justify-between items-end border-b border-cyan-600 pb-4 gap-2">
          <div className='w-full text-center'>
            <h1 className="text-lg md:text-left w-full font-black uppercase tracking-tight text-white">Muscle Monitor App</h1>
            <p className="text-cyan-500 text-xs uppercase tracking-widest mt-1">Measure Muscle inch by inch</p>
          </div>
          <div className=" w-full text-center">
            <h1 className="text-md md:text-xl font-black uppercase text-emerald-100">
              Welcome
              {/* Welcome <br /> {stats.name || 'Initiate'} */}
            </h1>
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest">
              System active for your physical registry.
            </p>
            <a href='/info' className='cursor-pointor text-xs text-right'>Info</a>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Stats & HUDs */}
          <div className="lg:col-span-4 space-y-6">
            <ProfileClassificationHud />
            <BodyPotentialHud />
          </div>

          {/* Right Column: Attribute Manifestation (Primary Focus) */}
          <div className="lg:col-span-8">
            <div className="h-full relative bg-[#0a0a0c] border border-amber-900/40 p-3 sm:p-6 shadow-[0_0_20px_rgba(217,119,6,0.1)]">
              {/* Ancient Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-600/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-600/50" />
              {/* <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Attribute Development</h2> */}
              <AttributesContainer />
            </div>
          </div>
        </div>

        {/* Footer Area: History & Extras */}
        <StatusHistoryTracker />
        <CharacterFooterFieldGuide />
      </div>
    </main>
  );
}