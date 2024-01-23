"use client";

import { useAuthContext } from "./providers/authProvider";

export const SignIn = () => {
  const { user, login, logout } = useAuthContext();

  return (
    <div>
      <button onClick={() => login()}>LOGIN</button>
      <button onClick={() => logout()}>LOGOUT</button>
    </div>
  );
};
