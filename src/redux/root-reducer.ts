import { combineReducers } from "redux";

// Reducers
import projectReducer from "./project/reducer";
import projectsReducer from "./projects/reducer";

const rootReducer = combineReducers({ projectReducer, projectsReducer });

export default rootReducer;
