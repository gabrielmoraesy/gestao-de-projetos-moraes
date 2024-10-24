// React
import { useState } from "react";

// Firebase
import { db } from "../../services/firebase";
import { doc, deleteDoc } from "firebase/firestore";
// import { collection, query, orderBy, getDocs } from "firebase/firestore";

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProject = async (id: string) => {
    // let q;
    // const collectionRef = collection(db, "projects");

    try {
      setLoading(true);
      await deleteDoc(doc(db, "projects", id));

      // q = query(collectionRef, orderBy("createdAt", "desc"));

      // const querySnapshot = await getDocs(q);
      // const projects = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   data: doc.data(),
      // }));
    } catch (e) {
      setError("Ocorreu um erro ao deletar o projeto.")
    } finally {
      setLoading(false);

    }
  };

  return { deleteProject, loading, error };
};
