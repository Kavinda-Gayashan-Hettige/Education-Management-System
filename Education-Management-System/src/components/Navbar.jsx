import { Link } from "react-router-dom";

export default function Navbar() {
  

  return (
   <>
   
<nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
<div class="container-fluid">
  <a class="navbar-brand" href="#">Education Management System</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        {/* <a class="nav-link active" aria-current="page" href="#">Home/Dashboard</a> */}
         <Link to="/home" className="nav-link">Home/Dashboard</Link>
      </li>
      <li class="nav-item">
        {/* <a class="nav-link" href="#">About</a> */}
        <Link to="/about" className="nav-link">About</Link>
      </li>
      <li class="nav-item">
        {/* <a class="nav-link" href="#">Contact/Help</a> */}
         <Link to="/contact" className="nav-link">Contact/Help</Link>
      </li>
      <li class="nav-item">
        {/* <a class="nav-link" href="#">Profile</a> */}
         <Link to="/profile" className="nav-link">Profile</Link>
      </li>
       <li class="nav-item">
        {/* <a class="nav-link" href="#">Logout</a> */}
         <Link to="/" className="nav-link">Logout</Link>
      </li>
    </ul>
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-light" type="submit">Search</button>
    </form>
  </div>
</div>

</nav>


   </>
  );
}