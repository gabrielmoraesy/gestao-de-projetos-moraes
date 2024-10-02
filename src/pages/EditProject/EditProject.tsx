// Styled components
import {
  EditProjectContainer,
  EditProjectContent,
  EditProjectParagraph,
  EditProjectTitle,
  EditProjectForm,
  EditProjectLabel,
  EditProjectSpan,
  EditProjectInput,
  EditProjectButton,
} from "./EditProject.styles";

// React
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Hooks
import { useFetchProject } from "../../hooks/Projects/useFetchProject";
import { useUpdateProject } from "../../hooks/Projects/useUpdateProject";

// Redux
import { useSelector } from "react-redux/es/hooks/useSelector";

// Context
import { useTheme } from "../../contexts/themeContext";

// Icons
import { ArrowBendUpLeft } from "phosphor-react";

interface RootState {
  projectReducer: any;
}

export const EditProject = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const { id } = useParams();

  const { project, loading } = useFetchProject(id);

  const { updateProject, loading: loadingUpdate } = useUpdateProject();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [members, setMembers] = useState("");

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (project) {
      setName(project!.name);
      setDescription(project!.description);

      setTechnologies(project!.technologies.join(", "));
      setMembers(project!.members.join(", "));
    }
  }, [project]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !technologies || !members) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    const technologiesArray = technologies
      .split(",")
      .map((member) => member.trim().toLowerCase());

    const membersArray = members
      .split(",")
      .map((member) => member.trim().toLowerCase());

    if (id) {
      updateProject(id, {
        name,
        description,
        technologies: technologiesArray,
        members: membersArray,
      });
    }

    setName("");
    setDescription("");
    setTechnologies("");
    setMembers("");

    navigate(`/dashboard`);
  };

  const { projectCurrent } = useSelector(
    (rootReducer: RootState) => rootReducer.projectReducer
  );

  return (
    <EditProjectContainer className={isDarkMode ? "darkMode" : ""}>
      <EditProjectContent>
        <Link to="/dashboard">
          <ArrowBendUpLeft size={32} />
        </Link>
        <EditProjectTitle>Edição do projeto</EditProjectTitle>
        <EditProjectParagraph>
          Edite seu projeto agora mesmo e altere o que precisar
        </EditProjectParagraph>

        {!loading && (
          <EditProjectForm onSubmit={handleSubmit}>
            <EditProjectLabel>
              <EditProjectSpan>Nome do projeto:</EditProjectSpan>
              <EditProjectInput
                type="text"
                name="text"
                placeholder="Digite o nome do seu projeto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </EditProjectLabel>
            <EditProjectLabel>
              <EditProjectSpan>Descrição do projeto:</EditProjectSpan>
              <EditProjectInput
                type="text"
                name="description"
                placeholder="Descreva brevemente o seu projeto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </EditProjectLabel>
            <EditProjectLabel>
              <EditProjectSpan>
                Tecnologias/Linguagens utilizadas:
              </EditProjectSpan>
              <EditProjectInput
                type="text"
                name="technologies"
                placeholder="Insira as tecnologias e linguagens que serão utilizadas no projeto"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
              />
            </EditProjectLabel>
            <EditProjectLabel>
              <EditProjectSpan>Coloque o nome dos integrantes:</EditProjectSpan>
              <EditProjectInput
                type="text"
                name="members"
                placeholder="Insira os email dos integrantes separados por vírgula | ex: gabriel@teste.com, daniel@teste.com"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
              />
            </EditProjectLabel>
            {formError && (
              <EditProjectParagraph
                className={isDarkMode ? "error black" : "error"}
              >
                {formError}
              </EditProjectParagraph>
            )}
            <EditProjectButton>Editar</EditProjectButton>
          </EditProjectForm>
        )}
      </EditProjectContent>
    </EditProjectContainer>
  );
};
