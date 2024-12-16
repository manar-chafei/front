"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../edit-cv/EditCV.css";
const CVList = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCV, setSelectedCV] = useState(null); // État pour stocker le CV sélectionné
  const router = useRouter();

  // Récupérer tous les CVs de l'utilisateur
  useEffect(() => {
    const fetchcvs = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Token manquant, veuillez vous connecter.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/cvs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setCvs(data);
      } catch (err: any) {
        setError(`Erreur de récupération des CVs: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchcvs();
  }, []);

  // Voir les détails d'un CV
  const viewCVDetails = (cvId) => {
    setSelectedCV(cvs.find((cv) => cv._id === cvId)); // Mettre à jour l'état avec le CV sélectionné
  };

  // Supprimer un CV
  const deleteCV = (cvId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce CV ?")) {
      axios
        .delete(`http://localhost:5000/api/cv/${cvId}`)
        .then(() => {
          setCvs(cvs.filter((cv) => cv._id !== cvId));
          alert("CV supprimé avec succès.");
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du CV:", error);
          alert("Erreur lors de la suppression du CV.");
        });
    }
  };

  // Modifier un CV
  const editCV = (cvId) => {
    router.push(`/user/edit-cv/${cvId}`);
  };

  // Si l'application est en train de charger les données
  if (loading) {
    return <p>Loading CVs...</p>;
  }

  // Si une erreur s'est produite lors de la récupération des CVs
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Liste de vos CVs</h1>
      <button onClick={() => router.push("/user/addCV")}>Ajouter un CV</button>

      {/* Affichage du CV sélectionné avec les boutons Modifier et Supprimer */}
      {selectedCV && (
        <div>
          <h2>Détails du CV</h2>
          <p>
            <strong>Nom:</strong> {selectedCV.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedCV.email}
          </p>
          <p>
            <strong>Téléphone:</strong> {selectedCV.phone}
          </p>
          <p>
            <strong>Compétences:</strong> {selectedCV.skills.join(", ")}
          </p>
          <button onClick={() => editCV(selectedCV._id)}>Modifier</button>
          <button onClick={() => deleteCV(selectedCV._id)}>Supprimer</button>
        </div>
      )}

      {/* Liste des CVs avec un clic pour voir les détails */}
      <ul>
        {cvs.map((cv) => (
          <li
            key={cv._id}
            style={{ marginBottom: "10px", cursor: "pointer" }}
            onClick={() => viewCVDetails(cv._id)}
          >
            <h3>{cv.name}</h3>
            <p>Email: {cv.email}</p>
            <p>Téléphone: {cv.phone}</p>
            <p>Compétences: {cv.skills.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVList;
