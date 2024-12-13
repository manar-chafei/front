"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter(); // Hook pour la navigation
  const gotocvForm = () => {
    router.push("/user/addCV");
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
                      <a href="index.php">
                        <img src="assets/img/logo/logo.png" alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10">
                    <div className="menu-wrapper d-flex align-items-center justify-content-end">
                      <div className="main-menu d-none d-lg-block">
                        <nav>
                          <ul id="navigation">
                            <li className="active">
                              <a href="index.php">Home</a>
                            </li>
                            <li>
                              <Link href="user/courses">Courses</Link>
                            </li>
                            <li>
                              <a href="#">About</a>
                            </li>
                            <li>
                              <a href="#">Contact</a>
                            </li>
                            <li className="button-header">
                              <a href="#" className="btn btn3">
                                Log Out
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="../icon1.png" />
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
                        Welcome To online platform
                      </h1>
                      <p data-animation="fadeInLeft" data-delay="0.4s">
                        Build skills with courses, certificates, and degrees
                        online from world-class universities and companies
                      </p>

                      <form onSubmit={handleSubmit}>
                        <input
                          type="file"
                          id="cv"
                          name="cv"
                          accept=".pdf"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="cv" style={{ cursor: "pointer" }}>
                          <FaUpload size={30} color="rgb(244,203,128)" />
                          <p>Upload your CV</p>
                        </label>

                        <button
                          type="submit"
                          className="btn hero-btn"
                          data-animation="fadeInLeft"
                          data-delay="0.7s"
                        >
                          Send CV
                        </button>

                        {message && <p>{message}</p>}
                      </form>
                      <button
                        type="submit"
                        className="btn hero-btn"
                        data-animation="fadeInLeft"
                        data-delay="0.7s"
                        onClick={gotocvForm}
                      >
                        ADD YOUR CV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="services-area">
          <div className="container">
            <div className="row justify-content-sm-center">
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="single-services mb-30">
                  <div className="features-icon">
                    <img src="/assets/img/icon/icon1.svg" alt="" />
                  </div>
                  <div className="features-caption">
                    <a href="courses.php">
                      <h3>Courses</h3>
                    </a>
                    <p>The automated process all your website tasks.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="single-services mb-30">
                  <div className="features-icon">
                    <img src="assets/img/icon/icon2.svg" alt="" />
                  </div>
                  <div className="features-caption">
                    <a href="que.php">
                      <h3>Ask Question to Expert</h3>
                    </a>
                    <p>The automated process all your website tasks.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="single-services mb-30">
                  <div className="features-icon">
                    <img src="assets/img/icon/icon3.svg" alt="" />
                  </div>
                  <div className="features-caption">
                    <Link href="./user/tes">
                      <h3>Test </h3>
                      <p>Skills Test.</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        <section className="about-area1 fix pt-10">
          <div className="support-wrapper align-items-center">
            <div className="left-content1">
              <div className="about-icon">
                <img src="assets/img/icon/about.svg" alt="" />
              </div>
            </div>
            <div className="right-content1">
              <div className="right-img">
                <img src="assets/img/gallery/about.png" alt="" />
                <div className="video-icon">
                  <a className="popup-video btn-icon" href="../logoanim.mp4">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    </>
  );
}
