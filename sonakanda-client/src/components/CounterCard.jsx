import React from 'react';
import { useCounterStore } from '../store/useCounterStore.js';

const CounterCard = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-lg border border-slate-700/50 shadow-2xl p-8">
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-emerald-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-yellow-600/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Global Counter
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Zustand State Management Demo
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/30">
            Live Store
          </span>
        </div>

        {/* Big Counter Display */}
        <div className="text-center py-6">
          <p className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400 drop-shadow-2xl">
            {count}
          </p>
          <p className="text-sm text-slate-400 mt-2">Current Value</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={decrement}
            className="group relative px-6 py-4 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 hover:border-red-500/50 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-red-500/20 hover:-translate-y-1"
          >
            <span className="absolute inset-0 rounded-2xl bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10 text-lg">- Decrement</span>
          </button>

          <button
            type="button"
            onClick={reset}
            className="group relative px-6 py-4 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 hover:border-yellow-500/50 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-yellow-500/20 hover:-translate-y-1"
          >
            <span className="absolute inset-0 rounded-2xl bg-yellow-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10">Reset</span>
          </button>

          <button
            type="button"
            onClick={increment}
            className="group relative px-6 py-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white font-semibold shadow-lg border border-emerald-400/50 transition-all duration-300 hover:shadow-emerald-500/40 hover:-translate-y-1"
          >
            <span className="absolute inset-0 rounded-2xl bg-emerald-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10 text-lg">+ Increment</span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-500 mt-6">
          State persists across pages • Powered by Zustand
        </p>
      </div>
    </div>
  );
};

export default CounterCard;