import React, { useState } from "react";

function DeleteJobModal({ job, onClose, onDeleteConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Simulated live contextual data for an expert software engineering profile overview
  const applicantData = {
    fullName: "Kenenisa Mieso",
    roleTitle: "Software Engineer // MERN & Next.js Specialist",
    institution: "Arba Minch University",
    department: job.department || "Software Engineering Division",
    registryCode: job.jobCode || `REG-${job._id?.slice(-5).toUpperCase()}`,
    metrics: [
      { label: "Core Stack", value: "React / Node.js / MongoDB" },
      { label: "State Engine", value: "Next.js App Router" },
      { label: "Infrastructure", value: "Vercel / Supabase DB" }
    ],
    certifications: [
      {
        id: "cert-01",
        title: "Full Stack Web Development Certification",
        issuer: "freeCodeCamp Academy",
        date: "Verified Record",
        // Direct premium SVG vector badge layout acting as a beautiful high-fidelity document preview
        previewSvg: (
          <svg className="w-full h-full bg-[#020202] text-emerald-400 p-6" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="12" fill="#000" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="70" r="24" fill="#10B981" fillOpacity="0.05" stroke="#10B981" strokeWidth="1.5" />
            <path d="M194 70L198 74L206 66" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="200" y="125" textAnchor="middle" fill="#F4F4F5" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="1">COMPLETION AUTHORITY</text>
            <text x="200" y="145" textAnchor="middle" fill="#A1A1AA" fontSize="11" fontFamily="sans-serif">MERN Stack Engineering Mastery</text>
            <line x1="140" y1="170" x2="260" y2="170" stroke="#27272A" strokeWidth="1" />
            <text x="200" y="195" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">ID: FCC-FULLSTACK-99A</text>
          </svg>
        ),
        description: "Comprehensive verification covering backend architecture, complex schema integration, and scalable database cluster management."
      },
      {
        id: "cert-02",
        title: "Digital Talent Cloud Scholarship Node",
        issuer: "Safaricom Talent Cloud",
        date: "Active Credential",
        previewSvg: (
          <svg className="w-full h-full bg-[#020202] text-emerald-500 p-6" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="240" rx="12" fill="#000" stroke="#27272A" strokeWidth="1" />
            <path d="M30 30L370 30M370 210L30 210" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.3" />
            <text x="40" y="75" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="2">// TALENT ACADEMY</text>
            <text x="40" y="110" fill="#F4F4F5" fontSize="16" fontWeight="black" fontFamily="sans-serif">Advanced Digital Skills Award</text>
            <text x="40" y="135" fill="#71717A" fontSize="11" fontFamily="sans-serif">Scholarship Architecture & Platform Strategy</text>
            <rect x="40" y="165" width="120" height="22" rx="4" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="0.5" />
            <text x="100" y="179" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="monospace">STATUS: CONFIRMED</text>
          </svg>
        ),
        description: "Competitive program tracking high-velocity software delivery architectures, version control pipelines, and modern edge infrastructure optimization."
      }
    ]
  };

  const handleDeleteSubmit = async () => {
    setIsDeleting(true);
    const success = await onDeleteConfirm(job._id);
    setIsDeleting(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6 z-50 animate-[fadeIn_0.2s_ease-out] selection:bg-emerald-500/20">
      <div className="bg-[#000000] border border-zinc-900 w-full max-w-4xl h-[90vh] md:h-[85vh] rounded-2xl shadow-[0_0_80px_-20px_rgba(16,185,129,0.08)] overflow-hidden flex flex-col animate-[scaleIn_0.3s_ease-out] relative">
        
        {/* Absolute Top Grid Element */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Dynamic Window Navigation Header */}
        <div className="px-6 py-4 bg-[#030303] border-b border-zinc-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div>
              <h3 className="text-xs font-black text-zinc-200 uppercase tracking-widest font-mono">
                System Registry // Core Applicant Profile Preview
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-0.5">
                Target Pipeline Record: <span className="text-zinc-400">{job.title}</span>
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 bg-[#070707] hover:bg-[#0f0f0f] border border-zinc-900 p-2 rounded-xl transition-all duration-150 cursor-pointer"
            title="Close Framework Overlay"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Dashboard Main Scrollable Core Grid Viewport */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gradient-to-b from-[#000000] via-[#020202] to-[#000000]">
          
          {/* Section 1: Candidate Hero Block & Quick System Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-2">
              <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-500 bg-emerald-950/20 px-2.5 py-0.5 border border-emerald-500/10 rounded uppercase">
                {applicantData.institution}
              </span>
              <h1 className="text-2xl font-black text-zinc-100 tracking-tight mt-1">
                {applicantData.fullName}
              </h1>
              <p className="text-zinc-400 font-medium text-xs tracking-wide">
                {applicantData.roleTitle}
              </p>
            </div>
            
            {/* Inline Micro Metadata Table Box */}
            <div className="bg-[#040404] border border-zinc-900 rounded-xl p-4 font-mono text-[10px] space-y-2">
              <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                <span className="text-zinc-500 uppercase">SYS CODE:</span>
                <span className="text-zinc-300 font-bold">{applicantData.registryCode}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                <span className="text-zinc-500 uppercase">DEPT ID:</span>
                <span className="text-zinc-300 font-bold truncate max-w-[150px]">{applicantData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">PIPELINE:</span>
                <span className="text-emerald-400 font-bold uppercase">ACTIVE CONTROL</span>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Competencies Stack Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {applicantData.metrics.map((metric, idx) => (
              <div key={idx} className="bg-[#030303] border border-zinc-900 rounded-xl p-3.5 flex flex-col space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{metric.label}</span>
                <span className="text-xs font-bold text-zinc-200 tracking-wide">{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Section 3: Verified Digital Certifications & Image Previews Grid */}
          <div className="space-y-4">
            <div className="border-b border-zinc-900 pb-2">
              <h4 className="text-xs font-black text-zinc-300 uppercase tracking-widest font-mono">
                Verified Credentials & Digital Certifications
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicantData.certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-[#030303] border border-zinc-900 rounded-xl overflow-hidden flex flex-col group hover:border-zinc-800 transition-all duration-200"
                >
                  {/* Digital Document Viewport Window */}
                  <div className="relative aspect-[5/3] w-full bg-[#010101] border-b border-zinc-900 flex items-center justify-center overflow-hidden">
                    {cert.previewSvg}
                    
                    {/* Immersive overlay lens element */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 right-3 text-[8px] font-mono bg-zinc-950/80 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase tracking-widest">
                      {cert.date}
                    </span>
                  </div>

                  {/* Document Metadata Log Text Descriptions */}
                  <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-emerald-500 font-bold tracking-wider uppercase">
                        {cert.issuer}
                      </span>
                      <h5 className="text-xs font-bold text-zinc-200 tracking-wide mt-0.5 group-hover:text-white transition-colors">
                        {cert.title}
                      </h5>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-normal pt-1">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Footer Controls Panel Bar */}
        <div className="px-6 py-4 bg-[#030303] border-t border-zinc-900 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center shrink-0">
          
          {/* Warning notice message on destructive pipeline purge */}
          <div className="flex items-center gap-2 text-left self-start sm:self-center">
            <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-[10px] text-zinc-500 font-mono max-w-sm sm:max-w-md leading-tight uppercase">
              Notice: Purging will wipe tracking matrices for this tracking node entirely from memory banks.
            </p>
          </div>

          {/* Core Pipeline Action Triggers Container */}
          <div className="inline-flex gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-[#070707] hover:bg-[#0f0f0f] border border-zinc-900 hover:border-zinc-800 px-5 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 font-bold text-[10px] uppercase font-mono tracking-widest transition-colors cursor-pointer"
            >
              Exit Viewer
            </button>
            <button
              type="button"
              onClick={handleDeleteSubmit}
              disabled={isDeleting}
              className="w-full sm:w-auto bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/40 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase font-mono tracking-widest transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Wiping Logs..." : "Purge Position"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteJobModal;