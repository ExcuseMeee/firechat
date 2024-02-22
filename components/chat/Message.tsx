"use client";

import { Msg } from "@/types";
import { useSoundContext } from "@/components/providers/soundProvider";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AudioIcon } from "@/components/common/AudioIcon";

type MessageProps = {
  message: Msg;
};

export const Message = ({ message }: MessageProps) => {
  const { playSoundSequence } = useSoundContext();

  return (
    <Card className="w-fit">
      <CardHeader className="py-0">
        <CardDescription>Sender</CardDescription>
      </CardHeader>
      <CardContent className="py-1 flex items-center space-x-3">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => playSoundSequence(message.payload)}
        >
          <Play />
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
