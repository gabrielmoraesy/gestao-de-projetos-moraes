// Styled components
import {
  TaskDetailsContainer,
  TaskDetailsContent,
  TaskDetailsBar,
  TaskDetailsBarActions,
  TaskDetailsTitle,
  TaskDetailsSubTitle,
  TaskDetailsParagraph,
  TaskDetailsLink,
} from "./TaskDetails.styles";

// React
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Icons
import { ArrowBendUpLeft, CheckCircle, Pencil, Trash } from "phosphor-react";

// Hooks
import { useFetchProject } from "../../hooks/Projects/useFetchProject";
import { useDeleteTask } from "../../hooks/Tasks/useDeleteTask";
import { useCheckTask } from "../../hooks/Tasks/useCheckTask";

// Context
import { useTheme } from "../../contexts/themeContext";

// Interfaces
import { Task } from "../../interfaces/Task";

export const TaskDetails = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { idProject, idTask } = useParams();

  const { project, loading } = useFetchProject(idProject);

  const [task, setTask] = useState<Task | null>(null);

  const { deleteTask } = useDeleteTask();
  const { checkTask } = useCheckTask();

  useEffect(() => {
    const foundTask = project?.tasks.find(
      (task: Task) => task.id === parseInt(idTask!)
    );
    if (foundTask) {
      setTask(foundTask);
    }
  }, [idProject, idTask, project?.tasks]);

  const handleCheckTask = async () => {
    await checkTask(idProject!, parseInt(idTask!));
  };

  const handleDeleteTask = async () => {
    await deleteTask(idProject!, parseInt(idTask!));
    navigate(`/projects/${idProject}`);
  };

  return (
    <TaskDetailsContainer className={isDarkMode ? "darkMode" : ""}>
      <TaskDetailsContent>
        {!loading && (
          <>
            <TaskDetailsBar>
              <TaskDetailsTitle>
                Projeto: {project?.name} | Tarefa: {task?.name}
              </TaskDetailsTitle>
              <TaskDetailsBarActions>
                <CheckCircle
                  size={37}
                  onClick={() => handleCheckTask()}
                  className={isDarkMode ? "darkIcon" : ""}
                />
                <TaskDetailsLink to={`/tasks/edit/${idProject}/${idTask}`}>
                  <Pencil size={37} />
                </TaskDetailsLink>
                <Trash
                  size={37}
                  onClick={() => handleDeleteTask()}
                  className={isDarkMode ? "darkIcon" : ""}
                />
                <TaskDetailsLink to={`/projects/${idProject}`}>
                  <ArrowBendUpLeft size={32} />
                </TaskDetailsLink>
              </TaskDetailsBarActions>
            </TaskDetailsBar>
            <TaskDetailsSubTitle>
              Criador da tarefa: {task?.createdByName} | {task?.createdByEmail}
            </TaskDetailsSubTitle>
            <TaskDetailsSubTitle>
              Atribuída a: {task?.assignedTo}
            </TaskDetailsSubTitle>
            <TaskDetailsParagraph>
              Descrição: {task?.description}
            </TaskDetailsParagraph>
            <TaskDetailsParagraph>
              Feita: {task?.completed ? "Concluída" : "Pendente"}
            </TaskDetailsParagraph>
          </>
        )}
      </TaskDetailsContent>
    </TaskDetailsContainer>
  );
};
