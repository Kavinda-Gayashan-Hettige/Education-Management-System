import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ParentPage() {
    const [childData] = useState({
        name: "Saman Silva",
        grade: "Grade 5B",
        teacher: "Mrs. Perera",
        attendance: 92,
        overallGrade: "A-",
        recentActivity: [
            { subject: "Mathematics", grade: "A", date: "2024-01-15", comment: "Excellent work!" },
            { subject: "Science", grade: "B+", date: "2024-01-14", comment: "Good effort" },
            { subject: "English", grade: "A-", date: "2024-01-13", comment: "Improving" },
            { subject: "Sinhala", grade: "B", date: "2024-01-12", comment: "Needs practice" },
        ],
        attendanceRecords: [
            { date: "2024-01-15", status: "Present", timeIn: "7:30 AM", timeOut: "1:30 PM" },
            { date: "2024-01-14", status: "Present", timeIn: "7:45 AM", timeOut: "1:45 PM" },
            { date: "2024-01-13", status: "Absent", timeIn: "-", timeOut: "-", reason: "Medical" },
            { date: "2024-01-12", status: "Present", timeIn: "8:00 AM", timeOut: "1:30 PM" },
            { date: "2024-01-11", status: "Late", timeIn: "8:30 AM", timeOut: "1:30 PM", note: "Traffic" },
        ],
        subjectGrades: [
            { subject: "Mathematics", grade: "A", progress: 95, teacher: "Mr. Fernando" },
            { subject: "Science", grade: "B+", progress: 88, teacher: "Mrs. Perera" },
            { subject: "English", grade: "A-", progress: 92, teacher: "Ms. De Silva" },
            { subject: "Sinhala", grade: "B", progress: 82, teacher: "Mr. Rathnayake" },
            { subject: "History", grade: "A", progress: 96, teacher: "Mrs. Karunaratne" },
            { subject: "IT", grade: "A+", progress: 98, teacher: "Mr. Jayasuriya" },
        ]
    });

    const [activeTab, setActiveTab] = useState('progress');

    return (
        <div className="container-fluid py-4 parent-dashboard">
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="text-primary">
                                <i className="bi bi-person-badge me-2"></i>
                                Parent Portal
                            </h1>
                            <p className="text-muted">Monitor your child's progress and activities</p>
                        </div>
                        <div className="text-end">
                            <h4>Welcome, Mr. Piyal!</h4>
                            <small className="text-muted">Last login: Today, 10:30 AM</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Child Info Card */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm border-primary">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-3 text-center mb-3 mb-md-0">
                                    <div className="avatar-circle bg-primary text-white d-inline-flex align-items-center justify-content-center rounded-circle" 
                                         style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                        <i className="bi bi-person-fill"></i>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <h5 className="text-muted mb-1">Child's Name</h5>
                                            <h4 className="text-dark">{childData.name}</h4>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <h5 className="text-muted mb-1">Class</h5>
                                            <h4 className="text-dark">{childData.grade}</h4>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <h5 className="text-muted mb-1">Class Teacher</h5>
                                            <h4 className="text-dark">{childData.teacher}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card bg-primary text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Attendance Rate</h6>
                                    <h2 className="mb-0">{childData.attendance}%</h2>
                                    <small>This Month</small>
                                </div>
                                <i className="bi bi-calendar-check display-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Overall Grade</h6>
                                    <h2 className="mb-0">{childData.overallGrade}</h2>
                                    <small>Current Average</small>
                                </div>
                                <i className="bi bi-award display-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-info text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Recent Activities</h6>
                                    <h2 className="mb-0">{childData.recentActivity.length}</h2>
                                    <small>Last 7 days</small>
                                </div>
                                <i className="bi bi-activity display-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="row mb-4">
                <div className="col-12">
                    <ul className="nav nav-tabs nav-justified">
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`}
                                onClick={() => setActiveTab('progress')}
                            >
                                <i className="bi bi-graph-up me-2"></i>
                                Monitor Progress
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
                                onClick={() => setActiveTab('attendance')}
                            >
                                <i className="bi bi-calendar-check me-2"></i>
                                View Attendance
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'grades' ? 'active' : ''}`}
                                onClick={() => setActiveTab('grades')}
                            >
                                <i className="bi bi-journal-check me-2"></i>
                                Check Grades
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Content Based on Active Tab */}
            <div className="row">
                <div className="col-12">
                    {activeTab === 'progress' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light">
                                <h5 className="mb-0">
                                    <i className="bi bi-graph-up me-2"></i>
                                    Academic Progress Overview
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h6>Performance Trend</h6>
                                        <div className="progress-chart mb-4">
                                            {childData.subjectGrades.map((subject, index) => (
                                                <div key={index} className="mb-3">
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <span>{subject.subject}</span>
                                                        <span className="badge bg-primary">{subject.grade}</span>
                                                    </div>
                                                    <div className="progress" style={{ height: '20px' }}>
                                                        <div 
                                                            className="progress-bar bg-success" 
                                                            role="progressbar" 
                                                            style={{ width: `${subject.progress}%` }}
                                                            aria-valuenow={subject.progress}
                                                            aria-valuemin="0" 
                                                            aria-valuemax="100"
                                                        >
                                                            {subject.progress}%
                                                        </div>
                                                    </div>
                                                    <small className="text-muted">Teacher: {subject.teacher}</small>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h6>Recent Activities</h6>
                                        <div className="list-group">
                                            {childData.recentActivity.map((activity, index) => (
                                                <div key={index} className="list-group-item mb-2">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <div>
                                                            <h6 className="mb-1">{activity.subject}</h6>
                                                            <p className="mb-1 small">{activity.comment}</p>
                                                            <small className="text-muted">{activity.date}</small>
                                                        </div>
                                                        <span className={`badge ${activity.grade.includes('A') ? 'bg-success' : 'bg-warning'}`}>
                                                            {activity.grade}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light">
                                <h5 className="mb-0">
                                    <i className="bi bi-calendar-check me-2"></i>
                                    Attendance Records
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Time In</th>
                                                <th>Time Out</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {childData.attendanceRecords.map((record, index) => (
                                                <tr key={index} className={record.status === 'Absent' ? 'table-danger' : 
                                                                          record.status === 'Late' ? 'table-warning' : ''}>
                                                    <td>{record.date}</td>
                                                    <td>
                                                        <span className={`badge ${record.status === 'Present' ? 'bg-success' : 
                                                                         record.status === 'Absent' ? 'bg-danger' : 'bg-warning'}`}>
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                    <td>{record.timeIn}</td>
                                                    <td>{record.timeOut}</td>
                                                    <td>
                                                        <small className="text-muted">
                                                            {record.reason || record.note || '-'}
                                                        </small>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
                                    <h6>Attendance Summary</h6>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="card bg-success text-white">
                                                <div className="card-body text-center">
                                                    <h3>18</h3>
                                                    <small>Present Days</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card bg-danger text-white">
                                                <div className="card-body text-center">
                                                    <h3>1</h3>
                                                    <small>Absent Days</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card bg-warning text-white">
                                                <div className="card-body text-center">
                                                    <h3>1</h3>
                                                    <small>Late Days</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card bg-info text-white">
                                                <div className="card-body text-center">
                                                    <h3>{childData.attendance}%</h3>
                                                    <small>Overall Attendance</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'grades' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light">
                                <h5 className="mb-0">
                                    <i className="bi bi-journal-check me-2"></i>
                                    Subject Grades
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {childData.subjectGrades.map((subject, index) => (
                                        <div key={index} className="col-md-6 col-lg-4 mb-4">
                                            <div className="card h-100">
                                                <div className="card-body text-center">
                                                    <div className={`subject-icon mb-3 ${subject.grade.includes('A') ? 'bg-success' : 'bg-warning'} text-white rounded-circle d-inline-flex align-items-center justify-content-center`}
                                                         style={{ width: '60px', height: '60px' }}>
                                                        <i className="bi bi-book display-6"></i>
                                                    </div>
                                                    <h5 className="card-title">{subject.subject}</h5>
                                                    <div className="grade-display mb-3">
                                                        <span className={`display-4 ${subject.grade.includes('A') ? 'text-success' : 'text-warning'}`}>
                                                            {subject.grade}
                                                        </span>
                                                    </div>
                                                    <div className="progress mb-2" style={{ height: '10px' }}>
                                                        <div className="progress-bar bg-primary" 
                                                             style={{ width: `${subject.progress}%` }}></div>
                                                    </div>
                                                    <p className="text-muted mb-1">Progress: {subject.progress}%</p>
                                                    <small className="text-muted">Teacher: {subject.teacher}</small>
                                                </div>
                                                <div className="card-footer bg-transparent">
                                                    <button className="btn btn-sm btn-outline-primary w-100">
                                                        <i className="bi bi-eye me-1"></i> View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Grade Summary */}
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <div className="card bg-light">
                                            <div className="card-body">
                                                <h6>Grade Distribution</h6>
                                                <div className="row text-center">
                                                    <div className="col">
                                                        <div className="grade-count bg-success text-white p-3 rounded">
                                                            <h3>3</h3>
                                                            <small>A Grades</small>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="grade-count bg-warning text-white p-3 rounded">
                                                            <h3>2</h3>
                                                            <small>B Grades</small>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="grade-count bg-info text-white p-3 rounded">
                                                            <h3>1</h3>
                                                            <small>Other</small>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="grade-count bg-primary text-white p-3 rounded">
                                                            <h3>{childData.overallGrade}</h3>
                                                            <small>Average</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body text-center">
                            <h6 className="mb-3">Quick Actions</h6>
                            <div className="btn-group" role="group">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-download me-2"></i> Download Report
                                </button>
                                <button className="btn btn-outline-success">
                                    <i className="bi bi-printer me-2"></i> Print Summary
                                </button>
                                <button className="btn btn-outline-info">
                                    <i className="bi bi-envelope me-2"></i> Contact Teacher
                                </button>
                                <button className="btn btn-outline-warning">
                                    <i className="bi bi-calendar-event me-2"></i> Schedule Meeting
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS */}
            <style>
                {`
                    .parent-dashboard {
                        background-color: #f8f9fa;
                        min-height: 100vh;
                    }
                    .nav-tabs .nav-link {
                        color: #495057;
                        font-weight: 500;
                    }
                    .nav-tabs .nav-link.active {
                        background-color: #fff;
                        border-color: #dee2e6 #dee2e6 #fff;
                        color: #0d6efd;
                        font-weight: 600;
                    }
                    .progress-chart .progress {
                        background-color: #e9ecef;
                    }
                    .grade-count {
                        transition: transform 0.2s;
                    }
                    .grade-count:hover {
                        transform: translateY(-5px);
                    }
                    .subject-icon {
                        transition: all 0.3s;
                    }
                    .subject-icon:hover {
                        transform: scale(1.1);
                    }
                    .avatar-circle {
                        background: linear-gradient(45deg, #0d6efd, #6610f2);
                    }
                    .table-hover tbody tr:hover {
                        background-color: rgba(13, 110, 253, 0.1);
                    }
                `}
            </style>
        </div>
    );
}

export default ParentPage;