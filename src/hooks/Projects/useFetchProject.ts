// React
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../services/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { Task } from "../../interfaces/Task";

// Redux
import { useDispatch } from "react-redux/es/exports";

// Redux Actions
import { changeProject } from "../../redux/project/actions";
import { Project } from "../../interfaces/Project";

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

interface UseFetchDocumentResult {
  project: FirestoreDocument | null;
  loading: boolean;
  error: string | null;
}

export const useFetchProject = (id?: string): UseFetchDocumentResult => {
  const dispatch = useDispatch();
  const [project, setProject] = useState<FirestoreDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    setError(null);

    const collectionRef = collection(db, "projects");

    try {
      const docRef = doc(collectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProject(docSnap.data() as FirestoreDocument);
        dispatch(changeProject(docSnap.data() as Project));
      } else {
        setError("Projeto não encontrado");
      }
    } catch (e) {
      setError("Ocorreu um erro ao buscar o projeto");
    } finally {
      setLoading(false);
    }
  };

  return { project, loading, error };
};
