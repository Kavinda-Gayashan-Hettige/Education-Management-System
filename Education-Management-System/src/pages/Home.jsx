import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    const { auth, axiosInstance } = useAuth();
    const [welcomeMessage, setWelcomeMessage] = useState('Loading...');
    const [error, setError] = useState(null);

    // Backend එකේ Secured Endpoint එකක් Call කරන්නේ කෙසේද යන්න පෙන්වීමට
    useEffect(() => {
        const fetchRoleData = async () => {
            // Role එක අනුව Call කරන Endpoint එක වෙනස් වේ
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
                // Token එක Header එකේ යවා Secured Endpoint එකට Call කරයි
                const response = await axiosInstance.get(endpoint);
                setWelcomeMessage(response.data);
            } catch (err) {
                console.error("Failed to fetch role data:", err);
                // 403 Forbidden වැලැක්වීම සඳහා Home එකට direct access දුන්නද, backend error පෙන්වයි
                setError("Could not load specific role data. You may lack permission.");
            }
        };

        fetchRoleData();
    }, [auth.role, auth.userName, axiosInstance]);

    return (
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
    );
}

export default Home;