import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProfile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users-authors")
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const updateStatus = (id, isActive) => {
    axios.put(`http://localhost:3000/admin/update-status/${id}`, { isActive })
      .then(response => {
        setUsers(users.map(user => user._id === id ? response.data : user));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "Active" : "Blocked"}</td>
              <td>
                <button
                  className={`btn ${user.isActive ? "btn-danger" : "btn-success"}`}
                  onClick={() => updateStatus(user._id, !user.isActive)}
                >
                  {user.isActive ? "Block" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProfile;
