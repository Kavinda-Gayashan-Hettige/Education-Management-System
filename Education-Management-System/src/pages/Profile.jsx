import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:9090/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container mt-5">
      <div className="p-5 bg-light rounded-3 shadow-lg">
        <h1 className="text-center mb-4">My Profile</h1>
        <ul className="list-group">
          <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
          <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
          <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
