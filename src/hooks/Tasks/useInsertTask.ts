// Firebase
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Interface
import { Task } from "../../interfaces/Task";

import { useState } from "react";

export const useInsertTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertTask = async (projectId: string, newTask: Task) => {
    try {
      setLoading(true)
      const docRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(docRef);

      if (projectDoc.exists()) {
        const existingTasks = projectDoc.data().tasks || [];
        const updatedTasks = [...existingTasks, newTask];
        await updateDoc(docRef, { tasks: updatedTasks });
      }
    } catch (error) {
      setError("Ocorreu um erro ao criar tarefa.");
      throw error;
    } finally {
      setLoading(false)
    }
  };

  return { insertTask, loading, error };
};
