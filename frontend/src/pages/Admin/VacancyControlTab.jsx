import React, { useState } from "react";
import EditJobModal from "../../components/admin/EditJobModal";
import DeleteJobModal from "../../components/admin/DeleteJobModal";
import CreateJob from "./CreateJob"; 
import { Plus } from "lucide-react";

function VacancyControlTab({ jobsList, onRefreshJobs, onDeleteJob }) {
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'delete' | 'create' | null
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const triggerModal = (job, type) => {
    setSelectedJob(job);
    setActiveModal(type);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setActiveModal(null);
  };

  const handleSyncPipeline = async () => {
    setIsSyncing(true);
    if (onRefreshJobs) {
      await onRefreshJobs();
    }
    setTimeout(() => setIsSyncing(false), 600);
  };

  return (
    <div className="space-y-6 z-10 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Vacancy Table Workspace Container */}
      <div className="bg-[#000000] p-6 md:p-8 rounded-2xl border border-zinc-900 shadow-[0_0_50px_-12px_rgba(16,185,129,0.05)] relative overflow-hidden">
        
        {/* Subtle decorative grid background line element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none rounded-bl-full border-l border-b border-emerald-500/5" />

        {/* Workspace Title Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-zinc-900">
          <div>
            <h3 className="text-lg font-black text-zinc-100 tracking-wider uppercase">
              Active Vacancy Pipelines
            </h3>
            <p className="text-zinc-500 text-[10px] font-mono tracking-widest mt-1">
              SYSTEM RECORDS // CONTROL AND MONITOR STRUCTURAL POSITIONS
            </p>
          </div>

          {/* Action Toolbar Matrix */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* [NEW] Elite Add Vacancy Controller Button */}
            <button
              type="button"
              onClick={() => triggerModal(null, "create")}
              className="inline-flex items-center gap-2 bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 px-4 py-2.5 rounded-xl text-[10px] font-mono tracking-widest font-black uppercase transition-all duration-150 cursor-pointer active:scale-[0.98]"
            >
              <Plus size={14} className="stroke-[3]" />
              Add New Vacancy
            </button>

            <button
              type="button"
              onClick={handleSyncPipeline}
              disabled={isSyncing}
              className={`p-2.5 bg-[#050505] hover:bg-[#0c0c0c] text-zinc-400 hover:text-emerald-400 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed h-[38px] w-[38px] flex items-center justify-center ${
                isSyncing ? "border-emerald-500/30 text-emerald-400" : ""
              }`}
              title="Sync Database Pipelines"
            >
              <svg 
                className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Table Core Layout Viewport */}
        <div className="overflow-x-auto selection:bg-emerald-500/20">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest border-b border-zinc-900">
                <th className="pb-4 font-black pl-2">Job Context / Title</th>
                <th className="pb-4 font-black">Department</th>
                <th className="pb-4 font-black">Registry Code</th>
                <th className="pb-4 font-black">Registration Deadline</th>
                <th className="pb-4 font-black">Status</th>
                <th className="pb-4 font-black text-right pr-2">Management Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs">
              {jobsList.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-16 text-center text-[10px] font-mono text-zinc-500 tracking-widest uppercase bg-[#020202]/50"
                  >
                    No active job vacancy models deployed in directory database.
                  </td>
                </tr>
              ) : (
                jobsList.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-emerald-500/[0.02] transition-colors duration-150 group border-b border-zinc-900/40"
                  >
                    <td className="py-4 font-bold text-zinc-200 group-hover:text-white pl-2 transition-colors">
                      {job.title}
                    </td>
                    <td className="py-4 text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">
                      {job.department || "HQ General Operations"}
                    </td>
                    <td className="py-4 text-zinc-400 font-mono text-xs group-hover:text-emerald-400/80 transition-colors">
                      {job.jobCode || `JOB-${job._id?.slice(-5).toUpperCase()}`}
                    </td>
                    <td className="py-4 text-zinc-400 font-mono text-xs group-hover:text-zinc-300 transition-colors">
                      {job.deadline ? job.deadline.split("T")[0] : "No Operational Limit"}
                    </td>
                    <td>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold tracking-widest border uppercase transition-all ${
                          job.status === "published"
                            ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]"
                            : job.status === "archived"
                            ? "bg-zinc-950 text-zinc-500 border-zinc-800"
                            : "bg-zinc-900 text-zinc-400 border-zinc-800"
                        }`}
                      >
                        {job.status || "Draft System File"}
                      </span>
                    </td>
                    <td className="py-4 pr-2 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          onClick={() => triggerModal(job, "edit")}
                          className="p-2 bg-[#050505] hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-400 border border-zinc-800 hover:border-emerald-500/30 rounded-xl transition-all duration-150 cursor-pointer"
                          title="Modify Vacancy Properties"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerModal(job, "delete")}
                          className="p-2 bg-[#050505] hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/30 rounded-xl transition-all duration-150 cursor-pointer"
                          title="Purge Pipeline Document"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXTRACTED AUDIT MODAL ROUTERS PORTALS */}
{activeModal === "create" && (
  <CreateJob
    onClose={closeModal}
    onCreationSuccess={() => {
      if (onRefreshJobs) onRefreshJobs();
      closeModal();
    }}
  />
)}

      {activeModal === "edit" && selectedJob && (
        <EditJobModal
          jobId={selectedJob._id}
          onClose={closeModal}
          onUpdateSuccess={() => {
            if (onRefreshJobs) onRefreshJobs();
            closeModal();
          }}
        />
      )}

      {activeModal === "delete" && selectedJob && (
        <DeleteJobModal
          job={selectedJob}
          onClose={closeModal}
          onDeleteConfirm={onDeleteJob}
        />
      )}
    </div>
  );
}

export default VacancyControlTab;