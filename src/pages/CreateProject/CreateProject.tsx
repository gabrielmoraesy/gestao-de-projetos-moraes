// Styled components
import {
  CreateProjectContainer,
  CreateProjectContent,
  CreateProjectParagraph,
  CreateProjectTitle,
  CreateProjectForm,
  CreateProjectLabel,
  CreateProjectSpan,
  CreateProjectInput,
  CreateProjectButton,
} from "./CreateProject.styles";

// React
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useUser } from "../../contexts/userContext";
import { useTheme } from "../../contexts/themeContext";

// Hooks
import useInsertProject from "../../hooks/Projects/useInsertProject";

// Interface
import { Task } from "../../interfaces/Task";

export const CreateProject = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { user } = useUser();
  const { insertProject } = useInsertProject();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [members, setMembers] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const [formError, setFormError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !technologies || !members) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    const membersArray = members
      .split(",")
      .map((member) => member.trim().toLowerCase());

    const technologiesArray = technologies
      .split(",")
      .map((member) => member.trim().toLowerCase());

    insertProject({
      name,
      description,
      technologies: technologiesArray,
      members: membersArray,
      uid: user!.uid,
      createdByName: user!.displayName,
      createdByEmail: user!.email,
      tasks,
    });

    setName("");
    setDescription("");
    setTechnologies("");
    setMembers("");

    navigate("/");
  };

  return (
    <CreateProjectContainer className={isDarkMode ? "darkMode" : ""}>
      <CreateProjectContent>
        <CreateProjectTitle>Criação do projeto</CreateProjectTitle>
        <CreateProjectParagraph>
          Crie seu projeto agora mesmo e tenha um controle maior de suas
          demandas
        </CreateProjectParagraph>

        <CreateProjectForm onSubmit={handleSubmit}>
          <CreateProjectLabel>
            <CreateProjectSpan>Nome do projeto:</CreateProjectSpan>
            <CreateProjectInput
              type="text"
              name="text"
              placeholder="Digite o nome do seu projeto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CreateProjectLabel>
          <CreateProjectLabel>
            <CreateProjectSpan>Descrição do projeto:</CreateProjectSpan>
            <CreateProjectInput
              type="text"
              name="description"
              placeholder="Descreva brevemente o seu projeto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </CreateProjectLabel>
          <CreateProjectLabel>
            <CreateProjectSpan>
              Tecnologias/Linguagens utilizadas:
            </CreateProjectSpan>
            <CreateProjectInput
              type="text"
              name="technologies"
              placeholder="Insira as tecnologias e linguagens que serão utilizadas no projeto"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </CreateProjectLabel>
          <CreateProjectLabel>
            <CreateProjectSpan>
              Coloque o nome dos integrantes:
            </CreateProjectSpan>
            <CreateProjectInput
              type="text"
              name="members"
              placeholder="Insira os email dos integrantes separados por vírgula | ex: gabriel@teste.com, daniel@teste.com"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
            />
          </CreateProjectLabel>

          {formError && (
            <CreateProjectParagraph
              className={isDarkMode ? "error black" : "error"}
            >
              {formError}
            </CreateProjectParagraph>
          )}
          <CreateProjectButton>Criar projeto</CreateProjectButton>
        </CreateProjectForm>
      </CreateProjectContent>
    </CreateProjectContainer>
  );
};
