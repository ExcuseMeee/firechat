"use client";

import { Message } from "@/components/chat/Message";
import { useChatContext } from "@/components/providers/chatProvider";
import { Loader2 } from "lucide-react";

export const MessageBacklog = () => {
  const { backlog, isBacklogLoading, getNextBatch, isNextBatchLoading } =
    useChatContext();

  if (isBacklogLoading) return <div>BACKLOG LOADING...</div>;

  return (
    <div className="flex flex-col">
      {isNextBatchLoading ? (
        <Loader2 className="animate-spin self-center" />
      ) : (
        <button onClick={getNextBatch}>Load More</button>
      )}
      {backlog.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </div>
  );
};
