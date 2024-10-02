import { Task } from "../../interfaces/Task";
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux/es/exports";

// Redux Actions
import { changeProject } from "../../redux/project/actions";

// Interface
import { FirestoreDocument, Project } from "../../interfaces/Project";

export const useCheckTask = () => {
  const dispatch = useDispatch();

  const checkTask = async (projectId: string, taskId: number) => {
    try {
      const projectRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(projectRef);

      if (projectDoc.exists()) {
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

        const projectCurrent = await getDoc(projectRef);
        dispatch(changeProject(projectCurrent.data() as Project));
      } else {
        console.error("Projeto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao concluir a tarefa:", error);
    }
  };

  return { checkTask };
};
