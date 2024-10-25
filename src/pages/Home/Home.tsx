// Styled components
import {
  HomeContainer,
  HomeContent,
  HomeInputSearch,
  HomeSearch,
  LoadingGlobal,
  HomeTitle,
  HomeProjects,
  HomeProject,
  HomeProjectTitle,
  HomeParagraph,
  HomeLink,
  HomeNoProjects,
} from "./Home.styles";

// React
import { Fragment, useState } from "react";

// Context
import { useTheme } from "../../contexts/themeContext";

// Hooks
import { useFetchProjects } from "../../hooks/Projects/useFetchProjects";

export const Home = () => {
  const { isDarkMode } = useTheme();
  const [searchTitle, setSearchTitle] = useState("");

  const { projects, loading } = useFetchProjects(searchTitle);

  return (
    <HomeContainer className={isDarkMode ? "darkMode" : ""}>
      <HomeContent>
        <HomeSearch>
          <HomeTitle>Projetos</HomeTitle>
          <HomeInputSearch
            placeholder="Busque pelo nome do projeto..."
            onChange={(e) => setSearchTitle(e.target.value)}
            value={searchTitle}
          />
        </HomeSearch>

        {loading && <LoadingGlobal>Carregando...</LoadingGlobal>}

        {projects && !loading &&
          <HomeProjects>
            {projects.projectsSearch ? projects.projectsSearch!.map((project: any) => (
              <HomeProject
                className={isDarkMode ? "cardDark" : "cardLight"}
                key={project.id}
              >
                <HomeProjectTitle>{project.data.name}</HomeProjectTitle>
                <HomeParagraph>{project.data.description}</HomeParagraph>
                <HomeParagraph>
                  Tecnologias: {project.data.technologies.join(", ")}
                </HomeParagraph>

                <HomeLink to={`/projects/${project.id}`}>
                  Ver mais
                </HomeLink>
              </HomeProject>
            )) :
              <Fragment>
                {projects.projectsAll && projects.projectsAll!.map((project: any) => (
                  <HomeProject
                    className={isDarkMode ? "cardDark" : "cardLight"}
                    key={project.id}
                  >
                    <HomeProjectTitle>{project.data.name}</HomeProjectTitle>
                    <HomeParagraph>{project.data.description}</HomeParagraph>
                    <HomeParagraph>
                      Tecnologias: {project.data.technologies.join(", ")}
                    </HomeParagraph>

                    <HomeLink to={`/projects/${project.id}`}>
                      Ver mais
                    </HomeLink>
                  </HomeProject>
                ))}
              </Fragment>}
          </HomeProjects>
        }

        {!projects && !loading &&
          <HomeNoProjects>
            <HomeParagraph>Não existem projetos em exibição.</HomeParagraph>
          </HomeNoProjects>
        }
      </HomeContent>
    </HomeContainer >
  );
};
