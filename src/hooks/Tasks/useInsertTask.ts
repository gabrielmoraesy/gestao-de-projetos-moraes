// Firebase
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Interface
import { Task } from "../../interfaces/Task";

// Redux
import { useDispatch } from "react-redux/es/exports";

// Redux Actions
import { changeProject } from "../../redux/project/actions";

// Interface
import { Project } from "../../interfaces/Project";

export const useInsertTask = () => {
  const dispatch = useDispatch();

  const insertTask = async (projectId: string, newTask: Task) => {
    try {
      const docRef = doc(db, "projects", projectId);
      const projectDoc = await getDoc(docRef);

      if (projectDoc.exists()) {
        const existingTasks = projectDoc.data().tasks || [];
        const updatedTasks = [...existingTasks, newTask];
        await updateDoc(docRef, { tasks: updatedTasks });

        const projectCurrent = await getDoc(docRef);
        dispatch(changeProject(projectCurrent.data() as Project));
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa no banco de dados:", error);
      throw error;
    }
  };

  return { insertTask };
};
