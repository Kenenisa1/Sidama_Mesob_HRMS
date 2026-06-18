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
  Award,
} from "lucide-react";

function CreateJobModal({ onClose, onCreationSuccess }) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Prevent background scrolling
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(
    formData.rankLevel,
  );
  const activeWindowDays = isHighRank ? 10 : 5;

  // Toast helper
  const spawnToast = (title, message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (
      !formData.title.trim() ||
      !formData.jobCode.trim() ||
      !formData.eligibleFields.trim() ||
      !formData.description.trim()
    ) {
      spawnToast(
        "Missing Information",
        "Please fill in all required fields (Title, Job Code, Fields, Description).",
        "error",
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
        eligibleFields: formData.eligibleFields.trim(),
        experienceRequirements: formData.experienceRequirements.trim(),
        description: formData.description.trim(),
        requirements: formData.experienceRequirements.trim(),
        cgpa: !isNaN(parseFloat(formData.cgpa))
          ? parseFloat(parseFloat(formData.cgpa).toFixed(2))
          : 0,
        location: formData.location.trim(),
        employmentType: formData.employmentType.trim(),
        languages: {
          sidama: formData.sidama,
          amharic: formData.amharic,
          english: formData.english,
        },
        featuredOnHome: formData.featuredOnHome,
      };

      const response = await axios.post(
        "http://localhost:5000/api/jobs",
        payload,
      );

      if (response.data.success) {
        spawnToast(
          "Job Created",
          `Job vacancy has been successfully published. Job Code: ${formData.jobCode}`,
          "success",
        );

        // Delay modal close to show success message
        setTimeout(() => {
          if (onCreationSuccess) onCreationSuccess();
        }, 1200);
      }
    } catch (err) {
      console.error("Backend transmission error:", err);
      const backendErrorMessage =
        err.response?.data?.message ||
        "Failed to create job. Please try again.";
      spawnToast("Error Creating Job", backendErrorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Overlay */}
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
              <CheckCircle2
                size={16}
                className="text-emerald-400 shrink-0 mt-0.5"
              />
            ) : (
              <AlertTriangle
                size={16}
                className="text-rose-400 shrink-0 mt-0.5"
              />
            )}
            <div className="flex-1 min-w-0">
              <span
                className={`text-[11px] font-black uppercase tracking-widest block ${
                  toast.type === "success"
                    ? "text-emerald-300"
                    : "text-rose-300"
                }`}
              >
                [{toast.title}]
              </span>
              <p className="text-[10px] text-zinc-300 leading-normal mt-1 font-sans">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="text-zinc-500 hover:text-zinc-300 p-0.5 transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Main Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 selection:bg-oled-green/20 animate-[fadeIn_0.2s_ease-out]">
        <div className="w-full max-w-3xl my-auto bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
          {/* Decorative border */}
          <div className="h-1 w-full bg-gradient-to-r from-oled-green via-green-400 to-oled-light shrink-0" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-gray-900 flex items-center gap-2">
                <Briefcase className="text-oled-green w-4 h-4" /> Create New
                Job Vacancy
              </h2>
              <p className="text-xs text-gray-500 font-medium tracking-wider mt-0.5 uppercase">
                SidaMOV (Sidama Mesob Online Vacancy)
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 p-2 rounded-xl bg-white border border-gray-200 transition-colors cursor-pointer shadow-sm"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Form content */}
          <div className="p-6 md:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1 bg-white custom-scrollbar">
            <form
              id="modal-vacancy-form"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Row 1: Position Title & Job Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase size={14} className="text-oled-green" /> Job
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., የሲስተም አድሚኒስትሬተር IV"
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-2.5 px-4 text-gray-900 text-sm transition-all placeholder:text-gray-400 outline-none shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Hash size={14} className="text-oled-green" /> Job Code
                  </label>
                  <input
                    type="text"
                    name="jobCode"
                    value={formData.jobCode}
                    onChange={handleChange}
                    placeholder="e.g., ሲዳ/መሶብ-1.2.18-012"
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-2.5 px-4 text-gray-900 text-sm font-mono transition-all placeholder:text-gray-400 outline-none shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Department, Civil Rank, and Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 size={14} className="text-oled-green" />{" "}
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-2.5 text-gray-900 text-sm transition-all cursor-pointer outline-none shadow-sm"
                  >
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Human Resource Development Directorate">
                      Human Resource Directorate
                    </option>
                    <option value="Planning & Budgeting">
                      Planning & Budgeting
                    </option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="Technical Services">
                      Technical Services
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-oled-green" /> Job
                    Level / Rank
                  </label>
                  <select
                    name="rankLevel"
                    value={formData.rankLevel}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-2.5 text-gray-900 text-sm transition-all font-mono cursor-pointer outline-none shadow-sm"
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
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <DollarSign size={14} className="text-oled-green" />{" "}
                    Monthly Salary (ETB)
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., 19464"
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-2.5 text-gray-900 text-sm font-mono transition-all placeholder:text-gray-400 outline-none shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Location, Employment Type & CGPA */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin size={14} className="text-oled-green" /> Work
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-2.5 text-gray-900 text-sm transition-all outline-none shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase size={14} className="text-oled-green" />{" "}
                    Employment Category
                  </label>
                  <input
                    type="text"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-2.5 text-gray-900 text-sm transition-all outline-none shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Award size={14} className="text-oled-green" /> Minimum
                    CGPA Required
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.00"
                    max="4.00"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-2.5 text-gray-900 text-sm font-mono transition-all outline-none shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Positions Allocated & Window Timeline Counter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={14} className="text-oled-green" /> Number of
                    Positions
                  </label>
                  <input
                    type="number"
                    name="positions"
                    value={formData.positions}
                    onChange={handleChange}
                    min="1"
                    className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl p-2 text-gray-900 text-sm font-mono transition-all outline-none shadow-sm"
                    required
                  />
                </div>

                <div>
                  <div className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CalendarClock size={15} className="text-blue-500" />{" "}
                    Application Window
                  </div>
                  <div className="bg-white border border-gray-300 p-2 rounded-xl text-gray-900 font-mono text-sm flex items-center justify-between h-[38px] shadow-sm">
                    <span className="text-gray-500 text-xs font-sans font-bold">
                      DURATION:
                    </span>
                    <span
                      className={`font-black uppercase tracking-wide ${isHighRank ? "text-blue-600" : "text-amber-600"}`}
                    >
                      {activeWindowDays} Days
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 5: Detailed Job Description */}
              <div>
                <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText size={14} className="text-oled-green" /> Job
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Provide a detailed description of the job responsibilities..."
                  className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-2 px-3 text-gray-900 text-sm leading-relaxed transition-all placeholder:text-gray-400 outline-none resize-none shadow-sm"
                  required
                />
              </div>

              {/* Row 6: Educational Backgrounds */}
              <div>
                <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-oled-green" />{" "}
                  Required Education & Fields
                </label>
                <textarea
                  name="eligibleFields"
                  value={formData.eligibleFields}
                  onChange={handleChange}
                  rows="2"
                  placeholder="e.g., ኮምፒዉተር ሳይንስ፤ ሶፍትወር ኢንጂነሪንግ፤ ኢንፎርሜሽን ቴክኖሎጂ..."
                  className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-2 px-3 text-gray-900 text-sm leading-relaxed transition-all placeholder:text-gray-400 outline-none resize-none shadow-sm"
                  required
                />
              </div>

              {/* Row 7: Experience */}
              <div>
                <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText size={14} className="text-oled-green" /> Experience
                  Terms & Specific Requirements (ተገላጊ ችሎታ)
                </label>
                <textarea
                  name="experienceRequirements"
                  value={formData.experienceRequirements}
                  onChange={handleChange}
                  rows="2"
                  placeholder="e.g., 6 አመት የስራ ልምድ በዳታ ቤዝ..."
                  className="w-full bg-white border border-gray-300 focus:border-oled-green focus:ring-1 focus:ring-oled-green rounded-xl py-2 px-3 text-gray-900 text-sm leading-relaxed transition-all placeholder:text-gray-400 outline-none resize-none shadow-sm"
                  required
                />
              </div>

              {/* COC Certificate Toggle */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="requiresCOC"
                    id="modalRequiresCOC"
                    checked={formData.requiresCOC}
                    onChange={handleChange}
                    className="accent-oled-green w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="modalRequiresCOC"
                    className="text-xs font-bold text-gray-700 cursor-pointer select-none uppercase tracking-wide"
                  >
                    Requires COC Certification
                  </label>
                </div>
                <div className="text-xs text-gray-500 font-mono flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                  <ShieldAlert size={14} className="text-blue-500" /> Level
                  VII jobs do not require COC.
                </div>
              </div>

              {/* Language Selection Matrix */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="text-xs uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1.5 mb-2.5">
                  <Globe size={15} className="text-oled-green/70" /> Required
                  Languages
                </div>
                <div className="flex flex-wrap gap-5 text-sm font-mono">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 select-none">
                    <input
                      type="checkbox"
                      name="sidama"
                      checked={formData.sidama}
                      onChange={handleChange}
                      className="accent-oled-green w-4 h-4"
                    />
                    SIDAMU AFOO
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 select-none">
                    <input
                      type="checkbox"
                      name="amharic"
                      checked={formData.amharic}
                      onChange={handleChange}
                      className="accent-oled-green w-4 h-4"
                    />
                    AMHARIC
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 select-none">
                    <input
                      type="checkbox"
                      name="english"
                      checked={formData.english}
                      onChange={handleChange}
                      className="accent-oled-green w-4 h-4"
                    />
                    ENGLISH
                  </label>
                </div>
              </div>

              {/* Homepage feature option */}
              <div className="flex items-center gap-2.5 py-1.5 border-t border-b border-gray-200">
                <input
                  type="checkbox"
                  name="featuredOnHome"
                  id="modalFeaturedOnHome"
                  checked={formData.featuredOnHome}
                  onChange={handleChange}
                  className="accent-oled-green w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="modalFeaturedOnHome"
                  className="text-xs font-bold text-gray-700 cursor-pointer select-none uppercase tracking-wide"
                >
                  Show this job on the homepage
                </label>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-600 hover:text-gray-900 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="modal-vacancy-form"
              disabled={isSubmitting}
              className="bg-oled-green hover:bg-oled-dark disabled:bg-gray-300 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white/70" />{" "}
                  Publishing...
                </>
              ) : (
                "Publish Vacancy Posting"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateJobModal;
