"use client";

import React from "react";

const Page = () => {
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
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>

      {/* Background video */}

      {/* Header */}
      <header>
        <div className="header-area header-transparent">
          <div className="main-header">
            <div className="header-bottom header-sticky">
              <div className="container-fluid">
                <div className="row align-items-center">
                  {/* Logo */}
                  <div className="col-xl-2 col-lg-2">
                    <div className="logo">
                      <a href="#">
                        <img src="/assets/img/logo/logo.png" alt="Logo" />
                      </a>
                    </div>
                  </div>
                  {/* Navigation */}
                  <div className="col-xl-10 col-lg-10">
                    <div className="menu-wrapper d-flex align-items-center justify-content-end">
                      <div className="main-menu d-none d-lg-block">
                        <nav>
                          <ul id="navigation">
                            <li className="active">
                              <a href="#">Home</a>
                            </li>
                            <li>
                              <a href="/login">Courses</a>
                            </li>
                            <li>
                              <a href="/about">About</a>
                            </li>
                            <li>
                              <a href="/contact">Contact</a>
                            </li>
                            <li className="button-header margin-left">
                              <a href="signin" className="btn">
                                SignIn
                              </a>
                            </li>
                            <li className="button-header">
                              <a href="register" className="btn btn3">
                                Register
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
      </header>

      {/* Main Content */}
      <main>
        {/* Slider Area */}
        <section className="slider-area">
          <div className="slider-active">
            <div className="single-slider slider-height d-flex align-items-center">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-7 col-md-12">
                    <div className="hero__caption">
                      <h1 data-animation="fadeInLeft" data-delay="0.2s">
                        Online platform
                      </h1>
                      <p data-animation="fadeInLeft" data-delay="0.4s">
                        Build skills with courses, certificates, and degrees
                        online from world-class universities and companies.
                      </p>
                      <a
                        href="#"
                        className="btn hero-btn"
                        data-animation="fadeInLeft"
                        data-delay="0.7s"
                      >
                        Join for Free
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-content1">
            <div className="right-img">
              <img src="/assets/img/gallery/about.png" alt="" />
              <div className="video-icon">
                <a className="popup-video btn-icon" href="/logoanim.mp4">
                  <i className="fas fa-play"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Top Subjects */}
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((topic) => (
                <div key={topic} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="single-topic text-center mb-30">
                    <div className="topic-img">
                      <img
                        src={`/assets/img/gallery/topic${topic}.png`}
                        alt={`Topic ${topic}`}
                      />
                      <div className="topic-content-box">
                        <div className="topic-content">
                          <h3>
                            <a href="#">Programming</a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-12">
                <div className="section-tittle text-center mt-20">
                  <a href="/courses" className="border-btn">
                    View More Subjects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="about-area1 fix pt-10">
        <div className="support-wrapper align-items-center">
          <div className="left-content1">
            <div className="about-icon">
              <img src="assets/img/icon/about.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
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
                <h2 className="">Learner outcomes on courses you will take</h2>
              </div>
            </div>
            <div className="single-features">
              <div className="features-icon">
                <img src="assets/img/icon/right-icon.svg" alt="" />
              </div>
              <div className="features-caption">
                <p>
                  Techniques to engage effectively with vulnerable children and
                  young people.
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
              N
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
              <img src="/assets/img/gallery/about2.png" alt="" />
            </div>
          </div>
          <div className="left-content2">
            <div className="section-tittle section-tittle2 mb-20">
              <div className="front-text">
                <h2 className="">
                  Take the next step toward your personal and professional goals
                  with us.
                </h2>
                <p>
                  The automated process all your website tasks. Discover tools
                  and techniques to engage effectively with vulnerable children
                  and young people.
                </p>
                <a href="#" className="btn">
                  Join now for Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
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
};

export default Page;
