import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return role === 'Admin' ? 
      <Navigate to="/admin/dashboard" /> : 
      <Navigate to="/user/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;