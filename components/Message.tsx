"use client";

import { Msg } from "@/types";
import { useSoundContext } from "@/components/providers/soundProvider";
import { AudioBase } from "./AudioBase";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

type MessageProps = {
  message: Msg;
};

export const Message = ({ message }: MessageProps) => {
  const { playSoundSequence } = useSoundContext();

  return (
    <div className="border border-white flex">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => playSoundSequence(message.payload)}
      >
        <Play />
      </Button>
      {message.payload.map((src, i) => (
        <AudioBase key={i} src={src} type={"message"} />
      ))}
    </div>
  );
};
