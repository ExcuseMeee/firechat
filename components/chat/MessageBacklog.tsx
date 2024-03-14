"use client";

import { Message } from "@/components/chat/Message";
import { useChatContext } from "@/components/providers/chatProvider";

export const MessageBacklog = () => {
  const { backlog, isBacklogLoading, getNextBatch } = useChatContext();

  if (isBacklogLoading) return <div>BACKLOG LOADING...</div>;

  return (
    <div className="flex flex-col">
      <button onClick={getNextBatch}>Load More</button>
      {backlog.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </div>
  );
};
