"use client";

import { Msg } from "@/types";
import { useSoundContext } from "@/components/providers/soundProvider";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AudioIcon } from "@/components/common/AudioIcon";
import useSound from "@/lib/hooks/useSound";

type MessageProps = {
  message: Msg;
};

export const Message = ({ message }: MessageProps) => {
  // const { playSoundSequence } = useSoundContext();
  const { audioCtxRef, savedBuffers } = useSoundContext();
  const { playSounds, isBuffering } = useSound(audioCtxRef.current, savedBuffers.current);

  return (
    <Card className="w-fit">
      <CardHeader className="py-0">
        <CardDescription>Sender</CardDescription>
      </CardHeader>
      <CardContent className="py-1 flex items-center space-x-3">
        <Button
          variant={"ghost"}
          size={"icon"}
          // onClick={() => playSoundSequence(message.payload)}
          onClick={() => playSounds(message.payload)}
        >
          {isBuffering ? <Loader2 className="animate-spin" /> : <Play />}
        </Button>
        <Separator orientation={"vertical"} className="h-10" />
        <div className="flex">
          {message.payload.map((src, i) => (
            <AudioIcon key={i} src={src} type={"message"} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
