import React, { useRef } from "react";
import { motion } from "framer-motion";
import ApplicantGuide from "../components/help/ApplicantGuide";
import AdminGuide from "../components/help/AdminGuide";
import {
  Users,
  UserCog,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Main Orchestration Container Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Smooth structural cascade down the viewport
    },
  },
};

// Fluid Upward Entrance Physics
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16,
    },
  },
};

const Help = () => {
  const { t } = useTranslation();
  const applicantRef = useRef(null);
  const adminRef = useRef(null);

  const scrollToSection = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[var(--bg)] text-[var(--color-text-secondary)] font-sans pb-16 min-h-screen relative selection:bg-emerald-500/30 overflow-x-hidden">
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-900/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[var(--bg)]" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* Header Section */}
        <section className="pt-16 md:pt-24 pb-12 text-center">
          <motion.span
            variants={itemVariants}
            className="text-[10px] md:text-xs font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10"
          >
            <Users size={14} />
            {t("help.guidance")}
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight leading-tight"
          >
            {t("help.howCanWe")}{" "}
            <span className="text-emerald-500">{t("help.helpYou")}</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-2xl mx-auto"
          >
            {t("help.subtitle")}
          </motion.p>
        </section>

        {/* JUMP NAV - Mobile Friendly with Micro-interactions */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-20 md:mb-32"
        >
          <NavButton
            onClick={() => scrollToSection(applicantRef)}
            icon={<Users />}
            label={t("help.forApplicants")}
            color="emerald"
            t={t}
          />
          <NavButton
            onClick={() => scrollToSection(adminRef)}
            icon={<UserCog />}
            label={t("help.forAdmins")}
            color="orange"
            t={t}
          />
        </motion.div>

        {/* RENDER SECTIONS */}
        <div ref={applicantRef} className="mb-20 md:mb-32">
          <ApplicantGuide />
        </div>
        <div
          ref={adminRef}
          className="mb-20 md:mb-32 pt-16 border-t border-[var(--nav-border)]"
        >
          <AdminGuide />
        </div>

        {/* --- FINAL CONTACT SECTION (Scroll-Triggered) --- */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={containerVariants}
          className="py-12 md:py-16 px-6 md:px-8 rounded-[2rem] bg-[var(--surface-soft)] border border-emerald-500/10 mb-10 md:mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-[var(--color-text-primary)] mb-3 uppercase tracking-tight">
                {t("help.direct")}{" "}
                <span className="text-emerald-500">{t("help.support")}</span>
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm md:text-base">
                {t("help.reachOut")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {/* Email Card */}
              <motion.a
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(16, 185, 129, 0.4)",
                  backgroundColor: "rgba(5, 12, 26, 0.6)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                href="mailto:support@smuc-hr.gov.et"
                className="group p-6 md:p-8 rounded-2xl bg-[var(--surface-soft)] border border-[var(--nav-border)] text-center flex flex-col items-center cursor-pointer shadow-lg"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-emerald-500">
                  <Mail size={20} />
                </div>
                <h4 className="text-[var(--color-text-secondary)] font-bold uppercase text-[10px] tracking-widest mb-2">
                  {t("help.email")}
                </h4>
                <p className="text-[var(--color-text-primary)] font-bold text-xs md:text-sm break-all">
                  support@smuc-hr.gov.et
                </p>
              </motion.a>

              {/* Phone Card */}
              <motion.a
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(16, 185, 129, 0.4)",
                  backgroundColor: "rgba(5, 12, 26, 0.6)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                href="tel:+251912000000"
                className="group p-6 md:p-8 rounded-2xl bg-[var(--surface-soft)] border border-[var(--nav-border)] text-center flex flex-col items-center cursor-pointer shadow-lg"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-emerald-500">
                  <Phone size={20} />
                </div>
                <h4 className="text-[var(--color-text-secondary)] font-bold uppercase text-[10px] tracking-widest mb-2">
                  {t("help.call")}
                </h4>
                <p className="text-[var(--color-text-primary)] font-bold text-xs md:text-sm">
                  +251 912 000 000
                </p>
              </motion.a>

              {/* Location Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.2)" }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="p-6 md:p-8 rounded-2xl bg-[var(--surface-soft)] border border-[var(--nav-border)] text-center flex flex-col items-center sm:col-span-2 md:col-span-1 shadow-lg"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-500">
                  <MapPin size={20} />
                </div>
                <h4 className="text-[var(--color-text-secondary)] font-bold uppercase text-[10px] tracking-widest mb-2">
                  {t("help.location")}
                </h4>
                <p className="text-[var(--color-text-primary)] font-bold text-xs md:text-sm leading-tight mb-4 text-center whitespace-pre-line">
                  {t("help.mesobCenter")}
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=MESOB+One-stop+Service+Center+Hawassa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold text-[10px] uppercase tracking-tighter transition-colors group"
                >
                  {t("help.locateMap")}
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};
export default Help;

const NavButton = ({ onClick, icon, label, color, t }) => {
  const isEmerald = color === "emerald";
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        y: -6,
        borderColor: isEmerald
          ? "rgba(16, 185, 129, 0.45)"
          : "rgba(249, 115, 22, 0.45)",
        boxShadow: isEmerald
          ? "0 20px 40px -15px rgba(16,185,129,0.1)"
          : "0 20px 40px -15px rgba(249,115,22,0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="text-left group w-full outline-none"
    >
      <div
        className={`flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-[var(--surface-soft)] border transition-colors duration-300
        ${isEmerald ? "border-emerald-500/20" : "border-orange-500/20"}`}
      >
        <div
          className={`p-3 md:p-4 rounded-xl transition-transform duration-300 group-hover:scale-110 ${isEmerald ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"}`}
        >
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black text-[var(--color-text-primary)]">
            {label}
          </h3>
          <p className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-widest mt-0.5">
            {t ? t("help.jumpToGuide") : "Jump to guide"}
          </p>
        </div>
      </div>
    </motion.button>
  );
};
