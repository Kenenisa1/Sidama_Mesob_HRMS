import React, { useEffect, useState, useRef } from "react";
import { Users, Timer, Award } from "lucide-react";
import { motion, useInView } from "framer-motion";

// 🔢 ANIMATED COUNTER ENGINE (Stays exactly the same for performance)
const AnimatedNumber = ({ value, suffix = "" }) => {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef(null);
  const isElementInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isElementInView) return;

    const targetInteger = parseInt(String(value).replace(/,/g, ""), 10) || 0;
    if (targetInteger === 0) return;

    let startTimestamp = null;
    const durationMs = 1500;

    const processCountStep = (currentTimestamp) => {
      if (!startTimestamp) startTimestamp = currentTimestamp;
      const elapsedTime = currentTimestamp - startTimestamp;
      const progressPercent = Math.min(elapsedTime / durationMs, 1);

      const easeOutValue = 1 - Math.pow(1 - progressPercent, 3);
      setCurrent(Math.floor(easeOutValue * targetInteger));

      if (progressPercent < 1) {
        window.requestAnimationFrame(processCountStep);
      }
    };

    window.requestAnimationFrame(processCountStep);
  }, [value, isElementInView]);

  return <span ref={elementRef}>{current.toLocaleString()}{suffix}</span>;
};

// 🎴 STATISTICAL DATA PRESENTATION CARD
const StatCard = ({ icon: Icon, value, label, suffix, glowColor, borderHover }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-zinc-950/40 border border-zinc-900/80 p-6 sm:p-8 rounded-3xl flex items-center gap-6 overflow-hidden transition-all duration-300 ${borderHover}`}
    >
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-[60px] rounded-full transition-opacity opacity-20 group-hover:opacity-40 duration-500 ${glowColor}`} />
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 group-hover:border-zinc-700/60 group-hover:bg-zinc-900 transition-all duration-300 shrink-0">
        <Icon size={28} className="text-zinc-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center">
          <AnimatedNumber value={value} suffix={suffix} />
        </div>
        <div className="text-zinc-500 text-[10px] sm:text-xs font-black tracking-widest uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

// 📊 MAIN LIVE DATABASE STATS SYSTEM
const StatsBar = () => {
  // Initialize states with pristine safety values before API updates complete
  const [dbStats, setDbStats] = useState({
    activeApplicants: 0,
    openPositions: 0,
    successRate: 94,
  });

  useEffect(() => {
    const fetchLiveMetrics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stats/overview");
        const json = await response.json();
        if (response.ok && json.success) {
          setDbStats({
            activeApplicants: json.data.activeApplicants,
            openPositions: json.data.openPositions,
            successRate: json.data.successRate,
          });
        }
      } catch (error) {
        console.error("Live metrics pipeline offline. Falling back to local values:", error);
      }
    };

    fetchLiveMetrics();
  }, []);

  const metricsData = [
    { 
      label: "Active System Applicants", 
      value: dbStats.activeApplicants, 
      suffix: "",
      icon: Users, 
      glowColor: "bg-emerald-500",
      borderHover: "hover:border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.02)]"
    },
    { 
      label: "Open Job Positions", 
      value: dbStats.openPositions, 
      suffix: "",
      icon: Timer, 
      glowColor: "bg-red-500",
      borderHover: "hover:border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.02)]"
    },
    { 
      label: "Platform Success Rate", 
      value: dbStats.successRate, 
      suffix: "%",
      icon: Award, 
      glowColor: "bg-emerald-500",
      borderHover: "hover:border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.02)]"
    },
  ];

  return (
    <section className="relative z-20 px-6 py-12 bg-[#000000] w-full border-b border-zinc-900/40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {metricsData.map((metric, index) => (
          <StatCard key={index} {...metric} />
        ))}
      </div>
    </section>
  );
};

export default StatsBar;