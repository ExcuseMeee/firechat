"use client"
import { Message } from "@/components/Message"
import { useChatContext } from "@/components/providers/chatProvider"

type LiveMessagesProps = {
  
}

export const LiveMessages = () => {
  
  const {feed, isFeedLoading} = useChatContext()

  if(isFeedLoading) return <div>FEED LOADING...</div>

  return (
    <div>
      LIVE FEED....
      {feed.map((message, i)=>(
        <Message key={i} message={message} />
      ))}
    </div>
  )

}