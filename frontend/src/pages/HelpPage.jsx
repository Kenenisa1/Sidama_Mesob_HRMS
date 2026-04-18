import React, { useRef } from 'react';
import ApplicantGuide from '../components/help/ApplicantGuide';
import AdminGuide from '../components/help/AdminGuide';
import { Users, UserCog, Mail, Phone, MapPin } from 'lucide-react';

export default function HelpPage() {
  const applicantRef = useRef(null);
  const adminRef = useRef(null);

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#020817] text-zinc-300 font-sans pb-24 relative selection:bg-emerald-500/30">
      
      {/* BACKGROUND GRADIENT FIX */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-emerald-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[#020817]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header and Nav Buttons as before... */}
        <section className="pt-24 pb-16 text-center">
           <h1 className="text-7xl font-black text-white mb-6 tracking-tight">How Can We <span className="text-emerald-500">Help You?</span></h1>
        </section>

        {/* JUMP NAV */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <NavButton onClick={() => scrollToSection(applicantRef)} icon={<Users />} label="For Applicants" color="emerald" />
          <NavButton onClick={() => scrollToSection(adminRef)} icon={<UserCog />} label="For Administrators" color="orange" />
        </div>

        {/* RENDER SECTIONS */}
        <div ref={applicantRef} className="mb-32"><ApplicantGuide /></div>
        <div ref={adminRef} className="mb-32 pt-16 border-t border-zinc-900"><AdminGuide /></div>

        {/* Footer Contact as before... */}
      </main>
    </div>
  );
}

function NavButton({ onClick, icon, label, color }) {
  const isEmerald = color === 'emerald';
  return (
    <button onClick={onClick} className="text-left group w-full">
      <div className={`flex items-center gap-8 p-10 rounded-[2rem] bg-[#050c1a] border transition-all shadow-2xl 
        ${isEmerald ? 'border-emerald-500/20 hover:border-emerald-500/50' : 'border-orange-500/20 hover:border-orange-500/50'}`}>
        <div className={`p-5 rounded-2xl ${isEmerald ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
          {React.cloneElement(icon, { size: 40 })}
        </div>
        <div>
          <h3 className="text-3xl font-black text-white">{label}</h3>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Jump to guide</p>
        </div>
      </div>
    </button>
  );
}