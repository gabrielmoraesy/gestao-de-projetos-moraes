import ProjectsActionTypes from "./action-types";
import { Project } from "../../interfaces/Project";

// interface ProjectsProps {
//   payload: Project[];
// }

export const changeAllProjects = (payload) => ({
  type: ProjectsActionTypes.changeAllProjects,
  payload,
});

export const changeSearchProjects = (payload) => ({
  type: ProjectsActionTypes.changeSearchProjects,
  payload,
});

export const changeUidProjects = (payload) => ({
  type: ProjectsActionTypes.changeUidProjects,
  payload,
});

export const changeEmailProjects = (payload) => ({
  type: ProjectsActionTypes.changeEmailProjects,
  payload,
});
