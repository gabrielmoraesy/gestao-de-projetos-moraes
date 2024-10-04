// Styled components
import {
  DashboardContainer,
  DashboardContent,
  DashboardTitle,
  DashboardSubTitle,
  DashboardTable,
  DashboardSpan,
  DashboardColumnMyProjects,
  DashboardColumnProjects,
  DashboardRow,
  DashboardParagraph,
  DashboardDivision,
  DashboardActions,
  DashboardActionsButton,
  DashboardNoProjects,
  DashboardParagraphNoProjects,
} from "./Dashboard.styles";

// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import { PopUp } from "../../components/PopUp/index";

// Context
import { useUser } from "../../contexts/userContext";
import { useTheme } from "../../contexts/themeContext";

// Hooks
import { useFetchProjects } from "../../hooks/Projects/useFetchProjects";
import { useDeleteProject } from "../../hooks/Projects/useDeleteProject";

// Icons
import { ArrowsInLineVertical, ArrowsOutLineVertical } from "phosphor-react";

// Redux
import { useSelector } from "react-redux/es/hooks/useSelector";

interface RootState {
  projectsReducer: any;
}

export const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUser();
  const uid = user?.uid;

  const { projects: myProjects, loading: loadingMyProjects } = useFetchProjects(
    undefined,
    uid
  );


  const email = user?.email;
  const { projects, loading } = useFetchProjects(undefined, undefined, email!);

  const { deleteProject, loading: loadingDelete } = useDeleteProject();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nameDescriptionModal, setNameDescriptionModal] = useState("");

  const openModal = (action: string) => {
    setModalIsOpen(true);
    setNameDescriptionModal(
      `Você não tem permissão para ${action} esse projeto`
    );
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [myProjectsOpenAndClose, setMyProjectsOpenAndClose] = useState(true);
  const [projectsOpenAndClose, setProjectsOpenAndClose] = useState(true);

  const handleMyProjectsOpenAndClose = () => {
    setMyProjectsOpenAndClose(!myProjectsOpenAndClose);
  };

  const handleProjectsOpenAndClose = () => {
    setProjectsOpenAndClose(!projectsOpenAndClose);
  };

  const { projectsUidProjects, projectsEmailProjects } = useSelector(
    (rootReducer: RootState) => rootReducer.projectsReducer
  );

  console.log("projectsUidProjects", projectsUidProjects)

  return (
    <DashboardContainer className={isDarkMode ? "darkMode" : ""}>
      <DashboardContent>
        <PopUp
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          textTitle="Notificação"
          textDescription={nameDescriptionModal}
        />

        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardSubTitle>Gerencie todos os seus projetos</DashboardSubTitle>
        <DashboardTable>
          <DashboardSpan>Título</DashboardSpan>
          <DashboardSpan>Ações</DashboardSpan>
        </DashboardTable>

        {!loadingDelete && (
          <>
            {!loadingMyProjects && (
              <>
                <DashboardDivision>
                  Projetos que você criou{" "}
                  {myProjectsOpenAndClose ? (
                    <ArrowsInLineVertical
                      size={32}
                      onClick={() => handleMyProjectsOpenAndClose()}
                    />
                  ) : (
                    <ArrowsOutLineVertical
                      size={32}
                      onClick={() => handleMyProjectsOpenAndClose()}
                    />
                  )}
                </DashboardDivision>
                {projectsUidProjects.length > 0 ? (
                  projectsUidProjects.map((project: any) => (
                    <DashboardColumnMyProjects
                      className={myProjectsOpenAndClose ? "flex" : "none"}
                    >
                      <DashboardRow key={project.id}>
                        <DashboardParagraph>
                          {project.data.name}
                        </DashboardParagraph>
                        <DashboardActions>
                          <Link
                            to={`/projects/${project.id}`}
                            className={
                              isDarkMode
                                ? "btn btn-outline linkDark"
                                : "btn btn-outline"
                            }
                          >
                            Ver
                          </Link>
                          <Link
                            to={`/projects/edit/${project.id}`}
                            className={
                              isDarkMode
                                ? "btn btn-outline linkDark"
                                : "btn btn-outline"
                            }
                          >
                            Editar
                          </Link>
                          <DashboardActionsButton
                            onClick={() => deleteProject(project.id)}
                            className={
                              isDarkMode
                                ? "btn btn-outline btn-danger linkDarkRemove"
                                : "btn btn-outline btn-danger"
                            }
                          >
                            Excluir
                          </DashboardActionsButton>
                        </DashboardActions>
                      </DashboardRow>
                    </DashboardColumnMyProjects>
                  ))
                ) : (
                  <DashboardColumnMyProjects
                    className={myProjectsOpenAndClose ? "flex" : "none"}
                  >
                    <DashboardNoProjects>
                      <DashboardParagraphNoProjects>
                        Você não possui nenhum projeto criado
                      </DashboardParagraphNoProjects>

                      <Link to="/projects/create" className="btn">
                        Criar projeto
                      </Link>
                    </DashboardNoProjects>
                  </DashboardColumnMyProjects>
                )}
              </>
            )}
            {!loading && (
              <>
                <DashboardDivision>
                  Projetos que você participa{" "}
                  {projectsOpenAndClose ? (
                    <ArrowsInLineVertical
                      size={32}
                      onClick={() => handleProjectsOpenAndClose()}
                    />
                  ) : (
                    <ArrowsOutLineVertical
                      size={32}
                      onClick={() => handleProjectsOpenAndClose()}
                    />
                  )}
                </DashboardDivision>
                {projectsEmailProjects.length > 0 ? (
                  projectsEmailProjects.map((project: any) => (
                    <DashboardColumnProjects
                      className={projectsOpenAndClose ? "flex" : "none"}
                    >
                      <DashboardRow key={project.id}>
                        <DashboardParagraph>
                          {project.data.name}
                        </DashboardParagraph>
                        <DashboardActions>
                          <Link
                            to={`/projects/${project.id}`}
                            className={
                              isDarkMode
                                ? "btn btn-outline linkDark"
                                : "btn btn-outline"
                            }
                          >
                            Ver
                          </Link>
                          <Link
                            to=""
                            onClick={() => openModal("editar")}
                            className={
                              isDarkMode
                                ? "btn btn-outline linkDark"
                                : "btn btn-outline"
                            }
                          >
                            Editar
                          </Link>
                          <DashboardActionsButton
                            onClick={() => openModal("excluir")}
                            className={
                              isDarkMode
                                ? "btn btn-outline btn-danger linkDarkRemove"
                                : "btn btn-outline btn-danger"
                            }
                          >
                            Excluir
                          </DashboardActionsButton>
                        </DashboardActions>
                      </DashboardRow>
                    </DashboardColumnProjects>
                  ))
                ) : (
                  <DashboardColumnProjects
                    className={projectsOpenAndClose ? "flex" : "none"}
                  >
                    <DashboardNoProjects>
                      <DashboardParagraphNoProjects>
                        Você não participa de nenhum outro projeto, com exceção
                        dos que você criou
                      </DashboardParagraphNoProjects>

                      <Link to="/projects/create" className="btn">
                        Criar projeto
                      </Link>
                    </DashboardNoProjects>
                  </DashboardColumnProjects>
                )}
              </>
            )}{" "}
          </>
        )}
      </DashboardContent>
    </DashboardContainer>
  );
};
