"use client";

import React, { useState } from "react";
import "../Admin.css";
import { useRouter } from "next/navigation";

const Admin = () => {
  const [newTest, setNewTest] = useState<any>({
    title: "",
    questions: Array.from({ length: 10 }, () => ({
      question: "",
      propositions: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    })),
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTest({ ...newTest, title: e.target.value });

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[index].question = e.target.value;
    setNewTest({ ...newTest, questions: updatedQuestions });
  };

  const handlePropositionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    propIndex: number
  ) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[questionIndex].propositions[propIndex].text =
      e.target.value;
    setNewTest({ ...newTest, questions: updatedQuestions });
  };

  const handlePropositionCorrectnessChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    propIndex: number
  ) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[questionIndex].propositions[propIndex].isCorrect =
      e.target.checked;
    setNewTest({ ...newTest, questions: updatedQuestions });
  };

  const handleAddTest = async () => {
    try {
      for (const question of newTest.questions) {
        if (question.propositions.length !== 3) {
          alert("Each question must have exactly 3 choices.");
          return;
        }
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Missing token, please login.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/tests/addTest", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTest),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      alert("Test added successfully!!");
      setNewTest({
        title: "",
        questions: Array.from({ length: 10 }, () => ({
          question: "",
          propositions: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        })),
      });
    } catch (err: any) {
      alert(`Error adding test: ${err.message}`);
    }
  };

  const navigateBackToAdmin = () => router.push("/admin");

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
            <a href="/" className="menu-item">
              <i className="fa fa-home"></i> Home
            </a>
          </li>
          <li>
            <a onClick={navigateBackToAdmin} className="menu-item">
              <i className="fa fa-arrow-left"></i> Back to Admin
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Create a New Test</h1>
        </header>
        <div className="add-test-form">
          <input
            type="text"
            placeholder="Test Title"
            value={newTest.title}
            onChange={handleTitleChange}
            className="form-input"
          />
          <div className="questions-container">
            {newTest.questions.map((question, qIndex) => (
              <div key={qIndex} className="question-block">
                <h3>Question {qIndex + 1}</h3>
                <input
                  type="text"
                  placeholder={`Enter Question ${qIndex + 1}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(e, qIndex)}
                  className="form-input"
                />
                <div className="propositions-container">
                  {question.propositions.map((prop, pIndex) => (
                    <div key={pIndex} className="proposition-block">
                      <input
                        type="text"
                        placeholder={`Option ${pIndex + 1}`}
                        value={prop.text}
                        onChange={(e) =>
                          handlePropositionChange(e, qIndex, pIndex)
                        }
                        className="form-input"
                      />
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={prop.isCorrect}
                          onChange={(e) =>
                            handlePropositionCorrectnessChange(
                              e,
                              qIndex,
                              pIndex
                            )
                          }
                        />
                        Correct
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={handleAddTest}>
            Add Test
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
