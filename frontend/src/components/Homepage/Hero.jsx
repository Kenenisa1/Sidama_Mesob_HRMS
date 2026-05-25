import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  // 🎬 Animation Stagger Configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Cascades elements step by step
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, // Premium ease-out curve
    },
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] bg-[#000000] border-b border-zinc-900 overflow-hidden flex items-center justify-center px-4 sm:px-6">
      
      {/* 🌌 AMBIENT HIGH-END GLOW FIELDS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-emerald-500/5 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-red-500/5 blur-[130px] rounded-full" />
      </div>

      {/* 🎛️ MICRO-GRID TECHNICAL BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* CORE FRAME CONTAINER (With Motion Initializer) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center"
      >
        
        {/* LIVE TRACKING BADGE */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-6 sm:mb-8 shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          SMUC Digitization Initiative 2026
        </motion.div>

        {/* CATCHING TITLE STRUCTURE */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-black text-white mb-6 tracking-tighter leading-[1.05] uppercase"
        >
          Sidama MESOB <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-red-500">
            HUMAN RESOURCE MS
          </span>
        </motion.h1>

        {/* PROJECT DESCRIPTIVE PASSAGE */}
        <motion.p 
          variants={itemVariants}
          className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 px-2 sm:px-6 leading-relaxed font-medium"
        >
          Welcome to the Sidama Mesob Unity Center portal. We are bridging public enterprise infrastructure with elite tech talents to accelerate operational transparency and human resource optimization.
        </motion.p>

        {/* CALL TO ACTIONS GRID */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4"
        >
          <Link to="/joblist" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_0_40px_rgba(16,185,129,0.15)] active:scale-[0.98]">
              Explore Open Roles <ArrowRight size={16} />
            </button>
          </Link>

          <Link to="/about" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-200 border border-zinc-800 hover:border-zinc-700">
              Learn More
            </button>
          </Link>
        </motion.div>

        {/* MINIMAL FOOTNOTE PARAMETERS */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 border-t border-zinc-900/60 pt-8 w-full max-w-3xl opacity-60"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-white font-black text-xl tracking-tight">Enterprise</span>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Grade Portal</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-black text-xl tracking-tight">Real-Time</span>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Application Flow</span>
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-right col-span-2 md:col-span-1">
            <span className="text-white font-black text-xl tracking-tight">Secure</span>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Data Layer</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;