// React
import { useState } from "react";

// Firebase
import { db } from "../../services/firebase";
import {
  collection,
  addDoc
} from "firebase/firestore";

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

const useInsertProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertProject = async (project: Project) => {
    // let q;
    // const collectionRef = collection(db, "projects");

    try {
      setLoading(true)
      const newProject = { ...project, createdAt: new Date() };

      await addDoc(
        collection(db, "projects"),
        newProject
      );

      // q = query(collectionRef, orderBy("createdAt", "desc"));

      // const querySnapshot = await getDocs(q);
      // dispatchProjects(
      //   changeAllProjects(
      //     querySnapshot.docs.map((doc) => ({
      //       id: doc.id,
      //       data: doc.data(),
      //     }))
      //   )
      // );
    } catch (error) {
      setError("Ocorreu um erro ao criar projeto.")
    } finally {
      setLoading(false)
    }
  };

  return { insertProject, loading, error };
};

export default useInsertProject;
