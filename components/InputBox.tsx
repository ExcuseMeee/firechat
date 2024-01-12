"use client";

import { typedCollectionRef } from "@/lib/firebase-utils";
import { Button } from "@/components/ui/button";
import { Msg } from "@/types";
import { addDoc } from "firebase/firestore";
import { useSoundContext } from "@/components/providers/soundProvider";
import { AudioBase } from "@/components/AudioBase";

export const InputBox = () => {
  const { inputSequence, setInputSequence, playSoundSequence } =
    useSoundContext();

  async function sendMessage() {
    if (inputSequence.length === 0) return;
    const messageCollection = typedCollectionRef<Msg>("test");
    await addDoc(messageCollection, {
      senderId: "TESTING",
      payload: inputSequence,
      timestamp: new Date().getTime(),
    });
    setInputSequence([]);
  }

  return (
    <div className="border border-green-500">
      <div>
        {inputSequence.map((src, i) => (
          <AudioBase key={i} src={src} type={"input"} index={i} />
        ))}
      </div>
      <Button onClick={sendMessage}>Post</Button>
      <Button onClick={() => playSoundSequence(inputSequence)}>Preview</Button>
      <Button onClick={() => setInputSequence([])}>Clear</Button>
    </div>
  );
};
