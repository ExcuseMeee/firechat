"use client";
import { soundPaths } from "@/lib/sounds";
import { HTMLAttributes, useState } from "react";
import { AudioIcon } from "@/components/common/AudioIcon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const AudioSelection = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex h-full border-r">
      <CollapsibleContent>
        <div className="flex flex-wrap justify-evenly w-28 max-w-28 md:w-64 md:max-w-64 ">
          {Object.values(soundPaths).map((src, i) => (
            <AudioIcon key={i} src={src} type={"selection"} index={i} />
          ))}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger className="hover:bg-accent">
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </CollapsibleTrigger>
    </Collapsible>
  );
};
