import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import CourseCard from './CourseCard'; 
import AddCourseForm from './AddCourseForm'; 
import axios from 'axios'; 

const BASE_URL = 'http://localhost:8080'; 

function CourseManagement() {
    const { auth, axiosInstance } = useAuth(); 
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isAdmin = auth.role === 'ADMIN'; 

    
    useEffect(() => {
        
        const fetchCourses = async () => {
            try {
                
                const response = await axios.get(`${BASE_URL}/courses/get-all`); 
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch courses. Check Server Status.");
                setLoading(false);
                console.error("Course fetch error:", err);
            }
        };
        
       
        fetchCourses(); 

    }, []); 

    
    const handleAddCourse = async (courseData) => {
        
        try {
            const response = await axiosInstance.post('/courses/add', courseData);
            
            setCourses([...courses, response.data]); 
            alert(`Course '${response.data.name}' added successfully!`);
        } catch (err) {
            const errorMessage = err.response?.data || "Failed to add course. Access denied (403).";
            alert(`Error: ${errorMessage}`);
            console.error("Add Course Error:", err);
        }
    };


    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        try {
            await axiosInstance.delete(`/courses/delete/${courseId}`);
            
            setCourses(courses.filter(course => course.id !== courseId)); 
            alert(`Course ID ${courseId} deleted successfully.`);
        } catch (err) {
            const errorMessage = err.response?.data || "Failed to delete course. Access denied (403).";
            alert(`Error: ${errorMessage}`);
            console.error("Delete Course Error:", err);
        }
    };


    if (loading) return <div className="text-center mt-5">Loading courses...</div>;
    if (error) return <div className="alert alert-danger mt-5">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary">
                {isAdmin ? 'Admin Course Management' : 'Available Courses'}
            </h2>
          
            {auth.isAuthenticated && <p className="lead">Welcome, {auth.userName}! Your Role: <strong>{auth.role}</strong></p>}
            
            <hr />

            {isAdmin && (
                <div className="mb-5 p-4 border rounded bg-light">
                    <h4>Add New Course</h4>
                    <AddCourseForm onAdd={handleAddCourse} />
                </div>
            )}

            
            <h3 className="mb-4">Course List ({courses.length})</h3>
            
            <div className="row">
                {courses.length === 0 ? (
                    <p className="text-muted">No courses available yet.</p>
                ) : (
                    courses.map(course => (
                        <div key={course.id} className="col-md-4 mb-4">
                            <CourseCard 
                                course={course} 
                                isAdmin={isAdmin} 
                                onDelete={handleDeleteCourse}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CourseManagement;