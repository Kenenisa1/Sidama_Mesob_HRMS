import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  Home,
  Briefcase,
  Info,
  HelpCircle,
  UserCheck,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [selectedLang, setSelectedLang] = useState({
    code: "GB",
    name: "English",
  });

  const languages = [
    { code: "GB", name: "English" },
    { code: "ET", name: "Amharic" },
    { code: "ET", name: "Sidama" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background page body from scrolling when full-screen mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", text: "Home", icon: <Home size={18} /> },
    { path: "/joblist", text: "Open Roles", icon: <Briefcase size={18} /> },
    { path: "/about", text: "About", icon: <Info size={18} /> },
    { path: "/help", text: "Help", icon: <HelpCircle size={18} /> },
  ];

  return (
    <>
      {/* STRUCTURAL GAP FILLER: Keeps main page elements from sliding directly up under our fixed frame layouts */}
      <div className="h-[73px] lg:h-[80px] w-full bg-[#020c17] absolute top-0 left-0 pointer-events-none -z-10" />

      <nav
        className={`fixed top-0 left-0 right-0 w-full text-white z-[1000] transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-zinc-800/80 shadow-2xl"
            : "bg-[#020c17] border-zinc-900/50"
        }`}
      >
        {/* Main Header Row Container */}
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative w-full">
          
          {/* Logo and Branding Block */}
          <div className="flex items-center gap-3 group z-[10001]">
            <Link
              to="/"
              className="p-1.5 bg-zinc-900/50 border border-zinc-800 rounded-xl group-hover:border-emerald-500/30 transition-colors focus:outline-none"
              title="SMUC Portal Login"
            >
              <img
                src="/mesob.png"
                alt="SMUC Logo"
                className="w-8 h-8 object-contain"
              />
            </Link>

            <Link
              to="/"
              className="flex flex-col leading-tight focus:outline-none"
            >
              <span className="text-xl font-black uppercase tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
                SMUC
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                Sidama Mesob Unity Center
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Large Viewports Only) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-2 select-none
                  ${
                    isActive
                      ? "text-emerald-400 bg-emerald-500/5 border border-emerald-500/10"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/40 border border-transparent"
                  }
                `}
              >
                {item.text}
              </NavLink>
            ))}
          </div>

          {/* Desktop Interface Interface Dropdowns & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2.5 border border-zinc-800 bg-black/40 px-3.5 py-2 rounded-xl cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/30 transition-all text-sm font-bold select-none text-zinc-300 focus:outline-none min-w-[130px]"
              >
                <Globe size={16} className="text-zinc-500" />
                <span>{selectedLang.name}</span>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform duration-200 ${isLangOpen ? "rotate-180 text-emerald-400" : ""}`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-full bg-[#030712] border border-zinc-800/80 rounded-xl shadow-2xl py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                      {lang.code} — {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <Link to="/joblist" className="focus:outline-none">
              <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black uppercase tracking-wider text-[10px] transition-all shadow-[0_0_30px_rgba(16,185,129,0.15)] active:scale-[0.98]">
                <UserCheck size={14} />
                Apply Now
              </button>
            </Link>
          </div>

          {/* Mobile Interface Hamburger / Close Action Icon Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white z-[10001] transition-all active:scale-90 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={26} className="text-white" /> : <Menu size={26} />}
          </button>
        </div>

        {/* Full-Screen Pure OLED Black Mobile Drawer Layer */}
        <div
          className={`
            fixed inset-0 h-screen w-screen bg-[#000000] p-6 flex flex-col gap-6
            transition-all duration-300 ease-in-out lg:hidden
            ${
              isMenuOpen
                ? "opacity-100 translate-x-0 pointer-events-auto z-[10000]"
                : "opacity-0 translate-x-full pointer-events-none z-[-50]"
            }
          `}
        >
          {/* Header Spacer Offset to push child list items below original navbar row boundaries */}
          <div className="h-20 shrink-0" />

          {/* Mobile Navigation Navigation Menu Links Wrapper */}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-140px)] pr-2 pb-10">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 py-4 px-5 rounded-xl text-lg font-bold tracking-wide transition-all
                  ${
                    isActive
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-zinc-400 border border-transparent hover:text-white hover:bg-zinc-900/30"
                  }
                `}
              >
                {item.icon}
                <span>{item.text}</span>
              </NavLink>
            ))}

            <div className="h-[1px] bg-zinc-900 my-4 shrink-0" />

            {/* Mobile View Primary Conversion Flow CTA */}
            <Link to="/joblist" className="w-full shrink-0">
              <button className="flex items-center justify-center gap-3 bg-emerald-600 text-white p-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98] transition-all w-full">
                <UserCheck size={18} />
                Apply Now
              </button>
            </Link>

            {/* Mobile Languages List Wrapper Dropdown Block */}
            <div className="flex flex-col bg-zinc-950 border border-zinc-900 rounded-xl mt-3 overflow-hidden shrink-0">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center justify-between p-4 text-zinc-400 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <Globe size={18} />
                  <span className="font-bold text-sm text-zinc-200">
                    {selectedLang.name}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isLangOpen ? "rotate-180 text-emerald-400" : ""}`}
                />
              </button>

              {isLangOpen && (
                <div className="flex flex-col border-t border-zinc-900 bg-zinc-900/30">
                  {languages.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="p-4 text-left text-sm font-semibold text-zinc-400 hover:text-white hover:bg-emerald-600/10 transition-colors"
                    >
                      {lang.code} — {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;