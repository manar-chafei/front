"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";
import "../../../admin/Admin.css"; // Import du fichier CSS

const EditTest = () => {
  const [test, setTest] = useState({
    title: "",
    questions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState(""); // Champ pour ajouter une nouvelle question
  const [newProposition, setNewProposition] = useState(""); // Champ pour ajouter une nouvelle proposition
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null); // Question sélectionnée
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Utiliser usePathname pour obtenir l'URL actuelle
  const testId = pathname.split("/").pop(); // Extraire l'ID du test depuis l'URL

  // Vérifier que l'ID du test est présent
  if (!testId) {
    return <p>Test ID not found.</p>;
  }

  // Récupérer les données du test à modifier
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Token manquant, veuillez vous connecter.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/tests/getTestById/${testId}`,
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
        setTest(data);
        setLoading(false);
      } catch (err: any) {
        setError(`Erreur de récupération du test: ${err.message}`);
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Token manquant, veuillez vous connecter.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/tests/updateTest/${testId}`,
        {
          title: test.title,
          questions: test.questions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Test successfully modified");
        router.push("/admin/testsList"); // Rediriger vers la liste des tests
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du test:", err);
      setError(`Erreur lors de la mise à jour du test: ${err.message}`);
    }
  };

  // Fonction pour gérer le changement dans le champ "title" (titre du test)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTest({
      ...test,
      title: e.target.value,
    });
  };

  // Ajouter une question
  const addQuestion = () => {
    if (newQuestion) {
      setTest({
        ...test,
        questions: [
          ...test.questions,
          { question: newQuestion, propositions: [] },
        ],
      });
      setNewQuestion(""); // Réinitialiser le champ d'entrée
    }
  };

  // Ajouter une proposition à la question sélectionnée
  const addProposition = () => {
    if (newProposition && selectedQuestionIndex !== null) {
      const updatedQuestions = [...test.questions];
      updatedQuestions[selectedQuestionIndex].propositions.push(newProposition);
      setTest({ ...test, questions: updatedQuestions });
      setNewProposition(""); // Réinitialiser le champ d'entrée
    }
  };

  // Supprimer une question
  const removeQuestion = (index: number) => {
    setTest({
      ...test,
      questions: test.questions.filter((_, i) => i !== index),
    });
  };

  // Supprimer une proposition d'une question
  const removeProposition = (questionIndex: number, proposition: string) => {
    const updatedQuestions = [...test.questions];
    updatedQuestions[questionIndex].propositions = updatedQuestions[
      questionIndex
    ].propositions.filter((prop) => prop !== proposition);
    setTest({ ...test, questions: updatedQuestions });
  };

  if (loading) {
    return <p>Loading test...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <div className="main-cotent">
        <h1>Edit Test</h1>
        <div className="add-form questions-container">
          {" "}
          {/* Make this div scrollable */}
          <form onSubmit={handleSubmit} className="add-form">
            <div>
              <label htmlFor="title" className="pcol">
                Test Title
              </label>
              <input
                type="text"
                id="title"
                value={test.title}
                onChange={handleTitleChange}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="newQuestion" className="pcol">
                New Question
              </label>
              <input
                type="text"
                id="newQuestion"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter new question"
                className="input-field"
              />
              <button type="button" onClick={addQuestion} className="btn">
                Add Question
              </button>
            </div>

            {test.questions.length > 0 && (
              <div>
                <h3>Questions</h3>
                <ul>
                  {test.questions.map((question, index) => (
                    <li key={index}>
                      <div>
                        <strong>{question.question}</strong>
                        <button
                          type="button"
                          onClick={() => removeQuestion(index)}
                          className="btn"
                        >
                          Delete Question
                        </button>

                        <div>
                          <input
                            type="text"
                            value={newProposition}
                            onChange={(e) => setNewProposition(e.target.value)}
                            placeholder="Add proposition"
                            className="input-field"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedQuestionIndex(index);
                              addProposition();
                            }}
                            className="button"
                          >
                            Add Proposition
                          </button>
                        </div>

                        <ul>
                          {question.propositions.map((prop, propIndex) => (
                            <li key={propIndex}>
                              <div className="pcol">{prop.text}</div>

                              <button
                                type="button"
                                onClick={() => removeProposition(index, prop)}
                                className="button button-danger"
                              >
                                Delete
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="btn">
              {isLoading ? "Updating..." : "Update Test"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditTest;
