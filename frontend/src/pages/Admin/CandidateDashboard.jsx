import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, FileCheck, Clock, AlertCircle, Loader } from 'lucide-react';
import RegistryFilters from '../../components/Admin/RegistryFilters';
import CandidateRow from '../../components/Admin/CandidateRow';
import ApplicantDetailsModal from '../../components/Admin/ApplicantDetailsModal';

const CandidateDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active Constraint State Matrix
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vacancyFilter, setVacancyFilter] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [appResponse, jobResponse] = await Promise.all([
        axios.get('/api/applications'),
        axios.get('/api/jobs')
      ]);
      setCandidates(appResponse.data);
      setVacancies(jobResponse.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching registry data telemetry:', err);
      setError('Failed to pull applicant records from server modules.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setVacancyFilter('all');
  };

  // Metrics Engine Layout
  const metrics = {
    total: candidates.length,
    accepted: candidates.filter(c => c.status === 'accepted').length,
    pending: candidates.filter(c => !c.status || c.status === 'pending').length
  };

  // Filter Pipeline execution logic
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = 
      candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : candidate.status === statusFilter;
    const matchesVacancy = vacancyFilter === 'all' ? true : candidate.jobId === vacancyFilter;

    return matchesSearch && matchesStatus && matchesVacancy;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-400">
        <Loader className="w-8 h-8 animate-spin text-[#0070f3] mb-2" />
        <p className="text-sm font-medium">Assembling candidate telemetry records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#000000] border border-[#111111] p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-[#0070f3]/10 text-[#0070f3] rounded-lg border border-[#0070f3]/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block tracking-wider">Total Applications</span>
            <span className="text-2xl font-bold text-white block mt-0.5">{metrics.total}</span>
          </div>
        </div>

        <div className="bg-[#000000] border border-[#111111] p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-lg border border-green-500/20">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block tracking-wider">Accepted Pipeline</span>
            <span className="text-2xl font-bold text-white block mt-0.5">{metrics.accepted}</span>
          </div>
        </div>

        <div className="bg-[#000000] border border-[#111111] p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block tracking-wider">Awaiting Evaluation</span>
            <span className="text-2xl font-bold text-white block mt-0.5">{metrics.pending}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Data Filters Component */}
      <RegistryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        vacancyFilter={vacancyFilter}
        setVacancyFilter={setVacancyFilter}
        vacancies={vacancies}
        onReset={handleResetFilters}
      />

      {error && (
        <div className="p-4 text-sm text-[#ff3333] bg-[#ff3333]/10 border border-[#ff3333]/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Master Data Registry Interface */}
      <div className="bg-[#000000] border border-[#111111] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#050505] text-[11px] uppercase tracking-wider font-bold text-gray-400">
                <th className="px-6 py-4">Applicant Profile</th>
                <th className="px-6 py-4 hidden md:table-cell">Target Position</th>
                <th className="px-6 py-4 hidden sm:table-cell">Contact Channel</th>
                <th className="px-6 py-4 hidden lg:table-cell">Application Timestamp</th>
                <th className="px-6 py-4">Status Track</th>
                <th className="px-6 py-4 hidden xl:table-cell text-center">Credentials</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-xs text-gray-500">
                    No records found matching current constraint matrix profiles.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((candidate) => {
                  const targetJob = vacancies.find(v => v._id === candidate.jobId);
                  return (
                    <CandidateRow
                      key={candidate._id}
                      candidate={candidate}
                      vacancyTitle={targetJob ? targetJob.title : 'Deleted Posting'}
                      onViewDetails={(app) => setSelectedApplicant({ ...app, jobTitle: targetJob ? targetJob.title : 'Deleted Posting' })}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Evaluation Overlay System */}
      {selectedApplicant && (
        <ApplicantDetailsModal
          applicant={selectedApplicant}
          vacancyTitle={selectedApplicant.jobTitle}
          onClose={() => setSelectedApplicant(null)}
          onStatusUpdate={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default CandidateDashboard;