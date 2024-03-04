"use client";

import { typedCollectionRef } from "@/lib/firebase-utils";
import { Button } from "@/components/ui/button";
import { Msg } from "@/types";
import { addDoc } from "firebase/firestore";
import { useSoundContext } from "@/components/providers/soundProvider";
import { AudioIcon } from "@/components/common/AudioIcon";
import { useInputContext } from "@/components/providers/inputProvider";
import useSound from "@/lib/hooks/useSound";

export const InputBox = () => {
  const { audioCtxRef, savedBuffers } = useSoundContext();
  const { playSounds } = useSound(audioCtxRef.current, savedBuffers.current);

  const { input, clearInput } = useInputContext();

  async function sendMessage() {
    if (input.length === 0) return;
    const messageCollection = typedCollectionRef<Msg>("test");
    await addDoc(messageCollection, {
      senderId: "TESTING",
      payload: input,
      timestamp: new Date().getTime(),
    });
    clearInput();
  }

  return (
    <div className="border border-green-500">
      <div className="flex items-center">
        {input.map((src, i) => (
          <AudioIcon key={i} src={src} type={"input"} index={i} />
        ))}
      </div>
      <Button onClick={sendMessage}>Post</Button>
      <Button onClick={() => playSounds(input)}>Preview</Button>
      <Button onClick={() => clearInput()}>Clear</Button>
    </div>
  );
};
