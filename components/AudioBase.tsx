"use client";

import { useState } from "react";
import { useSoundContext } from "./providers/soundProvider";


type AudioBaseProps = {
  audioPath: string;
};

export const AudioBase = ({ audioPath }: AudioBaseProps) => {
  const { audioCtxRef, getSound } = useSoundContext();

  const [soundBuffer, setSoundBuffer] = useState<AudioBuffer | null>(null);

  async function playSound() {
    if (!audioCtxRef.current) return;

    const soundNode = audioCtxRef.current.createBufferSource();
    soundNode.buffer = soundBuffer
      ? soundBuffer
      : await (async function () {
          const buffer = await getSound(audioPath);
          setSoundBuffer(buffer);
          return buffer;
        })();

    soundNode.connect(audioCtxRef.current.destination);
    soundNode.start();
  }

  return (
    <div>
      AUDIOBASE
      <button onClick={playSound}>PLAY</button>
    </div>
  );
};
