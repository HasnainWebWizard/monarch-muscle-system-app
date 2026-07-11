'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMetrics } from '../context/MetricsContext';

export function OnboardingForm() {
  const { updateStats } = useMetrics();
  const router = useRouter();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('21');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();


    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age);

    if (!heightNum || heightNum <= 0 || !weightNum || weightNum <= 0 || !ageNum || ageNum <= 0) {
      setError('Please provide valid baseline specs to synchronize.');
      return;
    }

    setError('');

    // Explicitly update state
    updateStats({
      name,
      heightCm: heightNum,
      weightKg: weightNum,
      age: ageNum,
      gender,
      isConfigured: true
    });

    // Small delay to ensure state commit on mobile browsers before navigation
    setTimeout(() => {
      router.push('/awaken');
    }, 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#050505] font-sans">
      <div className="w-full max-w-md p-8 bg-[#0a0a0c] border border-emerald-900/40 relative">

        {/* Ancient Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-600/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-600/50" />

        <div className="mb-8">
          <h2 className="text-xl font-black uppercase tracking-[0.2em] text-emerald-100 font-serif">
            System Initialization
          </h2>
          <p className="text-[10px] text-emerald-800 mt-2 uppercase tracking-widest font-bold">
            Define your baseline physical vessel to begin the awakening.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700 mb-2">
              Designation (Name)
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-emerald-900/50 text-white placeholder-emerald-950 focus:border-emerald-600 transition-all text-sm font-mono outline-none"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700 mb-2">
              Frame Height (cm)
            </label>
            <input
              type="number"
              placeholder="173"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-emerald-900/50 text-white placeholder-emerald-950 focus:border-emerald-600 transition-all text-sm font-mono outline-none"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700 mb-2">
              Base Weight (kg)
            </label>
            <input
              type="number"
              placeholder="55"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-emerald-900/50 text-white placeholder-emerald-950 focus:border-emerald-600 transition-all text-sm font-mono outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700 mb-2">
                Age Vector
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-emerald-900/50 text-white focus:border-emerald-600 transition-all text-sm font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700 mb-2">
                Classification
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-emerald-900/50 text-white focus:border-emerald-600 transition-all text-sm font-mono outline-none appearance-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-500 font-bold tracking-widest uppercase py-2">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-emerald-950/30 border border-emerald-700 text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-600 hover:text-black transition-all active:scale-[0.99]"
          >
            Awaken Profile
          </button>
        </form>
      </div>
    </div>
  );
}