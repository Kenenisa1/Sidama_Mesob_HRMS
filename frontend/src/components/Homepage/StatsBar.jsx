import React from "react";
import { Users, Timer, Award } from "lucide-react";

const StatCard = ({ icon: Icon, value, label, color, bgColor }) => {
  return (
    <div className="bg-gradient-to-br from-[#081c2e] to-[#020c17] border border-white/5 p-6 rounded-2xl flex items-center gap-5 shadow-xl">
      <div className={`${bgColor} p-4 rounded-xl`}>
        <Icon size={30} className={color} />
      </div>

      <div>
        <div className="text-3xl font-black text-white">{value}</div>
        <div className="text-gray-400 text-sm font-semibold mt-1 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
};

const StatsBar = () => {
  const stats = [
    { label: "Active Applicants", value: "1,247", icon: Users, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
    { label: "Open Positions", value: "8", icon: Timer, color: "text-orange-500", bgColor: "bg-orange-500/10" },
    { label: "Success Rate", value: "94%", icon: Award, color: "text-teal-500", bgColor: "bg-teal-500/10" },
  ];

  return (
    <section className="relative z-20 px-6 py-16 
      bg-gradient-to-r from-[#020c17] via-[#052e2b] to-[#020c17]">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default StatsBar;