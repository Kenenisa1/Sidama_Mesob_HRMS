 import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function ApplicantGuide() {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 className="text-emerald-500" size={32} />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tight">Applicant Guide</h2>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="p-10 rounded-[2rem] bg-[#050c1a]/50 border border-zinc-900 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            <span className="bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-lg h-fit uppercase">Step 1</span>
            <div>
              <h4 className="text-2xl font-bold text-white mb-3">Browse Available Positions</h4>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Navigate to the home page to view all available job openings at the Sidama Mesob Unity Center. 
                Use the category filters to find roles that match your expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 - Detailed Box */}
        <div className="p-10 rounded-[2rem] bg-[#050c1a]/50 border border-emerald-500/10 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            <span className="bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-lg h-fit uppercase">Step 2</span>
            <div className="flex-1 space-y-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-3">Prepare Required Documents</h4>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Before starting your application, gather all necessary documents in PDF format. 
                  Incomplete applications may be automatically disqualified by the system.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 p-8 rounded-2xl border border-zinc-800">
                <DocItem label="Curriculum Vitae (CV)" desc="A clear, updated PDF of your professional history." />
                <DocItem label="Degree Certificate" desc="Scanned copies of your original transcripts or degree." />
                <DocItem label="National ID / Fayda" desc="Your valid government digital identity card." />
                <DocItem label="Experience Letter" desc="Proof of previous employment (if applicable)." />
              </div>

              <div className="p-5 rounded-xl bg-orange-500/5 border border-orange-500/20 flex gap-4 items-center">
                <AlertCircle className="text-orange-500 flex-shrink-0" size={24} />
                <p className="text-sm font-bold text-orange-400">
                  CRITICAL: All files must be under 5MB. We recommend using PDF compressors if your scans are too large.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-10 rounded-[2rem] bg-[#050c1a]/50 border border-zinc-900 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            <span className="bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-lg h-fit uppercase">Step 3</span>
            <div>
              <h4 className="text-2xl font-bold text-white mb-3">Complete the Application Form</h4>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Fill out the 4-step registration form. Ensure your **Woreda** and **Kebele** information is accurate, 
                as priority is given to regional residents of Sidama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocItem({ label, desc }) {
  return (
    <div className="flex items-start gap-4">
      <CheckCircle2 className="text-emerald-500 mt-1" size={20} />
      <div>
        <p className="text-lg font-bold text-white">{label}</p>
        <p className="text-sm text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}