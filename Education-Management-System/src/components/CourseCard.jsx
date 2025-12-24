import React from 'react';

function CourseCard({ course, isAdmin, onDelete }) {
    return (
        <div className="card h-100 shadow-sm border-primary">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{course.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">ID: {course.id}</h6>
                <p className="card-text flex-grow-1">{course.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Duration: <strong>{course.durationMonths} Months</strong>
                </li>
                <li className="list-group-item bg-success-subtle">
                    Fee: <strong>Rs. {course.fee.toFixed(2)}</strong>
                </li>
            </ul>
            {isAdmin && (
                <div className="card-footer bg-transparent border-top-0 text-end">
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(course.id)}
                    >
                        Delete Course
                    </button>
                </div>
            )}
        </div>
    );
}

export default CourseCard;