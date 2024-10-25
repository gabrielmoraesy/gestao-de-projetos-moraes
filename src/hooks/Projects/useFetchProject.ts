// React
import { useState, useEffect, useCallback } from "react";

// Firebase
import { db } from "../../services/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { Task } from "../../interfaces/Task";

interface FirestoreDocument {
  name: string;
  description: string;
  technologies: string[];
  members: string[];
  uid: string;
  createdByName: string;
  createdByEmail: string;
  tasks: Task[];
  createdAt: Date;
}

export const useFetchProject = (id?: string) => {
  const [project, setProject] = useState<FirestoreDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    setLoading(true);
    setError(null);

    const collectionRef = collection(db, "projects");

    try {
      const docRef = doc(collectionRef, id);
      const docSnap = await getDoc(docRef);

      setProject(docSnap.data() as FirestoreDocument);
    } catch (e) {
      setError("Ocorreu um erro ao buscar o projeto");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject, id]);

  return { project, setProject, loading, error };
};
