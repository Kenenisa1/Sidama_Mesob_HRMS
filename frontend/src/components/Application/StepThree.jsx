import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, Briefcase, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function StepThree({ data, update, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  // Security Check: Redirect or alert if token is missing
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Session expired. Please login to continue.", {
        style: { background: '#000', color: '#fff', border: '1px solid #27272a' }
      });
    }
  }, []);

  const proficiencyLevels = ['Basic', 'Intermediate', 'Fluent', 'Native'];
  const eduLevels = ['TVET/Diploma', 'Bachelor', 'Master', 'PhD'];

  const validate = () => {
    let newErrors = {};
    if (!data.institution) newErrors.institution = "Required";
    if (!data.department) newErrors.department = "Required";
    if (!data.eduLevel) newErrors.eduLevel = "Required";
    if (!data.gradYear) newErrors.gradYear = "Required";
    
    // CGPA Validation: Ensure it's a valid number between 0 and 4.0
    if (!data.cgpa) {
      newErrors.cgpa = "Required";
    } else if (parseFloat(data.cgpa) < 0 || parseFloat(data.cgpa) > 4) {
      newErrors.cgpa = "0.0 - 4.0";
    }
    
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
      <div>
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Academic Portfolio</h2>
        <p className="text-zinc-500 text-xs md:text-sm mt-1 font-medium">Provide your educational background and professional experience.</p>
      </div>

      <div className="space-y-6">
        {/* Education Level */}
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Highest Education Level</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
              <GraduationCap size={18} />
            </div>
            <select 
              className={`w-full bg-black/40 border appearance-none cursor-pointer rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none transition-all ${errors.eduLevel ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.eduLevel || ''}
              onChange={(e) => update({ eduLevel: e.target.value })}
            >
              <option value="" disabled className="bg-zinc-950">Select Level</option>
              {eduLevels.map(level => (
                <option key={level} value={level} className="bg-zinc-950">{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Institution & Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputWrapper label="University / College" error={errors.institution} icon={<BookOpen size={18}/>}>
            <input 
              className={`w-full bg-black/40 border rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.institution ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.institution || ''}
              onChange={(e) => update({ institution: e.target.value })}
              placeholder="e.g. Arba Minch University"
            />
          </InputWrapper>

          <InputWrapper label="Field of Study" error={errors.department} icon={<BookOpen size={18}/>}>
            <input 
              className={`w-full bg-black/40 border rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.department ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.department || ''}
              onChange={(e) => update({ department: e.target.value })}
              placeholder="e.g. Software Engineering"
            />
          </InputWrapper>
        </div>

        {/* CGPA & Year */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputWrapper label="CGPA" error={errors.cgpa} icon={<Award size={18}/>}>
            <input 
              type="number"
              step="0.01"
              className={`w-full bg-black/40 border rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.cgpa ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.cgpa || ''}
              onChange={(e) => update({ cgpa: e.target.value })}
              placeholder="e.g. 3.85"
            />
          </InputWrapper>

          <InputWrapper label="Graduation Year" error={errors.gradYear} icon={<Calendar size={18}/>}>
            <input 
              type="number"
              className={`w-full bg-black/40 border rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.gradYear ? 'border-red-500/50' : 'border-zinc-800'}`}
              value={data.gradYear || ''}
              onChange={(e) => update({ gradYear: parseInt(e.target.value) || '' })}
              placeholder="2024"
            />
          </InputWrapper>

          <InputWrapper label="Experience" icon={<Briefcase size={18}/>}>
            <input 
              type="number"
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all"
              value={data.experience || ''}
              onChange={(e) => update({ experience: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
          </InputWrapper>
        </div>
      </div>

      {/* Sidaamu Afoo Proficiency */}
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
              className={`px-5 py-3 rounded-xl text-[10px] font-black tracking-widest border transition-all duration-300 active:scale-95 
                ${data.sidaamuAfoo === level 
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/20' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button 
          onClick={onPrev}
          className="flex-1 px-8 py-4 rounded-2xl bg-zinc-900/50 text-zinc-500 font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-all border border-zinc-800/50"
        >
          Back
        </button>
        <button 
          onClick={() => validate() && onNext()}
          className="flex-[2] py-4 rounded-2xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 shadow-xl transition-all"
        >
          Final Step: Uploads
        </button>
      </div>
    </motion.div>
  );
}

function InputWrapper({ label, error, icon, children }) {
  return (
    <div className="space-y-2 relative">
      <div className="flex justify-between items-center px-1">
        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
        {error && <span className="text-[10px] font-bold text-red-500 uppercase">{error}</span>}
      </div>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-zinc-600 z-10">{icon}</div>}
        {children}
      </div>
    </div>
  );
}