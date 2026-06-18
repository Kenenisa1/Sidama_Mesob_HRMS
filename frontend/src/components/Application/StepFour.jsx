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
  Info,
} from "lucide-react";

export default function StepFour({ data, update, onPrev }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  useEffect(() => {
    // Note: Authentication bypass intended. Applicant submission portal operates on a public tier.
  }, []);

  const handleFileChange = (e, field) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const permittedVisualTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxSize = 5 * 1024 * 1024;
    const sanitizedFiles = [];

    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        toast.error(
          `SidaMOV Portal: ${file.name} exceeds the 5MB size limit. Please compress your file.`,
          {
            style: {
              background: "#000",
              color: "#fff",
              border: "1px solid #27272a",
            },
          },
        );
        continue;
      }

      if (field === "cvFile" && file.type !== "application/pdf") {
        toast.error(
          "SidaMOV: For standardized review, your CV must be in PDF format.",
          {
            style: {
              background: "#000",
              color: "#fff",
              border: "1px solid #dc2626",
            },
          },
        );
        continue;
      }

      if (field !== "cvFile") {
        if (!permittedVisualTypes.includes(file.type)) {
          toast.error(
            "Invalid Format: Our HR systems only accept PDF, PNG, or JPG credentials.",
            {
              style: {
                background: "#000",
                color: "#fff",
                border: "1px solid #27272a",
              },
            },
          );
          continue;
        }
      }

      sanitizedFiles.push(file);
    }

    if (!sanitizedFiles.length) return;

    if (field === "certFiles") {
      update({ certFiles: [...(data.certFiles || []), ...sanitizedFiles] });
      toast.success(
        `${sanitizedFiles.length} supplemental credential(s) securely attached.`,
        {
          icon: "📎",
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #10b981",
          },
        },
      );
      return;
    }

    const file = sanitizedFiles[0];
    update({ [field]: file });
    toast.success(
      `${file.name.substring(0, 15)}... securely attached to your portfolio.`,
      {
        icon: "📎",
        style: {
          background: "#000",
          color: "#fff",
          border: "1px solid #10b981",
        },
      },
    );
  };

  const removeFile = (field, index = null) => {
    if (field === "certFiles") {
      const updatedFiles = (data.certFiles || []).filter(
        (_, idx) => idx !== index,
      );
      update({ certFiles: updatedFiles });
    } else {
      update({ [field]: null });
    }

    toast("Document removed from your application.", {
      icon: "🗑️",
      style: {
        background: "#000",
        color: "#a1a1aa",
        border: "1px solid #27272a",
      },
    });
  };

  const handleSubmit = async () => {
    if (!data.cvFile || !data.degreeFile || !data.idFile) {
      return toast.error(
        "Application Incomplete: Please upload your CV, Degree, and Kebele ID to proceed.",
        {
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #dc2626",
          },
        },
      );
    }

    if (!data.jobId) {
      return toast.error(
        "Session Error: We lost connection to the specified position. Please restart your application.",
        {
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #dc2626",
          },
        },
      );
    }

    setIsSubmitting(true);
    const payload = new FormData();

    payload.append("cv", data.cvFile);
    payload.append("degreeCertificate", data.degreeFile);
    payload.append("nationalIdCopy", data.idFile);
    if (data.certFiles?.length) {
      data.certFiles.forEach((file) => payload.append("otherCert", file));
    }

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
      experienceYears: Math.max(
        0,
        parseInt(data.experience || data.experienceYears || 0),
      ),
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
        },
      );

      if (
        response.data.success ||
        response.status === 201 ||
        response.status === 200
      ) {
        setTrackingId(
          response.data.application?.trackingId || "SidaMOV-GENERATED",
        );
        setShowSuccess(true);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Transmission Failed: Unable to connect to SidaMOV servers. Check your internet.";
      toast.error(errorMsg, {
        style: {
          background: "#000",
          color: "#fff",
          border: "1px solid #dc2626",
        },
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
            <header className="space-y-2 border-b border-[var(--nav-border)] pb-5">
              <h2 className="text-2xl md:text-3xl font-black text-[var(--color-text-primary)] uppercase tracking-tight">
                Upload Documents
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm font-medium leading-relaxed max-w-2xl">
                Please upload clear and readable copies of your documents. Make
                sure they match your application details.
              </p>
              <div className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-wider uppercase pt-1">
                SidaMOV Application Portal
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <UploadBox
                label="Curriculum Vitae"
                description="Your professional resume with your current contact information."
                file={data.cvFile}
                onFileSelect={(e) => handleFileChange(e, "cvFile")}
                onRemove={() => removeFile("cvFile")}
                acceptType="application/pdf"
                required
                infoNote="PDF format only. Maximum size: 5MB."
              />
              <UploadBox
                label="University Degree Certificate"
                description="Your official degree or graduation certificate."
                file={data.degreeFile}
                onFileSelect={(e) => handleFileChange(e, "degreeFile")}
                onRemove={() => removeFile("degreeFile")}
                acceptType=".pdf,image/png,image/jpeg,image/jpg"
                required
                infoNote="Accepts PDF, PNG, or JPG formats (Max 5MB)."
              />
              <UploadBox
                label="Kebele ID/ መታወቅያ "
                description="Your official Kebele ID or National ID (Fayda Card)."
                file={data.idFile}
                onFileSelect={(e) => handleFileChange(e, "idFile")}
                onRemove={() => removeFile("idFile")}
                acceptType=".pdf,image/png,image/jpeg,image/jpg"
                required
                infoNote="Make sure your ID number and photo are clearly visible."
              />
              <UploadBox
                label="Supplemental Supporting Credentials"
                description="Upload one or more optional certificates, recommendation letters, or supporting documents."
                file={data.certFiles}
                isMultiple
                onFileSelect={(e) => handleFileChange(e, "certFiles")}
                onRemove={removeFile}
                acceptType=".pdf,image/png,image/jpeg,image/jpg"
                infoNote="Optional. You can attach multiple files here, each up to 5MB."
              />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-surface)]/30 border border-[var(--nav-border)] text-emerald-400">
              <ShieldCheck
                size={18}
                className="text-emerald-500 mt-0.5 shrink-0"
              />
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                  Your Information is Secure
                </p>
                <p className="text-[var(--color-text-secondary)] text-[11px]">
                  All uploaded documents and information are safely stored and
                  protected.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onPrev}
                disabled={isSubmitting}
                type="button"
                className="flex-1 px-8 py-4 rounded-xl bg-[var(--color-surface)] text-[var(--color-text-secondary)] font-black text-xs uppercase tracking-widest hover:text-[var(--color-text-primary)] hover:bg-[var(--nav-border)] border border-[var(--nav-border)] transition-all cursor-pointer"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                type="button"
                className="flex-[2] py-4 rounded-xl bg-emerald-600 text-[var(--color-text-primary)] font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting...
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
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-emerald-500/30 mb-2 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
        <CheckCircle size={32} className="text-emerald-500" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-black text-[var(--color-text-primary)] tracking-tight uppercase">
          Application{" "}
          <span className="text-emerald-500">Submitted Successfully</span>
        </h2>
        <p className="text-[var(--color-text-secondary)] text-sm max-w-md mx-auto leading-relaxed">
          Your application has been received successfully. Our HR team will
          review your documents and contact you soon.
        </p>

        {trackingId && (
          <div className="mt-4 p-4 bg-[var(--color-surface)] border border-[var(--nav-border)] rounded-xl inline-block font-mono text-xs text-[var(--color-text-secondary)]">
            APPLICATION ID:{" "}
            <span className="text-emerald-400 font-black tracking-wider ml-1">
              {trackingId}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function UploadBox({
  label,
  description,
  file,
  isMultiple,
  onFileSelect,
  onRemove,
  required,
  acceptType,
  infoNote,
}) {
  const hasFiles = Array.isArray(file) ? file.length > 0 : Boolean(file);

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="block text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wide">
          {label} {required && <span className="text-emerald-500">*</span>}
        </label>
        {description && (
          <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-normal">
            {description}
          </p>
        )}
      </div>

      <div
        className={`relative min-h-[160px] rounded-2xl border border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4
        ${hasFiles ? "border-emerald-500/40 bg-[var(--color-surface)]/50" : "border-[var(--nav-border)] bg-[var(--color-surface)]/20 hover:border-emerald-500/30 hover:bg-[var(--color-surface)]/40 group"}`}
      >
        {!hasFiles ? (
          <>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--nav-border)] flex items-center justify-center mb-3 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-all">
              <CloudUpload
                size={20}
                className="text-[var(--color-text-secondary)] group-hover:text-emerald-400 transition-colors"
              />
            </div>
            <span className="text-xs font-bold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] uppercase tracking-wider text-center transition-colors">
              Drag or Click to Upload
            </span>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-30"
              onChange={onFileSelect}
              accept={acceptType}
              multiple={isMultiple}
            />
          </>
        ) : (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/30 border border-emerald-900/40 flex items-center justify-center text-emerald-400">
                  <FileText size={20} />
                </div>
                <span className="text-xs font-mono text-[var(--color-text-primary)] font-bold">
                  Attached document
                  {Array.isArray(file) && file.length > 1 ? "s" : ""}
                </span>
              </div>
              {isMultiple && (
                <label className="text-[11px] text-emerald-400 underline cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={onFileSelect}
                    accept={acceptType}
                    multiple
                  />
                  Add more files
                </label>
              )}
            </div>

            <div className="grid gap-2 w-full">
              {Array.isArray(file) ? (
                file.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-950/70 px-3 py-2 border border-zinc-800"
                  >
                    <span className="text-xs text-[var(--color-text-secondary)] truncate">
                      {item.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove("certFiles", index)}
                      className="text-red-400 hover:text-red-300 text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-950/70 px-3 py-2 border border-zinc-800">
                  <span className="text-xs text-zinc-200 truncate">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove()}
                    className="text-red-400 hover:text-red-300 text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {infoNote && !hasFiles && (
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
