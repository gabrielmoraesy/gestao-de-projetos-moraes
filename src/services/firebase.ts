import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9e5TZIjg4Phb97YqLqmsCkIuzyolg0oI",
  authDomain: "gestao-de-projetos-morae-36ee9.firebaseapp.com",
  databaseURL: "https://gestao-de-projetos-morae-36ee9-default-rtdb.firebaseio.com",
  projectId: "gestao-de-projetos-morae-36ee9",
  storageBucket: "gestao-de-projetos-morae-36ee9.appspot.com",
  messagingSenderId: "580242258754",
  appId: "1:580242258754:web:d9481c746875eff19fa6db"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
