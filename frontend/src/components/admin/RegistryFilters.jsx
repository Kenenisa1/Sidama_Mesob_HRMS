import React from "react";
import { Filter } from "lucide-react";

const RegistryFilters = ({
  minExperience,
  setMinExperience,
  minCgpa,
  setMinCgpa,
  resetFilters,
}) => {
  return (
    <aside className="bg-white p-6 rounded-2xl border border-gray-200 self-start shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-oled-green/10 text-oled-green border border-oled-green/20 rounded-xl shadow-sm">
          <Filter size={18} />
        </div>
        <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-tight">
          Registry Filters
        </h3>
      </div>
      <p className="text-gray-500 text-xs font-bold font-mono uppercase tracking-widest mb-6">
        Refine position index
      </p>

      <div className="space-y-6">
        {/* Experience Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-gray-600 text-xs font-extrabold uppercase tracking-widest">
              Years of Experience
            </label>
            <span className="font-mono font-black text-oled-dark bg-oled-green/10 border border-oled-green/20 rounded-md text-xs px-2.5 py-1 shadow-sm">
              {Number(minExperience)}+ YRS
            </span>
          </div>
          <input
            type="range"
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
            className="w-full accent-oled-green bg-gray-200 h-2 rounded-lg appearance-none cursor-pointer border border-gray-300"
            min="0"
            max="15"
            step="1"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono font-bold">
            <span>0</span>
            <span>15+</span>
          </div>
        </div>

        {/* CGPA Slider Input System */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-gray-600 text-xs font-extrabold uppercase tracking-widest">
              Minimum CGPA
            </label>
            <span className="font-mono font-black text-oled-dark bg-oled-green/10 border border-oled-green/20 rounded-md text-xs px-2.5 py-1 shadow-sm">
              {Number(minCgpa).toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            value={minCgpa}
            onChange={(e) => setMinCgpa(e.target.value)}
            className="w-full accent-oled-green bg-gray-200 h-2 rounded-lg appearance-none cursor-pointer border border-gray-300"
            min="2.0"
            max="4.0"
            step="0.1"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono font-bold">
            <span>2.0</span>
            <span>4.0</span>
          </div>
        </div>

        {/* Reset Trigger Action */}
        <button
          onClick={resetFilters}
          className="w-full bg-gray-100 border border-gray-200 hover:border-oled-green/40 hover:bg-white text-gray-700 hover:text-oled-dark font-extrabold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98] mt-4"
        >
          Reset Active Filters
        </button>
      </div>
    </aside>
  );
};

export default RegistryFilters;
