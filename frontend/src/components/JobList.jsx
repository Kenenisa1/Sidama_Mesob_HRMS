import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  Calendar, 
  Search, 
  Filter,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  XCircle,
  CheckCircle2,
  Briefcase,
  Layers,
  FileText
} from "lucide-react";

function JobList({ mode = "explore" }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const viewModeParam = mode === "home" ? "homepage" : "public";
        
        const response = await axios.get("http://localhost:5000/api/jobs", {
          params: { viewMode: viewModeParam }
        });
        setJobs(Array.isArray(response.data) ? response.data : response.data.jobs || []);
      } catch (error) {
        console.error("Error retrieving vacancy stream:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [mode]);

  const filteredJobs = jobs.filter((job) => {
    if (mode === "home") return true; 

    const titlePool = job.title?.toLowerCase() || "";
    const titleAmhPool = job.titleAmharic?.toLowerCase() || "";
    const fieldsPool = job.eligibleFields?.toLowerCase() || "";
    const codePool = job.jobCode?.toLowerCase() || "";
    const cleanSearch = searchTerm.toLowerCase();

    const matchesSearch = 
      titlePool.includes(cleanSearch) ||
      titleAmhPool.includes(cleanSearch) ||
      fieldsPool.includes(cleanSearch) ||
      codePool.includes(cleanSearch);
      
    const matchesDepartment = 
      selectedDepartment === "All" || job.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "በአካል ቀርበው ይጠይቁ (Urgent)";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getWindowDaysDisplay = (rankStr) => {
    if (!rankStr) return "በ 5 የሥራ ቀናት ውስጥ";
    
    const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(rankStr);
    if (isHighRank) {
      return "በ 10 የሥራ ቀናት ውስጥ";
    }
    
    const digitMatch = rankStr.match(/\d+/);
    if (digitMatch) {
      return Number(digitMatch[0]) <= 7 ? "በ 5 የሥራ ቀናት ውስጥ" : "በ 10 የሥራ ቀናት ውስጥ";
    }

    return "በ 5 የሥራ ቀናት ውስጥ";
  };

  const renderFieldTags = (fieldsString) => {
    if (!fieldsString) return <span className="text-xs font-mono text-zinc-500 italic">No specific field constraints specified.</span>;
    
    const tags = fieldsString
      .split(/[፤;,\n]+/)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-[11px] font-mono font-bold bg-zinc-950 text-zinc-300 border border-zinc-800/80 px-2.5 py-1 rounded-md tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`text-zinc-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-400 ${mode === "explore" ? "min-h-screen p-3 sm:p-6 md:p-12 bg-[#010409]" : "py-10"}`}
    id="jobs"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        
        {mode === "explore" ? (
          <>
            <header className="border-b-2 border-zinc-900 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-zinc-500 flex items-center gap-3">
                  <Building2 className="text-emerald-500 w-8 h-8 sm:w-9 sm:h-9 shrink-0" /> 
                  <span className="text-white">Sidama Mesob Vacancies</span>
                </h1>
                <p className="text-xs sm:text-sm text-emerald-500/90 font-mono tracking-wider mt-2 uppercase font-bold">
                  የሲዳማ መሶብ የሰራተኞች ቅጥር ዲጂታል መድረክ // HAWASSA, ETHIOPIA
                </p>
              </div>
              
              <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl max-w-sm text-[11px] font-mono text-zinc-400 leading-relaxed">
                💡 <strong className="text-zinc-200">የምዝገባ ቦታ፦</strong> ወልደአማኑኤል ስታዲየም አጠገብ፣ በአሮጌው ገበያ ወደ ውስጥ በሚወስደው መንገድ ላይ፣ በሲዳማ መሶብ የሰው ኃይል ልማት ዳይሬክቶሬት 4ኛ ፎቅ።
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#000000] p-5 rounded-2xl border-2 border-zinc-800 shadow-xl">
              <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="የስራ መደብ፣ መታወቂያ ቁጥር ወይም የተማሩበትን የትምህርት መስክ እዚህ ይፈልጉ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#090d16] border-2 border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-zinc-100 text-base font-medium focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-600 shadow-inner"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full bg-[#090d16] border-2 border-zinc-800 rounded-xl py-3.5 pl-12 pr-10 text-zinc-200 text-base font-bold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer appearance-none"
                >
                  <option value="All">ሁሉንም የስራ ክፍሎች (All Departments)</option>
                  <option value="Information Technology">Information Technology (አይቲ)</option>
                  <option value="Human Resource Development Directorate">Human Resource (የሰው ኃይል)</option>
                  <option value="Planning & Budgeting">Planning & Budgeting (ዕቅድና በጀት)</option>
                  <option value="Public Relations">Public Relations (ህዝብ ግንኙነት)</option>
                  <option value="Technical Services">Technical Services (ቴክኒካል አገልግሎት)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                  ክፍት የስራ መደቦች <span className="text-emerald-500 text-sm font-mono normal-case tracking-normal">/ Newest Openings</span>
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-1">LATEST ANNOUNCEMENTS EXCLUDING EXPIRED REGISTRIES</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 space-y-4">
            <div className="w-9 h-9 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">የስራ ማስታወቂያዎች በመጫን ላይ ናቸው...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-24 bg-[#000000] border-2 border-dashed border-zinc-800 rounded-2xl">
            <p className="text-base text-zinc-400 font-mono font-bold uppercase tracking-wider">ያስገቡትን መስፈርት የሚያሟላ ንቁ የስራ መደብ አልተገኘም።</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => {
              const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false;

              return (
                <div 
                  key={job._id}
                  className={`border-2 rounded-2xl p-6 sm:p-8 transition-all duration-200 group flex flex-col justify-between gap-6 relative overflow-hidden shadow-2xl ${
                    isExpired 
                      ? "border-rose-950 bg-[#020103] hover:border-rose-900/80" 
                      : "bg-[#000000] border-zinc-800 hover:border-zinc-700/90"
                  }`}
                >
                  {/* Decorative Accent Strip */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isExpired 
                      ? "bg-gradient-to-r from-rose-800 via-rose-600 to-amber-700" 
                      : "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400"
                  }`} />

                  <div className="space-y-5">
                    {/* Header Line Info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900/80 pb-4">
                      <div className="font-mono text-xs text-emerald-400 uppercase tracking-wider flex flex-wrap items-center gap-2">
                        <span className={`font-black px-3 py-1 rounded-md border text-xs sm:text-sm ${
                          isExpired 
                            ? "bg-rose-950/40 text-rose-400 border-rose-900" 
                            : "bg-emerald-950/60 text-emerald-400 border-emerald-800"
                        }`}>
                          መለያ ቁጥር፦ {job.jobCode || "PENDING"}
                        </span>
                        <span className="text-zinc-800 hidden sm:inline">•</span>
                        <span className="text-zinc-300 font-bold text-xs sm:text-sm bg-zinc-900/60 border border-zinc-800 px-2.5 py-1 rounded-md">{job.department}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Employment Type Tag (e.g. Permanent vs Contract) */}
                        {job.employmentType && (
                          <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-1 rounded-md uppercase font-bold">
                            {job.employmentType}
                          </span>
                        )}
                        {isExpired ? (
                          <span className="text-xs font-mono bg-rose-500/10 text-rose-400 px-3 py-1 rounded-md border border-rose-500/20 uppercase tracking-widest font-black animate-pulse flex items-center gap-1.5">
                            <XCircle size={12} /> ጊዜው አልፏል / Closed
                          </span>
                        ) : job.featuredOnHome ? (
                          <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-3 py-1 rounded-md border border-amber-500/20 uppercase tracking-widest font-black flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-amber-500" /> አስቸኳይ / High Priority
                          </span>
                        ) : (
                          <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20 uppercase tracking-widest font-black flex items-center gap-1.5">
                            <CheckCircle2 size={12} /> ክፍት / Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Job Titles Block (Dual English & Amharic Support) */}
                    <div className="space-y-1.5">
                      <h2 className={`text-2xl sm:text-3xl font-black tracking-tight transition-colors leading-tight uppercase ${
                        isExpired 
                          ? "text-zinc-500 line-through decoration-zinc-800" 
                          : "text-zinc-100 group-hover:text-emerald-400"
                      }`}>
                        {job.title}
                      </h2>
                      {job.titleAmharic && (
                        <p className={`text-lg sm:text-xl font-bold tracking-normal ${isExpired ? "text-zinc-600" : "text-zinc-400"}`}>
                          {job.titleAmharic}
                        </p>
                      )}
                    </div>

                    {/* Metadata Specification Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#05070c] p-4 rounded-xl border border-zinc-900/80 shadow-inner">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase block font-black">የመደብ ደረጃ / Rank Level</span>
                        <div className="flex items-center gap-2 text-zinc-200">
                          <TrendingUp size={16} className="text-zinc-600 shrink-0" />
                          <span className="text-base font-black font-mono">{job.rankLevel || "Not Assigned"}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase block font-black">ወርሃዊ ደመወዝ / Monthly Salary</span>
                        <div className={`flex items-center gap-2 ${isExpired ? "text-zinc-500" : "text-emerald-400"}`}>
                          <DollarSign size={16} className="text-zinc-600 shrink-0" />
                          <span className="text-lg font-black font-mono tracking-wide">
                            {job.salary ? `${job.salary.toLocaleString()} ETB` : "በስራ መደቡ ሚዛን መሰረት"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase block font-black">የክፍት ቦታ ብዛት / Open Slots</span>
                        <div className="flex items-center gap-2 text-zinc-200">
                          <Clock size={16} className="text-zinc-600 shrink-0" />
                          <span className="text-base font-black font-mono">
                            {job.positions || 1} ክፍት ቦታ ({Number(job.positions) === 1 ? "ሰራተኛ" : "ሰራተኞች"})
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase block font-black">የስራ ቦታ / Working Location</span>
                        <div className="flex items-center gap-2 text-zinc-300">
                          <MapPin size={16} className="text-zinc-600 shrink-0" />
                          <span className="text-sm font-bold">{job.location || "ሀዋሳ / Hawassa"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Target Educational Thresholds / Fields Segment */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
                      {job.educationLevel && (
                        <div className="md:col-span-2 space-y-2">
                          <h3 className="text-xs uppercase font-black tracking-wider text-zinc-400 flex items-center gap-2">
                            <Layers size={15} className={isExpired ? "text-zinc-600" : "text-emerald-500"} /> 
                            <span>የትምህርት ደረጃ / Education Level</span>
                          </h3>
                          <div className="bg-[#04060a] border border-zinc-900/60 rounded-xl p-3 h-[72px] flex items-center shadow-inner">
                            <span className="text-sm font-black text-zinc-200">{job.educationLevel}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className={`${job.educationLevel ? "md:col-span-3" : "md:col-span-5"} space-y-2`}>
                        <h3 className="text-xs uppercase font-black tracking-wider text-zinc-400 flex items-center gap-2">
                          <GraduationCap size={16} className={isExpired ? "text-zinc-600" : "text-emerald-500"} /> 
                          <span>የሚያስፈልግ የትምህርት ዝግጅት / Eligible Fields</span>
                        </h3>
                        <div className="bg-[#04060a] border border-zinc-900/60 rounded-xl p-3 min-h-[72px] flex items-center shadow-inner">
                          {renderFieldTags(job.eligibleFields)}
                        </div>
                      </div>
                    </div>

                    {/* Experience Terms Requirements Payload */}
                    {job.experienceRequirements && (
                      <div className="text-sm text-zinc-200 bg-[#04060a] p-4 rounded-xl border border-zinc-900/80 leading-relaxed font-sans shadow-inner">
                        <span className="font-black text-zinc-400 block uppercase font-mono tracking-wider mb-2 text-xs border-b border-zinc-900 pb-1 flex items-center gap-1.5">
                          <Briefcase size={13} className="text-zinc-500" /> የስራ ልምድ እና መስፈርቶች / Experience Terms:
                        </span>
                        <p className={`font-medium whitespace-pre-wrap text-xs sm:text-sm ${isExpired ? "text-zinc-500" : "text-zinc-300"}`}>
                          {job.experienceRequirements}
                        </p>
                      </div>
                    )}

                    {/* Additional Custom Instructions Box (e.g. Special Skill Requirements) */}
                    {job.additionalNotes && (
                      <div className="text-sm text-zinc-200 bg-[#04060a]/40 p-4 rounded-xl border border-dashed border-zinc-900 leading-relaxed font-sans shadow-inner">
                        <span className="font-black text-zinc-500 block uppercase font-mono tracking-wider mb-1 text-xs flex items-center gap-1.5">
                          <FileText size={13} /> ማስታወሻ / Additional Directives:
                        </span>
                        <p className="font-medium text-zinc-400 text-xs whitespace-pre-wrap">{job.additionalNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* Footer Interactive Actions Section */}
                  <div className="border-t-2 border-zinc-900 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#020305] -mx-6 -mb-6 p-6 mt-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block font-black">የማመልከቻ ማቅረቢያ ቀነ-ገደብ / Application Deadline</span>
                      <div className="flex flex-wrap items-center gap-2 text-sm font-mono text-zinc-400">
                        <Calendar size={15} className="shrink-0 text-rose-500" />
                        <span className={`text-base font-black ${isExpired ? "text-rose-600 line-through" : "text-rose-400"}`}>
                          {formatDate(job.deadline)}
                        </span>
                        <span className={`text-xs border px-2 py-0.5 rounded font-sans font-bold ${
                          isExpired 
                            ? "bg-zinc-900 text-zinc-600 border-zinc-800" 
                            : "bg-rose-950/40 text-rose-400 border-rose-900"
                        }`}>
                          {getWindowDaysDisplay(job.rankLevel)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
                      {job.requiresCOC && (
                        <span className={`text-xs font-mono border-2 px-3 py-1.5 rounded-xl uppercase tracking-wider font-black ${
                          isExpired 
                            ? "bg-zinc-950/40 text-zinc-600 border-zinc-900" 
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        }`}>
                          ሲ.ኦ.ሲ (COC) ያስፈልጋል
                        </span>
                      )}

                      {isExpired ? (
                        <button 
                          disabled
                          type="button"
                          className="w-full md:w-auto bg-rose-950/20 text-rose-500/30 border border-rose-900/30 font-black text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl text-center cursor-not-allowed font-mono"
                        >
                          [ምዝገባው ተዘግቷል]
                        </button>
                      ) : (
                        <button 
                          type="button"
                          onClick={() => window.location.href = `/jobs/${job._id}`}
                          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all text-center shadow-[0_4px_20px_rgba(16,185,129,0.15)] hover:scale-[1.02] cursor-pointer"
                        >
                          ሙሉውን ይመልከቱ  / view detail
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {mode === "home" && !loading && jobs.length > 0 && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => window.location.href = "/joblist"}
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-widest py-4 px-10 rounded-xl shadow-[0_4px_25px_rgba(16,185,129,0.2)] flex items-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>ሁሉንም የስራ ማስታወቂያዎች ይመልከቱ</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default JobList;