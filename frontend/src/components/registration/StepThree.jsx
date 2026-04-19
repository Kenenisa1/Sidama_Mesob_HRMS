import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function StepThree({ data, update, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const proficiencyLevels = ['Basic', 'Intermediate', 'Fluent', 'Native'];
  const eduLevels = ['Diploma', 'BSc/BA Degree', 'MSc/MA', 'PhD'];

  const validate = () => {
    let newErrors = {};
    if (!data.institution) newErrors.institution = "Required";
    if (!data.department) newErrors.department = "Required";
    if (!data.eduLevel) newErrors.eduLevel = "Required";
    if (!data.gradYear) newErrors.gradYear = "Required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-10"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Academic & Professional</h2>
        <p className="text-zinc-500 text-sm md:text-base mt-1 font-medium">Provide your educational background and work history.</p>
      </div>

      <div className="space-y-8">
        {/* Education Level Dropdown - Full Width */}
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">Highest Education Level</label>
          <div className="relative group">
            <select 
              className={`w-full bg-black/40 border appearance-none cursor-pointer rounded-2xl py-5 px-6 text-white focus:outline-none transition-all ${errors.eduLevel ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.eduLevel || ''}
              onChange={(e) => update({ eduLevel: e.target.value })}
            >
              <option value="" disabled className="bg-[#050c1a]">Select Level</option>
              {eduLevels.map(level => (
                <option key={level} value={level} className="bg-[#050c1a]">{level}</option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
              <span className="text-[10px]">▼</span>
            </div>
          </div>
          {errors.eduLevel && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.eduLevel}</p>}
        </div>

        {/* Institution & Department - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">University / College</label>
            <input 
              className={`w-full bg-black/40 border rounded-2xl py-5 px-6 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.institution ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.institution || ''}
              onChange={(e) => update({ institution: e.target.value })}
              placeholder="e.g. Arba Minch University"
            />
            {errors.institution && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.institution}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">Department</label>
            <input 
              className={`w-full bg-black/40 border rounded-2xl py-5 px-6 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.department ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.department || ''}
              onChange={(e) => update({ department: e.target.value })}
              placeholder="e.g. Computer Science"
            />
            {errors.department && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.department}</p>}
          </div>
        </div>

        {/* Graduation Year & Experience - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">Graduation Year (E.C/G.C)</label>
            <input 
              type="number"
              className={`w-full bg-black/40 border rounded-2xl py-5 px-6 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.gradYear ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.gradYear || ''}
              onChange={(e) => update({ gradYear: e.target.value })}
              placeholder="e.g. 2016"
            />
            {errors.gradYear && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.gradYear}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">Work Experience (Years)</label>
            <input 
              type="number"
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-5 px-6 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all"
              value={data.experience || ''}
              onChange={(e) => update({ experience: e.target.value })}
              placeholder="e.g. 2"
            />
          </div>
        </div>
      </div>

      {/* Sidaamu Afoo Proficiency Section */}
      <div className="pt-6 border-t border-zinc-900/50">
        <label className="block text-[10px] font-black text-zinc-500 mb-6 uppercase tracking-[0.3em] text-center">
          Sidaamu Afoo Proficiency
        </label>
        <div className="flex flex-wrap justify-center gap-3">
          {proficiencyLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => update({ sidaamuAfoo: level })}
              className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest border transition-all duration-300 active:scale-95 
                ${data.sidaamuAfoo === level 
                  ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-10">
        <button 
          onClick={onPrev}
          className="flex-1 px-10 py-5 rounded-2xl bg-zinc-900/50 text-zinc-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 hover:text-white transition-all active:scale-95 border border-zinc-800/50"
        >
          Back
        </button>
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => validate() && onNext()}
          className="flex-[2] py-5 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 shadow-xl shadow-emerald-950/20 transition-all"
        >
          Final Step: Uploads
        </motion.button>
      </div>
    </motion.div>
  );
}