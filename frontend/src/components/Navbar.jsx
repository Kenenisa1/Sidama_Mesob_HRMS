import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Info, HelpCircle, UserPlus,
  Shield, Globe, ChevronDown, Menu, X
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'GB', name: 'English' });

  const languages = [
    { code: 'GB', name: 'English' },
    { code: 'ET', name: 'Amharic' },
    { code: 'ET', name: 'Sidama' }
  ];

  const NavLink = ({ icon: Icon, text, mobile = false }) => (
    <button className={`flex items-center gap-3 text-gray-300 hover:text-white transition-colors group ${mobile ? 'w-full py-4 px-2 text-lg border-b border-gray-800/50' : ''}`}>
      {Icon && <Icon size={mobile ? 24 : 20} className="group-hover:scale-110 transition-transform" />}
      <span className="font-semibold">{text}</span>
    </button>
  );

  return (
    <nav className="relative bg-[#020c17] text-white shadow-xl z-[100]">
      {/* Main Header Row */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* Branding */}
        <div className="flex items-center gap-3 cursor-pointer z-50">
          <div className="p-2 rounded-xl shadow-lg">
            <img src="../../public/mesob.png" alt="Logo" className="w-8 h-8" />
          </div>
          <Link to='/'>
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">SMUC</span>
              <span className="text-[10px] md:text-xs font-medium text-[#059669]">Sidama Mesob Unity Center</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/featuredPosition">
            <NavLink text="Open Roles" />
          </Link>
          <NavLink  />
          <Link to="/about">
            <NavLink text="About" />
          </Link>
          <Link to="/help">
            <NavLink text="Help" />
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/admin">
            <button className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#ea580c] px-5 py-2.5 rounded-xl font-bold border border-orange-200 transition-all shadow-sm">
              <Shield size={20} />
              Admin Portal
            </button>
          </Link>
          {/* Desktop Language Dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-3 ml-2 border border-gray-700 bg-[#0a1929] px-3 py-2 rounded-lg cursor-pointer hover:border-gray-500 min-w-[140px]"
            >
              <Globe size={18} className="text-gray-400" />
              <span className="text-sm font-medium">{selectedLang.code} {selectedLang.name}</span>
              <ChevronDown size={16} className={`text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </div>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-full bg-[#0a1929] border border-gray-700 rounded-lg shadow-2xl py-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {languages.map((lang) => (
                  <button
                    key={lang.name}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#059669] hover:text-white transition-colors"
                  >
                    {lang.code} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white z-50 transition-transform active:scale-90"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-[#020c17] z-40 p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        lg:hidden
      `}>
        <div className="h-20" />
        <div className="flex flex-col gap-2 overflow-y-auto">
          <NavLink text="Open Roles" mobile />
          <NavLink text="About" mobile />
          <Link to="/help" onClick={() => setIsMenuOpen(false)}>
            <NavLink text="Help" mobile />
          </Link>

          <Link to="/register" onClick={() => setIsMenuOpen(false)}>
            <button className="flex items-center gap-3 bg-[#059669] text-white p-4 rounded-xl font-bold mt-4 shadow-lg active:scale-95 transition-transform">
              <UserPlus size={24} />
              Register
            </button>
          </Link>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
            <button className="flex items-center gap-3 bg-white text-[#ea580c] p-4 rounded-xl font-bold border border-orange-200 shadow-sm active:scale-95 transition-transform w-full">
              <Shield size={24} />
              Admin Portal
            </button>
          </Link>
          {/* Mobile Language Selector (Accordion style) */}
          <div className="flex flex-col bg-[#0a1929] border border-gray-800 rounded-xl mt-2 overflow-hidden">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-400" />
                <span className="font-medium text-gray-200">{selectedLang.code} {selectedLang.name}</span>
              </div>
              <ChevronDown size={20} className={`text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="flex flex-col border-t border-gray-800 bg-[#050e17]">
                {languages.map((lang) => (
                  <button
                    key={lang.name}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                      setIsMenuOpen(false); // Close menu after selection
                    }}
                    className="p-4 text-left text-gray-300 hover:text-white hover:bg-[#059669]/20"
                  >
                    {lang.code} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;