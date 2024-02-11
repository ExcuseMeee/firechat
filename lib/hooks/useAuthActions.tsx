import { auth } from "@/firebaseConfig";
import {
  AuthError,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

export default function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    try {
      await auth.authStateReady();
      if (auth.currentUser?.isAnonymous) {
        console.log("[logout] anon user, deleting account");
        await deleteUser(auth.currentUser);
      }
      await signOut(auth);
      console.log("[logout] successful");
    } catch (error) {
      console.log("[logout] error ", error);
      throw new Error("Logout Failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      await auth.authStateReady();
      if (auth.currentUser) return;
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("[login] success");
    } catch (error) {
      console.log("[login] error occured", (error as AuthError).message);
      throw new Error("Login Failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(email: string, password: string, username: string) {
    setIsLoading(true);
    try {
      await auth.authStateReady();
      if (auth.currentUser) return;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("[signup] successful");
      await updateProfile(result.user, {
        displayName: username,
      });
    } catch (error) {
      console.log("[signup] error occured", (error as AuthError).message);
      throw new Error("Sign Up Failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function anonymousLogin(username: string) {
    setIsLoading(true);
    try {
      await auth.authStateReady();
      if (auth.currentUser) {
        console.log("[anonLogin] already logged in", auth.currentUser);
        return;
      }
      const result = await signInAnonymously(auth);
      console.log("[anonLogin] success");
      await updateProfile(result.user, {
        displayName: username,
      });
    } catch (error) {
      console.log("[anonLogin] error occured", (error as AuthError).message);
      throw new Error("Anonlogin failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, login, logout, signUp, anonymousLogin };
}
