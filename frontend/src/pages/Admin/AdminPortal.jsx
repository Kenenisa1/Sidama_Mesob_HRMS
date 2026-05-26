<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Users, MessageCircle, MapPin, Filter, Search, FileText, Eye } from 'lucide-react';
import JobModal from '../../components/JobModal';
import ApplicantDetailsModal from '../../components/ApplicantDetailsModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
=======
import React, { useState, useEffect } from 'react'; 
import { Plus, Users, MapPin, Filter, Search, FileText, Eye, AlertCircle, RefreshCw, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 🛠️ ADDED FOR CLEAN PAGE ROUTING
import axios from 'axios';
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114

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

<<<<<<< HEAD
const getCandidateName = (application) => {
    const personalInfo = application.personalInfo || {};
    return [personalInfo.firstName, personalInfo.middleName, personalInfo.lastName]
        .filter(Boolean)
        .join(' ') || 'Unknown Applicant';
};

const getSidaamuAfoo = (application) => application.education?.sidaamuAfoo || application.sidaamuAfoo || 'Not set';

const getStatusClass = (status) => {
    if (status === 'Accepted' || status === 'Shortlisted') {
        return 'bg-emerald-500/10 text-emeraldAccent border-emerald-500/20';
    }

    if (status === 'Rejected') {
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    }

    if (status === 'Reviewed') {
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    }

    return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
};

function AdminPortal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWoreda, setSelectedWoreda] = useState('');
    const [selectedFluency, setSelectedFluency] = useState('');
    const [minCgpa, setMinCgpa] = useState(2);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [selectedApplicationData, setSelectedApplicationData] = useState(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setIsLoading(true);
                setError('');

                const response = await fetch(`${API_BASE_URL}/api/applications`);
                const result = await response.json();

                if (!response.ok || result.success === false) {
                    throw new Error(result.message || 'Could not fetch applications');
                }

                setApplications(Array.isArray(result.data) ? result.data : []);
            } catch (err) {
                setError(err.message || 'Could not connect to the backend');
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleViewApplication = async (applicationId) => {
        try {
            setIsLoadingDetails(true);
            setDetailsError('');

            const response = await fetch(`${API_BASE_URL}/api/applications/${applicationId}`);
            const result = await response.json();

            if (!response.ok || result.success === false) {
                throw new Error(result.message || 'Could not fetch application details');
            }

            setSelectedApplicationData(result.data);
            setIsDetailsOpen(true);
        } catch (err) {
            setDetailsError(err.message || 'Could not load application details');
            setIsDetailsOpen(true);
        } finally {
            setIsLoadingDetails(false);
        }
    };

    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
        setSelectedApplicationId(null);
        setSelectedApplicationData(null);
        setDetailsError('');
    };

    const handleStatusChanged = () => {
        const fetchUpdatedApplications = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/applications`);
                const result = await response.json();

                if (response.ok && result.success) {
                    setApplications(Array.isArray(result.data) ? result.data : []);
                }
                handleCloseDetails();
            } catch (err) {
                console.error('Failed to refresh applications:', err);
            }
        };

        fetchUpdatedApplications();
    };

    const woredas = useMemo(() => {
        return [...new Set(applications.map((application) => application.residency?.woreda).filter(Boolean))].sort();
    }, [applications]);

    const fluencyLevels = useMemo(() => {
        return [...new Set(applications.map(getSidaamuAfoo).filter((level) => level !== 'Not set'))].sort();
    }, [applications]);

    const filteredApplications = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return applications.filter((application) => {
            const name = getCandidateName(application).toLowerCase();
            const nationalId = application.personalInfo?.faydaId?.toLowerCase() || '';
            const woreda = application.residency?.woreda || '';
            const fluency = getSidaamuAfoo(application);
            const cgpa = Number(application.education?.cgpa || 0);

            const matchesSearch = !query || name.includes(query) || nationalId.includes(query);
            const matchesWoreda = !selectedWoreda || woreda === selectedWoreda;
            const matchesFluency = !selectedFluency || fluency === selectedFluency;
            const matchesCgpa = cgpa >= Number(minCgpa);

            return matchesSearch && matchesWoreda && matchesFluency && matchesCgpa;
        });
    }, [applications, minCgpa, searchTerm, selectedFluency, selectedWoreda]);

    const fluentCount = useMemo(() => {
        return applications.filter((application) => ['Fluent', 'Native', 'High'].includes(getSidaamuAfoo(application))).length;
    }, [applications]);

    const fluentPercent = applications.length ? Math.round((fluentCount / applications.length) * 100) : 0;

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedWoreda('');
        setSelectedFluency('');
        setMinCgpa(2);
    };

    const exportToExcel = () => {
        const rows = filteredApplications.map((application) => ({
            Name: getCandidateName(application),
            'National ID': application.personalInfo?.faydaId || '',
            Woreda: application.residency?.woreda || '',
            'Sidaamu Afoo': getSidaamuAfoo(application),
            CGPA: application.education?.cgpa ?? '',
            Status: application.status || 'Pending',
        }));

        const headers = Object.keys(rows[0] || {
            Name: '',
            'National ID': '',
            Woreda: '',
            'Sidaamu Afoo': '',
            CGPA: '',
            Status: '',
        });
        const csv = [
            headers.join(','),
            ...rows.map((row) => headers.map((header) => `"${String(row[header]).replace(/"/g, '""')}"`).join(',')),
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sidama-applicants.csv';
        link.click();
        URL.revokeObjectURL(url);
    };
=======
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
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114

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
<<<<<<< HEAD
                    title="Total Applicants"
                    value={isLoading ? '...' : applications.length}
                    subtext={error ? 'Backend unavailable' : 'Live from applications API'}
