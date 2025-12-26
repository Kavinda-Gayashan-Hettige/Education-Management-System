import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function StudentGrades() {
    const { auth } = useAuth();
    const [selectedSemester, setSelectedSemester] = useState('semester1');

    if (auth.role !== 'STUDENT') return <div className="alert alert-danger">Access Denied.</div>;

    // Sample grades data
    const gradesData = {
        semester1: [
            { id: 1, subject: "Mathematics", grade: "A", marks: 92, teacher: "Mr. Fernando", feedback: "Excellent performance" },
            { id: 2, subject: "Science", grade: "A-", marks: 88, teacher: "Mrs. Perera", feedback: "Good understanding of concepts" },
            { id: 3, subject: "English", grade: "B+", marks: 85, teacher: "Ms. De Silva", feedback: "Improving well" },
            { id: 4, subject: "Sinhala", grade: "B", marks: 82, teacher: "Mr. Rathnayake", feedback: "Needs more practice" },
            { id: 5, subject: "History", grade: "A", marks: 91, teacher: "Mrs. Karunaratne", feedback: "Outstanding work" },
            { id: 6, subject: "IT", grade: "A+", marks: 96, teacher: "Mr. Jayasuriya", feedback: "Excellent programming skills" },
        ],
        semester2: [
            { id: 1, subject: "Mathematics", grade: "A", marks: 94, teacher: "Mr. Fernando", feedback: "Consistent performance" },
            { id: 2, subject: "Science", grade: "A", marks: 90, teacher: "Mrs. Perera", feedback: "Excellent lab work" },
            { id: 3, subject: "English", grade: "A-", marks: 87, teacher: "Ms. De Silva", feedback: "Writing improved" },
        ]
    };

    const calculateAverage = (semester) => {
        const grades = gradesData[semester];
        const total = grades.reduce((sum, item) => sum + item.marks, 0);
        return (total / grades.length).toFixed(1);
    };

    const getGradeColor = (grade) => {
        if (grade.includes('A+') || grade.includes('A')) return 'success';
        if (grade.includes('B')) return 'warning';
        return 'danger';
    };

    return (
        <div className="container-fluid py-4">
            {/* Header */}

            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                    }}>
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1 className="display-6 fw-bold mb-2">
                                        <i className="bi bi-trophy-fill me-3"></i>
                                        Your Grades & Academic Progress
                                    </h1>
                                    <p className="mb-0 opacity-75">
                                        Welcome back, <strong>{auth.userName}</strong>! Track your academic performance and achievements.
                                    </p>
                                </div>
                                <div className="col-md-4 text-end">
                                    <div className="bg-white text-dark p-3 rounded-3 shadow">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h4 className="mb-0">Current GPA</h4>
                                            <div className={`badge ${calculateAverage(selectedSemester) >= 75 ? 'bg-success' : calculateAverage(selectedSemester) >= 65 ? 'bg-warning' : 'bg-danger'} rounded-pill px-3 py-1`}>
                                                {calculateAverage(selectedSemester) >= 75 ? 'Excellent' : calculateAverage(selectedSemester) >= 65 ? 'Good' : 'Needs Improvement'}
                                            </div>
                                        </div>
                                        <h1 className="display-4 text-primary fw-bold mb-0">
                                            {calculateAverage(selectedSemester)}
                                        </h1>
                                        <small className="text-muted">Out of 100</small>

                                        {/* GPA Progress Indicator */}
                                        <div className="mt-2">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small>Performance</small>
                                                <small>{calculateAverage(selectedSemester)}%</small>
                                            </div>
                                            <div className="progress" style={{ height: '8px' }}>
                                                <div
                                                    className={`progress-bar ${calculateAverage(selectedSemester) >= 75 ? 'bg-success' : calculateAverage(selectedSemester) >= 65 ? 'bg-warning' : 'bg-danger'}`}
                                                    role="progressbar"
                                                    style={{ width: `${calculateAverage(selectedSemester)}%` }}
                                                    aria-valuenow={calculateAverage(selectedSemester)}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Semester Info */}
                                        <div className="d-flex justify-content-between mt-3">
                                            <div>
                                                <small className="text-muted d-block">Semester</small>
                                                <strong>{selectedSemester === 'semester1' ? 'Semester 1' : 'Semester 2'}</strong>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block">Rank</small>
                                                <strong>#5</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info Bar */}
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                                            <i className="bi bi-award text-white"></i>
                                        </div>
                                        <div>
                                            <small className="opacity-75">Highest Grade</small>
                                            <h5 className="mb-0 text-white">A+ (96%)</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                                            <i className="bi bi-graph-up-arrow text-white"></i>
                                        </div>
                                        <div>
                                            <small className="opacity-75">Improvement</small>
                                            <h5 className="mb-0 text-white">+3.2% ↑</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                                            <i className="bi bi-calendar-check text-white"></i>
                                        </div>
                                        <div>
                                            <small className="opacity-75">Last Updated</small>
                                            <h5 className="mb-0 text-white">Today, 10:30 AM</h5>
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
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-success bg-opacity-10 border-success h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-success">A Grades</h6>
                                    <h2 className="text-success mb-0">4</h2>
                                </div>
                                <i className="bi bi-award-fill text-success display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-warning bg-opacity-10 border-warning h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-warning">B Grades</h6>
                                    <h2 className="text-warning mb-0">2</h2>
                                </div>
                                <i className="bi bi-graph-up text-warning display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-info bg-opacity-10 border-info h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-info">Subjects</h6>
                                    <h2 className="text-info mb-0">{gradesData[selectedSemester].length}</h2>
                                </div>
                                <i className="bi bi-book-half text-info display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-primary bg-opacity-10 border-primary h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-primary">Average</h6>
                                    <h2 className="text-primary mb-0">{calculateAverage(selectedSemester)}%</h2>
                                </div>
                                <i className="bi bi-percent text-primary display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Semester Selector */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Select Semester</h5>
                                <div className="btn-group">
                                    <button
                                        className={`btn ${selectedSemester === 'semester1' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setSelectedSemester('semester1')}
                                    >
                                        Semester 1
                                    </button>
                                    <button
                                        className={`btn ${selectedSemester === 'semester2' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setSelectedSemester('semester2')}
                                    >
                                        Semester 2
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grades Table */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">
                                <i className="bi bi-list-check me-2"></i>
                                Subject Grades - {selectedSemester === 'semester1' ? 'Semester 1' : 'Semester 2'}
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Subject</th>
                                            <th>Grade</th>
                                            <th>Marks</th>
                                            <th>Teacher</th>
                                            <th>Feedback</th>
                                            <th>Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gradesData[selectedSemester].map((subject) => (
                                            <tr key={subject.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className={`subject-icon bg-${getGradeColor(subject.grade)}-subtle text-${getGradeColor(subject.grade)} rounded-circle d-flex align-items-center justify-content-center me-3`}
                                                            style={{ width: '40px', height: '40px' }}>
                                                            <i className="bi bi-book"></i>
                                                        </div>
                                                        <div>
                                                            <strong>{subject.subject}</strong>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${getGradeColor(subject.grade)} rounded-pill px-3 py-2`}>
                                                        {subject.grade}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="progress" style={{ height: '20px', width: '100px' }}>
                                                        <div
                                                            className={`progress-bar bg-${getGradeColor(subject.grade)}`}
                                                            role="progressbar"
                                                            style={{ width: `${subject.marks}%` }}
                                                            aria-valuenow={subject.marks}
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                        >
                                                            {subject.marks}%
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{subject.teacher}</td>
                                                <td>
                                                    <small className="text-muted">{subject.feedback}</small>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="bi bi-eye me-1"></i> View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grade Distribution Chart */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-light">
                            <h6 className="mb-0">
                                <i className="bi bi-pie-chart me-2"></i>
                                Grade Distribution
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-around text-center">
                                <div>
                                    <div className="display-6 text-success fw-bold">4</div>
                                    <small>A Grades</small>
                                </div>
                                <div>
                                    <div className="display-6 text-warning fw-bold">2</div>
                                    <small>B Grades</small>
                                </div>
                                <div>
                                    <div className="display-6 text-danger fw-bold">0</div>
                                    <small>C Grades</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-light">
                            <h6 className="mb-0">
                                <i className="bi bi-download me-2"></i>
                                Download Reports
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="row g-2">
                                <div className="col-6">
                                    <button className="btn btn-outline-primary w-100">
                                        <i className="bi bi-file-pdf me-2"></i>
                                        Semester Report
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-outline-success w-100">
                                        <i className="bi bi-printer me-2"></i>
                                        Print Grades
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-outline-info w-100">
                                        <i className="bi bi-envelope me-2"></i>
                                        Email Teacher
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-outline-warning w-100">
                                        <i className="bi bi-graph-up me-2"></i>
                                        Performance Chart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentGrades;