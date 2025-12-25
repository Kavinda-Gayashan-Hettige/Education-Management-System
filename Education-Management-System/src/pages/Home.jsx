import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';



function Home() {
    const { auth, axiosInstance } = useAuth();
    const [welcomeMessage, setWelcomeMessage] = useState('Loading...');
    const [error, setError] = useState(null);
  
  
    useEffect(() => {
        const fetchRoleData = async () => {
           
            let endpoint = '';
            if (auth.role === 'ADMIN') {
                endpoint = '/users/admin/data'; 
            } else if (auth.role === 'TEACHER') {
                endpoint = '/users/teacher/data';
            } else if (auth.role === 'STUDENT') {
                endpoint = '/users/student/data';
            } else {
                setWelcomeMessage(`Welcome, ${auth.userName} (${auth.role})!`);
                return;
            }

            try {
              
                const response = await axiosInstance.get(endpoint);
                setWelcomeMessage(response.data);
            } catch (err) {
                console.error("Failed to fetch role data:", err);
               
                setError("Could not load specific role data. You may lack permission.");
            }
        };

        fetchRoleData();
    }, [auth.role, auth.userName, axiosInstance]);

    return (
        <>
        <div className="text-center p-5 bg-info-subtle rounded-3">
            
            <h1>Welcome Back, {auth.userName}!</h1>
            <p className="lead">Your role is: **{auth.role}**</p>
            
            <div className="mt-4 p-3 bg-white border rounded">
                <h2>Message from Server:</h2>
                {error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <p className="text-success fw-bold">{welcomeMessage}</p>
                )}
            </div>
            <p className="mt-3">Use the navigation bar above to access role-specific sections.</p>
        </div>
       <div className="row"><img src="src\assets\ems-bg.png" alt="EMS Background" style={{ maxWidth: '100%' }} /></div>
      
        <div className="row"><Footer /></div>
        </>
    );
}

export default Home;