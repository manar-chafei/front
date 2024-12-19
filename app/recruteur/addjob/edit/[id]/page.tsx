"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import "../../../../admin/Admin.css";

const EditJobPage = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    experienceRequired: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Récupération des détails du poste existant
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Authentification requise.");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/jobs/myJob/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'offre.");
        }

        const data = await response.json();
        setFormData({
          title: data.title,
          description: data.description,
          company: data.company,
          location: data.location,
          salary: data.salary,
          experienceRequired: data.experienceRequired,
        });
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentification requise.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/jobs/updateJob/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'offre.");
      }

      // Redirection après modification
      router.push("/recruteur");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="cardt">
      <h1>Edit Job Offer</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          color: "white",
          justifyItems: "left",
        }}
      >
        <label>
          Titre :
          <input
            style={{
              color: "bisque",
              width: "50%",
              height: "35px",
              backdropFilter: "blur(10px)",
              backgroundColor: " #0000004e",
            }}
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </label>

        <label>
          Description :
          <textarea
            style={{
              color: "bisque",
              width: "50%",
              height: "50px",
              backdropFilter: "blur(10px)",
              backgroundColor: " #0000004e",
            }}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </label>

        <label>
          Company :
          <input
            style={{
              color: "bisque",
              height: "35px",
              width: "50%",
              backdropFilter: "blur(10px)",
              backgroundColor: " #0000004e",
            }}
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            required
          />
        </label>

        <label>
          Location :
          <input
            style={{
              color: "bisque",
              height: "35px",
              width: "50%",
              backdropFilter: "blur(10px)",
              backgroundColor: " #0000004e",
            }}
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </label>

        <label>
          Salary :
          <input
            style={{
              color: "bisque",
              height: "35px",
              width: "50%",
              backdropFilter: "blur(10px)",
              backgroundColor: " #0000004e",
            }}
            type="number"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
            required
          />
        </label>

        <label>
          Experience Required (years) :
          <input
            style={{
              color: "bisque",
              height: "35px",
              width: "50%",
              backdropFilter: "blur(10px)",
              backgroundColor: " #0000004e",
            }}
            type="number"
            value={formData.experienceRequired}
            onChange={(e) =>
              setFormData({ ...formData, experienceRequired: e.target.value })
            }
            required
          />
        </label>

        <button type="submit" className="btn btn4">
          Save modifications
        </button>
        <button
          type="button"
          onClick={() => router.push("/recruter")}
          className="btn btn2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
