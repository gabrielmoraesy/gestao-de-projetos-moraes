import ProjectActionTypes from "./action-types";

const initialState = {
  projectCurrent: {},
};

interface projectProps {
  type: string;
  payload: {};
}

const projectReducer = (state = initialState, action: projectProps) => {
  switch (action.type) {
    case ProjectActionTypes.changeProject:
      return { ...state, projectCurrent: action.payload };
  }

  return state;
};

export default projectReducer;
