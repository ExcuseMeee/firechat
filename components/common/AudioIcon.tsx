"use client";

import { Button, ButtonProps } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

type AudioIconProps = {
  src: string;
  iconType: "selection" | "input" | "message";
  index?: number;
} & ButtonProps;

export const AudioIcon = ({
  src,
  iconType,
  index,
  ...rest
}: AudioIconProps) => {
  const { audioCtxRef, savedBuffers } = useSoundContext();
  const { addSoundToInput, removeSoundFromInput } = useInputContext();
  const { playSounds } = useSound(audioCtxRef, savedBuffers);

  const audioName = getFileName(src);

  function handleClick() {
    if (iconType === "selection") {
      playSounds([src]);
      addSoundToInput(src);
    } else if (iconType === "input") {
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
          className={cn(
            "flex items-center justify-center relative p-0 w-10 h-10",
            rest.className
          )}
        >
          <ImageWithFallback
            src={`/icons/${audioName}.png`}
            alt={audioName}
            fill
            className="p-1 m-0"
          />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{audioName}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => playSounds([src])}>
          Play Sound
        </ContextMenuItem>
        {iconType === "selection" ? (
          <ContextMenuItem onClick={() => addSoundToInput(src)}>
            Add Sound
          </ContextMenuItem>
        ) : iconType === "input" ? (
          <ContextMenuItem onClick={() => removeSoundFromInput(index!)}>
            Remove Sound
          </ContextMenuItem>
        ) : iconType === "message" ? (
          <ContextMenuItem>Placeholder</ContextMenuItem>
        ) : null}
      </ContextMenuContent>
    </ContextMenu>
  );
};
