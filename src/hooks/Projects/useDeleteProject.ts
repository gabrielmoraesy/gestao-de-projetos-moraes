// React
import { useState } from "react";

// Firebase
import { db } from "../../services/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";

// Redux Actions
import {
  changeAllProjects,
  changeSearchProjects,
  changeEmailProjects,
  changeUidProjects,
} from "../../redux/projects/actions";

export const useDeleteProject = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const {
  //   projectsAllCurrent,
  //   projectsSearchCurrent,
  //   projectsUidProjects,
  //   projectsEmailProjects,
  // } = useSelector((rootReducer: RootState) => rootReducer.projectsReducer);

  const deleteProject = async (id: string) => {
    setLoading(true);

    let q;
    const collectionRef = collection(db, "projects");

    try {
      await deleteDoc(doc(db, "projects", id));

      q = query(collectionRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      const projects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      dispatch(changeAllProjects(projects));

      // dispatch(changeSearchProjects(projects));
      // dispatch(changeEmailProjects(projects));
      // dispatch(changeUidProjects(projects));

      // const projectsAll = projectsAllCurrent.filter(
      //   (project: any) => project.id !== id
      // );
      // dispatch(changeAllProjects(projectsAll));

      // const projectsSearch = projectsSearchCurrent.filter(
      //   (project: any) => project.id !== id
      // );
      // dispatch(changeSearchProjects(projectsSearch));

      // const projectsUid = projectsUidProjects.filter(
      //   (project: any) => project.id !== id
      // );
      // dispatch(changeEmailProjects(projectsUid));

      // const projectsEmail = projectsEmailProjects.filter(
      //   (project: any) => project.id !== id
      // );
      // dispatch(changeUidProjects(projectsEmail));

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return { deleteProject, loading };
};
