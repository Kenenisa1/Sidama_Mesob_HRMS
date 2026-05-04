import React, { useState } from 'react';
import { User, MapPin, GraduationCap, CloudUpload, CheckCircle, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import StepOne from '../components/registration/StepOne';
import StepTwo from '../components/registration/StepTwo';
import StepThree from '../components/registration/StepThree';
import StepFour from '../components/registration/StepFour';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0); // Tracking direction for slide effect
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(10px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    })
  };

  const steps = [
    { id: 1, label: 'Identity', icon: <User size={20} /> },
    { id: 2, label: 'Residency', icon: <MapPin size={20} /> },
    { id: 3, label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 4, label: 'Documents', icon: <CloudUpload size={20} /> },
  ];

  const next = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };
  
  const prev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateData = (newData) => setFormData((prev) => ({ ...prev, ...newData }));

  return (
    <div className="bg-[#020817] text-zinc-300 relative min-h-screen flex flex-col items-center py-16 px-4 md:px-8 overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* --- DYNAMIC PULSING OLED GLOW --- */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-emerald-900/10 blur-[150px] z-0 pointer-events-none" 
      />

      <main className="relative z-10 w-full max-w-5xl">
        
        {/* --- STAGGERED ENTRANCE HEADER --- */}
        <motion.header 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6 inline-block px-6 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            Official Recruitment Portal
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
            Applicant <span className="text-emerald-500">Registration</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-zinc-500 text-base md:text-lg font-medium max-w-2xl mx-auto">
            Join the SMUC team. Please complete each section carefully to ensure your digital profile is verified.
          </motion.p>
        </motion.header>

        {/* --- PREMIUM STEPPER --- */}
        <nav className="flex items-center justify-between mb-24 relative max-w-3xl mx-auto px-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center z-10">
                <motion.div 
                  initial={false}
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                    borderColor: currentStep >= step.id ? "#10b981" : "#18181b"
                  }}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] flex items-center justify-center border-2 transition-colors duration-500 
                    ${currentStep >= step.id 
                      ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.1)]' 
                      : 'bg-[#050c1a] text-zinc-700'}`}
                >
                  {currentStep > step.id ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle size={28} className="text-emerald-500" />
                    </motion.div>
                  ) : step.icon}
                </motion.div>
                <motion.span 
                  animate={{ color: currentStep >= step.id ? "#10b981" : "#27272a" }}
                  className="hidden sm:block text-[9px] mt-4 font-black uppercase tracking-[0.3em] transition-colors"
                >
                  {step.label}
                </motion.span>
              </div>
              
              {index !== steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-zinc-900 mx-4 md:mx-8 -mt-6 sm:-mt-10 relative">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    transition={{ duration: 0.8, ease: "circInOut" }}
                    className="absolute h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* --- MAIN FORM (Layout-Animated Container) --- */}
        <motion.div 
          layout
          transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          className="w-full bg-[#050c1a]/40 border border-zinc-900/50 p-8 md:p-16 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden"
        >
          {/* Subtle Background Mark */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <ShieldCheck size={120} className="text-emerald-500" />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {currentStep === 1 && <StepOne data={formData} update={updateData} onNext={next} />}
              {currentStep === 2 && <StepTwo data={formData} update={updateData} onNext={next} onPrev={prev} />}
              {currentStep === 3 && <StepThree data={formData} update={updateData} onNext={next} onPrev={prev} />}
              {currentStep === 4 && <StepFour data={formData} update={updateData} onPrev={prev} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Register;