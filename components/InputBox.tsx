"use client";

import { typedCollectionRef } from "@/lib/firebase-utils";
import { Button } from "@/components/ui/button";
import { Msg} from "@/types";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { useSoundContext } from "@/components/providers/soundProvider";
import { AudioBase } from "@/components/AudioBase";
import { getFileName } from "@/lib/sounds";

export const InputBox = () => {
  const { inputSequence, setInputSequence, playSoundSequence } = useSoundContext();

  async function sendMessage() {
    if(inputSequence.length === 0) return;
    const messageCollection = typedCollectionRef<Msg>("test")
    await addDoc(messageCollection, {
      senderId: "TESTING",
      payload: inputSequence,
      timestamp: new Date().getTime()
    })

  }

  function removeSound(index: number){
    const sequence = inputSequence.filter((src, i) => index !== i);
    console.log("[removeSound] setting new sequence ", sequence);
    setInputSequence(sequence);
  }

  return (
    <div className="border border-green-500">
      {inputSequence.map((src, i)=>(
        <div key={i} onClick={()=> removeSound(i)}>
          <AudioBase isInputSequence audioInfo={{src, name: getFileName(src)}} />
        </div>
      ))}
      <Button onClick={sendMessage}>Add</Button>
      <Button onClick={()=> playSoundSequence(inputSequence)}>Preview</Button>
    </div>
  );
};
