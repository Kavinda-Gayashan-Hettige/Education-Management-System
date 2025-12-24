import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 

export default function Navbar() {
  const { auth, logout } = useAuth(); 
  const { isAuthenticated, role, userName } = auth;

  
  const getDashboardLinks = () => {
    if (!isAuthenticated) return null; 

    switch (role) {
      case 'ADMIN':
        return (
          <>
            <li className="nav-item"><Link to="/admin/management" className="nav-link">User Management</Link></li>
            <li className="nav-item"><Link to="/admin/reports" className="nav-link">Reports</Link></li>
          </>
        );
      case 'TEACHER':
        return (
          <>
            <li className="nav-item"><Link to="/teacher/courses" className="nav-link">My Courses</Link></li>
            <li className="nav-item"><Link to="/teacher/attendance" className="nav-link">Mark Attendance</Link></li>
          </>
        );
      case 'STUDENT':
        return (
          <>
            <li className="nav-item"><Link to="/student/schedule" className="nav-link">Schedule</Link></li>
            <li className="nav-item"><Link to="/student/grades" className="nav-link">Grades</Link></li>
          </>
        );
      case 'PARENT':
        return (
          <>
            <li className="nav-item"><Link to="/parent/children" className="nav-link">My Children</Link></li>
            <li className="nav-item"><Link to="/parent/messages" className="nav-link">Messages</Link></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">EMS Dashboard</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && (
                <>
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    {getDashboardLinks()} 
                </>
            )}
          </ul>
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
                <>
                    <li className="nav-item">
                        <span className="nav-link text-warning">Hello, **{userName}**! | Role: **{role}**</span>
                    </li>
                    <li className="nav-item">
                        <button onClick={logout} className="nav-link btn btn-link text-white p-0" style={{textDecoration: 'none'}}>Logout</button>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}