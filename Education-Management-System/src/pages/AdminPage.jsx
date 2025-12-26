import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function AdminPage() {
    const { auth, axiosInstance } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Data states
    const [admins, setAdmins] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [parents, setParents] = useState([]);
    
    // Form states
    const [newAdmin, setNewAdmin] = useState({
        adminID: '',
        name: '',
        email: '',
        password: '',
        contactNumber: ''
    });
    
    const [newTeacher, setNewTeacher] = useState({
        teacherID: '',
        name: '',
        email: '',
        subject: '',
        contactNumber: ''
    });
    
    const [newStudent, setNewStudent] = useState({
        studentID: '',
        name: '',
        grade: '',
        parentName: '',
        contactNumber: ''
    });
    
    const [newParent, setNewParent] = useState({
        parentID: '',
        name: '',
        email: '',
        studentName: '',
        contactNumber: ''
    });

    // Statistics state
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalTeachers: 0,
        totalStudents: 0,
        totalParents: 0
    });

    // Check admin access
    if (auth.role !== 'ADMIN') {
        return (
            <div className="container-fluid py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-danger">
                            <div className="card-body text-center py-5">
                                <i className="bi bi-shield-slash display-1 text-danger mb-3"></i>
                                <h2 className="text-danger">Access Denied</h2>
                                <p className="lead">This area is restricted to ADMINISTRATORS only.</p>
                                <p className="text-muted">Your current role: <strong>{auth.role}</strong></p>
                                <button className="btn btn-outline-primary mt-3">
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Fetch all data
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // Fetch all data in parallel
            const [adminsRes, teachersRes, studentsRes, parentsRes] = await Promise.all([
                axios.get(`${BASE_URL}/admin/get-all`),
                axios.get(`${BASE_URL}/teacher/get-all`),
                axios.get(`${BASE_URL}/student/get-all`),
                axios.get(`${BASE_URL}/parent/get-all`)
            ]);

            setAdmins(adminsRes.data || []);
            setTeachers(teachersRes.data || []);
            setStudents(studentsRes.data || []);
            setParents(parentsRes.data || []);

            // Update stats
            setStats({
                totalUsers: (adminsRes.data?.length || 0) + (teachersRes.data?.length || 0) + 
                           (studentsRes.data?.length || 0) + (parentsRes.data?.length || 0),
                totalAdmins: adminsRes.data?.length || 0,
                totalTeachers: teachersRes.data?.length || 0,
                totalStudents: studentsRes.data?.length || 0,
                totalParents: parentsRes.data?.length || 0
            });

            setError(null);
        } catch (err) {
            setError("Failed to fetch data from server. Please check your connection.");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Admin CRUD Operations
    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/admin/add', newAdmin);
            alert('Admin added successfully!');
            setNewAdmin({ adminID: '', name: '', email: '', password: '', contactNumber: '' });
            fetchAllData();
        } catch (err) {
            alert('Error adding admin: ' + (err.response?.data || err.message));
        }
    };

    const handleDeleteAdmin = async (adminID) => {
        if (!window.confirm('Are you sure you want to delete this admin?')) return;
        
        try {
            await axiosInstance.delete(`/admin/delete/${adminID}`);
            alert('Admin deleted successfully!');
            fetchAllData();
        } catch (err) {
            alert('Error deleting admin: ' + (err.response?.data || err.message));
        }
    };

    const handleUpdateAdmin = async (admin) => {
        try {
            await axiosInstance.put('/admin/update-admin', admin);
            alert('Admin updated successfully!');
            fetchAllData();
        } catch (err) {
            alert('Error updating admin: ' + (err.response?.data || err.message));
        }
    };

    // Teacher CRUD Operations
    const handleAddTeacher = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/teacher/add', newTeacher);
            alert('Teacher added successfully!');
            setNewTeacher({ teacherID: '', name: '', email: '', subject: '', contactNumber: '' });
            fetchAllData();
        } catch (err) {
            alert('Error adding teacher: ' + (err.response?.data || err.message));
        }
    };

    const handleDeleteTeacher = async (id) => {
        if (!window.confirm('Are you sure you want to delete this teacher?')) return;
        
        try {
            await axiosInstance.delete(`/teacher/delete/${id}`);
            alert('Teacher deleted successfully!');
            fetchAllData();
        } catch (err) {
            alert('Error deleting teacher: ' + (err.response?.data || err.message));
        }
    };

    // Student CRUD Operations
    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/student/add', newStudent);
            alert('Student added successfully!');
            setNewStudent({ studentID: '', name: '', grade: '', parentName: '', contactNumber: '' });
            fetchAllData();
        } catch (err) {
            alert('Error adding student: ' + (err.response?.data || err.message));
        }
    };

    const handleDeleteStudent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        
        try {
            await axiosInstance.delete(`/student/delete/${id}`);
            alert('Student deleted successfully!');
            fetchAllData();
        } catch (err) {
            alert('Error deleting student: ' + (err.response?.data || err.message));
        }
    };

    // Parent CRUD Operations
    const handleAddParent = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/parent/add', newParent);
            alert('Parent added successfully!');
            setNewParent({ parentID: '', name: '', email: '', studentName: '', contactNumber: '' });
            fetchAllData();
        } catch (err) {
            alert('Error adding parent: ' + (err.response?.data || err.message));
        }
    };

    const handleDeleteParent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this parent?')) return;
        
        try {
            await axiosInstance.delete(`/parent/delete/${id}`);
            alert('Parent deleted successfully!');
            fetchAllData();
        } catch (err) {
            alert('Error deleting parent: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div className="container-fluid py-4 admin-dashboard">
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
                                        <i className="bi bi-shield-lock-fill me-3"></i>
                                        Admin Management Dashboard
                                    </h1>
                                    <p className="mb-0 opacity-75">
                                        Welcome back, <strong className="text-warning">{auth.userName}</strong>! 
                                        Manage all system users and data.
                                    </p>
                                </div>
                                <div className="col-md-4 text-end">
                                    <div className="bg-white text-dark p-3 rounded-3 shadow">
                                        <h4 className="mb-0">Total Users</h4>
                                        <h1 className="display-4 text-primary fw-bold mb-0">
                                            {stats.totalUsers}
                                        </h1>
                                        <small className="text-muted">Across all categories</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h4 className="mt-3">Loading data...</h4>
                </div>
            )}

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <h4 className="alert-heading"><i className="bi bi-exclamation-triangle-fill me-2"></i>Error</h4>
                    <p>{error}</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                </div>
            )}

            {/* Quick Stats */}
            <div className="row mb-4">
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-primary bg-opacity-10 border-primary h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-primary">Admins</h6>
                                    <h2 className="text-primary mb-0">{stats.totalAdmins}</h2>
                                    <small className="text-muted">System administrators</small>
                                </div>
                                <i className="bi bi-shield-check text-primary display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-success bg-opacity-10 border-success h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-success">Teachers</h6>
                                    <h2 className="text-success mb-0">{stats.totalTeachers}</h2>
                                    <small className="text-muted">Teaching staff</small>
                                </div>
                                <i className="bi bi-person-badge text-success display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-warning bg-opacity-10 border-warning h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-warning">Students</h6>
                                    <h2 className="text-warning mb-0">{stats.totalStudents}</h2>
                                    <small className="text-muted">Registered students</small>
                                </div>
                                <i className="bi bi-mortarboard text-warning display-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card bg-info bg-opacity-10 border-info h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-info">Parents</h6>
                                    <h2 className="text-info mb-0">{stats.totalParents}</h2>
                                    <small className="text-muted">Parent accounts</small>
                                </div>
                                <i className="bi bi-people text-info display-5"></i>
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
                                className={`nav-link ${activeTab === 'admins' ? 'active' : ''}`}
                                onClick={() => setActiveTab('admins')}
                            >
                                <i className="bi bi-shield-check me-2"></i>
                                Admins
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'teachers' ? 'active' : ''}`}
                                onClick={() => setActiveTab('teachers')}
                            >
                                <i className="bi bi-person-badge me-2"></i>
                                Teachers
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'students' ? 'active' : ''}`}
                                onClick={() => setActiveTab('students')}
                            >
                                <i className="bi bi-mortarboard me-2"></i>
                                Students
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'parents' ? 'active' : ''}`}
                                onClick={() => setActiveTab('parents')}
                            >
                                <i className="bi bi-people me-2"></i>
                                Parents
                            </button>
                        </li>
                         <li className="nav-item">
                            <button 
                                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <i className="bi bi-speedometer2 me-2"></i>
                                Dashboard
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="row">
                <div className="col-12">
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light">
                                <h5 className="mb-0">
                                    <i className="bi bi-speedometer2 me-2"></i>
                                    System Overview
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Quick Actions</h6>
                                        <div className="d-grid gap-2">
                                            <button 
                                                className="btn btn-outline-primary"
                                                onClick={() => setActiveTab('admins')}
                                            >
                                                <i className="bi bi-person-plus me-2"></i>
                                                Manage Admins
                                            </button>
                                            <button 
                                                className="btn btn-outline-success"
                                                onClick={() => setActiveTab('teachers')}
                                            >
                                                <i className="bi bi-person-badge me-2"></i>
                                                Manage Teachers
                                            </button>
                                            <button 
                                                className="btn btn-outline-warning"
                                                onClick={() => setActiveTab('students')}
                                            >
                                                <i className="bi bi-mortarboard me-2"></i>
                                                Manage Students
                                            </button>
                                            <button 
                                                className="btn btn-outline-info"
                                                onClick={() => setActiveTab('parents')}
                                            >
                                                <i className="bi bi-people me-2"></i>
                                                Manage Parents
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>System Status</h6>
                                        <div className="card">
                                            <div className="card-body">
                                                <p>All systems operational</p>
                                                <div className="d-flex justify-content-between">
                                                    <small className="text-success">
                                                        <i className="bi bi-check-circle me-1"></i>
                                                        Backend Connected
                                                    </small>
                                                    <small className="text-success">
                                                        <i className="bi bi-check-circle me-1"></i>
                                                        Database Active
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Admins Management Tab */}
                    {activeTab === 'admins' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-shield-check me-2"></i>
                                    Admin Management
                                </h5>
                                <span className="badge bg-primary">{admins.length} Admins</span>
                            </div>
                            <div className="card-body">
                                {/* Add Admin Form */}
                                <div className="card mb-4 border-primary">
                                    <div className="card-header bg-primary text-white">
                                        <h6 className="mb-0">
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Add New Admin
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleAddAdmin}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Admin ID</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newAdmin.adminID}
                                                        onChange={(e) => setNewAdmin({...newAdmin, adminID: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newAdmin.name}
                                                        onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Email</label>
                                                    <input 
                                                        type="email" 
                                                        className="form-control"
                                                        value={newAdmin.email}
                                                        onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Contact Number</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newAdmin.contactNumber}
                                                        onChange={(e) => setNewAdmin({...newAdmin, contactNumber: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="form-control"
                                                        value={newAdmin.password}
                                                        onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary">
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Add Admin
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Admins List */}
                                <h6>Admin List</h6>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Admin ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins.map(admin => (
                                                <tr key={admin.adminID}>
                                                    <td>{admin.adminID}</td>
                                                    <td>{admin.name}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.contactNumber || '-'}</td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-warning me-2"
                                                            onClick={() => handleUpdateAdmin(admin)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteAdmin(admin.adminID)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Teachers Management Tab */}
                    {activeTab === 'teachers' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-person-badge me-2"></i>
                                    Teacher Management
                                </h5>
                                <span className="badge bg-success">{teachers.length} Teachers</span>
                            </div>
                            <div className="card-body">
                                {/* Add Teacher Form */}
                                <div className="card mb-4 border-success">
                                    <div className="card-header bg-success text-white">
                                        <h6 className="mb-0">
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Add New Teacher
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleAddTeacher}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Teacher ID</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newTeacher.teacherID}
                                                        onChange={(e) => setNewTeacher({...newTeacher, teacherID: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newTeacher.name}
                                                        onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Email</label>
                                                    <input 
                                                        type="email" 
                                                        className="form-control"
                                                        value={newTeacher.email}
                                                        onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Subject</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newTeacher.subject}
                                                        onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Contact Number</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newTeacher.contactNumber}
                                                        onChange={(e) => setNewTeacher({...newTeacher, contactNumber: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-success">
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Add Teacher
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Teachers List */}
                                <h6>Teacher List</h6>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Teacher ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Subject</th>
                                                <th>Contact</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teachers.map(teacher => (
                                                <tr key={teacher.teacherID}>
                                                    <td>{teacher.teacherID}</td>
                                                    <td>{teacher.name}</td>
                                                    <td>{teacher.email}</td>
                                                    <td>{teacher.subject || '-'}</td>
                                                    <td>{teacher.contactNumber || '-'}</td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-warning me-2"
                                                            onClick={() => {/* Update functionality */}}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteTeacher(teacher.id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Students Management Tab */}
                    {activeTab === 'students' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-mortarboard me-2"></i>
                                    Student Management
                                </h5>
                                <span className="badge bg-warning">{students.length} Students</span>
                            </div>
                            <div className="card-body">
                                {/* Add Student Form */}
                                <div className="card mb-4 border-warning">
                                    <div className="card-header bg-warning text-white">
                                        <h6 className="mb-0">
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Add New Student
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleAddStudent}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Student ID</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newStudent.studentID}
                                                        onChange={(e) => setNewStudent({...newStudent, studentID: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newStudent.name}
                                                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Grade</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newStudent.grade}
                                                        onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Parent Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newStudent.parentName}
                                                        onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Contact Number</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newStudent.contactNumber}
                                                        onChange={(e) => setNewStudent({...newStudent, contactNumber: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-warning">
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Add Student
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Students List */}
                                <h6>Student List</h6>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Name</th>
                                                <th>Grade</th>
                                                <th>Parent Name</th>
                                                <th>Contact</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map(student => (
                                                <tr key={student.studentID}>
                                                    <td>{student.studentID}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.grade || '-'}</td>
                                                    <td>{student.parentName || '-'}</td>
                                                    <td>{student.contactNumber || '-'}</td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-warning me-2"
                                                            onClick={() => {/* Update functionality */}}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteStudent(student.id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Parents Management Tab */}
                    {activeTab === 'parents' && (
                        <div className="card shadow-sm">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-people me-2"></i>
                                    Parent Management
                                </h5>
                                <span className="badge bg-info">{parents.length} Parents</span>
                            </div>
                            <div className="card-body">
                                {/* Add Parent Form */}
                                <div className="card mb-4 border-info">
                                    <div className="card-header bg-info text-white">
                                        <h6 className="mb-0">
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Add New Parent
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleAddParent}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Parent ID</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newParent.parentID}
                                                        onChange={(e) => setNewParent({...newParent, parentID: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newParent.name}
                                                        onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Email</label>
                                                    <input 
                                                        type="email" 
                                                        className="form-control"
                                                        value={newParent.email}
                                                        onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Student Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newParent.studentName}
                                                        onChange={(e) => setNewParent({...newParent, studentName: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Contact Number</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={newParent.contactNumber}
                                                        onChange={(e) => setNewParent({...newParent, contactNumber: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-info">
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Add Parent
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Parents List */}
                                <h6>Parent List</h6>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Parent ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Student Name</th>
                                                <th>Contact</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parents.map(parent => (
                                                <tr key={parent.parentID}>
                                                    <td>{parent.parentID}</td>
                                                    <td>{parent.name}</td>
                                                    <td>{parent.email}</td>
                                                    <td>{parent.studentName || '-'}</td>
                                                    <td>{parent.contactNumber || '-'}</td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-warning me-2"
                                                            onClick={() => {/* Update functionality */}}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteParent(parent.id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Refresh Button */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="text-center">
                        <button 
                            className="btn btn-outline-primary"
                            onClick={fetchAllData}
                            disabled={loading}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            {loading ? 'Refreshing...' : 'Refresh Data'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style>
                {`
                    .admin-dashboard {
                        background-color: #f8f9fa;
                    }
                    .nav-tabs .nav-link {
                        color: #495057;
                        font-weight: 500;
                        border-bottom: 3px solid transparent;
                    }
                    .nav-tabs .nav-link.active {
                        background-color: #fff;
                        border-color: #0d6efd;
                        color: #0d6efd;
                        font-weight: 600;
                    }
                    .table-hover tbody tr:hover {
                        background-color: rgba(13, 110, 253, 0.1);
                    }
                `}
            </style>
        </div>
    );
}

export default AdminPage;