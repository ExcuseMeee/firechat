import { auth } from "@/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuthListener() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[useAuthListener] ran");

    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("[useAuthListener > onauthchanged] yes user", authUser);
        setUser(authUser);
      } else {
        console.log("[useAuthListener > onauthchanged] no user");
        setUser(null);
      }
      setIsLoading(false);
    });
    window.addEventListener("beforeunload", unsub);

    return () => {
      console.log("[useAuthListener cleanup] ran");
      unsub();
      window.removeEventListener("beforeunload", unsub);
    };
  }, []);

  return { user, isLoading };
}
