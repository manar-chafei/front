"use client";

import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Fonction pour gérer les changements dans les champs de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "An error occurred. Please try again."
        );
      }

      const result = await response.json();
      setLoading(false);

      if (result.token) {
        // Store JWT token in localStorage
        localStorage.setItem("authToken", result.token);

        // Make a request to fetch the user's profile
        const profileResponse = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${result.token}`,
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data.");
        }

        const profileData = await profileResponse.json();
        console.log("User Profile:", profileData);

        const role = profileData.role;
        console.log("User Role:", role);

        // Redirect based on the role
        if (role === "candidate") {
          window.location.href = "/user";
        } else if (role === "recruiter") {
          window.location.href = "/recruteur";
        } else if (role === "admin") {
          window.location.href = "/admin";
        } else {
          throw new Error("Invalid role.");
        }
      } else {
        throw new Error("No token found in the response.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      Swal.fire({
        title: "An error occurred",
        text: error.message || "Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <head>
        <title>Login | Education</title>
        <meta name="description" content="Login to your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="assets/img/favicon.ico"
        />
        {/* CSS files */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <main className="login-body">
        <form className="form" onSubmit={handleSubmit}>
          <div className="login-form">
            <div className="logo-login">
              <a href="#">
                <img src="assets/img/logo/loder.png" alt="Logo" />
              </a>
            </div>
            <h2>Login Here</h2>

            {/* Champ Email */}
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Bouton de soumission */}
            <div className="btn col">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Liens supplémentaires */}
            <a href="#" className="registration">
              Forget Password
            </a>
            <a href="register" className="registration">
              Registration
            </a>
          </div>
        </form>
      </main>
    </>
  );
};

export default Signin;
