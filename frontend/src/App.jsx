import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"; // ✅ Added Navigate
import { Toaster } from "react-hot-toast";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Application from "./pages/Application";
import JobDetail from "./pages/JobDetail";
import TermsAndConditions from "./pages/TermsAndConditions";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JobList from "./components/JobList";

// Admin System Components & Pages
import AdminNavbar from "./components/admin/AdminNavbar"; 
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPortal from "./pages/admin/AdminPortal";
import CreateJob from "./pages/admin/CreateJob"; 
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const AppContent = () => {
  const location = useLocation();
  const currentPath = location.pathname;


  const isAdminRootPath = currentPath.startsWith("/admin");
  const isLoginPage = currentPath === "/admin/login";
  
  const shouldRenderAdminNavbar = isAdminRootPath && !isLoginPage;
  const shouldRenderPublicNavbar = !isAdminRootPath;

  return (
    <div className="pt-[73px] lg:pt-[80px] min-h-screen flex flex-col bg-[#010409] text-white selection:bg-emerald-500/30">
      

      {shouldRenderPublicNavbar && <Navbar />}
      {shouldRenderAdminNavbar && <AdminNavbar />}

      <main className="flex-grow">
        <Routes>
          {/* =========================================================
              PUBLIC VISITOR ROUTES
             ========================================================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/joblist" element={<JobList />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* Job Vacancy Routes */}
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/apply/:id" element={<Application />} /> 
          <Route path="/jobs/:id/apply" element={<Application />} />

          {/* =========================================================
              SECURE ADMIN AUTHENTICATION MATRIX
             ========================================================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Redirect /admin to /admin/login for unauthenticated users */}
          <Route 
            path="/admin" 
            element={<Navigate to="/admin/login" replace />} 
          />

          <Route
            path="/admin/dashboard" // Double check if your portal routes to /admin/dashboard or just uses /admin with states
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-job"
            element={
              <ProtectedRoute adminOnly={true}>
                <CreateJob />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback Route */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
                <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase font-black bg-emerald-950/30 border border-emerald-900/50 px-3 py-1.5 rounded-lg">Error 404</span>
                <h2 className="text-xl font-black uppercase text-zinc-300">ገጹ አልተገኘም / Path Not Found</h2>
                <p className="text-zinc-500 text-sm max-w-xs">The requested navigation gateway does not exist within the system index configuration.</p>
              </div>
            }
          />
        </Routes>
      </main>

      {shouldRenderPublicNavbar && <Footer />}
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          icon: null,
          style: {
            background: "#000000",
            color: "#fff",
            border: "1px solid #27272a",
            padding: "16px 24px",
            borderRadius: "1rem",
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
          },
          success: { style: { border: "1px solid rgba(16, 185, 129, 0.3)", background: "#040905" } },
          error: { style: { border: "1px solid rgba(239, 68, 68, 0.3)", background: "#0c0505" } },
        }}
      />
      <AppContent />
    </Router>
  );
};

export default App;