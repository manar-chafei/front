"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./Admin.css";

const Admin = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const navigateToListe = () => {
    router.push("/admin/usersList");
  };

  const navigateToTests = () => {
    router.push("/admin/testsList");
  };

  if (error) {
    return <div className="error-message">Erreur : {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src="../assets/img/logo/logo.png" alt="Logo" className="logo" />
          <h2>Admin Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="/" className="menu-item active">
              <i className="fa fa-home"></i> Home
            </a>
          </li>
          <li>
            <a onClick={navigateToListe} className="menu-item">
              <i className="fa fa-users"></i> Manage Users
            </a>
          </li>
          <li>
            <a onClick={navigateToTests} className="menu-item">
              <i className="fa fa-file-alt"></i> Manage Tests
            </a>
          </li>
          <li>
            <a href="/addadmin" className="menu-item">
              <i className="fa fa-user-plus"></i> Add Admin
            </a>
          </li>
          <li>
            <a href="/feedback" className="menu-item">
              <i className="fa fa-comments"></i> Feedback
            </a>
          </li>
          <li>
            <a href="/login" className="menu-item logout">
              <i className="fa fa-sign-out-alt"></i> Log Out
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, Admin</h1>
          <p>Manage everything efficiently</p>
        </header>

        <div className="dashboard-cards">
          <div className="card" onClick={navigateToListe}>
            <i className="fa fa-users card-icon"></i>
            <h3>Manage Users</h3>
            <p>View and manage all registered users.</p>
          </div>
          <div className="card" onClick={navigateToTests}>
            <i className="fa fa-file-alt card-icon"></i>
            <h3>Manage Tests</h3>
            <p>View and manage all tests and exams.</p>
          </div>
          <div className="card">
            <i className="fa fa-user-plus card-icon"></i>
            <h3>Add Admin</h3>
            <p>Add new administrators to the system.</p>
          </div>
          <div className="card">
            <i className="fa fa-comments card-icon"></i>
            <h3>Feedback</h3>
            <p>View feedback from users and respond.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
