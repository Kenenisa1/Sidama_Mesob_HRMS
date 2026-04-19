import React, { useRef } from 'react';
import ApplicantGuide from '../components/help/ApplicantGuide';
import AdminGuide from '../components/help/AdminGuide';
import { Users, UserCog, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function HelpPage() {
  const applicantRef = useRef(null);
  const adminRef = useRef(null);

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#020817] text-zinc-300 font-sans pb-16 relative selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* BACKGROUND GRADIENT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-900/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[#020817]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section - Balanced Sizes */}
        <section className="pt-16 md:pt-24 pb-12 text-center">
            <span className="text-[10px] md:text-xs font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <Users size={14} />
              Guidance & Support
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              How Can We <span className="text-emerald-500">Help You?</span>
            </h1>
            <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto">
              Everything you need to know about the SMUC HR Portal recruitment process.
            </p>
        </section>

        {/* JUMP NAV - Mobile Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-20 md:mb-32">
          <NavButton onClick={() => scrollToSection(applicantRef)} icon={<Users />} label="For Applicants" color="emerald" />
          <NavButton onClick={() => scrollToSection(adminRef)} icon={<UserCog />} label="For Administrators" color="orange" />
        </div>

        {/* RENDER SECTIONS */}
        <div ref={applicantRef} className="mb-20 md:mb-32">
          <ApplicantGuide />
        </div>
        <div ref={adminRef} className="mb-20 md:mb-32 pt-16 border-t border-zinc-900">
          <AdminGuide />
        </div>

        {/* --- FINAL CONTACT SECTION --- */}
        <section className="py-12 md:py-16 px-6 md:px-8 rounded-[2rem] bg-[#050c1a]/40 border border-emerald-500/10 mb-10 md:mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">
                Direct <span className="text-emerald-500">Support</span>
              </h3>
              <p className="text-zinc-500 text-sm md:text-base">
                Reach out to the Sidama Mesob Unity Center HR team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              
              {/* Email Card */}
              <a href="mailto:support@smuc-hr.gov.et" className="group p-6 md:p-8 rounded-2xl bg-black/40 border border-zinc-900 hover:border-emerald-500/40 transition-all text-center flex flex-col items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-emerald-500">
                  <Mail size={20} />
                </div>
                <h4 className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mb-2">Email</h4>
                <p className="text-white font-bold text-xs md:text-sm break-all">support@smuc-hr.gov.et</p>
              </a>

              {/* Phone Card */}
              <a href="tel:+251912000000" className="group p-6 md:p-8 rounded-2xl bg-black/40 border border-zinc-900 hover:border-emerald-500/40 transition-all text-center flex flex-col items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-emerald-500">
                  <Phone size={20} />
                </div>
                <h4 className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mb-2">Call</h4>
                <p className="text-white font-bold text-xs md:text-sm">+251 912 000 000</p>
              </a>

              {/* Location Card */}
              <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-zinc-900 text-center flex flex-col items-center sm:col-span-2 md:col-span-1">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-500">
                  <MapPin size={20} />
                </div>
                <h4 className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mb-2">Location</h4>
                <p className="text-white font-bold text-xs md:text-sm leading-tight mb-4 text-center">
                  MESOB Service Center<br/>Hawassa, Ethiopia
                </p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=MESOB+One-stop+Service+Center+Hawassa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold text-[10px] uppercase tracking-tighter transition-colors group"
                >
                  Locate Map
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function NavButton({ onClick, icon, label, color }) {
  const isEmerald = color === 'emerald';
  return (
    <button onClick={onClick} className="text-left group w-full outline-none">
      <div className={`flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-[#050c1a] border transition-all active:scale-[0.98]
        ${isEmerald ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-orange-500/20 hover:border-orange-500/40'}`}>
        <div className={`p-3 md:p-4 rounded-xl ${isEmerald ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black text-white">{label}</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Jump to guide</p>
        </div>
      </div>
    </button>
  );
}