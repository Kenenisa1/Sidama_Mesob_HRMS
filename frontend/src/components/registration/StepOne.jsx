import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Fingerprint } from 'lucide-react';

export default function StepOne({ data, update, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!data.firstName) newErrors.firstName = "Required";
    if (!data.middleName) newErrors.middleName = "Required";
    if (!data.lastName) newErrors.lastName = "Required";
    if (!data.email?.includes('@')) newErrors.email = "Invalid email";
    if (!data.phone || data.phone.length < 10) newErrors.phone = "Invalid phone";
    if (!data.faydaId || data.faydaId.length < 10) newErrors.faydaId = "Invalid Fayda ID";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header inside Form */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Identity & Contact</h2>
        <p className="text-zinc-500 text-xs md:text-sm mt-1 font-medium">Provide your legal information as it appears on your ID.</p>
      </div>

      {/* Name Grid: 1 col on mobile, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <InputWrapper label="First Name" error={errors.firstName}>
          <input 
            className={`w-full bg-black/40 border ${errors.firstName ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 px-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.firstName || ''}
            onChange={(e) => update({ firstName: e.target.value })}
            placeholder="First"
          />
        </InputWrapper>

        <InputWrapper label="Middle Name" error={errors.middleName}>
          <input 
            className={`w-full bg-black/40 border ${errors.middleName ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 px-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.middleName || ''}
            onChange={(e) => update({ middleName: e.target.value })}
            placeholder="Middle"
          />
        </InputWrapper>

        <InputWrapper label="Last Name" error={errors.lastName}>
          <input 
            className={`w-full bg-black/40 border ${errors.lastName ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 px-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.lastName || ''}
            onChange={(e) => update({ lastName: e.target.value })}
            placeholder="Last"
          />
        </InputWrapper>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputWrapper label="Email Address" error={errors.email} icon={<Mail size={16}/>}>
          <input 
            type="email"
            className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.email || ''}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="example@mail.com"
          />
        </InputWrapper>

        <InputWrapper label="Phone Number" error={errors.phone} icon={<Phone size={16}/>}>
          <input 
            type="tel"
            className={`w-full bg-black/40 border ${errors.phone ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.phone || ''}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="09..."
          />
        </InputWrapper>
      </div>

      {/* Fayda ID */}
      <InputWrapper label="National ID (Fayda)" error={errors.faydaId} icon={<Fingerprint size={16}/>}>
        <input 
          className={`w-full bg-black/40 border font-mono ${errors.faydaId ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
          value={data.faydaId || ''}
          onChange={(e) => update({ faydaId: e.target.value.replace(/\D/g, '') })}
          placeholder="16-digit ID number"
          maxLength={16}
        />
      </InputWrapper>

      {/* Submit Button */}
      <button 
        onClick={() => validate() && onNext()}
        className="group relative w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-emerald-950/20 transition-all active:scale-[0.98] overflow-hidden"
      >
        <span className="relative z-10">Continue to Residency</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </motion.div>
  );
}

// Helper component for uniform labels and icons
function InputWrapper({ label, error, icon, children }) {
  return (
    <div className="space-y-2 relative">
      <div className="flex justify-between items-center px-1">
        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
        {error && <span className="text-[10px] font-bold text-red-500 uppercase">{error}</span>}
      </div>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-zinc-600">{icon}</div>}
        {children}
      </div>
    </div>
  );
}