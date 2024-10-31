// React
import { useState } from "react";

// Firebase
import {
  addDoc,
  collection
} from "firebase/firestore";
import { db } from "../../services/firebase";

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
    try {
      setLoading(true)
      const newProject = { ...project, createdAt: new Date() };

      await addDoc(
        collection(db, "projects"),
        newProject
      );
    } catch (error) {
      setError("Ocorreu um erro ao criar projeto.")
    } finally {
      setLoading(false)
    }
  };

  return { insertProject, loading, error };
};

export default useInsertProject;
