"use client";

import { typedCollectionRef } from "@/lib/firebase-utils";
import { Button } from "@/components/ui/button";
import { Firebase_Msg } from "@/types";
import { addDoc } from "firebase/firestore";
import { AudioIcon } from "@/components/common/AudioIcon";
import { useInputContext } from "@/components/providers/inputProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayAudio } from "@/components/common/PlayAudio";
import { Send, Trash2 } from "lucide-react";
import useAuthListener from "@/lib/hooks/useAuthListener";
import { useToast } from "@/components/ui/use-toast";

export const InputBox = () => {
  const { input, clearInput } = useInputContext();
  const { user, isLoading } = useAuthListener();

  const { toast } = useToast();

  async function sendMessage() {
    if (input.length === 0) return;
    if (!user) {
      toast({
        title: "Please Sign In",
      });
      return;
    }

    const messageCollection = typedCollectionRef<Firebase_Msg>("messages");
    await addDoc(messageCollection, {
      senderId: user.uid,
      payload: input,
      timestamp: new Date().getTime(),
    });
    clearInput();
  }

  return (
    <div className="flex h-fit max-h-24 rounded-md my-4 mb-8 p-1 px-3 bg-lighter">
      <ScrollArea className="h-full flex-grow">
        <div className="flex items-center flex-wrap mx-2">
          {input.map((src, i) => (
            <AudioIcon
              key={i}
              src={src}
              iconType={"input"}
              index={i}
              className="w-10 h-10"
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center">
        <Button variant={"ghost"} size={"icon"} onClick={sendMessage}>
          <Send />
        </Button>
        <PlayAudio sounds={input} />
        <Button variant={"ghost"} size={"icon"} onClick={clearInput}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};
