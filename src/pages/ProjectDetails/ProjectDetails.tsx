// Styled components
import {
  ProjectDetailsContainer,
  ProjectDetailsContent,
  ProjectDetailsTitle,
  ProjectDetailsSubTitle,
  ProjectDetailsParagraph,
  ProjectDetailsBar,
  ProjectDetailsStatistics,
  ProjectDetailsParagraphStatistics,
  ProjectDetailsBarTask,
  ProjectDetailsBarTaskActions,
  ProjectDetailsLink,
  ProjectDetailsTasks,
  ProjectDetailsTaskForm,
  ProjectDetailsTasksAll,
  ProjectDetailsInput,
  ProjectDetailsOption,
  ProjectDetailsButton,
  ProjectDetailsTask,
  ProjectDetailsParagraphTask,
  SpanTask,
  ProjectDetailsInfo,
  ProjectDetailsActions,
  ProjectDetailsLinkActions,
} from "./ProjectDetails.styles";

// React
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import { PopUp } from "../../components/PopUp/index";

// Hooks
import { useFetchProject } from "../../hooks/Projects/useFetchProject";

// Icons
import {
  ArrowBendUpLeft,
  ArrowsInLineVertical,
  ArrowsOutLineVertical,
  Info,
  CheckCircle,
  Trash,
  Pencil,
} from "phosphor-react";

// Hooks
import { useInsertTask } from "../../hooks/Tasks/useInsertTask";
import { useDeleteTask } from "../../hooks/Tasks/useDeleteTask";
import { useCheckTask } from "../../hooks/Tasks/useCheckTask";

// Context
import { useUser } from "../../contexts/userContext";
import { useTheme } from "../../contexts/themeContext";
import { Task } from "../../interfaces/Task";

