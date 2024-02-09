"use client";

import { MessageBacklog } from "./MessageBacklog";
import { LiveMessages } from "./LiveMessages";
import { useEffect, useRef } from "react";
import { useChatContext } from "./providers/chatProvider";
import { ScrollArea } from "./ui/scroll-area";

export const ChatFeed = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { feed } = useChatContext();

  useEffect(() => {
    if (feed.length === 0) return;
    const scrollArea = ref.current;
    if (scrollArea) {
      // black magic. if it breaks use div instead of ScrollArea for scrolling
      scrollArea.children[1].scrollTop = scrollArea.children[1].scrollHeight;
    }
  }, [feed]);

  return (
    <ScrollArea
      ref={ref}
      className="flex flex-col h-[500px] overflow-y-auto py-1"
    >
      <MessageBacklog />
      <LiveMessages />
    </ScrollArea>
  );
};
