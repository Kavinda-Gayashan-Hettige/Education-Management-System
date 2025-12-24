

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 


const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();
    
    
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    
    if (allowedRoles && !allowedRoles.includes(role)) {
        
        return <h1 className="text-center mt-5 text-danger">Access Denied! Your role ({role}) cannot view this page.</h1>;
    }

   
    return <Outlet />; 
};

export default ProtectedRoute;