"use client"

import { typedCollectionRef } from "@/lib/firebase-utils"
import { Msg } from "@/types"
import { DocumentData, QueryDocumentSnapshot, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"
import { useEffect, useState } from "react"

export const Backlog = () => {

  const [isLoaded, setIsLoaded] = useState(false)

  const messagesCollection = typedCollectionRef<Msg>("messages")

  const [backlog, setBacklog] = useState<Msg[]>([])
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<Msg, DocumentData>>()

  async function getInitialBatch(){
    const q = query(messagesCollection, orderBy("timestamp", "desc"), limit(5))
    const initialSnapshot = await getDocs(q)
    setLastVisible(initialSnapshot.docs[initialSnapshot.docs.length - 1])
    
    const initialBatch = initialSnapshot.docs.map((doc)=> doc.data())
    setBacklog(initialBatch)

  }

  async function getNextBatch(){
    const q = query(messagesCollection, orderBy("timestamp", "desc"), limit(5), startAfter(lastVisible))
    const nextSnapshot = await getDocs(q)
    setLastVisible(nextSnapshot.docs[nextSnapshot.docs.length - 1])

    const nextBatch = nextSnapshot.docs.map((doc)=> doc.data())
    setBacklog((prevBatch)=> [...prevBatch, ...nextBatch])
  }

  useEffect(()=>{
    getInitialBatch()
    setIsLoaded(true)
  }, [])

  useEffect(()=>{
    console.log("current backlog...", backlog)
  }, [backlog])

  if(!isLoaded) return <div>Loading backlog...</div>

  return (
    <div>
      BACKLOG...
      {backlog.toReversed().map((message, i)=>(
        <div key={i}>
          {message.payload}
        </div>
      ))}
      <button onClick={getNextBatch}>Next</button>
    </div>
  )
}