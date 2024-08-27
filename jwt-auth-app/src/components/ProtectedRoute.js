import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/authService';

const ProtectedRoute = ({ component: Component }) => {
  return AuthService.isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;