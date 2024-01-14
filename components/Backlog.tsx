"use client"

import { Message } from "@/components/Message"
import { useChatContext } from "@/components/providers/chatProvider"

export const Backlog = () => {
  
  const {backlog, isBacklogLoading, getNextBatch} = useChatContext()

  if(isBacklogLoading) return <div>BACKLOG LOADING...</div>

  return (
    <div>
      {backlog.toReversed().map((message, i)=> (
        <Message key={i} message={message} />
      ))}
      <button onClick={getNextBatch}>NEXT</button>
    </div>
  )

}