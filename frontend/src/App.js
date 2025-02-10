import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import Roadmap from "./pages/Roadmap";
import DiscussionPage from "./pages/DiscussionPage";
import ResourcesPage from "./pages/ResourcePage";
import RecommendationTest from "./pages/RecommdationTest";

// This component handles routing and loading logic
const AppContent = () => {
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const location = useLocation(); // Inside the Router context

  useEffect(() => {
    const handleStartLoading = () => setLoading(true); // Show loading spinner
    const handleEndLoading = () => setLoading(false);  // Hide loading spinner

    // Trigger loading on route change
    handleStartLoading();

    const timer = setTimeout(() => {
      handleEndLoading(); // Simulate a short delay to show spinner
    }, 1500); // Adjust the delay as per your need

    return () => clearTimeout(timer);
  }, [location]);

  return loading ? (
    <Loading />
  ) : (
    <Routes>
      {/* Routes of Application */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <Roadmap />
          </ProtectedRoute>
        }
      />
      <Route
        path="/discussion"
        element={
          <ProtectedRoute>
            <DiscussionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <ResourcesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rcmd"
        element={<RecommendationTest />}
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      {/* AppContent is wrapped by the Router */}
      <AppContent />
    </Router>
  );
};

export default App;
