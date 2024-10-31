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
import { LoadingGlobal } from "../Home/Home.styles";

export const Dashboard = () => {
  const { user } = useUser();
  const { isDarkMode } = useTheme();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nameDescriptionModal, setNameDescriptionModal] = useState("");
  const [myProjectsOpenAndClose, setMyProjectsOpenAndClose] = useState(true);
  const [projectsOpenAndClose, setProjectsOpenAndClose] = useState(true);

  const userEmail = user ? user.email : undefined

  const { projects, setProjects, loading } = useFetchProjects(undefined, user!.uid, userEmail!);
  const { deleteProject } = useDeleteProject();

  const openModal = (action: string) => {
    setModalIsOpen(true);
    setNameDescriptionModal(
      `Você não tem permissão para ${action} esse projeto`
    );
  };

  const renderButtonsOpenAndCloseTable = (table: string) => {
    if (table === 'myProjects') {
      return myProjectsOpenAndClose ? (
        <ArrowsInLineVertical
          size={32}
          onClick={() => setMyProjectsOpenAndClose(false)}
        />
      ) : (
        <ArrowsOutLineVertical
          size={32}
          onClick={() => setMyProjectsOpenAndClose(true)}
        />
      )
    }

    if (table === 'projects') {
      return projectsOpenAndClose ? (
        <ArrowsInLineVertical
          size={32}
          onClick={() => setProjectsOpenAndClose(false)}
        />
      ) : (
        <ArrowsOutLineVertical
          size={32}
          onClick={() => setProjectsOpenAndClose(true)}
        />
      )
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    const deleteProjectFromArray = projects.projectsUid?.filter(project => project.id !== projectId)

    setProjects((prevProjects) => ({
      ...prevProjects,
      projectsUid: deleteProjectFromArray
    }));

    await deleteProject(projectId)
  }

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
          Projetos que você criou
          {renderButtonsOpenAndCloseTable("myProjects")}
        </DashboardDivision>

        {loading && <LoadingGlobal>Carregando...</LoadingGlobal>}

        {projects.projectsUid && projects.projectsUid.map((project: any) => (
          <DashboardColumnMyProjects
            className={myProjectsOpenAndClose ? "flex" : "none"}
            key={project.id}
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
                  onClick={() => handleDeleteProject(project.id)}
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

        {projects.projectsUid && projects.projectsUid.length === 0 &&
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
        }

        <DashboardDivision>
          Projetos que você participa
          {renderButtonsOpenAndCloseTable("projects")}
        </DashboardDivision>

        {loading && <LoadingGlobal>Carregando...</LoadingGlobal>}

        {projects.projectsEmail && projects.projectsEmail.map((project: any) => (
          <DashboardColumnProjects
            className={projectsOpenAndClose ? "flex" : "none"}
            key={project.id}
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
        }

        {projects.projectsEmail && projects.projectsEmail.length === 0 &&
          <DashboardColumnProjects
            className={projectsOpenAndClose ? "flex" : "none"}
          >
            <DashboardNoProjects>
              <DashboardParagraphNoProjects>
                Você não participa de nenhum projeto
              </DashboardParagraphNoProjects>

              <Link to="/projects/create" className="btn">
                Criar projeto
              </Link>
            </DashboardNoProjects>
          </DashboardColumnProjects>
        }
      </DashboardContent >
    </DashboardContainer >
  );
};
