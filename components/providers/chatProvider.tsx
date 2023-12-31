"use client";

import { typedCollectionRef } from "@/lib/firebase-utils";
import { Msg } from "@/types";
import {
  DocumentData,
  QueryDocumentSnapshot,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type ChatContextType = {
  backlog: Msg[];
  isBacklogLoading: boolean;
  getNextBatch: () => Promise<void>;
  feed: Msg[];
  isFeedLoading: boolean;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const messagesCollection = typedCollectionRef<Msg>("messages");

  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<
    Msg,
    DocumentData
  > | null>(null);
  const [firstVisible, setFirstVisible] = useState<QueryDocumentSnapshot<
    Msg,
    DocumentData
  > | null>(null);

  const [backlog, setBacklog] = useState<Msg[]>([]);
  const [isBacklogLoading, setIsBacklogLoading] = useState(true);

  const [feed, setFeed] = useState<Msg[]>([]);
  const [isFeedLoading, setIsFeedLoading] = useState(true);

  async function getInitialBatch() {
    const q = query(messagesCollection, orderBy("timestamp", "desc"), limit(5));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    const firstVisibleDoc = snapshot.docs[0];
    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
    setLastVisible(lastVisibleDoc);
    setFirstVisible(firstVisibleDoc);

    const initialBatch = snapshot.docs.map((docSnap) => docSnap.data());
    setBacklog(initialBatch);
  }

  async function getNextBatch() {
    if (!lastVisible) return;

    const q = query(
      messagesCollection,
      orderBy("timestamp", "desc"),
      limit(5),
      startAfter(lastVisible)
    );
    const snapshot = await getDocs(q);

    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
    setLastVisible(lastVisibleDoc);

    const nextBatch = snapshot.docs.map((docSnap) => docSnap.data());
    setBacklog((prevBatch) => [...prevBatch, ...nextBatch]);
  }

  function attachChatListener() {
    console.log("[Listener] adding listener...");

    const q = query(
      messagesCollection,
      orderBy("timestamp", "asc"),
      startAfter(firstVisible ? firstVisible : new Date().getTime())
    );

    return onSnapshot(q, (snapshot) => {
      let messages: Msg[] = [];
      snapshot.forEach((docSnap) => {
        messages.push(docSnap.data());
      });
      console.log("[Listener] feed...", messages);
      setFeed(messages);
    });
  }

  useEffect(() => {
    getInitialBatch().then(() => setIsBacklogLoading(false));
  }, []);

  useEffect(() => {
    if (isBacklogLoading) return;
    const unsub = attachChatListener();
    window.addEventListener("beforeunload", unsub);
    setIsFeedLoading(false);

    return () => {
      window.removeEventListener("beforeunload", unsub);
      unsub();
    };
  }, [firstVisible, isBacklogLoading]);

  return (
    <ChatContext.Provider
      value={{ backlog, isBacklogLoading, getNextBatch, feed, isFeedLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
