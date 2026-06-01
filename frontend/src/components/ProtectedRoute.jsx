import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("adminToken");
  const userString = localStorage.getItem("user");

  // Catch unpopulated, malformed, or missing authentication credentials instantly
  if (!token || !userString || userString === "undefined") {
    // Clean wipe corrupted states safely
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const data = JSON.parse(userString);
    
    // Deep scan payload formats to safely extract user role configurations
    const userRole = data?.role || data?.user?.role || data?.admin?.role;
    const normalizedRole = userRole?.trim().toUpperCase();

    // REAL-WORLD FIX: Separate unauthorized entry from total session destruction
    if (adminOnly && normalizedRole !== "ADMIN") {
      console.warn("Access Denied: Required ADMIN privilege matrix, found role topology:", userRole);
      
      // Redirect them to their respective unauthorized or standard portal view instead of logging them out completely
      return <Navigate to="/unauthorized" replace />;
    }

    // Pass verification check successfully
    return children;
    
  } catch (error) {
    console.error("Session Payload Parse Failure:", error);
    
    // Hard structural wipe fallback on severe data corruption
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedRoute;