import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import {
  AuthError,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
      console.log("[auth cleanup] ran");
      unsub();
      window.removeEventListener("beforeunload", unsub);
    };
  }, []);

  async function login(email: string, password: string) {
    if (isLoading) {
      console.log("[login] auth not ready");
      return;
    }
    if (user) {
      console.log("[login] user already exists");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("[login] success", result.user);
      setUser(result.user);
    } catch (error) {
      console.log("[login] error occured", (error as AuthError).message);
      throw new Error("Invalid Credentials");
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

  async function signUp(email: string, password: string, username: string) {
    if (isLoading) {
      console.log("[signup] auth not ready");
      return;
    }
    if (user) {
      console.log("[signup] user already exists");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("[signup] successful");
      setUser(result.user);
    } catch (error) {
      console.log("[signup] error occured", (error as AuthError).message);
      throw new Error("Sign Up Failed");
    }
  }

  // function attachAuthListener() {
  //   return onAuthStateChanged(auth, (authUser) => {
  //     console.log("[onauthstatechanged] ran");
  //     if (authUser) {
  //       console.log("[onauthstatechanged] yes user");
  //       setUser(authUser);
  //     } else {
  //       console.log("[onauthstatechanged] no user");
  //       setUser(null);
  //     }
  //     setIsLoading(false);
  //   });
  // }

  return {
    user,
    isLoading,
    login,
    logout,
    signUp,
  };
}
