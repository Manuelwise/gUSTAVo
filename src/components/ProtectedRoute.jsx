import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

<<<<<<< HEAD
const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, role } = useAuth();
=======
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

<<<<<<< HEAD
  if (requiredRole && role !== requiredRole) {
    return role === 'Admin' ? 
      <Navigate to="/admin/dashboard" /> : 
      <Navigate to="/user/dashboard" />;
  }

=======
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
  return children;
};

export default ProtectedRoute;