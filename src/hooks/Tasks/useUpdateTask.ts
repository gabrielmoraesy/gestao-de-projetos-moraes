import { useState } from "react";
import { Task } from "../../interfaces/Task";
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = async (
    projectId: string,
    taskId: number,
    name: string,
    description: string,
    assignedTo: string
  ) => {
    try {
      setLoading(true)
      const projectRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(projectRef);

      if (projectDoc.exists()) {
        const updatedTasks = projectDoc.data().tasks.map((task: Task) => {
          if (task.id === taskId) {
            return { ...task, name, description, assignedTo };
          } else {
            return task;
          }
        });

        await updateDoc(projectRef, { tasks: updatedTasks });
      }
    } catch (e) {
      setError("Ocorreu um erro ao editar a tarefa.");
    } finally {
      setLoading(false)
    }
  };

  return { updateTask, loading, error };
};
