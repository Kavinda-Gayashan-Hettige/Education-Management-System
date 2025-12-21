import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>

      <div className="container mt-5" >
        <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 text-center">
          <h1>Login Page</h1>
        </div>

        <form className="mt-4">


          <h1 className="h3 mb-3 fw-normal text-center">
            Please sign in
          </h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkDefault"
            />
            <label className="form-check-label" htmlFor="checkDefault">
              Remember me
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">

            <Link to="/home" className="btn btn-primary w-100 py-2">
              Sign in
            </Link>
          </button>
          <small className="text-muted d-block mt-1 text-center">
            If you are a new user, please register first with sign-up button
          </small>

          <button className="btn btn-primary w-100 py-2" type="submit">

            <Link to="/register" className="btn btn-primary w-100 py-2">
              Sign up
            </Link>
          </button>
          <p className="mt-5 mb-3 text-body-secondary text-center">
            © 2025–2026
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
