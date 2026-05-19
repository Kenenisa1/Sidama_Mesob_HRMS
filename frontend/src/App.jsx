import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import About from "./pages/About";
import Register from "./pages/Register";
import Application from "./pages/Application";
import Footer from "./components/Footer";
import AdminPortal from "./pages/admin/AdminPortal";
import Login from "./pages/Login";
import FeaturedPosition from "./components/Homepage/FeaturedPositions";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <Router>
      {/* 2. Place it here so it's available on all pages */}

      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          // Remove default icons globally
          icon: null,
          style: {
            background: "#050c1a", // cardBg
            color: "#fff",
            border: "1px solid rgba(16, 185, 129, 0.2)", // Slight emerald glow
            padding: "16px 24px",
            borderRadius: "1rem",
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
          },
          // Custom styles for success/error if you want different borders
          success: {
            style: {
              border: "1px solid rgba(16, 185, 129, 0.5)",
            },
          },
          error: {
            style: {
              border: "1px solid rgba(234, 88, 12, 0.5)", // Tomato orange border for errors
            },
          },
        }}
      />
      <div className="min-h-screen flex flex-col bg-[#020c17] text-white selection:bg-emerald-500/30">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/application" element={<Application />} />
            <Route path="/featuredPositions" element={<FeaturedPosition />} />
            <Route path="/help" element={<Help />} />

            {/* Public Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPortal />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
