import React from 'react';
import { Shield, LogOut, User, Bell } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AdminNavbar = ({ adminName, onLogout }) => {

  const getUserRole = () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString || userString === "undefined") return null;
      const data = JSON.parse(userString);
      const userRole = data?.role || data?.user?.role || data?.admin?.role;
      return userRole?.trim().toUpperCase();
    } catch {
      return null;
    }
  };

  // REAL-WORLD ASYNC LOGOUT EXECUTION
  const handleLogoutClick = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const currentRole = getUserRole();
    const fallbackRedirectTarget = currentRole === "ADMIN" ? "/" : "/";
    
    // Setup the visual theme for your toast alerts
    const toastOptions = {
      style: {
        background: '#111111',
        color: '#ffffff',
        border: '1px solid #222222',
        fontSize: '13px',
        borderRadius: '8px'
      },
      iconTheme: {
        primary: '#0070f3',
        secondary: '#ffffff',
      },
    };

    try {
      const logoutEndpoint = currentRole === "ADMIN" ? '/api/admin/logout' : '/api/auth/logout';
      
      const response = await axios.post(logoutEndpoint, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('token')}`
        }
      });

      // 2. ONLY IF CHECK PASSES AND SERVER RESPONDS WITH SUCCESS
      if (response.status === 200 || response.data.success) {
        
        // Render success notification dynamically based on backend completion
        toast.success('Logged out successfully', toastOptions);

        // Clear local credentials now that server session is dead
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
        // Handle edge-cases where backend explicitly denies the request
        toast.error('Logout validation failed. Try again.', toastOptions);
      }

    } catch (err) {
      console.error("Backend validation failed or network timed out:", err);
      
      // Real-World Fallback Strategy: Even if network drops out, we wipe client trace for safety
      toast.error('Session expired. Cleared local matrix.', toastOptions);
      
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
    <nav className="w-full bg-[#000000] border-b border-[#111111] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2.5">
        <div className="bg-[#0070f3]/10 p-2 rounded-lg border border-[#0070f3]/20">
          <Shield className="w-5 h-5 text-[#0070f3]" />
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-tight block">
            MESOB HRMS
          </span>
          <span className="text-[10px] text-gray-500 font-medium block uppercase tracking-wider -mt-0.5">
            Administrative Core
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-[#050505] border border-transparent hover:border-[#1a1a1a] transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#0070f3] rounded-full" />
        </button>

        <div className="h-6 w-px bg-[#111111]" />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-semibold text-white">
              {adminName || 'System Admin'}
            </span>
            <span className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">
              Root Authority
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-center text-gray-400">
            <User className="w-4 h-4" />
          </div>
        </div>

        <div className="h-6 w-px bg-[#111111]" />

        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-[#ff3333] bg-[#050505] hover:bg-[#ff3333]/10 border border-[#1a1a1a] hover:border-[#ff3333]/30 px-3 py-2 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;