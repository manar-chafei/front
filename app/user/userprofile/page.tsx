"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../admin/Admin.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<any | null>(null); // Utilisateur courant
  const [editMode, setEditMode] = useState(false); // Mode édition
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    role: "",
  }); // Données modifiées
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Token manquant, veuillez vous connecter.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/users/profile",
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

        const userData = await response.json();
        setCurrentUser(userData);
        setUpdatedUser({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
      } catch (err: any) {
        setError(`Erreur: ${err.message}`);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setCurrentUser({ ...currentUser, ...updatedUser });
        setEditMode(false);
      } else {
        throw new Error("Erreur de mise à jour des données.");
      }
    } catch (err: any) {
      setError(`Erreur: ${err.message}`);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("authToken"); // Supprime le token
        router.push("/"); // Redirige vers la page d'accueil
      } else {
        throw new Error("Erreur lors de la suppression du compte.");
      }
    } catch (err: any) {
      setError(`Erreur: ${err.message}`);
    }
  };

  const navigateToUser = () => {
    if (currentUser && currentUser.role) {
      console.log("role:", currentUser.role); // Debug
      if (currentUser.role === "user") {
        router.push("/user");
      } else if (currentUser.role === "recruter") {
        router.push("/recruter");
      } else {
        console.warn("Rôle inconnu :", currentUser.role);
        router.push("/"); // Redirection par défaut
      }
    } else {
      console.error("Utilisateur ou rôle non disponible.");
    }
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <>
      <div className="admin-container" style={{ padding: "20px" }}>
        <h1 className="title">Profile</h1>
        <button className="navigate-button" onClick={navigateToUser}>
          Back
        </button>
        {currentUser && (
          <div className="user-details" style={{ marginTop: "20px" }}>
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

                <div className="user-actions" style={{ marginTop: "10px" }}>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <p className="pcol">
                  <strong>Name:</strong> {currentUser.name}
                </p>
                <p className="pcol">
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <p className="pcol">
                  <strong>Role:</strong> {currentUser.role}
                </p>
                <div
                  className="user-actions"
                  style={{ display: "flex", marginTop: "10px" }}
                >
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
