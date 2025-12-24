import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Base URL එකක් සහිත Axios Instance එක
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090', 
});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userName = localStorage.getItem('userName');
        const isAuthenticated = !!token;

        if (isAuthenticated) {
             // 🚨 Reload වලදී Token එක Header වලට එකතු කිරීම
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return { token, role, userName, isAuthenticated };
    });

    // Login Method
    const login = async (username, password) => {
        try {
            const response = await axiosInstance.post('/users/login', {
                userName: username, 
                password: password,
            });

            const { token, role, userName } = response.data;

            // Header එක සකස් කිරීම
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // State සහ Local Storage යාවත්කාලීන කිරීම
            setAuth({ token, role, userName, isAuthenticated: true });
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userName', userName);
            
            navigate('/home'); 
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            // 🚨 Backend එකෙන් එන error message එක පෙන්වීම
            throw error.response?.data?.message || error.message || "Login failed."; 
        }
    };

    // Logout Method
    const logout = () => {
        delete axiosInstance.defaults.headers.common['Authorization'];
        localStorage.clear();
        setAuth({ token: null, role: null, isAuthenticated: false, userName: null });
        navigate('/'); 
    };

    const value = {
        auth,
        login,
        logout,
        axiosInstance 
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};