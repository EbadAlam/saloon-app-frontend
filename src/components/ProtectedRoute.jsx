import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../routes';

const ProtectedRoute = ({ children , admin = false}) => {
  const { user, token,loading } = useAuth();
  const location = useLocation();
    if (loading) {
        return <div>Loading...</div>;
    }
  if (!user || !token) {
    return <Navigate to={ROUTES.loginSignup} replace state={{ redirectToState: "home" }} />;
  }
  if (admin) {
    if (user.user_info?.role === 'master-admin') {
      return children;
    } else {
      return <div>You're not allowed to access this page.</div>;
    }
  }
  return children;
};

export default ProtectedRoute;
