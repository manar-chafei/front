"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditTest = () => {
  const router = useRouter();
  const [testId, setTestId] = useState<string | null>(null); // Pour stocker testId
  const [test, setTest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Vérifier si router.query est défini et contient testId
  useEffect(() => {
    if (router.isReady && router.query.testId) {
      // Assurez-vous que router est prêt et que testId existe
      setTestId(router.query.testId as string); // Mettre à jour testId
    }
  }, [router.isReady, router.query]); // Met à jour à chaque changement dans router.query ou lorsque router est prêt

  useEffect(() => {
    if (!testId) return; // Si testId n'est pas encore défini, ne pas lancer la requête

    const fetchTestDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Token manquant. Veuillez vous connecter.");
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
        setTest(data); // Stocker les détails du test
      } catch (err: any) {
        setError(`Erreur lors de la récupération du test : ${err.message}`);
      }
    };

    fetchTestDetails();
  }, [testId]); // Requêter à chaque changement de testId

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!test) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Modifier le test : {test.title}</h1>
      <div>
        <label>
          Titre :
          <input
            type="text"
            value={test.title}
            onChange={(e) => setTest({ ...test, title: e.target.value })}
          />
        </label>
      </div>
      {/* Ajouter les questions et autres informations ici */}
      <button onClick={handleUpdateTest} disabled={isLoading}>
        {isLoading ? "Mise à jour..." : "Mettre à jour"}
      </button>
      <button onClick={handleDeleteTest}>Supprimer</button>
    </div>
  );
};

export default EditTest;
