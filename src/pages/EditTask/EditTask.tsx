import {
  EditTaskContainer,
  EditTaskContent,
  EditTaskParagraph,
  EditTaskTitle,
  EditTaskForm,
  EditTaskLabel,
  EditTaskSpan,
  EditTaskInput,
  EditTaskOption,
  EditTaskButton,
} from "./EditTask.styles";

// React
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Hooks
import { useFetchProject } from "../../hooks/Projects/useFetchProject";

// Context
import { useTheme } from "../../contexts/themeContext";

// Icons
import { ArrowBendUpLeft } from "phosphor-react";
import { useUpdateTask } from "../../hooks/Tasks/useUpdateTask";

export const EditTask = () => {
  const { isDarkMode } = useTheme();
  const { idProject, idTask } = useParams();
  const navigate = useNavigate();

  const { project, loading } = useFetchProject(idProject);
  const { updateTask } = useUpdateTask();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTask, setAssignedTask] = useState("");

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (project) {
      const taskFound = project.tasks.find((task) => {
        if (task.id === parseInt(idTask!)) {
          return task;
        }
      });

      setName(taskFound?.name!);
      setDescription(taskFound?.description!);
      setAssignedTask(taskFound?.assignedTo!);
    }
  }, [idTask, project]);

  const handleSubmitEditTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !assignedTask) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    updateTask(idProject!, parseInt(idTask!), name, description, assignedTask);

    setName("");
    setDescription("");
    setAssignedTask("");

    navigate(`/projects/${idProject}`);
  };

  return (
    <EditTaskContainer className={isDarkMode ? "darkMode" : ""}>
      <EditTaskContent>
        <Link to={`/projects/${idProject}`}>
          <ArrowBendUpLeft size={32} />
        </Link>
        <EditTaskTitle>Edição da Tarefa</EditTaskTitle>
        <EditTaskParagraph>
          Edite sua tarefa agora mesmo e altere o que precisar
        </EditTaskParagraph>

        {!loading && (
          <EditTaskForm onSubmit={handleSubmitEditTask}>
            <EditTaskLabel>
              <EditTaskSpan>Nome da tarefa:</EditTaskSpan>
              <EditTaskInput
                type="text"
                placeholder="Digite o nome da sua tarefa"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </EditTaskLabel>
            <EditTaskLabel>
              <EditTaskSpan>Descrição da tarefa:</EditTaskSpan>
              <EditTaskInput
                type="text"
                placeholder="Descreva brevemente o seu projeto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </EditTaskLabel>
            <EditTaskLabel>
              <EditTaskSpan>Atribuído a:</EditTaskSpan>
              <EditTaskInput
                as="select"
                value={assignedTask}
                onChange={(e) => setAssignedTask(e.target.value)}
              >
                <EditTaskOption value="">
                  Selecione um colaborador para atribuir a tarefa a ele(a)
                </EditTaskOption>
                {project?.members.map((colaborador) => (
                  <EditTaskOption>{colaborador}</EditTaskOption>
                ))}
              </EditTaskInput>
            </EditTaskLabel>

            {formError && (
              <EditTaskParagraph
                className={isDarkMode ? "error black" : "error"}
              >
                {formError}
              </EditTaskParagraph>
            )}
            <EditTaskButton>Editar</EditTaskButton>
          </EditTaskForm>
        )}
      </EditTaskContent>
    </EditTaskContainer>
  );
};
