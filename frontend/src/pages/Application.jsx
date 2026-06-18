import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  ArrowLeft,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import StepOne from "../components/Application/StepOne";
import StepTwo from "../components/Application/StepTwo";
import StepThree from "../components/Application/StepThree";
import StepFour from "../components/Application/StepFour";

const Application = () => {
  const { id } = useParams(); // Safely parse the structural MongoDB identification token from URL
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback for job ID
  const targetIdPointer = id || location.state?.targetedJobId;
  const fallbackPositionTitle =
    location.state?.positionTitle || "Specified Position";

  // Lifecycles and state parameters
  const [job, setJob] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  // Application form data
  const [formData, setFormData] = useState({
    jobId: targetIdPointer || "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    faydaId: "",
    woreda: "",
    kebele: "",
    houseNumber: "",
    eduLevel: "Bachelor",
    institution: "",
    department: "",
    gradYear: "",
    cgpa: "",
    experience: "0",
    sidaamuAfoo: "BASIC",
    cvFile: null,
    degreeFile: null,
    idFile: null,
    certFiles: [],
  });

  // Keep state identifiers accurately aligned if router mounts parameters asynchronously
  useEffect(() => {
    if (targetIdPointer) {
      setFormData((prev) => ({ ...prev, jobId: targetIdPointer }));
    }
  }, [targetIdPointer]);

  // Fetch job details and check deadline
  useEffect(() => {
    if (!targetIdPointer) {
      setPageLoading(false);
      return;
    }

    const verifyPipelineHealth = async () => {
      try {
        setPageLoading(true);
        // Request structural lookup validation safely
        const res = await axios.get(
          `http://localhost:5000/api/jobs/${targetIdPointer}`,
        );
        setJob(res.data);

        // Check if the application deadline has passed
        if (res.data.deadline) {
          const expiredCheck = new Date() > new Date(res.data.deadline);
          setIsExpired(expiredCheck);
        }
      } catch (err) {
        console.error(
          "Critical error verification sequence aborted in Application Core Layer:",
          err,
        );
      } finally {
        setPageLoading(false);
      }
    };

    verifyPipelineHealth();
  }, [targetIdPointer]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 28 },
    },
  };

  const stepVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (dir) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
    }),
  };

  const steps = [
    { id: 1, label: "Identity", icon: <User size={18} /> },
    { id: 2, label: "Residency", icon: <MapPin size={18} /> },
    { id: 3, label: "Education", icon: <GraduationCap size={18} /> },
    { id: 4, label: "Documents", icon: <CloudUpload size={18} /> },
  ];

  const next = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateData = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  // Missing Job ID view
  if (!targetIdPointer) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 text-[var(--color-text-secondary)] animate-in fade-in duration-200 bg-[var(--bg)]">
        <div className="max-w-md w-full bg-[var(--color-surface)] border border-[var(--nav-border)] rounded-[2rem] p-8 text-center shadow-2xl">
          <h3 className="text-sm font-black uppercase tracking-wider text-[var(--color-text-secondary)]">
            Job Not Found
          </h3>
          <p className="text-[var(--color-text-secondary)] text-xs mt-2 mb-6 leading-relaxed">
            The link you followed is missing the required job information.
          </p>
          <button
            onClick={() => navigate("/joblist")}
            className="w-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-black text-xs uppercase py-4 rounded-xl border border-[var(--nav-border)] transition-colors"
          >
            Return to Job Listings
          </button>
        </div>
      </div>
    );
  }

  // Loading view
  if (pageLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-[var(--color-text-primary)]">
        <Loader2 size={28} className="text-emerald-500 animate-spin" />
        <p className="text-[10px] font-black tracking-[0.2em] text-[var(--color-text-secondary)] uppercase">
          Loading Job Details...
        </p>
      </div>
    );
  }

  // Expired deadline view
  if (isExpired || !job) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 text-[var(--color-text-secondary)] animate-in fade-in duration-300 bg-[var(--bg)]">
        <div className="max-w-md w-full bg-[var(--color-surface)] border border-[var(--nav-border)] rounded-[2.5rem] p-8 text-center shadow-2xl">
          <div className="mx-auto w-12 h-12 bg-red-500/5 border border-red-500/10 rounded-xl flex items-center justify-center text-red-500/80 mb-5">
            <ShieldAlert size={22} />
          </div>
          <h2 className="text-base font-black uppercase tracking-tight text-[var(--color-text-primary)]">
            Application Closed
          </h2>
          <p className="text-[var(--color-text-secondary)] text-xs mt-2 leading-relaxed">
            The application deadline for{" "}
            <span className="text-red-400 font-semibold">
              "{job?.title || fallbackPositionTitle}"
            </span>{" "}
            has passed.
          </p>
          <div className="my-5 py-2.5 px-4 bg-[var(--color-surface)] rounded-xl inline-flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)] border border-[var(--nav-border)]">
            <Calendar size={13} className="text-red-400/80" />
            Deadline:{" "}
            {job
              ? new Date(job.deadline).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Archived"}
          </div>
          <button
            onClick={() => navigate("/joblist")}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-surface)] hover:bg-[var(--bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-black text-xs uppercase py-4 rounded-xl border border-[var(--nav-border)] transition-all"
          >
            <ArrowLeft size={14} className="text-emerald-500" /> Return to Job
            Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center py-12 px-4 md:px-8 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-400 bg-[var(--bg)] text-[var(--color-text-secondary)]">
      {/* Ambient Background */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 dark:bg-emerald-950/10 blur-[130px] z-0 pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.header
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12 space-y-3"
        >
          <motion.span
            variants={itemVariants}
            className="text-[9px] font-mono font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] inline-block px-4 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-900/40"
          >
            Secure Application Portal
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-2xl md:text-4xl font-black text-[var(--color-text-primary)] tracking-tight leading-none uppercase"
          >
            Applying for:{" "}
            <span className="text-emerald-500 lowercase first-letter:uppercase">
              {job.title}
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-text-secondary)] text-xs font-mono tracking-wider uppercase"
          >
            {job.department} &bull; Cleared Minimum CGPA Target:{" "}
            {job.cgpa || "2.0"}+
          </motion.p>
        </motion.header>

        {/* Step Progress Bar */}
        <nav className="flex items-center justify-between mb-16 relative max-w-2xl mx-auto px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center z-10">
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep === step.id ? 1.05 : 1,
                    borderColor:
                      currentStep === step.id
                        ? "#10b981"
                        : currentStep > step.id
                          ? "#047857"
                          : "#1f1f23",
                  }}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 
                    ${
                      currentStep >= step.id
                        ? "bg-[var(--surface-soft)] text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                        : "bg-[var(--bg)] text-[var(--color-text-secondary)]"
                    }`}
                >
                  {currentStep > step.id ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle size={20} className="text-emerald-500" />
                    </motion.div>
                  ) : (
                    step.icon
                  )}
                </motion.div>
                <motion.span
                  animate={{
                    color:
                      currentStep === step.id
                        ? "#10b981"
                        : currentStep > step.id
                          ? "#a1a1aa"
                          : "#3f3f46",
                  }}
                  className="hidden sm:block text-[9px] mt-2.5 font-black uppercase tracking-wider font-sans"
                >
                  {step.label}
                </motion.span>
              </div>

              {index !== steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-[var(--color-surface)] mx-2 md:mx-4 -mt-4 sm:-mt-6 relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Main Content Area */}
        <div className="w-full bg-[var(--color-surface)] border border-[var(--nav-border)] p-6 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* Decorative Watermark */}
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
              {currentStep === 1 && (
                <StepOne data={formData} update={updateData} onNext={next} />
              )}
              {currentStep === 2 && (
                <StepTwo
                  data={formData}
                  update={updateData}
                  onNext={next}
                  onPrev={prev}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  data={formData}
                  update={updateData}
                  onNext={next}
                  onPrev={prev}
                />
              )}
              {currentStep === 4 && (
                <StepFour data={formData} update={updateData} onPrev={prev} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Application;
