import { auth } from "@/firebaseConfig";
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export default function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    try {
      await auth.authStateReady();
      await signOut(auth);
      console.log("[logout] successful");
      setIsLoading(false);
    } catch (error) {
      console.log("[logout] error ", error);
      throw new Error("Logout Failed");
    }
  }

  async function login(email: string, password: string) {
    try {
      await auth.authStateReady();
      if (auth.currentUser) {
        console.log("[login] already logged in", auth.currentUser);
        return;
      }
      setIsLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("[login] success", result.user);
      setIsLoading(false);
    } catch (error) {
      console.log("[login] error occured", (error as AuthError).message);
      throw new Error("Invalid Credentials");
    }
  }

  async function signUp(email: string, password: string, username: string) {
    try {
      await auth.authStateReady();
      if (auth.currentUser) {
        console.log("[signup] already logged in");
        return;
      }
      setIsLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("[signup] successful");
      setIsLoading(false)
    } catch (error) {
      console.log("[signup] error occured", (error as AuthError).message);
      throw new Error("Sign Up Failed");
    }
  }

  return { isLoading, login, logout, signUp };
}
