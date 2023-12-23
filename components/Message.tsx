"use client"

import { Msg } from "@/types"

type MessageProps = {
  message: Msg
}

export const Message = ({message}: MessageProps) => {
  return (
    <div>Message</div>
  )
}