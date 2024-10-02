// React
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../services/firebase";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux/es/exports";

// Redux Actions
import {
  changeAllProjects,
  changeSearchProjects,
  changeUidProjects,
  changeEmailProjects,
} from "../../redux/projects/actions";

interface DocumentType {
  id: string;
  data: { [key: string]: any };
}

export const useFetchProjects = (
  search?: string,
  uid?: string,
  email?: string
) => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [search, uid]);

  const fetchProjects = async () => {
    setLoading(true);

    const collectionRef = collection(db, "projects");

    try {
      let q;

      if (search) {
        q = query(collectionRef, orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(q);
        const filteredProjects = querySnapshot.docs
          .filter((doc) =>
            doc.data().name.toLowerCase().includes(search.toLowerCase())
          )
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

        setProjects(filteredProjects);
        dispatch(changeSearchProjects(filteredProjects));
      } else if (uid) {
        q = query(
          collectionRef,
          where("uid", "==", uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        setProjects(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        dispatch(
          changeUidProjects(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      } else if (email) {
        q = query(
          collectionRef,
          where("members", "array-contains", email),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const filteredProjects = querySnapshot.docs
          .filter((doc) => doc.data().createdByEmail !== email)
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
        setProjects(filteredProjects);
        dispatch(changeEmailProjects(filteredProjects));
      } else {
        q = query(collectionRef, orderBy("createdAt", "desc"));

        const querySnapshot = await getDocs(q);
        setProjects(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        dispatch(
          changeAllProjects(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return { projects, loading };
};
