import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 

function Register() {
    const { axiosInstance } = useAuth(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '', password: '', firstName: '', lastName: '', role: 'STUDENT'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError(null);
        try {
           
            await axiosInstance.post('/users/register', formData); 
            setMessage("Registration Successful! Redirecting to login...");
            setTimeout(() => {
                navigate('/'); 
            }, 2000);
        } catch (err) {
            console.error("Registration failed:", err);
            setError(err.response?.data || "Registration failed. Username may be taken.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
           
            <h1 className="text-center">Register New User</h1>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
               
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="userName" value={formData.userName} onChange={handleChange} required />
                </div>
            
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>
               
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
             
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
               
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
}

export default Register;