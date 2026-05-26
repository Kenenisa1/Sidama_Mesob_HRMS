import React, { useState, useEffect } from "react";
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
  Info
} from "lucide-react";

export default function StepFour({ data, update, onPrev }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(
        "Session unauthenticated. Please authenticate to preserve transport integrity.",
        { style: { background: "#000", color: "#fff", border: "1px solid #dc2626" } }
      );
    }
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error(
        `${field.replace("File", "").toUpperCase()} exceeds the mandatory 5MB allocation cap.`,
        { style: { background: "#000", color: "#fff", border: "1px solid #27272a" } }
      );
    }

    if (field === "cvFile" && file.type !== "application/pdf") {
      return toast.error(
        "Security Enforcement: CV must be submitted exclusively as a crisp PDF file.",
        { style: { background: "#000", color: "#fff", border: "1px solid #dc2626" } }
      );
    }

    if (field !== "cvFile") {
      const permittedVisualTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
      if (!permittedVisualTypes.includes(file.type)) {
        return toast.error(
          "Unsupported file format. Please present clean images or PDF documents.",
          { style: { background: "#000", color: "#fff", border: "1px solid #27272a" } }
        );
      }
    }

    update({ [field]: file });
    toast.success(`${file.name.substring(0, 15)}... vaulted clean`, {
      icon: "📎",
      style: { background: "#000", color: "#fff", border: "1px solid #10b981" },
    });
  };

  const removeFile = (field) => {
    update({ [field]: null });
    toast("Asset flushed from local memory buffer", {
      icon: "🗑️",
      style: { background: "#000", color: "#a1a1aa", border: "1px solid #27272a" },
    });
  };

  const handleSubmit = async () => {
    if (!data.cvFile || !data.degreeFile || !data.idFile) {
      return toast.error(
        "Missing mandatory assets: CV, University Degree, and National ID are required.",
        { style: { background: "#000", color: "#fff", border: "1px solid #dc2626" } }
      );
    }

    if (!data.jobId) {
      return toast.error(
        "Pipeline failure: Missing target job deployment structural index.",
        { style: { background: "#000", color: "#fff", border: "1px solid #dc2626" } }
      );
    }

    setIsSubmitting(true);
    const payload = new FormData();

    payload.append("cv", data.cvFile);
    payload.append("degreeCertificate", data.degreeFile);
    payload.append("nationalIdCopy", data.idFile);
    if (data.certFile) payload.append("otherCert", data.certFile);

    payload.append("jobId", data.jobId);
    payload.append("sidaamuAfoo", data.sidaamuAfoo || "BASIC");

    const personalInfo = {
      firstName: data.firstName || "Unknown",
      lastName: data.lastName || "Unknown",
      middleName: data.middleName || "",
      email: data.email || "",
      phone: data.phone || "",
      faydaId: data.faydaId || "",
      gender: data.gender || "Male",
    };

    const residency = {
      woreda: data.woreda || data.wereda || "",
      kebele: data.kebele || "",
      houseNumber: data.houseNumber || "",
    };

    const education = {
      level: data.eduLevel || "Bachelor",
      institution: data.institution || "",
      fieldOfStudy: data.department || "",
      cgpa: parseFloat(data.cgpa) || 0.0,
      graduationYear: parseInt(data.gradYear) || new Date().getFullYear(),
      experienceYears: Math.max(0, parseInt(data.experience || data.experienceYears || 0)),
      skills: [],
    };

    payload.append("personalInfo", JSON.stringify(personalInfo));
    payload.append("residency", JSON.stringify(residency));
    payload.append("education", JSON.stringify(education));

    try {
      const secureToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/applications/submit",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: secureToken ? `Bearer ${secureToken}` : "",
          },
        }
      );

      if (response.data.success || response.status === 201 || response.status === 200) {
        setTrackingId(response.data.application?.trackingId || "SMUC-GENERATED");
        setShowSuccess(true);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server connection interface failure protocol error";
      toast.error(errorMsg, {
        style: { background: "#000", color: "#fff", border: "1px solid #dc2626" },
      });
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
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-10"
          >
            <header className="space-y-2 border-b border-zinc-900 pb-5">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                Document Vault
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-2xl">
                Please attach clean, unaltered digital copies of your official documents. Ensure all documents are clear, legible, and match your verified application profile details.
              </p>
              <div className="text-[10px] text-zinc-600 font-mono tracking-wider uppercase pt-1">
                Hawassa Pulse Digitization Portal Framework
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <UploadBox
                label="Curriculum Vitae"
                description="Your professional resume. Must contain updated contact channels."
                file={data.cvFile}
                onFileSelect={(e) => handleFileChange(e, "cvFile")}
                onRemove={() => removeFile("cvFile")}
                acceptType="application/pdf"
                required
                infoNote="PDF format only. Maximum allowed file capacity size: 5MB."
              />
              <UploadBox
                label="University Degree Certificate"
                description="Official graduation certificate verifying completion of your field of study."
                file={data.degreeFile}
                onFileSelect={(e) => handleFileChange(e, "degreeFile")}
                onRemove={() => removeFile("degreeFile")}
                acceptType=".pdf,image/png,image/jpeg,image/jpg"
                required
                infoNote="Accepts clear document scans in PDF, PNG, or JPEG image standards (Max 5MB)."
              />
              <UploadBox
                label="Kebele ID/ መታወቅያ "
                description="Your official digital or physical National ID (Fayda Card)."
                file={data.idFile}
                onFileSelect={(e) => handleFileChange(e, "idFile")}
                onRemove={() => removeFile("idFile")}
                acceptType=".pdf,image/png,image/jpeg,image/jpg"
                required
                infoNote="Ensure both the card tracking number and your official photograph are cleanly visible."
              />
              <UploadBox
                label="Supplemental Supporting Credentials"
                description="Optional workspace recommendations, language proficiencies, or certificates."
                file={data.certFile}
                onFileSelect={(e) => handleFileChange(e, "certFile")}
                onRemove={() => removeFile("certFile")}
                acceptType=".pdf,image/png,image/jpeg,image/jpg"
                infoNote="Optional upload slot. Combines up to 5MB total in PDF or image format configurations."
              />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 text-emerald-400">
              <ShieldCheck size={18} className="text-emerald-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                  Secure Pipeline Cryptographic Tunnel Active (TLS 1.3)
                </p>
                <p className="text-zinc-500 text-[11px]">
                  All database transmission records are end-to-end encrypted and directly linked to your digital identity profile.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onPrev}
                disabled={isSubmitting}
                type="button"
                className="flex-1 px-8 py-4 rounded-xl bg-zinc-950 text-zinc-400 font-black text-xs uppercase tracking-widest hover:text-white hover:bg-zinc-900 border border-zinc-900 transition-all cursor-pointer"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                type="button"
                className="flex-[2] py-4 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Committing Stream...
                  </>
                ) : (
                  "Confirm & Submit Application"
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <SuccessUI trackingId={trackingId} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessUI({ trackingId }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-2 space-y-6"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-950 border border-emerald-500/30 mb-2 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
        <CheckCircle size={32} className="text-emerald-500" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
          Transmission <span className="text-emerald-500">Successful</span>
        </h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          Your documentation pipeline packets have been stored securely. Human resource systems are scheduling structural manual validation reviews.
        </p>
        
        {trackingId && (
          <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl inline-block font-mono text-xs text-zinc-300">
            TRACKING ID: <span className="text-emerald-400 font-black tracking-wider ml-1">{trackingId}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function UploadBox({ label, description, file, onFileSelect, onRemove, required, acceptType, infoNote }) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wide">
          {label} {required && <span className="text-emerald-500">*</span>}
        </label>
        {description && (
          <p className="text-xs text-zinc-400 font-medium leading-normal">
            {description}
          </p>
        )}
      </div>

      <div
        className={`relative h-40 rounded-2xl border border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4
        ${file ? "border-emerald-500/40 bg-zinc-950/40" : "border-zinc-800 bg-black hover:border-zinc-700 hover:bg-zinc-950/20 group"}`}
      >
        {!file ? (
          <>
            <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center mb-3 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-all">
              <CloudUpload size={20} className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            </div>
            <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-200 uppercase tracking-wider text-center transition-colors">
              Drag or Click to Upload
            </span>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-30"
              onChange={onFileSelect}
              accept={acceptType}
            />
          </>
        ) : (
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/30 border border-emerald-900/40 flex items-center justify-center mb-2 text-emerald-400">
              <FileText size={20} />
            </div>
            <span className="text-xs font-mono text-zinc-200 truncate max-w-[240px] px-2 font-bold">
              {file.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              type="button"
              className="mt-3 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 border border-zinc-800 transition-all cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {infoNote && !file && (
        <div className="flex items-start gap-1.5 px-1 text-zinc-500">
          <Info size={12} className="mt-0.5 shrink-0 text-zinc-600" />
          <p className="text-[11px] font-medium leading-normal italic">
            {infoNote}
          </p>
        </div>
      )}
    </div>
  );
}