"use client";

import React, { useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts

const Logout = () => {
  useEffect(() => {
    // Supprimer le token de localStorage lors de la déconnexion
    localStorage.removeItem("authToken");

    // Afficher une alerte de confirmation de déconnexion
    Swal.fire({
      title: "Déconnexion réussie",
      text: "Vous avez été déconnecté avec succès.",
      icon: "success",
    });

    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = "/signin"; // Changez cette URL si nécessaire
  }, []);

  return null; // Ce composant ne rend rien, il s'exécute juste pour effectuer la déconnexion
};

export default Logout;
