import React, { useState } from "react";
import "./Navbar.css";


export default function Navbar({ brand = "Education Management System", links = null }) {
  const [open, setOpen] = useState(false);

  const defaultLinks = [
    { name: "Home", href: "#" },
    { name: "Dashboard", href: "#" },
    { name: "Users", href: "#" },
    { name: "Courses", href: "#" },
  ];

  const navLinks = links || defaultLinks;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          {brand}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((item, i) => (
              <li className="nav-item" key={i}>
                <a className="nav-link" href={item.href}>
                  {item.name}
                </a>
              </li>
            ))}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul className="dropdown-menu shadow-sm" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else</a></li>
              </ul>
            </li>
          </ul>

          <form className="d-flex">
            <div className="input-group me-3" style={{ minWidth: 180 }}>
              <input
                className="form-control border-0 shadow-sm"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-outline-secondary border-0 shadow-sm" type="submit">
                Search
              </button>
            </div>

            <a className="btn btn-success btn-sm px-3" href="#">
              Get Started
            </a>
          </form>
        </div>
      </div>
    </nav>
  );
}