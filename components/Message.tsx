"use client";

import { Msg } from "@/types";
import { useSoundContext } from "@/components/providers/soundProvider";

type MessageProps = {
  message: Msg;
};

export const Message = ({ message }: MessageProps) => {
  const { playSoundSequence } = useSoundContext();

  return (
    <div>
      Message: {message.payload}
      <button onClick={() => playSoundSequence(message.payload)}>Play</button>
    </div>
  );
};
