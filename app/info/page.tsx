'use client';
import React from 'react';

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-emerald-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="border-b border-emerald-900/40 pb-8">
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">TrigrLog AI</h1>
          <p className="text-emerald-700 text-xs uppercase tracking-widest mt-2">Technical Documentation & System Logic</p>
        </header>

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500">System Overview</h2>
          <p className="text-sm text-emerald-200/80 leading-relaxed">
            TrigrLog AI is a developer utility designed to monitor and track performance metrics. 
            Initially built as a webhook-based notification system, the application has been 
            extended to support precise physical attribute tracking through a centralized dashboard.
          </p>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="border border-emerald-900/30 p-6 bg-black/40">
            <h3 className="text-xs font-black uppercase tracking-widest mb-3 text-emerald-400">Attribute Tracking</h3>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Real-time monitoring of muscle metrics (Shoulders, Chest, Biceps, Forearms, Thighs, Calves). 
              Includes manual override capability and direct data input for precise synchronization.
            </p>
          </div>
          <div className="border border-emerald-900/30 p-6 bg-black/40">
            <h3 className="text-xs font-black uppercase tracking-widest mb-3 text-emerald-400">Progression Logic</h3>
            <p className="text-xs text-emerald-700 leading-relaxed">
              The application utilizes a tiered ranking system (D through S-RANK) based on specific 
              inch-based thresholds. It calculates progress percentage within current tiers to 
              provide granular feedback on physical development.
            </p>
          </div>
        </section>

        {/* Technical Stack & Data */}
        <section className="space-y-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500">Data Management</h2>
          <div className="bg-black/40 border border-emerald-900/20 p-6">
            <ul className="space-y-3 text-xs text-emerald-700">
              <li>• <span className="text-emerald-300 font-bold uppercase">Snapshot Archival:</span> Persistent storage of historical metrics via local state management.</li>
              <li>• <span className="text-emerald-300 font-bold uppercase">Dynamic Calculation:</span> Real-time rank determination based on customizable bounds per attribute.</li>
              <li>• <span className="text-emerald-300 font-bold uppercase">Interface:</span> Responsive React-based UI with fluid typography for desktop and mobile accessibility.</li>
            </ul>
          </div>
        </section>

        <footer className="border-t border-emerald-900/20 pt-8 text-center">
          <p className="text-[10px] text-emerald-900 uppercase tracking-widest">TrigrLog AI © 2026. System Operational.</p>
        </footer>
      </div>
    </div>
  );
}