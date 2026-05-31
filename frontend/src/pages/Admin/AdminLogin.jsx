import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  UserCircle,
  Eye,
  EyeOff,
} from "lucide-react"; // Added Eye icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for visibility
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);

        localStorage.setItem("user", JSON.stringify(data));

        toast.success("Logged in successfully");

        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Unauthorized Access");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server Connection Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020c17] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#050c1a]/60 border border-zinc-800/50 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-6">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
              Admin Portal
            </h1>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mt-2">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                Admin Identifier
              </label>
              <div className="relative">
                <UserCircle
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={20}
                />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="admin@smuc.com"
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field with Toggle */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                Security Key
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Initiate Authentication <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
        <p className="text-center mt-8 text-[9px] text-zinc-700 font-black uppercase tracking-widest">
          System activity is being monitored and logged
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
