// Styled components
import {
  AboutContainer,
  AboutContent,
  AboutTitle,
  AboutSubTitle,
  AboutParagraph,
} from "./About.styles";

// Context
import { useTheme } from "../../contexts/themeContext";

export const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <AboutContainer className={isDarkMode ? "darkMode" : ""}>
      <AboutContent>
        <AboutTitle>
          Gestão de projetos - Desenvolvido por Gabriel Moraes Pires
        </AboutTitle>
        <AboutSubTitle>
          Tecnologias: Html, Css, JavaScript, TypeScript, React, Styled
          Componentes e Firebase para autenticação pelas contas do Google e
          DataBase.
        </AboutSubTitle>
        <AboutParagraph>
          Neste projeto teremos diversas funcionalidades como: O usuário irá se
          cadastrar na nossa plataforma, podendo navegar por projetos que estão
          criados por outros usuários ou criar o seu próprio projeto, caso ele
          escolha criar um projeto novo, deverá preencher algumas informações do
          projeto como: Nome, Descrição, Tecnologias e Integrantes. Dentro do
          projeto terá a opção de criar tarefas e atribui-las aos membros do
          projeto. Será feito um CRUD.
        </AboutParagraph>
      </AboutContent>
    </AboutContainer>
  );
};
