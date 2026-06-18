import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    <section className="relative w-full h-[90vh] min-h-[600px] bg-[var(--bg)] border-b border-[var(--nav-border)] overflow-visible flex items-center justify-center px-4 sm:px-6">
      {/* CORE FRAME CONTAINER (With Motion Initializer) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10 w-full"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={itemVariants}
            className="relative z-20 px-2 sm:px-6 py-6 flex flex-col items-start"
          >
            {/* LIVE TRACKING BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--nav-border)] text-[var(--color-text-secondary)] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-4 sm:mb-6 shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t("hero.badge")}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] font-black text-[var(--color-text-primary)] mb-4 tracking-tighter leading-[1.05] uppercase">
              {t("hero.title1")} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-red-500">
                {t("hero.title2")}
              </span>
            </h1>

            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed font-medium">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/joblist" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-[var(--color-text-primary)] px-8 py-4 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_0_40px_rgba(16,185,129,0.15)] active:scale-[0.98]">
                  {t("hero.viewRoles")} <ArrowRight size={16} />
                </button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[var(--color-surface)] hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-8 py-4 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-200 border border-[var(--nav-border)]">
                  {t("nav.about")}
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <div
              className="relative w-full max-w-[360px] sm:max-w-[420px] h-[320px] sm:h-[500px] lg:h-[600px] mx-auto sm:mx-0 overflow-visible"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.8,
                  y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.8,
                });
              }}
              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            >
              {/* refined lighting: top-right spotlight + soft underglow (hide on small screens) */}
              <motion.div
                className="hidden sm:block absolute -right-6 -top-6 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.22), rgba(6,182,212,0.06), transparent 52%)",
                }}
                animate={{
                  scale: [0.98, 1.02, 0.98],
                  opacity: [0.6, 0.95, 0.6],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="hidden sm:block absolute inset-x-6 bottom-6 h-28 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(6,182,212,0.12), transparent 60%)",
                }}
                animate={{ y: [0, -6, 0], opacity: [0.45, 0.85, 0.45] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="relative w-full h-full rounded-3xl overflow-visible"
                animate={{ y: [0, -10, 0], rotateY: [0, 3, 0, -3, 0] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d", perspective: 1400 }}
              >
                <motion.img
                  src="/hero.png"
                  alt="SidaMOV Hero"
                  className="relative z-10 w-full h-full sm:w-[106%] sm:h-[106%] object-contain sm:object-cover rounded-3xl shadow-[0_48px_160px_rgba(6,182,212,0.22)]"
                  initial={{ opacity: 0, scale: 0.995 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    transform: `perspective(1400px) translateZ(0) rotateX(${mousePos.y * 6}deg) rotateY(${mousePos.x * 6}deg) translate(10px,-10px)`,
                    transformStyle: "preserve-3d",
                    objectPosition: "60% 12%",
                    filter: "brightness(1.14) contrast(1.04) saturate(1.03)",
                  }}
                />
                {/* subtle screen overlay to brighten image without flattening colors (hide on small screens) */}
                <motion.div
                  className="hidden sm:block pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.02) 60%, transparent 100%)",
                    mixBlendMode: "screen",
                    opacity: 0.9,
                  }}
                  animate={{ opacity: [0.85, 0.98, 0.85] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
