"use client";

import { useSoundContext } from "@/components/providers/soundProvider";
import { getFileName } from "@/lib/sounds";
import { Button } from "./ui/button";
import { AudioLines } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

type AudioBaseProps = {
  src: string;
  index?: number;
  isInputSequence?: boolean;
};

export const AudioBase = ({
  src,
  index,
  isInputSequence = false,
}: AudioBaseProps) => {
  const audioName = getFileName(src);

  const { playSound, inputSequence, setInputSequence } = useSoundContext();

  function addSoundToSequence(src: string) {
    const sequence = [...inputSequence, src];
    console.log("[addSoundToSequence] setting new sequence ", sequence);
    setInputSequence(sequence);
  }

  function removeSoundFromSequence(idx: number | undefined) {
    if (!idx) return;
    const sequence = inputSequence.filter((src, i) => idx !== i);
    console.log("[removeSound] setting new sequence ", sequence);
    setInputSequence(sequence);
  }

  function handleClick() {
    if (isInputSequence) return;
    playSound(src);
    addSoundToSequence(src);
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button onClick={handleClick} variant={"outline"} size={"icon"}>
          <AudioLines className="" />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{audioName}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => playSound(src)}>
          Preview Sound
        </ContextMenuItem>
        {isInputSequence ? (
          <ContextMenuItem onClick={() => removeSoundFromSequence(index)}>
            Remove Sound
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={() => addSoundToSequence(src)}>
            Add Sound
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
