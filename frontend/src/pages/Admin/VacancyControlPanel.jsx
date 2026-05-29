import React, { useState, useEffect } from 'react'; 
import { Plus, Users, MapPin, Filter, Search, FileText, Eye, AlertCircle, RefreshCw, Briefcase, Trash2, Edit, X, Check, Calendar, DollarSign, Award, ShieldAlert, Globe, Sliders } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const StatCard = ({ title, value, subtext, icon: Icon, isTrend }) => (
    <div className="bg-[#0d1117] border border-white/5 p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            <Icon className="text-emerald-500 w-5 h-5" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">{value}</h2>
        <p className={`text-xs font-medium ${isTrend ? 'text-emerald-500' : 'text-gray-500'}`}>
            {subtext}
        </p>
    </div>
);

function VacancyControlPanel() {
    const navigate = useNavigate();
    
    // Telemetry Sync Pipeline for tracking deployed positions real-time
    const [jobsList, setJobsList] = useState([]);
    const [liveJobsCount, setLiveJobsCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [systemMessage, setSystemMessage] = useState({ text: "", type: "" });
    const [isTestingSync, setIsTestingSync] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Collapsible Cells State
    const [expandedJobs, setExpandedJobs] = useState([]);

    // Modal Control States
    const [selectedAuditJob, setSelectedAuditJob] = useState(null);
    const [activeModal, setActiveModal] = useState(null); // 'details', 'edit', 'delete', or null (for Audit Actions Menu)
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Edit Form State
    const [editFormData, setEditFormData] = useState({
        title: "",
        department: "Information Technology",
        rankLevel: "Level XIII",
        salary: "",
        positions: "1",
        eligibleFields: "",
        experienceRequirements: "",
        cgpa: "2.0",
        deadline: "",
        sidama: true,
        amharic: true,
        english: false,
        requiresCOC: false,
        featuredOnHome: false,
        status: "published"
    });

    const toggleExpandJob = (jobId) => {
        setExpandedJobs(prev => 
            prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
        );
    };

    // Rapid endpoint test sequence to see if backend is up
    const verifyDatabasePipeline = async (quiet = false) => {
        if (!quiet) setIsTestingSync(true);
        try {
            const res = await axios.get('http://localhost:5000/api/jobs');
            console.log("[API Response]", res.data);
            const jobsArray = Array.isArray(res.data) ? res.data : res.data.jobs || [];
            console.log("[Jobs Array]", jobsArray);
            console.log("[Jobs Count]", jobsArray.length);

            setJobsList(jobsArray);
            setLiveJobsCount(jobsArray.length);
            console.log("[State Updated] jobs and count set");

            if (!quiet) {
                setSystemMessage({
                    text: `Sync Active: Connected successfully. Detected ${jobsArray.length} database entries.`,
                    type: "success"
                });
            }
        } catch (err) {
            console.error("[Fetch Error] Pipeline test block failed:", err);
            console.error("[Error Response]", err.response?.data);
            setJobsList([]);
            setLiveJobsCount(0);
            if (!quiet) {
                setSystemMessage({
                    text: "Pipeline Link Missing: Check if your Node.js server is up on port 5000.",
                    type: "error"
                });
            }
        } finally {
            console.log("[Finally] Setting isLoading to false");
            setIsLoading(false);
            if (!quiet) {
                setIsTestingSync(false);
            }
        }
    };

    // Run rapid initial system diagnostic check on mount
    useEffect(() => {
        verifyDatabasePipeline(true);

        // Safety timeout: Force loading state off after 5 seconds max
        const safetyTimeout = setTimeout(() => {
            console.warn("[Safety Timeout] Forcing isLoading to false");
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(safetyTimeout);
    }, []);

    // Client-side search filtration algorithm
    const filteredJobs = jobsList.filter(job => 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Open Edit Modal helper
    const handleOpenEdit = (job) => {
        setEditFormData({
            title: job.title || "",
            department: job.department || "Information Technology",
            rankLevel: job.rankLevel || "Level XIII",
            salary: job.salary || "",
            positions: job.positions || "1",
            eligibleFields: job.eligibleFields || "",
            experienceRequirements: job.experienceRequirements || "",
            cgpa: job.cgpa !== undefined ? job.cgpa.toString() : "2.0",
            deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : "",
            sidama: job.languages?.sidama !== false,
            amharic: job.languages?.amharic === true,
            english: job.languages?.english === true,
            requiresCOC: job.requiresCOC === true,
            featuredOnHome: job.featuredOnHome === true,
            status: job.status || "published"
        });
        setActiveModal('edit');
    };

    // Update form change handler
    const handleEditFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Submit updates to backend PUT /api/jobs/:id
    const handleUpdateJobSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingEdit(true);
        try {
            const targetId = selectedAuditJob._id || selectedAuditJob.id;
            const payload = {
                title: editFormData.title.trim(),
                department: editFormData.department,
                rankLevel: editFormData.rankLevel.trim(),
                salary: Number(editFormData.salary) || 0,
                positions: Number(editFormData.positions) || 1,
                eligibleFields: editFormData.eligibleFields.trim(),
                experienceRequirements: editFormData.experienceRequirements.trim(),
                cgpa: Number(editFormData.cgpa) || 2.0,
                deadline: editFormData.deadline ? new Date(editFormData.deadline) : undefined,
                languages: {
                    sidama: editFormData.sidama,
                    amharic: editFormData.amharic,
                    english: editFormData.english,
                },
                requiresCOC: editFormData.requiresCOC,
                featuredOnHome: editFormData.featuredOnHome,
                status: editFormData.status
            };

            const res = await axios.put(`http://localhost:5000/api/jobs/${targetId}`, payload);
            if (res.data) {
                toast.success("Vacancy announcement updated successfully");
                
                // Refresh local state list
                verifyDatabasePipeline(true);
                
                // Close modals
                setSelectedAuditJob(null);
                setActiveModal(null);
            }
        } catch (err) {
            console.error("Failed to update vacancy:", err);
            toast.error(err.response?.data?.message || "Failed to save vacancy updates.");
        } finally {
            setIsSubmittingEdit(false);
        }
    };

    // Delete vacancy from database DELETE /api/jobs/:id
    const handleDeleteJobSubmit = async () => {
        setIsDeleting(true);
        try {
            const targetId = selectedAuditJob._id || selectedAuditJob.id;
            const res = await axios.delete(`http://localhost:5000/api/jobs/${targetId}`);
            if (res.data.success || res.status === 200) {
                toast.success(res.data.message || "Vacancy permanently removed from index");
                
                // Update lists
                setJobsList(prev => prev.filter(job => (job._id || job.id) !== targetId));
                setLiveJobsCount(prev => Math.max(0, prev - 1));
                
                // Close modals
                setSelectedAuditJob(null);
                setActiveModal(null);
            }
        } catch (err) {
            console.error("Failed to delete vacancy:", err);
            toast.error(err.response?.data?.message || "Internal server error deleting vacancy.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#010409] text-white p-6 md:p-12 relative selection:bg-emerald-500/30 selection:text-emerald-400">
            
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
                    <h1 className="text-4xl font-bold text-white tracking-tight uppercase">Admin Dashboard</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-gray-400 font-medium">HR Staff Portal - Vacancy Control Panel</p>
                        <span className="text-gray-700">&bull;</span>
                        <button 
                            onClick={() => verifyDatabasePipeline(false)}
                            className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-500 hover:text-emerald-500 flex items-center gap-1.5 transition-colors group"
                        >
                            <RefreshCw size={10} className={`group-hover:rotate-180 transition-transform duration-500 ${isTestingSync ? 'animate-spin text-emerald-500' : ''}`} />
                            Test Endpoints
                        </button>
                    </div>
                </div>
                
                {/* NAVIGATION BUTTONS */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin-dashboard')}
                        className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
                    >
                        <Users size={16} /> Candidate Management
                    </button>
                    <button
                        onClick={() => navigate('/admin-dashboard/create-job')}
                        className="bg-orange-600 hover:bg-orange-700 transition-all text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(234,88,12,0.15)]"
                    >
                        <Plus size={16} strokeWidth={3} /> Post New Job
                    </button>
                </div>
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
                <aside className="lg:col-span-1 bg-[#0d1117] p-6 rounded-2xl border border-white/5 self-start">
                    <div className="flex items-center gap-2 mb-1">
                        <Filter className="text-emerald-500 w-5 h-5" />
                        <h3 className="text-xl font-bold text-white">Registry Filters</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-8">Refine position index</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">Filter by Department</label>
                            <select className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-gray-400 focus:outline-none text-xs">
                                <option>All Departments</option>
                                <option>Software Engineering</option>
                                <option>Human Resources</option>
                                <option>Finance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">Allocation Type</label>
                            <select className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-gray-400 focus:outline-none text-xs">
                                <option>All Classifications</option>
                                <option>Full-time Active Allocation</option>
                                <option>Contractual Stream</option>
                            </select>
                        </div>
                        <button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-bold py-3 rounded-xl transition-all mt-4 text-xs">
                            Reset Filters
                        </button>
                    </div>
                </aside>

                <div className="lg:col-span-3 bg-[#0d1117] p-8 rounded-2xl border border-white/5">
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
                            className="w-full bg-[#010409] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/30 text-sm"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="text-center py-12 flex flex-col items-center gap-3">
                                <RefreshCw className="animate-spin text-emerald-500 w-8 h-8" />
                                <p className="text-gray-500 text-sm font-mono uppercase tracking-wider">Syncing vacancies registry...</p>
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-white/5 rounded-xl">
                                <Briefcase className="mx-auto text-gray-600 mb-3" size={32} />
                                <p className="text-gray-500 text-sm">No active job posting clusters found inside database nodes.</p>
                            </div>
                        ) : (
                            <table className="w-full text-left table-fixed">
                                <thead className="text-gray-500 text-sm border-b border-white/5">
                                    <tr>
                                        <th className="pb-4 font-medium w-[22%]">Position Title</th>
                                        <th className="pb-4 font-medium w-[16%]">Department</th>
                                        <th className="pb-4 font-medium w-[32%]">Matrix Requirements</th>
                                        <th className="pb-4 font-medium w-[13%]">Closing Deadline</th>
                                        <th className="pb-4 font-medium w-[10%]">Status</th>
                                        <th className="pb-4 font-medium w-[7%] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    {filteredJobs.map((job) => {
                                        const isExpired = job.deadline ? new Date() > new Date(job.deadline) : false;
                                        const targetId = job._id || job.id;
                                        const isExpanded = expandedJobs.includes(targetId);

                                        return (
                                            <tr key={targetId || Math.random().toString()} className="border-b border-white/5 hover:bg-emerald-900/5 transition-colors group">
                                                <td className="py-4 font-bold text-sm text-zinc-100 truncate pr-2">{job.title}</td>
                                                <td className="py-4 text-gray-400 text-xs truncate pr-2">{job.department}</td>
                                                <td className="py-4 text-gray-400 text-xs pr-4">
                                                    <div className="space-y-0.5">
                                                        <div className="text-[10px] text-gray-500 font-bold">
                                                            CGPA: <span className="text-emerald-400">{job.cgpa || "2.0"}+</span>
                                                        </div>
                                                        <div className="text-[10px] text-zinc-400 line-clamp-1">
                                                            {job.eligibleFields || "No fields specified"}
                                                        </div>
                                                        <div className="text-[10px] text-zinc-300 leading-relaxed">
                                                            {isExpanded ? (
                                                                <div className="mt-1">
                                                                    <div className="text-zinc-200">
                                                                        {job.experienceRequirements || "Not specified"}
                                                                    </div>
                                                                    <button
                                                                        onClick={() => toggleExpandJob(targetId)}
                                                                        className="text-emerald-400 hover:text-emerald-300 font-bold mt-1 hover:underline focus:outline-none text-[9px] uppercase font-mono tracking-wider"
                                                                    >
                                                                        Hide
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="line-clamp-2">
                                                                    {job.experienceRequirements || "Not specified"}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {!isExpanded && (job.experienceRequirements && job.experienceRequirements.length > 60) && (
                                                            <button
                                                                onClick={() => toggleExpandJob(targetId)}
                                                                className="text-emerald-500 hover:text-emerald-400 font-bold hover:underline focus:outline-none text-[9px] uppercase font-mono tracking-wider mt-0.5"
                                                            >
                                                                More
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 text-gray-400 font-mono text-xs">
                                                    {job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    }) : "Continuous"}
                                                </td>
                                                <td className="py-4">
                                                    {isExpired ? (
                                                        <span className="bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-rose-500/20">Closed</span>
                                                    ) : job.status === "draft" ? (
                                                        <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-amber-500/20">Draft</span>
                                                    ) : job.status === "archived" ? (
                                                        <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-zinc-700">Archived</span>
                                                    ) : (
                                                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-emerald-500/20">Active</span>
                                                    )}
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedAuditJob(job);
                                                            setActiveModal(null); // Open Menu Dialog
                                                        }}
                                                        className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all"
                                                    >
                                                        <Sliders size={12} /> Audit
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

            {/* AUDIT MAIN ACTIONS CHOICE MENU DIALOG */}
            {selectedAuditJob && activeModal === null && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-[#050c1a] border border-zinc-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in scale-in duration-300">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase block mb-1">
                                    [Registry Code: {selectedAuditJob.jobCode || 'N/A'}]
                                </span>
                                <h3 className="text-lg font-extrabold text-white">Vacancy Audit Panel</h3>
                            </div>
                            <button 
                                onClick={() => setSelectedAuditJob(null)}
                                className="text-gray-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-xl transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-zinc-400 text-xs mb-2">Select an action for <span className="text-zinc-200 font-bold">"{selectedAuditJob.title}"</span>:</p>
                            
                            <button
                                onClick={() => setActiveModal('details')}
                                className="w-full bg-[#0d1117] hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/80 p-4 rounded-2xl flex items-center gap-4 text-left transition-all group"
                            >
                                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <Eye size={20} />
                                </div>
                                <div>
                                    <span className="font-extrabold text-sm text-zinc-100 block">View Full Details</span>
                                    <span className="text-[10px] text-zinc-500 block mt-0.5">Inspect all metadata parameters & language metrics</span>
                                </div>
                            </button>

                            <button
                                onClick={() => handleOpenEdit(selectedAuditJob)}
                                className="w-full bg-[#0d1117] hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/80 p-4 rounded-2xl flex items-center gap-4 text-left transition-all group"
                            >
                                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Edit size={20} />
                                </div>
                                <div>
                                    <span className="font-extrabold text-sm text-zinc-100 block">Edit Vacancy</span>
                                    <span className="text-[10px] text-zinc-500 block mt-0.5">Modify title, requirements, CGPA threshold, or status</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveModal('delete')}
                                className="w-full bg-[#0d1117] hover:bg-rose-950/20 border border-zinc-800/80 hover:border-rose-900/30 p-4 rounded-2xl flex items-center gap-4 text-left transition-all group"
                            >
                                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <span className="font-extrabold text-sm text-zinc-100 block text-rose-400">Delete Vacancy</span>
                                    <span className="text-[10px] text-zinc-500 block mt-0.5">Permanently purge this record from central databases</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* AUDIT VIEW DETAILS MODAL */}
            {selectedAuditJob && activeModal === 'details' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-[#050c1a] border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in scale-in duration-300">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase block mb-1">
                                    [Vacancy Specifications Catalog]
                                </span>
                                <h3 className="text-xl font-extrabold text-white">{selectedAuditJob.title}</h3>
                            </div>
                            <button 
                                onClick={() => setActiveModal(null)}
                                className="text-gray-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-xl transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        
                        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                            
                            {/* Department Info */}
                            <div className="bg-[#0d1117] border border-white/5 p-4 rounded-xl flex justify-between items-center">
                                <div>
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Directorate Unit:</span>
                                    <h4 className="font-bold text-emerald-400 text-sm mt-0.5">{selectedAuditJob.department}</h4>
                                </div>
                                <div className="text-right">
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Registry Status:</span>
                                    <div className="mt-1">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            selectedAuditJob.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
                                        }`}>
                                            {selectedAuditJob.status || 'published'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Job Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-[#0d1117] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">Salary</span>
                                    <span className="text-lg font-bold text-zinc-200 font-mono flex items-center mt-1">
                                        <DollarSign size={16} className="text-zinc-500" /> {selectedAuditJob.salary || '0'} <span className="text-xs text-zinc-500 font-normal ml-1">ETB</span>
                                    </span>
                                </div>

                                <div className="bg-[#0d1117] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">Rank Level</span>
                                    <span className="text-lg font-bold text-zinc-200 font-mono block mt-1">
                                        {selectedAuditJob.rankLevel || 'Level XIII'}
                                    </span>
                                </div>

                                <div className="bg-[#0d1117] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">Open Positions</span>
                                    <span className="text-lg font-bold text-zinc-200 font-mono block mt-1">
                                        {selectedAuditJob.positions || 1} Seats
                                    </span>
                                </div>

                                <div className="bg-[#0d1117] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">Minimum CGPA</span>
                                    <span className="text-lg font-bold text-emerald-400 font-mono block mt-1">
                                        {selectedAuditJob.cgpa || '2.0'}+
                                    </span>
                                </div>

                                <div className="bg-[#0d1117] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">COC Required</span>
                                    <span className="text-sm font-bold text-zinc-200 block mt-2.5">
                                        {selectedAuditJob.requiresCOC ? '✓ Required' : '✗ Bypassed'}
                                    </span>
                                </div>

                                <div className="bg-[#0d1117] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">Registration Expiration</span>
                                    <span className="text-xs font-mono font-bold text-zinc-300 block mt-2 truncate">
                                        {selectedAuditJob.deadline ? new Date(selectedAuditJob.deadline).toLocaleDateString() : 'Continuous'}
                                    </span>
                                </div>
                            </div>

                            {/* Requirements Blocks */}
                            <div className="space-y-4">
                                <div className="bg-[#0d1117] border border-white/5 p-5 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider block mb-2">Academic Field Requirements</span>
                                    <p className="text-zinc-200 text-sm leading-relaxed">{selectedAuditJob.eligibleFields}</p>
                                </div>

                                <div className="bg-[#0d1117] border border-white/5 p-5 rounded-xl">
                                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider block mb-2">Work Experience & Terms</span>
                                    <p className="text-zinc-200 text-sm leading-relaxed">{selectedAuditJob.experienceRequirements}</p>
                                </div>
                            </div>

                            {/* Languages & Metadata */}
                            <div className="bg-[#0d1117] border border-white/5 p-5 rounded-xl flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase mb-2">Languages Requirements</span>
                                    <div className="flex gap-4 text-xs font-mono">
                                        <span className={selectedAuditJob.languages?.sidama ? 'text-emerald-400' : 'text-zinc-600'}>
                                            {selectedAuditJob.languages?.sidama ? '✓' : '✗'} SIDAMA
                                        </span>
                                        <span className={selectedAuditJob.languages?.amharic ? 'text-emerald-400' : 'text-zinc-600'}>
                                            {selectedAuditJob.languages?.amharic ? '✓' : '✗'} AMHARIC
                                        </span>
                                        <span className={selectedAuditJob.languages?.english ? 'text-emerald-400' : 'text-zinc-600'}>
                                            {selectedAuditJob.languages?.english ? '✓' : '✗'} ENGLISH
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[10px] text-zinc-500 font-bold block uppercase mb-2">Carousel Pins</span>
                                    <span className={`text-xs px-2.5 py-1 rounded-lg ${selectedAuditJob.featuredOnHome ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-500'}`}>
                                        {selectedAuditJob.featuredOnHome ? 'Pinned on Homepage' : 'Standard Directory'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex justify-between items-center">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 px-5 py-2.5 rounded-xl text-zinc-400 font-bold text-xs uppercase"
                            >
                                Back to Actions
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleOpenEdit(selectedAuditJob)}
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1"
                                >
                                    <Edit size={14} /> Edit Vacancy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AUDIT EDIT FORM MODAL */}
            {selectedAuditJob && activeModal === 'edit' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-[#050c1a] border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in scale-in duration-300">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase block mb-1">
                                    [Vacancy Registry Editor]
                                </span>
                                <h3 className="text-xl font-extrabold text-white">Edit Vacancy Specifications</h3>
                            </div>
                            <button 
                                onClick={() => setActiveModal(null)}
                                className="text-gray-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-xl transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdateJobSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                            
                            {/* Title & Rank */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Vacancy Position Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editFormData.title}
                                        onChange={handleEditFormChange}
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Civil Service Rank Level</label>
                                    <select
                                        name="rankLevel"
                                        value={editFormData.rankLevel}
                                        onChange={handleEditFormChange}
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
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
                            </div>

                            {/* Department & Salary & Positions */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Department</label>
                                    <select
                                        name="department"
                                        value={editFormData.department}
                                        onChange={handleEditFormChange}
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                                    >
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="Human Resource Development Directorate">Human Resource Directorate</option>
                                        <option value="Planning & Budgeting">Planning & Budgeting</option>
                                        <option value="Public Relations">Public Relations</option>
                                        <option value="Technical Services">Technical Services</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Monthly Base Salary (ETB)</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={editFormData.salary}
                                        onChange={handleEditFormChange}
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-zinc-200 text-sm font-mono focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Positions Allocation</label>
                                    <input
                                        type="number"
                                        name="positions"
                                        value={editFormData.positions}
                                        onChange={handleEditFormChange}
                                        min="1"
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-zinc-200 text-sm font-mono focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* CGPA & Deadline & Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-900">
                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Minimum CGPA</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0.0"
                                        max="4.0"
                                        name="cgpa"
                                        value={editFormData.cgpa}
                                        onChange={handleEditFormChange}
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-zinc-200 text-sm font-mono focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1 text-amber-500">
                                        <Calendar size={12} /> Custom Expiration
                                    </label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={editFormData.deadline}
                                        onChange={handleEditFormChange}
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-2.5 text-zinc-200 text-sm font-mono focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Vacancy Status</label>
                                    <select
                                        name="status"
                                        value={editFormData.status}
                                        onChange={handleEditFormChange}
                                        className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-zinc-300 text-sm focus:outline-none"
                                    >
                                        <option value="draft">Draft (Private)</option>
                                        <option value="published">Published (Active)</option>
                                        <option value="archived">Archived (Closed)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Qualifications Eligible Fields */}
                            <div>
                                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Eligible Educational Backgrounds</label>
                                <textarea
                                    name="eligibleFields"
                                    value={editFormData.eligibleFields}
                                    onChange={handleEditFormChange}
                                    rows="3"
                                    className="w-full bg-[#010409] border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 text-sm focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Experience Requirements */}
                            <div>
                                <label className="block text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">Experience Requirements & Terms</label>
                                <textarea
                                    name="experienceRequirements"
                                    value={editFormData.experienceRequirements}
                                    onChange={handleEditFormChange}
                                    rows="3"
                                    className="w-full bg-[#010409] border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 text-sm focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Checkbox matrices */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-3">
                                    <div className="text-[10px] uppercase font-black tracking-widest text-zinc-500 flex items-center gap-1.5">
                                        <Globe size={13} className="text-emerald-500" /> Language Requirements
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                                        <label className="flex items-center gap-1.5 cursor-pointer text-zinc-400">
                                            <input
                                                type="checkbox"
                                                name="sidama"
                                                checked={editFormData.sidama}
                                                onChange={handleEditFormChange}
                                                className="accent-emerald-500 w-3.5 h-3.5"
                                            />
                                            SIDAMA
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer text-zinc-400">
                                            <input
                                                type="checkbox"
                                                name="amharic"
                                                checked={editFormData.amharic}
                                                onChange={handleEditFormChange}
                                                className="accent-emerald-500 w-3.5 h-3.5"
                                            />
                                            AMHARIC
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer text-zinc-400">
                                            <input
                                                type="checkbox"
                                                name="english"
                                                checked={editFormData.english}
                                                onChange={handleEditFormChange}
                                                className="accent-emerald-500 w-3.5 h-3.5"
                                            />
                                            ENGLISH
                                        </label>
                                    </div>
                                </div>

                                <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-2 flex flex-col justify-center">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="requiresCOC"
                                            id="requiresCOC"
                                            checked={editFormData.requiresCOC}
                                            onChange={handleEditFormChange}
                                            className="accent-emerald-500 w-4 h-4 cursor-pointer"
                                        />
                                        <label htmlFor="requiresCOC" className="text-xs font-bold text-zinc-400 cursor-pointer select-none uppercase">
                                            Requires COC Certification
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="featuredOnHome"
                                            id="featuredOnHome"
                                            checked={editFormData.featuredOnHome}
                                            onChange={handleEditFormChange}
                                            className="accent-emerald-500 w-4 h-4 cursor-pointer"
                                        />
                                        <label htmlFor="featuredOnHome" className="text-xs font-bold text-zinc-400 cursor-pointer select-none uppercase">
                                            Pin on Homepage Carousel
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Form actions */}
                            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={() => setActiveModal(null)}
                                    className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 px-5 py-3 rounded-xl text-zinc-400 font-bold text-xs uppercase"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingEdit}
                                    className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-900 text-white font-black text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-md disabled:cursor-not-allowed"
                                >
                                    {isSubmittingEdit ? 'Saving...' : 'Save Updates'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* AUDIT DELETE CONFIRMATION MODAL */}
            {selectedAuditJob && activeModal === 'delete' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-[#050c1a] border border-zinc-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in scale-in duration-300">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                            <h3 className="text-lg font-extrabold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                                <AlertCircle size={20} /> Permanently Remove Vacancy?
                            </h3>
                            <button 
                                onClick={() => setActiveModal(null)}
                                className="text-gray-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-xl transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                                <p className="text-zinc-300 text-xs font-mono block uppercase text-zinc-500 mb-1">Vacancy Selected:</p>
                                <span className="font-extrabold text-sm text-zinc-100 block">{selectedAuditJob.title}</span>
                                <span className="text-[10px] text-zinc-500 font-mono block mt-1">Registry Code: {selectedAuditJob.jobCode}</span>
                            </div>

                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Are you sure you want to permanently remove this vacancy announcement? This operation will remove the listing from MongoDB, and any candidates applying for this post may become orphaned in active tables.
                            </p>

                            <p className="text-[10px] text-rose-400 font-mono font-bold uppercase tracking-wider bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30">
                                Warning: This action is permanent and cannot be undone.
                            </p>
                        </div>
                        
                        <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex justify-between items-center">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 px-5 py-2.5 rounded-xl text-zinc-400 font-bold text-xs uppercase"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteJobSubmit}
                                disabled={isDeleting}
                                className="bg-rose-600 hover:bg-rose-500 disabled:bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wide transition-all shadow-md disabled:cursor-not-allowed"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default VacancyControlPanel;
