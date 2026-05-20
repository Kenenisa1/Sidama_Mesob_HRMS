import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Application from "./pages/Application";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedPosition from "./components/Homepage/FeaturedPositions";

// Admin System
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPortal from "./pages/admin/AdminPortal";
import ProtectedRoute from "./components/ProtectedRoute";

// Inner layout layout manager to cleanly wipe public Navbar/Footer from Admin space
const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-[#020c17] text-white selection:bg-emerald-500/30">
      {/* Render public Navbar only if we aren't in the Admin view */}
      {!isAdminPath && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* =========================================================
              PUBLIC VISITOR ROUTES
             ========================================================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/application" element={<Application />} />
          <Route path="/featuredPositions" element={<FeaturedPosition />} />

          {/* =========================================================
              PUBLIC ADMIN AUTHENTICATION
             ========================================================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* =========================================================
              PROTECTED ENTERPRISE PORTAL ROOT
             ========================================================= */}
          {/* The trailing wildcard '*' is critical here. It signals to 
            React Router that sub-routes like /admin/dashboard or 
            /admin/settings will be handled internally inside <AdminPortal />.
          */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPortal />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Render public Footer only if we aren't in the Admin view */}
      {!isAdminPath && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          icon: null,
          style: {
            background: "#050c1a",
            color: "#fff",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            padding: "16px 24px",
            borderRadius: "1rem",
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
          },
          success: {
            style: {
              border: "1px solid rgba(16, 185, 129, 0.5)",
            },
          },
          error: {
            style: {
              border: "1px solid rgba(234, 88, 12, 0.5)",
            },
          },
        }}
      />
      <AppContent />
    </Router>
  );
};

export default App;