import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function useFireAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      console.log("[onauthstatechanged] ran");
      if (authUser) {
        console.log("[onauthstatechanged] yes user");
        setUser(authUser);
      } else {
        console.log("[onauthstatechanged] no user");
        setUser(null);
      }
      setIsLoading(false);
    });
    window.addEventListener("beforeunload", unsub);

    return () => {
      console.log("[cleanup] ran");
      unsub();
      window.removeEventListener("beforeunload", unsub);
    };
  }, []);

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
  };
}
