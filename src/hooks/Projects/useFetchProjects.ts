// React
import { useState, useEffect, useCallback } from "react";

// Firebase
import { db } from "../../services/firebase";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";

interface DocumentType {
  id: string;
  data: { [key: string]: any };
}

interface IProjects {
  projectsAll?: DocumentType[]
  projectsSearch?: DocumentType[]
  projectsEmail?: DocumentType[]
  projectsUid?: DocumentType[]
}

export const useFetchProjects = (
  search?: string, uid?: string, email?: string
) => {
  const [projects, setProjects] = useState<IProjects>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);

    const collectionRef = collection(db, "projects");

    try {
      const queryProjectsAll = query(collectionRef, orderBy("createdAt", "desc"));

      const querySnapshotAll = await getDocs(queryProjectsAll);
      const projectsAll = querySnapshotAll.docs
        .map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

      setProjects((prevProjects) => ({
        ...prevProjects,
        projectsAll
      }));

      if (search) {
        const querySearch = query(collectionRef, orderBy("createdAt", "desc"));

        const querySnapshotSearch = await getDocs(querySearch);
        const projectsSearch = querySnapshotSearch.docs
          .filter((doc) =>
            doc.data().name.toLowerCase().includes(search.toLowerCase())
          )
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

        setProjects((prevProjects) => ({
          ...prevProjects,
          projectsSearch
        }));

        return;
      }

      if (uid && email) {
        const queryUid = query(collectionRef, where("uid", "==", uid));
        const queryEmail = query(collectionRef, where("members", "array-contains", email));

        const querySnapshotUid = await getDocs(queryUid);
        const querySnapshotEmail = await getDocs(queryEmail);

        const projectsEmailWithoutUserLogged = querySnapshotEmail.docs
          .filter((doc) => doc.data().createdByEmail !== email)
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

        const projectsUid = querySnapshotUid.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))

        setProjects((prevProjects) => ({
          ...prevProjects,
          projectsEmail: projectsEmailWithoutUserLogged,
          projectsUid
        }));

        return;
      }
    } catch (e) {
      setError("Ocorreu um erro ao buscar os projetos")
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, search, uid])

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, search, uid, email]);

  return { projects, setProjects, loading, error };
}
