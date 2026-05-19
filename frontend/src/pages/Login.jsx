import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "12345";

    if (form.email === adminEmail && form.password === adminPassword) {
      localStorage.setItem("role", "admin");

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/admin");
      }, 800);
    } else {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020c17] via-[#052e2b] to-[#020c17]">
      
      {/* Toast container */}
      <Toaster position="bottom-center" />

      <div className="w-full max-w-lg p-8 rounded-2xl bg-gradient-to-r from-[#020c17] via-[#052e2b] to-[#020c17] border border-gray-800 shadow-xl backdrop-blur-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Admin Login
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Enter your admin credentials to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="flex items-center border border-gray-700 rounded-xl px-4 py-3 bg-[#020617] focus-within:ring-2 focus-within:ring-green-500">
            <Mail className="text-gray-500 mr-3" size={18} />

            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-700 rounded-xl px-4 py-3 bg-[#020617] focus-within:ring-2 focus-within:ring-green-500">
            <Lock className="text-gray-500 mr-3" size={18} />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-4 rounded-xl font-semibold transition duration-300"
          >
            Login as Admin
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Restricted access – Admin only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;