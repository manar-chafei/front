"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fonction pour récupérer les offres
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentification requise. Veuillez vous connecter.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/jobs/myJobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Erreur de récupération des offres.");
      }

      const data = await response.json();
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer une offre
  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentification requise.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/jobs/deleteJob/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'offre.");
      }

      // Rafraîchir la liste après suppression
      fetchJobs();
    } catch (err: any) {
      console.error("Erreur de suppression :", err.message);
      setError("Cant Delete ");
    }
  };

  // Charger les offres au montage du composant
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p>Loading Offers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Offers List</h1>
      <button
        onClick={() => router.push("/recruteur/addjob/add")}
        className="btn btn3"
        style={{ marginBottom: "10px" }}
      >
        Add Offer
      </button>

      {jobs.length === 0 ? (
        <p>No Offer Founded.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {jobs.map((job) => (
            <li
              key={job._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <div style={{ color: "white" }}>
                <strong>{job.title}</strong> - {job.company} ({job.location})
              </div>
              <div>
                <button
                  onClick={() =>
                    router.push(`/recruteur/addjob/edit/${job._id}`)
                  }
                  className="btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="btn"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
