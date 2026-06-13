import React from 'react';
import { motion } from 'framer-motion';
import { UserCog, BarChart3, Search, Target, Layers, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Main Orchestration Container Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Cascade down gracefully when the viewport passes the threshold
    },
  },
};

// Subtle Upward Glide For Sections
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

export default function AdminGuide() {
  const { t } = useTranslation();
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: false,       // Crucial: Allows re-triggering animations when scrolling back up/down
        amount: 0.15       // Triggers when at least 15% of the element enters the viewport
      }}
      className="space-y-12"
    >
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center gap-4"
      >
        <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <UserCog className="text-orange-500" size={32} />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tight">{t('help.adminGuide')}</h2>
      </motion.div>

      {/* Main Dashboard Control Panel Wrapper */}
      <motion.div 
        variants={itemVariants}
        className="p-10 rounded-[2.5rem] bg-[#0c0805]/50 border border-orange-900/20 shadow-2xl space-y-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="bg-orange-600 text-white text-xs font-black px-6 py-2 rounded-lg uppercase tracking-wider w-fit">
            {t('help.adminOverview')}
          </span>
          <p className="text-zinc-400 font-medium">{t('help.adminOverviewDesc')}</p>
        </div>

        {/* Features Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard 
            icon={<BarChart3 />} 
            title={t('help.kpiTitle')} 
            desc={t('help.kpiDesc')} 
          />
          <FeatureCard 
            icon={<Target />} 
            title={t('help.filterTitle')} 
            desc={t('help.filterDesc')} 
          />
          <FeatureCard 
            icon={<Search />} 
            title={t('help.searchTitle')} 
            desc={t('help.searchDesc')} 
          />
          <FeatureCard 
            icon={<Layers />} 
            title={t('help.exportTitle')} 
            desc={t('help.exportDesc')} 
          />
        </div>

        {/* Security Info Box Accent Animation */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 p-8 rounded-2xl bg-orange-500/5 border border-orange-500/20 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          <ShieldCheck className="text-orange-500 flex-shrink-0" size={32} />
          <div>
            <h5 className="text-lg font-bold text-orange-500">{t('help.secTitle')}</h5>
            <p className="text-sm text-orange-400/80 leading-relaxed">
              {t('help.secDesc')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ 
        y: -5, 
        borderColor: "rgba(249, 115, 22, 0.4)",
        backgroundColor: "rgba(12, 8, 5, 0.4)"
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="flex items-start gap-6 p-6 rounded-2xl bg-black/40 border border-zinc-800 transition-all duration-300 group cursor-pointer shadow-lg"
    >
      <div className="text-orange-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-orange-400">
          {title}
        </p>
        <p className="text-zinc-500 leading-relaxed text-sm transition-colors duration-300 group-hover:text-zinc-400">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}