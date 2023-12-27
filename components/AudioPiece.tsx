"use client";

import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

export const AudioPiece = () => {
  const [audioPath, setAudioPath] = useState("");
  const [pending, setPending] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function getAudio() {
    const r = ref(storage, "sounds/vine-boom.mp3");
    try {
      const u = await getDownloadURL(r);
      console.log("[GET AUDIO] URL...", u);
      setAudioPath(u);
    } catch (error) {
      console.log("[GET AUDIO] ", error);
    }
  }

  async function playAudio() {
    setPending(true);
    if (!audioPath) await getAudio();
  }

  useEffect(() => {
    if (pending && audioPath) {
      console.log("Audio play is pending and audioPath exists");
      audioRef.current?.play();
      setPending(false);
    } else {
      console.log("Audio either not pending or no path");
    }
  }, [pending, audioPath]);

  return (
    <div>
      <audio src={audioPath} ref={audioRef} />
      <button
        onClick={playAudio}
        disabled={pending}
        className="disabled:bg-red-500"
      >
        PLAY
      </button>
    </div>
  );
};
