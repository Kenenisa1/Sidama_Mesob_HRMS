import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="text-center relative z-20 px-4 sm:px-6 py-12 sm:py-16
      bg-gradient-to-r from-[#020c17] via-[#052e2b] to-[#020c17] h-[90vh] border-b border-gray-800 shadow-lg"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#059669 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/10 border border-[#059669]/30 text-[#059669] text-[10px] sm:text-xs font-bold mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          Now Hiring
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-white mb-4 sm:mb-6 leading-tight">
          Building a Modern Sidama <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#ea580c]">
            through Organized Benefit
          </span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          Join the digital transformation of public service.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/featuredpositions">
            <button className="bg-[#059669] hover:bg-[#047857] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 text-sm sm:text-base">
              Apply Now <ArrowRight size={20} />
            </button>
          </Link>

          <button className="bg-white text-[#059669] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;