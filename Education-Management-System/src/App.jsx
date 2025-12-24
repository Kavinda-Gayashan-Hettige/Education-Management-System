import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Components
const Home = () => <h1>Welcome to the EMS Dashboard!</h1>;
const AdminPage = () => <h1>Admin Management Panel</h1>;
const TeacherPage = () => <h1>Teacher Course Management</h1>;
const StudentPage = () => <h1>Student Schedule and Grades</h1>;


// Role-Based Route Wrapper
const ProtectedRoute = ({ element: Element, allowedRoles }) => {
    const { auth } = useAuth();
    
    if (!auth.isAuthenticated) {
        return <Navigate to="/" replace />; // Login නැතිනම්
    }
    
    // Role එක පරීක්ෂා කිරීම
    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/unauthorized" replace />; // අවසර නැතිනම්
    }

    return <Element />;
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
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/unauthorized" element={<h1>403 - Access Denied</h1>} />
                    
                    {/* Protected Routes (Login අවශ්‍යයි) */}
                    <Route path="/home" element={<ProtectedRoute element={Home} />} />
                    
                    {/* Role-Specific Routes */}
                    <Route path="/admin/management" element={<ProtectedRoute element={AdminPage} allowedRoles={['ADMIN']} />} />
                    <Route path="/teacher/courses" element={<ProtectedRoute element={TeacherPage} allowedRoles={['ADMIN', 'TEACHER']} />} />
                    <Route path="/student/grades" element={<ProtectedRoute element={StudentPage} allowedRoles={['STUDENT']} />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </>
    );
}

export default App;