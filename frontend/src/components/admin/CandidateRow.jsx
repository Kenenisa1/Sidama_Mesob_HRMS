import React from "react";
import { Eye } from "lucide-react";

const CandidateRow = ({ app, onView, getStatusStyle }) => {
  const fullName = `${app.personalInfo?.firstName || ''} ${app.personalInfo?.middleName || ''} ${app.personalInfo?.lastName || ''}`.trim() || 'Unknown Applicant';

  return (
    <tr className="border-b border-white/5 hover:bg-emerald-500/[0.02] transition-colors group">
      {/* Selection Checkbox */}
      <td className="py-4 pl-4">
        <input 
          type="checkbox" 
          className="accent-emeraldAccent w-4 h-4 rounded bg-darkBg border-white/10 focus:ring-0 focus:ring-offset-0" 
        />
      </td>

      {/* Candidate Identity */}
      <td className="py-4 font-bold text-sm text-zinc-100 tracking-wide">
        {fullName}
      </td>

      {/* National ID */}
      <td className="py-4 text-zinc-400 font-mono text-xs tracking-wider">
        {app.personalInfo?.faydaId || '-'}
      </td>

      {/* Woreda Context */}
      <td className="py-4 text-zinc-400 text-xs font-medium">
        {app.residency?.woreda || '-'}
      </td>

      {/* Language Proficiency */}
      <td className="py-4">
        <span className="bg-emerald-500/10 text-emeraldAccent px-2.5 py-0.5 rounded text-[10px] font-bold border border-emerald-500/20 shadow-sm">
          {app.education?.sidaamuAfooProficiency || app.education?.sidaamuAfoo || app.sidaamuAfoo || '-'}
        </span>
      </td>

      {/* CGPA */}
      <td className="py-4 text-zinc-200 font-mono text-xs font-bold">
        {typeof app.education?.cgpa === 'number' ? app.education.cgpa.toFixed(2) : (app.education?.cgpa || '-')}
      </td>

      {/* Workflow Status */}
      <td className="py-4">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(app.status || 'Pending')}`}>
          {app.status || 'Pending'}
        </span>
      </td>

      {/* Review Action Path */}
      <td className="py-4 pr-4 text-right">
        <button 
          onClick={() => onView(app)}
          className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-emeraldAccent/10 text-zinc-300 hover:text-emeraldAccent border border-white/5 hover:border-emeraldAccent/20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
        >
          <Eye size={13} /> View
        </button>
      </td>
    </tr>
  );
};

export default CandidateRow;