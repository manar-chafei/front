"use client";

import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Combiner le prénom et le nom pour le champ "name"
    const name = `${formData.fname} ${formData.lname}`;

    const userData = {
      name, // Le champ 'name' dans le modèle backend
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registration successful");
        window.location.href = "/user";
      } else {
        setMessage(result.message || "Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred during registration");
    }
  };

  return (
    <>
      <head>
        <title>Courses | Education</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="assets/img/favicon.ico"
        />

        {/* CSS files */}
        
      </head>
      <div className="login-body">
        <form className="form" onSubmit={handleSubmit}>
          <div className="login-form">
            <div className="logo-login">
              <img src="assets/img/logo/loder.png" alt="Logo" />
            </div>
            <h2>Registration Here</h2>
            <div className="row">
              <div className="col">
                <div className="form-input">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-input">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-input">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-input">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-input">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-input">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="btn col">
              <button type="submit">Register</button>
            </div>
            <a href="signin" className="registration">
              Login
            </a>
            {message && <div className="alert">{message}</div>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
