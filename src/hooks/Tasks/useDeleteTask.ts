import { Task } from "../../interfaces/Task";
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { useState } from "react";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTask = async (projectId: string, taskId: number) => {
    try {
      setLoading(true)
      const projectRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(projectRef);

      if (projectDoc.exists()) {
        const updatedTasks = projectDoc
          .data()
          .tasks.filter((task: Task) => task.id !== taskId);

        await updateDoc(projectRef, { tasks: updatedTasks });

      }
    } catch (e) {
      setError("Ocorreu um erro ao excluir a tarefa.");
    } finally {
      setLoading(false)
    }
  };

  return { deleteTask, loading, error };
};