export const ProjectDetails = () => {
  const { user } = useUser();
  const { isDarkMode } = useTheme();
  const { id } = useParams();

  const { insertTask } = useInsertTask();
  const { deleteTask } = useDeleteTask();
  const { checkTask } = useCheckTask();
  const { project, setProject, loading } = useFetchProject(id);

  const [nameTask, setNameTask] = useState("");
  const [descTask, setDescTask] = useState("");
  const [assignedTask, setAssignedTask] = useState("");

  const [tasksOpenAndClose, setTasksOpenAndClose] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formError, setFormError] = useState("");

  console.log("project", project)

  const addTask = async () => {
    if (!nameTask || !descTask || !assignedTask[0]) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: nameTask,
      description: descTask,
      completed: false,
      createdByName: user!.displayName,
      createdByEmail: user!.email,
      assignedTo: assignedTask,
      createdAt: new Date(),
    };

    try {
      if (id) {
        await insertTask(id, newTask);
        setNameTask("");
        setDescTask("");
        setAssignedTask("");
        setFormError("");

        setProject((prevProject) => {
          if (!prevProject) return prevProject;

          return {
            ...prevProject,
            tasks: [...prevProject.tasks, newTask],
          };
        });
      }
    } catch (error) {
      console.error("Erro ao inserir a tarefa no banco de dados:", error);
    }
  };

  const handleCheckTask = async (projectId: string, taskId: number) => {
    setProject((prevProject) => {
      if (!prevProject) return prevProject;

      const updatedTasks = prevProject.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      return {
        ...prevProject,
        tasks: updatedTasks,
      };
    });

    await checkTask(projectId, taskId);
  };


  const handleDeleteTask = async (projectId: string, taskId: number) => {
    setProject((prevProject) => {
      if (!prevProject) return prevProject;

      const updatedTasks = prevProject.tasks.filter(task => task.id !== taskId)

      return {
        ...prevProject,
        tasks: updatedTasks,
      };
    });

    await deleteTask(projectId, taskId);
  };

  const openAndCloseTasks = () => {
    setTasksOpenAndClose(!tasksOpenAndClose);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ProjectDetailsContainer className={isDarkMode ? "darkMode" : ""}>
      <ProjectDetailsContent>
        {!loading && (
          <>
            <ProjectDetailsBar>
              <ProjectDetailsTitle>{project?.name}</ProjectDetailsTitle>
              <Link to="/">
                <ArrowBendUpLeft size={32} />
              </Link>
            </ProjectDetailsBar>
            <ProjectDetailsSubTitle>
              Dono do projeto: {project?.createdByName} |{" "}
              {project?.createdByEmail}
            </ProjectDetailsSubTitle>
            <ProjectDetailsParagraph>
              {project?.description}
            </ProjectDetailsParagraph>
            <ProjectDetailsParagraph>
              Tecnologias: {project?.technologies.join(", ")}
            </ProjectDetailsParagraph>
            <ProjectDetailsParagraph>
              Colaboradores: {project?.members.join(", ")}
            </ProjectDetailsParagraph>

            {project?.members.includes(user?.email || "") ||
              user?.uid === project?.uid ? (
              <>
                <PopUp
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                  textTitle="Ajuda"
                  textDescription="Clique em cima das tarefas para ver mais detalhes sobre as mesmas"
                />

                <ProjectDetailsBarTask>
                  <ProjectDetailsTitle>Tarefas do Projeto</ProjectDetailsTitle>
                  <ProjectDetailsBarTaskActions>
                    <Info
                      size={32}
                      onClick={() => setModalIsOpen(true)}
                      className={isDarkMode ? "darkIcon" : ""}
                    />
                    {tasksOpenAndClose ? (
                      <ArrowsInLineVertical
                        size={32}
                        onClick={() => openAndCloseTasks()}
                        className={isDarkMode ? "darkIcon" : ""}
                      />
                    ) : (
                      <ArrowsOutLineVertical
                        size={32}
                        onClick={() => openAndCloseTasks()}
                        className={isDarkMode ? "darkIcon" : ""}
                      />
                    )}
                  </ProjectDetailsBarTaskActions>
                </ProjectDetailsBarTask>

                <ProjectDetailsStatistics>
                  <ProjectDetailsParagraphStatistics>
                    Tarefas Criadas |{" "}
                    <SpanTask>{project?.tasks.length}</SpanTask>
                  </ProjectDetailsParagraphStatistics>
                  <ProjectDetailsParagraphStatistics>
                    Tarefas Pendentes |{" "}
                    <SpanTask>
                      {project?.tasks.reduce(
                        (acc: number, task: Task) => {
                          if (!task.completed) {
                            acc++;
                          }
                          return acc;
                        },
                        0
                      )}
                    </SpanTask>
                  </ProjectDetailsParagraphStatistics>
                  <ProjectDetailsParagraphStatistics>
                    Tarefas Concluídas |{" "}
                    <SpanTask>
                      {project?.tasks.reduce(
                        (acc: number, task: Task) => {
                          if (task.completed) {
                            acc++;
                          }
                          return acc;
                        },
                        0
                      )}
                    </SpanTask>
                  </ProjectDetailsParagraphStatistics>
                </ProjectDetailsStatistics>

                <ProjectDetailsTasks
                  className={tasksOpenAndClose ? "block" : "none"}
                >
                  <ProjectDetailsTaskForm>
                    <ProjectDetailsInput
                      placeholder="Digite o nome da tarefa"
                      value={nameTask}
                      onChange={(e) => setNameTask(e.target.value)}
                    ></ProjectDetailsInput>
                    <ProjectDetailsInput
                      placeholder="Digite a descrição da tarefa"
                      value={descTask}
                      onChange={(e) => setDescTask(e.target.value)}
                    ></ProjectDetailsInput>
                    <ProjectDetailsInput
                      as="select"
                      value={assignedTask}
                      onChange={(e) => setAssignedTask(e.target.value)}
                    >
                      <ProjectDetailsOption value="">
                        Selecione um colaborador para atribuir a tarefa a ele(a)
                      </ProjectDetailsOption>
                      {project?.members.map((colaborador: any) => (
                        <ProjectDetailsOption key={colaborador}>
                          {colaborador}
                        </ProjectDetailsOption>
                      ))}
                    </ProjectDetailsInput>
                    {formError && (
                      <ProjectDetailsParagraph
                        className={isDarkMode ? "error black" : "error"}
                      >
                        {formError}
                      </ProjectDetailsParagraph>
                    )}
                    <ProjectDetailsButton onClick={() => addTask()}>
                      Adicionar
                    </ProjectDetailsButton>
                  </ProjectDetailsTaskForm>
                  <ProjectDetailsTasksAll>
                    {project?.tasks.map((task: Task) => (
                      <ProjectDetailsTask
                        key={task.id}
                        className={isDarkMode ? "taskDark" : ""}
                      >
                        <ProjectDetailsInfo>
                          <ProjectDetailsLink to={`/tasks/${id}/${task.id}`}>
                            <ProjectDetailsParagraphTask>
                              <SpanTask>Tarefa: </SpanTask>
                              {task.name}
                            </ProjectDetailsParagraphTask>
                            <ProjectDetailsParagraphTask>
                              <SpanTask>Criado por:</SpanTask>{" "}
                              {task.createdByName} | {task.createdByEmail}
                            </ProjectDetailsParagraphTask>
                            <ProjectDetailsParagraphTask>
                              <SpanTask>Atribuído a:</SpanTask>{" "}
                              {task.assignedTo}
                            </ProjectDetailsParagraphTask>
                            <ProjectDetailsParagraphTask>
                              <SpanTask>Completa:</SpanTask>{" "}
                              {task.completed ? "Concluida" : "Pendente"}
                            </ProjectDetailsParagraphTask>
                          </ProjectDetailsLink>
                        </ProjectDetailsInfo>

                        <ProjectDetailsActions>
                          <CheckCircle
                            size={37}
                            onClick={() => handleCheckTask(id!, task.id)}
                            className={isDarkMode ? "darkIcon" : ""}
                          />
                          <ProjectDetailsLinkActions
                            to={`/tasks/edit/${id}/${task.id}`}
                          >
                            <Pencil size={37} />
                          </ProjectDetailsLinkActions>
                          <Trash
                            size={37}
                            onClick={() => handleDeleteTask(id!, task.id)}
                            className={isDarkMode ? "darkIcon" : ""}
                          />
                        </ProjectDetailsActions>
                      </ProjectDetailsTask>
                    ))}
                  </ProjectDetailsTasksAll>
                </ProjectDetailsTasks>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </ProjectDetailsContent>
    </ProjectDetailsContainer>
  );
};
