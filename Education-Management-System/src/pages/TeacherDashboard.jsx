import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function TeacherDashboard() {
    const { auth } = useAuth();
    
    // මෙම Component එකට පිවිසිය හැක්කේ Role: TEACHER හෝ ADMIN ට පමණි
    if (auth.role !== 'TEACHER' && auth.role !== 'ADMIN') return <div className="alert alert-danger">Access Denied.</div>;
    
    return (
        <div className="p-4 bg-warning-subtle border border-warning rounded-3">
            <h2><i className="bi bi-book-half me-2"></i>Teacher Course Management</h2>
            <p className="lead">Welcome, **{auth.userName}**! Manage your courses and assignments here.</p>
            <hr />
            <p>Teacher Tasks: Grade Entry, Lesson Planning, Student Feedback.</p>
        </div>
    );
}

export default TeacherDashboard;