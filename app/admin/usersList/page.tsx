"use client";

import React, { useEffect, useState } from "react";
import "../Admin.css";
import { useRouter } from "next/navigation";
const Admin = () => {
  const [users, setUsers] = useState([]); // Initialise avec un tableau vide
  const [error, setError] = useState<string | null>(null); // État pour les erreurs
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Récupérer le token depuis le localStorage ou un autre endroit
        const token = localStorage.getItem("authToken"); // Exemple pour obtenir le token du localStorage

        if (!token) {
          setError("Token manquant, veuillez vous connecter.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/users/profiles",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
              "Content-Type": "application/json", // Déclare le type de contenu
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); // Récupère les données utilisateurs
        setUsers(data); // Stocke les utilisateurs
      } catch (err: any) {
        setError(`Erreur de récupération des utilisateurs: ${err.message}`);
      }
    };

    fetchUsers();
  }, []);
  const navigateToListe = () => {
    router.push("/admin"); // Naviguer vers la page "Liste"
  };
  if (error) {
    return <div>Erreur : {error}</div>; // Affiche un message d'erreur
  }

  return (
    <div className="admin-container">
      <h1 className="title">Liste des utilisateurs</h1>
      <button className="navigate-button" onClick={navigateToListe}>
        Retour
      </button>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="user-card">
            <h3 className="user-name">{user.name}</h3>
            <p>Email : {user.email}</p>
            <p>Role : {user.role}</p>
          </div>
        ))
      ) : (
        <p>Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
};

export default Admin;
