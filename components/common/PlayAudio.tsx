"use client";
import useSound from "@/lib/hooks/useSound";
import { useSoundContext } from "../providers/soundProvider";
import { Button, ButtonProps } from "../ui/button";
import { Loader2, Play, StopCircle } from "lucide-react";

type PlayAudioProps = {
  sounds: string[];
} & ButtonProps;

export const PlayAudio = ({ sounds, ...rest }: PlayAudioProps) => {
  const { audioCtxRef, savedBuffers } = useSoundContext();
  const { playSounds, isBuffering, isPlaying, stopSounds } = useSound(
    audioCtxRef,
    savedBuffers
  );

  return (
    <Button
      {...rest}
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        if (isBuffering) return;
        else if (isPlaying) stopSounds();
        else playSounds(sounds);
      }}
    >
      {isBuffering ? (
        <Loader2 className="animate-spin" />
      ) : isPlaying ? (
        <StopCircle />
      ) : (
        <Play />
      )}
    </Button>
  );
};
