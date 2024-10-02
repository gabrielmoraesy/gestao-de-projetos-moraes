// React
import { useReducer } from "react";

// Firebase
import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux/es/exports";

// Redux Actions
import { changeAllProjects } from "../../redux/projects/actions";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  members: string[];
  uid: string;
  createdByName: string | null;
  createdByEmail: string | null;
  tasks: object[];
}

interface InsertState {
  loading: boolean | null;
  error: string | null;
}

const initialState: InsertState = {
  loading: null,
  error: null,
};

type InsertAction =
  | { type: "LOADING" }
  | { type: "INSERTED_DOC" }
  | { type: "ERROR"; payload: string };

const insertReducer = (state: InsertState, action: InsertAction) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const useInsertProject = () => {
  const dispatchProjects = useDispatch();
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const insertProject = async (project: Project) => {
    dispatch({ type: "LOADING" });

    let q;
    const collectionRef = collection(db, "projects");

    try {
      const newProject = { ...project, createdAt: new Date() };

      const insertedProject = await addDoc(
        collection(db, "projects"),
        newProject
      );

      q = query(collectionRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      dispatchProjects(
        changeAllProjects(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

      dispatch({ type: "INSERTED_DOC" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: (error as Error).message });
    }
  };

  return { insertProject, response };
};

export default useInsertProject;
