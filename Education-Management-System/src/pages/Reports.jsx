import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Reports() {
    const { auth } = useAuth();
    const [activeReport, setActiveReport] = useState('attendance');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Sample report data for education system
    const reportsData = {
        attendance: {
            title: "Attendance Report",
            description: "Student attendance statistics and trends",
            icon: "bi-calendar-check",
            color: "primary",
            stats: [
                { label: "Total Students", value: "850", change: "+5%" },
                { label: "Average Attendance", value: "92%", change: "+2%" },
                { label: "Absent Today", value: "45", change: "-3" },
                { label: "Late Arrivals", value: "23", change: "+2" },
            ],
            tableData: [
                { grade: "Grade 1", present: 95, absent: 5, late: 3 },
                { grade: "Grade 2", present: 92, absent: 8, late: 5 },
                { grade: "Grade 3", present: 90, absent: 10, late: 7 },
                { grade: "Grade 4", present: 94, absent: 6, late: 4 },
                { grade: "Grade 5", present: 96, absent: 4, late: 2 },
            ]
        },
        grades: {
            title: "Grades Report",
            description: "Academic performance and results",
            icon: "bi-award",
            color: "success",
            stats: [
                { label: "Average GPA", value: "3.4", change: "+0.2" },
                { label: "Pass Rate", value: "94%", change: "+3%" },
                { label: "Top Subject", value: "Math", change: "A+" },
                { label: "Need Improvement", value: "15%", change: "-2%" },
            ],
            tableData: [
                { subject: "Mathematics", avgGrade: "A-", passRate: 96 },
                { subject: "Science", avgGrade: "B+", passRate: 92 },
                { subject: "English", avgGrade: "A", passRate: 98 },
                { subject: "Sinhala", avgGrade: "B", passRate: 88 },
                { subject: "History", avgGrade: "A-", passRate: 94 },
            ]
        },
        teachers: {
            title: "Teachers Report",
            description: "Teacher performance and workload",
            icon: "bi-person-badge",
            color: "warning",
            stats: [
                { label: "Total Teachers", value: "45", change: "+3" },
                { label: "Avg. Classes/Day", value: "5", change: "+0.5" },
                { label: "Completed Training", value: "38", change: "+5" },
                { label: "On Leave", value: "2", change: "-1" },
            ],
            tableData: [
                { teacher: "Mr. Perera", subjects: "Math, Science", students: 85, rating: 4.8 },
                { teacher: "Ms. Silva", subjects: "English", students: 92, rating: 4.9 },
                { teacher: "Mrs. Fernando", subjects: "Sinhala, History", students: 78, rating: 4.5 },
                { teacher: "Mr. Rajapaksa", subjects: "IT", students: 105, rating: 4.7 },
                { teacher: "Ms. Wijesinghe", subjects: "Art, Music", students: 65, rating: 4.6 },
            ]
        },
        finance: {
            title: "Financial Report",
            description: "Fee collection and expenses",
            icon: "bi-cash-stack",
            color: "info",
            stats: [
                { label: "Total Revenue", value: "Rs 1.2M", change: "+12%" },
                { label: "Fee Collected", value: "Rs 980K", change: "+8%" },
                { label: "Pending Fees", value: "Rs 120K", change: "-15%" },
                { label: "Expenses", value: "Rs 650K", change: "+5%" },
            ],
            tableData: [
                { month: "January", fees: 250000, expenses: 180000, balance: 70000 },
                { month: "February", fees: 220000, expenses: 160000, balance: 60000 },
                { month: "March", fees: 240000, expenses: 170000, balance: 70000 },
                { month: "April", fees: 230000, expenses: 165000, balance: 65000 },
                { month: "May", fees: 260000, expenses: 175000, balance: 85000 },
            ]
        }
    };

    // Handle report generation
    const generateReport = () => {
        const report = reportsData[activeReport];
        const dateRange = startDate && endDate ? `from ${startDate} to ${endDate}` : 'for all time';
        
        alert(`Generating ${report.title} ${dateRange}...\nReport will be downloaded shortly.`);
        
        // In real app, this would call API to generate report
        console.log('Generating report:', {
            type: activeReport,
            startDate,
            endDate,
            user: auth.userName,
            role: auth.role
        });
    };

    // Handle print
    const printReport = () => {
        window.print();
    };

    // Handle date range change
    const handleDateChange = () => {
        if (startDate && endDate && startDate > endDate) {
            alert('Start date must be before end date');
            setEndDate('');
        }
    };

    return (
        <div className="container-fluid py-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0 bg-primary text-white">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1 className="h2 fw-bold mb-2">
                                        <i className="bi bi-file-earmark-text me-2"></i>
                                        Education Management Reports
                                    </h1>
                                    <p className="mb-0 opacity-75">
                                        Generate and view reports and statistics
                                    </p>
                                </div>
                                <div className="col-md-4 text-end">
                                    <div className="bg-white text-dark p-3 rounded-3">
                                        <h5 className="mb-0">Welcome, {auth.userName}!</h5>
                                        <small className="text-muted">Role: {auth.role}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Type Selection */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Select Report Type</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-2">
                                {Object.entries(reportsData).map(([key, report]) => (
                                    <div key={key} className="col-md-3 col-sm-6">
                                        <button
                                            className={`btn btn-outline-${report.color} w-100 text-start p-3 ${activeReport === key ? 'active' : ''}`}
                                            onClick={() => setActiveReport(key)}
                                        >
                                            <div className="d-flex align-items-center">
                                                <i className={`bi ${report.icon} fs-3 me-3`}></i>
                                                <div>
                                                    <h6 className="mb-1">{report.title}</h6>
                                                    <small className="text-muted">{report.description}</small>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Range Selection */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Select Date Range</h5>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        onBlur={handleDateChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        onBlur={handleDateChange}
                                    />
                                </div>
                                <div className="col-md-6 d-flex align-items-end">
                                    <div className="d-flex gap-2 w-100">
                                        <button 
                                            className="btn btn-primary flex-fill"
                                            onClick={generateReport}
                                            disabled={!startDate || !endDate}
                                        >
                                            <i className="bi bi-download me-2"></i>
                                            Generate Report
                                        </button>
                                        <button 
                                            className="btn btn-success"
                                            onClick={printReport}
                                        >
                                            <i className="bi bi-printer"></i>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {(!startDate || !endDate) && (
                                <div className="alert alert-info mt-3 mb-0">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Please select both start and end dates to generate report
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Preview */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                <i className={`bi ${reportsData[activeReport].icon} me-2`}></i>
                                {reportsData[activeReport].title} - Preview
                            </h5>
                            <div className="text-muted">
                                {startDate && endDate ? `${startDate} to ${endDate}` : 'Select date range'}
                            </div>
                        </div>
                        <div className="card-body">
                            {/* Quick Stats */}
                            <div className="row mb-4">
                                {reportsData[activeReport].stats.map((stat, index) => (
                                    <div key={index} className="col-md-3 col-sm-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="text-muted mb-2">{stat.label}</h6>
                                                <div className="d-flex align-items-center">
                                                    <h3 className="mb-0 me-2">{stat.value}</h3>
                                                    <span className={`badge ${stat.change.startsWith('+') ? 'bg-success' : 'bg-danger'}`}>
                                                        {stat.change}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Data Table */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h6 className="mb-0">Detailed Data</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            {activeReport === 'attendance' && (
                                                                <>
                                                                    <th>Grade</th>
                                                                    <th>Present (%)</th>
                                                                    <th>Absent (%)</th>
                                                                    <th>Late (%)</th>
                                                                </>
                                                            )}
                                                            {activeReport === 'grades' && (
                                                                <>
                                                                    <th>Subject</th>
                                                                    <th>Average Grade</th>
                                                                    <th>Pass Rate (%)</th>
                                                                </>
                                                            )}
                                                            {activeReport === 'teachers' && (
                                                                <>
                                                                    <th>Teacher</th>
                                                                    <th>Subjects</th>
                                                                    <th>Students</th>
                                                                    <th>Rating</th>
                                                                </>
                                                            )}
                                                            {activeReport === 'finance' && (
                                                                <>
                                                                    <th>Month</th>
                                                                    <th>Fees Collected</th>
                                                                    <th>Expenses</th>
                                                                    <th>Balance</th>
                                                                </>
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {reportsData[activeReport].tableData.map((row, index) => (
                                                            <tr key={index}>
                                                                {activeReport === 'attendance' && (
                                                                    <>
                                                                        <td>{row.grade}</td>
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                                                                                    <div className="progress-bar bg-success" style={{width: `${row.present}%`}}></div>
                                                                                </div>
                                                                                <span>{row.present}%</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>{row.absent}%</td>
                                                                        <td>{row.late}%</td>
                                                                    </>
                                                                )}
                                                                {activeReport === 'grades' && (
                                                                    <>
                                                                        <td>{row.subject}</td>
                                                                        <td>
                                                                            <span className={`badge ${
                                                                                row.avgGrade.includes('A') ? 'bg-success' : 
                                                                                row.avgGrade.includes('B') ? 'bg-warning' : 'bg-danger'
                                                                            }`}>
                                                                                {row.avgGrade}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                                                                                    <div className="progress-bar bg-primary" style={{width: `${row.passRate}%`}}></div>
                                                                                </div>
                                                                                <span>{row.passRate}%</span>
                                                                            </div>
                                                                        </td>
                                                                    </>
                                                                )}
                                                                {activeReport === 'teachers' && (
                                                                    <>
                                                                        <td>{row.teacher}</td>
                                                                        <td>{row.subjects}</td>
                                                                        <td>{row.students}</td>
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <i className="bi bi-star-fill text-warning me-1"></i>
                                                                                <span>{row.rating}/5.0</span>
                                                                            </div>
                                                                        </td>
                                                                    </>
                                                                )}
                                                                {activeReport === 'finance' && (
                                                                    <>
                                                                        <td>{row.month}</td>
                                                                        <td className="text-success">Rs {row.fees.toLocaleString()}</td>
                                                                        <td className="text-danger">Rs {row.expenses.toLocaleString()}</td>
                                                                        <td className="text-primary">Rs {row.balance.toLocaleString()}</td>
                                                                    </>
                                                                )}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Section */}
                            <div className="row mt-4">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6>Report Summary</h6>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item d-flex justify-content-between">
                                                            <span>Report Type</span>
                                                            <strong>{reportsData[activeReport].title}</strong>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between">
                                                            <span>Date Range</span>
                                                            <strong>{startDate && endDate ? `${startDate} to ${endDate}` : 'Not specified'}</strong>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between">
                                                            <span>Generated By</span>
                                                            <strong>{auth.userName} ({auth.role})</strong>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="alert alert-info">
                                                        <i className="bi bi-lightbulb me-2"></i>
                                                        <strong>Insights:</strong>
                                                        <ul className="mb-0 mt-2">
                                                            <li>Data is based on current academic year</li>
                                                            <li>Reports can be exported as PDF or Excel</li>
                                                            <li>Contact admin for custom reports</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-between">
                                <small className="text-muted">
                                    <i className="bi bi-clock me-1"></i>
                                    Last updated: Today, 10:30 AM
                                </small>
                                <div>
                                    <button className="btn btn-sm btn-outline-primary me-2">
                                        <i className="bi bi-file-pdf me-1"></i> PDF
                                    </button>
                                    <button className="btn btn-sm btn-outline-success me-2">
                                        <i className="bi bi-file-excel me-1"></i> Excel
                                    </button>
                                    <button className="btn btn-sm btn-outline-secondary">
                                        <i className="bi bi-share me-1"></i> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Reports Section */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Quick Reports</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <button className="btn btn-outline-primary w-100">
                                        <i className="bi bi-calendar-week me-2"></i>
                                        Daily Attendance
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-outline-success w-100">
                                        <i className="bi bi-journal-text me-2"></i>
                                        Monthly Grades
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-outline-warning w-100">
                                        <i className="bi bi-people me-2"></i>
                                        Class Lists
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-outline-info w-100">
                                        <i className="bi bi-cash me-2"></i>
                                        Fee Statements
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

export default Reports;