=======
                    title="Total Applicants Logs"
                    value="8"
                    subtext="Candidate files inside central index"
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114
                    icon={Users}
                    isTrend={!error}
                />
                <StatCard
<<<<<<< HEAD
                    title="Sidaamu Afoo Fluent"
                    value={isLoading ? '...' : fluentCount}
                    subtext={`${fluentPercent}% of total applicants`}
                    icon={MessageCircle}
                    isTrend={false}
                />
                <StatCard
                    title="Woreda Distribution"
                    value={isLoading ? '...' : woredas.length}
                    subtext={`${woredas.length} Woredas represented`}
=======
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
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114
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
<<<<<<< HEAD
                            <label className="block text-white text-sm font-semibold mb-2">Filter by Woreda</label>
                            <select
                                value={selectedWoreda}
                                onChange={(event) => setSelectedWoreda(event.target.value)}
                                className="w-full bg-darkBg border border-emerald-900/20 rounded-xl p-3 text-gray-400 focus:outline-none"
                            >
                                <option value="">All Woredas</option>
                                {woredas.map((woreda) => (
                                    <option key={woreda} value={woreda}>{woreda}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">Sidaamu Afoo Fluency</label>
                            <select
                                value={selectedFluency}
                                onChange={(event) => setSelectedFluency(event.target.value)}
                                className="w-full bg-darkBg border border-emerald-900/20 rounded-xl p-3 text-gray-400 focus:outline-none"
                            >
                                <option value="">All Levels</option>
                                {fluencyLevels.map((level) => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-white text-sm font-semibold">Minimum CGPA: {Number(minCgpa).toFixed(1)}</label>
                            </div>
                            <input
                                type="range"
                                value={minCgpa}
                                onChange={(event) => setMinCgpa(event.target.value)}
                                className="w-full accent-emeraldAccent bg-darkBg h-1.5 rounded-lg appearance-none cursor-pointer"
                                min="2.0"
                                max="4.0"
                                step="0.1"
                            />
                            <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-bold">
                                <span>2.0</span>
                                <span>4.0</span>
                            </div>
                        </div>
                        <button
                            onClick={resetFilters}
                            className="w-full bg-white text-emerald-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all mt-4"
                        >
=======
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
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114
                            Reset Filters
                        </button>
                    </div>
                </aside>

                <div className="lg:col-span-3 bg-cardBg p-8 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-6">
                        <div>
<<<<<<< HEAD
                            <h3 className="text-2xl font-bold text-white">Candidate List</h3>
                            <p className="text-gray-500">Showing {filteredApplications.length} of {applications.length} applicants</p>
                        </div>
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-bold text-sm"
                        >
                            <FileText size={18} /> Export to Excel
=======
                            <h3 className="text-2xl font-bold text-white">Active Vacancies Registry</h3>
                            <p className="text-gray-500">Showing {filteredJobs.length} of {liveJobsCount} deployed positions</p>
                        </div>
                        <button className="flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-bold text-sm">
                            <FileText size={18} /> Export Index
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114
                        </button>
                    </div>
                    
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
<<<<<<< HEAD
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search by name or National ID..."
                            className="w-full bg-darkBg border border-emerald-900/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emeraldAccent/30"
                        />
                    </div>
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-300">
                            {error}
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-gray-500 text-sm border-b border-white/5">
                                <tr>
                                    <th className="pb-4"><input type="checkbox" className="accent-emeraldAccent w-4 h-4" /></th>
                                    <th className="pb-4 font-medium">Name</th>
                                    <th className="pb-4 font-medium">National ID</th>
                                    <th className="pb-4 font-medium">Woreda</th>
                                    <th className="pb-4 font-medium">Sidaamu Afoo</th>
                                    <th className="pb-4 font-medium">CGPA</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {isLoading && (
                                    <tr>
                                        <td className="py-8 text-center text-gray-400" colSpan="8">Loading applicants...</td>
                                    </tr>
                                )}
                                {!isLoading && filteredApplications.length === 0 && (
                                    <tr>
                                        <td className="py-8 text-center text-gray-400" colSpan="8">No applicants match your filters.</td>
                                    </tr>
                                )}
                                {!isLoading && filteredApplications.map((application) => {
                                    const candidateName = getCandidateName(application);
                                    const status = application.status || 'Pending';

                                    return (
                                        <tr key={application._id || application.trackingId} className="border-b border-white/5 hover:bg-emerald-900/5 transition-colors group">
                                            <td className="py-4"><input type="checkbox" className="accent-emeraldAccent w-4 h-4" /></td>
                                            <td className="py-4 font-bold">{candidateName}</td>
                                            <td className="py-4 text-gray-400">{application.personalInfo?.faydaId || 'N/A'}</td>
                                            <td className="py-4 text-gray-400">{application.residency?.woreda || 'N/A'}</td>
                                            <td className="py-4"><span className="bg-emerald-500/10 text-emeraldAccent px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">{getSidaamuAfoo(application)}</span></td>
                                            <td className="py-4 font-bold">{application.education?.cgpa ?? 'N/A'}</td>
                                            <td className="py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusClass(status)}`}>{status}</span></td>
                                            <td className="py-4">
                                                <button
                                                    onClick={() => handleViewApplication(application._id)}
                                                    className="flex items-center gap-1 text-emeraldAccent hover:underline font-bold text-sm"
                                                >
                                                    <Eye size={16} /> View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <JobModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <ApplicantDetailsModal
                isOpen={isDetailsOpen}
                onClose={handleCloseDetails}
                application={selectedApplicationData}
                isLoading={isLoadingDetails}
                error={detailsError}
                onStatusChange={handleStatusChanged}
            />
=======
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
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114
        </div>
    );
}

export default AdminPortal;
