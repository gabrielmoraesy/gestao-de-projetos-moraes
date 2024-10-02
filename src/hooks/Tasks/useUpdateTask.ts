import { useState } from "react";
import { Task } from "../../interfaces/Task";
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux/es/exports";

// Redux Actions
import { changeProject } from "../../redux/project/actions";

// Interface
import { Project } from "../../interfaces/Project";

export const useUpdateTask = () => {
  const dispatch = useDispatch();

  const updateTask = async (
    projectId: string,
    taskId: number,
    name: string,
    description: string,
    assignedTo: string
  ) => {
    try {
      const projectRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(projectRef);

      if (projectDoc.exists()) {
        const updatedTasks = projectDoc.data().tasks.map((task: Task) => {
          if (task.id == taskId) {
            return { ...task, name, description, assignedTo };
          } else {
            return task;
          }
        });

        await updateDoc(projectRef, { tasks: updatedTasks });

        const projectCurrent = await getDoc(projectRef);
        dispatch(changeProject(projectCurrent.data() as Project));
      } else {
        console.error("Projeto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  return { updateTask };
};
