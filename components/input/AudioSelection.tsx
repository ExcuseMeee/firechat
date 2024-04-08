"use client";
import { soundPaths } from "@/lib/sounds";
import { useState } from "react";
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex h-full bg-lighter">
      <CollapsibleContent>
        <div className="flex flex-wrap justify-evenly w-28 max-w-28 md:w-64 md:max-w-64 ">
          {Object.values(soundPaths).map((src, i) => (
            <AudioIcon key={i} src={src} iconType={"selection"} index={i} className="w-8 h-8 sm:w-14 sm:h-14" />
          ))}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger className="hover:bg-accent">
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </CollapsibleTrigger>
    </Collapsible>
  );
};
