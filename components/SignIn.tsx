"use client";
import { auth } from "@/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const SignIn = () => {
  async function signIn() {
    if (auth.currentUser) {
      console.log("[signIn] user already signed in", auth.currentUser);
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("[signIn] ", result.user);
    } catch (error) {
      console.log("[signIn] ", error);
    }
  }

  async function logout() {
    if(!auth.currentUser){
      console.log("[logout] no user signed in")
      // return
    }
    try {
      await signOut(auth);
      console.log("[logout] successful");
    } catch (error) {
      console.log("[logout] ", error);
    }
  }

  return (
    <div>
      <button onClick={signIn}>Google Sign in</button>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};
