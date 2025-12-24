import React, { useState } from "react";
import Navbar from "../components/Navbar";


function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${formData.name}!`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
    <div className="row"> <Navbar /></div>
    <div className="container mt-5">
      <div className="p-5 bg-light rounded-3 shadow-lg">
        <h1 className="text-center mb-4">Contact Us</h1>

       
        <div className="mb-4 text-center">
          <h5>Need Help?</h5>
          <p className="text-muted">
            Fill out the form below or reach us at{" "}
            <a href="mailto:support@ems.com">support@ems.com</a>.  
            We'll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Contact;
