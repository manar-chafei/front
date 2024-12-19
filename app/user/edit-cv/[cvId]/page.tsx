"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation"; // Importer usePathname
import "../EditCV.css";
const EditCV = () => {
  const [cv, setCv] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skillsInput, setSkillsInput] = useState(""); // Champ pour ajouter des compétences
  const router = useRouter();
  const pathname = usePathname(); // Utiliser usePathname pour obtenir l'URL actuelle
  const cvId = pathname.split("/").pop(); // Extraire l'ID du CV depuis l'URL

  // Vérifier que l'ID du CV est présent
  if (!cvId) {
    return <p>CV ID not found.</p>;
  }

  // Récupérer les données du CV à modifier
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Token manquant, veuillez vous connecter.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/cv/${cvId}`, {
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
        setCv(data);
        setLoading(false);
      } catch (err: any) {
        setError(`Erreur de récupération du CV: ${err.message}`);
        setLoading(false);
      }
    };

    fetchCV();
  }, [cvId]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/cv/${cvId}`,
        {
          name: cv.name,
          email: cv.email,
          phone: cv.phone,
          skills: cv.skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("CV successfully modified");
        router.push("/user/cv"); // Rediriger vers la liste des CVs
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du CV:", err);
      setError(`Erreur lors de la mise à jour du CV: ${err.message}`);
    }
  };

  // Fonction pour gérer le changement dans le champ "skills"
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
  };

  // Ajouter une compétence à la liste
  const addSkill = () => {
    if (skillsInput && !cv.skills.includes(skillsInput)) {
      setCv({
        ...cv,
        skills: [...cv.skills, skillsInput],
      });
      setSkillsInput(""); // Réinitialiser le champ d'entrée
    }
  };

  // Supprimer une compétence
  const removeSkill = (skill: string) => {
    setCv({
      ...cv,
      skills: cv.skills.filter((item) => item !== skill),
    });
  };

  if (loading) {
    return <p>Loading CV...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <div className="container">
        <h1>Edit CV</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={cv.name}
              onChange={(e) => setCv({ ...cv, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={cv.email}
              onChange={(e) => setCv({ ...cv, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={cv.phone}
              onChange={(e) => setCv({ ...cv, phone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              value={skillsInput}
              onChange={handleSkillChange}
              placeholder="Add Skill"
            />
            <button type="button" onClick={addSkill}>
              Add Skill
            </button>
            <ul>
              {cv.skills.map((skill, index) => (
                <li key={index}>
                  {skill}{" "}
                  <button type="button" onClick={() => removeSkill(skill)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit">Edit CV</button>
        </form>
      </div>
    </main>
  );
};

export default EditCV;
