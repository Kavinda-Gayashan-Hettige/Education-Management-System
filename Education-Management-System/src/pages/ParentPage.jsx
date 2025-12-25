import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function ParentPage() {
    const { auth } = useAuth();
    
   
    if (auth.role !== 'PARENT') return <div className="alert alert-danger">Access Denied.</div>;
    
    return (
        <div className="p-4 bg-primary-subtle border border-primary rounded-3">
            <h2><i className="bi bi-people-fill me-2"></i>Parent Communication Portal</h2>
            <p className="lead">Welcome, **{auth.userName}**! Monitor your child's progress and communicate with teachers.</p>
            <hr />
            <p>Parent Tasks: View Child's Attendance, Check Grades, Message Teachers.</p>
        </div>
    );
}

export default ParentPage;