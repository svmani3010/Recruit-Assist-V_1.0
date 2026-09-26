// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // For now, we'll use a dummy check. Later we'll use real auth state.
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  // Or use context/state management later

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
