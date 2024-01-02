"use client";

import { useState } from "react";
import { useSoundContext } from "@/components/providers/soundProvider";


type AudioBaseProps = {
  audioPath: string;
};

export const AudioBase = ({ audioPath }: AudioBaseProps) => {
  const { audioCtxRef, getSound, playSound } = useSoundContext();

  // const [soundBuffer, setSoundBuffer] = useState<AudioBuffer | null>(null);

  // async function playSound() {
  //   if (!audioCtxRef.current) return;
  //   audioCtxRef.current.resume()

  //   const soundNode = audioCtxRef.current.createBufferSource();
  //   soundNode.buffer = soundBuffer
  //     ? soundBuffer
  //     : await (async function () {
  //         const buffer = await getSound(audioPath);
  //         setSoundBuffer(buffer);
  //         return buffer;
  //       })();

  //   soundNode.connect(audioCtxRef.current.destination);
  //   soundNode.start();
  // }

  return (
    <div>
      AUDIOBASE
      <button onClick={()=> playSound(audioPath)}>PLAY</button>
    </div>
  );
};
