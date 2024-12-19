"use client";

import React, { useEffect, useState } from "react";
import "../Admin.css";
import { useRouter } from "next/navigation";

const Admin = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [selectedUser, setSelectedUser] = useState<any | null>(null); // Selected user
  const [editMode, setEditMode] = useState(false); // Edit mode flag
  const [error, setError] = useState<string | null>(null); // Error state
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    role: "",
  }); // Modified user information
  const [showAddForm, setShowAddForm] = useState(false); // Show add admin form
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
  }); // New admin form data
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Token manquant, veuillez vous connecter.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/users/profiles",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data.filter((user: any) => user.role === "admin"));
      } catch (err: any) {
        setError(`Erreur de récupération des utilisateurs: ${err.message}`);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setUpdatedUser({ name: user.name, email: user.email, role: user.role });
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/users/profiles/${selectedUser._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user: any) => user._id !== selectedUser._id));
        setSelectedUser(null); // Deselect user after deletion
      } else {
        throw new Error("Erreur de suppression");
      }
    } catch (err: any) {
      setError(`Erreur: ${err.message}`);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/users/profiles/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((user: any) =>
            user._id === selectedUser._id ? { ...user, ...updatedUser } : user
          )
        );
        setEditMode(false);
      } else {
        throw new Error("Erreur de mise à jour");
      }
    } catch (err: any) {
      setError(`Erreur: ${err.message}`);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      // New admin details, role will automatically be set to "admin"
      const response = await fetch("http://localhost:5000/api/users/profiles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newAdmin, role: "admin" }),
      });

      if (response.ok) {
        const addedUser = await response.json();
        setUsers([...users, addedUser]); // Add the new admin to the list
        setShowAddForm(false); // Hide the form after adding
        setNewAdmin({ name: "", email: "" }); // Reset the form
      } else {
        throw new Error("Erreur d'ajout de l'admin");
      }
    } catch (err: any) {
      setError(`Erreur: ${err.message}`);
    }
  };

  const navigateToListe = () => {
    router.push("/admin");
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="admin-container">
      <h1 className="test-title">Admin List</h1>
      <button
        className=" btn btn2"
        style={{ marginBottom: "10px" }}
        onClick={navigateToListe}
      >
        Back
      </button>
      <button
        onClick={() => setShowAddForm(true)}
        className=" btn btn2"
        style={{ marginBottom: "10px", marginLeft: "10px" }}
      >
        Add Admin
      </button>

      {showAddForm && (
        <div className="add-admin-form ">
          <h3 className="">Add New Admin</h3>
          <label style={{ color: "white" }}>Name: </label>
          <input
            style={{ borderRadius: "10px", height: "40px", margin: "10px" }}
            type="text"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
          <label style={{ color: "white" }}>Email: </label>
          <input
            style={{ borderRadius: "10px", height: "40px", margin: "10px" }}
            type="email"
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
          />
          <div className="form-actions ">
            <button
              onClick={handleAddAdmin}
              className="btn btn3"
              style={{ marginLeft: "600px", marginTop: "-110px" }}
            >
              Save Admin
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="btn btn3"
              style={{ marginLeft: "50px", marginTop: "-110px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="user-details">
          <h3>User details</h3>
          {editMode ? (
            <div>
              <label className="pcol">Name: </label>
              <input
                className="input"
                type="text"
                value={updatedUser.name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
              />
              <label className="pcol">Email: </label>
              <input
                className="input"
                type="email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
              />
              <label className="pcol">Role: </label>
              <input
                className="input"
                type="text"
                value={updatedUser.role}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, role: e.target.value })
                }
              />
              <div className="user-actions">
                <button onClick={handleSave} className="save-button">
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="delete-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="pcol">
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p className="pcol">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="pcol">
                <strong>Role:</strong> {selectedUser.role}
              </p>

              <div className="user-actions">
                <button onClick={handleEdit} className="edit-button">
                  EDIT
                </button>
                <button onClick={handleDelete} className="delete-button">
                  DELETE
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="user-card"
              onClick={() => handleSelectUser(user)}
            >
              <h3 className="user-name">{user.name}</h3>
              <p className="pcol">Email : {user.email}</p>
              <p className="pcol">Role : {user.role}</p>
            </div>
          ))
        ) : (
          <p className="pcol">No admin users found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
