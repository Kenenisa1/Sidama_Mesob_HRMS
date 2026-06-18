import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Main Container Variants - Orchestrates children transitions on viewport entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Cascades each section down smoothly on scroll
    },
  },
};

// Main Item Variants
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
    },
  },
};

// Inline List Item Variants (Eliminates broken absolute delays)
const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

export default function ApplicantGuide() {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false, // Allows re-triggering animations when scrolling back up/down
        amount: 0.12, // Triggers when 12% of the element enters the viewport
      }}
      className="space-y-12"
    >
      {/* Animated Header Section */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 className="text-emerald-500" size={32} />
        </div>
        <h2 className="text-4xl font-black text-[var(--color-text-primary)] uppercase tracking-tight">
          {t("help.appGuide")}
        </h2>
      </motion.div>

      <div className="space-y-6">
        {/* Step 1 */}
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          layout
          className="p-10 rounded-[2rem] bg-[#050c1a]/50 border border-zinc-900 shadow-2xl transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <span className="bg-emerald-600 text-[var(--color-text-primary)] text-xs font-black px-4 py-2 rounded-lg h-fit uppercase">
              {t("help.step1")}
            </span>
            <div>
              <h4 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                {t("help.step1Title")}
              </h4>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t("help.step1Desc")}
              </p>

              {/* Animated Sub-list */}
              <motion.ul
                variants={containerVariants} // Re-triggers cascading lines upon viewport entry
                className="space-y-3 mt-5"
              >
                {t("help.step1Bullets", { returnObjects: true }).map(
                  (text, idx) => (
                    <motion.li
                      key={idx}
                      variants={listItemVariants}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <ChevronRight className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{text}</span>
                    </motion.li>
                  ),
                )}
              </motion.ul>
            </div>
          </div>
        </motion.div>

        {/* Step 2 - Detailed Box */}
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          layout
          className="p-10 rounded-[2rem] bg-[#050c1a]/50 border border-zinc-900 shadow-2xl transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <span className="bg-emerald-600 text-[var(--color-text-primary)] text-xs font-black px-4 py-2 rounded-lg h-fit uppercase">
              {t("help.step2")}
            </span>
            <div className="flex-1 space-y-6">
              <div>
                <h4 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                  {t("help.step2Title")}
                </h4>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {t("help.step2Desc")}
                </p>
              </div>

              {/* Document Grid with inherited scroll staging */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--color-surface)]/30 p-8 rounded-2xl border border-[var(--nav-border)]"
              >
                <DocItem label={t("help.docCV")} desc={t("help.docCVDesc")} />
                <DocItem
                  label={t("help.docDegree")}
                  desc={t("help.docDegreeDesc")}
                />
                <DocItem label={t("help.docID")} desc={t("help.docIDDesc")} />
                <DocItem label={t("help.docExp")} desc={t("help.docExpDesc")} />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-5 rounded-xl bg-orange-500/5 border border-orange-500/20 flex gap-4 items-center"
              >
                <AlertCircle
                  className="text-orange-500 flex-shrink-0"
                  size={24}
                />
                <p className="text-sm font-bold text-orange-400">
                  {t("help.critical")}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          layout
          className="p-10 rounded-[2rem] bg-[#050c1a]/50 border border-zinc-900 shadow-2xl transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <span className="bg-emerald-600 text-[var(--color-text-primary)] text-xs font-black px-4 py-2 rounded-lg h-fit uppercase">
              {t("help.step3")}
            </span>
            <div>
              <h4 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                {t("help.step3Title")}
              </h4>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t("help.step3Desc")}
              </p>

              <motion.ul
                variants={containerVariants}
                className="space-y-3 mt-5"
              >
                {t("help.step3Bullets", { returnObjects: true }).map(
                  (text, idx) => (
                    <motion.li
                      key={idx}
                      variants={listItemVariants}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <ChevronRight className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{text}</span>
                    </motion.li>
                  ),
                )}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Fixed Sub-Component using unified variants inheriting from parent scroll states
function DocItem({ label, desc }) {
  return (
    <motion.div variants={itemVariants} className="flex items-start gap-4">
      <CheckCircle2 className="text-emerald-500 mt-1" size={20} />
      <div>
        <p className="text-lg font-bold text-[var(--color-text-primary)]">
          {label}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">{desc}</p>
      </div>
    </motion.div>
  );
}
