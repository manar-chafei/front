"use client";

import React, { useEffect, useState } from "react";
import "../Admin.css";
import { useRouter } from "next/navigation";

const Admin = () => {
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

  // Fonction pour afficher/masquer les détails du test sélectionné
  const toggleTestDetails = (test: any) => {
    // Si le test est déjà sélectionné, le retirer de la sélection (masquer les détails)
    if (selectedTest && selectedTest._id === test._id) {
      setSelectedTest(null);
    } else {
      // Sinon, afficher les détails du test
      setSelectedTest(test);
    }
  };

  // Fonction pour revenir à la page Admin (sans afficher les détails)
  const navigateBackToAdmin = () => {
    router.push("/admin"); // Retourner à la page admin
  };
  const navigateBackToAddTest = () => {
    router.push("/admin/addTest");
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="admin-container">
      <h1 className="title">Liste des Tests</h1>

      {/* Affichage du bouton pour revenir à la page admin */}
      <button className="navigate-button" onClick={navigateBackToAdmin}>
        Retour à l'Admin
      </button>
      <button className="navigate-button" onClick={navigateBackToAddTest}>
        Ajouter Test
      </button>
      {/* Affichage des tests */}
      <div className="tests-list">
        {tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test._id}
              className="test-card"
              onClick={() => toggleTestDetails(test)} // On clique pour afficher/masquer les détails
            >
              <h3 className="test-title">{test.title}</h3>

              {/* Affichage des détails du test si sélectionné */}
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
                            style={{ color: prop.isCorrect ? "green" : "red" }}
                          >
                            {prop.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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

export default Admin;
