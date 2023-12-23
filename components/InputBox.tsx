"use client"

import { typedCollectionRef } from "@/lib/firebase-utils"
import { Button } from "./ui/button"
import { Msg } from "@/types"
import { Input } from "./ui/input"
import { useState } from "react"
import { addDoc } from "firebase/firestore"

export const InputBox = () => {

  const [thing, setThing] = useState("")

  async function addMessage(){
    const messagesCollection = typedCollectionRef<Msg>("messages")
    await addDoc(messagesCollection, {
      senderId: "fakeid",
      payload: thing,
      timestamp: new Date().getTime()
    })
    console.log("message added")
  }

  return (
    <div>
      <Input onChange={(e)=> setThing(e.target.value)} value={thing} />
      <Button onClick={addMessage}>Add</Button>
    </div>
  )
}