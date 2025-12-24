import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function StudentDashboard() {
    const { auth } = useAuth();
    
    // මෙම Component එකට පිවිසිය හැක්කේ Role: STUDENT ට පමණි
    if (auth.role !== 'STUDENT') return <div className="alert alert-danger">Access Denied.</div>;

    return (
        <div className="p-4 bg-success-subtle border border-success rounded-3">
            <h2><i className="bi bi-mortarboard-fill me-2"></i>Student Schedule and Grades</h2>
            <p className="lead">Welcome, **{auth.userName}**! View your academic progress.</p>
            <hr />
            <p>Student Tasks: Check Timetable, View Grades, Submit Assignments.</p>
        </div>
    );
}

export default  StudentDashboard;