import React from "react";
import { Eye } from "lucide-react";

const CandidateRow = ({ app, onView, getStatusStyle }) => {
  const fullName = `${app.personalInfo?.firstName || ''} ${app.personalInfo?.middleName || ''} ${app.personalInfo?.lastName || ''}`.trim() || 'Unknown Applicant';
  const experience = app.experience || app.education?.experience || 0;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
      {/* Selection Checkbox */}
      <td className="py-5 pl-4">
        <input 
          type="checkbox" 
          className="accent-oled-green w-4 h-4 rounded border-gray-300" 
        />
      </td>

      {/* Candidate Identity */}
      <td className="py-5 font-black text-sm text-gray-900 tracking-tight group-hover:text-oled-dark transition-colors">
        {fullName}
      </td>

      {/* National ID */}
      <td className="py-5 text-gray-500 font-mono text-xs font-bold tracking-wider group-hover:text-gray-700 transition-colors">
        {app.personalInfo?.faydaId || '-'}
      </td>

      {/* Experience Context */}
      <td className="py-5">
        <span className="bg-oled-green/10 text-oled-dark px-3 py-1 rounded-md text-[11px] font-black tracking-widest uppercase border border-oled-green/20">
          {experience} YRS
        </span>
      </td>

      {/* CGPA */}
      <td className="py-5 text-gray-900 font-mono text-sm font-extrabold">
        {typeof app.education?.cgpa === 'number' ? app.education.cgpa.toFixed(2) : (app.education?.cgpa || '-')}
      </td>

      {/* Workflow Status */}
      <td className="py-5">
        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(app.status || 'Pending').replace('text-emeraldAccent', 'text-oled-dark').replace('bg-emerald-950/40', 'bg-oled-green/10 border-oled-green/20')}`}>
          {app.status || 'Pending'}
        </span>
      </td>

      {/* Review Action Path */}
      <td className="py-5 pr-4 text-right">
        <button 
          onClick={() => onView(app)}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-oled-green/10 text-gray-600 hover:text-oled-green border border-gray-200 hover:border-oled-green/30 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Eye size={14} /> View
        </button>
      </td>
    </tr>
  );
};

export default CandidateRow;