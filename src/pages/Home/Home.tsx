// Styled components
import {
  HomeContainer,
  HomeContent,
  HomeInputSearch,
  HomeSearch,
  HomeTitle,
  HomeProjects,
  HomeProject,
  HomeProjectTitle,
  HomeParagraph,
  HomeLink,
  HomeNoProjects,
} from "./Home.styles";

// React
import { useState } from "react";

// Context
import { useTheme } from "../../contexts/themeContext";

// Hooks
import { useFetchProjects } from "../../hooks/Projects/useFetchProjects";

// Redux
import { useSelector } from "react-redux/es/hooks/useSelector";

interface RootState {
  projectsReducer: any;
}

export const Home = () => {
  const { isDarkMode } = useTheme();
  const [searchTitle, setSearchTitle] = useState("");

  const { loading } = useFetchProjects(searchTitle, undefined);

  const { projectsAllCurrent } = useSelector(
    (rootReducer: RootState) => rootReducer.projectsReducer
  );

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

        {!loading ? (
          <>
            {projectsAllCurrent.length >= 1 ? (
              <>
                <HomeProjects>
                  {projectsAllCurrent.map((project: any) => (
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
                </HomeProjects>
              </>
            ) : (
              <HomeNoProjects>
                <HomeParagraph>Não existem projetos em exibição.</HomeParagraph>
              </HomeNoProjects>
            )}
          </>
        ) : (
          ""
        )}
      </HomeContent>
    </HomeContainer>
  );
};
