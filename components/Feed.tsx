"use client"
import { typedCollectionRef } from "@/lib/firebase-utils"
import { Message } from "@/types"
import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export const Feed = () => {

  const [isLoading, setIsLoading] = useState(true)

  function snap(){

    const messageColRef = typedCollectionRef<Message>("messages")

    return (
      onSnapshot(messageColRef, (snapshot)=>{
        snapshot.forEach((doc)=>{
          const docData = doc.data()
          console.log(docData.id, docData.data)
        })
      })
    )
  }

  useEffect(()=>{
    
    // const unsub = onSnapshot(collection(db, "messages"), (snapshot)=>{
    //   snapshot.forEach((doc)=>{
    //     console.log(doc.data())
    //   })
    // })

    const unsub = snap()

    setIsLoading(false)

    return () => {
      console.log("cleanup called...")
      unsub()
    }

  },[])

  if(isLoading) return <div>Loading...</div>

  return (
    <div>
      FEED
    </div>
  )
}