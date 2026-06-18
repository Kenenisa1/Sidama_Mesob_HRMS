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
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative grid background line element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-oled-green/5 to-transparent pointer-events-none rounded-bl-full border-l border-b border-oled-green/10" />

        {/* Workspace Title Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
              Active Vacancy Pipelines
            </h3>
            <p className="text-gray-500 text-xs font-mono font-bold tracking-widest mt-1">
              SYSTEM RECORDS // CONTROL AND MONITOR STRUCTURAL POSITIONS
            </p>
          </div>

          {/* Action Toolbar Matrix */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* [NEW] Elite Add Vacancy Controller Button */}
            <button
              type="button"
              onClick={() => triggerModal(null, "create")}
              className="inline-flex items-center gap-2 bg-oled-green/10 hover:bg-oled-green/20 text-oled-dark hover:text-oled-green border border-oled-green/20 hover:border-oled-green/40 px-5 py-3 rounded-xl text-xs font-mono tracking-widest font-black uppercase transition-all duration-150 cursor-pointer active:scale-[0.98]"
            >
              <Plus size={16} className="stroke-[3]" />
              Add New Vacancy
            </button>

            <button
              type="button"
              onClick={handleSyncPipeline}
              disabled={isSyncing}
              className={`p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-oled-green rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed h-11 w-11 flex items-center justify-center ${
                isSyncing ? "border-oled-green/30 text-oled-green" : ""
              }`}
              title="Sync Database Pipelines"
            >
              <svg 
                className={`w-5 h-5 ${isSyncing ? "animate-spin" : ""}`} 
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
        <div className="overflow-x-auto selection:bg-oled-green/20">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-gray-500 text-xs font-mono font-extrabold uppercase tracking-widest border-b border-gray-200">
                <th className="pb-4 pl-2">Job Context / Title</th>
                <th className="pb-4">Department</th>
                <th className="pb-4">Registry Code</th>
                <th className="pb-4">Registration Deadline</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right pr-2">Management Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {jobsList.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-16 text-center text-xs font-mono font-bold text-gray-400 tracking-widest uppercase bg-gray-50"
                  >
                    No active job vacancy models deployed in directory database.
                  </td>
                </tr>
              ) : (
                jobsList.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-gray-50 transition-colors duration-150 group border-b border-gray-100"
                  >
                    <td className="py-5 font-black text-gray-900 group-hover:text-oled-dark pl-2 transition-colors">
                      {job.title}
                    </td>
                    <td className="py-5 text-gray-600 font-bold group-hover:text-gray-900 transition-colors">
                      {job.department || "HQ General Operations"}
                    </td>
                    <td className="py-5 text-gray-500 font-mono font-bold text-xs group-hover:text-oled-green transition-colors">
                      {job.jobCode || `JOB-${job._id?.slice(-5).toUpperCase()}`}
                    </td>
                    <td className="py-5 text-gray-500 font-mono font-bold text-xs group-hover:text-gray-700 transition-colors">
                      {job.deadline ? job.deadline.split("T")[0] : "No Operational Limit"}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase transition-all ${
                          job.status === "published"
                            ? "bg-oled-green/10 text-oled-dark border border-oled-green/20"
                            : job.status === "archived"
                            ? "bg-gray-100 text-gray-500 border border-gray-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {job.status || "Draft System File"}
                      </span>
                    </td>
                    <td className="py-5 pr-2 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          onClick={() => triggerModal(job, "edit")}
                          className="p-2.5 bg-gray-50 hover:bg-oled-green/10 text-gray-500 hover:text-oled-green border border-gray-200 hover:border-oled-green/30 rounded-xl transition-all duration-150 cursor-pointer shadow-sm"
                          title="Modify Vacancy Properties"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerModal(job, "delete")}
                          className="p-2.5 bg-gray-50 hover:bg-rose-50 text-gray-500 hover:text-rose-500 border border-gray-200 hover:border-rose-200 rounded-xl transition-all duration-150 cursor-pointer shadow-sm"
                          title="Purge Pipeline Document"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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