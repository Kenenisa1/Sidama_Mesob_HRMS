import React, { useState } from 'react';
import { Shield, LogOut, User, Bell, Radio, ChevronDown, Activity } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AdminNavbar = ({ adminName, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getUserRole = () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString || userString === "undefined") return null;
      const data = JSON.parse(userString);
      const userRole = data?.role || data?.user?.role || data?.admin?.role;
      return userRole?.trim().toUpperCase();
    } catch (e) {
      return null;
    }
  };

  // REAL-WORLD ASYNC LOGOUT EXECUTION
  const handleLogoutClick = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const currentRole = getUserRole();
    const fallbackRedirectTarget = "/";
    
    // Custom premium toast options matching the system console palette
    const toastOptions = {
      style: {
        background: '#040712',
        color: '#f4f4f5',
        border: '1px solid #27272a',
        fontSize: '11px',
        fontFamily: 'monospace',
        letterSpacing: '0.05em',
        borderRadius: '12px',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)'
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#000000',
      },
    };

    try {
      const logoutEndpoint = currentRole === "ADMIN" ? '/api/admin/logout' : '/api/auth/logout';
      
      const response = await axios.post(logoutEndpoint, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('token')}`
        }
      });

      if (response.status === 200 || response.data.success) {
        toast.success('SERVER SESSION TERMINATED', toastOptions);

        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('user');
        sessionStorage.clear();

        if (typeof onLogout === 'function') {
          onLogout();
        } else {
          window.location.href = fallbackRedirectTarget;
        }
      } else {
        toast.error('LOGOUT VALIDATION DENIED', {
          ...toastOptions,
          iconTheme: { primary: '#f43f5e', secondary: '#000000' }
        });
      }

    } catch (err) {
      console.error("Backend validation failed or network timed out:", err);
      toast.error('SESSION EXPIRED // LOCAL CLEAR', {
        ...toastOptions,
        iconTheme: { primary: '#f59e0b', secondary: '#000000' }
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('user');
      sessionStorage.clear();

      if (typeof onLogout === 'function') {
        onLogout();
      } else {
        window.location.replace(fallbackRedirectTarget);
      }
    }
  };

  return (
    <nav className="w-full bg-[#000000] border-b border-zinc-900/80 px-6 h-18 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-opacity-95 selection:bg-indigo-500/30">
      
      {/* Top Absolute Decorative Accent Ribbon Line matching Modal Styling */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-indigo-500 to-blue-600 shadow-[0_1px_10px_rgba(99,102,241,0.3)]" />

      {/* Brand Group */}
      <div className="flex items-center gap-3 group select-none">
        <div className="relative bg-zinc-950/80 p-2 rounded-xl border border-zinc-800/80 group-hover:border-indigo-500/40 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <Shield className="w-4.5 h-4.5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-zinc-100 tracking-widest uppercase font-mono">
              Sidama Mesob
            </span>
            <div className="flex items-center gap-1 bg-emerald-950/40 border border-emerald-900/50 rounded-full px-1.5 py-0.5 text-[8px] font-mono font-black text-emerald-400 tracking-tight">
              <Radio size={8} className="animate-pulse" /> LIVE
            </div>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono block uppercase tracking-widest mt-0.5">
            Administrative Core Hub // Portal v2.0
          </span>
        </div>
      </div>

      {/* Right Control Nodes Platform */}
      <div className="flex items-center gap-4">
        
        {/* Dynamic Alerts Core Monitor */}
        <button className="text-zinc-400 hover:text-zinc-100 p-2.5 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all cursor-pointer relative group">
          <Bell className="w-4 h-4 transition-transform group-hover:scale-105" />
          {/* Animated ping dot matrix */}
          <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
          </span>
        </button>

        {/* System Health Diagnostics Ticker (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-2 bg-[#020202] border border-zinc-900 px-3 py-1.5 rounded-xl h-9">
          <Activity size={12} className="text-zinc-500" />
          <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">SYS.HEALTH: 100%</span>
        </div>

        {/* Vertical Structural Splitter */}
        <div className="h-5 w-px bg-zinc-900" />

        {/* Profile Dropdown Trigger */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pr-2.5 rounded-xl hover:bg-zinc-950/80 border border-transparent hover:border-zinc-900 transition-all cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 shadow-inner">
              <User className="w-4 h-4 stroke-[2.5]" />
            </div>
            
            <div className="hidden sm:flex flex-col items-start text-left">
              <span className="text-xs font-bold text-zinc-200 group-hover:text-zinc-100 tracking-wide transition-colors">
                {adminName || 'Kenenisa Mieso'}
              </span>
              <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">
                Root Authority
              </span>
            </div>
            <ChevronDown size={12} className={`text-zinc-500 transition-transform duration-200 ml-0.5 ${isProfileOpen ? 'rotate-180 text-zinc-300' : ''}`} />
          </button>

          {/* Luxury Dropdown Container */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-[#020202] border border-zinc-800 rounded-xl shadow-[0_15px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-[slideDown_0.2s_cubic-bezier(0.16,1,0.3,1)] font-mono">
                <div className="p-2 border-b border-zinc-900 bg-[#050505]">
                  <p className="text-[8px] text-zinc-600 uppercase tracking-widest px-2.5 pt-1">Signed Entry Hash</p>
                  <p className="text-[9px] text-zinc-400 truncate px-2.5 pb-1 select-all">admin@mesob.gov.et</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => { setIsProfileOpen(false); }}
                    className="w-full text-left text-[10px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950 px-2.5 py-2 rounded-lg transition-colors flex items-center gap-2 uppercase tracking-wider"
                  >
                    <User size={12} className="text-zinc-500" /> Account Security
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Structural Splitter */}
        <div className="h-5 w-px bg-zinc-900" />

        {/* Logout Core Trigger */}
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 h-9 text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 hover:text-rose-400 bg-zinc-950/40 hover:bg-rose-950/20 border border-zinc-900 hover:border-rose-900/40 px-3.5 rounded-xl transition-all duration-200 group cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Terminate</span>
        </button>
        
      </div>
    </nav>
  );
};

export default AdminNavbar;