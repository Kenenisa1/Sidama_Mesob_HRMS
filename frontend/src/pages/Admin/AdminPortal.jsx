import React, { useState, useEffect } from 'react'; 
import { Plus, Users, MapPin, Filter, Search, FileText, Eye, AlertCircle, RefreshCw, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 🛠️ ADDED FOR CLEAN PAGE ROUTING
import axios from 'axios';

const StatCard = ({ title, value, subtext, icon: Icon, isTrend }) => (
    <div className="bg-cardBg border border-white/5 p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            <Icon className="text-emeraldAccent w-5 h-5" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">{value}</h2>
        <p className={`text-xs font-medium ${isTrend ? 'text-emeraldAccent' : 'text-gray-500'}`}>
            {subtext}
        </p>
    </div>
);

function AdminPortal() {
    const navigate = useNavigate(); // 🛠️ INITIALIZE ROUTER HOOK
    
    // Telemetry Sync Pipeline for tracking deployed positions real-time
    const [jobsList, setJobsList] = useState([]);
    const [liveJobsCount, setLiveJobsCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [systemMessage, setSystemMessage] = useState({ text: "", type: "" });
    const [isTestingSync, setIsTestingSync] = useState(false);

    // Rapid endpoint test sequence to see if backend is up
    const verifyDatabasePipeline = async (quiet = false) => {
        if (!quiet) setIsTestingSync(true);
        try {
            const res = await axios.get('http://localhost:5000/api/jobs');
            const jobsArray = Array.isArray(res.data) ? res.data : res.data.jobs || [];
            
            setJobsList(jobsArray);
            setLiveJobsCount(jobsArray.length);
            
            if (!quiet) {
                setSystemMessage({ 
                    text: `Sync Active: Connected successfully. Detected ${jobsArray.length} database entries.`, 
                    type: "success" 
                });
            }
        } catch (err) {
            console.error("Pipeline test block failed:", err);
            if (!quiet) {
                setSystemMessage({ 
                    text: "Pipeline Link Missing: Check if your Node.js server is up on port 5000.", 
                    type: "error" 
                });
            }
        } finally {
            if (!quiet) setIsTestingSync(false);
        }
    };

    // Run rapid initial system diagnostic check on mount
    useEffect(() => {
        verifyDatabasePipeline(true);
    }, []);

    // Client-side search filtration algorithm
    const filteredJobs = jobsList.filter(job => 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-darkBg p-6 md:p-12 relative">
            
            {/* INTEGRATION TESTING NOTIFICATION BAR */}
            {systemMessage.text && (
                <div className={`fixed top-6 right-6 z-50 max-w-md p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 
                    ${systemMessage.type === 'success' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}
                >
                    <div className="flex items-start gap-3 text-xs font-mono">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <span className="font-bold block mb-1">
                                {systemMessage.type === 'success' ? '[SYSTEM REGISTRY OK]' : '[SYSTEM PIPELINE LINK BREAK]'}
                            </span>
                            {systemMessage.text}
                        </div>
                        <button 
                            onClick={() => setSystemMessage({ text: "", type: "" })}
                            className="text-gray-500 hover:text-white transition-colors text-xs font-sans font-bold"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Admin Dashboard</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-gray-400">HR Staff Portal - Vacancy Control Panel</p>
                        <span className="text-gray-700">&bull;</span>
                        <button 
                            onClick={() => verifyDatabasePipeline(false)}
                            className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-500 hover:text-emeraldAccent flex items-center gap-1.5 transition-colors group"
                        >
                            <RefreshCw size={10} className={`group-hover:rotate-180 transition-transform duration-500 ${isTestingSync ? 'animate-spin text-emeraldAccent' : ''}`} />
                            Test Endpoints
                        </button>
                    </div>
                </div>
                {/* 🛠️ MODIFIED: BUTTON NOW ROUTES CLEANLY TO YOUR NEW PAGE */}
                <button
                    onClick={() => navigate('/admin/create-job')}
                    className="bg-accentOrange hover:bg-orange-700 transition-all text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(234,88,12,0.15)]"
                >
                    <Plus size={20} strokeWidth={3} /> Post New Job
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Applicants Logs"
                    value="8"
                    subtext="Candidate files inside central index"
                    icon={Users}
                    isTrend={true}
                />
                <StatCard
                    title="Live Deployed Vacancies"
                    value={liveJobsCount}
                    subtext="Real-time open pipelines in MongoDB"
                    icon={Briefcase}
                    isTrend={liveJobsCount > 0}
                />
                <StatCard
                    title="Operational Footprint"
                    value="Hawassa"
                    subtext="Central Hub Distribution Portal"
                    icon={MapPin}
                    isTrend={false}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
                <aside className="lg:col-span-1 bg-cardBg p-6 rounded-2xl border border-white/5 self-start">
                    <div className="flex items-center gap-2 mb-1">
                        <Filter className="text-emeraldAccent w-5 h-5" />
                        <h3 className="text-xl font-bold text-white">Registry Filters</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-8">Refine position index</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">Filter by Department</label>
                            <select className="w-full bg-darkBg border border-emerald-900/20 rounded-xl p-3 text-gray-400 focus:outline-none text-xs">
                                <option>All Departments</option>
                                <option>Software Engineering</option>
                                <option>Human Resources</option>
                                <option>Finance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">Allocation Type</label>
                            <select className="w-full bg-darkBg border border-emerald-900/20 rounded-xl p-3 text-gray-400 focus:outline-none text-xs">
                                <option>All Classifications</option>
                                <option>Full-time Active Allocation</option>
                                <option>Contractual Stream</option>
                            </select>
                        </div>
                        <button className="w-full bg-white text-emerald-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all mt-4 text-xs">
                            Reset Filters
                        </button>
                    </div>
                </aside>

                <div className="lg:col-span-3 bg-cardBg p-8 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Active Vacancies Registry</h3>
                            <p className="text-gray-500">Showing {filteredJobs.length} of {liveJobsCount} deployed positions</p>
                        </div>
                        <button className="flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-bold text-sm">
                            <FileText size={18} /> Export Index
                        </button>
                    </div>
                    
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search vacancies by title or department context..."
                            className="w-full bg-darkBg border border-emerald-900/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emeraldAccent/30 text-sm"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-white/5 rounded-xl">
                                <Briefcase className="mx-auto text-gray-600 mb-3" size={32} />
                                <p className="text-gray-500 text-sm">No active job posting clusters found inside database nodes.</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="text-gray-500 text-sm border-b border-white/5">
                                    <tr>
                                        <th className="pb-4 font-medium">Position Title</th>
                                        <th className="pb-4 font-medium">Department</th>
                                        <th className="pb-4 font-medium">Matrix Requirements</th>
                                        <th className="pb-4 font-medium">Closing Deadline</th>
                                        <th className="pb-4 font-medium">Status Stream</th>
                                        <th className="pb-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    {filteredJobs.map((job) => {
                                        const isExpired = new Date() > new Date(job.deadline);
                                        const targetId = job._id || job.id; // 🛡️ SAFE GUARD FALLBACK IDENTIFIER

                                        return (
                                            <tr key={targetId || Math.random().toString()} className="border-b border-white/5 hover:bg-emerald-900/5 transition-colors group">
                                                <td className="py-4 font-bold text-sm text-zinc-100">{job.title}</td>
                                                <td className="py-4 text-gray-400 text-xs">{job.department}</td>
                                                <td className="py-4 text-gray-400 text-xs">
                                                    <div className="space-y-0.5">
                                                        <div>Exp: {job.experience || "Not Stated"}</div>
                                                        <div className="text-[11px] text-gray-500">CGPA: {job.cgpa}+</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-gray-400 font-mono text-xs">
                                                    {job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    }) : "Continuous"}
                                                </td>
                                                <td className="py-4">
                                                    {isExpired ? (
                                                        <span className="bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-rose-500/20">Closed</span>
                                                    ) : (
                                                        <span className="bg-emerald-500/10 text-emeraldAccent px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">Active Intake</span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    {/* 🛠️ MODIFIED: PREVENTS CRASHES BY ROUTING VIA STABLE VARIABLE REFERENCES */}
                                                    <button 
                                                        onClick={() => {
                                                            if (!targetId) {
                                                                alert("Error: Missing database identifier for this document record.");
                                                                return;
                                                            }
                                                            navigate(`/apply/${targetId}`);
                                                        }}
                                                        className="flex items-center gap-1 text-emeraldAccent hover:underline font-bold text-xs"
                                                    >
                                                        <Eye size={14} /> Audit
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;