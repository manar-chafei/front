import "../st.css";
import React, { useEffect, useState } from "react";
import "../../../admin/Admin.css";
import { useRouter } from "next/navigation";

const TestList = () => {
  const [tests, setTests] = useState<any[]>([]); // List of tests
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedTest, setSelectedTest] = useState<any | null>(null); // Selected test
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [score, setScore] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Missing token. Please log in.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/tests/getAllTests",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setTests(data);
      } catch (err: any) {
        setError(`Failed to fetch tests: ${err.message}`);
      }
    };

    fetchTests();
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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-content">
      <h1 className="dashboard-header">Test List</h1>

      {!selectedTest ? (
        <div className="dashboard-cards">
          {tests.length > 0 ? (
            tests.map((test) => (
              <div key={test._id} className="cardt">
                <h3 className="test-title">{test.title}</h3>
                <button onClick={() => handleTestClick(test)}>
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No tests available.</p>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default TestList;
