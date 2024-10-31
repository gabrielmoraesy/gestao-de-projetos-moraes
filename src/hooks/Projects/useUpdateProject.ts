// React
import { useState } from "react";

// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

interface FirestoreDocument {
  name: string;
  description: string;
  technologies: string[];
  members: string[];
}

export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (uid: string, projectData: FirestoreDocument) => {
    try {
      setLoading(true);

      const docRef = doc(db, "projects", uid);

      const updatedData = {
        name: projectData.name,
        description: projectData.description,
        technologies: projectData.technologies,
        members: projectData.members,
      };

      await updateDoc(docRef, updatedData);
    } catch (error) {
      setError("Ocorreu um erro ao editar este projeto.")
    } finally {
      setLoading(false);
    }
  };

  return { updateProject, loading, error };
};
