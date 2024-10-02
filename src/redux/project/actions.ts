import ProjectActionTypes from "./action-types";
import { Project } from "../../interfaces/Project";

export const changeProject = (payload: Project) => ({
  type: ProjectActionTypes.changeProject,
  payload,
});
