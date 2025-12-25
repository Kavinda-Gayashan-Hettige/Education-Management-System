
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseManagement from './components/CourseManagement';

import Home from './pages/Home';
import AdminPage from './pages/AdminPage'; 
import TeacherPage from './pages/TeacherPage';
import StudentSchedule from './pages/StudentSchedule';
import StudentGrades from './pages/StudentGrades';
import Reports from './pages/Reports';
import Attendance from './pages/Attendance';
import ParentPage from './pages/ParentPage';
import Messages from './pages/Messages';


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
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    
                    
                  
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']} />}>
                        <Route path="/home" element={<Home />} />
                       
                    </Route>


                   
                   
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']} />}>
                        <Route path="/courses" element={<CourseManagement />} /> 
                    </Route>

                   
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                        <Route path="/admin/management" element={<AdminPage />} />
                        <Route path='/admin/reports' element={<Reports />} />
                        <Route path='/admin/course' element={<CourseManagement />}/>
                    </Route>

                   
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']} />}>
                        <Route path="/teacher/courses" element={<TeacherPage />} />
                        <Route path='/teacher/attendance' element={<Attendance />}/>
                    </Route>
                    
                  
                    <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
                        <Route path="/student/grades" element={<StudentGrades />} />
                        <Route path="/student/schedule" element={<StudentSchedule />} />
                        
                    </Route>

                     <Route element={<ProtectedRoute allowedRoles={['PARENT']} />}>
                        <Route path="/parent/children" element={<ParentPage />} />
                        <Route path="/parent/messages" element={<Messages />} />
                    </Route>

                </Routes>
            </div>
        </>
    );
}

export default App;