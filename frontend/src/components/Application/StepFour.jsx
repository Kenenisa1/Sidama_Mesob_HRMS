import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import {
  CloudUpload,
  FileText,
  CheckCircle,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function StepFour({ data, update, onPrev }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. Unified handleFileChange with Type/Size validation
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return toast.error(`${field.replace("File", "")} exceeds 5MB limit`, {
        style: {
          background: "#000",
          color: "#fff",
          border: "1px solid #27272a",
        },
      });
    }

    update({ [field]: file });
    toast.success(`${file.name.substring(0, 15)}... uploaded`, {
      icon: "📎",
      style: { background: "#000", color: "#fff", border: "1px solid #10b981" },
    });
  };

  const removeFile = (field) => {
    update({ [field]: null });
    toast("File removed", { icon: "🗑️" });
  };

 const handleSubmit = async () => {
    // Basic Validation
    if (!data.degreeFile || !data.idFile || !data.cvFile) {
      return toast.error("Please upload CV, Degree, and National ID", {
        icon: <AlertCircle className="text-red-500" size={20} />,
      });
    }

    setIsSubmitting(true);

    const formData = new FormData();

    // 1. Files - (Names must match your Multer 'vaultUploads' config)
    formData.append("cv", data.cvFile);
    formData.append("degreeCertificate", data.degreeFile);
    formData.append("nationalIdCopy", data.idFile);
    if (data.certFile) formData.append("otherCert", data.certFile);

    // 2. Comprehensive Field Mapping 
    // We include faydaId, woreda, kebele, and cgpa to prevent backend fallbacks
    const fields = [
      "fullName",
      "email",
      "phone",
      "gender",
      "faydaId",      
      "woreda",       
      "kebele",      
      "address",
      "eduLevel",
      "institution",
      "department",
      "gradYear",
      "cgpa",         
      "experience",
      "sidaamuAfoo",
    ];

    fields.forEach((field) => {
      // If the field is missing in 'data', we send an empty string instead of undefined
      formData.append(field, data[field] || "");
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications/submit",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success(`Application submitted successfully! Tracking ID: ${response.data.trackingId}`);
        setShowSuccess(true);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server connection failed";
      toast.error(errorMsg);
      console.error("Submission Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[400px]">
      <Toaster position="top-right" reverseOrder={false} />

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
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                Document Vault
              </h2>
              <p className="text-zinc-500 text-sm md:text-base mt-1 font-medium italic">
                Verification for SMUC portal
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <UploadBox
                label="Curriculum Vitae (CV)"
                file={data.cvFile}
                onFileSelect={(e) => handleFileChange(e, "cvFile")}
                onRemove={() => removeFile("cvFile")}
                required
              />
              <UploadBox
                label="University Degree"
                file={data.degreeFile}
                onFileSelect={(e) => handleFileChange(e, "degreeFile")}
                onRemove={() => removeFile("degreeFile")}
                required
              />
              <UploadBox
                label="National ID (Fayda)"
                file={data.idFile}
                onFileSelect={(e) => handleFileChange(e, "idFile")}
                onRemove={() => removeFile("idFile")}
                required
              />
              <UploadBox
                label="Other Certificates"
                file={data.certFile}
                onFileSelect={(e) => handleFileChange(e, "certFile")}
                onRemove={() => removeFile("certFile")}
              />
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500/60">
              <ShieldCheck size={18} />
              <p className="text-[10px] font-black uppercase tracking-widest">
                End-to-End Encryption Enabled
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onPrev}
                disabled={isSubmitting}
                className="flex-1 px-10 py-5 rounded-2xl bg-zinc-900/50 text-zinc-400 font-black text-xs uppercase tracking-widest hover:text-white border border-zinc-800/50 disabled:opacity-30 transition-all"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-[2] py-5 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 ${isSubmitting ? "animate-pulse cursor-wait" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />{" "}
                    Transmitting...
                  </>
                ) : (
                  "Confirm & Submit"
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <SuccessUI />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for Success State
function SuccessUI() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4 space-y-8"
    >
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/30 mb-4 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        <CheckCircle size={48} className="text-emerald-500" />
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
          Applied <span className="text-emerald-500">Successfully</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Your documentation is now in the queue for manual verification. You
          will receive an update at your registered email address within 3-5
          business days.
        </p>
      </div>

      <div className="pt-10">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="px-12 py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center gap-3 mx-auto"
        >
          Go to Dashboard <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

// Reusable UploadBox
function UploadBox({ label, file, onFileSelect, onRemove, required }) {
  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <div
        className={`relative h-44 rounded-[2rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-6
        ${file ? "border-emerald-500/40 bg-emerald-500/5" : "border-zinc-800 bg-black/40 hover:border-emerald-500/20 group"}`}
      >
        {!file ? (
          <>
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all">
              <CloudUpload size={24} />
            </div>
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center">
              Drag or Click to Upload
            </span>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-30"
              onChange={onFileSelect}
              accept=".pdf,image/*"
            />
          </>
        ) : (
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3 text-emerald-500">
              <FileText size={24} />
            </div>
            <span className="text-[11px] font-bold text-white truncate max-w-[180px]">
              {file.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="mt-4 p-2 rounded-full bg-zinc-900 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
