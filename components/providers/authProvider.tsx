"use client"

import { User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"


type AuthContextType = {}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}){

  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    import("@/firebaseConfig").then((mod) => {
      const auth = mod.auth
      console.log("HIIII")
    })
  }, [])


  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(){
  const context = useContext(AuthContext)
  if(!context){
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}