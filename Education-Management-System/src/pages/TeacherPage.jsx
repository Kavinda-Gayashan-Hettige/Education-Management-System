import React from 'react';
import { useAuth } from "../contexts/AuthContext";

function TeacherPage() {
    const { auth } = useAuth();
    
    if (auth.role !== 'TEACHER' && auth.role !== 'ADMIN') {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="alert alert-danger text-center shadow">
                            <i className="bi bi-shield-lock-fill fs-1 d-block mb-3"></i>
                            <h4>Access Denied</h4>
                            <p>You don't have permission to access this page.</p>
                            <a href="/dashboard" className="btn btn-outline-danger">
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container-fluid py-4">
            {/* Welcome Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-warning shadow">
                        <div className="card-body bg-gradient bg-warning bg-opacity-10">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <i className="bi bi-person-badge fs-1 text-warning"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h1 className="card-title mb-1">
                                        <i className="bi bi-book-half me-2"></i>
                                        Teacher Dashboard
                                    </h1>
                                    <p className="card-text lead mb-0">
                                        Welcome back, <strong className="text-warning">{auth.userName}</strong>!
                                    </p>
                                    <small className="text-muted">
                                        <i className="bi bi-calendar-check me-1"></i>
                                        {new Date().toLocaleDateString('en-US', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </small>
                                </div>
                                <div className="badge bg-warning text-dark fs-6 p-2">
                                    <i className="bi bi-award me-1"></i>
                                    {auth.role}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row mb-4">
                <div className="col-md-3 mb-3">
                    <div className="card text-white bg-primary h-100 shadow">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-subtitle mb-2">Active Courses</h6>
                                    <h2 className="card-title">5</h2>
                                </div>
                                <i className="bi bi-journals fs-1 opacity-50"></i>
                            </div>
                            <div className="mt-2">
                                <span className="small">
                                    <i className="bi bi-arrow-up-circle me-1"></i>
                                    2 new this month
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-3 mb-3">
                    <div className="card text-white bg-success h-100 shadow">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-subtitle mb-2">Total Students</h6>
                                    <h2 className="card-title">142</h2>
                                </div>
                                <i className="bi bi-people fs-1 opacity-50"></i>
                            </div>
                            <div className="mt-2">
                                <span className="small">
                                    <i className="bi bi-check-circle me-1"></i>
                                    95% attendance
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-3 mb-3">
                    <div className="card text-white bg-info h-100 shadow">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-subtitle mb-2">Assignments</h6>
                                    <h2 className="card-title">8</h2>
                                </div>
                                <i className="bi bi-clipboard-check fs-1 opacity-50"></i>
                            </div>
                            <div className="mt-2">
                                <span className="small">
                                    <i className="bi bi-clock me-1"></i>
                                    3 pending grading
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-3 mb-3">
                    <div className="card text-white bg-purple h-100 shadow" style={{backgroundColor: '#6f42c1'}}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-subtitle mb-2">Meetings</h6>
                                    <h2 className="card-title">4</h2>
                                </div>
                                <i className="bi bi-calendar-event fs-1 opacity-50"></i>
                            </div>
                            <div className="mt-2">
                                <span className="small">
                                    <i className="bi bi-alarm me-1"></i>
                                    2 today
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="row">
                {/* Left Column - Tasks */}
                <div className="col-lg-8 mb-4">
                    <div className="card border-warning shadow h-100">
                        <div className="card-header bg-warning bg-opacity-25">
                            <h5 className="card-title mb-0">
                                <i className="bi bi-list-task me-2"></i>
                                Teacher Tasks & Responsibilities
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="card h-100 border-start border-start-4 border-start-primary">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className="bi bi-pencil-square text-primary me-2"></i>
                                                Grade Entry
                                            </h5>
                                            <p className="card-text">
                                                Enter and manage student grades, generate report cards, and track academic progress.
                                            </p>
                                            <a href="#" className="btn btn-outline-primary btn-sm">
                                                Enter Grades <i className="bi bi-arrow-right ms-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <div className="card h-100 border-start border-start-4 border-start-success">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className="bi bi-journal-text text-success me-2"></i>
                                                Lesson Planning
                                            </h5>
                                            <p className="card-text">
                                                Create and organize lesson plans, upload teaching materials, and schedule topics.
                                            </p>
                                            <a href="#" className="btn btn-outline-success btn-sm">
                                                Plan Lessons <i className="bi bi-arrow-right ms-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <div className="card h-100 border-start border-start-4 border-start-info">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className="bi bi-chat-left-text text-info me-2"></i>
                                                Student Feedback
                                            </h5>
                                            <p className="card-text">
                                                Provide feedback to students, conduct evaluations, and communicate with parents.
                                            </p>
                                            <a href="#" className="btn btn-outline-info btn-sm">
                                                Give Feedback <i className="bi bi-arrow-right ms-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <div className="card h-100 border-start border-start-4 border-start-warning">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className="bi bi-clipboard-data text-warning me-2"></i>
                                                Attendance
                                            </h5>
                                            <p className="card-text">
                                                Mark daily attendance, view attendance reports, and manage student presence records.
                                            </p>
                                            <a href="#" className="btn btn-outline-warning btn-sm">
                                                Mark Attendance <i className="bi bi-arrow-right ms-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Column - Recent Activity & Quick Links */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow h-100">
                        <div className="card-header">
                            <h5 className="card-title mb-0">
                                <i className="bi bi-lightning-charge me-2"></i>
                                Quick Actions
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className="bi bi-plus-circle me-2 text-success"></i>
                                        Create New Assignment
                                    </span>
                                    <i className="bi bi-chevron-right text-muted"></i>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className="bi bi-upload me-2 text-primary"></i>
                                        Upload Course Material
                                    </span>
                                    <i className="bi bi-chevron-right text-muted"></i>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className="bi bi-envelope me-2 text-info"></i>
                                        Send Announcement
                                    </span>
                                    <i className="bi bi-chevron-right text-muted"></i>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className="bi bi-bar-chart me-2 text-warning"></i>
                                        View Reports
                                    </span>
                                    <i className="bi bi-chevron-right text-muted"></i>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className="bi bi-gear me-2 text-secondary"></i>
                                        Settings & Profile
                                    </span>
                                    <i className="bi bi-chevron-right text-muted"></i>
                                </a>
                            </div>
                            
                            <hr />
                            
                            <div className="mt-3">
                                <h6 className="mb-3">
                                    <i className="bi bi-clock-history me-2"></i>
                                    Recent Activity
                                </h6>
                                <div className="d-flex mb-3">
                                    <div className="flex-shrink-0">
                                        <div className="avatar-sm bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-check-lg"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <small className="text-muted">Today, 10:30 AM</small>
                                        <p className="mb-0">Graded Mathematics Assignment</p>
                                    </div>
                                </div>
                                <div className="d-flex mb-3">
                                    <div className="flex-shrink-0">
                                        <div className="avatar-sm bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-exclamation-triangle"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <small className="text-muted">Yesterday, 3:15 PM</small>
                                        <p className="mb-0">Attendance alert: 3 students absent</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Courses */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-header">
                            <h5 className="card-title mb-0">
                                <i className="bi bi-calendar-week me-2"></i>
                                Today's Schedule
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Time</th>
                                            <th>Course</th>
                                            <th>Class</th>
                                            <th>Room</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>08:00 - 09:30</td>
                                            <td>
                                                <i className="bi bi-calculator text-primary me-2"></i>
                                                Mathematics
                                            </td>
                                            <td>Grade 10-A</td>
                                            <td>Room 205</td>
                                            <td>
                                                <span className="badge bg-success">Completed</span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary">
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>10:00 - 11:30</td>
                                            <td>
                                                <i className="bi bi-flask text-danger me-2"></i>
                                                Science
                                            </td>
                                            <td>Grade 9-B</td>
                                            <td>Lab 3</td>
                                            <td>
                                                <span className="badge bg-warning">In Progress</span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-warning">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>13:00 - 14:30</td>
                                            <td>
                                                <i className="bi bi-globe text-success me-2"></i>
                                                Geography
                                            </td>
                                            <td>Grade 11-C</td>
                                            <td>Room 312</td>
                                            <td>
                                                <span className="badge bg-secondary">Upcoming</span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">
                                                    <i className="bi bi-clock"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherPage;