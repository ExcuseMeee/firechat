"use client";

import { MessageBacklog } from "@/components/chat/MessageBacklog";
import { LiveMessages } from "@/components/chat/LiveMessages";
import { useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { ChevronsDown } from "lucide-react";

export const ChatFeed = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea className="h-[300px] overflow-y-auto flex-grow">
      <Button
        className="absolute left-[95%] top-[90%] w-10 h-10"
        onClick={() => {
          if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
          console.log("clicked");
        }}
        variant={"ghost"}
        size={"icon"}
      >
        <ChevronsDown />
      </Button>
      <MessageBacklog />
      <LiveMessages />
      <div ref={ref}></div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
