// React
import { useState } from "react";

// Firebase
import { db } from "../../services/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

// Hooks
import { useFetchProjects } from "./useFetchProjects";

// Redux
import { useDispatch } from "react-redux/es/exports";

// Redux Actions
import { changeAllProjects } from "../../redux/projects/actions";

interface FirestoreDocument {
  name: string;
  description: string;
  technologies: string[];
  members: string[];
}

export const useUpdateProject = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const updateProject = async (uid: string, projectData: FirestoreDocument) => {
    setLoading(true);

    let q;
    const collectionRef = collection(db, "projects");

    try {
      const docRef = doc(db, "projects", uid);

      const updatedData = {
        name: projectData.name,
        description: projectData.description,
        technologies: projectData.technologies,
        members: projectData.members,
      };

      await updateDoc(docRef, updatedData);

      q = query(collectionRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      dispatch(
        changeAllProjects(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { updateProject, loading };
};
