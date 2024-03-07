"use client";
import { soundPaths } from "@/lib/sounds";
import { HTMLAttributes, useState } from "react";
import { AudioIcon } from "@/components/common/AudioIcon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
type AudioSelectionProps = HTMLAttributes<HTMLDivElement> & {};

export const AudioSelection = ({ ...rest }: AudioSelectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      {...rest}
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("flex h-full", rest.className)}
    >
      <CollapsibleContent>
        <div className="flex items-center border w-52 max-w-52 flex-wrap justify-center">
          {Object.values(soundPaths).map((src, i) => (
            <AudioIcon key={i} src={src} type={"selection"} index={i} />
          ))}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger className="border border-green-500">
        O
      </CollapsibleTrigger>
    </Collapsible>
  );
};
