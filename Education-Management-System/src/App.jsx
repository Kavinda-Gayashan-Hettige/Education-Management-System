import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseManagement from './components/CourseManagement';



const Home = () => <h1>Welcome to the EMS Dashboard!</h1>;
const AdminPage = () => <h1>Admin Management Panel</h1>;
const TeacherPage = () => <h1>Teacher Course Management</h1>;
const StudentPage = () => <h1>Student Schedule and Grades</h1>;



const ProtectedRoute = ({ allowedRoles }) => { 
    const { auth } = useAuth();
    
   
    if (!auth.isAuthenticated) {
        return <Navigate to="/" replace />; 
    }

    
    const userRole = auth.role;
    const isAuthorized = allowedRoles && allowedRoles.includes(userRole);

    if (isAuthorized) {
       
        return <Outlet />; 
    } else {
       
        return <Navigate to="/unauthorized" replace />;
    }
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

function AppContent() {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <Routes>

                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/unauthorized" element={<h1>403 - Access Denied</h1>} />


                    <Route path="/home" element={<ProtectedRoute element={Home} />} />

                    <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']} />}>
                        <Route path="/courses" element={<CourseManagement />} />
                    </Route>


                    <Route path="/admin/management" element={<ProtectedRoute element={AdminPage} allowedRoles={['ADMIN']} />} />
                    <Route path="/teacher/courses" element={<ProtectedRoute element={TeacherPage} allowedRoles={['ADMIN', 'TEACHER']} />} />
                    <Route path="/student/grades" element={<ProtectedRoute element={StudentPage} allowedRoles={['STUDENT']} />} />


                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </>
    );
}

export default App;