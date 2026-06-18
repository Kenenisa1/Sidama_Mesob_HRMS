import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Lock,
  Database,
  Eye,
  Share2,
  Cookie,
  ShieldCheck,
  Globe,
  RefreshCw,
  HelpCircle,
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

const PrivacyPolicy = () => {
  const sectionRefs = useRef({});
  const navRef = useRef(null);

  const sections = [
    {
      id: "intro",
      title: "1. Introduction",
      icon: <Globe className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            At SidaMOV (Sidama Mesob Online Vacancy), we take your privacy and
            data security seriously. This Privacy Policy details how our hiring
            platform collects, processes, protects, and discloses personal
            information when you use the portal.
          </p>

          <p>
            By submitting an application, creating an administrator account, or
            using the portal, you consent to the data practices described in
            this policy.
          </p>
        </>
      ),
    },

    {
      id: "collection",
      title: "2. Information We Collect",
      icon: <Database className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            To provide an efficient paperless recruitment process, we collect
            the following types of information:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Full name, gender, nationality, and date of birth.</li>

            <li>Contact details including phone number and email.</li>

            <li>
              Educational credentials, resumes, certificates, and work
              experience.
            </li>

            <li>
              System logs, browser data, and login timestamps for security
              monitoring.
            </li>
          </ul>
        </>
      ),
    },

    {
      id: "usage",
      title: "3. How We Use Your Data",
      icon: <Eye className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            We use your information strictly for recruitment and system
            administration purposes.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Processing and reviewing job applications.</li>

            <li>Sending interview notifications and status updates.</li>

            <li>Preventing fraud and maintaining platform security.</li>

            <li>Improving digital public recruitment services.</li>
          </ul>
        </>
      ),
    },

    {
      id: "sharing",
      title: "4. Data Sharing & Disclosures",
      icon: <Share2 className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            Your information is never sold or rented to third-party
            organizations.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Data may be shared with authorized government offices.</li>

            <li>
              Information may be disclosed if legally required by courts or
              regulatory bodies.
            </li>
          </ul>
        </>
      ),
    },

    {
      id: "security",
      title: "5. Data Security Standards",
      icon: <ShieldCheck className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            We implement advanced security measures to protect your information
            and uploaded documents.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>SSL/TLS encrypted communication.</li>

            <li>Secure server infrastructure and encrypted storage.</li>

            <li>Role-based access control for administrators.</li>
          </ul>
        </>
      ),
    },

    {
      id: "cookies",
      title: "6. Cookies & Tracking Tools",
      icon: <Cookie className="text-emerald-400" size={18} />,
      content: (
        <>
          <p>
            The portal uses essential session cookies for secure authentication
            and maintaining user sessions. We do not use third-party advertising
            trackers.
          </p>
        </>
      ),
    },

    {
      id: "rights",
      title: "7. Your Legal Rights",
      icon: <Lock className="text-emerald-400" size={18} />,
      content: (
        <>
          <p className="mb-3">
            Applicants maintain rights regarding their personal information and
            records.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>You may update or correct your information anytime.</li>

            <li>
              You may request removal of your records subject to legal
              requirements.
            </li>
          </ul>
        </>
      ),
    },

    {
      id: "revisions",
      title: "8. Policy Revisions",
      icon: <RefreshCw className="text-emerald-400" size={18} />,
      content: (
        <>
          <p>
            This Privacy Policy may be updated periodically to reflect changes
            in security standards, legal requirements, or digital government
            regulations.
          </p>
        </>
      ),
    },
  ];

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.scrollBy({
      top: -120,
      behavior: "smooth",
    });
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
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-emerald-950/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[20%] left-[-5%] w-[600px] h-[600px] bg-cyan-950/15 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        {/* HEADER */}
        <section className="text-center mb-14">
          <FadeIn>
            {/* BADGE */}
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 uppercase tracking-[0.25em] mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <Lock size={13} />
              Privacy & Trust
            </span>

            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight leading-tight">
              Privacy <span className="text-emerald-500">Policy</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto leading-8">
              We respect your right to confidentiality. Learn how we securely
              manage, protect, and process personal information inside the
              SidaMOV hiring platform.
            </p>

            {/* LAST UPDATED */}
            <p className="text-xs text-slate-500 mt-4 font-semibold uppercase tracking-wider">
              Last Updated: May 2026
            </p>

            {/* NAVBAR */}
            <div className="mt-10 relative">
              {/* LEFT BUTTON */}
              <button
                onClick={scrollLeft}
                className="
                  absolute
                  left-0
                  top-0
                  bottom-0
                  z-20
                  w-11
                  flex
                  items-center
                  justify-center
                  rounded-l-3xl
                  bg-[var(--surface-soft)]
                  backdrop-blur-xl
                  border-r
                  border-[var(--nav-border)]
                  hover:bg-emerald-500/20
                  transition-all
                "
              >
                <ChevronLeft
                  size={22}
                  className="text-[var(--color-text-secondary)]"
                />
              </button>

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
                  flex
                  items-center
                  justify-center
                  rounded-r-3xl
                  bg-[var(--surface-soft)]
                  backdrop-blur-xl
                  border-l
                  border-[var(--nav-border)]
                  hover:bg-emerald-500/20
                  transition-all
                "
              >
                <ChevronRight
                  size={22}
                  className="text-[var(--color-text-secondary)]"
                />
              </button>

              {/* BLUR */}
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-3xl"></div>

              {/* NAV LINKS */}
              <div
                ref={navRef}
                className="
                  relative
                  flex
                  items-center
                  gap-3
                  overflow-x-auto
                  scroll-smooth
                  px-16
                  py-4
                  bg-[var(--surface-soft)]
                  backdrop-blur-xl
                  border
                  border-[var(--nav-border)]
                  rounded-3xl
                "
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
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
                <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/5 blur-3xl rounded-full"></div>

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

                <div className="relative text-sm sm:text-base leading-8 text-slate-400 space-y-3">
                  {section.content}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* CONTACT */}
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
                  <HelpCircle size={26} />
                  Need Help?
                </h4>

                <p className="max-w-2xl leading-8 font-medium">
                  Our data protection team is available to answer questions
                  regarding privacy, account security, document protection, and
                  digital recruitment systems.
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
                Email Officer
              </Link>
            </section>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
