// React
import { useState } from "react";

// Firebase
import { db } from "../../services/firebase";
import { updateDoc, doc } from "firebase/firestore";
// import { collection, query, orderBy, getDocs } from "firebase/firestore";

interface FirestoreDocument {
  name: string;
  description: string;
  technologies: string[];
  members: string[];
}

export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (uid: string, projectData: FirestoreDocument) => {
    // let q;
    // const collectionRef = collection(db, "projects");

    try {
      setLoading(true);

      const docRef = doc(db, "projects", uid);

      const updatedData = {
        name: projectData.name,
        description: projectData.description,
        technologies: projectData.technologies,
        members: projectData.members,
      };

      await updateDoc(docRef, updatedData);

      // q = query(collectionRef, orderBy("createdAt", "desc"));

      // const querySnapshot = await getDocs(q);
      // dispatch(
      //   changeAllProjects(
      //     querySnapshot.docs.map((doc) => ({
      //       id: doc.id,
      //       data: doc.data(),
      //     }))
      //   )
      // );
    } catch (error) {
      setError("Ocorreu um erro ao editar este projeto.")
    } finally {
      setLoading(false);
    }
  };

  return { updateProject, loading, error };
};
