import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Briefcase, 
  X, 
  Hash, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  GraduationCap, 
  FileText, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2,
  ShieldAlert,
  CalendarClock,
  MapPin,
  Award
} from "lucide-react";

function EditJobModal({ jobId, onClose, onUpdateSuccess }) {
  // 1. Pristine state configuration mirroring the updated dynamic schema fields
  const [formData, setFormData] = useState({
    title: "",
    jobCode: "",
    department: "Information Technology",
    rankLevel: "Level XIII",
    salary: "",
    positions: "1",
    eligibleFields: "",
    experienceRequirements: "",
    description: "",       
    cgpa: "0.00",          
    location: "MESOB Center, Hawassa", 
    employmentType: "Public Service", 
    requiresCOC: false,
    sidama: true,
    amharic: true,
    english: false,
    featuredOnHome: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // High-fidelity state-driven non-blocking toast overlay stack
  const [toasts, setToasts] = useState([]);

  // Freeze viewport backdrop scrolling when configuration modal mounts
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(formData.rankLevel);
  const activeWindowDays = isHighRank ? 10 : 5;

  // Spawns premium animated toasts matching the creation framework
  const spawnToast = (title, message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  // 2. Async Document Hydration Pipeline Hook
  useEffect(() => {
    let isMounted = true;

    const fetchJobDetails = async () => {
      if (!jobId) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        if (isMounted) setIsLoading(true);
        const targetUrl = `http://localhost:5000/api/jobs/${jobId}`;
        const response = await axios.get(targetUrl);
        const rawData = response.data;
        
        let job = null;
        if (rawData) {
          if (rawData.success && rawData.data) job = rawData.data;
          else if (rawData.job) job = rawData.job;
          else job = rawData;
        }

        if (job && typeof job === "object" && isMounted) {
          setFormData({
            title: job.title || "",
            jobCode: job.jobCode || "",
            department: job.department || "Information Technology",
            rankLevel: job.rankLevel || "Level XIII",
            salary: job.salary !== undefined ? String(job.salary) : "",
            positions: job.positions !== undefined ? String(job.positions) : "1",
            description: job.description || "",
            eligibleFields: job.eligibleFields || "",
            experienceRequirements: job.experienceRequirements || job.requirements || "",
            cgpa: job.cgpa !== undefined ? String(parseFloat(job.cgpa).toFixed(2)) : "0.00",
            location: job.location || "MESOB Center, Hawassa",
            employmentType: job.employmentType || "Public Service",
            requiresCOC: job.requiresCOC === true,
            featuredOnHome: job.featuredOnHome === true,
            sidama: job.languages ? job.languages.sidama === true : true,
            amharic: job.languages ? job.languages.amharic === true : true,
            english: job.languages ? job.languages.english === true : false,
          });
        }
      } catch (err) {
        console.error("Data Hydration Stream Exception:", err);
        if (isMounted) {
          spawnToast(
            "Fetch Error",
            `Failed to look up entry: ${err.response?.data?.message || err.message}`,
            "error"
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchJobDetails();

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (name) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // 3. Database Write-Back Commit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title.trim() || !formData.jobCode.trim() || !formData.eligibleFields.trim() || !formData.description.trim()) {
      spawnToast(
        "Validation Fault",
        "Required registry nodes cannot be left blank during edit updates.",
        "error"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        jobCode: formData.jobCode.trim(),
        department: formData.department,
        rankLevel: formData.rankLevel.trim(),
        salary: Number(formData.salary) || 0,
        positions: Number(formData.positions) || 1,
        description: formData.description.trim(),
        requirements: formData.experienceRequirements.trim(), 
        eligibleFields: formData.eligibleFields.trim(),
        experienceRequirements: formData.experienceRequirements.trim(),
        cgpa: !isNaN(parseFloat(formData.cgpa)) ? parseFloat(parseFloat(formData.cgpa).toFixed(2)) : 0,
        location: formData.location.trim(),
        employmentType: formData.employmentType.trim(),
        languages: {
          sidama: formData.sidama,
          amharic: formData.amharic,
          english: formData.english,
        },
        featuredOnHome: formData.featuredOnHome,
        registrationWindowDays: activeWindowDays,
      };

      const response = await axios.put(`http://localhost:5000/api/jobs/${jobId}`, payload);

      if (response.data?.success || response.status === 200) {
        spawnToast(
          "Update Complete",
          `Vacancy code ${formData.jobCode} successfully rewritten inside Mesob logs.`,
          "success"
        );
        
        setTimeout(() => {
          if (onUpdateSuccess) onUpdateSuccess();
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error("Document rewrite execution exception:", err);
      const serverMsg = err.response?.data?.message || "Database engine refused update payload parameters.";
      spawnToast(
        "Registry Access Error",
        serverMsg,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* REAL-WORLD STACKED TOAST COMPONENT HUB OVERLAY */}
      <div className="fixed top-6 right-6 z-[10000] flex flex-col gap-3 w-full max-w-sm pointer-events-none font-mono">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 transition-all duration-300 transform animate-[slideIn_0.25s_ease-out] ${
              toast.type === "success"
                ? "bg-[#022c22]/90 border-emerald-500/40 shadow-emerald-950/20"
                : "bg-[#4c0519]/90 border-rose-500/40 shadow-rose-950/20"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <span className={`text-[11px] font-black uppercase tracking-widest block ${
                toast.type === "success" ? "text-emerald-300" : "text-rose-300"
              }`}>
                [{toast.title}]
              </span>
              <p className="text-[10px] text-zinc-300 leading-normal mt-1 font-sans">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* BACKDROP FORM WINDOW */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 selection:bg-emerald-500/20 animate-[fadeIn_0.2s_ease-out]">
        <div className="w-full max-w-3xl my-auto bg-[#030712] border border-zinc-800/80 rounded-2xl shadow-[0_0_80px_-20px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col max-h-[95vh]">
          
          {/* Top Decorative Border Accent Strip */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-indigo-500 to-blue-500 shrink-0" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-[#050914] shrink-0">
            <div>
              <h2 className="text-sm font-black tracking-widest uppercase text-zinc-100 flex items-center gap-2 font-mono">
                <Briefcase className="text-emerald-500 w-4 h-4" /> Modify Vacancy Structure
              </h2>
              <p className="text-[9px] text-zinc-400 font-mono tracking-wider mt-0.5 uppercase">
                SYSTEM PORTAL INTERFACE // REGISTRY CONFIG
              </p>
            </div>
            <button 
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-950/80 border border-zinc-900 transition-colors cursor-pointer"
            >
              <X size={14} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Dynamic Content Switching Layer */}
          {isLoading ? (
            <div className="py-24 px-6 flex flex-col items-center justify-center gap-4 font-mono text-[10px] text-zinc-500 tracking-widest text-center flex-1 bg-[#030712]">
              <Loader2 size={18} className="animate-spin text-emerald-400" />
              SYNCHRONIZING SECURE REWRITE STREAM WITH HAWASSA PULSE CLOUD...
            </div>
          ) : (
            <>
              {/* Form Input View Body Container */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1 bg-gradient-to-b from-[#030712] to-[#010409] custom-scrollbar">
                <form id="modal-edit-vacancy-form" onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Title & Job Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Briefcase size={12} className="text-emerald-500" /> Vacancy Position Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., የሲስተም አድሚኒስትሬተር IV"
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl py-2.5 px-4 text-zinc-100 text-xs transition-all placeholder:text-zinc-600 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Hash size={12} className="text-emerald-500" /> Registry Serial Code (jobCode)
                      </label>
                      <input
                        type="text"
                        name="jobCode"
                        value={formData.jobCode}
                        onChange={handleChange}
                        placeholder="e.g., ሲዳ/መሶብ-1.2.18-012"
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl py-2.5 px-4 text-zinc-100 text-xs font-mono transition-all placeholder:text-zinc-600 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Department, Civil Rank, and Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Building2 size={12} className="text-emerald-500" /> Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-zinc-200 text-xs transition-all cursor-pointer outline-none"
                      >
                        <option value="Information Technology">Information Technology</option>
                        <option value="Human Resource Development Directorate">Human Resource Directorate</option>
                        <option value="Planning & Budgeting">Planning & Budgeting</option>
                        <option value="Public Relations">Public Relations</option>
                        <option value="Technical Services">Technical Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <TrendingUp size={12} className="text-emerald-500" /> Civil Service Rank
                      </label>
                      <select
                        name="rankLevel"
                        value={formData.rankLevel.startsWith("Level ") ? formData.rankLevel : `Level ${formData.rankLevel}`}
                        onChange={handleChange}
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-zinc-200 text-xs transition-all font-mono cursor-pointer outline-none"
                      >
                        <option value="Level XIV">Level XIV</option>
                        <option value="Level XIII">Level XIII</option>
                        <option value="Level XII">Level XII</option>
                        <option value="Level XI">Level XI</option>
                        <option value="Level X">Level X</option>
                        <option value="Level IX">Level IX</option>
                        <option value="Level VIII">Level VIII</option>
                        <option value="Level VII">Level VII</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <DollarSign size={12} className="text-emerald-500" /> Monthly Salary (ETB)
                      </label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g., 19464"
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-zinc-100 text-xs font-mono transition-all placeholder:text-zinc-600 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Location, Employment Type & CGPA */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MapPin size={12} className="text-emerald-500" /> Working Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-zinc-100 text-xs transition-all outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Briefcase size={12} className="text-emerald-500" /> Employment Category
                      </label>
                      <input
                        type="text"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-zinc-100 text-xs transition-all outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Award size={12} className="text-emerald-500" /> Required CGPA Threshold
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.00"
                        max="4.00"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl p-2.5 text-zinc-100 text-xs font-mono transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 4: Open Positions Allocation Counter & Filing Window Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl">
                    <div>
                      <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Users size={12} className="text-emerald-500" /> Allocated Open Positions
                      </label>
                      <input
                        type="number"
                        name="positions"
                        value={formData.positions}
                        onChange={handleChange}
                        min="1"
                        className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl p-2 text-zinc-100 text-xs font-mono transition-all outline-none"
                        required
                      />
                    </div>

                    <div>
                      <div className="text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CalendarClock size={13} className="text-indigo-400" /> Calculated Filing Window
                      </div>
                      <div className="bg-[#010409] border border-zinc-800 p-2 rounded-xl text-zinc-200 font-mono text-[11px] flex items-center justify-between h-[38px]">
                        <span className="text-zinc-500 text-[10px] font-sans font-bold">SYSTEM TERM:</span>
                        <span className={`font-black uppercase tracking-wide ${isHighRank ? "text-indigo-400" : "text-amber-400"}`}>
                          {activeWindowDays} Operational Days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Detailed Description Input */}
                  <div>
                    <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FileText size={13} className="text-emerald-500" /> Comprehensive Job Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl py-2 px-3 text-zinc-100 text-xs leading-relaxed transition-all outline-none resize-none"
                      required
                    />
                  </div>

                  {/* Row 6: Educational Background Qualification Textarea */}
                  <div>
                    <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-emerald-500" /> Educational Qualifications & Fields
                    </label>
                    <textarea
                      name="eligibleFields"
                      value={formData.eligibleFields}
                      onChange={handleChange}
                      rows="2"
                      className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl py-2 px-3 text-zinc-100 text-xs leading-relaxed transition-all outline-none resize-none"
                      required
                    />
                  </div>

                  {/* Row 7: Experience Requirements */}
                  <div>
                    <label className="block text-zinc-300 text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FileText size={13} className="text-emerald-500" /> Experience Terms & Specific Requirements (ተገላጊ ችሎታ)
                    </label>
                    <textarea
                      name="experienceRequirements"
                      value={formData.experienceRequirements}
                      onChange={handleChange}
                      rows="2"
                      className="w-full bg-[#010409] border border-zinc-800 focus:border-emerald-500 rounded-xl py-2 px-3 text-zinc-100 text-xs leading-relaxed transition-all outline-none resize-none"
                      required
                    />
                  </div>

                  {/* Switch Component Grid Layout for COC Rules */}
                  <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide">
                      Requires Active COC Qualification Certification
                    </span>
                    <button 
                      type="button" 
                      onClick={() => handleToggle("requiresCOC")}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer shrink-0 ${formData.requiresCOC ? "bg-emerald-500" : "bg-zinc-800"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm ${formData.requiresCOC ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>

                  {/* Language Selection Grid System */}
                  <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl">
                    <div className="text-[9px] uppercase font-black tracking-widest text-zinc-400 flex items-center gap-1.5 mb-2.5">
                      <Globe size={13} className="text-emerald-500/70" /> Language Fluency Requirements Matrix
                    </div>
                    <div className="flex flex-wrap gap-5 text-[11px] font-mono font-bold">
                      {[
                        { id: "sidama", label: "SIDAAMU AFOO" },
                        { id: "amharic", label: "AMHARIC REQUIRED" },
                        { id: "english", label: "ENGLISH FLUID" },
                      ].map((lang) => (
                        <label key={lang.id} className="flex items-center gap-2 cursor-pointer group select-none text-zinc-400 hover:text-zinc-200 transition-colors">
                          <input 
                            type="checkbox" 
                            name={lang.id} 
                            checked={formData[lang.id]} 
                            onChange={handleChange} 
                            className="accent-emerald-500 w-3.5 h-3.5" 
                          />
                          <span>{lang.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pin Announcement Switch Row */}
                  <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide">
                      Pin announcement to primary homepage highlights carousel grid
                    </span>
                    <button 
                      type="button" 
                      onClick={() => handleToggle("featuredOnHome")}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer shrink-0 ${formData.featuredOnHome ? "bg-emerald-500" : "bg-zinc-800"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm ${formData.featuredOnHome ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>

                </form>
              </div>

              {/* Action Toolbar Sticky Footer Panel */}
              <div className="px-6 py-4 bg-[#050914] border-t border-zinc-900 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-[10px] uppercase font-mono tracking-widest px-4 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="modal-edit-vacancy-form"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-900 text-white font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all border border-emerald-500/20 shadow-[0_4px_20px_rgba(16,185,129,0.15)] flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={12} className="animate-spin text-zinc-400" /> Rewriting...
                    </>
                  ) : (
                    "Apply Changes"
                  )}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default EditJobModal;