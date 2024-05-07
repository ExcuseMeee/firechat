"use client";

import { MessageBacklog } from "@/components/chat/MessageBacklog";
import { LiveMessages } from "@/components/chat/LiveMessages";
import { useEffect, useRef } from "react";
import { useChatContext } from "@/components/providers/chatProvider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const ChatFeed = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { feed } = useChatContext();

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }, [feed]);

  return (
    <ScrollArea className="h-[300px] overflow-y-auto flex-grow">
      <button
        onClick={() => {
          if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Scroll
      </button>
      <MessageBacklog />
      <LiveMessages />
      <div ref={ref}></div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
