import React from "react";
import { Filter } from "lucide-react";

const RegistryFilters = ({
  selectedWoreda,
  setSelectedWoreda,
  woredas,
  selectedFluency,
  setSelectedFluency,
  fluencyLevels,
  minCgpa,
  setMinCgpa,
  resetFilters,
}) => {
  return (
    <aside className="bg-cardBg p-6 rounded-2xl border border-white/5 self-start shadow-xl backdrop-blur-md">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className="p-1.5 bg-emerald-500/10 text-emeraldAccent border border-emerald-500/20 rounded-lg">
          <Filter size={16} />
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          Registry Filters
        </h3>
      </div>
      <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-6">
        Refine position index
      </p>

      <div className="space-y-5">
        {/* Woreda Selector Context */}
        <div>
          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            Filter by Woreda
          </label>
          <select
            value={selectedWoreda}
            onChange={(e) => setSelectedWoreda(e.target.value)}
            className="w-full bg-darkBg border border-white/5 rounded-xl p-3 text-zinc-300 text-xs font-bold focus:outline-none focus:border-emeraldAccent/30 cursor-pointer transition-colors"
          >
            <option value="" className="bg-[var(--color-surface)]">
              All Woredas
            </option>
            {woredas.map((woreda) => (
              <option
                key={woreda}
                value={woreda}
                className="bg-[var(--color-surface)]"
              >
                {woreda}
              </option>
            ))}
          </select>
        </div>

        {/* Language Fluency Selector Context */}
        <div>
          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            Sidaamu Afoo Fluency
          </label>
          <select
            value={selectedFluency}
            onChange={(e) => setSelectedFluency(e.target.value)}
            className="w-full bg-darkBg border border-white/5 rounded-xl p-3 text-zinc-300 text-xs font-bold focus:outline-none focus:border-emeraldAccent/30 cursor-pointer transition-colors"
          >
            <option value="" className="bg-[var(--color-surface)]">
              All Levels
            </option>
            {fluencyLevels.map((level) => (
              <option
                key={level}
                value={level}
                className="bg-[var(--color-surface)]"
              >
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* CGPA Slider Input System */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
              Minimum CGPA
            </label>
            <span className="font-mono font-black text-emeraldAccent bg-emerald-950/40 border border-emerald-500/20 rounded text-xs px-2 py-0.5 shadow-sm">
              {Number(minCgpa).toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            value={minCgpa}
            onChange={(e) => setMinCgpa(e.target.value)}
            className="w-full accent-emeraldAccent bg-darkBg h-1.5 rounded-lg appearance-none cursor-pointer border border-white/5"
            min="2.0"
            max="4.0"
            step="0.1"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-mono font-bold">
            <span>2.0</span>
            <span>4.0</span>
          </div>
        </div>

        {/* Reset Trigger Action */}
        <button
          onClick={resetFilters}
          className="w-full bg-zinc-900 border border-white/5 hover:border-emeraldAccent/30 text-zinc-300 hover:text-white font-extrabold uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
        >
          Reset Active Filters
        </button>
      </div>
    </aside>
  );
};

export default RegistryFilters;
