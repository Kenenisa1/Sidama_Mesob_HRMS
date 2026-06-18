import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ScrollText,
  UserCheck,
  ShieldAlert,
  Scale,
  MessageSquare,
  Lock,
  BookOpen,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const TermsAndConditions = () => {
  const sectionRefs = useRef({});
  const navRef = useRef(null);

  const sections = [
    {
      id: "intro",
      title: "1. Acceptance of Terms",
      icon: <ScrollText className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            Welcome to the SidaMOV (Sidama Mesob Online Vacancy) Portal. By
            accessing or using this platform, you agree to comply with these
            Terms & Conditions together with all applicable regional and federal
            laws.
          </p>

          <p>
            If you disagree with any of these terms, please discontinue using
            the portal immediately.
          </p>
        </>
      ),
    },

    {
      id: "eligibility",
      title: "2. Eligibility & Application Requirements",
      icon: <UserCheck className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">To apply through this portal, users must:</p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Meet legal working age requirements.</li>

            <li>Submit authentic educational and professional credentials.</li>

            <li>Provide accurate demographic and residency information.</li>
          </ul>

          <div className="mt-5 bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4 flex gap-3">
            <ShieldAlert
              size={18}
              className="text-amber-400 mt-1 flex-shrink-0"
            />

            <p className="text-sm text-amber-200 leading-7">
              Providing fraudulent documents or false information may result in
              permanent disqualification and legal action.
            </p>
          </div>
        </>
      ),
    },

    {
      id: "security",
      title: "3. Account Security & Verification",
      icon: <Lock className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            Users are responsible for protecting their login credentials and
            account access.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Report suspicious login activity immediately.</li>

            <li>Avoid sharing passwords with third parties.</li>

            <li>Log out from public devices after use.</li>
          </ul>
        </>
      ),
    },

    {
      id: "conduct",
      title: "4. User Code of Conduct",
      icon: <Zap className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            Users must interact responsibly with the HRMS platform and agree not
            to:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Use automated scraping or hacking tools.</li>

            <li>Upload malicious or corrupted files.</li>

            <li>Attempt unauthorized access to system infrastructure.</li>

            <li>Use abusive or offensive language.</li>
          </ul>
        </>
      ),
    },

    {
      id: "ip",
      title: "5. Intellectual Property Rights",
      icon: <Award className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            All branding, visual assets, source code, and digital content belong
            exclusively to SidaMOV (Sidama Mesob Online Vacancy).
          </p>

          <p>
            Users receive limited permission to access the portal strictly for
            legitimate HR and recruitment purposes.
          </p>
        </>
      ),
    },

    {
      id: "liability",
      title: "6. Limitation of Liability",
      icon: <Scale className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            The HRMS portal is provided on an “as-available” basis without
            guarantees of uninterrupted operation.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400 mb-3">
            <li>
              Temporary outages may occur during maintenance or network issues.
            </li>

            <li>Some uploaded files may fail due to incompatible formats.</li>
          </ul>

          <p>
            SidaMOV shall not be liable for damages caused by temporary
            inaccessibility of the system.
          </p>
        </>
      ),
    },

    {
      id: "law",
      title: "7. Governing Law & Dispute Resolution",
      icon: <BookOpen className="text-emerald-400" size={18} />,
      content: (
        <>
          <p>
            These terms are governed by Ethiopian federal and regional laws. Any
            disputes arising from the use of this portal shall be resolved
            through the competent courts within Sidama Regional State.
          </p>
        </>
      ),
    },
  ];

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];

    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 120;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    navRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    navRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--color-text-secondary)] overflow-x-hidden relative pb-20">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-950/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-950/15 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        {/* HEADER */}
        <section className="text-center mb-14">
          <FadeIn>
            {/* BADGE */}
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 uppercase tracking-[0.25em] mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <ScrollText size={13} />
              Legal Framework
            </span>

            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight leading-tight">
              Terms & <span className="text-emerald-500">Conditions</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto leading-8">
              Please carefully review these legal terms before using the SidaMOV
              hiring platform and digital recruitment services.
            </p>

            {/* LAST UPDATED */}
            <p className="text-xs text-slate-500 mt-4 font-semibold uppercase tracking-wider">
              Last Updated: May 2026
            </p>

            {/* HORIZONTAL NAV */}
            <div className="mt-10 relative">
              {/* GLOW */}
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-3xl"></div>

              <div className="relative flex items-center">
                {/* LEFT BUTTON */}
                <button
                  onClick={scrollLeft}
                  className="
                    absolute
                    left-0
                    bottom-0
                    top-0
                    z-20
                    w-11
                    rounded-2xl
                    bg-[var(--surface-soft)]
                    border
                    border-[var(--nav-border)]
                    backdrop-blur-xl
                    flex
                    items-center
                    justify-center
                    text-[var(--color-text-secondary)]
                    hover:bg-emerald-500/20
                    transition-all
                    duration-300
                    shadow-xl
                  "
                >
                  <ChevronLeft size={20} />
                </button>

                {/* NAV CONTAINER */}
                <div
                  ref={navRef}
                  className="
                    flex
                    items-center
                    gap-3
                    overflow-x-hidden
                    scroll-smooth
                    px-16
                    py-4
                    bg-[var(--surface-soft)]
                    backdrop-blur-xl
                    border
                    border-[var(--nav-border)]
                    rounded-3xl
                    w-full
                  "
                >
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="
                        group
                        flex-shrink-0
                        flex
                        items-center
                        gap-3
                        px-5
                        py-3
                        rounded-2xl
                        bg-[var(--surface-soft)]
                        hover:bg-emerald-500
                        border
                        border-[var(--nav-border)]
                        hover:border-emerald-400
                        transition-all
                        duration-300
                        hover:scale-105
                      "
                    >
                      {/* ICON */}
                      <div
                        className="
                          w-9
                          h-9
                          rounded-xl
                          bg-[var(--surface-soft)]
                          flex
                          items-center
                          justify-center
                          group-hover:bg-[var(--surface-soft)]
                          transition
                        "
                      >
                        {section.icon}
                      </div>

                      {/* TEXT */}
                      <span
                        className="
                          text-sm
                          font-semibold
                          whitespace-nowrap
                          text-slate-300
                          group-hover:text-white
                          transition
                        "
                      >
                        {section.title.split(". ")[1]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* RIGHT BUTTON */}
                <button
                  onClick={scrollRight}
                  className="
                    absolute
                    right-0
                    top-0
                    bottom-0
                    z-20
                    w-11
                    rounded-2xl
                    bg-[var(--surface-soft)]
                    border
                    border-[var(--nav-border)]
                    backdrop-blur-xl
                    flex
                    items-center
                    justify-center
                    text-[var(--color-text-secondary)]
                    hover:bg-emerald-500/20
                    transition-all
                    duration-300
                    shadow-xl
                  "
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* CONTENT */}
        <div className="space-y-7 max-w-4xl mx-auto">
          {sections.map((section, idx) => (
            <FadeIn key={section.id} delay={idx * 0.05}>
              <div
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="
                  relative
                  overflow-hidden
                  p-6
                  sm:p-8
                  rounded-[30px]
                  bg-[var(--surface-soft)]
                  border
                  border-[var(--surface-border)]
                  hover:border-emerald-500/20
                  transition-all
                  duration-300
                  backdrop-blur-xl
                "
              >
                {/* GLOW */}
                <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/5 blur-3xl rounded-full"></div>

                {/* HEADER */}
                <div className="relative flex items-center gap-4 mb-5">
                  <div
                    className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-emerald-500/10
                    flex
                    items-center
                    justify-center
                    border
                    border-emerald-500/15
                  "
                  >
                    {section.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                    {section.title}
                  </h3>
                </div>

                {/* CONTENT */}
                <div className="relative text-sm sm:text-base leading-8 text-slate-400 space-y-3">
                  {section.content}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* CONTACT SECTION */}
          <FadeIn delay={0.4}>
            <section
              className="
              mt-10
              p-6
              sm:p-8
              rounded-[32px]
              bg-gradient-to-r
              from-emerald-500
              to-emerald-400
              text-[#020c1b]
              flex
              flex-col
              lg:flex-row
              justify-between
              items-start
              lg:items-center
              gap-8
              shadow-[0_20px_80px_rgba(16,185,129,0.25)]
            "
            >
              <div>
                <h4 className="text-2xl sm:text-3xl font-black mb-3 flex items-center gap-3">
                  <MessageSquare size={26} />
                  Need Legal Help?
                </h4>

                <p className="max-w-2xl leading-8 font-medium">
                  Contact our compliance and legal support team for
                  clarification about recruitment policies, digital usage, or
                  employment regulations.
                </p>
              </div>

              <Link
                to="/help#contact"
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-[var(--surface-soft)]
                  hover:bg-[var(--bg)]
                  text-[var(--color-text-primary)]
                  font-bold
                  px-7
                  py-4
                  rounded-2xl
                  transition-all
                  hover:scale-105
                  shadow-2xl
                "
              >
                Contact Legal
              </Link>
            </section>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
