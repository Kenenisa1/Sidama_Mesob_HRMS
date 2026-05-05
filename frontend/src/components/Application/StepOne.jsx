import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Fingerprint, User, UserCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function StepOne({ data, update, onNext }) {
  const [errors, setErrors] = useState({});

  // Effect to sync fullName whenever first/middle/last changes
  useEffect(() => {
    const full = `${data.firstName || ''} ${data.middleName || ''} ${data.lastName || ''}`.replace(/\s+/g, ' ').trim();
    update({ fullName: full });
  }, [data.firstName, data.middleName, data.lastName, update]);

  // Security: Prevent numbers in string-only fields
  const handleNameChange = (field, value) => {
    const stringOnly = value.replace(/[0-9]/g, '');
    if (value !== stringOnly) {
      toast.error("Names cannot contain numbers", { id: 'name-error', duration: 1000 });
    }
    update({ [field]: stringOnly });
  };

  // Security: Prevent strings in number-only fields
  const handleNumberChange = (field, value, maxLength) => {
    const numbersOnly = value.replace(/\D/g, '');
    if (value !== numbersOnly) {
      toast.error("This field only accepts numbers", { id: 'num-error', duration: 1000 });
    }
    update({ [field]: numbersOnly.slice(0, maxLength) });
  };

  const validate = () => {
    let newErrors = {};
    
    if (!data.firstName?.trim()) newErrors.firstName = "Required";
    if (!data.lastName?.trim()) newErrors.lastName = "Required";
    if (!data.middleName?.trim()) newErrors.middleName = "Required";
    if (!data.gender) newErrors.gender = "Required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      newErrors.email = "Invalid email";
    }
    
    const phoneRegex = /^(09|07|\+2519|\+2517)\d{8}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Enter valid Ethio phone";
    }
    
    if (!data.faydaId || data.faydaId.length !== 16) {
      newErrors.faydaId = "16 digits required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const genderOptions = ['Male', 'Female'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Identity Credentials</h2>
        <p className="text-zinc-500 text-xs md:text-sm mt-1 font-medium">Register your legal identity for the Sidama Mesob HRMS portal.</p>
      </div>

      {/* Name Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputWrapper label="First Name" error={errors.firstName} icon={<User size={16}/>}>
          <input 
            className={`w-full bg-black/40 border ${errors.firstName ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.firstName || ''}
            onChange={(e) => handleNameChange('firstName', e.target.value)}
            placeholder="First"
          />
        </InputWrapper>

        <InputWrapper label="Middle Name" error={errors.middleName} icon={<User size={16}/>}>
          <input 
            className={`w-full bg-black/40 border ${errors.middleName ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.middleName || ''}
            onChange={(e) => handleNameChange('middleName', e.target.value)}
            placeholder="Father's"
            required={true}
          />
        </InputWrapper>

        <InputWrapper label="Last Name" error={errors.lastName} icon={<UserCheck size={16}/>}>
          <input 
            className={`w-full bg-black/40 border ${errors.lastName ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.lastName || ''}
            onChange={(e) => handleNameChange('lastName', e.target.value)}
            placeholder="Grandfather's"
          />
        </InputWrapper>
      </div>

      {/* Gender & National ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Legal Gender</label>
          <div className="flex gap-2 p-1 bg-black/20 border border-zinc-800 rounded-2xl h-[58px]">
            {genderOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => update({ gender: option })}
                className={`flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  data.gender === option 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-zinc-600 hover:bg-white/5'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <InputWrapper label="Fayda Number (16-Digit)" error={errors.faydaId} icon={<Fingerprint size={16}/>}>
          <input 
            className={`w-full bg-black/40 border font-mono ${errors.faydaId ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.faydaId || ''}
            onChange={(e) => handleNumberChange('faydaId', e.target.value, 16)}
            placeholder="0000 0000 0000 0000"
          />
        </InputWrapper>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputWrapper label="Work Email" error={errors.email} icon={<Mail size={16}/>}>
          <input 
            type="email"
            className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.email || ''}
            onChange={(e) => update({ email: e.target.value.toLowerCase() })}
            placeholder="example@domain.com"
          />
        </InputWrapper>

        <InputWrapper label="Phone Number" error={errors.phone} icon={<Phone size={16}/>}>
          <input 
            type="tel"
            className={`w-full bg-black/40 border ${errors.phone ? 'border-red-500/50' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all`}
            value={data.phone || ''}
            onChange={(e) => handleNumberChange('phone', e.target.value, 13)}
            placeholder="0911..."
          />
        </InputWrapper>
      </div>

      <button 
        onClick={() => validate() ? onNext() : toast.error("Please correct errors")}
        className="group relative w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all active:scale-[0.98]"
      >
        Continue to Residency
      </button>
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