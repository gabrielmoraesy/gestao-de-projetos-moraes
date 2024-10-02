import ProjectsActionTypes from "./action-types";

const initialState = {
  projectsAllCurrent: {},
  projectsSearchCurrent: {},
  projectsUidProjects: {},
  projectsEmailProjects: {},
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProjectsActionTypes.changeAllProjects:
      return { ...state, projectsAllCurrent: action.payload };
    case ProjectsActionTypes.changeSearchProjects:
      return { ...state, projectsSearchCurrent: action.payload };
    case ProjectsActionTypes.changeUidProjects:
      return { ...state, projectsUidProjects: action.payload };
    case ProjectsActionTypes.changeEmailProjects:
      return { ...state, projectsEmailProjects: action.payload };
  }

  return state;
};

export default projectsReducer;
