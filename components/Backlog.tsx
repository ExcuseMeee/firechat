"use client"

import { useChatContext } from "./providers/chatProvider"

export const Backlog = () => {
  
  const {backlog, isBacklogLoading, getNextBatch} = useChatContext()

  if(isBacklogLoading) return <div>BACKLOG LOADING...</div>

  return (
    <div>
      {backlog.toReversed().map((message, i)=> (
        <div key={i}>
          {message.payload}
        </div>
      ))}
      <button onClick={getNextBatch}>NEXT</button>
    </div>
  )

}