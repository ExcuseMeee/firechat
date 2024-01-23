"use client";
import { auth } from "@/firebaseConfig";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

type AuthContextType = {
  user: MutableRefObject<User | null>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useRef<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      console.log("[onAuthStateChanged] ran");
      if (authUser) {
        console.log("[onAuthStateChanged] user exists");
        user.current = authUser;
      } else {
        console.log("[onAuthStateChanged] no user");
        user.current = null;
      }
    });
    window.addEventListener("beforeunload", unsub);

    return () => {
      console.log("[cleanup] ran");
      unsub();
      window.removeEventListener("beforeunload", unsub);
    };
  }, []);

  async function login() {
    if (!auth) {
      console.log("[login] no auth instance available");
      return;
    }
    if (user.current) {
      console.log("[login] user already signed in");
      return;
    }
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("[login] success", result.user);
    } catch (error) {
      console.log("[login] error occured", error);
    }
  }

  async function logout() {
    if (!auth) {
      console.log("[logout] no auth instance available");
      return;
    }
    try {
      await signOut(auth);
      console.log("[logout] successful");
    } catch (error) {
      console.log("[logout] error ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
