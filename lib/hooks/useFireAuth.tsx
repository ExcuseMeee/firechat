import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function useFireAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth
      .authStateReady()
      .then(() => {
        if (auth.currentUser) {
          console.log("yes user");
          setUser(auth.currentUser);
        } else {
          console.log("no user");
          setUser(null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      console.log("[cleanup] ran");
    };
  }, []);

  async function updateUser(){
    await auth.authStateReady()
    if(auth.currentUser){
      console.log("[updateUser] yes user")
      setUser(auth.currentUser)
    }else{
      console.log("[updateUser] no user")
      setUser(null)
    }
  }

  async function login() {
    if (isLoading) {
      console.log("[login] auth not ready");
      return;
    }
    if (user) {
      console.log("[login] user already exists");
      return;
    }
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("[login] success", result.user);
      setUser(result.user);
    } catch (error) {
      console.log("[login] error occured", error);
    }
  }

  async function logout() {
    if (isLoading) {
      console.log("[logout] auth not ready");
      return;
    }
    try {
      await signOut(auth);
      console.log("[logout] successful");
      setUser(null);
    } catch (error) {
      console.log("[logout] error ", error);
    }
  }

  return {
    user,
    isLoading,
    login,
    logout,
    updateUser,
  };
}
