import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Target, Globe, Heart, 
  Search, Cpu, UserCheck, Leaf, 
  Users, Mail, Phone, MousePointer2 
} from 'lucide-react';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const SMUCLanding = () => {
  const coreValues = [
    { id: 1, title: "Cultural Pride", desc: "We celebrate and preserve Sidama language, traditions, and identity in all our operations.", icon: <Heart className="text-emerald-500" /> },
    { id: 2, title: "Transparency", desc: "Every hiring decision is data-driven, merit-based, and fully accountable to the public.", icon: <Search className="text-emerald-500" /> },
    { id: 3, title: "Digital Innovation", desc: "We eliminate bureaucracy through technology, making government services accessible to all.", icon: <Cpu className="text-emerald-500" /> },
    { id: 4, title: "Merit-Based Selection", desc: "Qualifications, language proficiency, and regional residency are our key hiring criteria.", icon: <UserCheck className="text-emerald-500" /> },
    { id: 5, title: "Environmental Responsibility", desc: "Our 100% paperless system reduces waste and protects our natural heritage.", icon: <Leaf className="text-emerald-500" /> },
    { id: 6, title: "Community Connection", desc: "We prioritize candidates who understand and serve Kebele-level needs.", icon: <Users className="text-emerald-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020d0a] text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#10b981 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

      <main className="relative max-w-6xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <section className="text-center mb-24">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="inline-block p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-8"
          >
            <Shield size={48} className="text-emerald-400 fill-emerald-400/10" />
          </motion.div>
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">About SMUC</h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              The Sidama Mesob Unity Center is transforming how government serves the people of 
              Sidama through <span className="text-emerald-400">digital innovation</span> and cultural preservation.
            </p>
          </FadeIn>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <FadeIn delay={0.2}>
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-transparent border border-white/5 hover:border-emerald-500/30 transition-colors group">
              <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-400 leading-relaxed">
                To build a modern, efficient, and culturally-rooted public service system that empowers 
                Sidama citizens through organized benefit and digital transformation.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-orange-950/20 to-transparent border border-white/5 hover:border-orange-500/30 transition-colors group">
              <div className="bg-orange-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-slate-400 leading-relaxed">
                A Sidama where every qualified citizen has equal access to government opportunities, 
                where cultural heritage meets digital excellence.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Core Values */}
        <section className="mb-24 bg-[#051510]/60 p-10 rounded-[2.5rem] border border-white/5">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-2">Core Values</h2>
            <p className="text-slate-500 mb-12">The principles that guide our work every day</p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {coreValues.map((value, index) => (
              <FadeIn key={value.id} delay={index * 0.1}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-500 border border-emerald-500/20">
                    {value.id}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{value.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Paperless Initiative */}
        <FadeIn>
          <section className="relative overflow-hidden p-12 rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-b from-emerald-900/10 to-transparent text-center">
            <Leaf size={40} className="text-emerald-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">Paperless Initiative</h2>
            <p className="text-slate-500 mb-12">Leading the way in sustainable government operations</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "Digital Processing", value: "100%" },
                { label: "Paper Documents Required", value: "0" },
                { label: "Online Access", value: "24/7" }
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 p-8 rounded-2xl border border-white/5">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="inline-block px-6 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-sm">
              <span className="font-bold">Environmental Impact:</span> By going paperless, SMUC saves approximately 50,000 sheets of paper annually.
            </div>
          </section>
        </FadeIn>

        {/* Contact Footer */}
        <footer className="mt-24 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">Get in Touch</h2>
            <p className="text-slate-500 mb-10">Have questions about the application process? We're here to help.</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a href="mailto:info@smuc.gov.et" className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                  <Mail size={20} />
                </div>
                info@smuc.gov.et
              </a>
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <a href="tel:+25146XXXXXXX" className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                  <Phone size={20} />
                </div>
                +251-46-XXX-XXXX
              </a>
            </div>
          </FadeIn>
        </footer>

      </main>
    </div>
  );
};

export default SMUCLanding;