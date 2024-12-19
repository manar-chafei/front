"use client";

import React, { useState } from "react";
import AllTests from "./AllTests/page";
import TestSuggestions from "./TestSuggestions/page";
import { useRouter } from "next/navigation"; // Correction : Import de useRouter
import "./st.css";

const TestManager = () => {
  const [view, setView] = useState<"allTests" | "suggestions">("allTests");
  const router = useRouter(); // Correction : Utilisation de useRouter

  const navigateToUser = () => {
    router.push("/user"); // Correction : Utilisation de router.push correctement
  };

  return (
    <div className="main-container">
      <nav className="active main-menu">
        <button className="navigate-button" onClick={navigateToUser}>
          Back
        </button>
        <button onClick={() => setView("allTests")} className="test-nav">
          All Tests
        </button>
        <button onClick={() => setView("suggestions")} className="test-nav">
          Test Suggestions
        </button>
      </nav>

      <div className="view-container">
        {view === "allTests" && <AllTests />}
        {view === "suggestions" && <TestSuggestions />}
      </div>
    </div>
  );
};

export default TestManager;
