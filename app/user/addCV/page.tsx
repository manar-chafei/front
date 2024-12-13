"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddCVPage = () => {
  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: [{ company: "", role: "", duration: "" }],
    education: [{ institution: "", degree: "", year: "" }],
    file: null as File | null,
  });

  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setCvData((prevData) => ({ ...prevData, file: selectedFile }));
    }
  };

  const handleExperienceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedExperience = [...cvData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    setCvData((prevData) => ({ ...prevData, experience: updatedExperience }));
  };

  const handleEducationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedEducation = [...cvData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setCvData((prevData) => ({ ...prevData, education: updatedEducation }));
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

  const handleAddEducation = () => {
    setCvData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { institution: "", degree: "", year: "" },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvData.file) {
      setMessage("Please upload a CV file.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to upload a CV.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvData.file);
    formData.append("name", cvData.name);
    formData.append("email", cvData.email);
    formData.append("phone", cvData.phone);
    formData.append("skills", cvData.skills);
    formData.append("experience", JSON.stringify(cvData.experience));
    formData.append("education", JSON.stringify(cvData.education));

    try {
      const response = await fetch("http://localhost:5000/api/cv/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête
        },
      });

      if (response.ok) {
        setMessage("CV uploaded successfully!");
        // Rediriger vers une autre page après un upload réussi
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to upload CV. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the CV.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Upload Your CV</h1>
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
          <label>Phone</label>
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
            Add Experience
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
            Add Education
          </button>
        </div>
        <div>
          <label>Upload CV</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AddCVPage;
