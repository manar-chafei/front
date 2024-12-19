"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    experienceRequired: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/jobs/addJob", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error while adding the job");

      router.push("/recruteur");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fdf5e6", // Light orange background
        color: "#333", // Dark text for contrast
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <h1 style={{ color: "#ff6600", textAlign: "center" }}>Add a Job</h1>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          type="number"
          placeholder="Required Experience"
          value={formData.experienceRequired}
          onChange={(e) =>
            setFormData({ ...formData, experienceRequired: e.target.value })
          }
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#ff6600",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
