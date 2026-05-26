import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  CloudUpload, 
  CheckCircle, 
  ShieldCheck, 
  Loader2, 
  ShieldAlert, 
  Calendar, 
  ArrowLeft 
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import StepOne from '../components/Application/StepOne';
import StepTwo from '../components/Application/StepTwo';
import StepThree from '../components/Application/StepThree';
import StepFour from '../components/Application/StepFour';

const Application = () => {
  const { id } = useParams(); // Safely parse the structural MongoDB identification token from URL
  const location = useLocation();
  const navigate = useNavigate();

  // SECURITY ARCHITECTURE: Core structural mapping verification fallback tree
  const targetIdPointer = id || location.state?.targetedJobId;
  const fallbackPositionTitle = location.state?.positionTitle || "Specified Position";

  // Lifecycles and state parameters
  const [job, setJob] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0); 
  
  // REAL-WORLD PRODUCTION STATE OBJECT: Holds all values expected by our backend Mongoose model
  const [formData, setFormData] = useState({
    jobId: targetIdPointer || "", 
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    faydaId: '',
    woreda: '',
    kebele: '',
    houseNumber: '',
    eduLevel: 'Bachelor',
    institution: '',
    department: '',
    gradYear: '',
    cgpa: '',
    experience: '0',
    sidaamuAfoo: 'BASIC',
    cvFile: null,
    degreeFile: null,
    idFile: null,
    certFile: null
  });

  // Keep state identifiers accurately aligned if router mounts parameters asynchronously
  useEffect(() => {
    if (targetIdPointer) {
      setFormData(prev => ({ ...prev, jobId: targetIdPointer }));
    }
  }, [targetIdPointer]);

  // Dynamic Pipeline Health and Integrity Verification Checklist
  useEffect(() => {
    if (!targetIdPointer) {
      setPageLoading(false);
      return;
    }

    const verifyPipelineHealth = async () => {
      try {
        setPageLoading(true);
        // Request structural lookup validation safely
        const res = await axios.get(`http://localhost:5000/api/jobs/${targetIdPointer}`);
        setJob(res.data);

        // Security Timestamp Validation: Block expired intakes immediately on the client side
        if (res.data.deadline) {
          const expiredCheck = new Date() > new Date(res.data.deadline);
          setIsExpired(expiredCheck);
        }
      } catch (err) {
        console.error("Critical error verification sequence aborted in Application Core Layer:", err);
      } finally {
        setPageLoading(false);
      }
    };

    verifyPipelineHealth();
  }, [targetIdPointer]);

  // Track scroll position across structural step transitions for improved desktop accessibility
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Pure Minimalist High-Performance Animation Matrix Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 28 } 
    }
  };

  const stepVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (dir) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
    })
  };

  const steps = [
    { id: 1, label: 'Identity', icon: <User size={18} /> },
    { id: 2, label: 'Residency', icon: <MapPin size={18} /> },
    { id: 3, label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 4, label: 'Documents', icon: <CloudUpload size={18} /> },
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

  // SCREEN CHECKPOINT 1: Broken Link Interceptor Guard Block
  if (!targetIdPointer) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 text-white animate-in fade-in duration-200">
        <div className="max-w-md w-full bg-black border border-zinc-900 rounded-[2rem] p-8 text-center shadow-2xl">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400">No Target Token Identified</h3>
          <p className="text-zinc-600 text-xs mt-2 mb-6 leading-relaxed">The application route context parameters are missing required database indexing metrics.</p>
          <button onClick={() => navigate("/joblist")} className="w-full bg-zinc-900 text-zinc-300 hover:text-white font-black text-xs uppercase py-4 rounded-xl border border-zinc-800 transition-colors">
            Return to Vacancies Directory
          </button>
        </div>
      </div>
    );
  }

  // SCREEN CHECKPOINT 2: Skeletal Authentication Core Loading Gate
  if (pageLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 size={28} className="text-emerald-500 animate-spin" />
        <p className="text-[10px] font-black tracking-[0.2em] text-zinc-600 uppercase">Verifying Pipeline Parameters...</p>
      </div>
    );
  }

  // SCREEN CHECKPOINT 3: Time Compliance Enforcement Rejection Box
  if (isExpired || !job) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 text-white animate-in fade-in duration-300">
        <div className="max-w-md w-full bg-black border border-zinc-900/80 rounded-[2.5rem] p-8 text-center shadow-2xl">
          <div className="mx-auto w-12 h-12 bg-red-500/5 border border-red-500/10 rounded-xl flex items-center justify-center text-red-500/80 mb-5">
            <ShieldAlert size={22} />
          </div>
          <h2 className="text-base font-black uppercase tracking-tight text-zinc-200">Intake Window Concluded</h2>
          <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
            The standard registration timeframe entry queue allocation limit for <span className="text-red-400 font-semibold">"{job?.title || fallbackPositionTitle}"</span> has closed.
          </p>
          <div className="my-5 py-2.5 px-4 bg-zinc-950/80 rounded-xl inline-flex items-center gap-2 text-xs font-mono text-zinc-400 border border-zinc-900">
            <Calendar size={13} className="text-red-400/80" />
            Deadline: {job ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Archived"}
          </div>
          <button onClick={() => navigate("/joblist")} className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-black text-xs uppercase py-4 rounded-xl border border-zinc-800 transition-all">
            <ArrowLeft size={14} className="text-emerald-500" /> Return to Active Slots
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-zinc-300 relative min-h-screen flex flex-col items-center py-12 px-4 md:px-8 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* Dynamic Subdued OLED Ambient Background Flare */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-950/10 blur-[130px] z-0 pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl">
        
        {/* Entrance Identity Header Zone */}
        <motion.header 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12 space-y-3"
        >
          <motion.span variants={itemVariants} className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-[0.3em] inline-block px-4 py-1.5 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
            Secure Enrollment Portal
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none uppercase">
            Applying for: <span className="text-emerald-500 lowercase first-letter:uppercase">{job.title}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-zinc-500 text-xs font-mono tracking-wider uppercase">
            {job.department} &bull; Cleared Minimum CGPA Target: {job.cgpa || "2.0"}+
          </motion.p>
        </motion.header>

        {/* Modular Progress Track Stepper Matrix */}
        <nav className="flex items-center justify-between mb-16 relative max-w-2xl mx-auto px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center z-10">
                <motion.div 
                  initial={false}
                  animate={{
                    scale: currentStep === step.id ? 1.05 : 1,
                    borderColor: currentStep === step.id ? "#10b981" : currentStep > step.id ? "#047857" : "#1f1f23"
                  }}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 
                    ${currentStep >= step.id 
                      ? 'bg-zinc-950 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.05)]' 
                      : 'bg-black text-zinc-700'}`}
                >
                  {currentStep > step.id ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle size={20} className="text-emerald-500" />
                    </motion.div>
                  ) : step.icon}
                </motion.div>
                <motion.span 
                  animate={{ color: currentStep === step.id ? "#10b981" : currentStep > step.id ? "#a1a1aa" : "#3f3f46" }}
                  className="hidden sm:block text-[9px] mt-2.5 font-black uppercase tracking-wider font-sans"
                >
                  {step.label}
                </motion.span>
              </div>
              
              {index !== steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-zinc-900 mx-2 md:mx-4 -mt-4 sm:-mt-6 relative">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* High-Contrast Pure Black Core Workspace Box */}
        <div className="w-full bg-black border border-zinc-800 p-6 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Security Layer Decorative Watermark */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.015] pointer-events-none text-emerald-500">
             <ShieldCheck size={110} />
          </div>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full will-change-transform"
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

export default Application;