"use client";

import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

type AudioPieceProps = {
  soundPath: string;
};

export const AudioPiece = ({ soundPath }: AudioPieceProps) => {
  const [audioPath, setAudioPath] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function getAudio() {
    const r = ref(storage, soundPath);
    try {
      const u = await getDownloadURL(r);
      // console.log("[GET AUDIO] URL...", u);
      setAudioPath(u);
    } catch (error) {
      console.log("[GET AUDIO] ", error);
    }
  }

  async function playAudio() {
    if (isPlaying) {
      audioRef.current!.currentTime = 0;
    }
    setIsPending(true);
    if (!audioPath) await getAudio();
  }

  useEffect(() => {
    if (isPending && audioPath) {
      audioRef.current?.play();
      setIsPending(false);
    }
  }, [isPending, audioPath]);

  return (
    <div>
      <audio
        src={audioPath}
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        onClick={playAudio}
        disabled={isPending}
        className={`disabled:bg-red-500 ${isPlaying ? "bg-blue-500" : ""}`}
      >
        PLAY
      </button>
    </div>
  );
};
