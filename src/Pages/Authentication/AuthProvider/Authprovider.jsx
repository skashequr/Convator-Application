import { useState, useEffect, createContext } from "react";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../../Firebase/firebase.config";

// context
export const AuthContext = createContext(null);
const auth = getAuth(app);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [load, setLoading] = useState(true);
  // --------------
  const createUser = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  };

  //----------------------- sign in (login)----------------------------------
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //------------------- signOut------------------
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  //  googlr login ----------
  // const googleSignIn = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, GoogleAuthProvider);
  // };
  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  // GitHub login ----------
  const signInWithGitHub = async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    } finally {
      setLoading(false);
    }
  };
  // ----profile update ----
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  //------------- user manage -----------------------
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user in the auth changed".currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubcribe();
  }, []);

  //------------------ data send child---------------------

  const authInfo = {
    user,
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    updateUserProfile,
    signInWithGitHub,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;