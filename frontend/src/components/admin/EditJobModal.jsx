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
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 selection:bg-oled-green/20 animate-[fadeIn_0.2s_ease-out]">
        <div className="w-full max-w-3xl my-auto bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[95vh]">
          
          {/* Top Decorative Border Accent Strip */}
          <div className="h-1.5 w-full bg-oled-green shrink-0" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
            <div>
              <h2 className="text-base font-black tracking-tight uppercase text-gray-900 flex items-center gap-2 font-mono">
                <Briefcase className="text-oled-green w-5 h-5" /> Modify Vacancy Structure
              </h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-1 font-bold uppercase">
                SYSTEM PORTAL INTERFACE // REGISTRY CONFIG
              </p>
            </div>
            <button 
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 p-2 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors shadow-sm cursor-pointer"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Dynamic Content Switching Layer */}
          {isLoading ? (
            <div className="py-24 px-6 flex flex-col items-center justify-center gap-4 font-mono text-[11px] font-bold text-gray-500 tracking-widest text-center flex-1 bg-white">
              <Loader2 size={24} className="animate-spin text-oled-green" />
              SYNCHRONIZING SECURE REWRITE STREAM WITH HAWASSA PULSE CLOUD...
            </div>
          ) : (
            <>
              {/* Form Input View Body Container */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1 bg-white custom-scrollbar">
                <form id="modal-edit-vacancy-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Title & Job Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-oled-green" /> Vacancy Position Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., የሲስተም አድሚኒስትሬተር IV"
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-3 px-4 text-gray-900 text-sm font-bold transition-all placeholder:text-gray-400 outline-none shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Hash size={14} className="text-oled-green" /> Registry Serial Code (jobCode)
                      </label>
                      <input
                        type="text"
                        name="jobCode"
                        value={formData.jobCode}
                        onChange={handleChange}
                        placeholder="e.g., ሲዳ/መሶብ-1.2.18-012"
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-3 px-4 text-gray-900 text-sm font-bold font-mono transition-all placeholder:text-gray-400 outline-none shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Department, Civil Rank, and Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Building2 size={14} className="text-oled-green" /> Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-3 text-gray-900 text-sm font-bold transition-all cursor-pointer outline-none shadow-sm"
                      >
                        <option value="Information Technology">Information Technology</option>
                        <option value="Human Resource Development Directorate">Human Resource Directorate</option>
                        <option value="Planning & Budgeting">Planning & Budgeting</option>
                        <option value="Public Relations">Public Relations</option>
                        <option value="Technical Services">Technical Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-oled-green" /> Civil Service Rank
                      </label>
                      <select
                        name="rankLevel"
                        value={formData.rankLevel.startsWith("Level ") ? formData.rankLevel : `Level ${formData.rankLevel}`}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-3 text-gray-900 text-sm font-bold transition-all font-mono cursor-pointer outline-none shadow-sm"
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
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <DollarSign size={14} className="text-oled-green" /> Monthly Salary (ETB)
                      </label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g., 19464"
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-3 text-gray-900 text-sm font-bold font-mono transition-all placeholder:text-gray-400 outline-none shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Location, Employment Type & CGPA */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <MapPin size={14} className="text-oled-green" /> Working Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-3 text-gray-900 text-sm font-bold transition-all outline-none shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-oled-green" /> Employment Category
                      </label>
                      <input
                        type="text"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-3 text-gray-900 text-sm font-bold transition-all outline-none shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Award size={14} className="text-oled-green" /> Required CGPA Threshold
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.00"
                        max="4.00"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-3 text-gray-900 text-sm font-bold font-mono transition-all outline-none shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 4: Open Positions Allocation Counter & Filing Window Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-gray-50 border border-gray-200 rounded-xl">
                    <div>
                      <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Users size={14} className="text-oled-green" /> Allocated Open Positions
                      </label>
                      <input
                        type="number"
                        name="positions"
                        value={formData.positions}
                        onChange={handleChange}
                        min="1"
                        className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-3 text-gray-900 text-sm font-bold font-mono transition-all outline-none shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <div className="text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <CalendarClock size={15} className="text-oled-green" /> Calculated Filing Window
                      </div>
                      <div className="bg-white border border-gray-300 p-3 rounded-xl text-gray-900 font-mono text-xs font-bold flex items-center justify-between h-[46px] shadow-sm">
                        <span className="text-gray-500 text-[11px] font-sans font-extrabold uppercase tracking-wider">SYSTEM TERM:</span>
                        <span className={`font-black uppercase tracking-wide ${isHighRank ? "text-oled-dark" : "text-gray-600"}`}>
                          {activeWindowDays} Operational Days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Detailed Description Input */}
                  <div>
                    <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <FileText size={15} className="text-oled-green" /> Comprehensive Job Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-3 px-4 text-gray-900 text-sm font-bold leading-relaxed transition-all outline-none resize-none shadow-sm"
                      required
                    />
                  </div>

                  {/* Row 6: Educational Background Qualification Textarea */}
                  <div>
                    <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <GraduationCap size={16} className="text-oled-green" /> Educational Qualifications & Fields
                    </label>
                    <textarea
                      name="eligibleFields"
                      value={formData.eligibleFields}
                      onChange={handleChange}
                      rows="2"
                      className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-3 px-4 text-gray-900 text-sm font-bold leading-relaxed transition-all outline-none resize-none shadow-sm"
                      required
                    />
                  </div>

                  {/* Row 7: Experience Requirements */}
                  <div>
                    <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <FileText size={15} className="text-oled-green" /> Experience Terms & Specific Requirements (ተገላጊ ችሎታ)
                    </label>
                    <textarea
                      name="experienceRequirements"
                      value={formData.experienceRequirements}
                      onChange={handleChange}
                      rows="2"
                      className="w-full bg-gray-50 border border-gray-300 focus:bg-white focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-3 px-4 text-gray-900 text-sm font-bold leading-relaxed transition-all outline-none resize-none shadow-sm"
                      required
                    />
                  </div>

                  {/* Switch Component Grid Layout for COC Rules */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
                    <span className="text-[11px] font-extrabold text-gray-700 uppercase tracking-widest">
                      Requires Active COC Qualification Certification
                    </span>
                    <button 
                      type="button" 
                      onClick={() => handleToggle("requiresCOC")}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer shrink-0 ${formData.requiresCOC ? "bg-oled-green" : "bg-gray-300"}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow-sm ${formData.requiresCOC ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  {/* Language Selection Grid System */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
                    <div className="text-[11px] uppercase font-extrabold tracking-widest text-gray-500 flex items-center gap-2 mb-3">
                      <Globe size={15} className="text-oled-green" /> Language Fluency Requirements Matrix
                    </div>
                    <div className="flex flex-wrap gap-6 text-xs font-mono font-bold">
                      {[
                        { id: "sidama", label: "SIDAAMU AFOO" },
                        { id: "amharic", label: "AMHARIC REQUIRED" },
                        { id: "english", label: "ENGLISH FLUID" },
                      ].map((lang) => (
                        <label key={lang.id} className="flex items-center gap-2.5 cursor-pointer group select-none text-gray-700 hover:text-oled-dark transition-colors">
                          <input 
                            type="checkbox" 
                            name={lang.id} 
                            checked={formData[lang.id]} 
                            onChange={handleChange} 
                            className="accent-oled-green w-4 h-4 rounded border-gray-300" 
                          />
                          <span>{lang.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pin Announcement Switch Row */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3 shadow-sm">
                    <span className="text-[11px] font-extrabold text-gray-700 uppercase tracking-widest">
                      Pin announcement to primary homepage highlights carousel grid
                    </span>
                    <button 
                      type="button" 
                      onClick={() => handleToggle("featuredOnHome")}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer shrink-0 ${formData.featuredOnHome ? "bg-oled-green" : "bg-gray-300"}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow-sm ${formData.featuredOnHome ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                </form>
              </div>

              {/* Action Toolbar Sticky Footer Panel */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 font-extrabold text-xs uppercase font-mono tracking-widest px-5 py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="modal-edit-vacancy-form"
                  disabled={isSubmitting}
                  className="bg-oled-green hover:bg-oled-dark disabled:bg-gray-300 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white/70" /> Rewriting...
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