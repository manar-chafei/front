"use client";

import React, { useEffect, useState } from "react";
import "../Admin.css";
import { useRouter } from "next/navigation";

const Admin = () => {
  const [users, setUsers] = useState([]); // Initialise avec un tableau vide
  const [selectedUser, setSelectedUser] = useState<any | null>(null); // Utilisateur sélectionné
  const [editMode, setEditMode] = useState(false); // Mode d'édition
  const [error, setError] = useState<string | null>(null); // État pour les erreurs
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    role: "",
  }); // Informations modifiées
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
        setUsers(data);
      } catch (err: any) {
        setError(`Erreur de récupération des utilisateurs: ${err.message}`);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setUpdatedUser({ name: user.name, email: user.email, role: user.role }); // Précharger les informations pour la modification
    setEditMode(false); // Désactive le mode d'édition au début
  };

  const handleEdit = () => {
    setEditMode(true); // Active le mode édition
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/users/profiles/${selectedUser._id}`, // Suppression via l'ID
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user: any) => user._id !== selectedUser._id)); // Mise à jour de la liste après suppression
        setSelectedUser(null); // Réinitialise l'utilisateur sélectionné
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
          body: JSON.stringify(updatedUser), // Données modifiées
        }
      );

      if (response.ok) {
        setUsers(
          users.map((user: any) =>
            user._id === selectedUser._id ? { ...user, ...updatedUser } : user
          )
        );
        setEditMode(false); // Désactive le mode d'édition après sauvegarde
      } else {
        throw new Error("Erreur de mise à jour");
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
      <h1 className="title">Liste des utilisateurs</h1>
      <button className="navigate-button" onClick={navigateToListe}>
        Back
      </button>
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
              onClick={() => handleSelectUser(user)} // Gère la sélection
            >
              <h3 className="user-name">{user.name}</h3>
              <p className="pcol">Email : {user.email}</p>
              <p className="pcol">Role : {user.role}</p>
            </div>
          ))
        ) : (
          <p className="pcol">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
