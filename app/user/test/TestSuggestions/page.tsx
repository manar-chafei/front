"use client";

import React, { useEffect, useState } from "react";
import "../../../admin/Admin.css";

const TestSuggestions = () => {
  const [skills, setSkills] = useState<string[]>([]); // Skills from the CV
  const [tests, setTests] = useState<any[]>([]); // All tests
  const [suggestedTests, setSuggestedTests] = useState<any[]>([]); // Suggested tests
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [score, setScore] = useState<number | null>(null);
  useEffect(() => {
    const fetchSkillsAndTests = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Missing token. Please log in.");
          return;
        }

        // Fetch the last user's CV
        const cvResponse = await fetch(
          "http://localhost:5000/api/getLastUserCV",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!cvResponse.ok) {
          throw new Error("Failed to fetch the last CV.");
        }

        const cvData = await cvResponse.json();
        setSkills(cvData.skills || []); // Extract skills from the last CV

        // Fetch all tests
        const testsResponse = await fetch(
          "http://localhost:5000/api/tests/getAllTests",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!testsResponse.ok) {
          throw new Error("Failed to fetch tests.");
        }

        const testsData = await testsResponse.json();
        setTests(testsData); // Store all tests

        // Filter tests based on user skills
        const matchingTests = testsData.filter((test: any) =>
          cvData.skills.some((skill: string) =>
            test.title.toLowerCase().includes(skill.toLowerCase())
          )
        );

        setSuggestedTests(matchingTests); // Set suggested tests
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      }
    };

    fetchSkillsAndTests();
  }, []);

  const handleTestClick = (test: any) => {
    setSelectedTest(test); // Show selected test details
    setUserAnswers({}); // Reset user answers
    setScore(null); // Reset score
  };

  const handleCheckboxChange = (questionId: string, propositionId: string) => {
    setUserAnswers((prevAnswers) => {
      const selectedAnswers = prevAnswers[questionId] || [];

      // Add or remove selected proposition
      const updatedAnswers = selectedAnswers.includes(propositionId)
        ? selectedAnswers.filter((id) => id !== propositionId)
        : [...selectedAnswers, propositionId];

      return { ...prevAnswers, [questionId]: updatedAnswers };
    });
  };

  const calculateScore = () => {
    if (!selectedTest) return;

    let totalScore = 0;

    selectedTest.questions.forEach((question: any) => {
      const correctPropositions = question.propositions.filter(
        (p: any) => p.isCorrect
      );
      const correctIds = correctPropositions.map((p: any) => p._id);
      const userSelectedIds = userAnswers[question._id] || [];

      // Check if user-selected answers are correct
      const allCorrect =
        userSelectedIds.length === correctIds.length &&
        userSelectedIds.every((id: any) => correctIds.includes(id));

      if (allCorrect) {
        totalScore += 10; // Add 10% for each correct question
      }
    });

    setScore(totalScore);
  };
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="main-content">
      <h1 className="dashboard-header">Test Suggestions</h1>

      {selectedTest ? (
        <div className="test-details-view ">
          <h2>{selectedTest.title}</h2>
          <div className="backbtn">
            <button className="btn btn3" onClick={() => setSelectedTest(null)}>
              Back to List
            </button>
          </div>
          <div className="right">
            {score !== null && (
              <div className="score-result">
                <h3>Your Score: {score} %</h3>
              </div>
            )}{" "}
            <button className="submit-button" onClick={calculateScore}>
              Submit
            </button>
          </div>
          <div className="cnt">
            {selectedTest.questions.map((question: any) => (
              <div key={question._id} className="question-details">
                <h3>{question.question}</h3>
                {question.propositions.map((prop: any) => (
                  <div key={prop._id} className="proposition">
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          userAnswers[question._id]?.includes(prop._id) || false
                        }
                        onChange={() =>
                          handleCheckboxChange(question._id, prop._id)
                        }
                      />
                      {prop.text}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="dashboard-cards">
          {suggestedTests.length > 0 ? (
            suggestedTests.map((test) => (
              <div
                key={test._id}
                className="cardt"
                onClick={() => handleTestClick(test)}
              >
                <h3 className="test-title">{test.title}</h3>
                <p>{test.description}</p>
              </div>
            ))
          ) : (
            <p>No suggestions available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TestSuggestions;
