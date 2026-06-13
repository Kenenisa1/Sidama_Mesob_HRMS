import React, { useEffect, useMemo, useState } from 'react';
import { Users, MessageCircle, Search, FileText, RefreshCw, Briefcase } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Standardized modern toast controller

import ApplicantDetailsModal from '../../components/ApplicantDetailsModal';
import CandidateRow from '../../components/admin/CandidateRow';
import RegistryFilters from '../../components/admin/RegistryFilters';
import VacancyControlTab from './VacancyControlTab';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// StatCard Component
const StatCard = ({ title, value, subtext, icon: Icon, isTrend }) => (
  <div className="bg-cardBg border border-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/10">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{title}</h3>
      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-emeraldAccent">
        <Icon size={15} />
      </div>
    </div>
    <h2 className="text-3xl font-black text-white tracking-tight mb-1">{value}</h2>
    <p className={`text-[10px] font-mono uppercase tracking-wider ${isTrend ? 'text-emeraldAccent font-bold' : 'text-zinc-500'}`}>
      {subtext}
    </p>
  </div>
);

function AdminPortal() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('applicants'); // 'applicants' | 'vacancies'
  
  // Application states
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWoreda, setSelectedWoreda] = useState('');
  const [selectedFluency, setSelectedFluency] = useState('');
  const [minCgpa, setMinCgpa] = useState(2);
  
  // Modal states
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedApplicationData, setSelectedApplicationData] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  // Job states
  const [jobsList, setJobsList] = useState([]);
  const [liveJobsCount, setLiveJobsCount] = useState(0);
  const [isTestingSync, setIsTestingSync] = useState(false);

  // Fetch applications
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
      setError(err.message || 'System offline');
      toast.error("Failed to load applicants list");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch jobs
  const verifyDatabasePipeline = async (quiet = false) => {
    if (!quiet) setIsTestingSync(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/jobs`);
      const jobsArray = Array.isArray(res.data) ? res.data : res.data.jobs || [];
      setJobsList(jobsArray);
      setLiveJobsCount(jobsArray.length);
      if (!quiet) {
        toast.success(`Refreshed: ${jobsArray.length} jobs found.`);
      }
    } catch (err) {
      console.error(err);
      if (!quiet) {
        toast.error("Failed to connect to the server");
      }
    } finally {
      if (!quiet) setIsTestingSync(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    verifyDatabasePipeline(true);
  }, []);

  // View application details
  const handleViewApplication = async (app) => {
    if (app && app._id) {
      try {
        setIsLoadingDetails(true);
        setDetailsError('');
        setIsDetailsOpen(true);
        
        const response = await fetch(`${API_BASE_URL}/api/applications/${app._id}`);
        const result = await response.json();
        if (!response.ok || result.success === false) {
          throw new Error(result.message || 'Could not load applicant details');
        }
        setSelectedApplicationData(result.data);
      } catch (err) {
        setDetailsError(err.message);
        setSelectedApplicationData(app);
      } finally {
        setIsLoadingDetails(false);
      }
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedApplicationData(null);
    setDetailsError('');
  };

  const handleStatusChanged = () => {
    fetchApplications();
    handleCloseDetails();
  };

  // Job mutations
  const handleUpdateJobSpecs = async (jobId, updatedPayload) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/jobs/${jobId}`, updatedPayload);
      if (res.data) {
        toast.success("Job details updated successfully");
        verifyDatabasePipeline(true); 
        return true;
      }
    } catch {
      toast.error("Failed to update job details");
      return false;
    }
  };

  const handleDeleteJobRecord = async (jobId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${jobId}`);
      toast.success("Job deleted successfully");
      verifyDatabasePipeline(true);
      return true;
    } catch {
      toast.error("Failed to delete job");
      return false;
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'Accepted' || status === 'Shortlisted') {
      return 'bg-emerald-950/40 text-emeraldAccent border-emerald-500/20';
    }
    if (status === 'Rejected') {
      return 'bg-rose-950/40 text-rose-400 border-rose-500/20';
    }
    if (status === 'Reviewed') {
      return 'bg-blue-950/40 text-blue-400 border-blue-500/20';
    }
    return 'bg-amber-950/40 text-amber-500 border-amber-500/20';
  };

  // Computed values
  const woredas = useMemo(() => {
    return [...new Set(applications.map((app) => app.residency?.woreda).filter(Boolean))].sort();
  }, [applications]);

  const fluencyLevels = useMemo(() => {
    return [...new Set(applications.map((app) => app.education?.sidaamuAfooProficiency || app.education?.sidaamuAfoo || app.sidaamuAfoo).filter(Boolean))].sort();
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return applications.filter((app) => {
      const first = app.personalInfo?.firstName || '';
      const middle = app.personalInfo?.middleName || '';
      const last = app.personalInfo?.lastName || '';
      const fullName = `${first} ${middle} ${last}`.toLowerCase();
      
      const nationalId = app.personalInfo?.faydaId?.toLowerCase() || '';
      const woreda = app.residency?.woreda || '';
      const fluency = app.education?.sidaamuAfooProficiency || app.education?.sidaamuAfoo || app.sidaamuAfoo || '';
      const cgpa = Number(app.education?.cgpa || 0);
      
      const matchesSearch = !query || fullName.includes(query) || nationalId.includes(query);
      const matchesWoreda = !selectedWoreda || woreda === selectedWoreda;
      const matchesFluency = !selectedFluency || fluency === selectedFluency;
      const matchesCgpa = cgpa >= Number(minCgpa);
      
      return matchesSearch && matchesWoreda && matchesFluency && matchesCgpa;
    });
  }, [applications, minCgpa, searchTerm, selectedFluency, selectedWoreda]);

  const fluentCount = useMemo(() => {
    return applications.filter((app) => {
      const fluency = app.education?.sidaamuAfooProficiency || app.education?.sidaamuAfoo || app.sidaamuAfoo || '';
      return ['Fluent', 'Native', 'High'].includes(fluency);
    }).length;
  }, [applications]);

  const fluentPercent = applications.length ? Math.round((fluentCount / applications.length) * 100) : 0;

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedWoreda('');
    setSelectedFluency('');
    setMinCgpa(2);
  };

  const exportToExcel = () => {
    if (filteredApplications.length === 0) return;
    
    const rows = filteredApplications.map((app) => ({
      Name: `${app.personalInfo?.firstName || ''} ${app.personalInfo?.middleName || ''} ${app.personalInfo?.lastName || ''}`.trim(),
      'National ID': app.personalInfo?.faydaId || '',
      Woreda: app.residency?.woreda || '',
      'Sidaamu Afoo Fluency': app.education?.sidaamuAfooProficiency || app.education?.sidaamuAfoo || app.sidaamuAfoo || '',
      CGPA: app.education?.cgpa ?? '',
      Status: app.status || 'Pending',
    }));
    
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(','),
      ...rows.map((row) => headers.map((header) => `"${String(row[header]).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hawassa_pulse_applicants.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-darkBg p-6 md:p-12 relative antialiased selection:bg-emeraldAccent selection:text-black">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">Admin Dashboard</h1>
          <div className="flex items-center gap-3 mt-1 text-xs font-medium">
            <p className="text-zinc-400">Sidama MESOB HRMS</p>
            <span className="text-zinc-700">&bull;</span>
            <button 
              onClick={() => verifyDatabasePipeline(false)}
              className="uppercase font-mono tracking-wider text-zinc-500 hover:text-emeraldAccent flex items-center gap-1.5 transition-colors group"
            >
              <RefreshCw size={10} className={`group-hover:rotate-180 transition-transform duration-500 ${isTestingSync ? 'animate-spin text-emeraldAccent' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('applicants')}
            className={`flex-1 md:flex-initial px-4 py-2 font-bold uppercase tracking-wider text-[10px] rounded-lg transition-all flex items-center justify-center gap-2
              ${activeTab === 'applicants' ? 'bg-zinc-900 text-emeraldAccent border border-white/5 shadow-md' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <Users size={12} /> Applicants
          </button>
          <button
            onClick={() => setActiveTab('vacancies')}
            className={`flex-1 md:flex-initial px-4 py-2 font-bold uppercase tracking-wider text-[10px] rounded-lg transition-all flex items-center justify-center gap-2
              ${activeTab === 'vacancies' ? 'bg-zinc-900 text-emeraldAccent border border-white/5 shadow-md' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <Briefcase size={12} /> Manage Jobs
          </button>
        </div>
      </header>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Applicants" value={isLoading ? '...' : applications.length} subtext={error ? 'Offline' : 'Total applications received'} icon={Users} isTrend={!error} />
        <StatCard title="Sidaamu Afoo Fluent" value={isLoading ? '...' : fluentCount} subtext={`${fluentPercent}% fluent applicants`} icon={MessageCircle} isTrend={false} />
        <StatCard title="Active Jobs" value={liveJobsCount} subtext="Jobs currently open" icon={Briefcase} isTrend={liveJobsCount > 0} />
      </div>

      {/* Main Content View */}
      {activeTab === 'applicants' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-200">
          <RegistryFilters 
            selectedWoreda={selectedWoreda} setSelectedWoreda={setSelectedWoreda} woredas={woredas}
            selectedFluency={selectedFluency} setSelectedFluency={setSelectedFluency} fluencyLevels={fluencyLevels}
            minCgpa={minCgpa} setMinCgpa={setMinCgpa} resetFilters={resetFilters}
          />

          <div className="lg:col-span-3 bg-cardBg p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-white">Applicants List</h3>
                <p className="text-zinc-500 text-xs font-mono mt-0.5">Showing {filteredApplications.length} applicants</p>
              </div>
              <button
                onClick={exportToExcel}
                disabled={filteredApplications.length === 0}
                className="flex items-center gap-2 bg-white hover:bg-zinc-100 disabled:opacity-40 text-emerald-950 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 w-full sm:w-auto justify-center"
              >
                <FileText size={15} /> Save Report (.CSV)
              </button>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Name or Kebele ID..."
                className="w-full bg-darkBg border border-white/5 rounded-xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-emeraldAccent/30 placeholder:text-zinc-600 transition-colors"
              />
            </div>
            
            {error && (
              <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs font-mono font-bold text-rose-400">
                {error}
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4 pl-4"><input type="checkbox" className="accent-emeraldAccent w-4 h-4 rounded bg-darkBg border-white/10" /></th>
                    <th className="pb-4 font-bold">Candidate Name</th>
                    <th className="pb-4 font-bold">Kebele ID</th>
                    <th className="pb-4 font-bold">Woreda</th>
                    <th className="pb-4 font-bold">Sidaamu Afoo</th>
                    <th className="pb-4 font-bold">CGPA</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {isLoading ? (
                    <tr>
                      <td className="py-12 text-center text-xs font-mono text-zinc-500" colSpan="8">
                        <div className="w-4 h-4 border-2 border-emeraldAccent/20 border-t-emeraldAccent rounded-full animate-spin mx-auto mb-2" />
                        Loading applicants...
                      </td>
                    </tr>
                  ) : filteredApplications.length === 0 ? (
                    <tr>
                      <td className="py-12 text-center text-xs font-mono text-zinc-500" colSpan="8">
                        No applicants found.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((application) => (
                      <CandidateRow
                        key={application._id || application.trackingId}
                        app={application}
                        onView={handleViewApplication}
                        getStatusStyle={getStatusStyle}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Job Vacancies View */}
          <VacancyControlTab 
            jobsList={jobsList}
            onRefreshJobs={() => verifyDatabasePipeline(false)}
            onUpdateJobStatus={handleUpdateJobSpecs}
            onDeleteJob={handleDeleteJobRecord}
          />
        </div>
      )}
      
      {/* Modals */}
      <ApplicantDetailsModal
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        application={selectedApplicationData}
        isLoading={isLoadingDetails}
        error={detailsError}
        onStatusChange={handleStatusChanged}
      />
    </div>
  );
}

export default AdminPortal;