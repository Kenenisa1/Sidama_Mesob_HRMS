import React, { useState } from "react";
import axios from "axios";

import {
  X,
  Briefcase,
  CheckCircle,
} from "lucide-react";

const JobModal = ({ isOpen, onClose }) => {

  // STATES
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    requirements: "",
    education: "",
    cgpa: "",
    experience: "",
    positions: "",
    salary: "",
    deadline: "",
    location: "",

    languages: {
      amharic: false,
      english: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // LANGUAGE CHECKBOX
  const handleLanguageChange = (e) => {
    const { name, checked } = e.target;

    setFormData({
      ...formData,

      languages: {
        ...formData.languages,
        [name]: checked,
      },
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        formData
      );

      console.log(res.data);

      alert("Job Posted Successfully");

      onClose();

    } catch (error) {

      console.log(error);
      const apiMessage =
        error.response?.data?.errors?.join("\n") ||
        error.response?.data?.message ||
        "Error Posting Job";

      setErrorMessage(apiMessage);

      alert(apiMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#020c17]/95 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#020b1c] border border-white/10 w-full max-w-2xl rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">

          <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500">
            <Briefcase size={28} />
          </div>

          <h2 className="text-3xl font-bold text-white">
            Post New Job Opening
          </h2>
        </div>

        <p className="text-gray-400 mb-10 ml-12">
          Create a new job posting for the SMUC recruitment portal
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {errorMessage && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 whitespace-pre-line">
              {errorMessage}
            </div>
          )}

          {/* JOB TITLE */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">
              Job Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Junior Woreda Administrator"
              className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* DEPARTMENT */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">
              Department *
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-gray-400 focus:outline-none appearance-none"
            >
              <option value="">
                Select department
              </option>

              <option>
                Administration
              </option>

              <option>
                Field Operations
              </option>

              <option>
                IT Support
              </option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">
              Job Description *
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the role, responsibilities, and what the position entails..."
              className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            ></textarea>
          </div>

          {/* REQUIREMENTS */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">
              Requirements *
            </label>

            <textarea
              rows="3"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
              className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-white focus:outline-none"
            ></textarea>
          </div>

          {/* EDUCATION + CGPA */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">
                Minimum Education *
              </label>

              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-gray-400 focus:outline-none appearance-none"
              >
                <option value="">
                  Select level
                </option>

                <option>
                  Degree
                </option>

                <option>
                  Masters
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">
                Minimum CGPA *
              </label>

              <input
                type="number"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                required
                min="0"
                max="4"
                step="0.01"
                placeholder="e.g., 3.0"
                className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* EXPERIENCE + POSITIONS */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">
                Years of Experience *
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                placeholder="e.g., 0-2 years"
                className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">
                Number of Positions *
              </label>

              <input
                type="number"
                name="positions"
                value={formData.positions}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g., 12"
                className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* SALARY + DEADLINE */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">
                Salary Range
              </label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 15,000 - 25,000 ETB"
                className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">
                Application Deadline *
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">
              Location Preference
            </label>

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-gray-400 focus:outline-none appearance-none"
            >
              <option value="">
                Select preference
              </option>

              <option>
                Remote
              </option>

              <option>
                On-site
              </option>
            </select>
          </div>

          {/* LANGUAGES */}
          <div className="space-y-3">

            <label className="block text-white font-medium text-xs uppercase tracking-wider">
              Language Requirements
            </label>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="amharic"
                checked={formData.languages.amharic}
                onChange={handleLanguageChange}
                className="w-5 h-5 accent-blue-500 rounded border-white/10 bg-[#050e1f]"
              />

              <label className="text-gray-300 text-sm">
                Amharic Proficiency Required
              </label>
            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="english"
                checked={formData.languages.english}
                onChange={handleLanguageChange}
                className="w-5 h-5 accent-blue-500 rounded border-white/10 bg-[#050e1f]"
              />

              <label className="text-gray-300 text-sm">
                English Proficiency Required
              </label>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4 mt-8">

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 bg-[#059669] hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              <CheckCircle size={20} />

              {isSubmitting ? "Publishing..." : "Publish Job Posting"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-white hover:bg-gray-100 text-[#059669] font-semibold py-3.5 px-8 rounded-xl transition-all"
            >
              Save as Draft
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
