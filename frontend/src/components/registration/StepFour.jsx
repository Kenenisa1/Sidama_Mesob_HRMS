import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudUpload, FileText, CheckCircle, Trash2, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

export default function StepFour({ data, update, onPrev }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) update({ [field]: file });
  };

  const removeFile = (field) => update({ [field]: null });

  const handleSubmit = () => {
    if (!data.degreeFile || !data.idFile || !data.cvFile) {
      return alert("Please upload all required files (CV, Degree, and National ID) before submitting.");
    }
    setIsSubmitting(true);
    
    // Simulate API Call to SMUC Backend
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2500);
  };

  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-10"
          >
            <header>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Document Vault</h2>
              <p className="text-zinc-500 text-sm md:text-base mt-1 font-medium">Upload your professional credentials for verification.</p>
            </header>

            {/* Wide Grid for Upload Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <UploadBox 
                label="Curriculum Vitae (CV)" 
                file={data.cvFile} 
                onFileSelect={(e) => handleFileChange(e, 'cvFile')} 
                onRemove={() => removeFile('cvFile')} 
                required 
              />
              <UploadBox 
                label="University Degree" 
                file={data.degreeFile} 
                onFileSelect={(e) => handleFileChange(e, 'degreeFile')} 
                onRemove={() => removeFile('degreeFile')} 
                required 
              />
              <UploadBox 
                label="National ID (Fayda)" 
                file={data.idFile} 
                onFileSelect={(e) => handleFileChange(e, 'idFile')} 
                onRemove={() => removeFile('idFile')} 
                required 
              />
              <UploadBox 
                label="Other Certificates" 
                file={data.certFile} 
                onFileSelect={(e) => handleFileChange(e, 'certFile')} 
                onRemove={() => removeFile('certFile')} 
              />
            </div>

            {/* Footer Declaration */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500/60">
              <ShieldCheck size={18} />
              <p className="text-[10px] font-black uppercase tracking-widest">Encrypted Document Submission Protocol</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onPrev} 
                disabled={isSubmitting} 
                className="flex-1 px-10 py-5 rounded-2xl bg-zinc-900/50 text-zinc-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 hover:text-white transition-all border border-zinc-800/50 disabled:opacity-50"
              >
                Back
              </button>
              
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting} 
                className={`flex-[2] py-5 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 shadow-xl shadow-emerald-950/20 transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* --- SUCCESS UI (OLED Styled) --- */
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-4 space-y-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/30 mb-4 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <CheckCircle size={48} className="text-emerald-500" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">APPLICATION <span className="text-emerald-500">SENT</span></h2>
              <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Your credentials have been successfully logged into the <span className="text-white font-bold">Sidama Mesob Unity Center</span> recruitment system. We will contact you via email after verification.
              </p>
            </div>
            
            <div className="pt-10">
              <button 
                onClick={() => window.location.href = '/home'} 
                className="px-12 py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center gap-3 mx-auto active:scale-95"
              >
                Return to Portal <ArrowRight size={18} />
              </button>
            </div>
            
            {/* Animated Loading Pips */}
            <div className="flex justify-center gap-3 pt-6 opacity-40">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0s]" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UploadBox({ label, file, onFileSelect, onRemove, required }) {
  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <div className={`relative h-44 rounded-[2rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-6
        ${file ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-zinc-800 bg-black/40 hover:border-zinc-600 group'}`}>
        {!file ? (
          <>
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3 group-hover:text-emerald-500 transition-colors">
              <CloudUpload size={24} />
            </div>
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center">PDF or Image (Max 5MB)</span>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-30" onChange={onFileSelect} accept=".pdf,image/*" />
          </>
        ) : (
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 text-emerald-500">
              <FileText size={24} />
            </div>
            <span className="text-[11px] font-bold text-white truncate max-w-[200px] text-center px-2">{file.name}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onRemove(); }} 
              className="mt-4 p-2 rounded-full bg-zinc-900 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all active:scale-90"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}