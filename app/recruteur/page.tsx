"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "../user/userprofile/menu.css";
export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter(); // Hook pour la navigation

  useEffect(() => {
    // Vérification que localStorage est bien disponible
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token manquant!");
        router.push("/signin"); // Rediriger vers la page de connexion si le token est absent
      }
    }
  }, [router]);

  const gotoAddoffre = () => {
    router.push("/recruteur/addjob");
  };

  const handleLogout = () => {
    // Supprimer le token du localStorage pour déconnecter l'utilisateur
    localStorage.removeItem("authToken");

    // Rediriger vers la page de connexion après déconnexion
    router.push("/signin");
  };
  const [comment, setComment] = useState(""); // State for the comment
  const [rating, setRating] = useState(0); // State for the star rating

  // Handle star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  // Handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Submit feedback
  const handleSubmitt = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }

    // You can send the comment and rating to your server here
    alert(
      `Feedback Submitted: \nRating: ${rating} Stars \nComment: ${comment}`
    );
  };
  const goProfile = () => {
    router.push("/user/userprofile");
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please upload a CV before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await fetch("http://localhost:5000/api/cv/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Ajouter le token à la requête
        },
      });

      if (response.ok) {
        setMessage("CV uploaded successfully!");
        setUploadSuccess(true);
        router.push("/tes");
      } else {
        setMessage("Failed to upload CV. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the CV.");
      console.error(error);
    }
  };

  return (
    <>
      <main>
        <div className="header-area header-transparent">
          <div className="main-header ">
            <div className="header-bottom  header-sticky">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-2">
                    <div className="logo">
                      <a href="/user">
                        <img
                          src="assets/img/logo/logo.png"
                          alt=""
                          className="no-margin-bottom"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10">
                    <div className="menu-wrapper d-flex align-items-center justify-content-end ">
                      <div className="main-menu d-none d-lg-block">
                        <nav>
                          <ul id="navigation">
                            <li className="active">
                              <a href="#">Home</a>
                            </li>

                            <li>
                              <a href="#">About</a>
                            </li>
                            <li>
                              <a href="#">Contact</a>
                            </li>
                            <li>
                              <a href="recruteur/addjob">My Offers</a>
                            </li>
                            <li className="button-header">
                              <a onClick={handleLogout} className="btn btn3">
                                Log Out
                              </a>
                            </li>
                            <li>
                              <a onClick={goProfile}>
                                <img
                                  style={{ cursor: "pointer" }}
                                  src="../icon1.png"
                                  className="no-margin-bottom"
                                />
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="slider-area ">
          <div className="slider-active">
            <div className="single-slider slider-height d-flex align-items-center">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-7 col-md-12">
                    <div className="hero__caption">
                      <h1 data-animation="fadeInLeft" data-delay="0.2s">
                        Welcome To Recruter Acount
                      </h1>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn hero-btn btnme"
                      data-animation="fadeInLeft"
                      data-delay="0.7s"
                      onClick={gotoAddoffre}
                    >
                      ADD JOB OFFER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="courses-area section-padding40 fix">
          <div className="container">
            <div id="courses">
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8">
                  <div className="section-tittle text-center mb-55">
                    <h2>Our Featured Courses</h2>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="properties__card">
                    <div className="properties__img overlay1">
                      <a href="#">
                        <img
                          src="assets/img/gallery/featured1.png"
                          alt="Course Image"
                        />
                      </a>
                    </div>
                    <div className="properties__caption">
                      <p>User Experience</p>
                      <h3>
                        <a href="#">Fundamental of UX for Application Design</a>
                      </h3>
                      <p>
                        The automated process handles all your website tasks.
                        Discover tools and techniques to engage effectively with
                        vulnerable children and young people.
                      </p>
                      <div className="properties__footer d-flex justify-content-between align-items-center">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                          <p>
                            <span>(4.5)</span> based on 120 reviews
                          </p>
                        </div>
                        <div className="price">
                          <span>$135</span>
                        </div>
                      </div>
                      <a href="#" className="border-btn border-btn2">
                        Find out more
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="properties__card">
                    <div className="properties__img overlay1">
                      <a href="#">
                        <img
                          src="assets/img/gallery/featured2.png"
                          alt="Course Image"
                        />
                      </a>
                    </div>
                    <div className="properties__caption">
                      <p>User Experience</p>
                      <h3>
                        <a href="#">Fundamental of UX for Application Design</a>
                      </h3>
                      <p>
                        The automated process handles all your website tasks.
                        Discover tools and techniques to engage effectively with
                        vulnerable children and young people.
                      </p>
                      <div className="properties__footer d-flex justify-content-between align-items-center">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                          <p>
                            <span>(4.5)</span> based on 120 reviews
                          </p>
                        </div>
                        <div className="price">
                          <span>$135</span>
                        </div>
                      </div>
                      <a href="#" className="border-btn border-btn2">
                        Find out more
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="properties__card">
                    <div className="properties__img overlay1">
                      <a href="#">
                        <img
                          src="assets/img/gallery/featured3.png"
                          alt="Course Image"
                        />
                      </a>
                    </div>
                    <div className="properties__caption">
                      <p>User Experience</p>
                      <h3>
                        <a href="#">Fundamental of UX for Application Design</a>
                      </h3>
                      <p>
                        The automated process handles all your website tasks.
                        Discover tools and techniques to engage effectively with
                        vulnerable children and young people.
                      </p>
                      <div className="properties__footer d-flex justify-content-between align-items-center">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                          <p>
                            <span>(4.5)</span> based on 120 reviews
                          </p>
                        </div>
                        <div className="price">
                          <span>$135</span>
                        </div>
                      </div>
                      <a href="#" className="border-btn border-btn2">
                        Find out more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="topic-area section-padding40">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8">
                <div className="section-tittle text-center mb-55">
                  <h2>Explore top subjects</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic1.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic2.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic3.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic4.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic5.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic6.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic7.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src="assets/img/gallery/topic8.png" alt="" />
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h3>
                          <a href="#">Programing</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-12">
                <div className="section-tittle text-center mt-20">
                  <a href="courses.html" className="border-btn">
                    View More Subjects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="about-area3 fix">
          <div className="support-wrapper align-items-center">
            <div className="right-content3">
              <div className="right-img">
                <section className="about-area1 fix pt-10">
                  <div className="support-wrapper align-items-center">
                    <div className="left-content1">
                      <div className="about-icon">
                        <img
                          src="assets/img/icon/about.svg"
                          alt=""
                          className="imf"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <img src="assets/img/gallery/about3.png" alt="" />
              </div>
            </div>
            <div className="left-content3">
              <div className="section-tittle section-tittle2 mb-20">
                <div className="front-text">
                  <h2 className="">
                    Learner outcomes on courses you will take
                  </h2>
                </div>
              </div>
              <div className="single-features">
                <div className="features-icon">
                  <img src="assets/img/icon/right-icon.svg" alt="" />
                </div>
                <div className="features-caption">
                  <p>
                    Techniques to engage effectively with vulnerable children
                    and young people.
                  </p>
                </div>
              </div>
              <div className="single-features">
                <div className="features-icon">
                  <img src="assets/img/icon/right-icon.svg" alt="" />
                </div>
                <div className="features-caption">
                  <p>
                    Join millions of people from around the world learning
                    together.
                  </p>
                </div>
              </div>
              <div className="single-features">
                <div className="features-icon">
                  <img src="assets/img/icon/right-icon.svg" alt="" />
                </div>
                <div className="features-caption">
                  <p>
                    Join millions of people from around the world learning
                    together. Online learning is as easy and natural.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-area2 fix pb-padding">
          <div className="support-wrapper align-items-center">
            <div className="right-content2">
              <div className="right-img">
                <img src="assets/img/gallery/about2.png" alt="" />
              </div>
            </div>
            <div className="left-content2">
              <div className="section-tittle section-tittle2 mb-20">
                <div className="front-text">
                  <h2 className="">
                    Take the next step toward your personal and professional
                    goals with us.
                  </h2>
                  <p>
                    The automated process all your website tasks. Discover tools
                    and techniques to engage effectively with vulnerable
                    children and young people.
                  </p>
                  <a href="#" className="btn">
                    Join now for Free
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-wrappper footer-bg">
          <div className="footer-area footer-padding">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-xl-4 col-lg-5 col-md-4 col-sm-6">
                  <div className="single-footer-caption mb-50">
                    <div className="single-footer-caption mb-30">
                      <div className="footer-logo mb-25">
                        <a href="#">
                          <img src="/assets/img/logo/logo2_footer.png" alt="" />
                        </a>
                      </div>
                      <div className="footer-tittle">
                        <div className="footer-pera">
                          <p>
                            The automated process starts as soon as your clothes
                            go into the machine.
                          </p>
                        </div>
                      </div>

                      <div className="footer-social">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://bit.ly/sai4ull">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-5">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Our solutions</h4>
                      <ul>
                        <li>
                          <a href="#">Design & creatives</a>
                        </li>
                        <li>
                          <a href="#">Telecommunication</a>
                        </li>
                        <li>
                          <a href="#">Restaurant</a>
                        </li>
                        <li>
                          <a href="#">Programing</a>
                        </li>
                        <li>
                          <a href="#">Architecture</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Support</h4>
                      <ul>
                        <li>
                          <a href="#">Design & creatives</a>
                        </li>
                        <li>
                          <a href="#">Telecommunication</a>
                        </li>
                        <li>
                          <a href="#">Restaurant</a>
                        </li>
                        <li>
                          <a href="#">Programing</a>
                        </li>
                        <li>
                          <a href="#">Architecture</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Company</h4>
                      <ul>
                        <li>
                          <a href="#">Design & creatives</a>
                        </li>
                        <li>
                          <a href="#">Telecommunication</a>
                        </li>
                        <li>
                          <a href="#">Restaurant</a>
                        </li>
                        <li>
                          <a href="#">Programing</a>
                        </li>
                        <li>
                          <a href="#">Architecture</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom-area">
            <div className="container">
              <div className="footer-border">
                <div className="row d-flex align-items-center">
                  <div className="col-xl-12 ">
                    <div className="footer-copy-right text-center">
                      <p>
                        {" "}
                        Copyright &copy;
                        <script>
                          document.write(new Date().getFullYear());
                        </script>{" "}
                        All rights reserved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div id="back-top">
        <a title="Go to Top" href="#">
          {" "}
          <i className="fas fa-level-up-alt"></i>
        </a>
      </div>
    </>
  );
}
