import { Task } from "../../interfaces/Task";
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Interface
import { FirestoreDocument } from "../../interfaces/Project";
import { useState } from "react";

export const useCheckTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkTask = async (projectId: string, taskId: number) => {
    try {
      setLoading(true)
      const projectRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(projectRef);

      const updatedTasks = (projectDoc.data() as FirestoreDocument).tasks.map(
        (task: Task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          } else {
            return task;
          }
        }
      );
      await updateDoc(projectRef, { tasks: updatedTasks });
    } catch (e) {
      setError("Ocorreu um erro ao concluir a tarefa.");
    } finally {
      setLoading(false)
    }
  };

  return { checkTask, loading, error };
};
