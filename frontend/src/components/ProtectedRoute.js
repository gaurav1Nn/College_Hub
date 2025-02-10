import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the component
  return children;
};

export default ProtectedRoute;
