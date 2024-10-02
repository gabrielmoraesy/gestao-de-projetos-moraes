// React
import { useState, useEffect } from "react";

// Auth
import { auth } from "../services/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuthenticated) => {
      setUser(userAuthenticated);
    });
  }, [auth]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    signInWithGoogle,
    signOutWithGoogle,
  };
};
