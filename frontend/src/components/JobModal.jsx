import React from 'react';
import { X, Briefcase, Calendar, CheckCircle } from 'lucide-react';

const JobModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Don't show anything if isOpen is false

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop (Dark background) */}
            <div
                className="absolute inset-0 bg-[#020c17]/95 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            ></div>
            <div className="relative bg-[#020b1c] border border-white/10 w-full max-w-2xl rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in slide-in-from-bottom-8 duration-300">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500">
                        <Briefcase size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Post New Job Opening</h2>
                </div>
                <p className="text-gray-400 mb-10 ml-12">Create a new job posting for the SMUC recruitment portal</p>
                {/* Form Fields */}
                <form className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">Job Title *</label>
                        <input
                            type="text"
                            placeholder="e.g., Junior Woreda Administrator"
                            className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">Department *</label>
                        <select className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-gray-400 focus:outline-none appearance-none">
                            <option>Select department</option>
                            <option>Administration</option>
                            <option>Field Operations</option>
                            <option>IT Support</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">Job Description *</label>
                        <textarea
                            rows="4"
                            placeholder="Describe the role, responsibilities, and what the position entails..."
                            className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2 text-sm uppercase tracking-wider">Requirements *</label>
                        <textarea
                            rows="3"
                            className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-4 text-white focus:outline-none"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">Minimum Education *</label>
                            <select className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-gray-400 focus:outline-none appearance-none">
                                <option>Select level</option>
                                <option>Degree</option>
                                <option>Masters</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">Minimum CGPA *</label>
                            <input type="text" placeholder="e.g., 3.0" className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">Years of Experience *</label>
                            <input type="text" placeholder="e.g., 0-2 years" className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600" />
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">Number of Positions *</label>
                            <input type="text" placeholder="e.g., 12" className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">Salary Range</label>
                            <input type="text" placeholder="e.g., 15,000 - 25,000 ETB" className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none placeholder:text-gray-600" />
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">Application Deadline *</label>
                            <div className="relative">
                                <input type="date" className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-white focus:outline-none [color-scheme:dark]" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-1.5 text-xs uppercase tracking-wider">Location Preference</label>
                        <select className="w-full bg-[#050e1f] border border-white/10 rounded-xl p-3 text-gray-400 focus:outline-none appearance-none">
                            <option>Select preference</option>
                            <option>Remote</option>
                            <option>On-site</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-white font-medium text-xs uppercase tracking-wider">Language Requirements</label>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="sidaamu" className="w-5 h-5 accent-blue-500 rounded border-white/10 bg-[#050e1f]" defaultChecked />
                            <label htmlFor="sidaamu" className="text-gray-300 text-sm">Sidaamu Afoo Proficiency Required</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="amharic" className="w-5 h-5 accent-blue-500 rounded border-white/10 bg-[#050e1f]" />
                            <label htmlFor="amharic" className="text-gray-300 text-sm">Amharic Proficiency Required</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="english" className="w-5 h-5 accent-blue-500 rounded border-white/10 bg-[#050e1f]" />
                            <label htmlFor="english" className="text-gray-300 text-sm">English Proficiency Required</label>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#059669] hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all"
                        >
                            <CheckCircle size={20} />
                            Publish Job Posting
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