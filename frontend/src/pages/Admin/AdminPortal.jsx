import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  MessageCircle,
  Search,
  FileText,
  RefreshCw,
  Briefcase,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Standardized modern toast controller

import ApplicantDetailsModal from "../../components/admin/ApplicantDetailsModal";
import CandidateRow from "../../components/admin/CandidateRow";
import RegistryFilters from "../../components/admin/RegistryFilters";
import VacancyControlTab from "./VacancyControlTab";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// StatCard Component
const StatCard = ({ title, value, subtext, icon: Icon, isTrend }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all duration-300 hover:border-oled-green/40 hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 text-[11px] font-extrabold uppercase tracking-widest">
        {title}
      </h3>
      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-oled-green">
        <Icon size={18} />
      </div>
    </div>
    <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
      {value}
    </h2>
    <p
      className={`text-[11px] font-mono uppercase tracking-wider ${isTrend ? "text-oled-green font-bold" : "text-gray-500 font-semibold"}`}
    >
      {subtext}
    </p>
  </div>
);

function AdminPortal() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("applicants"); // 'applicants' | 'vacancies'

  // Application states
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minExperience, setMinExperience] = useState(0);
  const [minCgpa, setMinCgpa] = useState(2);

  // Modal states
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedApplicationData, setSelectedApplicationData] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  // Job states
  const [jobsList, setJobsList] = useState([]);
  const [liveJobsCount, setLiveJobsCount] = useState(0);
  const [isTestingSync, setIsTestingSync] = useState(false);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/applications`);
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Could not fetch applications");
      }
      setApplications(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err.message || "System offline");
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
      const jobsArray = Array.isArray(res.data)
        ? res.data
        : res.data.jobs || [];
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

  const handleGlobalRefresh = async () => {
    setIsTestingSync(true);
    try {
      await fetchApplications();
      await verifyDatabasePipeline(true);
      toast.success("Refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh some modules");
    } finally {
      setIsTestingSync(false);
    }
  };

  // View application details
  const handleViewApplication = async (app) => {
    if (app && app._id) {
      try {
        setIsLoadingDetails(true);
        setDetailsError("");
        setIsDetailsOpen(true);

        const response = await fetch(
          `${API_BASE_URL}/api/applications/${app._id}`,
        );
        const result = await response.json();
        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Could not load applicant details");
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
    setDetailsError("");
  };

  const handleStatusChanged = () => {
    fetchApplications();
    handleCloseDetails();
  };

  // Job mutations
  const handleUpdateJobSpecs = async (jobId, updatedPayload) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/jobs/${jobId}`,
        updatedPayload,
      );
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
    if (status === "Accepted" || status === "Shortlisted") {
      return "bg-emerald-950/40 text-emeraldAccent border-emerald-500/20";
    }
    if (status === "Rejected") {
      return "bg-rose-950/40 text-rose-400 border-rose-500/20";
    }
    if (status === "Reviewed") {
      return "bg-blue-950/40 text-blue-400 border-blue-500/20";
    }
    return "bg-amber-950/40 text-amber-500 border-amber-500/20";
  };

  // Computed values
  const filteredApplications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return applications.filter((app) => {
      const first = app.personalInfo?.firstName || "";
      const middle = app.personalInfo?.middleName || "";
      const last = app.personalInfo?.lastName || "";
      const fullName = `${first} ${middle} ${last}`.toLowerCase();

      const nationalId = app.personalInfo?.faydaId?.toLowerCase() || "";
      const cgpa = Number(app.education?.cgpa || 0);
      const exp = Number(app.experience || app.education?.experience || 0);

      const matchesSearch =
        !query || fullName.includes(query) || nationalId.includes(query);
      const matchesExperience = exp >= Number(minExperience);
      const matchesCgpa = cgpa >= Number(minCgpa);

      return matchesSearch && matchesExperience && matchesCgpa;
    });
  }, [applications, minCgpa, searchTerm, minExperience]);

  const fluentCount = useMemo(() => {
    return applications.filter((app) => {
      const fluency =
        app.education?.sidaamuAfooProficiency ||
        app.education?.sidaamuAfoo ||
        app.sidaamuAfoo ||
        "";
      return ["Fluent", "Native", "High"].includes(fluency);
    }).length;
  }, [applications]);

  const fluentPercent = applications.length
    ? Math.round((fluentCount / applications.length) * 100)
    : 0;

  const resetFilters = () => {
    setSearchTerm("");
    setMinExperience(0);
    setMinCgpa(2);
  };

  const exportToExcel = () => {
    if (filteredApplications.length === 0) return;

    const rows = filteredApplications.map((app) => ({
      Name: `${app.personalInfo?.firstName || ""} ${app.personalInfo?.middleName || ""} ${app.personalInfo?.lastName || ""}`.trim(),
      "National ID": app.personalInfo?.faydaId || "",
      "Years of Experience": app.experience || app.education?.experience || 0,
      CGPA: app.education?.cgpa ?? "",
      Status: app.status || "Pending",
    }));

    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => `"${String(row[header]).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hawassa_pulse_applicants.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] px-6 py-4 md:px-12 md:py-8 relative antialiased selection:bg-oled-green/20 selection:text-gray-900 overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-oled-green/10 blur-[120px] mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[60vw] rounded-full bg-emerald-300/10 blur-[100px] mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[40vw] rounded-full bg-green-200/20 blur-[120px] mix-blend-multiply animate-[pulse_12s_ease-in-out_infinite_alternate-reverse]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-gradient-to-r from-[#031d10] via-oled-dark to-oled-green p-6 md:p-8 rounded-3xl shadow-[0_15px_40px_rgba(16,185,129,0.2)]">
          <div>
            <h1 className="text-3xl font-black text-emerald-50 tracking-tight uppercase drop-shadow-sm">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm font-bold text-emerald-200/80">
            <p className="text-emerald-200">
              SidaMOV (Sidama Mesob Online Vacancy)
            </p>
            <span className="text-emerald-500/50">&bull;</span>
            <button
              onClick={handleGlobalRefresh}
              className="uppercase font-mono tracking-widest text-emerald-100 hover:text-white flex items-center gap-1.5 transition-all group hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.8)] bg-emerald-900/30 hover:bg-emerald-800/40 px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-sm backdrop-blur-md"
            >
              <RefreshCw
                size={14}
                className={`group-hover:rotate-180 transition-transform duration-500 ${isTestingSync ? "animate-spin text-emerald-300" : "text-emerald-400"}`}
              />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex bg-emerald-950/40 backdrop-blur-md p-1.5 rounded-xl border border-emerald-500/20 shadow-sm self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab("applicants")}
            className={`flex-1 md:flex-initial px-5 py-2.5 font-extrabold uppercase tracking-widest text-[11px] rounded-lg transition-all flex items-center justify-center gap-2
              ${activeTab === "applicants" ? "bg-emerald-400 text-[#031d10] shadow-[0_4px_15px_rgba(52,211,153,0.3)]" : "text-emerald-200 hover:text-white hover:bg-emerald-800/50"}`}
          >
            <Users size={14} /> Applicants
          </button>
          <button
            onClick={() => setActiveTab("vacancies")}
            className={`flex-1 md:flex-initial px-5 py-2.5 font-extrabold uppercase tracking-widest text-[11px] rounded-lg transition-all flex items-center justify-center gap-2
              ${activeTab === "vacancies" ? "bg-emerald-400 text-[#031d10] shadow-[0_4px_15px_rgba(52,211,153,0.3)]" : "text-emerald-200 hover:text-white hover:bg-emerald-800/50"}`}
          >
            <Briefcase size={14} /> Manage Jobs
          </button>
        </div>
      </header>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <StatCard
          title="Total Applicants"
          value={isLoading ? "..." : applications.length}
          subtext={error ? "Offline" : "Total applications received"}
          icon={Users}
          isTrend={!error}
        />
        <StatCard
          title="Active Jobs"
          value={liveJobsCount}
          subtext="Jobs currently open"
          icon={Briefcase}
          isTrend={liveJobsCount > 0}
        />
      </div>

      {/* Main Content View */}
      {activeTab === "applicants" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-200">
          <RegistryFilters
            minExperience={minExperience}
            setMinExperience={setMinExperience}
            minCgpa={minCgpa}
            setMinCgpa={setMinCgpa}
            resetFilters={resetFilters}
          />

          <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-black text-oled-dark tracking-tight">
                  Applicants List
                </h3>
                <p className="text-gray-500 text-sm font-mono mt-1 font-semibold">
                  Showing {filteredApplications.length} applicants
                </p>
              </div>
              <button
                onClick={exportToExcel}
                disabled={filteredApplications.length === 0}
                className="flex items-center gap-2 bg-white hover:bg-oled-green/5 border border-gray-200 hover:border-oled-green/40 disabled:opacity-40 text-gray-700 hover:text-oled-dark px-5 py-3 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] active:scale-95 w-full sm:w-auto justify-center"
              >
                <FileText size={16} className="text-oled-green" /> Save Report (.CSV)
              </button>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Name or Kebele ID..."
                className="w-full bg-white border border-gray-300 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-oled-green focus:ring-1 focus:ring-oled-green placeholder:text-gray-400 transition-colors shadow-sm"
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
                  <tr className="text-gray-500 text-[11px] font-extrabold font-mono uppercase tracking-widest border-b border-gray-200">
                    <th className="pb-4 pl-4">
                      <input
                        type="checkbox"
                        className="accent-oled-green w-4 h-4 rounded border-gray-300"
                      />
                    </th>
                    <th className="pb-4">Candidate Name</th>
                    <th className="pb-4">Kebele ID</th>
                    <th className="pb-4">Experience</th>
                    <th className="pb-4">CGPA</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td
                        className="py-12 text-center text-xs font-mono text-zinc-500"
                        colSpan="8"
                      >
                        <div className="w-4 h-4 border-2 border-emeraldAccent/20 border-t-emeraldAccent rounded-full animate-spin mx-auto mb-2" />
                        Loading applicants...
                      </td>
                    </tr>
                  ) : filteredApplications.length === 0 ? (
                    <tr>
                      <td
                        className="py-12 text-center text-xs font-mono text-zinc-500"
                        colSpan="8"
                      >
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
            onRefreshJobs={handleGlobalRefresh}
            onUpdateJobStatus={handleUpdateJobSpecs}
            onDeleteJob={handleDeleteJobRecord}
          />
        </div>
      )}

      {/* Modals */}
      {isDetailsOpen && selectedApplicationData && (
        <ApplicantDetailsModal
          applicant={selectedApplicationData}
          onClose={handleCloseDetails}
          onStatusUpdate={handleStatusChanged}
          isLoading={isLoadingDetails}
          error={detailsError}
        />
      )}
      </div>
    </div>
  );
}

export default AdminPortal;
