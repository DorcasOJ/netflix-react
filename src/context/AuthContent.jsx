import { createContext, use, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  getAuth,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [emailExisting, setEmailExisting] = useState(false);
  const [done, setDone] = useState();
  const [error, setError] = useState("");

  // const usersRef = collection(db, "users");

  async function emailExist(email) {
    try {
      // setError(false);
      // await createUserWithEmailAndPassword(auth, email, "password1")
      let signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setEmailExisting(true);
      }
    } catch (err) {
      console.error(err);
      setError(error);
      setEmailExisting(false);
    }
  }

  async function signUp(email, password, fullName) {
    try {
      // setDone(false);

      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", email), {
        fullName: fullName,
        savedShows: [],
        watchedShows: [],
        cardDetails: [],
      });
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }

  async function logIn(email, password) {
    try {
      // setError(false);

      await signInWithEmailAndPassword(auth, email, password);

      // setEmailExisting(true);
    } catch (error) {
      setError(error);
      // setDone(true);
      console.error(error);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });
  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        user,
        emailExist,
        emailExisting,
        error,
        setError,
        done,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
