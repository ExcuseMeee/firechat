"use client";

import useFireAuth from "@/lib/hooks/useFireAuth";

export const SignIn = () => {

  const {isLoading, user, login, logout} = useFireAuth()

  if(isLoading) return <div>HOOK LOADING....</div>

  return (
    <div>
      <button onClick={() => login()}>LOGIN</button>
      <button onClick={() => logout()}>LOGOUT</button>
      USER: {user ? user.displayName : "No User"}
    </div>
  );
};
