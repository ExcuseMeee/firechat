"use client"
import { useChatContext } from "./providers/chatProvider"

export const LiveFeed = () => {
  
  const {feed, isFeedLoading} = useChatContext()

  if(isFeedLoading) return <div>FEED LOADING...</div>

  return (
    <div>
      LIVE FEED....
      {feed.map((message, i)=>(
        <div key={i}>
          {message.payload}
        </div>
      ))}
    </div>
  )

}