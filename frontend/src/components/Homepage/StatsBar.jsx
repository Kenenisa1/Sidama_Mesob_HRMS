import React, { useEffect, useState, useRef } from "react";
import { Users, Timer, Award } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

// 🔢 ANIMATED COUNTER ENGINE
const AnimatedNumber = ({ value, suffix = "" }) => {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef(null);
  const isElementInView = useInView(elementRef, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    if (!isElementInView) return;

    const targetInteger = parseInt(String(value).replace(/,/g, ""), 10) || 0;
    if (targetInteger === 0) {
      setTimeout(() => setCurrent(0), 0); // Reset to 0 cleanly if value drops
      return;
    }

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

  return (
    <span ref={elementRef}>
      {current.toLocaleString()}
      {suffix}
    </span>
  );
};

// 🎴 STATISTICAL DATA PRESENTATION CARD
const StatCard = ({
  icon: Icon,
  value,
  label,
  suffix,
  glowColor,
  borderHover,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-[var(--color-surface)] border border-[var(--nav-border)] p-6 sm:p-8 rounded-3xl flex items-center gap-6 overflow-hidden transition-all duration-300 ${borderHover}`}
    >
      {/* Background radial soft ambient lighting */}
      <div
        className={`absolute -right-4 -bottom-4 w-24 h-24 blur-[60px] rounded-full transition-opacity opacity-20 group-hover:opacity-40 duration-500 ${glowColor}`}
      />

      {/* Icon Frame */}
      <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--nav-border)] group-hover:border-emerald-500/30 group-hover:bg-[var(--color-surface)] transition-all duration-300 shrink-0">
        <Icon
          size={28}
          className="text-[var(--color-text-secondary)] group-hover:text-emerald-400 transition-colors duration-300"
        />
      </div>

      {/* Numerical Metrics Metadata */}
      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] tracking-tight flex items-center">
          <AnimatedNumber value={value} suffix={suffix} />
        </div>
        <div className="text-[var(--color-text-secondary)] text-[10px] sm:text-xs font-black tracking-widest uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

// 📊 MAIN LIVE DATABASE STATS SYSTEM
const StatsBar = () => {
  const { t } = useTranslation();
  // Initialize states with pristine safety values before API updates complete
  const [dbStats, setDbStats] = useState({
    activeApplicants: 0,
    openPositions: 0,
    successRate: 94,
  });

  // ✅ FIX: Kept fetch API network operations correctly contained within the parent component wrapper
  useEffect(() => {
    const fetchLiveMetrics = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/stats/overview",
        );
        const json = await response.json();

        // 📝 Check your developer console to make sure the structure matches!
        console.log("📊 Stats API Payload Received:", json);

        if (response.ok && json) {
          // If response wraps under data: { ... }
          if (json.data) {
            setDbStats({
              activeApplicants: Number(json.data.activeApplicants) || 0,
              openPositions: Number(json.data.openPositions) || 0,
              successRate: Number(json.data.successRate) || 94,
            });
          } else {
            // Flat response fallback mapping mapping parameters straight out
            setDbStats({
              activeApplicants: Number(json.activeApplicants) || 0,
              openPositions: Number(json.openPositions) || 0,
              successRate: Number(json.successRate) || 94,
            });
          }
        }
      } catch (error) {
        console.error(
          "Live metrics pipeline offline. Falling back to local values:",
          error,
        );
      }
    };

    fetchLiveMetrics();
  }, []);

  const metricsData = [
    {
      label: t("stats.activeApps"),
      value: dbStats.activeApplicants,
      suffix: "",
      icon: Users,
      glowColor: "bg-emerald-500",
      borderHover:
        "hover:border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.02)]",
    },
    {
      label: t("stats.openJobs"),
      value: dbStats.openPositions,
      suffix: "",
      icon: Timer,
      glowColor: "bg-rose-500", // Used cohesive accent matching your design scheme
      borderHover:
        "hover:border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.02)]",
    },
    {
      label: t("stats.successRate"),
      value: dbStats.successRate,
      suffix: "%",
      icon: Award,
      glowColor: "bg-emerald-500",
      borderHover:
        "hover:border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.02)]",
    },
  ];

  return (
    <section className="relative z-20 px-6 py-12 bg-[var(--bg)] w-full border-b border-[var(--nav-border)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {metricsData.map((metric, index) => (
          <StatCard key={index} {...metric} />
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
