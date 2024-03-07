"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { getFileName } from "@/lib/sounds";
import { useSoundContext } from "@/components/providers/soundProvider";
import { useInputContext } from "@/components/providers/inputProvider";
import useSound from "@/lib/hooks/useSound";

type AudioIconProps = {
  src: string;
  type: "selection" | "input" | "message";
  index?: number;
};

export const AudioIcon = ({ src, type, index }: AudioIconProps) => {
  const { audioCtxRef, savedBuffers } = useSoundContext();
  const { addSoundToInput, removeSoundFromInput } = useInputContext();
  const { playSounds } = useSound(audioCtxRef, savedBuffers);

  const audioName = getFileName(src);

  function handleClick() {
    if (type === "selection") {
      playSounds([src]);
      addSoundToInput(src);
    } else if (type === "input") {
      removeSoundFromInput(index!);
    } else {
      return;
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          onClick={handleClick}
          variant={"ghost"}
          size={"icon"}
          className="flex items-center justify-center"
        >
          <ImageWithFallback
            src={`/icons/${audioName}.png`}
            alt={audioName}
            height={35}
            width={35}
          />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{audioName}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => playSounds([src])}>
          Play Sound
        </ContextMenuItem>
        {type === "selection" ? (
          <ContextMenuItem onClick={() => addSoundToInput(src)}>
            Add Sound
          </ContextMenuItem>
        ) : type === "input" ? (
          <ContextMenuItem onClick={() => removeSoundFromInput(index!)}>
            Remove Sound
          </ContextMenuItem>
        ) : type === "message" ? (
          <ContextMenuItem>Placeholder</ContextMenuItem>
        ) : null}
      </ContextMenuContent>
    </ContextMenu>
  );
};
