"use client";

// import { useAuthContext } from "./providers/authProvider";

import { auth } from "@/firebaseConfig";
import { useEffect, useState } from "react";

export const SignIn = () => {
  // const { user, login, logout } = useAuthContext();

  const [t, setT] = useState(auth.currentUser)

  useEffect(()=>{
    setT(auth.currentUser)
  }, [])

  return (
    <div>
      {/* <button onClick={() => login()}>LOGIN</button>
      <button onClick={() => logout()}>LOGOUT</button> */}
      USER:
      {auth.currentUser?.displayName}
      <br />
      <button onClick={()=> console.log("clicked")}>BTN</button>
    </div>
  );
};
