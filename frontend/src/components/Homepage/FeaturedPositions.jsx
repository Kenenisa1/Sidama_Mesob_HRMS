import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Languages,
  Briefcase,
  GraduationCap,
  CalendarDays,
  DollarSign,
  Users,
} from "lucide-react";

const FeaturedPosition = () => {
  const job = {
    title: "Junior Woreda Administrator",
    department: "Public Administration",
    description:
      "Coordinate development projects, bridge communication between regional and local government, and ensure efficient public service delivery.",
    responsibilities: [
      "Coordinate with Kebele administrators",
      "Facilitate government communication",
      "Monitor development projects",
      "Support policy implementation",
      "Engage with citizens effectively",
    ],
    requirements:
      "Bachelor's degree in Public Administration or related field. Strong communication and leadership skills required.",
    education: "Bachelor Degree",
    cgpa: "3.0+",
    experience: "0 - 2 years",
    positions: 12,
    salary: "15,000 - 25,000 ETB",
    deadline: "May 01, 2026",
    location: "Sidama Region",
    language: "Sidaamu Afoo",
  };

  return (
    <section className="px-6 py-20 bg-gradient-to-r from-[#020c17] via-[#052e2b] to-[#020c17]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-2 mb-10">
          <span className="text-orange-500 text-xl">✦</span>
          <h2 className="text-4xl text-white font-extrabold italic">
            Featured Position
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-[#0a1929] border border-white/10 rounded-3xl p-8 shadow-xl">

          {/* Title */}
          <div className="flex flex-col lg:flex-row justify-between mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {job.title}
              </h1>
              <p className="text-gray-400 mt-2">{job.department}</p>
            </div>

            <div className="mt-4 lg:mt-0 text-left lg:text-right">
              <div className="text-3xl font-black text-emerald-400">
                Open
              </div>
              <div className="text-gray-400 text-sm">
                {job.positions} Positions
              </div>
            </div>
          </div>

          {/* Layout Split */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT SIDE (Main Content) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <Tag icon={<Languages size={16} />} text={job.language} />
                <Tag icon={<MapPin size={16} />} text={job.location} />
                <Tag icon={<DollarSign size={16} />} text={job.salary} />
              </div>

              {/* Description */}
              <Section title="Job Description">
                {job.description}
              </Section>

              {/* Responsibilities */}
              <Section title="Responsibilities">
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-2 text-gray-300">
                      <CheckCircle2 className="text-emerald-400" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Requirements */}
              <Section title="Requirements">
                {job.requirements}
              </Section>
            </div>

            {/* RIGHT SIDE (Smart Summary Panel) */}
            <div className="bg-[#021217] border border-white/10 rounded-2xl p-6 space-y-5 h-fit">

              <h3 className="text-white font-bold text-lg mb-2">
                Job Overview
              </h3>

              <InfoRow icon={<GraduationCap />} label="Education" value={job.education} />
              <InfoRow icon={<Briefcase />} label="Experience" value={job.experience} />
              <InfoRow icon={<Users />} label="Positions" value={job.positions} />
              <InfoRow icon={<CalendarDays />} label="Deadline" value={job.deadline} />
              <InfoRow icon={<MapPin />} label="Location" value={job.location} />
              <InfoRow icon={<Languages />} label="Language" value={job.language} />
              <InfoRow icon={<GraduationCap />} label="CGPA" value={job.cgpa} />

              {/* Buttons */}
              <div className="pt-4 space-y-3">
                <Link to="/register">
                  <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 mb-4 rounded-xl flex items-center justify-center gap-2">
                    Apply Now <ArrowRight size={18} />
                  </button>
                </Link>
                 <Link to="/featuredPosition">
                  <button className="w-full border border-white/20 text-white py-3 rounded-xl hover:bg-white hover:text-emerald-500">
                    View All Jobs
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Section Wrapper */
const Section = ({ title, children }) => (
  <div className="bg-[#021217] border border-white/10 rounded-2xl p-6">
    <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
    <div className="text-gray-400">{children}</div>
  </div>
);

/* Tag */
const Tag = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-sm">
    {icon}
    {text}
  </div>
);

/* Info Row */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
    <div className="text-emerald-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  </div>
);

export default FeaturedPosition;