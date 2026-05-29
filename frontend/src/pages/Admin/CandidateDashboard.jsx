import React, { useState, useEffect } from 'react';
import { Plus, Users, MapPin, Filter, Search, FileText, Eye, AlertCircle, RefreshCw, Briefcase, Download, X, Check, XCircle, FileSpreadsheet, GraduationCap, Phone, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const StatCard = ({ title, value, subtext, icon: Icon, isTrend }) => (
    <div className="bg-[#0d1117] border border-white/5 p-6 rounded-xl shadow-md">
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

function CandidateDashboard() {
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTestingSync, setIsTestingSync] = useState(false);
    const [systemMessage, setSystemMessage] = useState({ text: "", type: "" });
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    // Filters state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedWoreda, setSelectedWoreda] = useState("");
    const [selectedFluency, setSelectedFluency] = useState("");
    const [minCgpa, setMinCgpa] = useState(0.0);

    // Fetch all applications
    const fetchApplicants = async (quiet = false) => {
        if (!quiet) setIsLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/applications/all');
            const data = res.data.data || [];
            setApplicants(data);
            if (!quiet) {
                setSystemMessage({
                    text: `Candidate Registry Sync Success: Found ${data.length} registered candidates.`,
                    type: "success"
                });
            }
        } catch (err) {
            console.error("Failed to fetch applicants:", err);
            if (!quiet) {
                setSystemMessage({
                    text: "Failed to connect to backend candidate registry pipeline.",
                    type: "error"
                });
            }
        } finally {
            if (!quiet) setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants(true);
    }, []);

    // Get unique list of woredas from current applicants for filtering
    const uniqueWoredas = Array.from(new Set(applicants.map(app => app.residency?.woreda).filter(Boolean))).sort();

    // Reset filters
    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedWoreda("");
        setSelectedFluency("");
        setMinCgpa(0.0);
        toast.success("Filters reset successfully");
    };

    // Filtered candidates calculation
    const filteredCandidates = applicants.filter(app => {
        // Search Query
        const fullName = `${app.personalInfo?.firstName || ''} ${app.personalInfo?.middleName || ''} ${app.personalInfo?.lastName || ''}`.toLowerCase();
        const faydaId = (app.personalInfo?.faydaId || '').toLowerCase();
        const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || faydaId.includes(searchQuery.toLowerCase());

        // Woreda Filter
        const matchesWoreda = !selectedWoreda || app.residency?.woreda === selectedWoreda;

        // Fluency Filter
        const matchesFluency = !selectedFluency || app.education?.sidaamuAfooProficiency === selectedFluency;

        // CGPA Filter
        const matchesCgpa = (app.education?.cgpa || 0) >= minCgpa;

        return matchesSearch && matchesWoreda && matchesFluency && matchesCgpa;
    });

    // Stats calculations
    const totalApplicantsCount = applicants.length;
    const fluentAfooCount = applicants.filter(app => 
        ['FLUENT', 'NATIVE'].includes(app.education?.sidaamuAfooProficiency?.toUpperCase())
    ).length;
    const uniqueWoredasCount = new Set(applicants.map(app => app.residency?.woreda).filter(Boolean)).size;

    // Excel (CSV) Export
    const handleExportCSV = () => {
        if (filteredCandidates.length === 0) {
            toast.error("No candidates matching active filters to export");
            return;
        }

        const headers = [
            "Tracking ID", "Full Name", "Fayda ID", "Email", "Phone", "Gender", 
            "Woreda", "Kebele", "House Number", "Edu Level", "Institution", 
            "Field of Study", "CGPA", "Experience Years", "Sidaamu Afoo Fluency", "Status"
        ];

        const csvRows = [headers.join(",")];

        filteredCandidates.forEach(app => {
            const fullName = `"${app.personalInfo?.firstName || ''} ${app.personalInfo?.middleName || ''} ${app.personalInfo?.lastName || ''}"`;
            const row = [
                app.trackingId || '',
                fullName,
                app.personalInfo?.faydaId || '',
                app.personalInfo?.email || '',
                app.personalInfo?.phone || '',
                app.personalInfo?.gender || '',
                `"${app.residency?.woreda || ''}"`,
                `"${app.residency?.kebele || ''}"`,
                `"${app.residency?.houseNumber || ''}"`,
                app.education?.level || '',
                `"${app.education?.institution || ''}"`,
                `"${app.education?.fieldOfStudy || ''}"`,
                app.education?.cgpa || 0,
                app.education?.experienceYears || 0,
                app.education?.sidaamuAfooProficiency || '',
                app.status || 'Pending'
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `smuc_applicants_export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Exported ${filteredCandidates.length} records successfully.`);
    };

    // Update status handler
    const handleUpdateStatus = async (candidateId, newStatus) => {
        setIsUpdatingStatus(true);
        try {
            const res = await axios.put(`http://localhost:5000/api/applications/${candidateId}/status`, { status: newStatus });
            if (res.data.success) {
                toast.success(`Status updated to ${newStatus}`);
                
                // Update local state
                setApplicants(prev => prev.map(app => app._id === candidateId ? { ...app, status: newStatus } : app));
                
                // Update selected candidate detail modal if open
                if (selectedCandidate && selectedCandidate._id === candidateId) {
                    setSelectedCandidate(prev => ({ ...prev, status: newStatus }));
                }
            }
        } catch (err) {
            console.error("Error updating candidate status:", err);
            toast.error(err.response?.data?.message || "Failed to update candidate status");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const getStatusStyle = (status) => {
        switch(status?.toUpperCase()) {
            case 'ACCEPTED':
                return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            case 'REJECTED':
                return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
            case 'REVIEWED':
                return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            default:
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        }
    };

    // Helper to format document path safely for windows or linux host
    const getDocumentUrl = (path) => {
        if (!path) return '#';
        const normalized = path.replace(/\\/g, '/');
        return `http://localhost:5000/${normalized}`;
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
                                {systemMessage.type === 'success' ? '[SYSTEM INTEGRATION OK]' : '[SYSTEM PIPELINE LINK BREAK]'}
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
                        <p className="text-gray-400 font-medium">HR Staff Portal - Candidate Management</p>
                        <span className="text-gray-700">&bull;</span>
                        <button 
                            onClick={() => fetchApplicants(false)}
                            className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-500 hover:text-emerald-500 flex items-center gap-1.5 transition-colors group"
                        >
                            <RefreshCw size={10} className={`group-hover:rotate-180 transition-transform duration-500 ${isLoading ? 'animate-spin text-emerald-500' : ''}`} />
                            Sync Registry
                        </button>
                    </div>
                </div>

                {/* NAVIGATION ACTION BAR */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin-dashboard/manage-posts')}
                        className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
                    >
                        <Briefcase size={16} /> Manage Posts
                    </button>
                    <button
                        onClick={() => navigate('/admin-dashboard/create-job')}
                        className="bg-orange-600 hover:bg-orange-700 transition-all text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(234,88,12,0.15)]"
                    >
                        <Plus size={16} strokeWidth={3} /> Post New Job
                    </button>
                </div>
            </header>

            {/* TELEMETRY METRIC CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Applicants"
                    value={totalApplicantsCount}
                    subtext="Candidate files inside central index"
                    icon={Users}
                    isTrend={true}
                />
                <StatCard
                    title="Sidaamu Afoo Fluent"
                    value={fluentAfooCount}
                    subtext="Proficiency level: Fluent or Native"
                    icon={FileText}
                    isTrend={fluentAfooCount > 0}
                />
                <StatCard
                    title="Woreda Distribution"
                    value={uniqueWoredasCount}
                    subtext={`${uniqueWoredasCount} Active regional woredas`}
                    icon={MapPin}
                    isTrend={false}
                />
            </div>

            {/* DASHBOARD WORKSPACE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
                
                {/* FILTER SIDEBAR */}
                <aside className="lg:col-span-1 bg-[#0d1117] p-6 rounded-2xl border border-white/5 self-start">
                    <div className="flex items-center gap-2 mb-1">
                        <Filter className="text-emerald-500 w-5 h-5" />
                        <h3 className="text-xl font-bold text-white">Registry Filters</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-8">Refine applicant search</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">Filter by Woreda</label>
                            <select 
                                value={selectedWoreda}
                                onChange={(e) => setSelectedWoreda(e.target.value)}
                                className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-gray-300 focus:outline-none text-xs"
                            >
                                <option value="">All Woredas</option>
                                {uniqueWoredas.map(woreda => (
                                    <option key={woreda} value={woreda}>{woreda}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">Sidaamu Afoo Fluency</label>
                            <select 
                                value={selectedFluency}
                                onChange={(e) => setSelectedFluency(e.target.value)}
                                className="w-full bg-[#010409] border border-zinc-800 rounded-xl p-3 text-gray-300 focus:outline-none text-xs"
                            >
                                <option value="">All Levels</option>
                                <option value="BASIC">BASIC</option>
                                <option value="INTERMEDIATE">INTERMEDIATE</option>
                                <option value="FLUENT">FLUENT</option>
                                <option value="NATIVE">NATIVE</option>
                            </select>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-white text-xs font-bold uppercase tracking-wider">Min CGPA Threshold</label>
                                <span className="text-xs font-mono text-emerald-500 font-bold">{minCgpa.toFixed(1)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.0" 
                                max="4.0" 
                                step="0.1" 
                                value={minCgpa} 
                                onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
                                className="w-full accent-emerald-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <button 
                            onClick={handleResetFilters}
                            className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-bold py-3 rounded-xl transition-all mt-4 text-xs"
                        >
                            Reset Filters
                        </button>
                    </div>
                </aside>

                {/* MAIN TABLE CONTAINER */}
                <div className="lg:col-span-3 bg-[#0d1117] p-8 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Candidate Registry Index</h3>
                            <p className="text-gray-500 text-sm">Showing {filteredCandidates.length} of {applicants.length} applications</p>
                        </div>
                        <button 
                            onClick={handleExportCSV}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-md"
                        >
                            <FileSpreadsheet size={16} /> Export to Excel
                        </button>
                    </div>
                    
                    {/* SEARCH INPUT BAR */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search applicants by name or National ID (Fayda ID)..."
                            className="w-full bg-[#010409] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/30 text-sm"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="text-center py-12 flex flex-col items-center gap-3">
                                <RefreshCw className="animate-spin text-emerald-500 w-8 h-8" />
                                <p className="text-gray-500 text-sm font-mono uppercase tracking-wider">Syncing candidate profiles...</p>
                            </div>
                        ) : filteredCandidates.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-white/5 rounded-xl">
                                <Users className="mx-auto text-gray-600 mb-3" size={32} />
                                <p className="text-gray-500 text-sm">No candidates matching active filters found in the database.</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="text-gray-500 text-sm border-b border-white/5">
                                    <tr>
                                        <th className="pb-4 font-medium">Candidate Name</th>
                                        <th className="pb-4 font-medium">National ID</th>
                                        <th className="pb-4 font-medium">Woreda</th>
                                        <th className="pb-4 font-medium">Sidaamu Afoo</th>
                                        <th className="pb-4 font-medium">CGPA</th>
                                        <th className="pb-4 font-medium">Status</th>
                                        <th className="pb-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    {filteredCandidates.map((app) => {
                                        const fullName = `${app.personalInfo?.firstName || ''} ${app.personalInfo?.middleName || ''} ${app.personalInfo?.lastName || ''}`;
                                        
                                        return (
                                            <tr key={app._id} className="border-b border-white/5 hover:bg-emerald-900/5 transition-colors group">
                                                <td className="py-4 font-bold text-sm text-zinc-100">{fullName}</td>
                                                <td className="py-4 text-gray-400 font-mono text-xs">{app.personalInfo?.faydaId || '-'}</td>
                                                <td className="py-4 text-gray-400 text-xs">{app.residency?.woreda || '-'}</td>
                                                <td className="py-4">
                                                    <span className="bg-zinc-800 text-zinc-300 font-semibold px-2 py-0.5 rounded text-[10px]">
                                                        {app.education?.sidaamuAfooProficiency || '-'}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-gray-400 font-mono text-xs font-bold">{app.education?.cgpa?.toFixed(2) || '-'}</td>
                                                <td className="py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(app.status)}`}>
                                                        {app.status || 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button 
                                                        onClick={() => setSelectedCandidate(app)}
                                                        className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-all"
                                                    >
                                                        <Eye size={12} /> View
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

            {/* CANDIDATE DETAILS DIALOG MODAL */}
            {selectedCandidate && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-[#050c1a] border border-zinc-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in scale-in duration-300">
                        
                        {/* Modal Header */}
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                            <div>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase block mb-1">
                                    [Candidate Profile Vault - {selectedCandidate.trackingId || 'N/A'}]
                                </span>
                                <h3 className="text-xl font-extrabold text-white">
                                    {selectedCandidate.personalInfo?.firstName} {selectedCandidate.personalInfo?.middleName} {selectedCandidate.personalInfo?.lastName}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setSelectedCandidate(null)}
                                className="text-gray-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-xl transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
                            
                            {/* Relational Vacancy Link */}
                            <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-2xl flex justify-between items-center">
                                <div>
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Target Placement Registry:</span>
                                    <h4 className="font-bold text-emerald-400 text-sm mt-0.5">
                                        {selectedCandidate.jobId?.title || 'Relational Position'} 
                                    </h4>
                                    <p className="text-xs text-zinc-500">{selectedCandidate.jobId?.department || 'Directorate'}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Current Workflow:</span>
                                    <div className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${getStatusStyle(selectedCandidate.status)}`}>
                                            {selectedCandidate.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Info */}
                                <div className="bg-[#0d1117] border border-white/5 p-6 rounded-2xl">
                                    <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4 flex items-center gap-1.5">
                                        <User size={14} className="text-emerald-500" /> Personal Information
                                    </h4>
                                    <div className="space-y-3.5 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-500">Gender:</span>
                                            <span className="font-semibold text-zinc-200">{selectedCandidate.personalInfo?.gender || '-'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-500">National ID (Fayda):</span>
                                            <span className="font-mono font-bold text-emerald-500 bg-emerald-950/30 px-2.5 py-0.5 rounded text-xs tracking-wider">
                                                {selectedCandidate.personalInfo?.faydaId || '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-500">Email Address:</span>
                                            <span className="font-semibold text-zinc-200 flex items-center gap-1">
                                                <Mail size={12} className="text-zinc-600" /> {selectedCandidate.personalInfo?.email || '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-500">Phone Number:</span>
                                            <span className="font-semibold text-zinc-200 flex items-center gap-1">
                                                <Phone size={12} className="text-zinc-600" /> {selectedCandidate.personalInfo?.phone || '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Residency Info */}
                                <div className="bg-[#0d1117] border border-white/5 p-6 rounded-2xl">
                                    <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4 flex items-center gap-1.5">
                                        <MapPin size={14} className="text-emerald-500" /> Residency Context
                                    </h4>
                                    <div className="space-y-3.5 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-500">Region Context:</span>
                                            <span className="font-semibold text-zinc-200">Sidama Region</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-500">Woreda / Sub-City:</span>
                                            <span className="font-semibold text-zinc-200">{selectedCandidate.residency?.woreda || '-'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-500">Kebele Location:</span>
                                            <span className="font-semibold text-zinc-200">{selectedCandidate.residency?.kebele || '-'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-500">House Number / ID:</span>
                                            <span className="font-mono text-zinc-200">{selectedCandidate.residency?.houseNumber || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Academic & Professional Portfolio */}
                            <div className="bg-[#0d1117] border border-white/5 p-6 rounded-2xl">
                                <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4 flex items-center gap-1.5">
                                    <GraduationCap size={14} className="text-emerald-500" /> Academic & Professional Portfolio
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                                        <span className="text-zinc-500">Education Attainment:</span>
                                        <span className="font-bold text-zinc-200">{selectedCandidate.education?.level || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                                        <span className="text-zinc-500">Academic Institution:</span>
                                        <span className="font-semibold text-zinc-200">{selectedCandidate.education?.institution || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                                        <span className="text-zinc-500">Field of Study:</span>
                                        <span className="font-semibold text-zinc-200">{selectedCandidate.education?.fieldOfStudy || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                                        <span className="text-zinc-500">Cumulative GPA (CGPA):</span>
                                        <span className="font-mono font-bold text-emerald-500">{selectedCandidate.education?.cgpa?.toFixed(2) || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                                        <span className="text-zinc-500">Graduation Year:</span>
                                        <span className="font-mono text-zinc-200">{selectedCandidate.education?.graduationYear || '-'}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                                        <span className="text-zinc-500">Experience Background:</span>
                                        <span className="font-semibold text-zinc-200">{selectedCandidate.education?.experienceYears || 0} Years</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-zinc-800/40 md:col-span-2">
                                        <span className="text-zinc-500">Sidaamu Afoo Fluency:</span>
                                        <span className="font-bold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded text-xs">{selectedCandidate.education?.sidaamuAfooProficiency || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Vault */}
                            <div className="bg-[#0d1117] border border-white/5 p-6 rounded-2xl">
                                <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4 flex items-center gap-1.5">
                                    <FileText size={14} className="text-emerald-500" /> Document Vault - Credentials Verify
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <a 
                                        href={getDocumentUrl(selectedCandidate.documents?.cv)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-[#010409] hover:bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-rose-500" size={24} />
                                            <div className="text-left">
                                                <span className="font-bold text-xs text-zinc-200 block">Curriculum Vitae (CV)</span>
                                                <span className="text-[10px] text-zinc-500 font-mono">Verify applicant career log</span>
                                            </div>
                                        </div>
                                        <Download size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                                    </a>

                                    <a 
                                        href={getDocumentUrl(selectedCandidate.documents?.degreeCertificate)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-[#010409] hover:bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-blue-500" size={24} />
                                            <div className="text-left">
                                                <span className="font-bold text-xs text-zinc-200 block">Degree / Diploma Certificate</span>
                                                <span className="text-[10px] text-zinc-500 font-mono">Verify academic portfolio</span>
                                            </div>
                                        </div>
                                        <Download size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                                    </a>

                                    <a 
                                        href={getDocumentUrl(selectedCandidate.documents?.nationalIdCopy)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-[#010409] hover:bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-emerald-500" size={24} />
                                            <div className="text-left">
                                                <span className="font-bold text-xs text-zinc-200 block">Fayda National ID Copy</span>
                                                <span className="text-[10px] text-zinc-500 font-mono">Verify identity copy</span>
                                            </div>
                                        </div>
                                        <Download size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                                    </a>

                                    {selectedCandidate.documents?.otherCertificate ? (
                                        <a 
                                            href={getDocumentUrl(selectedCandidate.documents?.otherCertificate)} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-[#010409] hover:bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="text-amber-500" size={24} />
                                                <div className="text-left">
                                                    <span className="font-bold text-xs text-zinc-200 block">Other Supporting Certificate</span>
                                                    <span className="text-[10px] text-zinc-500 font-mono">Additional training certifications</span>
                                                </div>
                                            </div>
                                            <Download size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                                        </a>
                                    ) : (
                                        <div className="border border-dashed border-zinc-800 p-4 rounded-xl flex items-center justify-center text-zinc-600 text-xs font-mono">
                                            No additional supporting documents provided.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer / Review Controls */}
                        <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span className="text-xs text-zinc-500 font-mono uppercase">
                                Action workflow checklist:
                            </span>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    disabled={isUpdatingStatus}
                                    onClick={() => handleUpdateStatus(selectedCandidate._id, 'Reviewed')}
                                    className="flex-1 sm:flex-initial bg-blue-900/40 text-blue-400 hover:bg-blue-950 border border-blue-900/50 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wide transition-all disabled:opacity-50"
                                >
                                    Mark Reviewed
                                </button>
                                <button
                                    disabled={isUpdatingStatus}
                                    onClick={() => handleUpdateStatus(selectedCandidate._id, 'Rejected')}
                                    className="flex-1 sm:flex-initial bg-rose-950/40 text-rose-400 hover:bg-rose-900 hover:text-white border border-rose-500/20 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                                >
                                    <XCircle size={14} /> Reject
                                </button>
                                <button
                                    disabled={isUpdatingStatus}
                                    onClick={() => handleUpdateStatus(selectedCandidate._id, 'Accepted')}
                                    className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_20px_rgba(16,185,129,0.15)] disabled:opacity-50"
                                >
                                    <Check size={14} strokeWidth={3} /> Accept Candidate
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default CandidateDashboard;
