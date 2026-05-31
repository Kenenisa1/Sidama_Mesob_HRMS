import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("adminToken");
  const userString = localStorage.getItem("user");

  // Clean wipe helper to prevent routing locks
  const clearSessionAndRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  };

  if (!token || !userString || userString === "undefined") {
    return clearSessionAndRedirect();
  }

  try {
    const data = JSON.parse(userString);
    // Deep scan payload formats to capture user parameters
    const userRole = data?.role || data?.user?.role || data?.admin?.role;

    if (adminOnly && userRole?.toUpperCase() !== "ADMIN") {
      console.warn("Access Denied: Required ADMIN role, but found:", userRole);
      return clearSessionAndRedirect();
    }

    return children;
  } catch (error) {
    console.error("Session Parse Failure:", error);
    return clearSessionAndRedirect();
  }
};

export default ProtectedRoute;