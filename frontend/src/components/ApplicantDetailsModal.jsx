import React, { useState } from 'react';
import { X, Download, FileText, Image, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getStatusColor = (status) => {
  switch (status) {
    case 'Accepted':
    case 'Shortlisted':
      return 'bg-emerald-500/10 text-emeraldAccent border-emerald-500/20';
    case 'Rejected':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'Reviewed':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    default:
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
  }
};

const DocPreview = ({ file, type }) => {
  const getFileIcon = () => {
    if (!file) return null;
    if (file.toLowerCase().endsWith('.pdf')) return <FileText size={20} />;
    return <Image size={20} />;
  };

  const handleDownload = () => {
    const url = `${API_BASE_URL}/${file}`;
    window.open(url, '_blank');
  };

  const handlePreview = () => {
    const url = `${API_BASE_URL}/${file}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#050e1f] border border-white/10 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-emeraldAccent">{getFileIcon()}</div>
          <span className="text-white text-sm font-semibold">{type}</span>
        </div>
        {file && (
          <span className="text-[10px] text-gray-400 font-mono">
            {file.split('/').pop()}
          </span>
        )}
      </div>
      {file ? (
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 rounded transition-colors"
          >
            <Download size={14} /> Download
          </button>
          <button
            onClick={handlePreview}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2 rounded transition-colors"
          >
            Preview
          </button>
        </div>
      ) : (
        <div className="text-gray-500 text-xs py-2">No document uploaded</div>
      )}
    </div>
  );
};

export default function ApplicantDetailsModal({
  isOpen,
  onClose,
  application,
  isLoading,
  error,
  onStatusChange
}) {
  const [activeTab, setActiveTab] = useState('identity');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusError, setStatusError] = useState('');

  const handleStatusUpdate = async (newStatus) => {
    try {
      setIsUpdatingStatus(true);
      setStatusMessage('');
      setStatusError('');

      const response = await axios.patch(
        `${API_BASE_URL}/api/applications/${application._id}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        setStatusMessage(`Application ${newStatus.toLowerCase()}!`);
        setTimeout(() => {
          if (onStatusChange) {
            onStatusChange();
          }
          setStatusMessage('');
        }, 2000);
      }
    } catch (err) {
      setStatusError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#020c17]/95 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#020b1c] border border-white/10 w-full max-w-4xl rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="animate-spin text-emeraldAccent mb-4" size={32} />
            <p className="text-gray-400">Loading applicant details...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <div className="flex justify-center mb-3">
              <AlertCircle className="text-red-400" size={32} />
            </div>
            <p className="text-red-200 font-semibold mb-4">{error}</p>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && application && (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {[
                      application.personalInfo?.firstName,
                      application.personalInfo?.middleName,
                      application.personalInfo?.lastName
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Tracking ID: <span className="font-mono text-emeraldAccent">{application.trackingId}</span>
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(application.status)}`}>
                  {application.status || 'Pending'}
                </span>
              </div>
              <p className="text-gray-400 text-xs">
                Submitted: {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
              {[
                { id: 'identity', label: 'Identity' },
                { id: 'residency', label: 'Residency' },
                { id: 'education', label: 'Education' },
                { id: 'documents', label: 'Documents' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'text-emeraldAccent border-b-2 border-emeraldAccent'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {/* Identity Tab */}
              {activeTab === 'identity' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">First Name</label>
                      <p className="text-white text-sm font-semibold">
                        {application.personalInfo?.firstName || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Middle Name</label>
                      <p className="text-white text-sm font-semibold">
                        {application.personalInfo?.middleName || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Last Name</label>
                      <p className="text-white text-sm font-semibold">
                        {application.personalInfo?.lastName || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Gender</label>
                      <p className="text-white text-sm font-semibold">
                        {application.personalInfo?.gender || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Fayda Number</label>
                      <p className="text-white text-sm font-mono font-semibold">
                        {application.personalInfo?.faydaId || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Email</label>
                      <p className="text-white text-sm font-semibold">
                        {application.personalInfo?.email || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Phone</label>
                      <p className="text-white text-sm font-semibold">
                        {application.personalInfo?.phone || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Residency Tab */}
              {activeTab === 'residency' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Woreda / City</label>
                      <p className="text-white text-sm font-semibold">
                        {application.residency?.woreda || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Kebele</label>
                      <p className="text-white text-sm font-semibold">
                        {application.residency?.kebele || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Address / House Number</label>
                    <p className="text-white text-sm font-semibold">
                      {application.residency?.address || 'Not provided'}
                    </p>
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Education Level</label>
                      <p className="text-white text-sm font-semibold">
                        {application.education?.level || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Institution</label>
                      <p className="text-white text-sm font-semibold">
                        {application.education?.institution || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Field of Study</label>
                      <p className="text-white text-sm font-semibold">
                        {application.education?.fieldOfStudy || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">CGPA</label>
                      <p className="text-white text-sm font-semibold">
                        {application.education?.cgpa ?? 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Graduation Year</label>
                      <p className="text-white text-sm font-semibold">
                        {application.education?.graduationYear || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Experience (Years)</label>
                      <p className="text-white text-sm font-semibold">
                        {application.education?.experienceYears ?? 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Sidaamu Afoo</label>
                      <p className="text-emeraldAccent text-sm font-semibold">
                        {application.education?.sidaamuAfoo || 'N/A'}
                      </p>
                    </div>
                  </div>
                  {application.education?.skills && application.education.skills.length > 0 && (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-3">Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {application.education.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-500/10 text-emeraldAccent px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <DocPreview
                    file={application.documents?.cv}
                    type="Curriculum Vitae (CV)"
                  />
                  <DocPreview
                    file={application.documents?.degreeCertificate}
                    type="Degree Certificate"
                  />
                  <DocPreview
                    file={application.documents?.nationalIdCopy}
                    type="National ID Copy"
                  />
                </div>
              )}
            </div>

            {/* Status Messages */}
            {statusMessage && (
              <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200 flex items-center gap-2">
                <CheckCircle size={18} />
                {statusMessage}
              </div>
            )}
            {statusError && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 flex items-center gap-2">
                <AlertCircle size={18} />
                {statusError}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
              <button
                onClick={() => handleStatusUpdate('Shortlisted')}
                disabled={isUpdatingStatus || application.status === 'Shortlisted'}
                className="flex-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isUpdatingStatus ? <Loader className="inline animate-spin mr-2" size={16} /> : '⭐'} Shortlist
              </button>
              <button
                onClick={() => handleStatusUpdate('Accepted')}
                disabled={isUpdatingStatus || application.status === 'Accepted'}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isUpdatingStatus ? <Loader className="inline animate-spin mr-2" size={16} /> : '✓'} Accept
              </button>
              <button
                onClick={() => handleStatusUpdate('Rejected')}
                disabled={isUpdatingStatus || application.status === 'Rejected'}
                className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isUpdatingStatus ? <Loader className="inline animate-spin mr-2" size={16} /> : '✕'} Reject
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-gray-100 text-[#020b1c] font-semibold py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
