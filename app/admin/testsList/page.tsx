"use client";

import React, { useEffect, useState } from "react";
import "../Admin.css";
import { useRouter } from "next/navigation";

const TestList = () => {
  const [tests, setTests] = useState<any[]>([]); // Liste des tests
  const [error, setError] = useState<string | null>(null); // État pour les erreurs
  const [selectedTest, setSelectedTest] = useState<any | null>(null); // Test sélectionné
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Token manquant, veuillez vous connecter.");
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
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setTests(data);
      } catch (err: any) {
        setError(`Erreur de récupération des tests: ${err.message}`);
      }
    };

    fetchTests();
  }, []);

  const toggleTestDetails = (test: any) => {
    if (selectedTest && selectedTest._id === test._id) {
      setSelectedTest(null); // Fermer les détails
    } else {
      setSelectedTest(test); // Ouvrir les détails
    }
  };

  const handleEditTest = (testId: string) => {
    router.push(`/admin/editTest/${testId}`); // Naviguer vers la page d'édition
  };

  const handleDeleteTest = async (testId: string) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/tests/deleteTest/${testId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      setTests(tests.filter((test) => test._id !== testId)); // Mise à jour de la liste après suppression
      setSelectedTest(null); // Réinitialiser l'état du test sélectionné
    } catch (err: any) {
      setError(`Erreur de suppression: ${err.message}`);
    }
  };

  const navigateBackToAdmin = () => {
    router.push("/admin");
  };

  const navigateBackToAddTest = () => {
    router.push("/admin/addTest");
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="main-content">
      <h1 className="dashboard-header">Liste des Tests</h1>
      <button className="submit-button" onClick={navigateBackToAdmin}>
        BACK TO DASHBOARD
      </button>
      <button className="submit-button" onClick={navigateBackToAddTest}>
        ADD TEST
      </button>
      <div className="dashboard-cards">
        {tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test._id}
              onClick={() => toggleTestDetails(test)}
              className={`cardt ${
                selectedTest && selectedTest._id === test._id
                  ? "cardt-selected"
                  : ""
              }`}
            >
              <h3 className="test-title">{test.title}</h3>
              {selectedTest && selectedTest._id === test._id && (
                <div className="test-details">
                  <h2>{test.title}</h2>
                  {test.questions.map((question: any, index: number) => (
                    <div key={index} className="question-details">
                      <h3>{question.question}</h3>
                      <ul>
                        {question.propositions.map((prop: any) => (
                          <li
                            key={prop._id}
                            style={{
                              color: prop.isCorrect ? "green" : "red",
                            }}
                          >
                            {prop.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="test-actions">
                    <button
                      className="edit-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche la fermeture des détails
                        handleEditTest(test._id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche la fermeture des détails
                        handleDeleteTest(test._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucun test trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default TestList;
