"use client";

import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts

const rec = () => {
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
      <div className="login-form">
        <div className="logo-login">
          <a href="#">
            <img src="assets/img/logo/loder.png" alt="Logo" />
          </a>
        </div>
        <h2>rec Here</h2>
      </div>
    </>
  );
};

export default rec;
