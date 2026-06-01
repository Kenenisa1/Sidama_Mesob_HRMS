import React, { useState } from 'react';
import axios from 'axios';

const ApplicantDetailsModal = ({ applicant, vacancyTitle, onClose, onStatusUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      setErrorMessage(null);
      
      await axios.put(`/api/applications/${applicant._id}/status`, { status: newStatus });
      if (onStatusUpdate) onStatusUpdate(); 
      onClose();
    } catch (err) {
      console.error('Error updating applicant status:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to update candidate progression state.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-6 animate-[fadeIn_0.2s_ease-out] selection:bg-emerald-500/20">
      <div className="w-full max-w-4xl h-[90vh] md:h-[85vh] bg-[#000000] border border-zinc-900 rounded-2xl shadow-[0_0_80px_-20px_rgba(16,185,129,0.08)] overflow-hidden flex flex-col relative">
        
        {/* Top Tech Laser Accented Border Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Modal Window Architecture Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-[#030303] shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div>
              <h3 className="text-xs font-black text-zinc-200 uppercase tracking-widest font-mono">
                HRMS Core Portal // Unified Profile Portfolio Pipeline
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono tracking-wider mt-0.5 uppercase">
                Active Node: <span className="text-white font-bold">{vacancyTitle || "General Registry Operations"}</span>
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-2 rounded-xl bg-[#070707] hover:bg-[#0f0f0f] border border-zinc-900 transition-colors cursor-pointer"
            title="Dismiss Document Overlay"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* SINGLE-PAGE CONTINUOUS VERTICAL SCROLL VIEWPORT WORKSPACE */}
        <div className="p-6 md:p-8 space-y-10 overflow-y-auto flex-1 bg-gradient-to-b from-[#000000] via-[#010101] to-[#000000] scroll-smooth">
          
          {errorMessage && (
            <div className="p-4 text-xs font-mono text-rose-400 bg-rose-950/20 border border-rose-500/20 rounded-xl animate-shake">
              SYSTEM ERROR // {errorMessage}
            </div>
          )}

          {/* LAYER 1: CANDIDATE PRIMARY METADATA LOGS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-2">
              <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/20 px-2.5 py-0.5 border border-emerald-500/10 rounded uppercase">
                Verified Candidate Profile Record
              </span>
              <h1 className="text-2xl font-black text-zinc-100 tracking-tight mt-1">
                {applicant.fullName || "Kenenisa Mieso"}
              </h1>
              <p className="text-zinc-400 font-medium text-xs font-mono tracking-wider">
                SYSTEM ID REFERENCE // <span className="text-zinc-500 font-sans">{applicant._id || "AE-90812-X"}</span>
              </p>
            </div>

            {/* Micro Quick-Action Contact Matrix */}
            <div className="bg-[#030303] border border-zinc-900 rounded-xl p-4 font-mono text-[10px] space-y-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 text-zinc-400">
                <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="truncate">{applicant.email || "kenenisaimieso@gmail.com"}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>{applicant.phoneNumber || "+251 912 345 678"}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 border-t border-zinc-900/60 pt-2">
                <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>Submission Date: {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString() : '01/06/2026'}</span>
              </div>
            </div>
          </div>

          {/* LAYER 2: CANDIDATE MANIFESTO / STATEMENT OF INTENT */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-black">
              <span>[01] Personal Manifesto & Application Intent</span>
              <div className="flex-1 h-[1px] bg-zinc-900" />
            </div>
            <div className="bg-[#030303] border border-zinc-900 p-5 rounded-xl text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-normal shadow-inner">
              {applicant.coverLetter || "Highly analytical Software Engineering specialist with comprehensive codebase execution capabilities centered around Next.js, React, and robust architecture optimization over the MERN stack. Committed to accelerating high-volume data arrays and rendering sleek, responsive dashboards via modular code compilation paradigms."}
            </div>
          </div>

          {/* LAYER 3: DYNAMIC CONVERTED HIGH-FIDELITY CURRICULUM VITAE RENDER IMAGE SHEET */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-black">
              <span>[02] Converted CV Document Ledger Viewport</span>
              <div className="flex-1 h-[1px] bg-zinc-900" />
            </div>

            {/* Complete full-scale CV vector image block conversion */}
            <div className="w-full bg-[#030303] border border-zinc-900 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
              <div className="w-full bg-[#000000] p-8 md:p-12 space-y-8 relative">
                {/* Micro tech aesthetic grids background patterns */}
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />
                <div className="absolute top-6 right-6 font-mono text-[8px] text-emerald-500/30 border border-emerald-500/10 px-2 py-0.5 rounded tracking-widest uppercase">
                  ENGINEERING PORTAL // DOC-2026
                </div>

                {/* CV Graphic Header Line Container */}
                <div className="border-l-4 border-emerald-500 pl-4 space-y-1">
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                    {applicant.fullName || "Kenenisa Mieso"}
                  </h2>
                  <p className="text-xs font-mono text-emerald-400 font-extrabold tracking-widest uppercase">
                    Software Engineer — Specialist in Next.js & MERN Stack Systems
                  </p>
                </div>

                {/* CV Two-Column Metadata Architecture Layout Block */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-zinc-900">
                  {/* Left Metadata Core Specifiers Column */}
                  <div className="space-y-6 md:border-r md:border-zinc-900/60 md:pr-6">
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Academic Origin</h4>
                      <p className="text-xs text-zinc-200 font-bold font-sans">Arba Minch University</p>
                      <p className="text-[10px] text-zinc-400 font-mono">B.Sc. Software Engineering Node (4th Year)</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Core Infrastructure Skills</h4>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Next.js', 'React.js', 'Node.js', 'Express', 'MongoDB', 'Supabase', 'SQLite', 'TailwindCSS', 'Git'].map((tech) => (
                          <span key={tech} className="text-[8px] font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5 font-mono text-[9px] text-zinc-500">
                      <p>GITHUB // github.com/Kenenisa1</p>
                      <p>LINKEDIN // kenenisa-mieso</p>
                    </div>
                  </div>

                  {/* Right Experience / Production Execution Details Log Column */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Core Production Deployments & Systems</h4>
                      
                      {/* Project 1 Node */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <h5 className="text-xs font-bold text-zinc-100">MarVista Platform <span className="text-[10px] text-zinc-500 font-normal font-mono">(Formerly Smart Market Preview)</span></h5>
                          <span className="text-[9px] font-mono text-emerald-500/80">Active Build</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                          Architected an ultra-fast digital window-shopping portal tool infrastructure. Integrated customized deployment paradigms on Vercel and configured strict API protection layers.
                        </p>
                      </div>

                      {/* Project 2 Node */}
                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between items-center">
                          <h5 className="text-xs font-bold text-zinc-100">Sidama Mesob HRMS <span className="text-[10px] text-zinc-500 font-normal font-mono">(Hawassa Pulse)</span></h5>
                          <span className="text-[9px] font-mono text-emerald-500/80">Government Node</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                          Developed advanced technical requirement frameworks, precise API route schema contracts, and beautiful high-performance enterprise admin panels for localized municipal digitization.
                        </p>
                      </div>

                      {/* Project 3 Node */}
                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between items-center">
                          <h5 className="text-xs font-bold text-zinc-100">Personal Finance & Embedded Switched Arrays</h5>
                          <span className="text-[9px] font-mono text-zinc-600">Completed Node</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                          Engineered local Android storage systems utilizing SQLite environments alongside low-level Arduino micro-controlled smart switch automation hardware modules.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Download Control Foot Bar */}
              <div className="p-4 bg-[#050505] flex justify-between items-center border-t border-zinc-900">
                <div>
                  <h5 className="text-xs font-mono font-bold text-zinc-300">Curriculum_Vitae_Image_Render.png</h5>
                  <p className="text-[10px] text-zinc-500 font-mono">System Generated Document Vector Frame Map</p>
                </div>
                <a 
                  href={`/api/uploads/${applicant.documents?.resume || 'mock-resume.pdf'}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#000000] hover:bg-[#070707] border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  DOWNLOAD SOURCE
                </a>
              </div>
            </div>
          </div>

          {/* LAYER 4: VERIFIED CREDENTIAL ACCOUNTS & CERTIFICATIONS IMAGES LINK MATRIX */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-black">
              <span>[03] Institutional Credentials & Certification Badges</span>
              <div className="flex-1 h-[1px] bg-zinc-900" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* IMAGE BADGE CERTIFICATE 1 */}
              <div className="bg-[#030303] border border-zinc-900 rounded-xl overflow-hidden flex flex-col group hover:border-zinc-800 transition-all duration-200">
                <div className="relative aspect-[16/10] w-full bg-[#000000] border-b border-zinc-900 flex flex-col justify-between p-5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.01] via-transparent to-transparent pointer-events-none" />
                  
                  <div className="flex justify-between items-start">
                    <span className="text-[7px] font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                      Verified Node Log
                    </span>
                    <span className="text-[8px] font-mono text-zinc-600 font-bold">freeCodeCamp Core Frameworks</span>
                  </div>

                  <div className="text-center my-auto space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/[0.02] border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <h4 className="text-xs font-mono font-black text-zinc-200 uppercase tracking-wide">Full Stack Web Engineering Mastery</h4>
                    <p className="text-[10px] text-zinc-500 font-sans max-w-[240px] mx-auto">Completion compliance metrics validation detailing production-ready cluster schema implementations.</p>
                  </div>

                  <div className="flex justify-between text-[7px] font-mono text-zinc-600 border-t border-zinc-900/60 pt-2">
                    <span>ID: FCC-FULLSTACK-99A</span>
                    <span className="text-emerald-500/60 font-bold">STATUS: AUTHORIZED ✓</span>
                  </div>
                </div>
                <div className="p-3 bg-[#050505] flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>Full_Stack_Certification_Credential.png</span>
                  <a href={`/api/uploads/${applicant.documents?.certifications || 'mock-cert.png'}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></a>
                </div>
              </div>

              {/* IMAGE BADGE CERTIFICATE 2 */}
              <div className="bg-[#030303] border border-zinc-900 rounded-xl overflow-hidden flex flex-col group hover:border-zinc-800 transition-all duration-200">
                <div className="relative aspect-[16/10] w-full bg-[#000000] border-b border-zinc-900 flex flex-col justify-between p-5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/[0.01] via-transparent to-transparent pointer-events-none" />
                  
                  <div className="flex justify-between items-start">
                    <span className="text-[7px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded uppercase tracking-wider">
                      Scholarship Account Node
                    </span>
                    <span className="text-[8px] font-mono text-zinc-600 font-bold">Safaricom Talent Cloud</span>
                  </div>

                  <div className="text-center my-auto space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/[0.02] border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <h4 className="text-xs font-mono font-black text-zinc-200 uppercase tracking-wide">Advanced Digital Talent Scholar Award</h4>
                    <p className="text-[10px] text-zinc-500 font-sans max-w-[240px] mx-auto">Competitive scholarship program mapping system infrastructure orchestration limits.</p>
                  </div>

                  <div className="flex justify-between text-[7px] font-mono text-zinc-600 border-t border-zinc-900/60 pt-2">
                    <span>REGISTRY NODE ACTIVE</span>
                    <span className="text-zinc-400 font-bold">LIVE METRIC</span>
                  </div>
                </div>
                <div className="p-3 bg-[#050505] flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>Digital_Talit_Cloud_Scholarship.png</span>
                  <a href={`/api/uploads/${applicant.documents?.scholarship || 'mock-schol.png'}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* FIXED FOOTER CONTROLS TOOLBAR PANEL */}
        <div className="px-6 py-4 bg-[#030303] border-t border-zinc-900 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center shrink-0 z-10">
          
          {/* Tracking Pipeline Current State Status */}
          <div className="flex items-center gap-2 self-start sm:self-center font-mono text-[10px]">
            <span className="text-zinc-500 uppercase">Track State:</span>
            <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold tracking-widest border uppercase transition-all ${
              applicant.status === 'accepted' 
                ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]' 
                : applicant.status === 'rejected'
                ? 'bg-rose-950/20 text-rose-400 border-rose-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}>
              {applicant.status || 'Pending Review'}
            </span>
          </div>

          {/* Operational Action Pipeline Buttons */}
          <div className="inline-flex gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="w-full sm:w-auto bg-[#070707] hover:bg-[#0f0f0f] border border-zinc-900 hover:border-zinc-800 px-5 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 font-bold text-[10px] uppercase font-mono tracking-widest transition-colors cursor-pointer"
            >
              Exit Portfolio
            </button>
            
            {applicant.status !== 'rejected' && (
              <button
                type="button"
                onClick={() => handleStatusChange('rejected')}
                disabled={isUpdating}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#000000] hover:bg-rose-950/10 text-zinc-500 hover:text-rose-400 border border-zinc-900 hover:border-rose-500/20 px-4 py-2.5 rounded-xl text-[10px] font-mono tracking-widest font-black uppercase transition-all duration-150 cursor-pointer disabled:opacity-40"
              >
                {isUpdating ? <span className="w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" /> : null}
                Reject Candidate
              </button>
            )}

            {applicant.status !== 'accepted' && (
              <button
                type="button"
                onClick={() => handleStatusChange('accepted')}
                disabled={isUpdating}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 px-5 py-2.5 rounded-xl text-[10px] font-mono tracking-widest font-black uppercase transition-all duration-150 cursor-pointer disabled:opacity-40 active:scale-[0.98]"
              >
                {isUpdating ? <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /> : null}
                Accept Applicant
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ApplicantDetailsModal;