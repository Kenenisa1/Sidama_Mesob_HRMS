import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
  const [jobs, setJobs] = useState([]);

  // FETCH JOB FROM BACKEND
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/jobs"
        );

        setJobs(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, []);

  // LOADING
  if (jobs.length === 0) {
    return (
      <div className="text-white text-center py-20">
        Loading...
      </div>
    );
  }

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

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-[#0a1929] border border-white/10 rounded-3xl p-8 shadow-xl mb-10"
          >

            {/* Title */}
            <div className="flex flex-col lg:flex-row justify-between mb-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {job.title}
                </h1>

                <p className="text-gray-400 mt-2">
                  {job.department}
                </p>
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

              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-6">

                {/* Tags */}
                <div className="flex flex-wrap gap-3">

                  <Tag
                    icon={<MapPin size={16} />}
                    text={job.location}
                  />

                  <Tag
                    icon={<DollarSign size={16} />}
                    text={job.salary}
                  />

                  {/* LANGUAGES */}
                  {job.languages?.amharic && (
                    <Tag
                      icon={<Languages size={16} />}
                      text="Amharic"
                    />
                  )}

                  {job.languages?.english && (
                    <Tag
                      icon={<Languages size={16} />}
                      text="English"
                    />
                  )}
                </div>

                {/* Description */}
                <Section title="Job Description">
                  {job.description}
                </Section>

                {/* Responsibilities */}
                <Section title="Responsibilities">
                  <div className="text-gray-300">
                    {job.requirements}
                  </div>
                </Section>

                {/* Requirements */}
                <Section title="Requirements">
                  {job.requirements}
                </Section>
              </div>

              {/* RIGHT SIDE */}
              <div className="bg-[#021217] border border-white/10 rounded-2xl p-6 space-y-5 h-fit">

                <h3 className="text-white font-bold text-lg mb-2">
                  Job Overview
                </h3>

                <InfoRow
                  icon={<GraduationCap />}
                  label="Education"
                  value={job.education}
                />

                <InfoRow
                  icon={<Briefcase />}
                  label="Experience"
                  value={job.experience}
                />

                <InfoRow
                  icon={<Users />}
                  label="Positions"
                  value={job.positions}
                />

                <InfoRow
                  icon={<CalendarDays />}
                  label="Deadline"
                  value={
                    new Date(job.deadline).toDateString()
                  }
                />

                <InfoRow
                  icon={<MapPin />}
                  label="Location"
                  value={job.location}
                />

                {/* LANGUAGE DISPLAY */}
                <InfoRow
                  icon={<Languages />}
                  label="Languages"
                  value={`
                    ${job.languages?.amharic ? "Amharic " : ""}
                    ${job.languages?.english ? "English" : ""}
                  `}
                />

                <InfoRow
                  icon={<GraduationCap />}
                  label="CGPA"
                  value={job.cgpa}
                />

                {/* Buttons */}
                <div className="pt-4 space-y-3">

                  <Link to="/application">
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 mb-2 rounded-xl flex items-center justify-center gap-2">
                      Apply Now <ArrowRight size={18} />
                    </button>
                  </Link>

                  <Link to="/featuredPositions">
                    <button className="w-full border border-white/20 text-white py-3 rounded-xl hover:bg-white hover:text-emerald-500">
                      View All Jobs
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};


/* SECTION */
const Section = ({ title, children }) => (
  <div className="bg-[#021217] border border-white/10 rounded-2xl p-6">
    <h3 className="text-white font-bold text-lg mb-4">
      {title}
    </h3>

    <div className="text-gray-400">
      {children}
    </div>
  </div>
);


/* TAG */
const Tag = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-sm">
    {icon}
    {text}
  </div>
);


/* INFO ROW */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 border-b border-white/10 pb-2">

    <div className="text-emerald-400">
      {icon}
    </div>

    <div>
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="text-white text-sm font-medium">
        {value}
      </p>
    </div>
  </div>
);

export default FeaturedPosition;