import React, { useState } from 'react';
import { motion } from 'framer-motion';

const sidamaWoredas = [
  "Aleta Chuko", "Aleta Wondo", "Arbegona", "Aroresa", "Belsa", "Bensa", 
  "Bona Zuria", "Bursa", "Chere", "Dale", "Dara", "Dara Otilcho", 
  "Gorche", "Hawassa City", "Hawassa Zuria", "Hula", "Loko Abaya", 
  "Malga", "Shebedino", "Wonsho", "Wensho"
].sort();

export default function StepTwo({ data, update, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!data.woreda) newErrors.woreda = "Required";
    if (!data.kebele?.trim()) newErrors.kebele = "Required";
    
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
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Residency Context</h2>
        <p className="text-zinc-500 text-xs md:text-sm mt-1 font-medium">Select your current residential location within the Sidama region.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">
            Woreda / City Administration
          </label>
          <div className="relative group">
            <select 
              className={`w-full bg-black/40 border appearance-none cursor-pointer rounded-2xl py-5 px-6 text-white focus:outline-none transition-all ${errors.woreda ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.woreda || ''}
              onChange={(e) => update({ woreda: e.target.value })}
            >
              <option value="" disabled className="bg-zinc-950">Select your Woreda</option>
              {sidamaWoredas.map((w) => (
                <option key={w} value={w} className="bg-zinc-950 text-white">
                  {w}
                </option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
              <span className="text-[10px]">▼</span>
            </div>
          </div>
          {errors.woreda && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.woreda}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">
              Kebele
            </label>
            <input 
              className={`w-full bg-black/40 border rounded-2xl py-5 px-6 text-white placeholder:text-zinc-700 focus:outline-none transition-all ${errors.kebele ? 'border-red-500/50' : 'border-zinc-800 focus:border-emerald-500/50'}`}
              value={data.kebele || ''}
              onChange={(e) => update({ kebele: e.target.value })}
              placeholder="e.g. 01 or Menhariya"
            />
            {errors.kebele && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.kebele}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-[0.2em] ml-1">
              House Number (Optional)
            </label>
            <input 
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-5 px-6 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all"
              value={data.houseNumber || ''}
              onChange={(e) => update({ houseNumber: e.target.value })}
              placeholder="e.g. 402 or New"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-10">
        <button 
          onClick={onPrev}
          type="button"
          className="flex-1 px-10 py-5 rounded-2xl bg-zinc-900/50 text-zinc-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 hover:text-white transition-all active:scale-95 border border-zinc-800/50"
        >
          Back
        </button>
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => validate() && onNext()}
          className="flex-[2] py-5 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 shadow-xl shadow-emerald-950/20 transition-all"
        >
          Continue to Education
        </motion.button>
      </div>
    </motion.div>
  );
}