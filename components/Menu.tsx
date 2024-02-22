"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border border-red-500 flex space-x-2"
    >
      <CollapsibleContent>
        <div>DWHDWIDHWIDHAHDHWADaiwdi</div>
      </CollapsibleContent>
      <CollapsibleTrigger>OPEN</CollapsibleTrigger>
    </Collapsible>
  );
};
