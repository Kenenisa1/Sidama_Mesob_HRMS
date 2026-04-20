import React, { useState } from 'react';
import { User, MapPin, GraduationCap, CloudUpload, CheckCircle, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import StepOne from '../components/registration/StepOne';
import StepTwo from '../components/registration/StepTwo';
import StepThree from '../components/registration/StepThree';
import StepFour from '../components/registration/StepFour';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    faydaId: '',
    wereda: '',
    kebele: '',
    degreeFile: null,
  });

  const steps = [
    { id: 1, label: 'Identity', icon: <User size={20} /> },
    { id: 2, label: 'Residency', icon: <MapPin size={20} /> },
    { id: 3, label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 4, label: 'Documents', icon: <CloudUpload size={20} /> },
  ];

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const updateData = (newData) => setFormData((prev) => ({ ...prev, ...newData }));

  return (
    <div className="bg-[#020817] text-zinc-300 relative flex flex-col items-center py-16 px-4 md:px-8 overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* --- WIDER BACKGROUND GLOW --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-900/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[#020817]" />
      </div>

      {/* INCREASED MAX-WIDTH HERE (5xl) */}
      <main className="relative z-10 w-full max-w-5xl">
        
        <header className="text-center mb-16">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6 inline-block px-6 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            Official Recruitment Form
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Applicant <span className="text-emerald-500">Registration</span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg font-medium max-w-2xl mx-auto">
            Please fill out the form sections below. Ensure all legal documents are ready for upload in the final step.
          </p>
        </header>

        {/* --- STEPPER (Wider Layout) --- */}
        <nav className="flex items-center justify-between mb-20 relative max-w-3xl mx-auto px-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] flex items-center justify-center border-2 transition-all duration-700 
                  ${currentStep >= step.id 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                    : 'border-zinc-900 bg-[#050c1a] text-zinc-700'}`}>
                  {currentStep > step.id ? <CheckCircle size={28} className="text-emerald-500 shadow-emerald-500" /> : step.icon}
                </div>
                <span className={`hidden sm:block text-[10px] mt-4 font-black uppercase tracking-[0.25em] transition-colors duration-500 ${currentStep >= step.id ? 'text-emerald-500' : 'text-zinc-800'}`}>
                  {step.label}
                </span>
              </div>
              
              {index !== steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-zinc-900 mx-4 md:mx-8 -mt-6 sm:-mt-10 relative">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* --- FORM CONTAINER (Wide & Premium) --- */}
        <div className="w-full bg-[#050c1a]/30 border border-zinc-900/50 p-8 md:p-16 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 p-8">
             <ShieldCheck size={40} className="text-emerald-500/5" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <StepOne data={formData} update={updateData} onNext={next} />}
              {currentStep === 2 && <StepTwo data={formData} update={updateData} onNext={next} onPrev={prev} />}
              {currentStep === 3 && <StepThree data={formData} update={updateData} onNext={next} onPrev={prev} />}
              {currentStep === 4 && <StepFour data={formData} update={updateData} onPrev={prev} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Register;