"use client"
import { typedCollectionRef } from "@/lib/firebase-utils"
import { Msg } from "@/types"
import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Message } from "@/components/Message"

export const LiveFeed = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Msg[]>([])

  function snap(){

    const messageColRef = typedCollectionRef<Msg>("messages")

    return (
      onSnapshot(messageColRef, (snapshot)=>{
        let messages: Msg[] = []
        snapshot.forEach((docSnap)=> {
          messages.push(docSnap.data())
        })
        setMessages(messages)
      })
    )
  }

  useEffect(()=>{

    const unsub = snap()
    window.addEventListener("beforeunload", unsub)

    setIsLoading(false)

    return () => {
      window.removeEventListener("beforeunload", unsub)
      unsub()
    }

  },[])

  if(isLoading) return <div>Loading...</div>

  return (
    <div>
      LIVE FEED....
    </div>
  )
}