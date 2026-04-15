import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 🔥 Chart.js imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

// 🔥 register chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ParentPage() {

    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [childData, setChildData] = useState(null);
    const [activeTab, setActiveTab] = useState('progress');
    const [loading, setLoading] = useState(true);

    // 🔥 Load all students
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/student');
                const data = await res.json();
                setStudents(data);

                if (data.length > 0) {
                    setSelectedStudentId(data[0].id);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchStudents();
    }, []);

    // 🔥 Load selected student
    useEffect(() => {
        if (!selectedStudentId) return;

        const fetchChildData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/api/student/${selectedStudentId}`);
                const data = await res.json();
                setChildData(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        fetchChildData();
    }, [selectedStudentId]);

    // 🔥 Chart Data
    const chartData = {
        labels: childData?.subjectGrades?.map(sub => sub.subject) || [],
        datasets: [
            {
                label: 'Progress (%)',
                data: childData?.subjectGrades?.map(sub => sub.progress) || [],
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Student Performance Chart'
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!childData) {
        return <div className="text-center mt-5">No Data</div>;
    }

    return (
        <div className="container mt-4">

            {/* 🔥 Student Selector */}
            <div className="mb-4">
                <label className="form-label fw-bold">Select Student:</label>
                <select
                    className="form-select"
                    value={selectedStudentId || ''}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                    {students.map(stu => (
                        <option key={stu.id} value={stu.id}>
                            {stu.name} ({stu.grade})
                        </option>
                    ))}
                </select>
            </div>

            {/* Header */}
            <h2>Welcome, {childData.parentName}</h2>
            <h4>{childData.name} - {childData.grade}</h4>

            {/* Stats */}
            <div className="row my-4">
                <div className="col-md-4">
                    <div className="card p-3 bg-primary text-white">
                        <h5>Attendance</h5>
                        <h2>{childData.attendance}%</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 bg-success text-white">
                        <h5>Overall Grade</h5>
                        <h2>{childData.overallGrade}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 bg-info text-white">
                        <h5>Activities</h5>
                        <h2>{childData.recentActivity?.length || 0}</h2>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`}
                        onClick={() => setActiveTab('progress')}>
                        Progress
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('attendance')}>
                        Attendance
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'grades' ? 'active' : ''}`}
                        onClick={() => setActiveTab('grades')}>
                        Grades
                    </button>
                </li>
            </ul>

            {/* 🔥 Progress Tab (WITH CHART) */}
            {activeTab === 'progress' && (
                <div>

                    {/* 🔥 Chart */}
                    {childData.subjectGrades && (
                        <div className="card p-3 mb-4">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    )}

                    {/* Progress bars */}
                    {childData.subjectGrades?.map((sub, i) => (
                        <div key={i} className="mb-3">
                            <strong>{sub.subject}</strong> ({sub.grade})
                            <div className="progress">
                                <div className="progress-bar"
                                    style={{ width: `${sub.progress}%` }}>
                                    {sub.progress}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>In</th>
                            <th>Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {childData.attendanceRecords?.map((rec, i) => (
                            <tr key={i}>
                                <td>{rec.date}</td>
                                <td>{rec.status}</td>
                                <td>{rec.timeIn}</td>
                                <td>{rec.timeOut}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Grades Tab */}
            {activeTab === 'grades' && (
                <div className="row">
                    {childData.subjectGrades?.map((sub, i) => (
                        <div key={i} className="col-md-4">
                            <div className="card p-3 mb-3">
                                <h5>{sub.subject}</h5>
                                <h3>{sub.grade}</h3>
                                <small>{sub.teacher}</small>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default ParentPage;