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
      className="h-[300px] overflow-y-auto flex-grow"
    >
      <MessageBacklog />
      <LiveMessages />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
