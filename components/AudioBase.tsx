"use client";

import { useSoundContext } from "@/components/providers/soundProvider";

type AudioBaseProps = {
  audioInfo: {
    name: string;
    src: string;
  };
  isInputSequence?: boolean;
};

export const AudioBase = ({ audioInfo, isInputSequence = false }: AudioBaseProps) => {
  const { playSound, inputSequence, setInputSequence } = useSoundContext();

  function addSoundToSequence(src: string) {
    const sequence = [...inputSequence, src];
    console.log("[addSoundToSequence] setting new sequence ", sequence);
    setInputSequence(sequence);
  }

  return (
    <div>
      AUDIOBASE {audioInfo.name}
      {!isInputSequence && (
        <button
          onClick={() => {
            playSound(audioInfo.src);
            addSoundToSequence(audioInfo.src);
          }}
        >
          PLAY
        </button>
      )}
    </div>
  );
};
