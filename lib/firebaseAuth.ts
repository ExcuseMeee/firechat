import { auth } from "@/firebaseConfig";
import { Profile } from "@/types";
import { deleteDoc, setDoc } from "firebase/firestore";
import { typedDocumentRef } from "./firebase-utils";
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export async function logout() {
  try {
    await auth.authStateReady();
    if (auth.currentUser?.isAnonymous) {
      console.log("[logout] anon user, deleting account");
      await deleteAccount();
    } else {
      await signOut(auth);
    }
    console.log("[logout] successful");
  } catch (error) {
    console.log("[logout] error ", error);
    throw new Error("Logout Failed");
  }
}

export async function login(email: string, password: string) {
  try {
    await auth.authStateReady();
    if (auth.currentUser) return;
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("[login] success");
  } catch (error) {
    console.log("[login] error occured", error);
    throw new Error("Login Failed");
  }
}

export async function signUp(
  email: string,
  password: string,
  username: string
) {
  try {
    await auth.authStateReady();
    if (auth.currentUser) return;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("[signup] successful");
    await updateProfile(result.user, {
      displayName: username,
    });
    // create profile document in firestore
    await setDoc(typedDocumentRef<Profile>("profiles", result.user.uid), {
      username: username,
      isAnon: false,
    });
  } catch (error) {
    console.log("[signup] error occured", error);
    throw new Error("Sign Up Failed");
  }
}

export async function anonymousLogin(username: string) {
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
    // create profile document in firestore
    await setDoc(typedDocumentRef<Profile>("profiles", result.user.uid), {
      username: username,
      isAnon: true,
    });
  } catch (error) {
    console.log("[anonLogin] error occured", error);
    throw new Error("Anonlogin failed");
  }
}

/** delete and sign out current user account */
export async function deleteAccount() {
  try {
    await auth.authStateReady();
    if (!auth.currentUser) return;

    console.log("[deleteAccount] deleting profile doc...");
    await deleteDoc(
      typedDocumentRef<Profile>("profiles", auth.currentUser.uid)
    );
    await deleteUser(auth.currentUser);
  } catch (error) {
    console.log("[deleteAccount] error occured", error);
    throw new Error("deleteAccount failed");
  }
}
