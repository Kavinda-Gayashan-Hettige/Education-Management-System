import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function AdminDashboard() {
    const { auth } = useAuth();
    
   
    if (auth.role !== 'ADMIN') return <div className="alert alert-danger">Access Denied: ADMIN Only.</div>;
    
    return (
        <div className="p-4 bg-danger-subtle border border-danger rounded-3">
            <h2><i className="bi bi-shield-lock-fill me-2"></i>Admin Management Panel</h2>
            <p className="lead">Welcome, **{auth.userName}**! You have full administrative privileges.</p>
            <hr />
            <p>Admin Tasks: User Creation, Data Backup, System Settings.</p>
        </div>
    );
}

export default AdminDashboard;