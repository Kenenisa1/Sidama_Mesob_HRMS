import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft,
  FileText,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSingleVacancy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error("Failed to load requested vacancy gateway:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleVacancy();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "በአካል ቀርበው ይጠይቁ (Urgent Entry)";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-[70vh] text-zinc-100 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
        <div className="max-w-md w-full bg-black border-2 border-zinc-900 rounded-[2rem] p-8 text-center space-y-5 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <AlertCircle className="text-red-500 w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black uppercase text-zinc-200 tracking-wide">የስራ መደቡ አልተገኘም</h2>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">The requested vacancy entry couldn't be located or has been archived from our verification data registry stream.</p>
          </div>
          <button 
            onClick={() => navigate('/joblist')} 
            className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-xs font-black uppercase tracking-widest border border-zinc-800 py-4 rounded-xl transition-all"
          >
            <ArrowLeft size={14} className="text-emerald-500" /> ወደ ማውጫው ይመለሱ
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black">የመደቡን ዝርዝር መረጃ በመጫን ላይ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-zinc-100 py-10 px-4 sm:p-6 md:p-12 selection:bg-emerald-500/20 selection:text-emerald-400 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Action Bar */}
        <div className="flex items-center justify-between px-1">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-wider text-zinc-500 hover:text-white transition-colors bg-black border border-zinc-800/80 px-4 py-3 rounded-xl hover:border-zinc-700"
          >
            <ArrowLeft size={14} className="text-emerald-500" />
            <span>ወደ ስራዎች ማውጫ (Back to Vacancies)</span>
          </button>
          
          <span className="font-mono text-[10px] bg-black border border-zinc-800/80 text-zinc-600 px-3 py-2 rounded-lg font-bold">
            VAC-REF: {job._id?.substring(18).toUpperCase()}
          </span>
        </div>

        {/* Core Detailed Dashboard Card */}
        <div className="bg-black border border-zinc-800 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Top Geometric Minimalist Visual Accent Border */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500" />

          {/* Heading Section */}
          <div className="border-b border-zinc-900 pb-6 space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-emerald-950/30 font-mono font-black text-[10px] text-emerald-400 uppercase tracking-widest px-3 py-1.5 rounded-xl border border-emerald-900/50">
                CODE: {job.jobCode || "UNASSIGNED"}
              </span>
              <span className="bg-zinc-900/50 text-[10px] font-black uppercase tracking-widest text-zinc-400 px-3 py-1.5 rounded-xl border border-zinc-800/60">
                {job.department}
              </span>
              {job.featuredOnHome && (
                <span className="bg-red-500/5 border border-red-500/10 font-black text-[9px] uppercase tracking-widest text-red-400 px-3 py-1.5 rounded-xl animate-pulse">
                  አስቸኳይ / Urgent Intake
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {job.title}
            </h1>
          </div>

          {/* High-Contrast Grid Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-black rounded-xl text-zinc-500 border border-zinc-800">
                <TrendingUp size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-600 uppercase font-black block tracking-widest">የመደብ ደረጃ / Rank Level</span>
                <span className="text-sm font-black text-zinc-300 font-mono uppercase">{job.rankLevel || "N/A"}</span>
              </div>
            </div>

            <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-black rounded-xl text-emerald-500 border border-zinc-800">
                <DollarSign size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-600 uppercase font-black block tracking-widest">ወርሃዊ ደመወዝ / Salary</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {job.salary ? `${job.salary.toLocaleString()} ETB` : "Civil Scale Appraised"}
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-black rounded-xl text-zinc-500 border border-zinc-800">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-600 uppercase font-black block tracking-widest">የክፍት ቦታ ብዛት / Slots</span>
                <span className="text-sm font-black text-zinc-300">
                  {job.positions || 1} ክፍት ቦታ ({Number(job.positions) === 1 ? "ሰራተኛ" : "ሰራተኞች"})
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-black rounded-xl text-zinc-500 border border-zinc-800">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-600 uppercase font-black block tracking-widest">የስራ ቦታ / Location</span>
                <span className="text-sm font-bold text-zinc-400">{job.location || "ሀዋሳ / Hawassa"}</span>
              </div>
            </div>

          </div>

          {/* Educational Qualifications Requirements */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-black tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
              <GraduationCap size={15} className="text-emerald-500" />
              <span>የሚያስፈልግ የትምህርት ዝግጅት / Eligible Fields</span>
            </h3>
            <div className="bg-zinc-950/20 border border-zinc-900 rounded-2xl p-5">
              <p className="text-sm font-medium text-zinc-300 whitespace-pre-line leading-relaxed">
                {job.eligibleFields}
              </p>
            </div>
          </div>

          {/* Experience Terms Conditions */}
          {job.experienceRequirements && (
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase font-black tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <FileText size={15} className="text-emerald-500" />
                <span>ተፈላጊ ችሎታ እና የስራ ልምድ / Experience Terms</span>
              </h3>
              <div className="bg-zinc-950/20 border border-zinc-900 rounded-2xl p-5">
                <p className="text-sm font-medium text-zinc-400 leading-relaxed whitespace-pre-line">
                  {job.experienceRequirements}
                </p>
              </div>
            </div>
          )}

          {/* Institutional Compliance Deadline Alert Box */}
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex gap-3 items-start">
            <AlertCircle className="text-red-500/70 w-4 h-4 mt-0.5 shrink-0" />
            <div className="text-xs text-zinc-500 leading-relaxed">
              <strong className="text-red-400/80 font-black block uppercase tracking-wider mb-1">⚠️ የማመልከቻ ማስገቢያ ቀነ-ገደብ ማሳሰቢያ፦</strong>
              ይህ ማስታወቂያ በይፋ ከወጣበት ቀን ጀምሮ ለደረጃ <strong className="text-zinc-300 font-bold">VII እና ከዚያ በታች</strong> ላሉ የስራ መደቦች በ 5 የሥራ ቀናት ውስጥ፣ እንዲሁም ለደረጃ <strong className="text-zinc-300 font-bold">VIII እና ከዚያ በላይ</strong> ላሉ የስራ መደቦች በ 10 የሥራ ቀናት ውስጥ ማመልከቻው መጠናቀቅ አለበት። የመጨረሻው ቀን: <span className="text-red-400 font-black font-mono underline">{formatDate(job.deadline)}</span>።
            </div>
          </div>

          {/* Dynamic Action Trigger Zone */}
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-zinc-950/20 -mx-6 -mb-6 p-6 sm:p-8 sm:-mx-10 sm:-mb-10 rounded-b-[2.3rem]">
            <div className="space-y-1 max-w-md">
              <div className="flex items-center gap-1.5 text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest">
                <HelpCircle size={12} />
                <span>ምዝገባ ከመጀመርዎ በፊት</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                እባክዎ የምስክር ወረቀቶችዎን (Degree, COC ሰርተፊኬት ካለዎት፣ እና የታደሰ መታወቂያ) በፒዲኤፍ (PDF) ወይም በምስል ቅርጸት ያዘጋጁ።
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {job.requiresCOC && (
                <span className="text-[9px] font-mono bg-amber-500/5 border border-amber-500/10 text-amber-400/80 px-3 py-2 rounded-xl font-black uppercase tracking-widest">
                  COC REQUIRED
                </span>
              )}

              <button 
                type="button"
                onClick={() => navigate(`/apply/${job._id}`)} // Fixed pattern linking directly to your registered App.js handler
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 px-8 rounded-xl transition-all shadow-[0_4px_30px_rgba(16,185,129,0.15)] active:scale-[0.99]"
              >
                ማመልከቻ ፎርም ሙላ / Open Intake Gateway
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default JobDetail;