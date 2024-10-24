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
import { useEffect, useState } from "react";
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

export const Dashboard = () => {
  const { user } = useUser();
  const { isDarkMode } = useTheme();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nameDescriptionModal, setNameDescriptionModal] = useState("");
  const [myProjectsOpenAndClose, setMyProjectsOpenAndClose] = useState(true);
  const [projectsOpenAndClose, setProjectsOpenAndClose] = useState(true);

  const userEmail = user ? user.email : undefined

  const { projects, loading } = useFetchProjects(user!.uid, userEmail!);
  const { deleteProject } = useDeleteProject();

  const openModal = (action: string) => {
    setModalIsOpen(true);
    setNameDescriptionModal(
      `Você não tem permissão para ${action} esse projeto`
    );
  };

  // console.log("projectsUid", projects?.projectsUid)

  return (
    <DashboardContainer className={isDarkMode ? "darkMode" : ""}>
      <DashboardContent>
        <PopUp
          modalIsOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          textTitle="Notificação"
          textDescription={nameDescriptionModal}
        />

        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardSubTitle>Gerencie todos os seus projetos</DashboardSubTitle>
        <DashboardTable>
          <DashboardSpan>Título</DashboardSpan>
          <DashboardSpan>Ações</DashboardSpan>
        </DashboardTable>


        <DashboardDivision>
          Projetos que você criou{" "}
          {myProjectsOpenAndClose ? (
            <ArrowsInLineVertical
              size={32}
              onClick={() => setMyProjectsOpenAndClose(false)}
            />
          ) : (
            <ArrowsOutLineVertical
              size={32}
              onClick={() => setMyProjectsOpenAndClose(true)}
            />
          )}
        </DashboardDivision>

        {projects!.projectsUid!.map((project: any) => (
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
        }

        {/* <DashboardColumnMyProjects
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
                </DashboardColumnMyProjects> */}

        {!loading && (
          <>
            <DashboardDivision>
              Projetos que você participa{" "}
              {projectsOpenAndClose ? (
                <ArrowsInLineVertical
                  size={32}
                  onClick={() => setProjectsOpenAndClose(false)}
                />
              ) : (
                <ArrowsOutLineVertical
                  size={32}
                  onClick={() => setProjectsOpenAndClose(true)
                  }
                />
              )}
            </DashboardDivision>
            {projects!.projectsEmail!.length > 0 ? (
              projects!.projectsEmail!.map((project: any) => (
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
        )}

      </DashboardContent >
    </DashboardContainer >
  );
};
