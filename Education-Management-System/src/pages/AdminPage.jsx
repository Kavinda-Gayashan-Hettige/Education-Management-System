import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function AdminPage() {
  const { auth, axiosInstance } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
    role: "ADMIN",
    active: true
  });

  
  if (auth.role !== "ADMIN") {
    return <h2>Access Denied</h2>;
  }

  
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users/get-all");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  
  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/users/add", newUser);
      alert("User added successfully");
      setNewUser({ userName: "", password: "", role: "ADMIN", active: true });
      loadUsers();
    } catch (err) {
      alert("Error adding user");
    }
  };

 
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axiosInstance.delete(`/users/delete/${id}`);
      loadUsers();
    } catch (err) {
      alert("Delete failed");
    }
  };

 
  const toggleActive = async (id, active) => {
    try {
      await axiosInstance.put(
        `/users/${id}/${active ? "deactivate" : "activate"}`
      );
      loadUsers();
    } catch (err) {
      alert("Status change failed");
    }
  };

  
  const changeRole = async (id, role) => {
    try {
      await axiosInstance.put(`/users/${id}/role?role=${role}`);
      loadUsers();
    } catch (err) {
      alert("Role update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin User Management</h2>

     
      <form onSubmit={addUser} className="card p-3 mb-4">
        <h5>Add User</h5>

        <input
          className="form-control mb-2"
          placeholder="Username"
          value={newUser.userName}
          onChange={(e) =>
            setNewUser({ ...newUser, userName: e.target.value })
          }
          required
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
          required
        />

        <select
          className="form-select mb-2"
          value={newUser.role}
          onChange={(e) =>
            setNewUser({ ...newUser, role: e.target.value })
          }
        >
          <option value="ADMIN">ADMIN</option>
          <option value="TEACHER">TEACHER</option>
          <option value="STUDENT">STUDENT</option>
          <option value="PARENT">PARENT</option>
        </select>

        <button className="btn btn-primary">Add User</button>
      </form>

      
      <h5>All Users</h5>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.userName}</td>
                <td>{u.role}</td>
                <td>{u.active ? "ACTIVE" : "INACTIVE"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => toggleActive(u.id, u.active)}
                  >
                    {u.active ? "Deactivate" : "Activate"}
                  </button>

                  <select
                    value={u.role}
                    onChange={(e) =>
                      changeRole(u.id, e.target.value)
                    }
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="TEACHER">TEACHER</option>
                    <option value="STUDENT">STUDENT</option>
                    <option value="PARENT">PARENT</option>
                  </select>

                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
