import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("adminToken");
  const userString = localStorage.getItem("user");

  if (!token || !userString || userString === "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const data = JSON.parse(userString);
    const userRole = data?.role || data?.user?.role || data?.admin?.role;

    if (adminOnly && userRole?.toUpperCase() !== "ADMIN") {
      console.warn("Access Denied: Required ADMIN role, but found:", userRole);
      localStorage.removeItem("user");
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedRoute;
