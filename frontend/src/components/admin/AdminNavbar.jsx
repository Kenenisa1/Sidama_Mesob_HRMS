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
        background: '#ffffff',
        color: '#111827',
        border: '1px solid #e5e7eb',
        fontSize: '13px',
        fontWeight: 'bold',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.08)'
      },
      iconTheme: {
        primary: '#10B981',
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
    <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between z-[9999] shadow-[0_4px_20px_rgba(16,185,129,0.08)]">
      <div className="flex items-center gap-3">
        <div className="bg-oled-green/10 p-2.5 rounded-xl border border-oled-green/20 shadow-sm">
          <Shield className="w-6 h-6 text-oled-green" />
        </div>
        <div>
          <span className="text-base font-extrabold bg-gradient-to-r from-oled-dark to-oled-green bg-clip-text text-transparent tracking-tight block">
            MESOB HRMS
          </span>
          <span className="text-[11px] text-gray-500 font-bold block uppercase tracking-widest mt-0.5">
            Administrative Core
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-gray-900">
              {adminName || 'System Admin'}
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Root Authority
            </span>
          </div>
          
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-gray-200 hover:border-rose-200 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;