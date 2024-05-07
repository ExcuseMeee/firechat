"use client";

import { typedCollectionRef, typedDocumentRef } from "@/lib/firebase-utils";
import { Firebase_Msg, Msg, Profile } from "@/types";
import {
  DocumentData,
  QueryDocumentSnapshot,
  getDoc,
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
  // const messagesCollection = typedCollectionRef<Firebase_Msg>("messages");
  const messagesCollection = typedCollectionRef<Firebase_Msg>("test");

  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<
    Firebase_Msg,
    DocumentData
  > | null>(null);
  const [firstVisible, setFirstVisible] = useState<QueryDocumentSnapshot<
    Firebase_Msg,
    DocumentData
  > | null>(null);

  const [backlog, setBacklog] = useState<Msg[]>([]); // [oldest, ..., newest]
  const [isBacklogLoading, setIsBacklogLoading] = useState(true);

  const [feed, setFeed] = useState<Msg[]>([]); // [oldest, ... , newest]
  const [isFeedLoading, setIsFeedLoading] = useState(true);

  async function getAccountUsername(userId: string) {
    const profileDoc = await getDoc(
      typedDocumentRef<Profile>("profiles", userId)
    );
    if (profileDoc.exists()) return profileDoc.data().username;
    else return "(Unnamed)";
  }

  async function getInitialBatch() {
    // (first)newest -> ... -> (last)oldest
    const q = query(messagesCollection, orderBy("timestamp", "desc"), limit(5));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    const firstVisibleDoc = snapshot.docs[0];
    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
    setLastVisible(lastVisibleDoc);
    setFirstVisible(firstVisibleDoc);

    // [newest, ... , oldest ]
    const initialBatch: Msg[] = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const { senderId, ...rest } = docSnap.data();
        const username = await getAccountUsername(senderId);
        return { username, ...rest };
      })
    );
    setBacklog(initialBatch.toReversed()); // [oldest, ... , newest]
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

    // nextBatch contains older messages [newest, ..., oldest]
    const nextBatch: Msg[] = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const { senderId, ...rest } = docSnap.data();
        const username = await getAccountUsername(senderId);
        return { username, ...rest };
      })
    );

    // [(next)oldest, ... , (next)newest] + [(cur)oldest, ... , (cur)newest ]
    setBacklog((curBacklog) => [...nextBatch.toReversed(), ...curBacklog]);
  }

  function attachChatListener() {
    // console.log("[Listener] adding listener...");

    const q = query(
      messagesCollection,
      orderBy("timestamp", "asc"),
      startAfter(firstVisible ? firstVisible : new Date().getTime())
    );

    return onSnapshot(q, async (snapshot) => {
      let firebase_messages: Firebase_Msg[] = [];
      snapshot.forEach((docSnap) => {
        firebase_messages.push(docSnap.data());
      });

      const messages: Msg[] = await Promise.all(
        firebase_messages.map(async (msg) => {
          const { senderId, ...rest } = msg;
          const username = await getAccountUsername(senderId);
          return { username, ...rest };
        })
      );

      // console.log("[Listener] feed...", messages);
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
