import React, { useState } from "react";
import axios from "axios";
import { 
  Briefcase, 
  ArrowLeft, 
  Hash, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  GraduationCap, 
  FileText, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ShieldAlert,
  CalendarClock
} from "lucide-react";

function CreateJob() {
  // 1. Unified state structure matching strict backend schema requirements with zero data loss
  const [formData, setFormData] = useState({
    title: "",
    jobCode: "",
    department: "Information Technology",
    rankLevel: "Level XIII",
    salary: "",
    positions: "1",
    eligibleFields: "", // Holds extensive multi-major text blocks from mesob.docx
    experienceRequirements: "",
    requiresCOC: false,
    sidama: true,
    amharic: true,
    english: false,
    featuredOnHome: false,
  });

  // UI Status tracking variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  // 🕒 Institutional lookahead preview calculation helper
  const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(formData.rankLevel);
  const activeWindowDays = isHighRank ? 10 : 5;

  // Input modifier interceptor
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Direct return to admin desk configuration
  const handleBackToDashboard = () => {
    window.location.href = "/admin-dashboard/manage-posts";
  };

  // 2. Form submission payload compilation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    // Client-side guard rails for high-priority metadata rows
    if (!formData.title.trim() || !formData.jobCode.trim() || !formData.eligibleFields.trim()) {
      setStatusMessage({
        text: "Validation Fault: Position Title, Unique Serial Code, and Educational Fields cannot be empty.",
        type: "error",
      });
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
        eligibleFields: formData.eligibleFields.trim(),
        experienceRequirements: formData.experienceRequirements.trim(),
        requiresCOC: formData.requiresCOC,
        languages: {
          sidama: formData.sidama,
          amharic: formData.amharic,
          english: formData.english,
        },
        featuredOnHome: formData.featuredOnHome,
      };

      const response = await axios.post("http://localhost:5000/api/jobs", payload);

      if (response.data.success) {
        setStatusMessage({
          text: `Transaction Complete: ${response.data.message}`,
          type: "success",
        });

        // Reset variables back to default baselines cleanly
        setFormData({
          title: "",
          jobCode: "",
          department: "Information Technology",
          rankLevel: "Level XIII",
          salary: "",
          positions: "1",
          eligibleFields: "",
          experienceRequirements: "",
          requiresCOC: false,
          sidama: true,
          amharic: true,
          english: false,
          featuredOnHome: false,
        });
      }
    } catch (err) {
      console.error("Backend transmission error:", err);
      setStatusMessage({
        text: err.response?.data?.message || "Network Error: Unable to sync with the backend service.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010409] text-zinc-100 font-sans p-4 sm:p-6 md:p-12 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#030712] border border-zinc-800/60 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Dynamic top visual indicator edge line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />

        <div className="p-6 sm:p-10">
          
          {/* Header Action Row */}
          <header className="mb-8 border-b border-zinc-900 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase text-zinc-100 flex items-center gap-3">
                <Briefcase className="text-emerald-500 w-7 h-7" /> Deploy Civil Vacancy
              </h1>
              <p className="text-xs text-zinc-500 font-mono mt-1">
                MANAGEMENT PLATFORM // SIDAMA MESOB INTEGRATED PORTAL REGISTRY
              </p>
            </div>
            
            <button
              type="button"
              onClick={handleBackToDashboard}
              className="group text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-2 transition-all border border-zinc-800/80 hover:border-zinc-700 px-4 py-2.5 rounded-xl bg-zinc-950/60 shadow-inner"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> 
              [RETURN_TO_ADMIN_PORTAL]
            </button>
          </header>

          {/* Transaction Status Logs Notification Banners */}
          {statusMessage.text && (
            <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 text-xs font-mono backdrop-blur-md ${
              statusMessage.type === "success" 
                ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-400" 
                : "bg-rose-950/30 border-rose-500/20 text-rose-400"
            }`}>
              {statusMessage.type === "success" ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
              <div>
                <span className="font-bold block uppercase mb-0.5">
                  {statusMessage.type === "success" ? "[NODE SYNC SUCCESSFUL]" : "[REGISTRY ACCESS EXCEPTION]"}
                </span>
                {statusMessage.text}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Core Identifiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase size={12} className="text-zinc-600" /> Vacancy Position Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., የሲስተም አድሚኒስትሬተር IV"
                  className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl py-3 px-4 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Hash size={12} className="text-zinc-600" /> Registry Serial Code (jobCode)
                </label>
                <input
                  type="text"
                  name="jobCode"
                  value={formData.jobCode}
                  onChange={handleChange}
                  placeholder="e.g., ሲዳ/መሶብ-1.2.18-012"
                  className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl py-3 px-4 text-zinc-200 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            {/* Row 2: Structural Placement Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 size={12} className="text-zinc-600" /> Director Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl p-3 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Human Resource Development Directorate">Human Resource Directorate</option>
                  <option value="Planning & Budgeting">Planning & Budgeting</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Technical Services">Technical Services</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-zinc-600" /> Civil Service Rank Level
                </label>
                <select
                  name="rankLevel"
                  value={formData.rankLevel}
                  onChange={handleChange}
                  className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl p-3 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-mono cursor-pointer"
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
                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <DollarSign size={12} className="text-zinc-600" /> Monthly Base Salary (ETB)
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g., 19464"
                  className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl p-3 text-zinc-200 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            {/* Row 3: Metrics Block with Integrated Expiration Deadline Monitor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
              <div>
                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users size={12} className="text-zinc-600" /> Positions Open / Allocation Count
                </label>
                <input
                  type="number"
                  name="positions"
                  value={formData.positions}
                  onChange={handleChange}
                  min="1"
                  className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl p-3 text-zinc-200 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
                  required
                />
              </div>

              <div>
                <div className="text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CalendarClock size={13} className="text-amber-500" /> Computed Institutional Target Window
                </div>
                <div className="bg-[#010409] border border-zinc-800/70 p-3 rounded-xl text-zinc-300 font-mono text-xs flex items-center justify-between h-[46px]">
                  <span className="text-zinc-500">BACKEND AUTO-TIMELINE:</span>
                  <span className={`font-black uppercase ${isHighRank ? "text-teal-400" : "text-amber-500"}`}>
                    {activeWindowDays} Operational Days
                  </span>
                </div>
              </div>
            </div>

            {/* Row 4: Multi-Major Educational Alignment Block */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-zinc-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-zinc-500" /> Eligible Educational Qualification Backgrounds
                </label>
                <span className="text-[10px] font-mono text-zinc-600 uppercase">Supports multi-line field logs</span>
              </div>
              <textarea
                name="eligibleFields"
                value={formData.eligibleFields}
                onChange={handleChange}
                rows="4"
                placeholder="e.g., ኮምፒዉተር ሳይንስ፤ ሶፍትወር ኢንጂነሪንግ፤ ኢንፎርሜሽን ቴክኖሎጂ፤ ዳታ ቤዝ ማኔጅመንት..."
                className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl py-3 px-4 text-zinc-200 text-sm leading-relaxed focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-800"
                required
              />
            </div>

            {/* Row 5: Exact Experience Text Block */}
            <div>
              <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText size={13} className="text-zinc-500" /> Experience Terms & Specific Requirements
              </label>
              <textarea
                name="experienceRequirements"
                value={formData.experienceRequirements}
                onChange={handleChange}
                rows="3"
                placeholder="e.g., 6 አመት የስራ ልምድ በዳታ ቤዝ አድሚኒስትሬተርነት የሰራ/ች..."
                className="w-full bg-[#010409] border border-zinc-800/70 rounded-xl py-3 px-4 text-zinc-200 text-sm leading-relaxed focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-800"
                required
              />
            </div>

            {/* Operational Gateway Certification Checkboxes Matrix */}
            <div className="p-4 bg-zinc-950/40 border border-zinc-900/80 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="requiresCOC"
                  id="requiresCOC"
                  checked={formData.requiresCOC}
                  onChange={handleChange}
                  className="accent-emerald-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="requiresCOC" className="text-xs font-bold text-zinc-400 cursor-pointer select-none uppercase tracking-wide flex items-center gap-1">
                  Requires Active COC Qualification Certification
                </label>
              </div>
              
              <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1 bg-zinc-900/60 px-2.5 py-1.5 rounded-lg border border-zinc-800/40">
                <ShieldAlert size={12} className="text-amber-500" /> Level VII and below typically bypasses COC rules.
              </div>
            </div>

            {/* Conversational Competency Selection Matrices */}
            <div className="p-4 bg-zinc-950/40 border border-zinc-900/80 rounded-xl">
              <div className="text-[10px] uppercase font-black tracking-widest text-zinc-500 flex items-center gap-1.5 mb-3">
                <Globe size={14} className="text-emerald-500/70" /> Language Fluency Requirements Matrix
              </div>
              <div className="flex flex-wrap gap-6 text-xs font-mono">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 select-none">
                  <input
                    type="checkbox"
                    name="sidama"
                    checked={formData.sidama}
                    onChange={handleChange}
                    className="accent-emerald-500 w-3.5 h-3.5"
                  />
                  SIDAMINGA (DEFAULT)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 select-none">
                  <input
                    type="checkbox"
                    name="amharic"
                    checked={formData.amharic}
                    onChange={handleChange}
                    className="accent-emerald-500 w-3.5 h-3.5"
                  />
                  AMHARIC REQUIRED
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 select-none">
                  <input
                    type="checkbox"
                    name="english"
                    checked={formData.english}
                    onChange={handleChange}
                    className="accent-emerald-500 w-3.5 h-3.5"
                  />
                  ENGLISH FLUID
                </label>
              </div>
            </div>

            {/* Dynamic UI Flag: Homepage Pins */}
            <div className="flex items-center gap-3 py-2 border-t border-b border-zinc-900">
              <input
                type="checkbox"
                name="featuredOnHome"
                id="featuredOnHome"
                checked={formData.featuredOnHome}
                onChange={handleChange}
                className="accent-emerald-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="featuredOnHome" className="text-xs font-bold text-zinc-400 cursor-pointer select-none uppercase tracking-wide">
                Pin announcement to primary homepage highlights carousel grid
              </label>
            </div>

            {/* Form Execution Node Actions Row */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-900 text-white font-black text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed border border-emerald-500/20 shadow-[0_4px_25px_rgba(16,185,129,0.15)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-zinc-400" /> Committing Row...
                  </>
                ) : (
                  "Publish Vacancy Posting"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;