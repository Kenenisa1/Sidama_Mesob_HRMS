import React, { useState } from 'react'; // Added { useState }
import { Plus, Users, MessageCircle, MapPin, Filter, Search, FileText, Eye } from 'lucide-react';
import JobModal from '../../components/JobModal'; // Make sure the path is correct
const StatCard = ({ title, value, subtext, icon: Icon, isTrend }) => (
    <div className="bg-cardBg border border-white/5 p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            <Icon className="text-emeraldAccent w-5 h-5" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">{value}</h2>
        <p className={`text-xs font-medium ${isTrend ? 'text-emeraldAccent' : 'text-gray-500'}`}>
            {subtext}
        </p>
    </div>
);
function AdminPortal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="min-h-screen bg-darkBg p-6 md:p-12 relative">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-400 mt-1">HR Staff Portal - Candidate Management</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accentOrange hover:bg-orange-700 transition-all text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2"
                >
                    <Plus size={20} strokeWidth={3} /> Post New Job
                </button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Applicants"
                    value="8"
                    subtext="+12% from last month"
                    icon={Users}
                    isTrend={true}
                />
                <StatCard
                    title="Sidaamu Afoo Fluent"
                    value="5"
                    subtext="63% of total applicants"
                    icon={MessageCircle}
                    isTrend={false}
                />
                <StatCard
                    title="Woreda Distribution"
                    value="7"
                    subtext="7 Woredas represented"
                    icon={MapPin}
                    isTrend={false}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
                <aside className="lg:col-span-1 bg-cardBg p-6 rounded-2xl border border-white/5 self-start">
                    <div className="flex items-center gap-2 mb-1">
                        <Filter className="text-emeraldAccent w-5 h-5" />
                        <h3 className="text-xl font-bold text-white">Screening Filters</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-8">Refine candidate list</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">Filter by Woreda</label>
                            <select className="w-full bg-darkBg border border-emerald-900/20 rounded-xl p-3 text-gray-400 focus:outline-none">
                                <option>All Woredas</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">Sidaamu Afoo Fluency</label>
                            <select className="w-full bg-darkBg border border-emerald-900/20 rounded-xl p-3 text-gray-400 focus:outline-none">
                                <option>All Levels</option>
                            </select>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-white text-sm font-semibold">CGPA Range: 3.0 - 4.0</label>
                            </div>
                            <input type="range" className="w-full accent-emeraldAccent bg-darkBg h-1.5 rounded-lg appearance-none cursor-pointer" min="2.0" max="4.0" step="0.1" />
                            <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-bold">
                                <span>2.0</span>
                                <span>4.0</span>
                            </div>
                        </div>
                        <button className="w-full bg-white text-emerald-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all mt-4">
                            Reset Filters
                        </button>
                    </div>
                </aside>
                <div className="lg:col-span-3 bg-cardBg p-8 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Candidate List</h3>
                            <p className="text-gray-500">Showing 8 of 8 applicants</p>
                        </div>
                        <button className="flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-bold text-sm">
                            <FileText size={18} /> Export to Excel
                        </button>
                    </div>
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or National ID..."
                            className="w-full bg-darkBg border border-emerald-900/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emeraldAccent/30"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-gray-500 text-sm border-b border-white/5">
                                <tr>
                                    <th className="pb-4"><input type="checkbox" className="accent-emeraldAccent w-4 h-4" /></th>
                                    <th className="pb-4 font-medium">Name</th>
                                    <th className="pb-4 font-medium">National ID</th>
                                    <th className="pb-4 font-medium">Woreda</th>
                                    <th className="pb-4 font-medium">Sidaamu Afoo</th>
                                    <th className="pb-4 font-medium">CGPA</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                <tr className="border-b border-white/5 hover:bg-emerald-900/5 transition-colors group">
                                    <td className="py-4"><input type="checkbox" className="accent-emeraldAccent w-4 h-4" /></td>
                                    <td className="py-4 font-bold">Abebe Tadesse</td>
                                    <td className="py-4 text-gray-400">ET12345678901</td>
                                    <td className="py-4 text-gray-400">Aleta Wondo</td>
                                    <td className="py-4"><span className="bg-emerald-500/10 text-emeraldAccent px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">High</span></td>
                                    <td className="py-4 font-bold">3.85</td>
                                    <td className="py-4"><span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">Pending</span></td>
                                    <td className="py-4"><button className="flex items-center gap-1 text-emeraldAccent hover:underline font-bold text-sm"><Eye size={16} /> View</button></td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-emerald-900/5 transition-colors group">
                                    <td className="py-4"><input type="checkbox" className="accent-emeraldAccent w-4 h-4" /></td>
                                    <td className="py-4 font-bold">Chaltu Bekele</td>
                                    <td className="py-4 text-gray-400">ET23456789012</td>
                                    <td className="py-4 text-gray-400">Bensa</td>
                                    <td className="py-4"><span className="bg-emerald-500/10 text-emeraldAccent px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">High</span></td>
                                    <td className="py-4 font-bold">3.72</td>
                                    <td className="py-4"><span className="bg-emerald-500/10 text-emeraldAccent px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">Shortlisted</span></td>
                                    <td className="py-4"><button className="flex items-center gap-1 text-emeraldAccent hover:underline font-bold text-sm"><Eye size={16} /> View</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <JobModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default AdminPortal;