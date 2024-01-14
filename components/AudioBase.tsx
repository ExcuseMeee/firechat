"use client";

import { useSoundContext } from "@/components/providers/soundProvider";
import { getFileName } from "@/lib/sounds";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { ImageWithFallback } from "@/components/ImageWithFallback";

type AudioBaseProps = {
  src: string;
  type: "selection" | "input" | "message";
  index?: number;
};

export const AudioBase = ({ src, index, type }: AudioBaseProps) => {
  const audioName = getFileName(src);

  const { playSound, inputSequence, setInputSequence } = useSoundContext();

  function addSoundToSequence(src: string) {
    if (type !== "selection") return;
    const sequence = [...inputSequence, src];
    console.log("[addSoundToSequence] setting new sequence ", sequence);
    setInputSequence(sequence);
  }

  function removeSoundFromSequence(idx: number | undefined) {
    if (idx === undefined || type !== "input") return;
    const sequence = inputSequence.filter((src, i) => idx !== i);
    console.log("[removeSound] setting new sequence ", sequence);
    setInputSequence(sequence);
  }

  function handleClick() {
    if (type === "selection") {
      playSound(src);
      addSoundToSequence(src);
    } else if (type === "input") {
      removeSoundFromSequence(index);
    } else {
      return;
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button onClick={handleClick} variant={"outline"} size={"icon"}>
          <ImageWithFallback src={`/icons/${audioName}.png`} alt={audioName} height={30} width={30} />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{audioName}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => playSound(src)}>
          Play Sound
        </ContextMenuItem>
        {type === "selection" ? (
          <ContextMenuItem onClick={() => addSoundToSequence(src)}>
            Add Sound
          </ContextMenuItem>
        ) : type === "input" ? (
          <ContextMenuItem onClick={() => removeSoundFromSequence(index)}>
            Remove Sound
          </ContextMenuItem>
        ) : type === "message" ? (
          <ContextMenuItem>Placeholder</ContextMenuItem>
        ) : null}
      </ContextMenuContent>
    </ContextMenu>
  );
};
