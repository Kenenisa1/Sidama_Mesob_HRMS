import React from 'react';
import { UserCog, BarChart3, Search, Target, Layers, ShieldCheck } from 'lucide-react';

export default function AdminGuide() {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <UserCog className="text-orange-500" size={32} />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tight">Administrator Guide</h2>
      </div>

      <div className="p-10 rounded-[2.5rem] bg-[#0c0805]/50 border border-orange-900/20 shadow-2xl space-y-12">
        <div className="flex items-center gap-4">
          <span className="bg-orange-600 text-white text-xs font-black px-6 py-2 rounded-lg uppercase">Dashboard Overview</span>
          <p className="text-zinc-400 font-medium">Internal tools for candidate lifecycle management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard 
            icon={<BarChart3 />} 
            title="KPI Intelligence" 
            desc="Live tracking of total applicants, pending reviews, and department-wise recruitment progress." 
          />
          <FeatureCard 
            icon={<Target />} 
            title="Smart Filtering" 
            desc="Instantly narrow down candidates by CGPA, language proficiency (Sidaamu Afoo), and regional origin." 
          />
          <FeatureCard 
            icon={<Search />} 
            title="Global Search" 
            desc="Search the entire database by Applicant Name, Fayda ID, or Phone Number with sub-second latency." 
          />
          <FeatureCard 
            icon={<Layers />} 
            title="Export & Reporting" 
            desc="Generate PDF/Excel reports for board meetings and offline review committees." 
          />
        </div>

        <div className="mt-8 p-8 rounded-2xl bg-orange-500/5 border border-orange-500/20 flex gap-6 items-center">
          <ShieldCheck className="text-orange-500 flex-shrink-0" size={32} />
          <div>
            <h5 className="text-lg font-bold text-orange-500">Security & Integrity</h5>
            <p className="text-sm text-orange-400/80">
              Administrative actions are logged. Ensure you sign out after reviewing sensitive candidate data to maintain regional privacy standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-6 p-6 rounded-2xl bg-black/40 border border-zinc-800 hover:border-orange-500/40 transition-all group">
      <div className="text-orange-500 group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <p className="text-xl font-bold text-white mb-2">{title}</p>
        <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}