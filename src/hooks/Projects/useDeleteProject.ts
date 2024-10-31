// React
import { useState } from "react";

// Firebase
import { db } from "../../services/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "projects", id));
    } catch (e) {
      setError("Ocorreu um erro ao deletar o projeto.")
    } finally {
      setLoading(false);

    }
  };

  return { deleteProject, loading, error };
};
