import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore.js';

// Simple example of a protected route using Zustand auth state
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, message: 'Please log in to access this page.' }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
