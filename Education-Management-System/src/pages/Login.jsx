import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext"; 

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    
   
    const handleLoginSuccess = (role) => {
       navigate('/home');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
           
            const role = await login(username, password); 
            
           
            if (role) {
                handleLoginSuccess(role);
            }
            
        } catch (err) {
           
            const errorMessage = (typeof err === 'string' && err.includes("401")) ? "Invalid Credentials. Please try again." : err.toString();
            setError(errorMessage); 
            
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
             <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 text-center mb-4">
                 <h1>Login Page</h1>
             </div>

            <form className="mt-4" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>
                
                {error && <div className="alert alert-danger text-center">{error}</div>}

                
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Username</label>
                </div>

                
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2 mt-3" type="submit">
                    Sign in
                </button>

                <small className="text-muted d-block mt-3 text-center">
                    If you are a new user, please register first
                </small>

                <Link to="/register" className="btn btn-secondary w-100 py-2 mt-2">
                    Sign up
                </Link>
            </form>
        </div>
    );
}

export default Login;