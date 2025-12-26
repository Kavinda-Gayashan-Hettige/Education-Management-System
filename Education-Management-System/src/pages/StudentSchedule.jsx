import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function StudentSchedule() {
    const { auth } = useAuth();
    const [activeDay, setActiveDay] = useState('Monday');

    if (auth.role !== 'STUDENT') return (<div className="alert alert-danger">Access Denied.</div>);

    // Sample timetable data
    const timetable = {
        Monday: [
            { time: "7:30 - 8:30", subject: "Mathematics", teacher: "Mr. Fernando", room: "Room 101", type: "Lecture" },
            { time: "8:30 - 9:30", subject: "Science", teacher: "Mrs. Perera", room: "Lab 1", type: "Practical" },
            { time: "9:45 - 10:45", subject: "English", teacher: "Ms. De Silva", room: "Room 102", type: "Lecture" },
            { time: "10:45 - 11:45", subject: "Sinhala", teacher: "Mr. Rathnayake", room: "Room 103", type: "Lecture" },
            { time: "1:00 - 2:00", subject: "Physical Education", teacher: "Mr. Silva", room: "Ground", type: "Sports" },
        ],
        Tuesday: [
            { time: "7:30 - 8:30", subject: "History", teacher: "Mrs. Karunaratne", room: "Room 104", type: "Lecture" },
            { time: "8:30 - 9:30", subject: "IT", teacher: "Mr. Jayasuriya", room: "Computer Lab", type: "Practical" },
            { time: "9:45 - 10:45", subject: "Mathematics", teacher: "Mr. Fernando", room: "Room 101", type: "Tutorial" },
        ],
        Wednesday: [
            { time: "7:30 - 8:30", subject: "Science", teacher: "Mrs. Perera", room: "Lab 2", type: "Practical" },
            { time: "8:30 - 9:30", subject: "English", teacher: "Ms. De Silva", room: "Room 102", type: "Lecture" },
            { time: "9:45 - 10:45", subject: "Art", teacher: "Mrs. Wijesinghe", room: "Art Room", type: "Practical" },
        ],
        Thursday: [
            { time: "7:30 - 8:30", subject: "Mathematics", teacher: "Mr. Fernando", room: "Room 101", type: "Lecture" },
            { time: "8:30 - 9:30", subject: "Music", teacher: "Mr. Bandara", room: "Music Room", type: "Practical" },
            { time: "9:45 - 10:45", subject: "Sinhala", teacher: "Mr. Rathnayake", room: "Room 103", type: "Tutorial" },
        ],
        Friday: [
            { time: "7:30 - 8:30", subject: "IT", teacher: "Mr. Jayasuriya", room: "Computer Lab", type: "Practical" },
            { time: "8:30 - 9:30", subject: "History", teacher: "Mrs. Karunaratne", room: "Room 104", type: "Lecture" },
            { time: "9:45 - 10:45", subject: "Assembly", teacher: "Principal", room: "Auditorium", type: "Assembly" },
            { time: "10:45 - 11:45", subject: "Club Activities", teacher: "Various", room: "Various", type: "Extracurricular" },
        ]
    };

    const getSubjectColor = (type) => {
        switch (type) {
            case 'Lecture': return 'primary';
            case 'Practical': return 'success';
            case 'Tutorial': return 'info';
            case 'Sports': return 'warning';
            case 'Assembly': return 'secondary';
            default: return 'light';
        }
    };

    const getSubjectIcon = (subject) => {
        if (subject.includes('Math')) return 'bi-calculator';
        if (subject.includes('Science')) return 'bi-chemistry';
        if (subject.includes('English')) return 'bi-translate';
        if (subject.includes('IT')) return 'bi-laptop';
        if (subject.includes('PE') || subject.includes('Sports')) return 'bi-person-running';
        if (subject.includes('Music')) return 'bi-music-note-beamed';
        if (subject.includes('Art')) return 'bi-palette';
        return 'bi-book';
    };

    // Helper functions for the header
    const getNextClass = () => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const todayClasses = timetable[activeDay];
        return todayClasses.find(cls => {
            const [start] = cls.time.split(' - ');
            const [hours, minutes] = start.split(':');
            const classStartTime = parseInt(hours) * 60 + parseInt(minutes);
            return classStartTime > currentTime;
        });
    };

    const calculateDayProgress = () => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        // School hours: 7:30 AM to 1:45 PM
        const schoolStart = 7 * 60 + 30; // 7:30 AM
        const schoolEnd = 13 * 60 + 45; // 1:45 PM

        if (currentTime < schoolStart) return 0;
        if (currentTime > schoolEnd) return 100;

        const totalDuration = schoolEnd - schoolStart;
        const elapsed = currentTime - schoolStart;
        return Math.round((elapsed / totalDuration) * 100);
    };

    const getDayStatus = () => {
        const progress = calculateDayProgress();
        if (progress === 0) return 'bg-secondary';
        if (progress > 0 && progress < 100) return 'bg-success';
        return 'bg-info';
    };

    return (
        <div className="container-fluid py-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0" style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white'
                    }}>
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1 className="display-6 fw-bold mb-2">
                                        <i className="bi bi-calendar-week-fill me-3"></i>
                                        My Class Schedule & Timetable
                                    </h1>
                                    <p className="mb-0 opacity-75">
                                        Welcome back, <strong>{auth.userName}</strong>! View your daily class schedule and upcoming events.
                                    </p>

                                    {/* Current Class Indicator */}
                                    <div className="row mt-3">
                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                                                    <i className="bi bi-clock text-white"></i>
                                                </div>
                                                <div>
                                                    <small className="opacity-75">Current Time</small>
                                                    <div className="fw-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                                                    <i className="bi bi-book text-white"></i>
                                                </div>
                                                <div>
                                                    <small className="opacity-75">Next Class</small>
                                                    <div className="fw-bold">
                                                        {getNextClass()?.subject || 'No more classes'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                                                    <i className="bi bi-geo-alt text-white"></i>
                                                </div>
                                                <div>
                                                    <small className="opacity-75">Current Location</small>
                                                    <div className="fw-bold">School Premises</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 text-end">
                                    <div className="bg-white text-dark p-3 rounded-3 shadow">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h4 className="mb-0">Today's Schedule</h4>
                                            <span className={`badge ${getDayStatus()} rounded-pill px-3`}>
                                                {getDayStatus() === 'bg-success' ? 'In Progress' :
                                                    getDayStatus() === 'bg-warning' ? 'Starting Soon' : 'Completed'}
                                            </span>
                                        </div>

                                        <div className="text-center mb-3">
                                            <h1 className="display-4 text-info fw-bold mb-0">
                                                {timetable[activeDay].length}
                                            </h1>
                                            <small className="text-muted">classes on {activeDay}</small>
                                        </div>

                                        {/* Time Starts */}
                                        <div className="row mt-2">
                                            <div className="col-6 text-center">
                                                <small className="text-muted">Start</small>
                                                <div className="fw-bold">7:30 AM</div>
                                            </div>
                                            <div className="col-6 text-center">
                                                <small className="text-muted">End</small>
                                                <div className="fw-bold">1:45 PM</div>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small>Day Progress</small>
                                                <small>{calculateDayProgress()}%</small>
                                            </div>
                                            <div className="progress" style={{ height: '6px' }}>
                                                <div
                                                    className="progress-bar bg-info"
                                                    role="progressbar"
                                                    style={{ width: `${calculateDayProgress()}%` }}
                                                    aria-valuenow={calculateDayProgress()}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Starts */}
            <div className="row mb-4">
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-primary bg-opacity-10 border-primary h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-primary">Weekly Classes</h6>
                                    <h2 className="text-primary mb-0">25</h2>
                                </div>
                                <i className="bi bi-calendar-check text-primary display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-success bg-opacity-10 border-success h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-success">Different Subjects</h6>
                                    <h2 className="text-success mb-0">8</h2>
                                </div>
                                <i className="bi bi-book text-success display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-warning bg-opacity-10 border-warning h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-warning">Practical Sessions</h6>
                                    <h2 className="text-warning mb-0">6</h2>
                                </div>
                                <i className="bi bi-flask text-warning display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-info bg-opacity-10 border-info h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-info">Upcoming Events</h6>
                                    <h2 className="text-info mb-0">3</h2>
                                </div>
                                <i className="bi bi-bell text-info display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Day Selector */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Select Day</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {Object.keys(timetable).map((day) => (
                                    <button
                                        key={day}
                                        className={`btn ${activeDay === day ? 'btn-primary' : 'btn-outline-primary'} flex-fill`}
                                        onClick={() => setActiveDay(day)}
                                    >
                                        <i className="bi bi-calendar-day me-2"></i>
                                        {day}
                                        <span className="badge bg-secondary ms-2">{timetable[day].length}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timetable Display */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">
                                <i className="bi bi-clock-history me-2"></i>
                                {activeDay}'s Schedule
                                <span className="badge bg-primary ms-2">{timetable[activeDay].length} classes</span>
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th width="15%">Time</th>
                                            <th width="25%">Subject</th>
                                            <th width="20%">Teacher</th>
                                            <th width="15%">Room</th>
                                            <th width="15%">Type</th>
                                            <th width="10%">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timetable[activeDay].map((classItem, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="fw-bold text-primary">{classItem.time}</div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className={`subject-icon bg-${getSubjectColor(classItem.type)}-subtle text-${getSubjectColor(classItem.type)} rounded-circle d-flex align-items-center justify-content-center me-3`}
                                                            style={{ width: '40px', height: '40px' }}>
                                                            <i className={`bi ${getSubjectIcon(classItem.subject)}`}></i>
                                                        </div>
                                                        <div>
                                                            <strong>{classItem.subject}</strong>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{classItem.teacher}</td>
                                                <td>
                                                    <span className="badge bg-secondary">{classItem.room}</span>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${getSubjectColor(classItem.type)} rounded-pill px-3`}>
                                                        {classItem.type}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="bi bi-info-circle"></i>
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

            {/* Additional Information */}
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-light">
                            <h6 className="mb-0">
                                <i className="bi bi-info-circle me-2"></i>
                                Class Types Legend
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center">
                                    <span className="badge bg-primary me-2">Lecture</span>
                                    <small>Theory classes</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="badge bg-success me-2">Practical</span>
                                    <small>Lab sessions</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="badge bg-info me-2">Tutorial</span>
                                    <small>Small group sessions</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="badge bg-warning me-2">Sports</span>
                                    <small>Physical education</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="badge bg-secondary me-2">Assembly</span>
                                    <small>School assembly</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-light">
                            <h6 className="mb-0">
                                <i className="bi bi-bell me-2"></i>
                                Upcoming Events
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="list-group list-group-flush">
                                <div className="list-group-item px-0">
                                    <div className="d-flex justify-content-between">
                                        <small className="fw-bold">Science Fair</small>
                                        <small className="text-muted">Jan 25</small>
                                    </div>
                                    <small className="text-muted">All students participate</small>
                                </div>
                                <div className="list-group-item px-0">
                                    <div className="d-flex justify-content-between">
                                        <small className="fw-bold">Parent Meeting</small>
                                        <small className="text-muted">Jan 28</small>
                                    </div>
                                    <small className="text-muted">2:00 PM - Auditorium</small>
                                </div>
                                <div className="list-group-item px-0">
                                    <div className="d-flex justify-content-between">
                                        <small className="fw-bold">Sports Day</small>
                                        <small className="text-muted">Feb 2</small>
                                    </div>
                                    <small className="text-muted">Annual sports meet</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-light">
                            <h6 className="mb-0">
                                <i className="bi bi-download me-2"></i>
                                Quick Actions
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-printer me-2"></i>
                                    Print Timetable
                                </button>
                                <button className="btn btn-outline-success">
                                    <i className="bi bi-calendar-plus me-2"></i>
                                    Add to Calendar
                                </button>
                                <button className="btn btn-outline-info">
                                    <i className="bi bi-share me-2"></i>
                                    Share Schedule
                                </button>
                                <button className="btn btn-outline-warning">
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Time Display */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <div className="d-flex justify-content-center align-items-center">
                                <i className="bi bi-clock-history display-6 text-primary me-3"></i>
                                <div>
                                    <h5 className="mb-0">Current School Time</h5>
                                    <h2 className="text-primary mb-0">7:45 AM - 1:45 PM</h2>
                                    <small className="text-muted">Monday to Friday</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentSchedule;