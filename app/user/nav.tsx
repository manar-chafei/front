'use client';

import React from "react";
import Link from "next/link";
const Navbar = () => {
    
    return (
        <>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        
      <div className="header-area header-transparent">
            <div className="main-header ">
                <div className="header-bottom  header-sticky">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-2">
                                <div className="logo">
                                    <a href="index.php"><img src="assets/img/logo/logo.png" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-10">
                                <div className="menu-wrapper d-flex align-items-center justify-content-end">
                                    
                                    <div className="main-menu d-none d-lg-block">
                                        <nav>
                                            <ul id="navigation">                                                                                          
                                                <li className="active" ><a href="index.php">Home</a></li>
                                                <li> <Link href="user/courses">Courses</Link></li>
                                                <li><a href="#">About</a></li>
                                                
                                                <li><a href="#">Contact</a></li>
                                               
                                               
                                                <li className="button-header" ><a href="#" className="btn btn3">Log Out</a></li>
                                                <li ><a href="#"><img src="../icon1.png"/></a></li>
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
        </>
    );
};

export default Navbar;
