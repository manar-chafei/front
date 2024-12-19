"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import "../edit-cv/EditCV.css";
const AddCVPage = () => {
  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: [{ company: "", role: "", duration: "" }],
    education: [{ institution: "", degree: "", year: "" }],
  });

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();

  // Gestion des changements des champs de texte
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Gestion des expériences professionnelles
  const handleExperienceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedExperience = [...cvData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    setCvData((prevData) => ({ ...prevData, experience: updatedExperience }));
  };

  const handleAddExperience = () => {
    setCvData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { company: "", role: "", duration: "" },
      ],
    }));
  };

  // Gestion des formations
  const handleEducationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedEducation = [...cvData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setCvData((prevData) => ({ ...prevData, education: updatedEducation }));
  };

  const handleAddEducation = () => {
    setCvData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { institution: "", degree: "", year: "" },
      ],
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs
    if (!cvData.name || !cvData.email || !cvData.phone) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!isAuthenticated || !token) {
      setMessage("Vous devez être connecté pour ajouter un CV.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/cv/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoyer le token JWT
        },
        body: JSON.stringify(cvData),
      });

      if (response.ok) {
        setMessage("CV ajouté avec succès !");
        router.push("/user");
      } else {
        const data = await response.json();
        setMessage(data.message || "Échec de l'ajout du CV. Réessayez.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add Your CV</h1>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={cvData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={cvData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={cvData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              value={cvData.skills}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Experience</label>
            {cvData.experience.map((exp, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Company"
                  required
                />
                <input
                  type="text"
                  name="role"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Role"
                  required
                />
                <input
                  type="text"
                  name="duration"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Duration"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddExperience}>
              Add experience
            </button>
          </div>
          <div>
            <label>Education</label>
            {cvData.education.map((edu, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Institution"
                  required
                />
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Degree"
                  required
                />
                <input
                  type="text"
                  name="year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Year"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddEducation}>
              Add formation
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      ) : (
        <div>You must be logged in to add a CV.</div>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AddCVPage;
